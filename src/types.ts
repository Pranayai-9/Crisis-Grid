export type SeverityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type ResourceType = 'RESCUE_TEAM' | 'MEDICAL_TEAM' | 'AMBULANCE' | 'RELIEF_UNIT';

export type ResourceStatus = 'AVAILABLE' | 'DEPLOYED' | 'EN_ROUTE' | 'BUSY' | 'OFFLINE';

export type IncidentType = 'Medical' | 'Rescue' | 'Evacuation' | 'Food' | 'Water' | 'Infrastructure';

export type IncidentStatus = 'NEW' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'EN_ROUTE' | 'RESOLVED';

export interface ZoneCoordinates {
  x: number; // percentage in SVG coordinate system (0-1000)
  y: number;
  polygon: [number, number][]; // SVG polygon points
}

export interface Zone {
  id: string;
  code: string;
  name: string;
  subtext: string;
  severity: SeverityLevel;
  populationExposed: number;
  totalPopulation: number;
  activeIncidents: number;
  incidentGrowthRate: number; // e.g., +38%
  hospitalCapacityStress: number; // 0 - 100%
  shelterOccupancy: number; // 0 - 100%
  waterLevelMeters: number; // e.g., 4.8m
  rainfallMm6h: number; // e.g., 112 mm
  roadAccessibilityPercent: number; // 0 - 100%
  predictedDemandLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  priorityScore: number; // 0 - 100
  priorityRank: number;
  coordinates: ZoneCoordinates;
  
  // Resource gaps (negative means shortage)
  resourceGaps: {
    medicalTeams: number; // e.g. -2
    ambulances: number;   // e.g. -3
    rescueTeams: number;  // e.g. -1
    reliefUnits: number;  // e.g. -2
  };
  
  resourceDemand: {
    medicalTeams: number;
    ambulances: number;
    rescueTeams: number;
    reliefUnits: number;
  };

  resourceAllocated: {
    medicalTeams: number;
    ambulances: number;
    rescueTeams: number;
    reliefUnits: number;
  };

  recommendedAction: string;
  reasoning: string[];
}

export interface Hospital {
  id: string;
  name: string;
  zoneId: string;
  zoneName: string;
  totalBeds: number;
  occupiedBeds: number;
  icuAvailable: number;
  status: 'NORMAL' | 'ELEVATED' | 'CRITICAL' | 'ISOLATED';
  floodRisk: SeverityLevel;
  hasPowerBackup: boolean;
  coordinates: { x: number; y: number };
}

export interface Shelter {
  id: string;
  name: string;
  zoneId: string;
  zoneName: string;
  capacity: number;
  currentOccupants: number;
  suppliesDaysRemaining: number;
  medicalOfficerPresent: boolean;
  status: 'OPEN' | 'FULL' | 'EVACUATING';
  coordinates: { x: number; y: number };
}

export interface Resource {
  id: string;
  callsign: string;
  type: ResourceType;
  baseLocation: string;
  currentZoneId: string;
  status: ResourceStatus;
  capability: string;
  personnelCount: number;
  assignedZoneId?: string;
  assignedIncidentId?: string;
  coordinates: { x: number; y: number };
  fuelBatteryPercent: number;
}

export interface Incident {
  id: string;
  reportedTime: string; // e.g., "14:24"
  zoneId: string;
  zoneName: string;
  type: IncidentType;
  severity: SeverityLevel;
  peopleAffected: number;
  description: string;
  status: IncidentStatus;
  assignedResourceId?: string;
  assignedResourceName?: string;
  coordinates: { x: number; y: number };
  urgencyScore: number;
}

export interface RoadSegment {
  id: string;
  name: string;
  fromZoneId: string;
  toZoneId: string;
  lengthKm: number;
  status: 'CLEAR' | 'CAUTION' | 'FLOODED' | 'BLOCKED';
  inundationDepthCm: number;
  accessibilityPercent: number;
  criticalRoute: boolean;
  coordinates: [number, number][]; // series of points [x, y]
}

export interface PriorityWeights {
  exposure: number;       // e.g., 25%
  incidentGrowth: number; // e.g., 25%
  hazardSeverity: number; // e.g., 20%
  capacityStress: number; // e.g., 20%
  infrastructureRisk: number; // e.g., 10%
}

export interface Recommendation {
  id: string;
  zoneId: string;
  zoneName: string;
  resourceId: string;
  resourceName: string;
  resourceType: ResourceType;
  action: string;
  priorityScore: number;
  reasoning: string[];
  expectedImpact: {
    unmetDemandReduction: number; // e.g., -18%
    responseTimeReduction: number; // e.g., -14%
    coverageImprovement: number;   // e.g., +22%
  };
  status: 'PENDING' | 'ACCEPTED' | 'MODIFIED' | 'REJECTED';
  routeId?: string;
  suggestedAt: string;
}

export interface RouteOption {
  id: string;
  name: string;
  originName: string;
  destinationName: string;
  etaMinutes: number;
  distanceKm: number;
  accessibilityPercent: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  blockedSegmentsCount: number;
  isRecommended: boolean;
  waypoints: [number, number][];
  hazards: string[];
}

export interface DecisionLogEntry {
  id: string;
  timestamp: string;
  situation: string;
  recommendation: string;
  reason: string;
  operatorDecision: 'ACCEPTED' | 'MODIFIED' | 'REJECTED';
  operatorNotes?: string;
  result: string;
  impactMetric: string;
}

export interface WeatherSignal {
  id: string;
  parameter: string;
  currentValue: string;
  trend: 'RISING' | 'STEADY' | 'FALLING' | 'CRITICAL';
  station: string;
  timestamp: string;
  confidence: 'HIGH' | 'MODERATE' | 'PRELIMINARY';
}

export interface ForecastPoint {
  hourOffset: string; // "+1h", "+2h", "+3h", etc.
  rainfallMm: number;
  waterLevelM: number;
  incidentVolume: number;
  medicalDemandIndex: number;
  shelterOccupancyPercent: number;
  hospitalCapacityStressPercent: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface HistoricalWeatherPoint {
  timestamp: string; // e.g. "T-24h", "16:00"
  timeLabel: string;
  rainfallMm: number;
  tempC: number;
  windSpeedKmh: number;
  barometerHpa: number;
  radarReflectivityDbz: number;
}

export interface HistoricalWaterLevelPoint {
  timestamp: string; // e.g. "T-24h", "16:00"
  timeLabel: string;
  varunaRiverLevelM: number;
  eastCanalLevelM: number;
  bhairavReservoirOutflowCusecs: number;
  warningThresholdM: number;
  dangerThresholdM: number;
}

export interface SimulationTimelineEvent {
  id: string;
  simTime: string; // e.g. "T+00", "T+05", "T+10"
  title: string;
  description: string;
  category: 'DETECTION' | 'PRIORITY' | 'RESOURCE' | 'ROUTE' | 'DISRUPTION' | 'COMMAND';
  stageIndex: number;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  rainfallMultiplier: number;
  waterLevelAdjustmentM: number;
  incidentRateMultiplier: number;
  roadDisruptionLevel: 'MINIMAL' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
  resourceAvailabilityPercent: number;
}

export interface SimulationState {
  currentScenario: string;
  scenarioPresetId: string;
  isPaused: boolean;
  simulationTime: string; // e.g., "Day 2 — 15:45"
  simTimeCode: string; // "T+00", "T+05", "T+10", etc.
  lastUpdated: string;
  rainfallMultiplier: number;
  waterLevelOffset: number;
  incidentMultiplier: number;
  roadClosureCount: number;
  availableRescueTeams: number;
  availableAmbulances: number;
  availableMedicalTeams: number;
  availableReliefUnits: number;
  activeRoadBlockAlert: string | null;
  priorityWeights: PriorityWeights;
  selectedZoneId: string | null;
  selectedIncidentId: string | null;
  activeTab: string;
}

