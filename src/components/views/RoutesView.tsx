import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Navigation,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Gauge
} from 'lucide-react';

export const RoutesView: React.FC = () => {
  const {
    roads,
    activeRoutes,
    nh27Blocked,
    simulateRoadBlockEvent,
    setActiveTab
  } = useSimulation();

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              SAFE ROUTE EVALUATION & DYNAMIC RE-PLANNING
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time arterial passability, bridge water logging & automated bypass replanning
          </p>
        </div>

        {/* Dynamic Replanning Trigger Button */}
        <button
          onClick={simulateRoadBlockEvent}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-lg ${
            nh27Blocked
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950'
              : 'bg-rose-700 hover:bg-rose-600 text-white shadow-rose-950'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{nh27Blocked ? 'CLEAR NH-27 INUNDATION' : 'SIMULATE NH-27 ROAD BREACH'}</span>
        </button>
      </div>

      {/* Dynamic Replanning Scenario Alert Banner */}
      {nh27Blocked ? (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-700/80 shadow-xl space-y-2 font-mono text-xs text-rose-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>INCIDENT DETECTED: NH-27 ARTERIAL ROAD BREACHED</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-900 border border-rose-700 text-white text-[10px]">
              REPLANNING TRIGGERED
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans">
            Water depth on segment R-04 reached 110cm. All low-clearance emergency transport (ambulances and light relief vans) cannot traverse safely.
            CrisisGrid automatically invalidated Corridor A and transitioned active dispatches to Ring Road East Bypass.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-300">
            <div>
              Original Corridor (NH-27): <strong className="text-rose-400">18 min (IMPASSABLE)</strong>
            </div>
            <div>&rarr;</div>
            <div>
              Replanned Corridor (Ring Road East): <strong className="text-emerald-400">24 min (100% CLEAR, +6 min delta)</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Primary arterial corridors operating under normal emergency passability standards.</span>
          </div>
          <span className="text-[11px] text-slate-500">Click button above to test dynamic replanning</span>
        </div>
      )}

      {/* Active Evaluated Route Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            Evaluated Transit Corridors to Zone C (Lowland East)
          </span>
          <span className="text-slate-400">{activeRoutes.length} Corridors Evaluated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
          {activeRoutes.map((route) => {
            const isBlocked = route.blockedSegmentsCount > 0;
            return (
              <div
                key={route.id}
                className={`p-5 rounded-xl border transition shadow-lg ${
                  route.isRecommended
                    ? 'bg-cyan-950/30 border-cyan-600/80'
                    : isBlocked
                    ? 'bg-rose-950/20 border-rose-900/40 opacity-80'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Transit Option</span>
                    <h3 className="text-sm font-bold text-white">{route.name}</h3>
                  </div>
                  {route.isRecommended ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold">
                      RECOMMENDED
                    </span>
                  ) : isBlocked ? (
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700 text-[10px] font-bold">
                      IMPASSABLE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      SECONDARY
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] text-slate-400 block">ETA</span>
                    <span
                      className={`text-sm font-bold ${
                        isBlocked ? 'text-rose-400' : 'text-slate-200'
                      }`}
                    >
                      {isBlocked ? 'Blocked' : `${route.etaMinutes} min`}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Distance</span>
                    <span className="text-sm font-bold text-slate-200">{route.distanceKm} km</span>
                  </div>

                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Accessibility</span>
                    <span
                      className={`text-sm font-bold ${
                        route.accessibilityPercent < 50 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {route.accessibilityPercent}%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-950/80 border border-slate-800/80 text-xs mb-3">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">
                    Route Feasibility Reasoning:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {route.hazards && route.hazards.length > 0 ? route.hazards.join('; ') : 'All segments verified clear and above flood crest.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Hazards: {route.hazards ? route.hazards.length : 0} alerts</span>
                  <span>Risk Level: <strong className="text-cyan-300">{route.riskLevel}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Road Segment Catalog */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg font-mono text-xs">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-white uppercase tracking-wider">
            Monitored District Arterial & Feeder Road Segments
          </span>
          <span className="text-slate-400 text-[11px]">{roads.length} Segments Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-3 py-2.5">Road Code & Name</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Inundation Depth</th>
                <th className="px-3 py-2.5">Accessibility</th>
                <th className="px-3 py-2.5">Length</th>
                <th className="px-3 py-2.5">Priority Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {roads.map((rd) => {
                const isNh27 = rd.id === 'road-nh27-main';
                const isBlocked = rd.status === 'BLOCKED' || (isNh27 && nh27Blocked);
                return (
                  <tr key={rd.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-3 py-2.5 font-bold text-white">
                      {rd.name}
                      {rd.criticalRoute && (
                        <span className="ml-2 text-[9px] px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          CRITICAL ARTERY
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          isBlocked
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : rd.status === 'CAUTION'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {isBlocked ? 'BLOCKED' : rd.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-cyan-300 font-bold">
                      {isBlocked ? '110 cm' : `${rd.inundationDepthCm} cm`}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              isBlocked ? 'bg-rose-500' : rd.accessibilityPercent < 70 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${isBlocked ? 0 : rd.accessibilityPercent}%` }}
                          />
                        </div>
                        <span className="text-slate-400 text-[10px]">
                          {isBlocked ? '0%' : `${rd.accessibilityPercent}%`}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">
                      {rd.lengthKm} km
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">
                      {rd.criticalRoute ? 'Primary Arterial' : 'Secondary Feeder'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
