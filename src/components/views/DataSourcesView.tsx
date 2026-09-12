import React from 'react';
import {
  Database,
  Radio,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Server,
  CloudRain,
  Waves,
  Satellite,
  PhoneCall,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface DataSourceInfo {
  id: string;
  name: string;
  category: string;
  provider: string;
  status: 'ONLINE' | 'DEGRADED' | 'STANDBY';
  latencyMs: number;
  updateFrequency: string;
  telemetryType: string;
  lastReading: string;
  confidenceScore: number;
  description: string;
}

export const DataSourcesView: React.FC = () => {
  const dataSources: DataSourceInfo[] = [
    {
      id: 'ds-cwc-gauge',
      name: 'Varuna Confluence Hydrological Gauge #02',
      category: 'HYDROLOGY',
      provider: 'Central Water Commission (CWC)',
      status: 'ONLINE',
      latencyMs: 140,
      updateFrequency: 'Every 5 min',
      telemetryType: 'Ultrasonic River Crest Depth (m)',
      lastReading: '5.20 m (+0.40m above Danger)',
      confidenceScore: 99,
      description: 'Continuous telemetry station measuring Varuna River gauge elevation above mean sea level.'
    },
    {
      id: 'ds-imd-radar',
      name: 'Doppler Weather Radar (DWR) Catchment Scan',
      category: 'METEOROLOGY',
      provider: 'India Meteorological Department (IMD)',
      status: 'ONLINE',
      latencyMs: 220,
      updateFrequency: 'Every 10 min',
      telemetryType: 'S-Band Radar Reflectivity (dBZ) & QPE',
      lastReading: '52 dBZ &bull; 112mm / 6h cumulative',
      confidenceScore: 96,
      description: 'Quantitative Precipitation Estimation (QPE) over Varuna basin eastern tributaries.'
    },
    {
      id: 'ds-dam-scada',
      name: 'Bhairav Reservoir Dam Barrage SCADA System',
      category: 'RESERVOIR',
      provider: 'State Irrigation & Flood Control Dept',
      status: 'ONLINE',
      latencyMs: 85,
      updateFrequency: 'Real-time telemetry',
      telemetryType: 'Outflow Gate Discharge (Cusecs)',
      lastReading: '48,500 cusecs (Spillway crest open)',
      confidenceScore: 100,
      description: 'Dam telemetry tracking reservoir elevation (342.1m) and active spillway release rates.'
    },
    {
      id: 'ds-cad-112',
      name: 'National Emergency Response CAD Feed (112)',
      category: 'DISTRESS_CALLS',
      provider: 'Emergency Response Support System (ERSS)',
      status: 'ONLINE',
      latencyMs: 310,
      updateFrequency: 'Push Stream (WebSocket)',
      telemetryType: 'Geolocated Distress Call Volume',
      lastReading: '+38% call surge in Zone C',
      confidenceScore: 94,
      description: 'Live citizen distress ingestion classifying trapped individuals, medical emergencies, and food requests.'
    },
    {
      id: 'ds-sar-sat',
      name: 'Sentinel-1 SAR Satellite Water Mask Extent',
      category: 'REMOTE_SENSING',
      provider: 'Copernicus Emergency Management Service',
      status: 'ONLINE',
      latencyMs: 1800,
      updateFrequency: 'Every orbit pass (6h synthetic)',
      telemetryType: 'Synthetic Aperture Radar Inundation Polygons',
      lastReading: '38.4 sq km flooded surface area',
      confidenceScore: 92,
      description: 'Cloud-penetrating radar imagery delineating low-lying basin inundation and levee overflow.'
    },
    {
      id: 'ds-nh27-sensor',
      name: 'NH-27 Arterial Bypass Ingress Float Sensor',
      category: 'INFRASTRUCTURE',
      provider: 'National Highways Authority (NHAI)',
      status: 'DEGRADED',
      latencyMs: 450,
      updateFrequency: 'Every 2 min',
      telemetryType: 'Underpass Hydrostatic Pressure (cm)',
      lastReading: '110 cm depth (Submerged)',
      confidenceScore: 88,
      description: 'Smart highway sensor detecting roadway water accumulation and structural bridge clearance.'
    }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              REAL-TIME TELEMETRY INGESTION & DATA SOURCES
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Multisensor integration &bull; Hydrological gauges, Doppler radar, 112 CAD, & satellite SAR
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>6 / 6 Streams Active</span>
          </span>
        </div>
      </div>

      {/* Grid of Data Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dataSources.map((ds) => (
          <div
            key={ds.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  {ds.category}
                </span>
                <h3 className="font-bold text-white text-sm mt-1.5">{ds.name}</h3>
                <span className="text-[11px] text-slate-400">{ds.provider}</span>
              </div>

              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 ${
                  ds.status === 'ONLINE'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>{ds.status}</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {ds.description}
            </p>

            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2 rounded">
                <span className="text-[10px] text-slate-500 block">Update Freq</span>
                <span className="text-slate-200 font-bold">{ds.updateFrequency}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded">
                <span className="text-[10px] text-slate-500 block">Ingest Latency</span>
                <span className="text-cyan-400 font-bold">{ds.latencyMs} ms</span>
              </div>
              <div className="bg-slate-950 p-2 rounded col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 block">Confidence</span>
                <span className="text-emerald-400 font-bold">{ds.confidenceScore}%</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Latest Value:</span>
              <strong className="text-white">{ds.lastReading}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Sensor Ingest Health Architecture Notice */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-2 text-xs">
        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Fault-Tolerant Telemetry Buffer & Data Validation Protocol</span>
        </div>
        <p className="text-slate-400 font-sans text-xs leading-relaxed">
          CrisisGrid implements dead-reckoning and Kalman filtering across all intermittent gauge streams. If a field
          sensor experiences signal blackout due to submerged towers, the system maintains short-horizon hydrodynamic
          projections backed by radar rainfall accumulation curves until connectivity is restored.
        </p>
      </div>
    </div>
  );
};
