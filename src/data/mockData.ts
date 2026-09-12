import {
  Zone,
  Hospital,
  Shelter,
  Resource,
  Incident,
  RoadSegment,
  ScenarioPreset,
  DecisionLogEntry,
  WeatherSignal,
  ForecastPoint,
  HistoricalWeatherPoint,
  HistoricalWaterLevelPoint,
  SimulationTimelineEvent
} from '../types';

export const INITIAL_ZONES: Zone[] = [
  {
    id: 'zone-c',
    code: 'ZONE C',
    name: 'Lowland East',
    subtext: 'High-density residential basin adjacent to east canal breach',
    severity: 'CRITICAL',
    populationExposed: 28400,
    totalPopulation: 34500,
    activeIncidents: 17,
    incidentGrowthRate: 38,
    hospitalCapacityStress: 82,
    shelterOccupancy: 91,
    waterLevelMeters: 4.8,
    rainfallMm6h: 112,
    roadAccessibilityPercent: 62,
    predictedDemandLevel: 'CRITICAL',
    priorityScore: 91,
    priorityRank: 1,
    coordinates: {
      x: 670,
      y: 360,
      polygon: [
        [600, 290],
        [750, 270],
        [790, 390],
        [740, 480],
        [620, 460],
        [580, 380]
      ]
    },
    resourceGaps: {
      medicalTeams: -2,
      ambulances: -3,
      rescueTeams: -1,
      reliefUnits: -2
    },
    resourceDemand: {
      medicalTeams: 5,
      ambulances: 6,
      rescueTeams: 4,
      reliefUnits: 5
    },
    resourceAllocated: {
      medicalTeams: 3,
      ambulances: 3,
      rescueTeams: 3,
      reliefUnits: 3
    },
    recommendedAction: 'Prioritize mobile medical response units and evacuation support immediately.',
    reasoning: [
      '38% surge in emergency calls over past 120 minutes',
      'Water ingress approaching 4.8m inundation mark',
      'Shelter capacity exceeds safe operating threshold (91%)',
      'East sub-district clinic at 82% bed occupancy'
    ]
  },
  {
    id: 'zone-h',
    code: 'ZONE H',
    name: 'River Junction',
    subtext: 'Confluence of Varuna River and North Drainage Channel',
    severity: 'CRITICAL',
    populationExposed: 22100,
    totalPopulation: 25800,
    activeIncidents: 14,
    incidentGrowthRate: 31,
    hospitalCapacityStress: 76,
    shelterOccupancy: 89,
    waterLevelMeters: 5.2,
    rainfallMm6h: 124,
    roadAccessibilityPercent: 54,
    predictedDemandLevel: 'CRITICAL',
    priorityScore: 86,
    priorityRank: 2,
    coordinates: {
      x: 480,
      y: 220,
      polygon: [
        [410, 150],
        [550, 140],
        [590, 260],
        [520, 320],
        [410, 290]
      ]
    },
    resourceGaps: {
      medicalTeams: -1,
      ambulances: -2,
      rescueTeams: -2,
      reliefUnits: -1
    },
    resourceDemand: {
      medicalTeams: 4,
      ambulances: 5,
      rescueTeams: 5,
      reliefUnits: 4
    },
    resourceAllocated: {
      medicalTeams: 3,
      ambulances: 3,
      rescueTeams: 3,
      reliefUnits: 3
    },
    recommendedAction: 'Stage inflatable motorized rafts for rapid water evacuation along river embankment.',
    reasoning: [
      'Embankment stability under severe structural shear stress',
      'Rising river level (5.2m) threatens 3 primary arterial roads',
      'Significant elderly population in low-lying cluster'
    ]
  },
  {
    id: 'zone-a',
    code: 'ZONE A',
    name: 'Riverside',
    subtext: 'Historic riverfront settlement with mixed commercial-residential lanes',
    severity: 'HIGH',
    populationExposed: 19800,
    totalPopulation: 23000,
    activeIncidents: 11,
    incidentGrowthRate: 24,
    hospitalCapacityStress: 71,
    shelterOccupancy: 80,
    waterLevelMeters: 4.1,
    rainfallMm6h: 98,
    roadAccessibilityPercent: 68,
    predictedDemandLevel: 'HIGH',
    priorityScore: 79,
    priorityRank: 3,
    coordinates: {
      x: 320,
      y: 280,
      polygon: [
        [240, 210],
        [390, 200],
        [400, 320],
        [320, 390],
        [220, 330]
      ]
    },
    resourceGaps: {
      medicalTeams: -1,
      ambulances: -1,
      rescueTeams: -1,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 3,
      ambulances: 4,
      rescueTeams: 3,
      reliefUnits: 3
    },
    resourceAllocated: {
      medicalTeams: 2,
      ambulances: 3,
      rescueTeams: 2,
      reliefUnits: 3
    },
    recommendedAction: 'Dispatch secondary rescue team and food ration trucks to sector 2 school.',
    reasoning: [
      'Internal alleys submerged up to 1.2m',
      'Drinking water pipelines reported contaminated'
    ]
  },
  {
    id: 'zone-b',
    code: 'ZONE B',
    name: 'Old Market',
    subtext: 'Dense merchant bazaar with narrow alleys and masonry tenements',
    severity: 'HIGH',
    populationExposed: 17500,
    totalPopulation: 21000,
    activeIncidents: 9,
    incidentGrowthRate: 19,
    hospitalCapacityStress: 69,
    shelterOccupancy: 74,
    waterLevelMeters: 3.6,
    rainfallMm6h: 88,
    roadAccessibilityPercent: 71,
    predictedDemandLevel: 'HIGH',
    priorityScore: 74,
    priorityRank: 4,
    coordinates: {
      x: 350,
      y: 430,
      polygon: [
        [260, 370],
        [410, 350],
        [430, 480],
        [330, 530],
        [250, 470]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: -1,
      rescueTeams: 0,
      reliefUnits: -1
    },
    resourceDemand: {
      medicalTeams: 2,
      ambulances: 3,
      rescueTeams: 2,
      reliefUnits: 3
    },
    resourceAllocated: {
      medicalTeams: 2,
      ambulances: 2,
      rescueTeams: 2,
      reliefUnits: 2
    },
    recommendedAction: 'Deploy high-capacity dewatering pump trailers to preserve substation perimeter.',
    reasoning: [
      'Substation 3 basement retaining water',
      'Structural risk on heritage two-storey timber frames'
    ]
  },
  {
    id: 'zone-e',
    code: 'ZONE E',
    name: 'Central Town',
    subtext: 'Administrative civic center, magistrate office, and high-capacity shelters',
    severity: 'MODERATE',
    populationExposed: 16200,
    totalPopulation: 29000,
    activeIncidents: 7,
    incidentGrowthRate: 12,
    hospitalCapacityStress: 64,
    shelterOccupancy: 78,
    waterLevelMeters: 2.5,
    rainfallMm6h: 74,
    roadAccessibilityPercent: 88,
    predictedDemandLevel: 'MODERATE',
    priorityScore: 65,
    priorityRank: 5,
    coordinates: {
      x: 480,
      y: 450,
      polygon: [
        [430, 360],
        [570, 350],
        [580, 520],
        [450, 540]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: 0,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 2,
      ambulances: 2,
      rescueTeams: 1,
      reliefUnits: 2
    },
    resourceAllocated: {
      medicalTeams: 2,
      ambulances: 2,
      rescueTeams: 1,
      reliefUnits: 2
    },
    recommendedAction: 'Maintain as primary logistics staging hub for eastern district relief lines.',
    reasoning: [
      'Paved dual-lane carriage way functional',
      'Command center backup generators fueled for 72h'
    ]
  },
  {
    id: 'zone-k',
    code: 'ZONE K',
    name: 'Hospital Corridor',
    subtext: 'Major healthcare zone containing Varuna Civil Hospital and dialysis units',
    severity: 'HIGH',
    populationExposed: 14600,
    totalPopulation: 19500,
    activeIncidents: 8,
    incidentGrowthRate: 22,
    hospitalCapacityStress: 88,
    shelterOccupancy: 62,
    waterLevelMeters: 3.1,
    rainfallMm6h: 82,
    roadAccessibilityPercent: 79,
    predictedDemandLevel: 'HIGH',
    priorityScore: 72,
    priorityRank: 6,
    coordinates: {
      x: 520,
      y: 600,
      polygon: [
        [460, 560],
        [620, 540],
        [640, 680],
        [490, 710]
      ]
    },
    resourceGaps: {
      medicalTeams: -1,
      ambulances: -2,
      rescueTeams: 0,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 3,
      ambulances: 4,
      rescueTeams: 1,
      reliefUnits: 1
    },
    resourceAllocated: {
      medicalTeams: 2,
      ambulances: 2,
      rescueTeams: 1,
      reliefUnits: 1
    },
    recommendedAction: 'Coordinate ambulance diversion protocol to avoid ICU overcrowding.',
    reasoning: [
      'Civil Hospital ICU operating at 94% occupancy',
      'Oxygen supply tank access road requires sandbag fortification'
    ]
  },
  {
    id: 'zone-i',
    code: 'ZONE I',
    name: 'Bus Stand',
    subtext: 'Transit terminal, commuter concourse, and displaced passenger concentration',
    severity: 'MODERATE',
    populationExposed: 12400,
    totalPopulation: 16000,
    activeIncidents: 6,
    incidentGrowthRate: 15,
    hospitalCapacityStress: 52,
    shelterOccupancy: 84,
    waterLevelMeters: 2.8,
    rainfallMm6h: 76,
    roadAccessibilityPercent: 74,
    predictedDemandLevel: 'MODERATE',
    priorityScore: 61,
    priorityRank: 7,
    coordinates: {
      x: 340,
      y: 580,
      polygon: [
        [260, 510],
        [410, 500],
        [420, 660],
        [280, 670]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: -1,
      rescueTeams: 0,
      reliefUnits: -1
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 2,
      rescueTeams: 1,
      reliefUnits: 2
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    recommendedAction: 'Provide emergency transit buses for orderly relocation to South Colony shelter.',
    reasoning: [
      '650 stranded commuters in main concourse',
      'Restrooms flooded; sanitation kit distribution needed'
    ]
  },
  {
    id: 'zone-d',
    code: 'ZONE D',
    name: 'Industrial Area',
    subtext: 'Chemical depots, manufacturing sheds, and migrant worker settlements',
    severity: 'HIGH',
    populationExposed: 11900,
    totalPopulation: 14800,
    activeIncidents: 6,
    incidentGrowthRate: 18,
    hospitalCapacityStress: 48,
    shelterOccupancy: 67,
    waterLevelMeters: 3.4,
    rainfallMm6h: 92,
    roadAccessibilityPercent: 65,
    predictedDemandLevel: 'HIGH',
    priorityScore: 69,
    priorityRank: 8,
    coordinates: {
      x: 770,
      y: 500,
      polygon: [
        [710, 420],
        [880, 410],
        [890, 590],
        [740, 600]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: -1,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 2,
      rescueTeams: 2,
      reliefUnits: 2
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 2,
      rescueTeams: 1,
      reliefUnits: 2
    },
    recommendedAction: 'Hazmat safety patrol around electroplating chemicals warehouse.',
    reasoning: [
      'Toxic runoff containment bund breached by 30cm flood layer',
      'Worker barracks require precautionary evacuation'
    ]
  },
  {
    id: 'zone-g',
    code: 'ZONE G',
    name: 'South Colony',
    subtext: 'Organized residential layouts with open grounds and school complexes',
    severity: 'MODERATE',
    populationExposed: 10800,
    totalPopulation: 18200,
    activeIncidents: 4,
    incidentGrowthRate: 8,
    hospitalCapacityStress: 55,
    shelterOccupancy: 68,
    waterLevelMeters: 1.9,
    rainfallMm6h: 65,
    roadAccessibilityPercent: 86,
    predictedDemandLevel: 'MODERATE',
    priorityScore: 54,
    priorityRank: 9,
    coordinates: {
      x: 370,
      y: 710,
      polygon: [
        [290, 680],
        [460, 670],
        [440, 770],
        [270, 760]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: 0,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    recommendedAction: 'Continue intake of secondary evacuees into Sector 4 Model School.',
    reasoning: [
      'Relatively high ground; minimal structural hazard',
      'Sufficient municipal tap water reserves'
    ]
  },
  {
    id: 'zone-l',
    code: 'ZONE L',
    name: 'Northern Settlement',
    subtext: 'Agricultural fringe villages and peri-urban poultry farms',
    severity: 'MODERATE',
    populationExposed: 9400,
    totalPopulation: 13200,
    activeIncidents: 4,
    incidentGrowthRate: 14,
    hospitalCapacityStress: 42,
    shelterOccupancy: 59,
    waterLevelMeters: 2.9,
    rainfallMm6h: 89,
    roadAccessibilityPercent: 61,
    predictedDemandLevel: 'MODERATE',
    priorityScore: 58,
    priorityRank: 10,
    coordinates: {
      x: 640,
      y: 180,
      polygon: [
        [570, 100],
        [750, 90],
        [780, 240],
        [610, 250]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: -1,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 2,
      reliefUnits: 2
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 2
    },
    recommendedAction: 'Inspect earthen feeder canal bund for potential breaches.',
    reasoning: [
      'Paddy fields submerged; livestock isolation reports incoming',
      'Tractor access limited along unpaved cart tracks'
    ]
  },
  {
    id: 'zone-f',
    code: 'ZONE F',
    name: 'Hill Road',
    subtext: 'Sloping terrace geography vulnerable to mudslides and debris blockages',
    severity: 'MODERATE',
    populationExposed: 8100,
    totalPopulation: 11500,
    activeIncidents: 3,
    incidentGrowthRate: 10,
    hospitalCapacityStress: 38,
    shelterOccupancy: 45,
    waterLevelMeters: 1.2,
    rainfallMm6h: 105,
    roadAccessibilityPercent: 52,
    predictedDemandLevel: 'LOW',
    priorityScore: 51,
    priorityRank: 11,
    coordinates: {
      x: 180,
      y: 350,
      polygon: [
        [90, 260],
        [220, 240],
        [220, 430],
        [100, 440]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: 0,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    recommendedAction: 'Clear localized boulder slide on km 4.2 using bulldozer squad.',
    reasoning: [
      'Steep slope prevents standing water, but rockfall risk remains',
      'Power transmission line snapped near water tower'
    ]
  },
  {
    id: 'zone-j',
    code: 'ZONE J',
    name: 'Rural West',
    subtext: 'Dispersed hamlets, grain silos, and seasonal irrigation canals',
    severity: 'LOW',
    populationExposed: 7200,
    totalPopulation: 15400,
    activeIncidents: 2,
    incidentGrowthRate: 5,
    hospitalCapacityStress: 30,
    shelterOccupancy: 41,
    waterLevelMeters: 1.4,
    rainfallMm6h: 62,
    roadAccessibilityPercent: 82,
    predictedDemandLevel: 'LOW',
    priorityScore: 42,
    priorityRank: 12,
    coordinates: {
      x: 180,
      y: 560,
      polygon: [
        [100, 480],
        [240, 470],
        [240, 660],
        [90, 640]
      ]
    },
    resourceGaps: {
      medicalTeams: 0,
      ambulances: 0,
      rescueTeams: 0,
      reliefUnits: 0
    },
    resourceDemand: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    resourceAllocated: {
      medicalTeams: 1,
      ambulances: 1,
      rescueTeams: 1,
      reliefUnits: 1
    },
    recommendedAction: 'Maintain monitoring of rural grain silo water barrier trenches.',
    reasoning: [
      'Minimal localized inundation',
      'Road connections to Central Town clear'
    ]
  }
];

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Varuna District Civil Hospital',
    zoneId: 'zone-k',
    zoneName: 'Hospital Corridor',
    totalBeds: 450,
    occupiedBeds: 396,
    icuAvailable: 4,
    status: 'CRITICAL',
    floodRisk: 'HIGH',
    hasPowerBackup: true,
    coordinates: { x: 550, y: 620 }
  },
  {
    id: 'hosp-2',
    name: 'Apex Trauma Center',
    zoneId: 'zone-e',
    zoneName: 'Central Town',
    totalBeds: 280,
    occupiedBeds: 212,
    icuAvailable: 12,
    status: 'NORMAL',
    floodRisk: 'LOW',
    hasPowerBackup: true,
    coordinates: { x: 490, y: 460 }
  },
  {
    id: 'hosp-3',
    name: 'Riverside Community Clinic',
    zoneId: 'zone-a',
    zoneName: 'Riverside',
    totalBeds: 60,
    occupiedBeds: 54,
    icuAvailable: 1,
    status: 'ELEVATED',
    floodRisk: 'HIGH',
    hasPowerBackup: true,
    coordinates: { x: 330, y: 260 }
  },
  {
    id: 'hosp-4',
    name: 'St. Jude Memorial Hospital',
    zoneId: 'zone-b',
    zoneName: 'Old Market',
    totalBeds: 180,
    occupiedBeds: 142,
    icuAvailable: 6,
    status: 'ELEVATED',
    floodRisk: 'MODERATE',
    hasPowerBackup: true,
    coordinates: { x: 360, y: 420 }
  },
  {
    id: 'hosp-5',
    name: 'East Sub-District Hospital',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    totalBeds: 120,
    occupiedBeds: 104,
    icuAvailable: 2,
    status: 'CRITICAL',
    floodRisk: 'CRITICAL',
    hasPowerBackup: true,
    coordinates: { x: 680, y: 350 }
  }
];

export const INITIAL_SHELTERS: Shelter[] = [
  {
    id: 'sh-1',
    name: 'Govt Boys Higher Secondary',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    capacity: 1200,
    currentOccupants: 1092,
    suppliesDaysRemaining: 1.5,
    medicalOfficerPresent: true,
    status: 'FULL',
    coordinates: { x: 650, y: 380 }
  },
  {
    id: 'sh-2',
    name: 'Community Hall Sector 4',
    zoneId: 'zone-g',
    zoneName: 'South Colony',
    capacity: 1500,
    currentOccupants: 1020,
    suppliesDaysRemaining: 4.0,
    medicalOfficerPresent: true,
    status: 'OPEN',
    coordinates: { x: 390, y: 720 }
  },
  {
    id: 'sh-3',
    name: 'Flood Relief Center Central',
    zoneId: 'zone-e',
    zoneName: 'Central Town',
    capacity: 2200,
    currentOccupants: 1716,
    suppliesDaysRemaining: 3.5,
    medicalOfficerPresent: true,
    status: 'OPEN',
    coordinates: { x: 470, y: 440 }
  },
  {
    id: 'sh-4',
    name: 'Town Hall Pavilion',
    zoneId: 'zone-b',
    zoneName: 'Old Market',
    capacity: 900,
    currentOccupants: 666,
    suppliesDaysRemaining: 2.0,
    medicalOfficerPresent: false,
    status: 'OPEN',
    coordinates: { x: 340, y: 440 }
  },
  {
    id: 'sh-5',
    name: 'Old Stadium Indoor Shelter',
    zoneId: 'zone-h',
    zoneName: 'River Junction',
    capacity: 1100,
    currentOccupants: 979,
    suppliesDaysRemaining: 1.2,
    medicalOfficerPresent: false,
    status: 'FULL',
    coordinates: { x: 490, y: 250 }
  },
  {
    id: 'sh-6',
    name: 'Vocational Training Institute',
    zoneId: 'zone-k',
    zoneName: 'Hospital Corridor',
    capacity: 800,
    currentOccupants: 496,
    suppliesDaysRemaining: 3.0,
    medicalOfficerPresent: true,
    status: 'OPEN',
    coordinates: { x: 530, y: 640 }
  },
  {
    id: 'sh-7',
    name: 'North Panchayat Bhavan',
    zoneId: 'zone-l',
    zoneName: 'Northern Settlement',
    capacity: 650,
    currentOccupants: 384,
    suppliesDaysRemaining: 2.5,
    medicalOfficerPresent: false,
    status: 'OPEN',
    coordinates: { x: 670, y: 160 }
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  // 6 Rescue Teams
  {
    id: 'res-rt-1',
    callsign: 'NDRF Alpha-01',
    type: 'RESCUE_TEAM',
    baseLocation: 'Central Emergency Base',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: 'Inflatable Rafts, Heavy Cutters, Night Sonar',
    personnelCount: 18,
    assignedZoneId: 'zone-c',
    coordinates: { x: 660, y: 340 },
    fuelBatteryPercent: 82
  },
  {
    id: 'res-rt-2',
    callsign: 'SDRF Bravo-02',
    type: 'RESCUE_TEAM',
    baseLocation: 'Riverside Fire Station',
    currentZoneId: 'zone-h',
    status: 'DEPLOYED',
    capability: 'Swiftwater Rescue, Winch Vehicles',
    personnelCount: 14,
    assignedZoneId: 'zone-h',
    coordinates: { x: 510, y: 240 },
    fuelBatteryPercent: 74
  },
  {
    id: 'res-rt-3',
    callsign: 'Fire Rescue Unit-01',
    type: 'RESCUE_TEAM',
    baseLocation: 'Central Town Depot',
    currentZoneId: 'zone-a',
    status: 'DEPLOYED',
    capability: 'Structural Debris Clearing, Lifejackets',
    personnelCount: 12,
    assignedZoneId: 'zone-a',
    coordinates: { x: 310, y: 270 },
    fuelBatteryPercent: 68
  },
  {
    id: 'res-rt-4',
    callsign: 'NDRF Charlie-03',
    type: 'RESCUE_TEAM',
    baseLocation: 'Central Town Depot',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'High-clearance Unimog, Zodiac Rafts',
    personnelCount: 16,
    coordinates: { x: 490, y: 470 },
    fuelBatteryPercent: 95
  },
  {
    id: 'res-rt-5',
    callsign: 'Civil Defense Delta-04',
    type: 'RESCUE_TEAM',
    baseLocation: 'South Base',
    currentZoneId: 'zone-g',
    status: 'DEPLOYED',
    capability: 'Dewatering Pumps, Sandbagging Crews',
    personnelCount: 22,
    assignedZoneId: 'zone-b',
    coordinates: { x: 370, y: 440 },
    fuelBatteryPercent: 88
  },
  {
    id: 'res-rt-6',
    callsign: 'SDRF Echo-05',
    type: 'RESCUE_TEAM',
    baseLocation: 'Northern Outpost',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'Rope Access, Tree Clearance, Drone Recon',
    personnelCount: 10,
    coordinates: { x: 520, y: 430 },
    fuelBatteryPercent: 91
  },

  // 4 Medical Teams
  {
    id: 'res-mt-1',
    callsign: 'Mobile Medical Unit-01',
    type: 'MEDICAL_TEAM',
    baseLocation: 'District Civil Hospital',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: 'Emergency Triage, Anti-venom, Sepsis Kits',
    personnelCount: 6,
    assignedZoneId: 'zone-c',
    coordinates: { x: 690, y: 370 },
    fuelBatteryPercent: 77
  },
  {
    id: 'res-mt-2',
    callsign: 'Rapid Health Squad-02',
    type: 'MEDICAL_TEAM',
    baseLocation: 'Apex Trauma Center',
    currentZoneId: 'zone-h',
    status: 'DEPLOYED',
    capability: 'Waterborne Disease Kits, Trauma Stabilization',
    personnelCount: 5,
    assignedZoneId: 'zone-h',
    coordinates: { x: 470, y: 230 },
    fuelBatteryPercent: 80
  },
  {
    id: 'res-mt-3',
    callsign: 'Trauma Response Alpha-03',
    type: 'MEDICAL_TEAM',
    baseLocation: 'Apex Trauma Center',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'Advanced Life Support, Mobile Surgical Field Kit',
    personnelCount: 7,
    coordinates: { x: 460, y: 460 },
    fuelBatteryPercent: 98
  },
  {
    id: 'res-mt-4',
    callsign: 'Pediatric Care Unit-04',
    type: 'MEDICAL_TEAM',
    baseLocation: 'District Civil Hospital',
    currentZoneId: 'zone-k',
    status: 'DEPLOYED',
    capability: 'Pediatric ORS, Infant Warming Incubators',
    personnelCount: 4,
    assignedZoneId: 'zone-k',
    coordinates: { x: 540, y: 610 },
    fuelBatteryPercent: 85
  },

  // 8 Ambulances
  {
    id: 'res-amb-1',
    callsign: 'Ambulance 108-A',
    type: 'AMBULANCE',
    baseLocation: 'Central Emergency Base',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: 'Basic Life Support, Stretcher Lift',
    personnelCount: 2,
    assignedZoneId: 'zone-c',
    coordinates: { x: 675, y: 385 },
    fuelBatteryPercent: 62
  },
  {
    id: 'res-amb-2',
    callsign: 'Ambulance 108-B',
    type: 'AMBULANCE',
    baseLocation: 'District Civil Hospital',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: 'Advanced Life Support, Ventilator',
    personnelCount: 3,
    assignedZoneId: 'zone-c',
    coordinates: { x: 640, y: 395 },
    fuelBatteryPercent: 71
  },
  {
    id: 'res-amb-3',
    callsign: 'Ambulance 108-C',
    type: 'AMBULANCE',
    baseLocation: 'Riverside Clinic',
    currentZoneId: 'zone-a',
    status: 'DEPLOYED',
    capability: 'Basic Life Support, Defibrillator',
    personnelCount: 2,
    assignedZoneId: 'zone-a',
    coordinates: { x: 340, y: 290 },
    fuelBatteryPercent: 65
  },
  {
    id: 'res-amb-4',
    callsign: 'Ambulance 108-D',
    type: 'AMBULANCE',
    baseLocation: 'Old Market Depot',
    currentZoneId: 'zone-b',
    status: 'DEPLOYED',
    capability: 'Narrow-chassis Urban Transit',
    personnelCount: 2,
    assignedZoneId: 'zone-b',
    coordinates: { x: 380, y: 410 },
    fuelBatteryPercent: 78
  },
  {
    id: 'res-amb-5',
    callsign: 'Ambulance 108-E',
    type: 'AMBULANCE',
    baseLocation: 'District Civil Hospital',
    currentZoneId: 'zone-k',
    status: 'DEPLOYED',
    capability: 'Cardiac Monitor, Oxygen Bank',
    personnelCount: 2,
    assignedZoneId: 'zone-k',
    coordinates: { x: 560, y: 630 },
    fuelBatteryPercent: 84
  },
  {
    id: 'res-amb-6',
    callsign: 'Ambulance 108-F',
    type: 'AMBULANCE',
    baseLocation: 'River Junction Post',
    currentZoneId: 'zone-h',
    status: 'DEPLOYED',
    capability: 'Off-road 4WD Chassis',
    personnelCount: 2,
    assignedZoneId: 'zone-h',
    coordinates: { x: 500, y: 230 },
    fuelBatteryPercent: 58
  },
  {
    id: 'res-amb-7',
    callsign: 'Ambulance 108-G',
    type: 'AMBULANCE',
    baseLocation: 'Central Emergency Base',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'Advanced Life Support, Ventilator, Telemetry',
    personnelCount: 3,
    coordinates: { x: 470, y: 480 },
    fuelBatteryPercent: 96
  },
  {
    id: 'res-amb-8',
    callsign: 'Ambulance 108-H',
    type: 'AMBULANCE',
    baseLocation: 'South Colony Base',
    currentZoneId: 'zone-g',
    status: 'AVAILABLE',
    capability: 'Basic Life Support, Wheelchair Ramp',
    personnelCount: 2,
    coordinates: { x: 380, y: 730 },
    fuelBatteryPercent: 92
  },

  // 12 Relief Units
  {
    id: 'res-ru-1',
    callsign: 'Water Purification Truck 01',
    type: 'RELIEF_UNIT',
    baseLocation: 'Municipal Water Works',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: '10,000 L/hr RO Filtration, Chlorine Dispenser',
    personnelCount: 4,
    assignedZoneId: 'zone-c',
    coordinates: { x: 620, y: 370 },
    fuelBatteryPercent: 85
  },
  {
    id: 'res-ru-2',
    callsign: 'Dry Ration Carrier 02',
    type: 'RELIEF_UNIT',
    baseLocation: 'Food Corporation Godown',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: '5,000 Ready-to-eat Meals, Baby Food',
    personnelCount: 4,
    assignedZoneId: 'zone-c',
    coordinates: { x: 700, y: 360 },
    fuelBatteryPercent: 81
  },
  {
    id: 'res-ru-3',
    callsign: 'Power Gen Trailer 03',
    type: 'RELIEF_UNIT',
    baseLocation: 'Electricity Board Yard',
    currentZoneId: 'zone-c',
    status: 'DEPLOYED',
    capability: '125 kVA Diesel Generator, Floodlights',
    personnelCount: 3,
    assignedZoneId: 'zone-c',
    coordinates: { x: 660, y: 400 },
    fuelBatteryPercent: 73
  },
  {
    id: 'res-ru-4',
    callsign: 'Water Tanker 04',
    type: 'RELIEF_UNIT',
    baseLocation: 'Municipal Water Works',
    currentZoneId: 'zone-h',
    status: 'DEPLOYED',
    capability: '12,000 L Potable Water',
    personnelCount: 2,
    assignedZoneId: 'zone-h',
    coordinates: { x: 460, y: 240 },
    fuelBatteryPercent: 66
  },
  {
    id: 'res-ru-5',
    callsign: 'Tarpaulin & Blanket Convoy 05',
    type: 'RELIEF_UNIT',
    baseLocation: 'Red Cross Warehouse',
    currentZoneId: 'zone-a',
    status: 'DEPLOYED',
    capability: '2,500 Waterproof Tarps, Hygiene Kits',
    personnelCount: 4,
    assignedZoneId: 'zone-a',
    coordinates: { x: 300, y: 280 },
    fuelBatteryPercent: 75
  },
  {
    id: 'res-ru-6',
    callsign: 'Mobile Community Kitchen 06',
    type: 'RELIEF_UNIT',
    baseLocation: 'Central Town Depot',
    currentZoneId: 'zone-b',
    status: 'DEPLOYED',
    capability: 'Hot Meals for 3,000 people/day',
    personnelCount: 8,
    assignedZoneId: 'zone-b',
    coordinates: { x: 350, y: 450 },
    fuelBatteryPercent: 79
  },
  {
    id: 'res-ru-7',
    callsign: 'Sanitation Logistics Van 07',
    type: 'RELIEF_UNIT',
    baseLocation: 'Civic Health Depot',
    currentZoneId: 'zone-i',
    status: 'DEPLOYED',
    capability: 'Chemical Toilets, Lime Powder, Foggers',
    personnelCount: 4,
    assignedZoneId: 'zone-i',
    coordinates: { x: 360, y: 600 },
    fuelBatteryPercent: 82
  },
  {
    id: 'res-ru-8',
    callsign: 'Relief Ration Carrier 08',
    type: 'RELIEF_UNIT',
    baseLocation: 'Food Corporation Godown',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: '4,000 Dry Ration Packets, Water Pouches',
    personnelCount: 4,
    coordinates: { x: 500, y: 490 },
    fuelBatteryPercent: 94
  },
  {
    id: 'res-ru-9',
    callsign: 'High-Volume Dewatering Unit 09',
    type: 'RELIEF_UNIT',
    baseLocation: 'Irrigation Yard',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: '500 HP Diesel Pump, 2km Discharge Hose',
    personnelCount: 4,
    coordinates: { x: 510, y: 450 },
    fuelBatteryPercent: 97
  },
  {
    id: 'res-ru-10',
    callsign: 'Water Tanker 10',
    type: 'RELIEF_UNIT',
    baseLocation: 'South Municipal Yard',
    currentZoneId: 'zone-g',
    status: 'AVAILABLE',
    capability: '10,000 L Potable Water',
    personnelCount: 2,
    coordinates: { x: 360, y: 720 },
    fuelBatteryPercent: 91
  },
  {
    id: 'res-ru-11',
    callsign: 'Satellite Comms Trailer 11',
    type: 'RELIEF_UNIT',
    baseLocation: 'Central Emergency Base',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'VSAT Uplink, Mesh WiFi, VHF Repeater',
    personnelCount: 3,
    coordinates: { x: 480, y: 430 },
    fuelBatteryPercent: 99
  },
  {
    id: 'res-ru-12',
    callsign: 'Shelter Supply Carrier 12',
    type: 'RELIEF_UNIT',
    baseLocation: 'South Municipal Yard',
    currentZoneId: 'zone-g',
    status: 'AVAILABLE',
    capability: 'Folding Cots, Mosquito Nets, First Aid',
    personnelCount: 3,
    coordinates: { x: 400, y: 740 },
    fuelBatteryPercent: 88
  },
  {
    id: 'res-mt-5',
    callsign: 'Specialized Trauma Squad 05',
    type: 'MEDICAL_TEAM',
    baseLocation: 'Apex Trauma Center',
    currentZoneId: 'zone-e',
    status: 'AVAILABLE',
    capability: 'Surgical Resuscitation, Burn Care, Mobile Vent',
    personnelCount: 6,
    coordinates: { x: 475, y: 465 },
    fuelBatteryPercent: 96
  },
  {
    id: 'res-amb-9',
    callsign: 'All-Terrain 4x4 Ambulance 108-I',
    type: 'AMBULANCE',
    baseLocation: 'Northern Outpost',
    currentZoneId: 'zone-l',
    status: 'AVAILABLE',
    capability: 'High-Snorkel 4WD, Cardiac Monitor, Oxygen',
    personnelCount: 2,
    coordinates: { x: 650, y: 175 },
    fuelBatteryPercent: 93
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-01',
    reportedTime: '15:38',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Rescue',
    severity: 'CRITICAL',
    peopleAffected: 42,
    description: '14 families trapped on rooftop of Shiv Colony building after canal wall breach.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-rt-1',
    assignedResourceName: 'NDRF Alpha-01',
    coordinates: { x: 670, y: 350 },
    urgencyScore: 96
  },
  {
    id: 'inc-02',
    reportedTime: '15:34',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Medical',
    severity: 'CRITICAL',
    peopleAffected: 8,
    description: 'Diabetic and cardiac patients requiring emergency oxygen extraction near Sector 3 primary school.',
    status: 'NEW',
    coordinates: { x: 695, y: 365 },
    urgencyScore: 94
  },
  {
    id: 'inc-03',
    reportedTime: '15:28',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Evacuation',
    severity: 'HIGH',
    peopleAffected: 85,
    description: 'Rapidly rising backwaters in East Slum cluster; immediate raft transfer required.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-amb-1',
    assignedResourceName: 'Ambulance 108-A',
    coordinates: { x: 640, y: 410 },
    urgencyScore: 89
  },
  {
    id: 'inc-04',
    reportedTime: '15:22',
    zoneId: 'zone-h',
    zoneName: 'River Junction',
    type: 'Rescue',
    severity: 'CRITICAL',
    peopleAffected: 26,
    description: 'Bus partially submerged on River Bridge approach; 26 passengers aboard.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-rt-2',
    assignedResourceName: 'SDRF Bravo-02',
    coordinates: { x: 505, y: 225 },
    urgencyScore: 95
  },
  {
    id: 'inc-05',
    reportedTime: '15:15',
    zoneId: 'zone-h',
    zoneName: 'River Junction',
    type: 'Infrastructure',
    severity: 'HIGH',
    peopleAffected: 310,
    description: 'Embankment scour threatening North Drainage sluice gate #4.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-ru-4',
    assignedResourceName: 'Water Tanker 04',
    coordinates: { x: 470, y: 250 },
    urgencyScore: 85
  },
  {
    id: 'inc-06',
    reportedTime: '15:10',
    zoneId: 'zone-a',
    zoneName: 'Riverside',
    type: 'Medical',
    severity: 'HIGH',
    peopleAffected: 12,
    description: 'Acute gastroenteritis outbreak suspected in Riverside relief camp camp #2.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-amb-3',
    assignedResourceName: 'Ambulance 108-C',
    coordinates: { x: 335, y: 275 },
    urgencyScore: 81
  },
  {
    id: 'inc-07',
    reportedTime: '15:02',
    zoneId: 'zone-b',
    zoneName: 'Old Market',
    type: 'Infrastructure',
    severity: 'HIGH',
    peopleAffected: 650,
    description: 'Electrical transformer sparking with 60cm water logging at cloth market chowk.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-rt-5',
    assignedResourceName: 'Civil Defense Delta-04',
    coordinates: { x: 375, y: 435 },
    urgencyScore: 78
  },
  {
    id: 'inc-08',
    reportedTime: '14:55',
    zoneId: 'zone-d',
    zoneName: 'Industrial Area',
    type: 'Infrastructure',
    severity: 'CRITICAL',
    peopleAffected: 140,
    description: 'Chemical barrel buoyancy hazard at warehouse plot 24; caustic vapor risk.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 790, y: 520 },
    urgencyScore: 88
  },
  {
    id: 'inc-09',
    reportedTime: '14:48',
    zoneId: 'zone-k',
    zoneName: 'Hospital Corridor',
    type: 'Medical',
    severity: 'HIGH',
    peopleAffected: 18,
    description: 'Oxygen delivery truck halted due to water level on Hospital Link Road.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-amb-5',
    assignedResourceName: 'Ambulance 108-E',
    coordinates: { x: 535, y: 615 },
    urgencyScore: 84
  },
  {
    id: 'inc-10',
    reportedTime: '14:42',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Food',
    severity: 'MODERATE',
    peopleAffected: 210,
    description: 'Food distribution exhausted at Govt Boys School shelter; infant formula critical.',
    status: 'NEW',
    coordinates: { x: 655, y: 385 },
    urgencyScore: 76
  },
  {
    id: 'inc-11',
    reportedTime: '14:35',
    zoneId: 'zone-i',
    zoneName: 'Bus Stand',
    type: 'Water',
    severity: 'MODERATE',
    peopleAffected: 450,
    description: 'Drinking water pipeline ruptured; standing pool contaminating borewell.',
    status: 'ASSIGNED',
    assignedResourceId: 'res-ru-7',
    assignedResourceName: 'Sanitation Logistics Van 07',
    coordinates: { x: 350, y: 610 },
    urgencyScore: 72
  },
  {
    id: 'inc-12',
    reportedTime: '14:26',
    zoneId: 'zone-f',
    zoneName: 'Hill Road',
    type: 'Infrastructure',
    severity: 'MODERATE',
    peopleAffected: 95,
    description: 'Boulder fall blocking single-lane bypass connecting Hill Village.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 175, y: 360 },
    urgencyScore: 68
  },
  {
    id: 'inc-13',
    reportedTime: '14:18',
    zoneId: 'zone-l',
    zoneName: 'Northern Settlement',
    type: 'Rescue',
    severity: 'MODERATE',
    peopleAffected: 16,
    description: 'Dairy farm workers cut off across inundated seasonal nala.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 680, y: 170 },
    urgencyScore: 70
  },
  {
    id: 'inc-14',
    reportedTime: '14:10',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Rescue',
    severity: 'CRITICAL',
    peopleAffected: 34,
    description: 'Single-storey care home ground floor flooded; 18 elderly bed-ridden residents.',
    status: 'NEW',
    coordinates: { x: 710, y: 340 },
    urgencyScore: 97
  },
  {
    id: 'inc-15',
    reportedTime: '13:58',
    zoneId: 'zone-g',
    zoneName: 'South Colony',
    type: 'Evacuation',
    severity: 'LOW',
    peopleAffected: 40,
    description: 'Precautionary relocation of pregnant women to Community Hall medical ward.',
    status: 'RESOLVED',
    coordinates: { x: 380, y: 730 },
    urgencyScore: 45
  },
  {
    id: 'inc-16',
    reportedTime: '13:45',
    zoneId: 'zone-j',
    zoneName: 'Rural West',
    type: 'Food',
    severity: 'LOW',
    peopleAffected: 80,
    description: 'Ration delivery request for isolated hamlet near western canal bridge.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 170, y: 580 },
    urgencyScore: 48
  },
  {
    id: 'inc-17',
    reportedTime: '13:30',
    zoneId: 'zone-e',
    zoneName: 'Central Town',
    type: 'Medical',
    severity: 'MODERATE',
    peopleAffected: 6,
    description: 'Minor injuries from ceiling plaster collapse at local dispensary.',
    status: 'RESOLVED',
    coordinates: { x: 495, y: 470 },
    urgencyScore: 52
  },
  {
    id: 'inc-18',
    reportedTime: '13:15',
    zoneId: 'zone-b',
    zoneName: 'Old Market',
    type: 'Rescue',
    severity: 'HIGH',
    peopleAffected: 19,
    description: 'Family stranded above flooded basement warehouse on Timber Lane.',
    status: 'RESOLVED',
    coordinates: { x: 360, y: 410 },
    urgencyScore: 77
  },
  {
    id: 'inc-19',
    reportedTime: '13:00',
    zoneId: 'zone-h',
    zoneName: 'River Junction',
    type: 'Water',
    severity: 'HIGH',
    peopleAffected: 180,
    description: 'Floodwaters inundated community water pump house.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 520, y: 260 },
    urgencyScore: 75
  },
  {
    id: 'inc-20',
    reportedTime: '12:45',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Medical',
    severity: 'CRITICAL',
    peopleAffected: 11,
    description: 'Submerged dispensary generator failure; vaccines and insulin at risk.',
    status: 'NEW',
    coordinates: { x: 675, y: 335 },
    urgencyScore: 92
  },
  {
    id: 'inc-21',
    reportedTime: '12:35',
    zoneId: 'zone-g',
    zoneName: 'South Colony',
    type: 'Food',
    severity: 'HIGH',
    peopleAffected: 420,
    description: 'Community kitchen running out of dry grain rations after water ingress in storage room.',
    status: 'NEW',
    coordinates: { x: 380, y: 715 },
    urgencyScore: 79
  },
  {
    id: 'inc-22',
    reportedTime: '12:20',
    zoneId: 'zone-b',
    zoneName: 'Old Market',
    type: 'Evacuation',
    severity: 'HIGH',
    peopleAffected: 65,
    description: 'Elderly care home ground floor flooded; 65 senior citizens need transport to Town Hall Pavilion.',
    status: 'NEW',
    coordinates: { x: 345, y: 430 },
    urgencyScore: 88
  },
  {
    id: 'inc-23',
    reportedTime: '12:10',
    zoneId: 'zone-c',
    zoneName: 'Lowland East',
    type: 'Water',
    severity: 'CRITICAL',
    peopleAffected: 2400,
    description: 'Contaminated flood runoff breached main drinking water pipeline valve in Sector 5.',
    status: 'ACKNOWLEDGED',
    coordinates: { x: 660, y: 375 },
    urgencyScore: 91
  },
  {
    id: 'inc-24',
    reportedTime: '11:55',
    zoneId: 'zone-d',
    zoneName: 'Industrial Area',
    type: 'Infrastructure',
    severity: 'HIGH',
    peopleAffected: 150,
    description: 'Chemical storage perimeter retention wall shows signs of structural fatigue and minor seepage.',
    status: 'NEW',
    coordinates: { x: 780, y: 510 },
    urgencyScore: 84
  }
];

export const INITIAL_ROADS: RoadSegment[] = [
  {
    id: 'road-nh27-main',
    name: 'NH-27 Arterial Bypass',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-c',
    lengthKm: 11.4,
    status: 'CLEAR',
    inundationDepthCm: 8,
    accessibilityPercent: 92,
    criticalRoute: true,
    coordinates: [
      [480, 450],
      [540, 430],
      [600, 390],
      [670, 360]
    ]
  },
  {
    id: 'road-ring-east',
    name: 'Ring Road East Link',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-c',
    lengthKm: 14.7,
    status: 'CAUTION',
    inundationDepthCm: 26,
    accessibilityPercent: 68,
    criticalRoute: false,
    coordinates: [
      [480, 450],
      [530, 520],
      [610, 480],
      [670, 360]
    ]
  },
  {
    id: 'road-river-bund',
    name: 'River Bund Embankment Road',
    fromZoneId: 'zone-a',
    toZoneId: 'zone-h',
    lengthKm: 8.2,
    status: 'FLOODED',
    inundationDepthCm: 74,
    accessibilityPercent: 32,
    criticalRoute: true,
    coordinates: [
      [320, 280],
      [390, 230],
      [480, 220]
    ]
  },
  {
    id: 'road-market-bridge',
    name: 'Old Market Iron Bridge',
    fromZoneId: 'zone-b',
    toZoneId: 'zone-e',
    lengthKm: 4.1,
    status: 'CAUTION',
    inundationDepthCm: 18,
    accessibilityPercent: 82,
    criticalRoute: true,
    coordinates: [
      [350, 430],
      [420, 440],
      [480, 450]
    ]
  },
  {
    id: 'road-hosp-link',
    name: 'Civil Hospital Corridor Link',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-k',
    lengthKm: 5.6,
    status: 'CLEAR',
    inundationDepthCm: 10,
    accessibilityPercent: 90,
    criticalRoute: true,
    coordinates: [
      [480, 450],
      [500, 530],
      [520, 600]
    ]
  },
  {
    id: 'road-ind-bypass',
    name: 'Industrial Heavy Transit Lane',
    fromZoneId: 'zone-c',
    toZoneId: 'zone-d',
    lengthKm: 6.8,
    status: 'FLOODED',
    inundationDepthCm: 55,
    accessibilityPercent: 44,
    criticalRoute: false,
    coordinates: [
      [670, 360],
      [720, 420],
      [770, 500]
    ]
  },
  {
    id: 'road-south-expressway',
    name: 'South Colony Connector',
    fromZoneId: 'zone-i',
    toZoneId: 'zone-g',
    lengthKm: 7.3,
    status: 'CLEAR',
    inundationDepthCm: 5,
    accessibilityPercent: 95,
    criticalRoute: true,
    coordinates: [
      [340, 580],
      [350, 650],
      [370, 710]
    ]
  },
  {
    id: 'road-north-feeder',
    name: 'North Agricultural Feeder',
    fromZoneId: 'zone-h',
    toZoneId: 'zone-l',
    lengthKm: 9.1,
    status: 'CAUTION',
    inundationDepthCm: 32,
    accessibilityPercent: 64,
    criticalRoute: false,
    coordinates: [
      [480, 220],
      [560, 180],
      [640, 180]
    ]
  },
  {
    id: 'road-hill-cut',
    name: 'Hill Road Ridge Cut',
    fromZoneId: 'zone-f',
    toZoneId: 'zone-a',
    lengthKm: 6.5,
    status: 'CAUTION',
    inundationDepthCm: 12,
    accessibilityPercent: 72,
    criticalRoute: false,
    coordinates: [
      [180, 350],
      [240, 310],
      [320, 280]
    ]
  },
  {
    id: 'road-west-artery',
    name: 'Rural West Grain Highway',
    fromZoneId: 'zone-j',
    toZoneId: 'zone-i',
    lengthKm: 8.9,
    status: 'CLEAR',
    inundationDepthCm: 4,
    accessibilityPercent: 96,
    criticalRoute: false,
    coordinates: [
      [180, 560],
      [260, 570],
      [340, 580]
    ]
  },
  {
    id: 'road-east-canal-levee',
    name: 'East Canal Levee Service Road',
    fromZoneId: 'zone-c',
    toZoneId: 'zone-l',
    lengthKm: 10.2,
    status: 'BLOCKED',
    inundationDepthCm: 110,
    accessibilityPercent: 0,
    criticalRoute: false,
    coordinates: [
      [670, 360],
      [680, 260],
      [640, 180]
    ]
  },
  {
    id: 'road-south-hosp-link',
    name: 'South-to-Hospital Transit',
    fromZoneId: 'zone-g',
    toZoneId: 'zone-k',
    lengthKm: 6.9,
    status: 'CLEAR',
    inundationDepthCm: 6,
    accessibilityPercent: 94,
    criticalRoute: true,
    coordinates: [
      [370, 710],
      [440, 680],
      [520, 600]
    ]
  },
  {
    id: 'road-r12-bypass',
    name: 'Sector 6 Slum Bypass',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-c',
    lengthKm: 12.8,
    status: 'CAUTION',
    inundationDepthCm: 22,
    accessibilityPercent: 74,
    criticalRoute: false,
    coordinates: [
      [480, 450],
      [570, 420],
      [630, 390],
      [670, 360]
    ]
  },
  {
    id: 'road-ind-east',
    name: 'East Industrial Freight Corridor',
    fromZoneId: 'zone-c',
    toZoneId: 'zone-d',
    lengthKm: 7.4,
    status: 'CLEAR',
    inundationDepthCm: 14,
    accessibilityPercent: 88,
    criticalRoute: true,
    coordinates: [
      [670, 360],
      [720, 430],
      [770, 500]
    ]
  },
  {
    id: 'road-ind-hosp',
    name: 'South Industrial Link Road',
    fromZoneId: 'zone-d',
    toZoneId: 'zone-k',
    lengthKm: 8.1,
    status: 'CLEAR',
    inundationDepthCm: 8,
    accessibilityPercent: 92,
    criticalRoute: false,
    coordinates: [
      [770, 500],
      [660, 550],
      [520, 600]
    ]
  },
  {
    id: 'road-bus-south',
    name: 'Bus Stand - South Colony Feeder',
    fromZoneId: 'zone-i',
    toZoneId: 'zone-g',
    lengthKm: 5.3,
    status: 'CLEAR',
    inundationDepthCm: 5,
    accessibilityPercent: 95,
    criticalRoute: false,
    coordinates: [
      [340, 580],
      [350, 650],
      [370, 710]
    ]
  },
  {
    id: 'road-market-bus',
    name: 'Old Market - Bus Stand Avenue',
    fromZoneId: 'zone-b',
    toZoneId: 'zone-i',
    lengthKm: 4.8,
    status: 'CAUTION',
    inundationDepthCm: 19,
    accessibilityPercent: 81,
    criticalRoute: true,
    coordinates: [
      [350, 440],
      [340, 510],
      [340, 580]
    ]
  },
  {
    id: 'road-riverside-market',
    name: 'Riverside Ferry Approach Road',
    fromZoneId: 'zone-a',
    toZoneId: 'zone-b',
    lengthKm: 6.2,
    status: 'FLOODED',
    inundationDepthCm: 48,
    accessibilityPercent: 44,
    criticalRoute: true,
    coordinates: [
      [310, 270],
      [330, 350],
      [350, 440]
    ]
  },
  {
    id: 'road-hill-west',
    name: 'Western Escarpment Bypass',
    fromZoneId: 'zone-f',
    toZoneId: 'zone-j',
    lengthKm: 9.5,
    status: 'CLEAR',
    inundationDepthCm: 2,
    accessibilityPercent: 98,
    criticalRoute: false,
    coordinates: [
      [180, 350],
      [170, 450],
      [180, 560]
    ]
  },
  {
    id: 'road-north-central',
    name: 'North Corridor Mainway',
    fromZoneId: 'zone-l',
    toZoneId: 'zone-e',
    lengthKm: 13.1,
    status: 'CLEAR',
    inundationDepthCm: 11,
    accessibilityPercent: 89,
    criticalRoute: true,
    coordinates: [
      [640, 180],
      [560, 310],
      [480, 450]
    ]
  },
  {
    id: 'road-junction-central',
    name: 'River Junction - Central Artery',
    fromZoneId: 'zone-h',
    toZoneId: 'zone-e',
    lengthKm: 7.9,
    status: 'CAUTION',
    inundationDepthCm: 21,
    accessibilityPercent: 80,
    criticalRoute: true,
    coordinates: [
      [480, 220],
      [480, 330],
      [480, 450]
    ]
  },
  {
    id: 'road-canal-cross',
    name: 'East Canal Siphon Road',
    fromZoneId: 'zone-d',
    toZoneId: 'zone-c',
    lengthKm: 6.7,
    status: 'FLOODED',
    inundationDepthCm: 58,
    accessibilityPercent: 35,
    criticalRoute: false,
    coordinates: [
      [770, 500],
      [710, 430],
      [670, 360]
    ]
  },
  {
    id: 'road-metro-corridor',
    name: 'Sector 4 Metro Underpass Road',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-g',
    lengthKm: 9.8,
    status: 'CLEAR',
    inundationDepthCm: 9,
    accessibilityPercent: 91,
    criticalRoute: true,
    coordinates: [
      [480, 450],
      [430, 580],
      [370, 710]
    ]
  },
  {
    id: 'road-hill-crest',
    name: 'Ridge Top Radio Station Road',
    fromZoneId: 'zone-f',
    toZoneId: 'zone-a',
    lengthKm: 5.1,
    status: 'CLEAR',
    inundationDepthCm: 3,
    accessibilityPercent: 97,
    criticalRoute: false,
    coordinates: [
      [180, 350],
      [240, 310],
      [310, 270]
    ]
  },
  {
    id: 'road-south-ring',
    name: 'Southern Bypass Expressway',
    fromZoneId: 'zone-g',
    toZoneId: 'zone-d',
    lengthKm: 15.6,
    status: 'CLEAR',
    inundationDepthCm: 7,
    accessibilityPercent: 93,
    criticalRoute: false,
    coordinates: [
      [370, 710],
      [570, 680],
      [770, 500]
    ]
  },
  {
    id: 'road-barrage-road',
    name: 'Bhairav Dam Barrage Service Crest',
    fromZoneId: 'zone-h',
    toZoneId: 'zone-a',
    lengthKm: 8.8,
    status: 'CAUTION',
    inundationDepthCm: 31,
    accessibilityPercent: 65,
    criticalRoute: true,
    coordinates: [
      [480, 220],
      [390, 240],
      [310, 270]
    ]
  },
  {
    id: 'road-rural-bund',
    name: 'Rural Drain Embankment Way',
    fromZoneId: 'zone-j',
    toZoneId: 'zone-g',
    lengthKm: 11.2,
    status: 'CLEAR',
    inundationDepthCm: 10,
    accessibilityPercent: 90,
    criticalRoute: false,
    coordinates: [
      [180, 560],
      [270, 640],
      [370, 710]
    ]
  },
  {
    id: 'road-hosp-market',
    name: 'West Hospital Access Road',
    fromZoneId: 'zone-k',
    toZoneId: 'zone-b',
    lengthKm: 7.2,
    status: 'CLEAR',
    inundationDepthCm: 12,
    accessibilityPercent: 88,
    criticalRoute: false,
    coordinates: [
      [520, 600],
      [430, 520],
      [350, 440]
    ]
  },
  {
    id: 'road-north-market',
    name: 'North Canal Flyover',
    fromZoneId: 'zone-l',
    toZoneId: 'zone-h',
    lengthKm: 7.8,
    status: 'CLEAR',
    inundationDepthCm: 8,
    accessibilityPercent: 92,
    criticalRoute: false,
    coordinates: [
      [640, 180],
      [560, 200],
      [480, 220]
    ]
  },
  {
    id: 'road-bus-hosp',
    name: 'Transit Hub - Hospital Rapid Way',
    fromZoneId: 'zone-i',
    toZoneId: 'zone-k',
    lengthKm: 6.4,
    status: 'CLEAR',
    inundationDepthCm: 5,
    accessibilityPercent: 95,
    criticalRoute: true,
    coordinates: [
      [340, 580],
      [430, 590],
      [520, 600]
    ]
  },
  {
    id: 'road-east-ring-south',
    name: 'Outer East Bypass Section 2',
    fromZoneId: 'zone-c',
    toZoneId: 'zone-g',
    lengthKm: 16.4,
    status: 'CAUTION',
    inundationDepthCm: 25,
    accessibilityPercent: 75,
    criticalRoute: false,
    coordinates: [
      [670, 360],
      [620, 540],
      [370, 710]
    ]
  },
  {
    id: 'road-industrial-rail',
    name: 'Industrial Rail Siding Road',
    fromZoneId: 'zone-d',
    toZoneId: 'zone-e',
    lengthKm: 10.3,
    status: 'CLEAR',
    inundationDepthCm: 11,
    accessibilityPercent: 89,
    criticalRoute: false,
    coordinates: [
      [770, 500],
      [620, 480],
      [480, 450]
    ]
  },
  {
    id: 'road-central-market-sec2',
    name: 'Central Bazaar Heritage Link',
    fromZoneId: 'zone-e',
    toZoneId: 'zone-b',
    lengthKm: 3.9,
    status: 'CLEAR',
    inundationDepthCm: 14,
    accessibilityPercent: 86,
    criticalRoute: false,
    coordinates: [
      [480, 450],
      [410, 445],
      [350, 440]
    ]
  }
];

// 24-hour historical weather telemetry stream
export const HISTORICAL_WEATHER_OBSERVATIONS: HistoricalWeatherPoint[] = [
  { timestamp: 'T-24h', timeLabel: '16:00 Yesterday', rainfallMm: 8, tempC: 29, windSpeedKmh: 14, barometerHpa: 1008, radarReflectivityDbz: 18 },
  { timestamp: 'T-23h', timeLabel: '17:00 Yesterday', rainfallMm: 11, tempC: 28, windSpeedKmh: 16, barometerHpa: 1007, radarReflectivityDbz: 22 },
  { timestamp: 'T-22h', timeLabel: '18:00 Yesterday', rainfallMm: 14, tempC: 28, windSpeedKmh: 19, barometerHpa: 1006, radarReflectivityDbz: 25 },
  { timestamp: 'T-21h', timeLabel: '19:00 Yesterday', rainfallMm: 18, tempC: 27, windSpeedKmh: 22, barometerHpa: 1005, radarReflectivityDbz: 29 },
  { timestamp: 'T-20h', timeLabel: '20:00 Yesterday', rainfallMm: 22, tempC: 26, windSpeedKmh: 25, barometerHpa: 1004, radarReflectivityDbz: 32 },
  { timestamp: 'T-19h', timeLabel: '21:00 Yesterday', rainfallMm: 28, tempC: 26, windSpeedKmh: 28, barometerHpa: 1003, radarReflectivityDbz: 35 },
  { timestamp: 'T-18h', timeLabel: '22:00 Yesterday', rainfallMm: 34, tempC: 25, windSpeedKmh: 31, barometerHpa: 1002, radarReflectivityDbz: 38 },
  { timestamp: 'T-17h', timeLabel: '23:00 Yesterday', rainfallMm: 41, tempC: 25, windSpeedKmh: 34, barometerHpa: 1001, radarReflectivityDbz: 42 },
  { timestamp: 'T-16h', timeLabel: '00:00 Midnight', rainfallMm: 49, tempC: 24, windSpeedKmh: 38, barometerHpa: 1000, radarReflectivityDbz: 45 },
  { timestamp: 'T-15h', timeLabel: '01:00 Today', rainfallMm: 58, tempC: 24, windSpeedKmh: 42, barometerHpa: 998, radarReflectivityDbz: 48 },
  { timestamp: 'T-14h', timeLabel: '02:00 Today', rainfallMm: 66, tempC: 23, windSpeedKmh: 45, barometerHpa: 997, radarReflectivityDbz: 50 },
  { timestamp: 'T-13h', timeLabel: '03:00 Today', rainfallMm: 74, tempC: 23, windSpeedKmh: 47, barometerHpa: 996, radarReflectivityDbz: 51 },
  { timestamp: 'T-12h', timeLabel: '04:00 Today', rainfallMm: 80, tempC: 23, windSpeedKmh: 46, barometerHpa: 995, radarReflectivityDbz: 51 },
  { timestamp: 'T-11h', timeLabel: '05:00 Today', rainfallMm: 86, tempC: 23, windSpeedKmh: 44, barometerHpa: 995, radarReflectivityDbz: 49 },
  { timestamp: 'T-10h', timeLabel: '06:00 Today', rainfallMm: 91, tempC: 24, windSpeedKmh: 41, barometerHpa: 994, radarReflectivityDbz: 48 },
  { timestamp: 'T-09h', timeLabel: '07:00 Today', rainfallMm: 95, tempC: 24, windSpeedKmh: 39, barometerHpa: 994, radarReflectivityDbz: 47 },
  { timestamp: 'T-08h', timeLabel: '08:00 Today', rainfallMm: 99, tempC: 25, windSpeedKmh: 37, barometerHpa: 993, radarReflectivityDbz: 48 },
  { timestamp: 'T-07h', timeLabel: '09:00 Today', rainfallMm: 103, tempC: 25, windSpeedKmh: 38, barometerHpa: 993, radarReflectivityDbz: 50 },
  { timestamp: 'T-06h', timeLabel: '10:00 Today', rainfallMm: 106, tempC: 25, windSpeedKmh: 40, barometerHpa: 992, radarReflectivityDbz: 51 },
  { timestamp: 'T-05h', timeLabel: '11:00 Today', rainfallMm: 108, tempC: 25, windSpeedKmh: 42, barometerHpa: 992, radarReflectivityDbz: 52 },
  { timestamp: 'T-04h', timeLabel: '12:00 Today', rainfallMm: 110, tempC: 26, windSpeedKmh: 43, barometerHpa: 991, radarReflectivityDbz: 52 },
  { timestamp: 'T-03h', timeLabel: '13:00 Today', rainfallMm: 111, tempC: 26, windSpeedKmh: 41, barometerHpa: 991, radarReflectivityDbz: 51 },
  { timestamp: 'T-02h', timeLabel: '14:00 Today', rainfallMm: 112, tempC: 26, windSpeedKmh: 38, barometerHpa: 990, radarReflectivityDbz: 52 },
  { timestamp: 'T-00h', timeLabel: '15:40 Now', rainfallMm: 112, tempC: 26, windSpeedKmh: 36, barometerHpa: 990, radarReflectivityDbz: 52 }
];

// 24-hour historical water level observations across major hydrology monitoring points
export const HISTORICAL_WATER_OBSERVATIONS: HistoricalWaterLevelPoint[] = [
  { timestamp: 'T-24h', timeLabel: '16:00 Yesterday', varunaRiverLevelM: 2.4, eastCanalLevelM: 1.2, bhairavReservoirOutflowCusecs: 12000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-23h', timeLabel: '17:00 Yesterday', varunaRiverLevelM: 2.5, eastCanalLevelM: 1.3, bhairavReservoirOutflowCusecs: 14500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-22h', timeLabel: '18:00 Yesterday', varunaRiverLevelM: 2.7, eastCanalLevelM: 1.4, bhairavReservoirOutflowCusecs: 16000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-21h', timeLabel: '19:00 Yesterday', varunaRiverLevelM: 2.9, eastCanalLevelM: 1.6, bhairavReservoirOutflowCusecs: 18500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-20h', timeLabel: '20:00 Yesterday', varunaRiverLevelM: 3.1, eastCanalLevelM: 1.8, bhairavReservoirOutflowCusecs: 21000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-19h', timeLabel: '21:00 Yesterday', varunaRiverLevelM: 3.3, eastCanalLevelM: 2.0, bhairavReservoirOutflowCusecs: 23500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-18h', timeLabel: '22:00 Yesterday', varunaRiverLevelM: 3.5, eastCanalLevelM: 2.2, bhairavReservoirOutflowCusecs: 26000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-17h', timeLabel: '23:00 Yesterday', varunaRiverLevelM: 3.7, eastCanalLevelM: 2.5, bhairavReservoirOutflowCusecs: 29000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-16h', timeLabel: '00:00 Midnight', varunaRiverLevelM: 3.9, eastCanalLevelM: 2.7, bhairavReservoirOutflowCusecs: 32000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-15h', timeLabel: '01:00 Today', varunaRiverLevelM: 4.1, eastCanalLevelM: 2.9, bhairavReservoirOutflowCusecs: 34500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-14h', timeLabel: '02:00 Today', varunaRiverLevelM: 4.3, eastCanalLevelM: 3.1, bhairavReservoirOutflowCusecs: 37000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-13h', timeLabel: '03:00 Today', varunaRiverLevelM: 4.45, eastCanalLevelM: 3.3, bhairavReservoirOutflowCusecs: 39000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-12h', timeLabel: '04:00 Today', varunaRiverLevelM: 4.55, eastCanalLevelM: 3.5, bhairavReservoirOutflowCusecs: 41000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-11h', timeLabel: '05:00 Today', varunaRiverLevelM: 4.65, eastCanalLevelM: 3.7, bhairavReservoirOutflowCusecs: 42500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-10h', timeLabel: '06:00 Today', varunaRiverLevelM: 4.75, eastCanalLevelM: 3.8, bhairavReservoirOutflowCusecs: 44000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-09h', timeLabel: '07:00 Today', varunaRiverLevelM: 4.82, eastCanalLevelM: 3.9, bhairavReservoirOutflowCusecs: 45000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-08h', timeLabel: '08:00 Today', varunaRiverLevelM: 4.88, eastCanalLevelM: 4.0, bhairavReservoirOutflowCusecs: 45800, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-07h', timeLabel: '09:00 Today', varunaRiverLevelM: 4.95, eastCanalLevelM: 4.1, bhairavReservoirOutflowCusecs: 46500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-06h', timeLabel: '10:00 Today', varunaRiverLevelM: 5.02, eastCanalLevelM: 4.2, bhairavReservoirOutflowCusecs: 47000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-05h', timeLabel: '11:00 Today', varunaRiverLevelM: 5.08, eastCanalLevelM: 4.3, bhairavReservoirOutflowCusecs: 47500, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-04h', timeLabel: '12:00 Today', varunaRiverLevelM: 5.12, eastCanalLevelM: 4.4, bhairavReservoirOutflowCusecs: 48000, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-03h', timeLabel: '13:00 Today', varunaRiverLevelM: 5.16, eastCanalLevelM: 4.5, bhairavReservoirOutflowCusecs: 48200, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-02h', timeLabel: '14:00 Today', varunaRiverLevelM: 5.18, eastCanalLevelM: 4.6, bhairavReservoirOutflowCusecs: 48400, warningThresholdM: 4.4, dangerThresholdM: 4.8 },
  { timestamp: 'T-00h', timeLabel: '15:40 Now', varunaRiverLevelM: 5.20, eastCanalLevelM: 4.8, bhairavReservoirOutflowCusecs: 48500, warningThresholdM: 4.4, dangerThresholdM: 4.8 }
];

export const SIMULATION_TIMELINE_STAGES: SimulationTimelineEvent[] = [
  {
    id: 'tl-1',
    simTime: 'T+00',
    title: 'Disaster Inundation Detected',
    description: '112mm deluge triggers rapid runoff. Sensor telemetry registers river crest above 5.2m.',
    category: 'DETECTION',
    stageIndex: 0,
    status: 'COMPLETED'
  },
  {
    id: 'tl-2',
    simTime: 'T+05',
    title: 'Multi-Signal Deterioration',
    description: 'Hydrological surge and 112 emergency calls diverge. East Canal embankment breaches.',
    category: 'DETECTION',
    stageIndex: 1,
    status: 'COMPLETED'
  },
  {
    id: 'tl-3',
    simTime: 'T+10',
    title: 'Zone C Prioritized as #1',
    description: 'Multi-factor priority engine scores Zone C at 91/100 based on exposure, distress calls, and clinic load.',
    category: 'PRIORITY',
    stageIndex: 2,
    status: 'ACTIVE'
  },
  {
    id: 'tl-4',
    simTime: 'T+12',
    title: '3-Hour Demand Surge Forecasted',
    description: 'Predictive models project incident rate climbing from 42 to 71/hr and hospital saturation at 95%.',
    category: 'RESOURCE',
    stageIndex: 3,
    status: 'UPCOMING'
  },
  {
    id: 'tl-5',
    simTime: 'T+14',
    title: 'Acute Resource Gaps Flagged',
    description: 'Demand in Lowland East exceeds local capacity: -2 Medical Teams, -3 Ambulances, -1 Rescue Team.',
    category: 'RESOURCE',
    stageIndex: 4,
    status: 'UPCOMING'
  },
  {
    id: 'tl-6',
    simTime: 'T+16',
    title: 'Constrained Allocation Optimized',
    description: 'Solver routes Trauma Response Alpha-03 and ALS ambulances to critical zones, reducing unmet demand by 18%.',
    category: 'RESOURCE',
    stageIndex: 5,
    status: 'UPCOMING'
  },
  {
    id: 'tl-7',
    simTime: 'T+17',
    title: 'Safe Route Corridor Verified',
    description: 'Route A (NH-27 Arterial Bypass) identified with 92% accessibility and 18-minute transit ETA.',
    category: 'ROUTE',
    stageIndex: 6,
    status: 'UPCOMING'
  },
  {
    id: 'tl-8',
    simTime: 'T+18',
    title: 'Operator Authorizes Dispatch',
    description: 'Human-in-the-loop commander reviews causal explanation and confirms emergency dispatch to Zone C.',
    category: 'COMMAND',
    stageIndex: 7,
    status: 'UPCOMING'
  },
  {
    id: 'tl-9',
    simTime: 'T+22',
    title: 'NH-27 Inundation Blockage Occurs',
    description: 'Flash levee failure deposits 110cm of water across NH-27. Primary route accessibility drops to 0%.',
    category: 'DISRUPTION',
    stageIndex: 8,
    status: 'UPCOMING'
  },
  {
    id: 'tl-10',
    simTime: 'T+23',
    title: 'Dynamic Replanning Activated',
    description: 'CrisisGrid recalculates alternative network corridors and designates Ring Road East Link (24 min ETA).',
    category: 'ROUTE',
    stageIndex: 9,
    status: 'UPCOMING'
  },
  {
    id: 'tl-11',
    simTime: 'T+25',
    title: 'Operational Loop Validated',
    description: 'Audit log documents end-to-end decision traceability from initial detection through dynamic replanning.',
    category: 'COMMAND',
    stageIndex: 10,
    status: 'UPCOMING'
  }
];

export const INITIAL_WEATHER_SIGNALS: WeatherSignal[] = [
  {
    id: 'ws-1',
    parameter: 'Monsoon Precipitation Intensity',
    currentValue: '112 mm / 6h',
    trend: 'RISING',
    station: 'Varuna Met Station #02 (East Basin)',
    timestamp: '15:40',
    confidence: 'HIGH'
  },
  {
    id: 'ws-2',
    parameter: 'Varuna River Crest Level',
    currentValue: '5.20 m (0.8m above Danger Level)',
    trend: 'RISING',
    station: 'River Confluence Telemetry Gauge',
    timestamp: '15:35',
    confidence: 'HIGH'
  },
  {
    id: 'ws-3',
    parameter: 'Upstream Reservoir Outflow',
    currentValue: '48,500 cusecs (Discharge Rate)',
    trend: 'CRITICAL',
    station: 'Bhairav Dam Central Spillway',
    timestamp: '15:20',
    confidence: 'HIGH'
  },
  {
    id: 'ws-4',
    parameter: 'East Canal Flow Rate',
    currentValue: '3.4 m/s (Embankment Overtopping)',
    trend: 'CRITICAL',
    station: 'Sector 8 Regulator Gate',
    timestamp: '15:30',
    confidence: 'MODERATE'
  },
  {
    id: 'ws-5',
    parameter: 'Atmospheric Radar Reflectivity',
    currentValue: '52 dBZ (Convective Cloud Cell)',
    trend: 'STEADY',
    station: 'Doppler Radar Regional Hub',
    timestamp: '15:30',
    confidence: 'HIGH'
  }
];

export const FORECAST_SERIES: ForecastPoint[] = [
  {
    hourOffset: 'Past -3h',
    rainfallMm: 68,
    waterLevelM: 3.8,
    incidentVolume: 18,
    medicalDemandIndex: 42,
    shelterOccupancyPercent: 62,
    hospitalCapacityStressPercent: 58,
    confidenceLower: 16,
    confidenceUpper: 20
  },
  {
    hourOffset: 'Past -2h',
    rainfallMm: 85,
    waterLevelM: 4.1,
    incidentVolume: 24,
    medicalDemandIndex: 56,
    shelterOccupancyPercent: 71,
    hospitalCapacityStressPercent: 66,
    confidenceLower: 22,
    confidenceUpper: 26
  },
  {
    hourOffset: 'Past -1h',
    rainfallMm: 98,
    waterLevelM: 4.5,
    incidentVolume: 32,
    medicalDemandIndex: 68,
    shelterOccupancyPercent: 79,
    hospitalCapacityStressPercent: 74,
    confidenceLower: 30,
    confidenceUpper: 35
  },
  {
    hourOffset: 'Now',
    rainfallMm: 112,
    waterLevelM: 4.8,
    incidentVolume: 42,
    medicalDemandIndex: 78,
    shelterOccupancyPercent: 86,
    hospitalCapacityStressPercent: 82,
    confidenceLower: 40,
    confidenceUpper: 44
  },
  {
    hourOffset: '+1h',
    rainfallMm: 125,
    waterLevelM: 5.1,
    incidentVolume: 51,
    medicalDemandIndex: 86,
    shelterOccupancyPercent: 92,
    hospitalCapacityStressPercent: 87,
    confidenceLower: 46,
    confidenceUpper: 57
  },
  {
    hourOffset: '+2h',
    rainfallMm: 138,
    waterLevelM: 5.4,
    incidentVolume: 63,
    medicalDemandIndex: 92,
    shelterOccupancyPercent: 96,
    hospitalCapacityStressPercent: 91,
    confidenceLower: 55,
    confidenceUpper: 72
  },
  {
    hourOffset: '+3h',
    rainfallMm: 144,
    waterLevelM: 5.6,
    incidentVolume: 71,
    medicalDemandIndex: 96,
    shelterOccupancyPercent: 98,
    hospitalCapacityStressPercent: 95,
    confidenceLower: 60,
    confidenceUpper: 82
  },
  {
    hourOffset: '+4h',
    rainfallMm: 132,
    waterLevelM: 5.7,
    incidentVolume: 68,
    medicalDemandIndex: 94,
    shelterOccupancyPercent: 97,
    hospitalCapacityStressPercent: 94,
    confidenceLower: 56,
    confidenceUpper: 80
  },
  {
    hourOffset: '+5h',
    rainfallMm: 115,
    waterLevelM: 5.5,
    incidentVolume: 59,
    medicalDemandIndex: 88,
    shelterOccupancyPercent: 94,
    hospitalCapacityStressPercent: 89,
    confidenceLower: 48,
    confidenceUpper: 71
  },
  {
    hourOffset: '+6h',
    rainfallMm: 92,
    waterLevelM: 5.1,
    incidentVolume: 48,
    medicalDemandIndex: 80,
    shelterOccupancyPercent: 89,
    hospitalCapacityStressPercent: 83,
    confidenceLower: 38,
    confidenceUpper: 59
  }
];

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'preset-severe-flood',
    name: 'Severe Flood (Baseline)',
    description: 'Current active scenario: 112mm rain, East Canal breach, multiple critical zones in Lowland East and River Junction.',
    rainfallMultiplier: 1.0,
    waterLevelAdjustmentM: 0.0,
    incidentRateMultiplier: 1.0,
    roadDisruptionLevel: 'MODERATE',
    resourceAvailabilityPercent: 100
  },
  {
    id: 'preset-extreme-flood',
    name: 'Extreme Flood (Dam Breach)',
    description: 'Bhairav Dam spillway surges to 65,000 cusecs. Water level reaches 6.2m. Widespread inundation across 7 zones.',
    rainfallMultiplier: 1.45,
    waterLevelAdjustmentM: 1.4,
    incidentRateMultiplier: 1.6,
    roadDisruptionLevel: 'CRITICAL',
    resourceAvailabilityPercent: 90
  },
  {
    id: 'preset-normal-flood',
    name: 'Normal Monsoon Flood',
    description: 'Controlled monsoon runoff within seasonal floodplains. River level below danger threshold. Moderate localized waterlogging.',
    rainfallMultiplier: 0.65,
    waterLevelAdjustmentM: -1.2,
    incidentRateMultiplier: 0.5,
    roadDisruptionLevel: 'MINIMAL',
    resourceAvailabilityPercent: 100
  },
  {
    id: 'preset-resource-shortage',
    name: 'Resource Depletion / Austerity',
    description: 'Multiple rescue vehicles trapped or offline due to contaminated fuel and mechanical strain. Only 40% fleet operational.',
    rainfallMultiplier: 1.0,
    waterLevelAdjustmentM: 0.0,
    incidentRateMultiplier: 1.2,
    roadDisruptionLevel: 'MODERATE',
    resourceAvailabilityPercent: 45
  },
  {
    id: 'preset-road-disruption',
    name: 'Catastrophic Road Network Cutoff',
    description: 'NH-27 arterial bridge inundated and multiple embankments collapsed. 60% of road network impassable for heavy vehicles.',
    rainfallMultiplier: 1.15,
    waterLevelAdjustmentM: 0.4,
    incidentRateMultiplier: 1.3,
    roadDisruptionLevel: 'CRITICAL',
    resourceAvailabilityPercent: 80
  }
];

export const INITIAL_DECISION_LOG: DecisionLogEntry[] = [
  {
    id: 'dec-1',
    timestamp: '14:32',
    situation: 'Zone C (Lowland East) water ingress crossed 4.5m; +38% surge in distress calls.',
    recommendation: 'Dispatch Trauma Response Alpha-03 and 2 ALS Ambulances via NH-27 bypass.',
    reason: 'Critical medical shortage: East Sub-district Clinic reaching saturation while high elderly population trapped.',
    operatorDecision: 'ACCEPTED',
    operatorNotes: 'Authorized immediate dispatch under priority emergency code.',
    result: 'Trauma Response Alpha-03 deployed; arrival window 18 min.',
    impactMetric: 'Unmet medical demand reduced by estimated 18%'
  },
  {
    id: 'dec-2',
    timestamp: '14:47',
    situation: 'River Junction bridge approach submerged (74cm flood depth).',
    recommendation: 'Re-route SDRF Boat Convoy via Ring Road East rather than River Bund Road.',
    reason: 'River Bund road impassable for wheeled transports; high vehicle stall probability.',
    operatorDecision: 'ACCEPTED',
    operatorNotes: 'Field commanders instructed to avoid bund crest.',
    result: 'Convoy safely redirected; zero vehicle loss reported.',
    impactMetric: 'Avoided 45 min mission abort risk'
  },
  {
    id: 'dec-3',
    timestamp: '15:10',
    situation: 'Civil Hospital backup generator fuel supply line threatened by backflow.',
    recommendation: 'Divert Civil Defense Delta-04 sandbag unit from Sector 6 market to Hospital Substation.',
    reason: 'Hospital power failure would jeopardize 45 ICU life-support beds.',
    operatorDecision: 'ACCEPTED',
    operatorNotes: 'Hospital power is priority tier 1 infrastructure.',
    result: 'Sandbag levee erected around generator shed within 25 minutes.',
    impactMetric: 'Hospital power integrity secured'
  }
];
