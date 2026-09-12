import React from 'react';
import {
  Info,
  Shield,
  Activity,
  Boxes,
  Navigation,
  FileCheck2,
  Users,
  CheckCircle2,
  Cpu,
  Sparkles
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              ABOUT CRISISGRID &bull; MISSION & SYSTEM ARCHITECTURE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Intelligent Emergency Resource Allocation & Dynamic Route Replanning Platform
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
            CrisisGrid v2.4 Operational
          </span>
        </div>
      </div>

      {/* Hero Mission Statement */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          THE MISSION
        </span>
        <h2 className="text-lg md:text-xl font-black text-white leading-snug">
          Transforming fragmented disaster data into prioritized, optimized, and explainable life-saving actions.
        </h2>
        <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-4xl">
          During large-scale monsoonal disasters and river basin breaches, emergency response teams face extreme
          uncertainty, overwhelming call volumes, and rapidly shifting road access. CrisisGrid bridges the gap
          between raw telemetry and decisive human command by providing real-time priority scoring, constraint-aware
          resource optimization, safe corridor intelligence, and dynamic replanning when field conditions fail.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
            <Activity className="w-4 h-4" />
            <span>1. Dynamic Multi-Factor Priority Scoring</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Evaluates population vulnerability, rate of distress call growth, live hydrological breach telemetry,
            hospital bed saturation, and shelter crowding to rank critical zones with transparent mathematical weighting.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
            <Boxes className="w-4 h-4" />
            <span>2. Constrained Resource Optimization</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Unlike naive first-come-first-served dispatching, CrisisGrid uses linear programming heuristics to balance
            ALS medical teams, 4x4 ambulances, and swift-water rescue craft against acute local capacity deficits.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Navigation className="w-4 h-4" />
            <span>3. Hazard-Aware Route Intelligence & Replanning</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Continuously monitors road inundation, bridge clearances, and debris blockages. When flash flooding breaches
            an arterial corridor like NH-27, the engine recalculates accessible detour corridors in sub-second intervals.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
            <FileCheck2 className="w-4 h-4" />
            <span>4. Explainable Human-in-the-Loop Command</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            AI recommendations are never a black box. The system explains the causal factors behind every suggested
            dispatch, projects expected impact on unmet demand, and logs operator overrides into an immutable audit trail.
          </p>
        </div>
      </div>

      {/* System Specifications */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 text-xs">
        <span className="font-bold text-white uppercase tracking-wider block border-b border-slate-800 pb-2">
          Platform Architecture & Technical Specifications
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Optimization Engine</span>
            <strong className="text-white text-xs">MIP / Heuristic Solver</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Replanning Latency</span>
            <strong className="text-cyan-400 text-xs">&lt; 700 ms</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Geospatial Routing</span>
            <strong className="text-emerald-400 text-xs">Dijkstra Hazard-Cost</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Audit Compliance</span>
            <strong className="text-purple-300 text-xs">ISO 22320 &bull; NDMA</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
