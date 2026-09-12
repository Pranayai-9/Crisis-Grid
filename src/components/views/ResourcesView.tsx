import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Truck,
  Filter,
  Shield,
  HeartPulse,
  Package,
  CheckCircle2,
  AlertOctagon,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ResourceType, ResourceStatus } from '../../types';

export const ResourcesView: React.FC = () => {
  const { resources, zones, selectedZone, selectZone, setActiveTab } = useSimulation();

  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredResources = resources.filter((res) => {
    if (typeFilter !== 'ALL' && res.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && res.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: ResourceStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'DEPLOYED':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'EN_ROUTE':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'BUSY':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'OFFLINE':
      default:
        return 'bg-slate-700/40 text-slate-400 border-slate-600/40';
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              RESOURCE INVENTORY & DEFICIT DETECTION
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Tracking 30 response assets &bull; Scarcity gap detection across 12 zones
          </p>
        </div>

        <button
          onClick={() => setActiveTab('allocation')}
          className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition cursor-pointer"
        >
          <span>Run Allocation Solver</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Category Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Rescue Squads</span>
            <Shield className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            6 <span className="text-xs font-normal text-slate-400">total units</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span className="text-cyan-400">4 Deployed</span>
            <span className="text-emerald-400 font-bold">2 Available</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Medical Teams</span>
            <HeartPulse className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            4 <span className="text-xs font-normal text-slate-400">total teams</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span className="text-cyan-400">3 Deployed</span>
            <span className="text-rose-400 font-bold">1 Available</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Ambulances</span>
            <Truck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            8 <span className="text-xs font-normal text-slate-400">total fleet</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span className="text-cyan-400">6 Deployed</span>
            <span className="text-rose-400 font-bold">2 Available</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase">Relief Supply Units</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            12 <span className="text-xs font-normal text-slate-400">total trucks</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span className="text-cyan-400">7 Deployed</span>
            <span className="text-emerald-400 font-bold">5 Available</span>
          </div>
        </div>
      </div>

      {/* Resource Gap Scarcity Spotlight */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <div className="flex items-center gap-2 text-rose-300 font-bold uppercase">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Demand Currently Exceeds Available Response Capacity</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-0.5 font-sans">
            Zone C (Lowland East) requires 5 Medical Teams (Deficit: -2), 6 Ambulances (Deficit: -3), and 4 Rescue Teams (Deficit: -1).
            CrisisGrid prioritizes where scarce assets will save the most lives.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            District Gap Index: <strong className="text-rose-400">-8 Critical Units</strong>
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">FILTER ASSETS:</span>
          {['ALL', 'RESCUE_TEAM', 'MEDICAL_TEAM', 'AMBULANCE', 'RELIEF_UNIT'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${
                typeFilter === type
                  ? 'bg-cyan-950 text-cyan-200 border border-cyan-700 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">STATUS:</span>
          {['ALL', 'AVAILABLE', 'DEPLOYED', 'EN_ROUTE'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Inventory Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-3 py-2.5">Callsign & Type</th>
                <th className="px-3 py-2.5">Base Depot</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Assigned Zone</th>
                <th className="px-3 py-2.5">Capability / Payload</th>
                <th className="px-3 py-2.5">Personnel</th>
                <th className="px-3 py-2.5">Fuel/Battery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-3 py-2.5 font-bold text-white whitespace-nowrap">
                    <div>{res.callsign}</div>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {res.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-300">{res.baseLocation}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${getStatusBadge(
                        res.status
                      )}`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-cyan-300 font-semibold">
                    {res.assignedZoneId
                      ? zones.find((z) => z.id === res.assignedZoneId)?.name || res.assignedZoneId
                      : 'Unassigned (Reserve)'}
                  </td>
                  <td className="px-3 py-2.5 text-slate-300 text-[11px] max-w-xs truncate">
                    {res.capability}
                  </td>
                  <td className="px-3 py-2.5 text-slate-300">{res.personnelCount} staff</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400"
                          style={{ width: `${res.fuelBatteryPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">{res.fuelBatteryPercent}%</span>
                    </div>
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
