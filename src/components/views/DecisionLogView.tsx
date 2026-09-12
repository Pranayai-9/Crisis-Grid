import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  FileCheck2,
  Download,
  Search,
  Shield,
  Copy,
  Check
} from 'lucide-react';
import { DecisionLogEntry } from '../../types';

export const DecisionLogView: React.FC = () => {
  const { decisionLog } = useSimulation();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredLog = decisionLog.filter((entry) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      entry.situation.toLowerCase().includes(term) ||
      entry.recommendation.toLowerCase().includes(term) ||
      entry.operatorDecision.toLowerCase().includes(term) ||
      entry.result.toLowerCase().includes(term) ||
      entry.impactMetric.toLowerCase().includes(term)
    );
  });

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(decisionLog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `crisisgrid_audit_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(decisionLog, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'ACCEPTED':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700';
      case 'MODIFIED':
        return 'bg-amber-950 text-amber-300 border-amber-700';
      case 'REJECTED':
      default:
        return 'bg-rose-950 text-rose-300 border-rose-700';
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              DECISION AUDIT LOG & GOVERNANCE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Complete traceability of AI recommendations, officer validations, and field outcomes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED JSON' : 'COPY JSON'}</span>
          </button>
          <button
            onClick={exportToJson}
            className="px-3.5 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT AUDIT LOG</span>
          </button>
        </div>
      </div>

      {/* Governance Statement Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 text-xs font-mono">
        <Shield className="w-8 h-8 text-cyan-400 shrink-0" />
        <div className="space-y-1">
          <div className="text-white font-bold uppercase tracking-wide">
            Human Authority & Explainable AI Standards
          </div>
          <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
            CrisisGrid operates under strict Human-in-the-Loop decision protocols. AI models provide continuous multi-criteria recommendations, but emergency incident commanders retain total operational veto and override authority. Every dispatch is permanently preserved for post-disaster accountability.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search decisions by situation, recommendation, or impact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-700"
          />
        </div>

        <span className="text-slate-400 text-[11px]">
          Showing {filteredLog.length} of {decisionLog.length} recorded decisions
        </span>
      </div>

      {/* Decision Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-3 py-2.5">Time</th>
                <th className="px-3 py-2.5">Situation Context</th>
                <th className="px-3 py-2.5">AI Recommendation</th>
                <th className="px-3 py-2.5">Commander Decision</th>
                <th className="px-3 py-2.5">Reason / Notes</th>
                <th className="px-3 py-2.5">Impact Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLog.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-3 py-3 text-slate-400 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="px-3 py-3 font-bold text-white whitespace-nowrap">{entry.situation}</td>
                  <td className="px-3 py-3 text-slate-200 max-w-md">
                    <div>{entry.recommendation}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${getDecisionBadge(
                        entry.operatorDecision
                      )}`}
                    >
                      {entry.operatorDecision}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-300 max-w-xs text-[11px]">
                    <div>{entry.reason}</div>
                    {entry.operatorNotes && (
                      <div className="text-[10px] text-cyan-400 mt-0.5">Note: {entry.operatorNotes}</div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-emerald-400 whitespace-nowrap font-bold text-[11px]">
                    {entry.impactMetric}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
