import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  CloudRain,
  Radio,
  Waves,
  AlertTriangle,
  Building,
  Truck,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const LiveSituationView: React.FC = () => {
  const { weatherSignals, incidents, hospitals, shelters, resources, roads, kpis } = useSimulation();

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              SITUATIONAL AWARENESS MATRIX
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time multi-source operational signals: Weather, Hydrology, Field Incidents, Infrastructure & Capacity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>INGESTION ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Grid of 4 Major Signal Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Domain 1: Weather & Hydrological Telemetry */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Weather & Hydrological Stream
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              5 TELEMETRY GAUGES
            </span>
          </div>

          <div className="space-y-3">
            {weatherSignals.map((sig) => (
              <div
                key={sig.id}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-800/50 transition font-mono text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-300 font-bold">{sig.parameter}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      sig.trend === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : sig.trend === 'RISING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {sig.trend}
                  </span>
                </div>
                <div className="text-sm font-bold text-cyan-300 mt-1">{sig.currentValue}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-1.5 border-t border-slate-900">
                  <span>Sensor: {sig.station}</span>
                  <span>Confidence: <strong className="text-slate-400">{sig.confidence}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain 2: Field Incidents & Distress Feed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Distress & Incident Signals
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              {kpis.activeIncidents} ACTIVE
            </span>
          </div>

          <div className="space-y-3">
            {incidents.slice(0, 5).map((inc) => (
              <div
                key={inc.id}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-amber-800/50 transition font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        inc.severity === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-bold text-slate-200">
                      {inc.type} &bull; {inc.zoneName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{inc.reportedTime}</span>
                </div>
                <p className="text-xs font-sans text-slate-300 mt-1.5 line-clamp-2">
                  {inc.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-900">
                  <span>Affected: <strong className="text-amber-300">{inc.peopleAffected}</strong></span>
                  <span className="uppercase text-cyan-400">Status: {inc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain 3: Infrastructure Stress & Transport Access */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Facility & Road Infrastructure
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              5 HOSPITALS &bull; 7 SHELTERS
            </span>
          </div>

          <div className="space-y-3">
            {/* Top Critical Facilities */}
            {hospitals.slice(0, 3).map((hosp) => (
              <div
                key={hosp.id}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{hosp.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      hosp.status === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {hosp.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] mt-2">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Bed Occupancy</span>
                    <span className="font-bold text-slate-200">
                      {Math.round((hosp.occupiedBeds / hosp.totalBeds) * 100)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">ICU Available</span>
                    <span className="font-bold text-cyan-300">{hosp.icuAvailable} beds</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Flood Risk</span>
                    <span className="font-bold text-rose-400">{hosp.floodRisk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain 4: Emergency Fleet & Resource Readiness */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Emergency Fleet Status
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              30 ASSETS MONITORED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Rescue Squads</span>
              <div className="text-lg font-bold text-white mt-1">6 Total</div>
              <div className="text-[10px] text-cyan-400 mt-1">4 Deployed &bull; 2 Available</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Medical Teams</span>
              <div className="text-lg font-bold text-white mt-1">4 Total</div>
              <div className="text-[10px] text-cyan-400 mt-1">3 Deployed &bull; 1 Available</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Ambulances</span>
              <div className="text-lg font-bold text-white mt-1">8 Total</div>
              <div className="text-[10px] text-cyan-400 mt-1">6 Deployed &bull; 2 Available</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Relief Logistics</span>
              <div className="text-lg font-bold text-white mt-1">12 Total</div>
              <div className="text-[10px] text-cyan-400 mt-1">7 Deployed &bull; 5 Available</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs font-mono text-rose-300">
            <span className="font-bold block mb-1 uppercase text-[10px]">Resource Scarcity Alert:</span>
            Unallocated medical and ambulance reserves are critically low (1 Med Team, 2 Ambulances remaining in reserve).
          </div>
        </div>
      </div>
    </div>
  );
};
