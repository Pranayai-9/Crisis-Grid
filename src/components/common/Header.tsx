import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  PlayCircle,
  Presentation,
  Info,
  ChevronDown,
  Activity,
  Shield,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { SCENARIO_PRESETS } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    isPaused,
    togglePause,
    resetSimulation,
    currentScenarioName,
    currentScenarioId,
    applyScenarioPreset,
    lastUpdated,
    simulateRoadBlockEvent,
    nh27Blocked,
    runOptimization,
    startDemo,
    setShowIntroModal,
    setShowPresentationMode,
    activeAlert
  } = useSimulation();

  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);
  const [showOperatorMenu, setShowOperatorMenu] = useState(false);

  return (
    <header className="bg-[#0b0f17] border-b border-slate-800/80 sticky top-0 z-40 text-slate-200">
      {/* Persistent Simulation Disclaimer Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1 flex items-center justify-between text-xs text-amber-300/90 font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold tracking-wider uppercase">SIMULATION MODE — Demonstration Data</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden md:inline">Synthetic Scenario: Varuna District Flood (12 Zones, ~180k Population Exposed)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] hidden lg:inline">Last cycle: {lastUpdated}</span>
          <button
            onClick={() => setShowIntroModal(true)}
            className="text-cyan-400 hover:text-cyan-300 underline text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3" />
            Product Overview
          </button>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/30 border border-cyan-400/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-widest text-base text-white font-mono">CRISISGRID</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  OPS-INTEL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-sans hidden sm:block">
                Decision Intelligence Layer for Disaster Response
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Live Simulation Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-xs">
            <span className={`h-2 w-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="font-mono text-[11px] text-slate-300">
              {isPaused ? 'SIMULATION PAUSED' : 'SIMULATION ACTIVE'}
            </span>
          </div>

          {/* Scenario Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded text-xs text-slate-200 transition"
              title="Select Active Disaster Scenario"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="max-w-[150px] md:max-w-[210px] truncate text-[11px] font-medium font-mono">
                {currentScenarioName}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showScenarioDropdown && (
              <div className="absolute left-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Scenario Presets
                </div>
                {SCENARIO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      applyScenarioPreset(preset.id);
                      setShowScenarioDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800/90 transition flex flex-col gap-0.5 ${
                      currentScenarioId === preset.id ? 'bg-cyan-950/40 text-cyan-300 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-[11px] flex items-center justify-between">
                      {preset.name}
                      {currentScenarioId === preset.id && <span className="text-[10px] text-cyan-400">ACTIVE</span>}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans line-clamp-1">{preset.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Operational Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Simulation Event Trigger: Simulate Road Block */}
          <button
            onClick={simulateRoadBlockEvent}
            disabled={nh27Blocked}
            className={`px-2.5 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 border transition ${
              nh27Blocked
                ? 'bg-rose-950/50 border-rose-800 text-rose-300 cursor-not-allowed opacity-80'
                : 'bg-rose-950/40 hover:bg-rose-900/60 border-rose-700/60 text-rose-200 cursor-pointer shadow-sm'
            }`}
            title="Inject Sudden Road Disruption (Blocks NH-27 bypass and tests dynamic replanning)"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">
              {nh27Blocked ? 'NH-27 Blocked' : 'Simulate Road Block'}
            </span>
          </button>

          {/* Run Recalculation / Optimization */}
          <button
            onClick={runOptimization}
            className="px-2.5 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/70 text-cyan-200 transition cursor-pointer"
            title="Trigger Immediate Decision Recalculation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Recalculate</span>
          </button>

          {/* Pause / Resume Simulation */}
          <button
            onClick={togglePause}
            className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title={isPaused ? 'Resume live simulation ticker' : 'Pause simulation'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Simulation */}
          <button
            onClick={resetSimulation}
            className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title="Reset to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-5 w-px bg-slate-800 mx-0.5 hidden sm:block" />

          {/* Guided Demo Walkthrough */}
          <button
            onClick={startDemo}
            className="px-2.5 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-cyan-900/30 transition cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-cyan-100" />
            <span>START DEMO</span>
          </button>

          {/* Presentation Mode */}
          <button
            onClick={() => setShowPresentationMode(true)}
            className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition hidden lg:block"
            title="Enter Clean Presentation / Projection Mode"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-300" />
          </button>

          {/* Operator Profile */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setShowOperatorMenu(!showOperatorMenu)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2 py-1 rounded text-xs"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                RS
              </div>
              <span className="text-[11px] text-slate-300 font-mono">Cmdr. R. Sharma</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showOperatorMenu && (
              <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-3 z-50 text-xs text-slate-300">
                <div className="font-semibold text-white">Commander R. Sharma</div>
                <div className="text-[11px] text-slate-400">Varuna District EOC Lead</div>
                <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
                  <UserCheck className="w-3 h-3" /> Role: Human Operator in the Loop
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Authority: Full tactical dispatch & override rights.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Urgent Alert Ribbon if event occurs */}
      {activeAlert && (
        <div
          className={`px-4 py-2 border-b flex items-center justify-between text-xs transition ${
            activeAlert.type === 'CRITICAL'
              ? 'bg-rose-950/80 border-rose-700/80 text-rose-200'
              : activeAlert.type === 'SUCCESS'
              ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-200'
              : 'bg-blue-950/80 border-blue-700/80 text-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-300" />
            <div>
              <span className="font-mono font-bold tracking-wide mr-2">{activeAlert.title}:</span>
              <span>{activeAlert.message}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeAlert.requiresReplanning && (
              <button
                onClick={runOptimization}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold rounded text-xs shadow cursor-pointer animate-pulse"
              >
                RUN REPLANNING NOW
              </button>
            )}
            <button
              onClick={() => {}}
              className="text-slate-400 hover:text-white text-xs underline font-mono"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
