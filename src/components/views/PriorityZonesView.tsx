import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  BarChart3,
  Sliders,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { PriorityWeights } from '../../types';

export const PriorityZonesView: React.FC = () => {
  const {
    zones,
    priorityWeights,
    setPriorityWeights,
    selectedZoneId,
    selectZone,
    setActiveTab
  } = useSimulation();

  const handleWeightChange = (key: keyof PriorityWeights, value: number) => {
    setPriorityWeights({
      ...priorityWeights,
      [key]: value
    });
  };

  const resetWeights = () => {
    setPriorityWeights({
      exposure: 25,
      incidentGrowth: 25,
      hazardSeverity: 20,
      capacityStress: 20,
      infrastructureRisk: 10
    });
  };

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'MODERATE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
      default:
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              PRIORITY ENGINE & ZONE SCORING
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dynamic multi-criteria ranking under resource constraints &bull; Prototype Priority Model
          </p>
        </div>

        <button
          onClick={resetWeights}
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Weights (25/25/20/20/10)</span>
        </button>
      </div>

      {/* Mathematical Formulation Panel */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Prototype Priority Model Formula</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            PROTOTYPE EQUATION — DEMONSTRATION LOGIC
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <div className="text-cyan-300 font-bold mb-1">
            Priority Score = (w₁ × Exposure) + (w₂ × Incident Growth) + (w₃ × Hazard Severity) + (w₄ × Capacity Stress) + (w₅ × Infrastructure Risk)
          </div>
          <div className="text-[11px] text-slate-400">
            Calculated across all 12 zones dynamically. Modifying weights updates zone ranks in real-time.
          </div>
        </div>

        {/* Weight Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>w₁ Exposure</span>
              <span className="text-cyan-400 font-bold">{priorityWeights.exposure}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={priorityWeights.exposure}
              onChange={(e) => handleWeightChange('exposure', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-400 block mt-1">Pop exposed to flood</span>
          </div>

          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>w₂ Growth</span>
              <span className="text-cyan-400 font-bold">{priorityWeights.incidentGrowth}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={priorityWeights.incidentGrowth}
              onChange={(e) => handleWeightChange('incidentGrowth', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-400 block mt-1">Surge in 112 calls</span>
          </div>

          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>w₃ Hazard</span>
              <span className="text-cyan-400 font-bold">{priorityWeights.hazardSeverity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={priorityWeights.hazardSeverity}
              onChange={(e) => handleWeightChange('hazardSeverity', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-400 block mt-1">Water level & rainfall</span>
          </div>

          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>w₄ Capacity</span>
              <span className="text-cyan-400 font-bold">{priorityWeights.capacityStress}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={priorityWeights.capacityStress}
              onChange={(e) => handleWeightChange('capacityStress', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-400 block mt-1">Hospital & shelter stress</span>
          </div>

          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>w₅ Infra Risk</span>
              <span className="text-cyan-400 font-bold">{priorityWeights.infrastructureRisk}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={priorityWeights.infrastructureRisk}
              onChange={(e) => handleWeightChange('infrastructureRisk', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-400 block mt-1">Road impassability</span>
          </div>
        </div>
      </div>

      {/* Main Split: Ranked Table + Zone Explainability Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ranked Table (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Ranked Zone Priority Register
            </span>
            <span className="text-[11px] font-mono text-slate-400">Click row to inspect factors</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">Rank</th>
                  <th className="px-3 py-2.5">Zone</th>
                  <th className="px-3 py-2.5">Priority</th>
                  <th className="px-3 py-2.5">Severity</th>
                  <th className="px-3 py-2.5">Exposed</th>
                  <th className="px-3 py-2.5">Capacity Stress</th>
                  <th className="px-3 py-2.5">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {zones.map((zone) => {
                  const isSelected = zone.id === selectedZone.id;
                  return (
                    <tr
                      key={zone.id}
                      onClick={() => selectZone(zone.id)}
                      className={`hover:bg-slate-800/60 cursor-pointer transition ${
                        isSelected ? 'bg-cyan-950/40 text-cyan-200' : 'text-slate-300'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded ${
                            zone.priorityRank <= 2
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          #{zone.priorityRank}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-bold text-white whitespace-nowrap">
                        {zone.code} — {zone.name}
                      </td>
                      <td className="px-3 py-2.5 font-bold text-cyan-300">
                        {zone.priorityScore}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${getSeverityBadge(
                            zone.severity
                          )}`}
                        >
                          {zone.severity}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">{zone.populationExposed.toLocaleString()}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-rose-500"
                              style={{
                                width: `${Math.round(
                                  (zone.hospitalCapacityStress + zone.shelterOccupancy) / 2
                                )}%`
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {Math.round((zone.hospitalCapacityStress + zone.shelterOccupancy) / 2)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[11px] text-slate-300 truncate max-w-[220px]">
                        {zone.recommendedAction}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Zone Scoring Drill-down (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
              PRIORITY SCORING BREAKDOWN
            </span>
            <h3 className="text-base font-mono font-bold text-white mt-0.5">
              {selectedZone.code} — {selectedZone.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono font-bold text-cyan-300">
                Score: {selectedZone.priorityScore}/100
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-xs font-mono text-slate-400">Rank #{selectedZone.priorityRank} of 12</span>
            </div>
          </div>

          {/* Factor contribution bars */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Population Exposure (25%)</span>
                <span className="text-cyan-300">{selectedZone.populationExposed.toLocaleString()} people</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${Math.min(100, (selectedZone.populationExposed / 32000) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Distress Surge (25%)</span>
                <span className="text-amber-300">+{selectedZone.incidentGrowthRate}% rate</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{ width: `${Math.min(100, selectedZone.incidentGrowthRate * 2.2)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Water Level Hazard (20%)</span>
                <span className="text-rose-300">{selectedZone.waterLevelMeters}m depth</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-400"
                  style={{ width: `${Math.min(100, (selectedZone.waterLevelMeters / 5.5) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Capacity Stress (20%)</span>
                <span className="text-slate-200">{selectedZone.hospitalCapacityStress}% bed stress</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400"
                  style={{ width: `${selectedZone.hospitalCapacityStress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Infrastructure Risk (10%)</span>
                <span className="text-slate-200">{100 - selectedZone.roadAccessibilityPercent}% cut off</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-400"
                  style={{ width: `${100 - selectedZone.roadAccessibilityPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-slate-950/90 border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Automated Reasoning:
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              {selectedZone.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">&bull;</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setActiveTab('allocation')}
            className="w-full py-2 px-3 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Run Allocation for {selectedZone.code} &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
