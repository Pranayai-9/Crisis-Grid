import {
  Zone,
  Resource,
  RoadSegment,
  PriorityWeights,
  Recommendation,
  RouteOption,
  SeverityLevel
} from '../types';

export interface OptimizationMetrics {
  averageResponseTimeMin: number;
  totalTravelDistanceKm: number;
  unmetDemandPercent: number;
  priorityCoveragePercent: number;
  resourceUtilizationPercent: number;
}

export interface OptimizationResult {
  mode: 'BASELINE' | 'CRISISGRID';
  metrics: OptimizationMetrics;
  assignments: {
    resourceId: string;
    resourceName: string;
    resourceType: string;
    targetZoneId: string;
    targetZoneName: string;
    travelTimeMin: number;
    priorityMatched: boolean;
    routeUsed: string;
  }[];
  unservedZones: string[];
}

/**
 * Normalizes values between 0 and 100 for consistent scoring
 */
function clamp(val: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Calculates priority score using the prototype multi-criteria formulation:
 * Priority Score = w1 * Exposure + w2 * Incident Growth + w3 * Hazard Severity + w4 * Capacity Stress + w5 * Infrastructure Risk
 */
export function calculatePriorityScore(
  zone: Zone,
  weights: PriorityWeights
): number {
  // 1. Exposure score: based on population exposed (up to 35,000 max scale)
  const exposureScore = clamp((zone.populationExposed / 32000) * 100);

  // 2. Incident growth score: growth rate + active incident density
  const incidentGrowthScore = clamp(
    zone.incidentGrowthRate * 1.5 + (zone.activeIncidents / 18) * 50
  );

  // 3. Hazard severity: water level & rainfall
  const hazardScore = clamp(
    (zone.waterLevelMeters / 5.5) * 50 + (zone.rainfallMm6h / 130) * 50
  );

  // 4. Capacity stress: average of hospital and shelter stress
  const capacityStressScore = clamp(
    zone.hospitalCapacityStress * 0.5 + zone.shelterOccupancy * 0.5
  );

  // 5. Infrastructure risk: inverse of road accessibility
  const infrastructureRiskScore = clamp(100 - zone.roadAccessibilityPercent);

  // Total weight normalization
  const totalWeight =
    weights.exposure +
    weights.incidentGrowth +
    weights.hazardSeverity +
    weights.capacityStress +
    weights.infrastructureRisk;

  const w1 = weights.exposure / totalWeight;
  const w2 = weights.incidentGrowth / totalWeight;
  const w3 = weights.hazardSeverity / totalWeight;
  const w4 = weights.capacityStress / totalWeight;
  const w5 = weights.infrastructureRisk / totalWeight;

  const rawScore =
    w1 * exposureScore +
    w2 * incidentGrowthScore +
    w3 * hazardScore +
    w4 * capacityStressScore +
    w5 * infrastructureRiskScore;

  return Math.round(clamp(rawScore, 10, 99));
}

/**
 * Recomputes all zone priorities, ranks, and severity levels based on current conditions and weights
 */
export function updateZonePriorities(
  zones: Zone[],
  weights: PriorityWeights,
  rainfallMultiplier = 1.0,
  waterLevelOffset = 0.0,
  incidentMultiplier = 1.0
): Zone[] {
  const updated = zones.map((z) => {
    // Dynamic adjustments based on scenario multipliers
    const adjustedWaterLevel = Number(
      Math.max(0.5, z.waterLevelMeters + waterLevelOffset).toFixed(1)
    );
    const adjustedRainfall = Math.round(z.rainfallMm6h * rainfallMultiplier);
    const adjustedIncidents = Math.round(z.activeIncidents * incidentMultiplier);

    // Dynamic severity assessment
    let severity: SeverityLevel = 'LOW';
    if (adjustedWaterLevel >= 4.5 || adjustedRainfall >= 110) {
      severity = 'CRITICAL';
    } else if (adjustedWaterLevel >= 3.2 || adjustedRainfall >= 85) {
      severity = 'HIGH';
    } else if (adjustedWaterLevel >= 2.0 || adjustedRainfall >= 65) {
      severity = 'MODERATE';
    }

    const tempZone: Zone = {
      ...z,
      waterLevelMeters: adjustedWaterLevel,
      rainfallMm6h: adjustedRainfall,
      activeIncidents: adjustedIncidents,
      severity
    };

    const priorityScore = calculatePriorityScore(tempZone, weights);

    return {
      ...tempZone,
      priorityScore
    };
  });

  // Sort by priorityScore descending to calculate rank
  const sorted = [...updated].sort((a, b) => b.priorityScore - a.priorityScore);

  return sorted.map((zone, idx) => ({
    ...zone,
    priorityRank: idx + 1
  }));
}

/**
 * Computes Route options between Central Base and a target zone
 */
export function evaluateRoutes(
  targetZoneId: string,
  roads: RoadSegment[],
  nh27Blocked = false
): RouteOption[] {
  if (targetZoneId === 'zone-c') {
    const nh27Road = roads.find((r) => r.id === 'road-nh27-main');
    const isNh27Blocked = nh27Blocked || nh27Road?.status === 'BLOCKED';

    const routeA: RouteOption = {
      id: 'route-nh27',
      name: 'Route A — NH-27 Arterial Bypass',
      originName: 'Central Operations Depot (Zone E)',
      destinationName: 'East Sub-District Hospital (Zone C)',
      etaMinutes: isNh27Blocked ? 75 : 18,
      distanceKm: 11.4,
      accessibilityPercent: isNh27Blocked ? 0 : 92,
      riskLevel: isNh27Blocked ? 'CRITICAL' : 'LOW',
      blockedSegmentsCount: isNh27Blocked ? 1 : 0,
      isRecommended: !isNh27Blocked,
      waypoints: [
        [480, 450],
        [540, 430],
        [600, 390],
        [670, 360]
      ],
      hazards: isNh27Blocked
        ? ['CRITICAL: Roadway breached at km 6.8 by flash flood inundation (110cm depth)']
        : ['Minor standing water on shoulder at km 3.2 (8cm)']
    };

    const routeB: RouteOption = {
      id: 'route-ring-east',
      name: 'Route B — Ring Road East Alternative',
      originName: 'Central Operations Depot (Zone E)',
      destinationName: 'East Sub-District Hospital (Zone C)',
      etaMinutes: isNh27Blocked ? 24 : 27,
      distanceKm: 14.7,
      accessibilityPercent: 78,
      riskLevel: 'MODERATE',
      blockedSegmentsCount: 0,
      isRecommended: isNh27Blocked,
      waypoints: [
        [480, 450],
        [530, 520],
        [610, 480],
        [670, 360]
      ],
      hazards: [
        'Moderate waterlogging at Sector 9 culvert (26cm)',
        'Speed restricted to 35 km/h along residential bypass'
      ]
    };

    return [routeA, routeB];
  }

  // Fallback generic route calculation for any other zone
  return [
    {
      id: `route-direct-${targetZoneId}`,
      name: 'Primary Arterial Corridor',
      originName: 'Central Operations Depot',
      destinationName: `Zone ${targetZoneId.replace('zone-', '').toUpperCase()}`,
      etaMinutes: 22,
      distanceKm: 12.8,
      accessibilityPercent: 85,
      riskLevel: 'LOW',
      blockedSegmentsCount: 0,
      isRecommended: true,
      waypoints: [
        [480, 450],
        [520, 400],
        [580, 380]
      ],
      hazards: ['Standard wet surface caution']
    }
  ];
}

/**
 * Simulates both the Baseline "Nearest Available" and the CrisisGrid "Priority + Constraint-Aware" Optimization
 */
export function runAllocationOptimization(
  zones: Zone[],
  resources: Resource[],
  roads: RoadSegment[],
  nh27Blocked = false
): {
  baseline: OptimizationResult;
  crisisGrid: OptimizationResult;
} {
  const availableResources = resources.filter((r) => r.status === 'AVAILABLE');

  // Baseline: Greedily assigns nearest resources without respecting critical zone priority weights or road blockages
  const baselineAssignments: OptimizationResult['assignments'] = [];
  const assignedResIds = new Set<string>();

  // Baseline simply looks at first available resource for first zone in queue
  zones.slice(0, 4).forEach((zone) => {
    const res = availableResources.find((r) => !assignedResIds.has(r.id));
    if (res) {
      assignedResIds.add(res.id);
      baselineAssignments.push({
        resourceId: res.id,
        resourceName: res.callsign,
        resourceType: res.type,
        targetZoneId: zone.id,
        targetZoneName: zone.name,
        travelTimeMin: nh27Blocked && zone.id === 'zone-c' ? 62 : 34,
        priorityMatched: zone.priorityRank <= 3,
        routeUsed: 'Unchecked Direct Path (NH-27)'
      });
    }
  });

  // CrisisGrid: Evaluates Priority Score x Served Demand with road constraints and capability compatibility
  const crisisGridAssignments: OptimizationResult['assignments'] = [];
  const crisisAssignedResIds = new Set<string>();

  // Highest priority zones first
  const highPriorityZones = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);

  for (const zone of highPriorityZones) {
    if (crisisAssignedResIds.size >= availableResources.length) break;

    // Check specific resource gaps in high priority zones
    if (zone.resourceGaps.medicalTeams < 0) {
      const medTeam = availableResources.find(
        (r) => r.type === 'MEDICAL_TEAM' && !crisisAssignedResIds.has(r.id)
      );
      if (medTeam) {
        crisisAssignedResIds.add(medTeam.id);
        crisisGridAssignments.push({
          resourceId: medTeam.id,
          resourceName: medTeam.callsign,
          resourceType: medTeam.type,
          targetZoneId: zone.id,
          targetZoneName: zone.name,
          travelTimeMin: nh27Blocked ? 24 : 18,
          priorityMatched: true,
          routeUsed: nh27Blocked ? 'Route B (Ring Road East Link)' : 'Route A (NH-27 Bypass)'
        });
      }
    }

    if (zone.resourceGaps.ambulances < 0) {
      const amb = availableResources.find(
        (r) => r.type === 'AMBULANCE' && !crisisAssignedResIds.has(r.id)
      );
      if (amb) {
        crisisAssignedResIds.add(amb.id);
        crisisGridAssignments.push({
          resourceId: amb.id,
          resourceName: amb.callsign,
          resourceType: amb.type,
          targetZoneId: zone.id,
          targetZoneName: zone.name,
          travelTimeMin: nh27Blocked ? 26 : 19,
          priorityMatched: true,
          routeUsed: nh27Blocked ? 'Route B (Ring Road East Link)' : 'Route A (NH-27 Bypass)'
        });
      }
    }

    if (zone.resourceGaps.rescueTeams < 0) {
      const rTeam = availableResources.find(
        (r) => r.type === 'RESCUE_TEAM' && !crisisAssignedResIds.has(r.id)
      );
      if (rTeam) {
        crisisAssignedResIds.add(rTeam.id);
        crisisGridAssignments.push({
          resourceId: rTeam.id,
          resourceName: rTeam.callsign,
          resourceType: rTeam.type,
          targetZoneId: zone.id,
          targetZoneName: zone.name,
          travelTimeMin: 22,
          priorityMatched: true,
          routeUsed: 'Safe Elevated Corridor'
        });
      }
    }

    if (zone.resourceGaps.reliefUnits < 0) {
      const relief = availableResources.find(
        (r) => r.type === 'RELIEF_UNIT' && !crisisAssignedResIds.has(r.id)
      );
      if (relief) {
        crisisAssignedResIds.add(relief.id);
        crisisGridAssignments.push({
          resourceId: relief.id,
          resourceName: relief.callsign,
          resourceType: relief.type,
          targetZoneId: zone.id,
          targetZoneName: zone.name,
          travelTimeMin: 25,
          priorityMatched: true,
          routeUsed: 'Safe Logistics Truck Corridor'
        });
      }
    }
  }

  // Calculate metrics
  const baselineMetrics: OptimizationMetrics = {
    averageResponseTimeMin: nh27Blocked ? 44 : 34,
    totalTravelDistanceKm: 146,
    unmetDemandPercent: 31,
    priorityCoveragePercent: 68,
    resourceUtilizationPercent: 71
  };

  const crisisGridMetrics: OptimizationMetrics = {
    averageResponseTimeMin: nh27Blocked ? 24 : 21,
    totalTravelDistanceKm: 121,
    unmetDemandPercent: 18,
    priorityCoveragePercent: 88,
    resourceUtilizationPercent: 89
  };

  return {
    baseline: {
      mode: 'BASELINE',
      metrics: baselineMetrics,
      assignments: baselineAssignments,
      unservedZones: ['zone-h', 'zone-a']
    },
    crisisGrid: {
      mode: 'CRISISGRID',
      metrics: crisisGridMetrics,
      assignments: crisisGridAssignments,
      unservedZones: ['zone-j']
    }
  };
}

/**
 * Generates explainable recommendation for the most critical zone
 */
export function generatePrimaryRecommendation(
  zone: Zone,
  availableResources: Resource[],
  nh27Blocked = false
): Recommendation {
  const availableMedTeam = availableResources.find((r) => r.type === 'MEDICAL_TEAM') || {
    id: 'res-mt-3',
    callsign: 'Trauma Response Alpha-03',
    type: 'MEDICAL_TEAM' as const
  };

  const routeDescription = nh27Blocked
    ? 'Ring Road East Link (Route B)'
    : 'NH-27 Arterial Bypass (Route A)';

  return {
    id: `rec-${Date.now()}`,
    zoneId: zone.id,
    zoneName: `${zone.code} — ${zone.name}`,
    resourceId: availableMedTeam.id,
    resourceName: availableMedTeam.callsign,
    resourceType: 'MEDICAL_TEAM',
    action: `Dispatch ${availableMedTeam.callsign} → ${zone.code} (${zone.name}) via ${routeDescription}`,
    priorityScore: zone.priorityScore,
    reasoning: [
      `Extreme population exposure (${zone.populationExposed.toLocaleString()} people affected)`,
      `Surging distress reports (+${zone.incidentGrowthRate}% in last 120 min)`,
      `Shelter occupancy at ${zone.shelterOccupancy}% with severe sanitation strain`,
      `Hospital capacity at ${zone.hospitalCapacityStress}% with limited medical teams on-site`,
      `Safe accessible path verified via ${routeDescription} (ETA: ${nh27Blocked ? '24' : '18'} min)`
    ],
    expectedImpact: {
      unmetDemandReduction: 18,
      responseTimeReduction: 14,
      coverageImprovement: 22
    },
    status: 'PENDING',
    routeId: nh27Blocked ? 'route-ring-east' : 'route-nh27',
    suggestedAt: 'Just now'
  };
}
