import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Zone,
  Hospital,
  Shelter,
  Resource,
  Incident,
  RoadSegment,
  WeatherSignal,
  ForecastPoint,
  PriorityWeights,
  Recommendation,
  DecisionLogEntry,
  RouteOption,
  IncidentStatus,
  HistoricalWeatherPoint,
  HistoricalWaterLevelPoint,
  SimulationTimelineEvent
} from '../types';
import {
  INITIAL_ZONES,
  INITIAL_HOSPITALS,
  INITIAL_SHELTERS,
  INITIAL_RESOURCES,
  INITIAL_INCIDENTS,
  INITIAL_ROADS,
  INITIAL_WEATHER_SIGNALS,
  FORECAST_SERIES,
  SCENARIO_PRESETS,
  INITIAL_DECISION_LOG,
  HISTORICAL_WEATHER_OBSERVATIONS,
  HISTORICAL_WATER_OBSERVATIONS,
  SIMULATION_TIMELINE_STAGES
} from '../data/mockData';
import {
  updateZonePriorities,
  runAllocationOptimization,
  evaluateRoutes,
  generatePrimaryRecommendation,
  OptimizationResult
} from '../simulation/engine';

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'WARNING' | 'CRITICAL' | 'SUCCESS' | 'INFO';
  requiresReplanning?: boolean;
}

interface SimulationContextType {
  zones: Zone[];
  hospitals: Hospital[];
  shelters: Shelter[];
  resources: Resource[];
  incidents: Incident[];
  roads: RoadSegment[];
  weatherSignals: WeatherSignal[];
  forecastSeries: ForecastPoint[];
  decisionLog: DecisionLogEntry[];
  priorityWeights: PriorityWeights;
  selectedZone: Zone;
  selectedZoneId: string;
  selectedIncident: Incident | null;
  activeTab: string;
  isPaused: boolean;
  simulationTime: string;
  lastUpdated: string;
  currentScenarioName: string;
  currentScenarioId: string;
  nh27Blocked: boolean;
  activeAlert: AlertNotification | null;
  currentRecommendation: Recommendation | null;
  optimizationResult: { baseline: OptimizationResult; crisisGrid: OptimizationResult };
  isOptimizing: boolean;
  activeRoutes: RouteOption[];
  showIntroModal: boolean;
  showDemoModal: boolean;
  demoStep: number;
  showPresentationMode: boolean;
  simTimeCode: string;
  timelineStages: SimulationTimelineEvent[];
  historicalWeather: HistoricalWeatherPoint[];
  historicalWaterLevels: HistoricalWaterLevelPoint[];
  kpis: {
    activeIncidents: number;
    criticalZonesCount: number;
    resourcesDeployedCount: number;
    totalResourcesCount: number;
    unmetDemandPercent: number;
    roadsBlockedCount: number;
    forecastStress: 'MODERATE' | 'HIGH' | 'CRITICAL';
  };
  
  // Handlers
  selectZone: (zoneId: string) => void;
  selectIncident: (incidentId: string | null) => void;
  setActiveTab: (tab: string) => void;
  setPriorityWeights: (weights: PriorityWeights) => void;
  applyScenarioPreset: (presetId: string) => void;
  updateConditionSliders: (params: {
    rainfallMultiplier?: number;
    waterLevelOffset?: number;
    incidentMultiplier?: number;
    resourceAvailabilityPercent?: number;
  }) => void;
  runOptimization: () => void;
  acceptRecommendation: (notes?: string) => void;
  modifyRecommendation: (modifiedTargetZoneId: string, notes?: string) => void;
  rejectRecommendation: (reason: string) => void;
  simulateRoadBlockEvent: () => void;
  runReplanning: () => void;
  simulateIncidentSurge: () => void;
  simulateWaterLevelRise: () => void;
  simulateResourceShortage: () => void;
  escalateIncident: (incidentId: string) => void;
  updateRoadStatus: (roadId: string, status: 'CLEAR' | 'CAUTION' | 'FLOODED' | 'BLOCKED', depthCm?: number) => void;
  acknowledgeIncident: (incidentId: string) => void;
  resolveIncident: (incidentId: string) => void;
  assignResourceToIncident: (incidentId: string, resourceId: string) => void;
  dismissAlert: () => void;
  togglePause: () => void;
  resetSimulation: () => void;
  startDemo: () => void;
  nextDemoEvent: () => void;
  prevDemoEvent: () => void;
  setDemoStep: (step: number) => void;
  closeDemo: () => void;
  setShowIntroModal: (show: boolean) => void;
  setShowPresentationMode: (show: boolean) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base Data State
  const [hospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [shelters] = useState<Shelter[]>(INITIAL_SHELTERS);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [roads, setRoads] = useState<RoadSegment[]>(INITIAL_ROADS);
  const [weatherSignals] = useState<WeatherSignal[]>(INITIAL_WEATHER_SIGNALS);
  const [forecastSeries] = useState<ForecastPoint[]>(FORECAST_SERIES);
  const [decisionLog, setDecisionLog] = useState<DecisionLogEntry[]>(INITIAL_DECISION_LOG);

  // Simulation Controls & Modifiers
  const [rainfallMultiplier, setRainfallMultiplier] = useState(1.0);
  const [waterLevelOffset, setWaterLevelOffset] = useState(0.0);
  const [incidentMultiplier, setIncidentMultiplier] = useState(1.0);
  const [currentScenarioId, setCurrentScenarioId] = useState('preset-severe-flood');
  const [currentScenarioName, setCurrentScenarioName] = useState('Varuna District Flood — Scenario 01');
  const [isPaused, setIsPaused] = useState(false);
  const [simulationTime] = useState('Day 2 — 15:45');
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [nh27Blocked, setNh27Blocked] = useState(false);

  // Priority Weights
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>({
    exposure: 25,
    incidentGrowth: 25,
    hazardSeverity: 20,
    capacityStress: 20,
    infrastructureRisk: 10
  });

  // UI Selection State
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-c');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeAlert, setActiveAlert] = useState<AlertNotification | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [showPresentationMode, setShowPresentationMode] = useState(false);

  // Compute live updated zones using the engine
  const zones = useMemo(() => {
    return updateZonePriorities(
      INITIAL_ZONES,
      priorityWeights,
      rainfallMultiplier,
      waterLevelOffset,
      incidentMultiplier
    );
  }, [priorityWeights, rainfallMultiplier, waterLevelOffset, incidentMultiplier]);

  // Selected Zone instance
  const selectedZone = useMemo(() => {
    return zones.find((z) => z.id === selectedZoneId) || zones[0];
  }, [zones, selectedZoneId]);

  // Selected Incident instance
  const selectedIncident = useMemo(() => {
    return incidents.find((i) => i.id === selectedIncidentId) || null;
  }, [incidents, selectedIncidentId]);

  // Compute live routes for selected zone
  const activeRoutes = useMemo(() => {
    return evaluateRoutes(selectedZoneId, roads, nh27Blocked);
  }, [selectedZoneId, roads, nh27Blocked]);

  // Compute optimization result
  const [optimizationResult, setOptimizationResult] = useState(() =>
    runAllocationOptimization(zones, resources, roads, nh27Blocked)
  );

  // Compute current primary recommendation
  const [currentRecommendation, setCurrentRecommendation] = useState<Recommendation | null>(() =>
    generatePrimaryRecommendation(
      zones.find((z) => z.id === 'zone-c') || zones[0],
      resources.filter((r) => r.status === 'AVAILABLE'),
      nh27Blocked
    )
  );

  // Recompute KPIs
  const kpis = useMemo(() => {
    const activeInc = incidents.filter((i) => i.status !== 'RESOLVED').length;
    const criticalZones = zones.filter((z) => z.severity === 'CRITICAL').length;
    const deployedRes = resources.filter((r) => r.status === 'DEPLOYED' || r.status === 'EN_ROUTE').length;
    const blockedRoads = roads.filter((r) => r.status === 'BLOCKED' || (r.id === 'road-nh27-main' && nh27Blocked)).length;

    let stress: 'MODERATE' | 'HIGH' | 'CRITICAL' = 'HIGH';
    if (criticalZones >= 4 || rainfallMultiplier > 1.2) {
      stress = 'CRITICAL';
    } else if (criticalZones <= 1) {
      stress = 'MODERATE';
    }

    return {
      activeIncidents: activeInc,
      criticalZonesCount: criticalZones,
      resourcesDeployedCount: deployedRes,
      totalResourcesCount: resources.length,
      unmetDemandPercent: nh27Blocked ? 28 : 22,
      roadsBlockedCount: blockedRoads,
      forecastStress: stress
    };
  }, [incidents, zones, resources, roads, nh27Blocked, rainfallMultiplier]);

  // Update timestamps occasionally
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setLastUpdated('Updated 1m ago');
    }, 60000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Run Allocation Optimization with animation
  const runOptimization = useCallback(() => {
    setIsOptimizing(true);
    setTimeout(() => {
      const res = runAllocationOptimization(zones, resources, roads, nh27Blocked);
      setOptimizationResult(res);

      const topZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
      const newRec = generatePrimaryRecommendation(
        topZone,
        resources.filter((r) => r.status === 'AVAILABLE'),
        nh27Blocked
      );
      setCurrentRecommendation(newRec);

      setIsOptimizing(false);
      setLastUpdated('Optimized just now');
    }, 650);
  }, [zones, resources, roads, nh27Blocked, selectedZoneId]);

  // Select Zone
  const selectZone = useCallback((zoneId: string) => {
    setSelectedZoneId(zoneId);
  }, []);

  // Select Incident
  const selectIncident = useCallback((incidentId: string | null) => {
    setSelectedIncidentId(incidentId);
  }, []);

  // Accept Recommendation
  const acceptRecommendation = useCallback((notes?: string) => {
    if (!currentRecommendation) return;

    const acceptedRec = { ...currentRecommendation, status: 'ACCEPTED' as const };
    setCurrentRecommendation(acceptedRec);

    // Update resource status
    setResources((prev) =>
      prev.map((r) =>
        r.id === acceptedRec.resourceId
          ? {
              ...r,
              status: 'DEPLOYED',
              assignedZoneId: acceptedRec.zoneId,
              coordinates: { x: selectedZone.coordinates.x + 10, y: selectedZone.coordinates.y + 10 }
            }
          : r
      )
    );

    // Add entry to Decision Log
    const logEntry: DecisionLogEntry = {
      id: `dec-${Date.now()}`,
      timestamp: '15:46',
      situation: `${acceptedRec.zoneName} prioritization trigger (Score: ${acceptedRec.priorityScore})`,
      recommendation: acceptedRec.action,
      reason: acceptedRec.reasoning[0] || 'Prioritized under acute capacity strain',
      operatorDecision: 'ACCEPTED',
      operatorNotes: notes || 'Operator accepted system recommendation with standard protocol.',
      result: `${acceptedRec.resourceName} dispatched; tracking transit via telemetry.`,
      impactMetric: `Estimated unmet demand reduced by ${acceptedRec.expectedImpact.unmetDemandReduction}%`
    };

    setDecisionLog((prev) => [logEntry, ...prev]);

    setActiveAlert({
      id: `alert-${Date.now()}`,
      title: 'DISPATCH AUTHORIZED',
      message: `${acceptedRec.resourceName} successfully dispatched to ${acceptedRec.zoneName}. Decision logged.`,
      timestamp: '15:46',
      type: 'SUCCESS'
    });
  }, [currentRecommendation, selectedZone]);

  // Modify Recommendation
  const modifyRecommendation = useCallback((modifiedTargetZoneId: string, notes?: string) => {
    if (!currentRecommendation) return;

    const target = zones.find((z) => z.id === modifiedTargetZoneId) || selectedZone;
    const modifiedRec = {
      ...currentRecommendation,
      zoneId: target.id,
      zoneName: `${target.code} — ${target.name}`,
      action: `[Operator Modified] Dispatch ${currentRecommendation.resourceName} → ${target.code} (${target.name})`,
      status: 'MODIFIED' as const
    };

    setCurrentRecommendation(modifiedRec);

    // Update resource
    setResources((prev) =>
      prev.map((r) =>
        r.id === modifiedRec.resourceId
          ? { ...r, status: 'DEPLOYED', assignedZoneId: target.id }
          : r
      )
    );

    const logEntry: DecisionLogEntry = {
      id: `dec-${Date.now()}`,
      timestamp: '15:47',
      situation: 'Operator redirected resource due to tactical reassessment',
      recommendation: currentRecommendation.action,
      reason: `Operator reassigned target from ${currentRecommendation.zoneName} to ${target.name}`,
      operatorDecision: 'MODIFIED',
      operatorNotes: notes || `Re-routed to ${target.name} per tactical review`,
      result: `${currentRecommendation.resourceName} diverted to ${target.name}`,
      impactMetric: 'Operator tactical override recorded'
    };

    setDecisionLog((prev) => [logEntry, ...prev]);

    setActiveAlert({
      id: `alert-${Date.now()}`,
      title: 'RECOMMENDATION MODIFIED',
      message: `Resource allocation diverted to ${target.name}. Log updated.`,
      timestamp: '15:47',
      type: 'INFO'
    });
  }, [currentRecommendation, selectedZone, zones]);

  // Reject Recommendation
  const rejectRecommendation = useCallback((reason: string) => {
    if (!currentRecommendation) return;

    const rejectedRec = { ...currentRecommendation, status: 'REJECTED' as const };
    setCurrentRecommendation(rejectedRec);

    const logEntry: DecisionLogEntry = {
      id: `dec-${Date.now()}`,
      timestamp: '15:48',
      situation: `${rejectedRec.zoneName} recommendation rejected by operator`,
      recommendation: rejectedRec.action,
      reason: reason || 'Operator determined field constraints preclude dispatch at this time',
      operatorDecision: 'REJECTED',
      operatorNotes: reason,
      result: 'Resource held in reserve at base station. System re-evaluating priorities.',
      impactMetric: 'Zero resource consumption; alternate candidate evaluated'
    };

    setDecisionLog((prev) => [logEntry, ...prev]);

    setActiveAlert({
      id: `alert-${Date.now()}`,
      title: 'RECOMMENDATION REJECTED',
      message: 'Operator rejected dispatch recommendation. Decision logged into audit trail.',
      timestamp: '15:48',
      type: 'WARNING'
    });
  }, [currentRecommendation]);

  // Simulate Road Block Event (e.g. NH-27 Arterial Bypass blocked by flood breach!)
  const simulateRoadBlockEvent = useCallback(() => {
    setNh27Blocked(true);

    // Update roads in state
    setRoads((prev) =>
      prev.map((r) =>
        r.id === 'road-nh27-main'
          ? {
              ...r,
              status: 'BLOCKED',
              inundationDepthCm: 110,
              accessibilityPercent: 0
            }
          : r
      )
    );

    // Trigger dynamic warning alert with replanning required!
    setActiveAlert({
      id: `alert-roadblock-${Date.now()}`,
      title: 'CONDITIONS CHANGED — NH-27 BLOCKED',
      message: 'CRITICAL ALERT: NH-27 Arterial Bypass breached at km 6.8 (110cm inundation). Route A is impassable. Replanning required!',
      timestamp: '15:49',
      type: 'CRITICAL',
      requiresReplanning: true
    });
  }, []);

  // Run Replanning
  const runReplanning = useCallback(() => {
    setIsOptimizing(true);
    setTimeout(() => {
      const res = runAllocationOptimization(zones, resources, roads, true);
      setOptimizationResult(res);

      const zoneC = zones.find((z) => z.id === 'zone-c') || zones[0];
      const newRec = generatePrimaryRecommendation(
        zoneC,
        resources.filter((r) => r.status === 'AVAILABLE'),
        true
      );
      setCurrentRecommendation(newRec);

      setIsOptimizing(false);

      const logEntry: DecisionLogEntry = {
        id: `dec-${Date.now()}`,
        timestamp: '15:50',
        situation: 'NH-27 Arterial Bypass breached; primary corridor inaccessible',
        recommendation: 'Switch transit corridor to Route B (Ring Road East Link); adjust ETA to 24 min',
        reason: 'Automated replanning identified optimal alternate path with zero flooded segments',
        operatorDecision: 'ACCEPTED',
        operatorNotes: 'Replanning plan confirmed by incident commander.',
        result: 'All dispatched units instructed to take Ring Road East detour immediately.',
        impactMetric: 'Zero vehicle stranding; uninterrupted patient transit'
      };

      setDecisionLog((prev) => [logEntry, ...prev]);

      setActiveAlert({
        id: `alert-replan-${Date.now()}`,
        title: 'REPLANNING COMPLETE',
        message: 'New operational plan generated. Route B (Ring Road East) designated as primary accessible corridor.',
        timestamp: '15:50',
        type: 'SUCCESS',
        requiresReplanning: false
      });
    }, 700);
  }, [zones, resources, roads]);

  // Apply Scenario Preset
  const applyScenarioPreset = useCallback((presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setCurrentScenarioId(preset.id);
    setCurrentScenarioName(`Varuna District Flood — ${preset.name}`);
    setRainfallMultiplier(preset.rainfallMultiplier);
    setWaterLevelOffset(preset.waterLevelAdjustmentM);
    setIncidentMultiplier(preset.incidentRateMultiplier);

    if (preset.roadDisruptionLevel === 'CRITICAL') {
      setNh27Blocked(true);
      setRoads((prev) =>
        prev.map((r) =>
          r.id === 'road-nh27-main'
            ? { ...r, status: 'BLOCKED', accessibilityPercent: 0 }
            : r
        )
      );
    } else {
      setNh27Blocked(false);
      setRoads(INITIAL_ROADS);
    }

    setActiveAlert({
      id: `alert-preset-${Date.now()}`,
      title: 'SCENARIO LOADED',
      message: `Applied scenario preset: "${preset.name}". All zone priorities, gaps, and forecasts recomputed.`,
      timestamp: '15:51',
      type: 'INFO'
    });
  }, []);

  // Update Condition Sliders directly
  const updateConditionSliders = useCallback(
    (params: {
      rainfallMultiplier?: number;
      waterLevelOffset?: number;
      incidentMultiplier?: number;
      resourceAvailabilityPercent?: number;
    }) => {
      if (params.rainfallMultiplier !== undefined) setRainfallMultiplier(params.rainfallMultiplier);
      if (params.waterLevelOffset !== undefined) setWaterLevelOffset(params.waterLevelOffset);
      if (params.incidentMultiplier !== undefined) setIncidentMultiplier(params.incidentMultiplier);
    },
    []
  );

  // Incident Actions
  const acknowledgeIncident = useCallback((incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId && inc.status === 'NEW'
          ? { ...inc, status: 'ACKNOWLEDGED' as IncidentStatus }
          : inc
      )
    );
  }, []);

  const resolveIncident = useCallback((incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? { ...inc, status: 'RESOLVED' as IncidentStatus }
          : inc
      )
    );
  }, []);

  const assignResourceToIncident = useCallback((incidentId: string, resourceId: string) => {
    const res = resources.find((r) => r.id === resourceId);
    if (!res) return;

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'ASSIGNED' as IncidentStatus,
              assignedResourceId: res.id,
              assignedResourceName: res.callsign
            }
          : inc
      )
    );

    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId
          ? { ...r, status: 'DEPLOYED', assignedIncidentId: incidentId }
          : r
      )
    );
  }, [resources]);

  const dismissAlert = useCallback(() => {
    setActiveAlert(null);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    setRoads(INITIAL_ROADS);
    setNh27Blocked(false);
    setRainfallMultiplier(1.0);
    setWaterLevelOffset(0.0);
    setIncidentMultiplier(1.0);
    setCurrentScenarioId('preset-severe-flood');
    setCurrentScenarioName('Varuna District Flood — Scenario 01');
    setIncidents(INITIAL_INCIDENTS);
    setResources(INITIAL_RESOURCES);
    setSelectedZoneId('zone-c');
    setActiveAlert(null);
    setLastUpdated('Reset to baseline');
    setDemoStep(0);
  }, []);

  // Sim time code mapped to demo progression
  const timeCodes = ['T+00', 'T+05', 'T+10', 'T+12', 'T+14', 'T+16', 'T+17', 'T+18', 'T+22', 'T+23', 'T+25'];
  const simTimeCode = timeCodes[demoStep] || 'T+00';

  const timelineStages = useMemo(() => {
    return SIMULATION_TIMELINE_STAGES.map((s, idx) => {
      if (idx < demoStep) return { ...s, status: 'COMPLETED' as const };
      if (idx === demoStep) return { ...s, status: 'ACTIVE' as const };
      return { ...s, status: 'UPCOMING' as const };
    });
  }, [demoStep]);

  // Telemetry references
  const historicalWeather = HISTORICAL_WEATHER_OBSERVATIONS;
  const historicalWaterLevels = HISTORICAL_WATER_OBSERVATIONS;

  // Manual interactive event triggers
  const simulateIncidentSurge = useCallback(() => {
    setIncidentMultiplier((prev) => +(prev + 0.35).toFixed(2));
    setActiveAlert({
      id: `alert-surge-${Date.now()}`,
      title: 'INCIDENT SURGE DETECTED',
      message: '112 dispatch logs +35% surge in high-urgency distress calls across Eastern Lowlands & Central Basin.',
      timestamp: '15:52',
      type: 'WARNING'
    });
  }, []);

  const simulateWaterLevelRise = useCallback(() => {
    setWaterLevelOffset((prev) => +(prev + 0.6).toFixed(2));
    setActiveAlert({
      id: `alert-water-${Date.now()}`,
      title: 'HYDROLOGICAL SURGE',
      message: 'Varuna River gauge exceeds Danger Level by +0.6m. Embankment overtopping probability is now Critical (88%).',
      timestamp: '15:53',
      type: 'CRITICAL'
    });
  }, []);

  const simulateResourceShortage = useCallback(() => {
    setResources((prev) =>
      prev.map((r, idx) =>
        idx >= 4 && idx < 8 ? { ...r, status: 'MAINTENANCE' } : r
      )
    );
    setActiveAlert({
      id: `alert-shortage-${Date.now()}`,
      title: 'RESOURCE FLEET STRAIN',
      message: '4 emergency units flagged down for emergency repairs and fuel exhaustion in Sector 4 depot.',
      timestamp: '15:54',
      type: 'WARNING'
    });
  }, []);

  const escalateIncident = useCallback((incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? { ...inc, severity: 'CRITICAL', urgencyScore: Math.min(100, inc.urgencyScore + 20) }
          : inc
      )
    );
    setActiveAlert({
      id: `alert-esc-${Date.now()}`,
      title: 'INCIDENT ESCALATED',
      message: `Incident ${incidentId} reclassified as CRITICAL by field team report.`,
      timestamp: '15:55',
      type: 'WARNING'
    });
  }, []);

  const updateRoadStatus = useCallback((roadId: string, status: 'CLEAR' | 'CAUTION' | 'FLOODED' | 'BLOCKED', depthCm?: number) => {
    setRoads((prev) =>
      prev.map((r) =>
        r.id === roadId
          ? {
              ...r,
              status,
              inundationDepthCm: depthCm !== undefined ? depthCm : (status === 'BLOCKED' ? 100 : status === 'FLOODED' ? 50 : status === 'CAUTION' ? 20 : 0),
              accessibilityPercent: status === 'BLOCKED' ? 0 : status === 'FLOODED' ? 40 : status === 'CAUTION' ? 75 : 100
            }
          : r
      )
    );
  }, []);

  // Step-by-step navigation through the 11 simulation stages
  const stepTargetTabs: Record<number, string> = {
    0: 'overview',
    1: 'situation',
    2: 'priority',
    3: 'forecast',
    4: 'resources',
    5: 'allocation',
    6: 'routes',
    7: 'overview',
    8: 'routes',
    9: 'routes',
    10: 'decisions'
  };

  const nextDemoEvent = useCallback(() => {
    setDemoStep((prev) => {
      const next = Math.min(10, prev + 1);
      const targetTab = stepTargetTabs[next] || 'overview';
      setActiveTab(targetTab);

      // Trigger automatic state transitions matching narrative
      if (next === 2) {
        setSelectedZoneId('zone-c');
      } else if (next === 8) {
        simulateRoadBlockEvent();
      } else if (next === 9) {
        runReplanning();
      }

      return next;
    });
  }, [stepTargetTabs, simulateRoadBlockEvent, runReplanning]);

  const prevDemoEvent = useCallback(() => {
    setDemoStep((prev) => {
      const next = Math.max(0, prev - 1);
      const targetTab = stepTargetTabs[next] || 'overview';
      setActiveTab(targetTab);
      return next;
    });
  }, [stepTargetTabs]);

  // Demo walkthrough controls
  const startDemo = useCallback(() => {
    setShowDemoModal(true);
    setDemoStep(0);
  }, []);

  const closeDemo = useCallback(() => {
    setShowDemoModal(false);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        zones,
        hospitals,
        shelters,
        resources,
        incidents,
        roads,
        weatherSignals,
        forecastSeries,
        decisionLog,
        priorityWeights,
        selectedZone,
        selectedZoneId,
        selectedIncident,
        activeTab,
        isPaused,
        simulationTime,
        lastUpdated,
        currentScenarioName,
        currentScenarioId,
        nh27Blocked,
        activeAlert,
        currentRecommendation,
        optimizationResult,
        isOptimizing,
        activeRoutes,
        showIntroModal,
        showDemoModal,
        demoStep,
        showPresentationMode,
        simTimeCode,
        timelineStages,
        historicalWeather,
        historicalWaterLevels,
        kpis,
        selectZone,
        selectIncident,
        setActiveTab,
        setPriorityWeights,
        applyScenarioPreset,
        updateConditionSliders,
        runOptimization,
        acceptRecommendation,
        modifyRecommendation,
        rejectRecommendation,
        simulateRoadBlockEvent,
        runReplanning,
        simulateIncidentSurge,
        simulateWaterLevelRise,
        simulateResourceShortage,
        escalateIncident,
        updateRoadStatus,
        acknowledgeIncident,
        resolveIncident,
        assignResourceToIncident,
        dismissAlert,
        togglePause,
        resetSimulation,
        startDemo,
        nextDemoEvent,
        prevDemoEvent,
        setDemoStep,
        closeDemo,
        setShowIntroModal,
        setShowPresentationMode
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
