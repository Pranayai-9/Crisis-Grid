import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Boxes,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Navigation,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

export const AllocationView: React.FC = () => {
  const {
    zones,
    resources,
    optimizationResult,
    runOptimization,
    isOptimizing,
    nh27Blocked,
    setActiveTab
  } = useSimulation();

  const [activeTabMode, setActiveTabMode] = useState<'COMPARISON' | 'SOLVER_STEPS' | 'FORMULATION'>('COMPARISON');
  const [solverStepIndex, setSolverStepIndex] = useState(0);

  const { baseline, crisisGrid } = optimizationResult;

  const solverSteps = [
    'Analyzing current zone demand & exposed population...',
    'Filtering available resource capabilities (ALS vs BLS, high-clearance)...',
    'Evaluating live road network accessibility & bridge inundation...',
    'Applying multi-factor priority weights (w1–w5)...',
    'Solving constrained allocation objective function...',
    'Generating optimal explainable dispatch plan...'
  ];

  const handleRunOptimizerWithAnimation = () => {
    runOptimization();
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              RESOURCE ALLOCATION ENGINE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Priority- and constraint-aware mathematical dispatch &bull; Prototype allocation engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunOptimizerWithAnimation}
            disabled={isOptimizing}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950 transition cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{isOptimizing ? 'SOLVING CONSTRAINTS...' : 'RUN OPTIMIZATION'}</span>
          </button>
        </div>
      </div>

      {/* Solver Animation Overlay if active */}
      {isOptimizing && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-700/80 shadow-xl flex items-center gap-3 font-mono text-xs text-cyan-200 animate-pulse">
          <Zap className="w-5 h-5 text-cyan-400 animate-spin" />
          <div className="space-y-0.5">
            <div className="font-bold uppercase tracking-wide">Executing Heuristic Solver Pipeline:</div>
            <div className="text-[11px] text-slate-300">
              Filtering capability matrices &bull; Checking road water depths &bull; Maximizing priority coverage
            </div>
          </div>
        </div>
      )}

      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTabMode('COMPARISON')}
          className={`px-4 py-2 border-b-2 transition cursor-pointer ${
            activeTabMode === 'COMPARISON'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Baseline vs. CrisisGrid Solver
        </button>
        <button
          onClick={() => setActiveTabMode('FORMULATION')}
          className={`px-4 py-2 border-b-2 transition cursor-pointer ${
            activeTabMode === 'FORMULATION'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Optimization Formulation & Constraints
        </button>
      </div>

      {activeTabMode === 'COMPARISON' && (
        <div className="space-y-6">
          {/* Comparative Metrics Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Performance Metric Comparison Matrix
                </span>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Comparing naive nearest-available heuristic against CrisisGrid multi-criteria optimization
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                Illustrative simulation results — not real-world claims
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Performance Metric</th>
                    <th className="px-4 py-3 text-slate-400">Baseline (Nearest Resource)</th>
                    <th className="px-4 py-3 text-cyan-300">CrisisGrid (Priority Solver)</th>
                    <th className="px-4 py-3 text-emerald-400">Operational Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-200">Average Response Time</td>
                    <td className="px-4 py-3 text-slate-400">
                      {baseline.metrics.averageResponseTimeMin} min
                    </td>
                    <td className="px-4 py-3 font-bold text-cyan-300">
                      {crisisGrid.metrics.averageResponseTimeMin} min
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      -{baseline.metrics.averageResponseTimeMin - crisisGrid.metrics.averageResponseTimeMin} min (-
                      {Math.round(
                        ((baseline.metrics.averageResponseTimeMin - crisisGrid.metrics.averageResponseTimeMin) /
                          baseline.metrics.averageResponseTimeMin) *
                          100
                      )}
                      %)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-200">Total Fleet Travel Distance</td>
                    <td className="px-4 py-3 text-slate-400">
                      {baseline.metrics.totalTravelDistanceKm} km
                    </td>
                    <td className="px-4 py-3 font-bold text-cyan-300">
                      {crisisGrid.metrics.totalTravelDistanceKm} km
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      -{baseline.metrics.totalTravelDistanceKm - crisisGrid.metrics.totalTravelDistanceKm} km (-
                      {Math.round(
                        ((baseline.metrics.totalTravelDistanceKm - crisisGrid.metrics.totalTravelDistanceKm) /
                          baseline.metrics.totalTravelDistanceKm) *
                          100
                      )}
                      %)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-200">Unmet Critical Demand</td>
                    <td className="px-4 py-3 text-rose-400 font-bold">
                      {baseline.metrics.unmetDemandPercent}%
                    </td>
                    <td className="px-4 py-3 font-bold text-cyan-300">
                      {crisisGrid.metrics.unmetDemandPercent}%
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      -{baseline.metrics.unmetDemandPercent - crisisGrid.metrics.unmetDemandPercent}% demand deficit
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-200">Priority Zone Coverage</td>
                    <td className="px-4 py-3 text-slate-400">
                      {baseline.metrics.priorityCoveragePercent}%
                    </td>
                    <td className="px-4 py-3 font-bold text-cyan-300">
                      {crisisGrid.metrics.priorityCoveragePercent}%
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      +{crisisGrid.metrics.priorityCoveragePercent - baseline.metrics.priorityCoveragePercent}% coverage
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-200">Fleet Resource Utilization</td>
                    <td className="px-4 py-3 text-slate-400">
                      {baseline.metrics.resourceUtilizationPercent}%
                    </td>
                    <td className="px-4 py-3 font-bold text-cyan-300">
                      {crisisGrid.metrics.resourceUtilizationPercent}%
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">
                      +{crisisGrid.metrics.resourceUtilizationPercent - baseline.metrics.resourceUtilizationPercent}% efficiency
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Generated Allocations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CrisisGrid Recommendations */}
            <div className="bg-slate-900/80 border border-cyan-800/60 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    CrisisGrid Optimized Assignments
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {crisisGrid.assignments.length} ASSETS ALLOCATED
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {crisisGrid.assignments.map((asgn, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-white">{asgn.resourceName}</div>
                      <div className="text-[10px] text-cyan-300 mt-0.5">
                        &rarr; {asgn.targetZoneName}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">Via: {asgn.routeUsed}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-cyan-400 font-bold">{asgn.travelTimeMin} min ETA</div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Priority Matched
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('routes')}
                className="w-full py-2 px-3 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Inspect Transit Corridors in Routes View &rarr;</span>
              </button>
            </div>

            {/* Baseline Dispatches (Naive) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Baseline (Nearest First) Dispatches
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  NAIVE HEURISTIC
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {baseline.assignments.map((asgn, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-slate-300">{asgn.resourceName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        &rarr; {asgn.targetZoneName}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">Via: {asgn.routeUsed}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-rose-400 font-bold">{asgn.travelTimeMin} min ETA</div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        {asgn.travelTimeMin > 40 ? 'Flooded Path Hazard' : 'Unweighted'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Notice: The baseline assigns resources to initial callers regardless of severity or flooded road hazards, resulting in stranded vehicles and neglected critical basins.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTabMode === 'FORMULATION' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl font-mono text-xs">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              MATHEMATICAL OBJECTIVE FORMULATION
            </span>
            <h2 className="text-base font-bold text-white">
              Mixed-Integer Resource Allocation under Disaster Uncertainty
            </h2>
          </div>

          {/* Math formulation block */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-slate-200">
            <div className="text-cyan-300 font-bold text-sm">
              Maximize: Σ (z ∈ Zones) [ Priority(z) × ServedDemand(z) ] - λ × TotalTravelRisk(R)
            </div>
            <div className="text-slate-400 text-[11px]">
              Subject to the following operational system constraints:
            </div>
          </div>

          {/* Constraints breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-cyan-300 mb-1">1. Capacity & Fleet Conservation</div>
              <p className="text-[11px] text-slate-400">
                Σ (z ∈ Zones) allocated(r, z) ≤ 1 for all available resources r ∈ R. No asset can be double-booked.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-cyan-300 mb-1">2. Capability Matching</div>
              <p className="text-[11px] text-slate-400">
                Only ALS-equipped medical teams with boat tenders can serve flooded zones (water depth &gt; 3.0m).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-cyan-300 mb-1">3. Road Accessibility Feasibility</div>
              <p className="text-[11px] text-slate-400">
                Path must have 0 blocked road segments and water logging below chassis clearance (30cm for standard amb, 80cm for Unimog).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-cyan-300 mb-1">4. Critical Zone Minimum Guarantee</div>
              <p className="text-[11px] text-slate-400">
                Any zone with Priority &gt; 85 must receive at least 1 medical response asset before secondary zones are allocated.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded bg-cyan-950/20 border border-cyan-800/40 text-[11px] text-cyan-200">
            <strong>Implementation note:</strong> In this interactive demo, this formulation is solved deterministically by the prototype heuristic engine in real-time within the container runtime.
          </div>
        </div>
      )}
    </div>
  );
};
