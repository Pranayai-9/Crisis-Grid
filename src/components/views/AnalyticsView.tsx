import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Activity,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Users,
  Clock,
  Award,
  Sparkles,
  BarChart3,
  Layers,
  CloudRain,
  Waves,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  FastForward
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    zones,
    historicalWeather,
    historicalWaterLevels,
    timelineStages,
    demoStep,
    nextDemoEvent,
    prevDemoEvent,
    setDemoStep,
    simTimeCode,
    simulateIncidentSurge,
    simulateWaterLevelRise,
    simulateResourceShortage,
    simulateRoadBlockEvent,
    runReplanning,
    nh27Blocked,
    resetSimulation
  } = useSimulation();

  // Max rainfall and water levels for chart scaling
  const maxRainfall = Math.max(...historicalWeather.map((w) => w.rainfallMm), 120);
  const maxWaterLevel = 6.0;

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              OPERATIONAL ANALYTICS, HISTORICAL TELEMETRY & TIMELINE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            24-hour historical sensor data &bull; Active timeline progression &bull; Impact assessment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-3 py-1 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Current Step: <strong className="text-white">{simTimeCode}</strong> (Stage {demoStep + 1}/11)
          </span>
        </div>
      </div>

      {/* Quick Simulation Stage Stepper & Interactive Triggers */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <FastForward className="w-4 h-4 text-amber-400" />
              <span>Simulation Stage Stepper & Event Injector</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Advance through the 11 disaster stages or manually trigger stress events to test system resilience.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={prevDemoEvent}
              disabled={demoStep === 0}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition"
            >
              &larr; Prev Stage
            </button>
            <button
              onClick={nextDemoEvent}
              disabled={demoStep >= 10}
              className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition flex items-center gap-1.5"
            >
              <span>Next Stage &rarr;</span>
            </button>
            <button
              onClick={resetSimulation}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Action Injector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 font-mono text-[11px]">
          <button
            onClick={simulateIncidentSurge}
            className="p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-left border border-slate-700/80 hover:border-amber-500/50 transition group"
          >
            <div className="text-amber-400 font-bold group-hover:text-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>+35% Incident Surge</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Inject rapid distress influx</div>
          </button>

          <button
            onClick={simulateWaterLevelRise}
            className="p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-left border border-slate-700/80 hover:border-blue-500/50 transition group"
          >
            <div className="text-blue-400 font-bold group-hover:text-blue-300 flex items-center gap-1">
              <Waves className="w-3.5 h-3.5" />
              <span>+0.6m River Crest</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Surpass levee height</div>
          </button>

          <button
            onClick={simulateResourceShortage}
            className="p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-left border border-slate-700/80 hover:border-rose-500/50 transition group"
          >
            <div className="text-rose-400 font-bold group-hover:text-rose-300 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Fleet Shortage (4 Off)</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Force severe scarcity</div>
          </button>

          <button
            onClick={nh27Blocked ? runReplanning : simulateRoadBlockEvent}
            className={`p-2 rounded text-left border transition group ${
              nh27Blocked
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-rose-950/40 border-rose-700/60 text-rose-300 hover:bg-rose-900/40'
            }`}
          >
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{nh27Blocked ? 'Execute Replanning' : 'Trigger NH-27 Block'}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {nh27Blocked ? 'Re-route via Ring Road' : 'Breach at Km 6.8'}
            </div>
          </button>
        </div>
      </div>

      {/* Top Impact Headline Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Lives Protected (Simulated)</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300 mt-2">14,800+</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High-Priority Basin Reach</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Response Time Reduction</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2">-38%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            21 min vs 34 min baseline average
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Unmet Demand Reduction</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2">-42%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Deficit lowered from 31% to 18%
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Fleet Resource Utilization</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300 mt-2">89%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            +18% higher than uncoordinated dispatch
          </div>
        </div>
      </div>

      {/* 24-Hour Telemetry Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rainfall & Radar Reflectivity Telemetry */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                24-Hour Cumulative Rainfall (mm)
              </span>
            </div>
            <span className="text-[11px] text-cyan-400 font-bold">Latest: 112 mm</span>
          </div>

          {/* SVG Bar / Area visualization */}
          <div className="h-44 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-800/80">
            {historicalWeather.map((pt, i) => {
              const heightPct = Math.round((pt.rainfallMm / maxRainfall) * 100);
              const isRecent = i >= historicalWeather.length - 4;
              return (
                <div key={pt.timestamp} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isRecent ? 'bg-cyan-400 group-hover:bg-cyan-300' : 'bg-blue-600/70 group-hover:bg-blue-500'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-slate-950 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-200 whitespace-nowrap shadow-xl">
                      <p className="font-bold text-white">{pt.timeLabel}</p>
                      <p className="text-cyan-300">{pt.rainfallMm} mm | {pt.windSpeedKmh} km/h wind</p>
                      <p className="text-slate-400">{pt.radarReflectivityDbz} dBZ radar</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>T-24h (16:00 Yesterday)</span>
            <span>T-12h (04:00 Today)</span>
            <span className="text-cyan-400 font-bold">T-00h (Now: 112mm)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-center">
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Peak Wind</span>
              <span className="text-sm font-bold text-slate-200">47 km/h</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Min Barometer</span>
              <span className="text-sm font-bold text-amber-300">990 hPa</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Radar Echo</span>
              <span className="text-sm font-bold text-rose-400">52 dBZ</span>
            </div>
          </div>
        </div>

        {/* River & Canal Hydrological Gauge Level Telemetry */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                24-Hour River Crest vs. Danger Level (m)
              </span>
            </div>
            <span className="text-[11px] text-rose-400 font-bold">5.20m (Danger: 4.80m)</span>
          </div>

          {/* SVG line/bars representation */}
          <div className="h-44 relative flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-800/80">
            {/* Danger Level Line */}
            <div
              className="absolute left-0 right-0 border-b border-dashed border-rose-500/80 z-10 pointer-events-none"
              style={{ bottom: `${(4.8 / maxWaterLevel) * 100}%` }}
            >
              <span className="absolute right-0 -top-4 text-[9px] font-bold text-rose-400 bg-slate-950 px-1 rounded">
                DANGER (4.8m)
              </span>
            </div>

            {/* Warning Level Line */}
            <div
              className="absolute left-0 right-0 border-b border-dotted border-amber-500/60 z-10 pointer-events-none"
              style={{ bottom: `${(4.4 / maxWaterLevel) * 100}%` }}
            >
              <span className="absolute left-0 -top-4 text-[9px] font-bold text-amber-400 bg-slate-950 px-1 rounded">
                WARNING (4.4m)
              </span>
            </div>

            {historicalWaterLevels.map((pt, i) => {
              const heightPct = Math.round((pt.varunaRiverLevelM / maxWaterLevel) * 100);
              const isAboveDanger = pt.varunaRiverLevelM >= pt.dangerThresholdM;
              return (
                <div key={pt.timestamp} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isAboveDanger
                        ? 'bg-rose-500 group-hover:bg-rose-400'
                        : pt.varunaRiverLevelM >= pt.warningThresholdM
                        ? 'bg-amber-500 group-hover:bg-amber-400'
                        : 'bg-teal-500/70 group-hover:bg-teal-400'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-slate-950 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-200 whitespace-nowrap shadow-xl">
                      <p className="font-bold text-white">{pt.timeLabel}</p>
                      <p className="text-rose-400">River: {pt.varunaRiverLevelM}m</p>
                      <p className="text-amber-300">Canal: {pt.eastCanalLevelM}m</p>
                      <p className="text-slate-400">Outflow: {pt.bhairavReservoirOutflowCusecs.toLocaleString()} cusecs</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>T-24h (2.4m normal)</span>
            <span>T-13h (4.45m warning)</span>
            <span className="text-rose-400 font-bold">T-00h (5.20m +0.4m breach)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-center">
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Reservoir Inflow</span>
              <span className="text-sm font-bold text-slate-200">52,000 cfs</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Spillway Discharge</span>
              <span className="text-sm font-bold text-rose-400">48,500 cfs</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded">
              <span className="text-[10px] text-slate-400 block">Canal Freeboard</span>
              <span className="text-sm font-bold text-amber-400">-0.20m (Submerged)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 11-Stage Disaster Timeline */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase tracking-wider">
              DISASTER RESPONSE TIMELINE & OPERATIONAL STAGES
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Current: <strong className="text-cyan-300">{simTimeCode}</strong> (Click any step to jump)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pt-2">
          {timelineStages.map((stage, idx) => {
            const isCurrent = idx === demoStep;
            const isDone = idx < demoStep;

            return (
              <div
                key={stage.id}
                onClick={() => setDemoStep(idx)}
                className={`p-3 rounded-lg border transition cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-950/50'
                    : isDone
                    ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-85'
                    : 'bg-slate-950/30 border-slate-900 hover:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-950'
                          : isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stage.simTime}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Stage {idx + 1}</span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Done</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[10px] text-cyan-300 font-bold animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Upcoming</span>
                  )}
                </div>

                <div className="font-bold text-slate-100 text-xs line-clamp-1">{stage.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-sans">{stage.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone Priority & Severity Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="font-bold text-white uppercase tracking-wider">
            Current Zone Priority Distribution Across All 12 Basins
          </span>
          <span className="text-[10px] text-slate-400">12 MONITORED ZONES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {zones.map((zone) => (
            <div key={zone.id} className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      zone.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : zone.severity === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {zone.code}
                  </span>
                  <span className="text-white font-bold">{zone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold">Score: {zone.priorityScore}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{zone.populationExposed.toLocaleString()} pop</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${
                    zone.severity === 'CRITICAL'
                      ? 'bg-rose-500'
                      : zone.severity === 'HIGH'
                      ? 'bg-orange-500'
                      : zone.severity === 'MODERATE'
                      ? 'bg-amber-500'
                      : 'bg-teal-500'
                  }`}
                  style={{ width: `${zone.priorityScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
