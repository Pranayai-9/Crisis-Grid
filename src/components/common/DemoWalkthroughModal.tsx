import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  Boxes,
  Activity,
  Layers
} from 'lucide-react';

interface DemoStepInfo {
  step: number;
  title: string;
  tagline: string;
  tab: string;
  description: string;
  actionName?: string;
  actionHandler?: () => void;
  highlightedFocus: string;
}

export const DemoWalkthroughModal: React.FC = () => {
  const {
    showDemoModal,
    closeDemo,
    demoStep,
    setDemoStep,
    setActiveTab,
    selectZone,
    runOptimization,
    acceptRecommendation,
    simulateRoadBlockEvent,
    runReplanning,
    nh27Blocked
  } = useSimulation();

  if (!showDemoModal) return null;

  const steps: DemoStepInfo[] = [
    {
      step: 1,
      title: 'Step 1: Monsoon Inundation Detected',
      tagline: 'Rapid telemetry ingest across Varuna District',
      tab: 'overview',
      description:
        'A severe monsoon storm has deposited 112mm of rainfall over 6 hours in the eastern catchment. Sensor telemetry and citizen distress calls are registering rapid flood propagation across 12 zones.',
      highlightedFocus: 'Command Center Map & Real-time KPI strip'
    },
    {
      step: 2,
      title: 'Step 2: Multiple Signals Diverging & Deteriorating',
      tagline: 'Hydrological, weather, and infrastructure distress',
      tab: 'situation',
      description:
        'Water levels at the Varuna River crest (5.2m) surpass danger marks. Bhairav Dam initiates emergency spillway discharge. Road networks begin taking water, and shelter populations climb rapidly.',
      highlightedFocus: 'Real-time Signal Ingestion Matrix'
    },
    {
      step: 3,
      title: 'Step 3: Zone C Flagged as Critical Priority #1',
      tagline: 'Multi-factor priority scoring under prototype model',
      tab: 'priority',
      description:
        'CrisisGrid evaluates population exposure (28,400), a +38% surge in distress calls, canal breach inundation, and capacity strain. Zone C (Lowland East) is ranked #1 with a priority score of 91/100.',
      actionName: 'Inspect Zone C Breakdown',
      actionHandler: () => selectZone('zone-c'),
      highlightedFocus: 'Priority Scoring Model & Ranked Zones'
    },
    {
      step: 4,
      title: 'Step 4: Acute Resource Gaps Detected in Critical Basin',
      tagline: 'Demand exceeds locally available emergency assets',
      tab: 'resources',
      description:
        'Lowland East requires 5 medical teams and 6 ambulances, but has only 3 of each on-site. Deficit: -2 Medical Teams, -3 Ambulances. The system flags this critical scarcity.',
      highlightedFocus: 'Resource Inventory & Deficit Indicators'
    },
    {
      step: 5,
      title: 'Step 5: Forecast Anticipates 3-Hour Demand Surge',
      tagline: 'Anticipating stress before system saturation',
      tab: 'forecast',
      description:
        'Predictive curves forecast incoming hourly incidents climbing from 42 to 71/hr, while shelter occupancy pushes toward 98%. CrisisGrid uses this horizon to prevent delayed response.',
      highlightedFocus: 'Time-Series Predictive Models with Confidence Bands'
    },
    {
      step: 6,
      title: 'Step 6: Optimization Generates Constraint-Aware Plan',
      tagline: 'Maximizing priority coverage while respecting road & capacity limits',
      tab: 'allocation',
      description:
        'Unlike naive "nearest available" dispatching, the CrisisGrid solver routes Trauma Response Alpha-03 and ALS ambulances to critical zones first, reducing unmet demand by 18%.',
      actionName: 'Run CrisisGrid Optimization Solver',
      actionHandler: () => runOptimization(),
      highlightedFocus: 'Baseline vs. CrisisGrid Comparative Solver'
    },
    {
      step: 7,
      title: 'Step 7: Route Intelligence Identifies Safe Corridor',
      tagline: 'Checking real-time road depth and bridge stability',
      tab: 'routes',
      description:
        'Route A (NH-27 Arterial Bypass) is clear with 92% accessibility and an 18-minute ETA. Alternate routes have elevated waterlogging.',
      highlightedFocus: 'Route A vs. Route B Waypoint Analysis'
    },
    {
      step: 8,
      title: 'Step 8: Explainable Recommendation Presented to Human Operator',
      tagline: 'Human-in-the-Loop retains ultimate command authority',
      tab: 'overview',
      description:
        'CrisisGrid provides complete causal reasoning: why Trauma Response Alpha-03 was selected, expected impact on unmet demand (-18%), and safe route. The operator reviews and accepts the dispatch.',
      actionName: 'Accept Recommendation',
      actionHandler: () => acceptRecommendation('Commander authorized dispatch in demo step 8.'),
      highlightedFocus: 'Explainable Reasoning Panel with Accept/Modify/Reject'
    },
    {
      step: 9,
      title: 'Step 9: Sudden Road Disruption Occurs in the Field',
      tagline: 'Flash inundation breaches NH-27 bypass at km 6.8',
      tab: 'overview',
      description:
        'A flash levee breach covers NH-27 in 110cm of floodwater! The primary transit corridor is suddenly blocked. Real-world disaster management is never static.',
      actionName: 'Simulate NH-27 Blockage',
      actionHandler: () => simulateRoadBlockEvent(),
      highlightedFocus: 'Real-time Event Alert & Road Network Disruption'
    },
    {
      step: 10,
      title: 'Step 10: Dynamic Replanning Re-routes Field Units',
      tagline: 'Automated re-routing without command paralysis',
      tab: 'routes',
      description:
        'CrisisGrid immediately recalculates: Route A accessibility drops to 0%. The system re-plans and designates Route B (Ring Road East Link, 24 min ETA) as the primary accessible corridor.',
      actionName: 'Execute Dynamic Replanning',
      actionHandler: () => runReplanning(),
      highlightedFocus: 'Dynamic Replanning Solver & Alternate Pathing'
    },
    {
      step: 11,
      title: 'Step 11: End-to-End Operational Loop Complete',
      tagline: 'FROM DATA → TO DECISION → TO ACTION',
      tab: 'decisions',
      description:
        'Every recommendation, road change, and operator decision is recorded in the permanent audit trail. CrisisGrid has turned fragmented disaster data into prioritized, optimized, explainable human decisions.',
      highlightedFocus: 'Decision Log Audit Trail'
    }
  ];

  const current = steps[demoStep];

  const handleNext = () => {
    if (demoStep < steps.length - 1) {
      const nextStep = demoStep + 1;
      setDemoStep(nextStep);
      setActiveTab(steps[nextStep].tab);
    } else {
      closeDemo();
    }
  };

  const handlePrev = () => {
    if (demoStep > 0) {
      const prevStep = demoStep - 1;
      setDemoStep(prevStep);
      setActiveTab(steps[prevStep].tab);
    }
  };

  const handleJumpToStep = (idx: number) => {
    setDemoStep(idx);
    setActiveTab(steps[idx].tab);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-[#0b101c]/95 border border-cyan-700/80 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md text-slate-200 overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Top Banner */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-cyan-950 via-blue-950 to-slate-900 border-b border-cyan-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Interactive Guided Demo ({demoStep + 1}/{steps.length})
          </span>
        </div>
        <button
          onClick={closeDemo}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-11 gap-1 px-4 pt-2.5 bg-slate-950/60">
        {steps.map((s, idx) => (
          <div
            key={s.step}
            onClick={() => handleJumpToStep(idx)}
            className={`h-1.5 rounded-full cursor-pointer transition ${
              idx === demoStep
                ? 'bg-cyan-400 shadow-sm shadow-cyan-400'
                : idx < demoStep
                ? 'bg-cyan-700'
                : 'bg-slate-800'
            }`}
            title={`Jump to Step ${s.step}: ${s.title}`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5">
        <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold mb-1">
          {current.tagline}
        </div>
        <h3 className="text-base font-mono font-bold text-white mb-2 leading-tight">
          {current.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {current.description}
        </p>

        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2 mb-4">
          <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Active Focus: <strong className="text-slate-200">{current.highlightedFocus}</strong></span>
        </div>

        {/* Action Trigger Button if available in step */}
        {current.actionName && current.actionHandler && (
          <div className="mb-4">
            <button
              onClick={current.actionHandler}
              className="w-full py-2 px-3 rounded bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-600/80 text-cyan-100 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>{current.actionName}</span>
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            onClick={handlePrev}
            disabled={demoStep === 0}
            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1 transition ${
              demoStep === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'hover:bg-slate-800 text-slate-300 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-[11px] font-mono text-slate-500">
            {demoStep + 1} of {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 cursor-pointer transition"
          >
            <span>{demoStep === steps.length - 1 ? 'Finish Demo' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
