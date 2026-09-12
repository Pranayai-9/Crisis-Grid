import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Shield,
  ArrowRight,
  Eye,
  TrendingUp,
  Boxes,
  X,
  CheckCircle2,
  Workflow,
  Sparkles,
  Compass
} from 'lucide-react';

export const LandingIntroModal: React.FC = () => {
  const { showIntroModal, setShowIntroModal, setActiveTab, startDemo } = useSimulation();

  if (!showIntroModal) return null;

  const visualFlowSteps = [
    { label: 'DATA', desc: 'Rainfall, River, Sensors, Incidents' },
    { label: 'SITUATIONAL AWARENESS', desc: 'Live Exposure & Inundation' },
    { label: 'PREDICTION', desc: 'Demand & Capacity Stress' },
    { label: 'PRIORITIZATION', desc: 'Multi-Factor Severity Scoring' },
    { label: 'RESOURCE OPTIMIZATION', desc: 'Constraint-Aware Solver' },
    { label: 'ROUTE RECOMMENDATION', desc: 'Safe Accessible Corridors' },
    { label: 'HUMAN DECISION', desc: 'Review, Accept or Modify' },
    { label: 'RESPONSE', desc: 'Targeted Field Action' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b101b] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden text-slate-200 my-8">
        {/* Close Button */}
        <button
          onClick={() => setShowIntroModal(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="p-8 md:p-10 border-b border-slate-800/80 bg-gradient-to-b from-cyan-950/40 to-transparent">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              CRISISGRID OPERATIONAL FRAMEWORK
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-mono mb-2">
            CRISISGRID
          </h1>
          <p className="text-lg md:text-xl font-semibold text-cyan-200">
            The Decision Intelligence Layer for Disaster Response
          </p>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            "From fragmented disaster data to prioritized, optimized and explainable action."
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
            <span>SIMULATION DEMO: Varuna District Flood Scenario (Synthetic Operational Data)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={() => {
                setShowIntroModal(false);
                setActiveTab('overview');
              }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-bold text-sm shadow-lg shadow-cyan-950 flex items-center gap-2 cursor-pointer transition"
            >
              <span>Enter Operations Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowIntroModal(false);
                startDemo();
              }}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-mono text-sm flex items-center gap-2 cursor-pointer transition"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Start Guided Walkthrough (11 Steps)</span>
            </button>
          </div>
        </div>

        {/* The Operational Loop Visual Flow */}
        <div className="p-6 md:p-8 border-b border-slate-800/80 bg-slate-950/50">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>The End-to-End Decision Loop</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {visualFlowSteps.map((step, idx) => (
              <div
                key={step.label}
                className="p-2.5 rounded bg-slate-900/90 border border-slate-800 hover:border-cyan-800/60 transition group relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">0{idx + 1}</span>
                  {idx < visualFlowSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-500 hidden sm:block" />
                  )}
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition">
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Value Propositions */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="h-8 w-8 rounded bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-bold text-white mb-1.5">
                1. See the Situation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrates fragmented hydrological gauges, weather forecasts, incident distress calls, and facility capacities into a unified situational GIS canvas.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" /> 12 Zones Inundation Analysis
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="h-8 w-8 rounded bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-bold text-white mb-1.5">
                2. Understand What Comes Next
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates incident trajectory, hospital bed saturation, and shelter occupancy over the next 1–6 hours to anticipate resource deficits before they become catastrophic.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-mono text-blue-400/90 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-400" /> Predictive Capacity Stress
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="h-8 w-8 rounded bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-3">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-bold text-white mb-1.5">
                3. Decide Where Resources Go
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Runs priority- and constraint-aware mathematical optimization to dispatch scarce medical and rescue assets, providing explainable rationale while keeping the human operator in control.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Human-in-the-Loop Authority
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-[11px] leading-relaxed">
            CrisisGrid is a research and demonstration prototype. All scenario data shown in simulation mode is synthetic and does not represent live emergency conditions.
          </p>
          <button
            onClick={() => {
              setShowIntroModal(false);
              setActiveTab('architecture');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-mono shrink-0 underline text-[11px]"
          >
            Inspect Architecture &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
