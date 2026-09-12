import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DisasterMap } from '../map/DisasterMap';
import {
  AlertTriangle,
  Users,
  Activity,
  Droplets,
  Gauge,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  Check,
  X,
  Sliders,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    kpis,
    selectedZone,
    selectZone,
    zones,
    currentRecommendation,
    acceptRecommendation,
    rejectRecommendation,
    setActiveTab,
    runOptimization,
    isOptimizing,
    nh27Blocked,
    activeRoutes
  } = useSimulation();

  const [showExplainModal, setShowExplainModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

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
    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* 1. Top KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Active Incidents</div>
          <div className="text-2xl font-mono font-black text-amber-400 mt-1">{kpis.activeIncidents}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
            <span className="text-amber-400">↑ 38%</span> surge rate
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Critical Zones</div>
          <div className="text-2xl font-mono font-black text-rose-400 mt-1">{kpis.criticalZonesCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">of 12 total zones</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Resources Deployed</div>
          <div className="text-2xl font-mono font-black text-cyan-400 mt-1">
            {kpis.resourcesDeployedCount} <span className="text-xs text-slate-500">/ {kpis.totalResourcesCount}</span>
          </div>
          <div className="text-[10px] text-cyan-300/80 mt-0.5 font-mono">
            {Math.round((kpis.resourcesDeployedCount / kpis.totalResourcesCount) * 100)}% fleet committed
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Unmet Demand</div>
          <div className="text-2xl font-mono font-black text-rose-300 mt-1">{kpis.unmetDemandPercent}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Priority gap active</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Roads Blocked</div>
          <div className="text-2xl font-mono font-black text-amber-300 mt-1">{kpis.roadsBlockedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {nh27Blocked ? 'NH-27 Arterial cutoff' : 'Segment R-11 flooded'}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Forecast Stress</div>
          <div className="text-2xl font-mono font-black text-rose-400 mt-1">{kpis.forecastStress}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">+3h peak window</div>
        </div>
      </div>

      {/* 2. Main Area: Map (Left/Center) + Operational Intelligence (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left/Center: Interactive Map (8 cols) */}
        <div className="lg:col-span-8 h-[540px] lg:h-[620px] flex flex-col">
          <DisasterMap />
        </div>

        {/* Right: Operational Intelligence Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Active Zone Detail Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
                  OPERATIONAL INTELLIGENCE
                </span>
                <h2 className="text-base font-mono font-black text-white flex items-center gap-2">
                  <span>{selectedZone.code} — {selectedZone.name}</span>
                </h2>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSeverityBadge(
                  selectedZone.severity
                )}`}
              >
                {selectedZone.severity}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug mb-3">
              {selectedZone.subtext}
            </p>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Exposed Population</span>
                <span className="text-sm font-bold text-slate-200">
                  {selectedZone.populationExposed.toLocaleString()}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Active Incidents</span>
                <span className="text-sm font-bold text-amber-300">
                  {selectedZone.activeIncidents}{' '}
                  <span className="text-[10px] text-rose-400">+{selectedZone.incidentGrowthRate}%</span>
                </span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Water Level</span>
                <span className="text-sm font-bold text-cyan-300">
                  {selectedZone.waterLevelMeters}m
                </span>
                <span className="text-[10px] text-slate-400 block">{selectedZone.rainfallMm6h} mm / 6h</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Road Access</span>
                <span
                  className={`text-sm font-bold ${
                    selectedZone.roadAccessibilityPercent < 65 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {selectedZone.roadAccessibilityPercent}%
                </span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Hospital Bed Stress</span>
                <span className="text-sm font-bold text-slate-200">{selectedZone.hospitalCapacityStress}%</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Shelter Occupancy</span>
                <span className="text-sm font-bold text-slate-200">{selectedZone.shelterOccupancy}%</span>
              </div>
            </div>

            {/* Resource Gap Summary */}
            <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 mb-3">
              <div className="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Resource Scarcity Gap</span>
                <span className="text-[9px] text-slate-400">DEMAND EXCEEDS CAPACITY</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
                <div className="p-1 rounded bg-slate-950/80">
                  <span className="text-[9px] text-slate-400 block">Medical</span>
                  <span className="font-bold text-rose-400">{selectedZone.resourceGaps.medicalTeams}</span>
                </div>
                <div className="p-1 rounded bg-slate-950/80">
                  <span className="text-[9px] text-slate-400 block">Amb</span>
                  <span className="font-bold text-rose-400">{selectedZone.resourceGaps.ambulances}</span>
                </div>
                <div className="p-1 rounded bg-slate-950/80">
                  <span className="text-[9px] text-slate-400 block">Rescue</span>
                  <span className="font-bold text-rose-400">{selectedZone.resourceGaps.rescueTeams}</span>
                </div>
                <div className="p-1 rounded bg-slate-950/80">
                  <span className="text-[9px] text-slate-400 block">Relief</span>
                  <span className="font-bold text-rose-400">{selectedZone.resourceGaps.reliefUnits}</span>
                </div>
              </div>
            </div>

            {/* Recommended Action Box */}
            <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800 mb-3">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold mb-1">
                Recommended Action:
              </div>
              <p className="text-xs text-cyan-200 font-medium leading-relaxed">
                "{selectedZone.recommendedAction}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowExplainModal(true)}
                className="py-2 px-2.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-200 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explain Logic</span>
              </button>
              <button
                onClick={() => {
                  runOptimization();
                  setActiveTab('allocation');
                }}
                className="py-2 px-2.5 rounded bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950 transition cursor-pointer"
              >
                <span>Simulate Allocation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Quick Primary Recommendation Card */}
          {currentRecommendation && (
            <div className="bg-slate-900/90 border border-cyan-800/60 rounded-lg p-3.5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  SYSTEM RECOMMENDATION
                </span>
                <span className="text-[10px] font-mono text-slate-400">Score: {currentRecommendation.priorityScore}</span>
              </div>

              <div className="text-xs font-mono font-bold text-white mb-2 leading-snug">
                {currentRecommendation.action}
              </div>

              <div className="text-[11px] text-slate-300 space-y-1 mb-3">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Unmet Demand Impact: <strong>-{currentRecommendation.expectedImpact.unmetDemandReduction}%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Response Time: <strong>-{currentRecommendation.expectedImpact.responseTimeReduction}%</strong></span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 italic mb-2.5">
                "Human operator retains final authority."
              </div>

              {/* Accept / Modify / Reject */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => acceptRecommendation()}
                  className="py-1.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 text-[11px] font-mono font-bold transition cursor-pointer"
                >
                  ACCEPT
                </button>
                <button
                  onClick={() => setActiveTab('allocation')}
                  className="py-1.5 rounded bg-amber-950 hover:bg-amber-900 border border-amber-700/80 text-amber-200 text-[11px] font-mono font-bold transition cursor-pointer"
                >
                  MODIFY
                </button>
                <button
                  onClick={() => setIsRejecting(true)}
                  className="py-1.5 rounded bg-rose-950 hover:bg-rose-900 border border-rose-700/80 text-rose-200 text-[11px] font-mono font-bold transition cursor-pointer"
                >
                  REJECT
                </button>
              </div>

              {isRejecting && (
                <div className="mt-3 pt-2 border-t border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Reason for rejection (e.g. field constraint)"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="text-[10px] text-slate-400 font-mono px-2 py-0.5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        rejectRecommendation(rejectReason || 'Operator tactical rejection');
                        setIsRejecting(false);
                      }}
                      className="text-[10px] font-mono bg-rose-700 text-white px-2.5 py-0.5 rounded font-bold"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Operational Bar: Critical Zones Quick Ticker */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 uppercase font-bold text-[10px]">ZONE RANKINGS:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-2xl">
            {zones.slice(0, 6).map((z) => (
              <button
                key={z.id}
                onClick={() => selectZone(z.id)}
                className={`px-2 py-1 rounded text-[10px] whitespace-nowrap transition cursor-pointer border ${
                  z.id === selectedZone.id
                    ? 'bg-cyan-950 text-cyan-200 border-cyan-600 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                #{z.priorityRank} {z.code} ({z.priorityScore})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('priority')}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] underline cursor-pointer"
          >
            <span>Priority Model Weights &rarr;</span>
          </button>
        </div>
      </div>

      {/* Explainable Recommendation Modal */}
      {showExplainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-700/80 rounded-xl shadow-2xl p-6 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider">
                  WHY THIS RECOMMENDATION?
                </h3>
              </div>
              <button
                onClick={() => setShowExplainModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm font-mono font-bold text-cyan-300 mb-3">
              {currentRecommendation?.action}
            </div>

            <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wide">
              Causal Factors:
            </div>
            <ul className="space-y-2 mb-5 text-xs text-slate-300">
              {selectedZone.reasoning.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded border border-slate-800">
                  <span className="text-cyan-400 font-bold">+</span>
                  <span>{reason}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold">+</span>
                <span>
                  Corridor clearance: {activeRoutes[0]?.name} verified ({activeRoutes[0]?.accessibilityPercent}% accessible)
                </span>
              </li>
            </ul>

            <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800/80 text-xs font-mono mb-5">
              <div className="font-bold text-white mb-1">Estimated Simulated Impact:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>Unmet Medical Demand: <strong className="text-emerald-400">-18%</strong></div>
                <div>Average Response Time: <strong className="text-cyan-400">-14%</strong></div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-amber-300/90 mb-4 italic">
              "CrisisGrid provides decision intelligence to support emergency commanders. All recommendations require human validation."
            </div>

            <div className="flex justify-end gap-2 font-mono text-xs">
              <button
                onClick={() => setShowExplainModal(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  acceptRecommendation();
                  setShowExplainModal(false);
                }}
                className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold cursor-pointer"
              >
                Accept Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
