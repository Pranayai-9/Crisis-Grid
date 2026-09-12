import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  LayoutDashboard,
  Radio,
  BarChart3,
  Truck,
  Boxes,
  Navigation,
  TrendingUp,
  Sliders,
  AlertOctagon,
  FileCheck2,
  Cpu,
  Database,
  Info,
  ChevronRight,
  Activity
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  category?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, kpis } = useSimulation();

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      category: 'OPERATIONAL COMMAND'
    },
    {
      id: 'situation',
      label: 'Live Situation',
      icon: Radio,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'priority',
      label: 'Priority Zones',
      icon: BarChart3,
      badge: kpis.criticalZonesCount,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: Truck,
      badge: `${kpis.resourcesDeployedCount}/${kpis.totalResourcesCount}`
    },
    {
      id: 'allocation',
      label: 'Allocation Engine',
      icon: Boxes,
      category: 'DECISION INTELLIGENCE'
    },
    {
      id: 'routes',
      label: 'Route Intelligence',
      icon: Navigation,
      badge: kpis.roadsBlockedCount > 0 ? `${kpis.roadsBlockedCount} BLOCKED` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 'analytics',
      label: 'Operational Analytics',
      icon: Activity
    },
    {
      id: 'forecast',
      label: 'Forecast & Demand',
      icon: TrendingUp
    },
    {
      id: 'scenarios',
      label: 'Scenario Simulator',
      icon: Sliders
    },
    {
      id: 'incidents',
      label: 'Incident Management',
      icon: AlertOctagon,
      badge: kpis.activeIncidents,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      category: 'FIELD OPERATIONS'
    },
    {
      id: 'decisions',
      label: 'Decision Log',
      icon: FileCheck2
    },
    {
      id: 'architecture',
      label: 'System Architecture',
      icon: Cpu,
      category: 'SYSTEM & KNOWLEDGE'
    },
    {
      id: 'datasources',
      label: 'Data Sources',
      icon: Database
    },
    {
      id: 'about',
      label: 'About CrisisGrid',
      icon: Info
    }
  ];

  return (
    <aside className="w-64 bg-[#080c14] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none text-slate-300">
      {/* Top Section / Nav list */}
      <div className="py-3 overflow-y-auto max-h-[calc(100vh-120px)] space-y-0.5 px-2">
        {navItems.map((item, idx) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.id}>
              {item.category && (
                <div
                  className={`text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase px-3 ${
                    idx > 0 ? 'pt-4 pb-1.5' : 'pb-1.5'
                  }`}
                >
                  {item.category}
                </div>
              )}
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition cursor-pointer group ${
                  isActive
                    ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-800/60 shadow-sm shadow-cyan-950'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className="font-sans text-[12px]">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Mission Status Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 m-2 rounded text-xs">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
          <span>VARUNA EOC FEED</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            SYNCED
          </span>
        </div>
        <div className="text-[11px] text-slate-400 leading-tight">
          District Operations Cell
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">
          Model: Priority + Constraint-Aware Engine
        </div>
      </div>
    </aside>
  );
};
