import React, { useState, useMemo } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Incident, IncidentStatus, IncidentType, SeverityLevel } from '../../types';
import {
  AlertOctagon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ShieldAlert,
  ArrowUpRight,
  AlertTriangle,
  UserCheck,
  Check
} from 'lucide-react';

export const IncidentsView: React.FC = () => {
  const {
    incidents,
    resources,
    acknowledgeIncident,
    resolveIncident,
    escalateIncident,
    assignResourceToIncident,
    selectZone,
    kpis
  } = useSimulation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeAssignIncidentId, setActiveAssignIncidentId] = useState<string | null>(null);

  const availableResources = useMemo(() => {
    return resources.filter((r) => r.status === 'AVAILABLE');
  }, [resources]);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        inc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = selectedType === 'ALL' || inc.type === selectedType;
      const matchSeverity = selectedSeverity === 'ALL' || inc.severity === selectedSeverity;
      const matchStatus = selectedStatus === 'ALL' || inc.status === selectedStatus;

      return matchSearch && matchType && matchSeverity && matchStatus;
    });
  }, [incidents, searchTerm, selectedType, selectedSeverity, selectedStatus]);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              FIELD INCIDENT MANAGEMENT & TRIAGE LOG
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            24 active & historical distress tickets &bull; Multi-agency dispatch &bull; Urgency triage scoring
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
            {incidents.filter((i) => i.status !== 'RESOLVED').length} Active Field Incidents
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search incident ID, description, or zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="Rescue">Rescue</option>
            <option value="Medical">Medical</option>
            <option value="Water">Water</option>
            <option value="Food">Food</option>
            <option value="Evacuation">Evacuation</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
            <option value="LOW">Low</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Incidents Table / Cards */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800/80 rounded-xl text-slate-400 text-xs">
            No incidents found matching current filter criteria.
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isCritical = incident.severity === 'CRITICAL';
            const isAssigningThis = activeAssignIncidentId === incident.id;

            return (
              <div
                key={incident.id}
                className={`p-4 rounded-xl border transition ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-900/60 hover:border-rose-700/80'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Left: Incident info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className="font-bold text-white uppercase">{incident.id}</span>
                      <span className="text-slate-500">&bull;</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{incident.reportedTime}</span>
                      </span>
                      <span className="text-slate-500">&bull;</span>
                      <button
                        onClick={() => selectZone(incident.zoneId)}
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{incident.zoneName}</span>
                      </button>

                      {/* Badges */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          incident.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : incident.severity === 'HIGH'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {incident.severity}
                      </span>

                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {incident.type}
                      </span>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          incident.status === 'NEW'
                            ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                            : incident.status === 'ACKNOWLEDGED'
                            ? 'bg-blue-500/20 text-blue-300'
                            : incident.status === 'ASSIGNED'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </div>

                    <p className="text-slate-200 text-xs font-sans leading-relaxed">
                      {incident.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <strong className="text-white">{incident.peopleAffected}</strong> people affected
                      </span>
                      <span>
                        Urgency Score:{' '}
                        <strong className={incident.urgencyScore >= 85 ? 'text-rose-400' : 'text-amber-400'}>
                          {incident.urgencyScore} / 100
                        </strong>
                      </span>
                      {incident.assignedResourceName && (
                        <span className="text-purple-300 flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Assigned: {incident.assignedResourceName}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center flex-wrap gap-2 text-xs shrink-0 self-start lg:self-center">
                    {incident.status === 'NEW' && (
                      <button
                        onClick={() => acknowledgeIncident(incident.id)}
                        className="px-2.5 py-1.5 rounded bg-blue-600/80 hover:bg-blue-600 text-white transition font-bold"
                      >
                        Acknowledge
                      </button>
                    )}

                    {incident.severity !== 'CRITICAL' && incident.status !== 'RESOLVED' && (
                      <button
                        onClick={() => escalateIncident(incident.id)}
                        className="px-2.5 py-1.5 rounded bg-rose-950 border border-rose-800 hover:bg-rose-900 text-rose-300 transition font-bold"
                      >
                        Escalate
                      </button>
                    )}

                    {incident.status !== 'RESOLVED' && (
                      <button
                        onClick={() =>
                          setActiveAssignIncidentId(isAssigningThis ? null : incident.id)
                        }
                        className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                      >
                        {isAssigningThis ? 'Cancel Assign' : 'Assign Unit'}
                      </button>
                    )}

                    {incident.status !== 'RESOLVED' && (
                      <button
                        onClick={() => resolveIncident(incident.id)}
                        className="px-2.5 py-1.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 transition font-bold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline resource assignment dropdown */}
                {isAssigningThis && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950 p-3 rounded-lg space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">
                      Select Available Emergency Unit to Dispatch:
                    </span>
                    {availableResources.length === 0 ? (
                      <div className="text-[11px] text-rose-400">
                        No available resources currently free in inventory. All units deployed.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {availableResources.map((res) => (
                          <button
                            key={res.id}
                            onClick={() => {
                              assignResourceToIncident(incident.id, res.id);
                              setActiveAssignIncidentId(null);
                            }}
                            className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs transition"
                          >
                            <div className="font-bold text-white">{res.callsign}</div>
                            <div className="text-[10px] text-cyan-400">{res.type} &bull; {res.baseLocation}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
