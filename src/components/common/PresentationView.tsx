import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Boxes,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Workflow,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PresentationView: React.FC = () => {
  const { showPresentationMode, setShowPresentationMode, zones, optimizationResult, kpis } = useSimulation();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: 'The Central Problem',
      tagline: 'Information is abundant. Resources are limited.',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xl font-mono font-bold text-white mb-2">
              Modern disaster systems generate endless data:
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              Gauges, Doppler radar, satellite imagery, 112 emergency calls, citizen reports, and social feeds flood emergency operations centers with alerts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60">
            <h3 className="text-xl font-mono font-bold text-rose-300 mb-2">
              Yet in the field, response capacity is strictly finite:
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              There are only 4 medical response teams, 8 ambulances, and 6 rescue squads for 180,000 exposed citizens across 12 flooded zones. Roads are washing away and hospitals are filling up.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-cyan-950/40 border border-cyan-800/80 text-center">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
              THE CRISISGRID PROPOSITION
            </span>
            <div className="text-2xl font-mono font-black text-white">
              CRISISGRID = DECISION INTELLIGENCE UNDER RESOURCE CONSTRAINTS
            </div>
            <p className="text-xs text-slate-400 mt-2">
              From fragmented disaster data to prioritized, optimized, and explainable action.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Real-time Situational Awareness',
      tagline: 'Varuna District Simulated Flood Scenario',
      content: (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">Exposed Population</div>
              <div className="text-2xl font-mono font-bold text-white mt-1">180,000</div>
              <div className="text-[11px] text-cyan-400 mt-0.5">Across 12 Zones</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">Active Incidents</div>
              <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{kpis.activeIncidents}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+38% Growth in Zone C</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">Critical Zones</div>
              <div className="text-2xl font-mono font-bold text-rose-400 mt-1">{kpis.criticalZonesCount}</div>
              <div className="text-[11px] text-rose-300 mt-0.5">Lowland East & Confluence</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">Fleet Deployed</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                {kpis.resourcesDeployedCount}/{kpis.totalResourcesCount}
              </div>
              <div className="text-[11px] text-emerald-300 mt-0.5">High Scarcity Pressure</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-sm">
            <h4 className="font-mono font-bold text-white mb-2">Spotlight on Zone C (Lowland East):</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>28,400 exposed population in low-lying basin</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Water level reached 4.8m (112mm rain / 6h)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>East Sub-District Hospital bed stress at 82%</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Resource Deficit: -2 Medical Teams, -3 Ambulances</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Resource Allocation: Baseline vs CrisisGrid',
      tagline: 'Why naive nearest-resource dispatching fails under scarcity',
      content: (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-slate-300">Baseline Dispatch</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Nearest Available</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Dispatches closest unit to first callers without evaluating severity weights, secondary downstream demand, or road water depths.
              </p>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Average Response Time</span>
                  <span className="text-rose-400 font-bold">34 min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Unmet Critical Demand</span>
                  <span className="text-rose-400 font-bold">31%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Priority Zone Coverage</span>
                  <span className="text-slate-300">68%</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-700/80 shadow-lg shadow-cyan-950">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-cyan-300">CrisisGrid Engine</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900 text-cyan-200">Priority + Constraint Solver</span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Maximizes Served Demand weighted by Priority Score, constrained by capability matching, safe road accessibility, and minimum critical coverage.
              </p>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-cyan-900/60">
                  <span className="text-slate-300">Average Response Time</span>
                  <span className="text-emerald-400 font-bold">21 min (-38%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cyan-900/60">
                  <span className="text-slate-300">Unmet Critical Demand</span>
                  <span className="text-emerald-400 font-bold">18% (-42%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cyan-900/60">
                  <span className="text-slate-300">Priority Zone Coverage</span>
                  <span className="text-emerald-400 font-bold">88% (+29%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-center text-xs font-mono text-slate-400">
            *Illustrative simulation results — demonstrating decision optimization under resource scarcity.
          </div>
        </div>
      )
    },
    {
      title: 'Explainable AI & Human-in-the-Loop',
      tagline: 'The system recommends; the human commander decides.',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-700">
            <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-2">
              WHY THIS RECOMMENDATION?
            </div>
            <div className="text-base font-mono font-bold text-white mb-3">
              Dispatch Trauma Response Alpha-03 &rarr; Zone C (Lowland East)
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>28,400 vulnerable population exposed in low-elevation basin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>+38% surge in distress calls over past 120 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>East Sub-District Hospital approaching critical bed capacity (82%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>Safe arterial path verified via NH-27 Bypass (18 min ETA)</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Commander Authority:
              </span>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-200 text-xs font-mono font-bold">ACCEPT</span>
                <span className="px-3 py-1 rounded bg-amber-900/60 border border-amber-700 text-amber-200 text-xs font-mono font-bold">MODIFY</span>
                <span className="px-3 py-1 rounded bg-rose-900/60 border border-rose-700 text-rose-200 text-xs font-mono font-bold">REJECT</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-800/40 text-xs text-blue-200 leading-relaxed text-center">
            CrisisGrid never acts as an autonomous black box. Every dispatch, override, and re-routing decision is transparent, traceable, and audited in the permanent Decision Log.
          </div>
        </div>
      )
    },
    {
      title: 'Dynamic Replanning',
      tagline: 'Adapting when field conditions break the original plan',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-base font-mono font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Event: NH-27 Access Road Inundated (110cm depth)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              In live disasters, planned corridors fail. When NH-27 breaches, Route A accessibility drops to 0%. Naive systems send vehicles into impassable floods.
            </p>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 font-mono text-xs">
              <div>
                <div className="text-rose-400 font-bold">Route A (NH-27)</div>
                <div className="text-slate-400">ETA: Impassable (Blocked)</div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-emerald-400 font-bold">Route B (Ring Road East)</div>
                <div className="text-slate-400">ETA: 24 min (Clear & Elevated)</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950 to-cyan-950 border border-cyan-800/80 text-center">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
              THE CORE TAKEAWAY
            </span>
            <div className="text-xl md:text-2xl font-mono font-black text-white">
              "FROM DATA &rarr; TO DECISION &rarr; TO ACTION"
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
              CrisisGrid provides the missing decision layer that turns emergency signals into prioritized, optimized, human-controlled action.
            </p>
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    if (!showPresentationMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setShowPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPresentationMode, slides.length, setShowPresentationMode]);

  if (!showPresentationMode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12] text-slate-100 flex flex-col justify-between p-6 md:p-12 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-base font-mono font-black tracking-widest text-white">
              CRISISGRID <span className="text-cyan-400 text-xs font-normal">| Executive Briefing</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              The Decision Intelligence Layer for Disaster Response
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">
            Slide {slideIndex + 1} of {slides.length}
          </span>
          <button
            onClick={() => setShowPresentationMode(false)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="my-auto py-8">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
            {slides[slideIndex].tagline}
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-black text-white">
            {slides[slideIndex].title}
          </h2>
        </div>

        <div>{slides[slideIndex].content}</div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
        <button
          onClick={() => setSlideIndex((prev) => Math.max(0, prev - 1))}
          disabled={slideIndex === 0}
          className={`px-4 py-2 rounded-lg border font-mono text-xs flex items-center gap-2 transition ${
            slideIndex === 0
              ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
              : 'border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === slideIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (slideIndex < slides.length - 1) {
              setSlideIndex(slideIndex + 1);
            } else {
              setShowPresentationMode(false);
            }
          }}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950 cursor-pointer transition"
        >
          <span>{slideIndex === slides.length - 1 ? 'Exit to Ops Center' : 'Next Slide'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
