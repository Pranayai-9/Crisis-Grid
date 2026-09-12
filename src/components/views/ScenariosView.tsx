import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { SCENARIO_PRESETS } from '../../data/mockData';
import {
  Sliders,
  Play,
  RotateCcw,
  CloudRain,
  Waves,
  AlertTriangle,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ScenariosView: React.FC = () => {
  const {
    currentScenarioId,
    applyScenarioPreset,
    updateConditionSliders,
    zones,
    kpis,
    resetSimulation
  } = useSimulation();

  const [rainfallVal, setRainfallVal] = useState(1.0);
  const [waterVal, setWaterVal] = useState(0.0);
  const [incidentVal, setIncidentVal] = useState(1.0);

  const handleSliderChange = (type: 'rain' | 'water' | 'incident', val: number) => {
    if (type === 'rain') {
      setRainfallVal(val);
      updateConditionSliders({ rainfallMultiplier: val });
    } else if (type === 'water') {
      setWaterVal(val);
      updateConditionSliders({ waterLevelOffset: val });
    } else {
      setIncidentVal(val);
      updateConditionSliders({ incidentMultiplier: val });
    }
  };

  const currentPreset = SCENARIO_PRESETS.find((p) => p.id === currentScenarioId) || SCENARIO_PRESETS[0];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              SCENARIO SIMULATOR & PARAMETRIC STRESS TESTING
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Evaluate disaster severity models &bull; Fine-tune hydrological & emergency parameters
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5 text-xs self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Preset Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Curated Historical & Stress Test Presets
          </span>
          <span className="text-[11px] text-cyan-400">SELECT TO INSTANTLY RECALCULATE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SCENARIO_PRESETS.map((preset) => {
            const isSelected = preset.id === currentScenarioId;

            return (
              <div
                key={preset.id}
                onClick={() => applyScenarioPreset(preset.id)}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        preset.roadDisruptionLevel === 'SEVERE'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : preset.roadDisruptionLevel === 'MODERATE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      }`}
                    >
                      {preset.roadDisruptionLevel} DISRUPTION
                    </span>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] text-cyan-300 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1.5">{preset.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-3 font-sans leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-1 text-[10px] text-center text-slate-400">
                  <div className="bg-slate-950 p-1.5 rounded">
                    <span className="block text-slate-500">Rainfall</span>
                    <strong className="text-white">{preset.rainfallMultiplier}x</strong>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded">
                    <span className="block text-slate-500">River Rise</span>
                    <strong className="text-blue-300">+{preset.waterLevelAdjustmentM}m</strong>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded">
                    <span className="block text-slate-500">Incidents</span>
                    <strong className="text-rose-300">{preset.incidentRateMultiplier}x</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Condition Adjustment Sliders */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-white uppercase tracking-wider text-xs block">
              Continuous Parametric Adjustment
            </span>
            <span className="text-[11px] text-slate-400 font-sans">
              Drag sliders to dynamically perturb the simulation engine in real-time.
            </span>
          </div>
          <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            Real-time Sensitivity Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Rainfall Intensity Slider */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <span>Precipitation Multiplier</span>
              </span>
              <span className="text-cyan-400 font-bold">{rainfallVal.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={rainfallVal}
              onChange={(e) => handleSliderChange('rain', parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.5x (Drizzle)</span>
              <span>1.0x (Normal)</span>
              <span>2.5x (Cloudburst)</span>
            </div>
          </div>

          {/* Water Level Rise Slider */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-blue-400" />
                <span>Hydrological Crest Offset</span>
              </span>
              <span className="text-blue-400 font-bold">+{waterVal.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="-0.5"
              max="2.0"
              step="0.1"
              value={waterVal}
              onChange={(e) => handleSliderChange('water', parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>-0.5m (Receding)</span>
              <span>0.0m (Baseline)</span>
              <span>+2.0m (Overtopping)</span>
            </div>
          </div>

          {/* Incident Surge Slider */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Distress Call Surge Multiplier</span>
              </span>
              <span className="text-rose-400 font-bold">{incidentVal.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={incidentVal}
              onChange={(e) => handleSliderChange('incident', parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.5x (Subdued)</span>
              <span>1.0x (Reported)</span>
              <span>2.5x (Catastrophic)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Live Impact Comparison Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="font-bold text-white uppercase tracking-wider">
            Projected System State Under Current Scenario ({currentPreset.name})
          </span>
          <span className="text-[10px] text-cyan-400 font-bold">12 ZONES RECOMPUTED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Critical Zones</span>
            <div className="text-2xl font-black text-rose-400 mt-1">{kpis.criticalZonesCount}</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Exceeding 85 Priority</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Estimated Exposed Pop</span>
            <div className="text-2xl font-black text-cyan-300 mt-1">
              {zones.reduce((sum, z) => sum + z.populationExposed, 0).toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Across 12 flood basins</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Corridor Accessibility</span>
            <div className="text-2xl font-black text-amber-300 mt-1">
              {kpis.roadsBlockedCount > 0 ? 'Degraded' : 'Nominal'}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">{kpis.roadsBlockedCount} routes impassable</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Fleet Deficit Stress</span>
            <div className="text-2xl font-black text-purple-300 mt-1">{kpis.unmetDemandPercent}%</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Scarcity gap in critical zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};
