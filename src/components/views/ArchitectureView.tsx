import React from 'react';
import {
  Workflow,
  Shield,
  Layers,
  Sparkles,
  Lock,
  Compass,
  Cpu,
  Database,
  Users,
  CheckCircle2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              CRISISGRID SYSTEM ARCHITECTURE & GOVERNANCE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Modular decision intelligence stack &bull; Transparent, human-in-the-loop disaster operations
          </p>
        </div>

        <span className="px-3 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs">
          PHASE 1 ARCHITECTURE &bull; PRODUCTION BLUEPRINT
        </span>
      </div>

      {/* 6-Layer Architecture Pipeline Diagram */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
          Six-Tier Decision Intelligence Architecture
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {/* Layer 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 01</span>
              <Database className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Telemetry & Signal Ingestion</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Ingests multi-source data: hydrological radar, rain gauges, 112 emergency calls, hospital bed telemetry, and road sensor readings into a unified geospatial event stream.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 02</span>
              <Cpu className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Priority Scoring Engine</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Applies multi-criteria priority scoring weighted by population exposure, incident surge rate, water depth, and hospital capacity stress to rank all 12 zones continuously.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 03</span>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Constrained Resource Solver</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Solves the combinatorial resource allocation objective under finite asset constraints, capability matching (ALS/BLS, boats), and critical zone minimum service guarantees.
            </p>
          </div>

          {/* Layer 4 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 04</span>
              <Compass className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Safe Route & Replanning Engine</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Evaluates road water depths and bridge structural integrity. When roads are breached (such as NH-27), the engine dynamically recalculates alternate elevated corridors.
            </p>
          </div>

          {/* Layer 5 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 05</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Explainable Human Decision UI</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Presents actionable dispatches with plain-language causal reasoning ("Why this recommendation?"). Incident commanders retain absolute veto, modify, and accept authority.
            </p>
          </div>

          {/* Layer 6 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Layer 06</span>
              <FileCheck2 className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Decision Audit & Traceability</h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Every system recommendation and human action is recorded with cryptographic timestamps, rationale codes, and field outcomes for post-disaster accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Governance & Real-world Translation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold uppercase">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Ethical Safeguards & Human Authority</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] font-sans">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Autonomous Dispatches:</strong> The system strictly advises; it never dispatches emergency units without explicit human sign-off.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Fairness Constraints:</strong> Mathematical constraints prevent zero-allocation starvation in remote or lower-income sub-districts.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Black-Box Logic:</strong> Every recommendation provides explicit causal justifications accessible in a single click.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold uppercase">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Future Integration Roadmap</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] font-sans">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Satellite Synthetic Aperture Radar (SAR):</strong> Near-real-time cloud-penetrating water inundation delineation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Off-Grid Mesh Networking:</strong> LoRaWAN and tactical ad-hoc mesh connectivity for emergency vehicles when cell towers drop.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Multi-Agency Interoperability:</strong> Standardized CAP (Common Alerting Protocol) exchange between NDMA, Police, and Fire Services.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
