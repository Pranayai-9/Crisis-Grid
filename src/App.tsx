/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingIntroModal } from './components/common/LandingIntroModal';
import { DemoWalkthroughModal } from './components/common/DemoWalkthroughModal';
import { PresentationView } from './components/common/PresentationView';

// Tab Views
import { OverviewView } from './components/views/OverviewView';
import { LiveSituationView } from './components/views/LiveSituationView';
import { PriorityZonesView } from './components/views/PriorityZonesView';
import { ResourcesView } from './components/views/ResourcesView';
import { AllocationView } from './components/views/AllocationView';
import { RoutesView } from './components/views/RoutesView';
import { DecisionLogView } from './components/views/DecisionLogView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { ForecastView } from './components/views/ForecastView';
import { ScenariosView } from './components/views/ScenariosView';
import { IncidentsView } from './components/views/IncidentsView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { AboutView } from './components/views/AboutView';

const MainContent: React.FC = () => {
  const { activeTab } = useSimulation();

  return (
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-[#070b14]">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'situation' && <LiveSituationView />}
        {activeTab === 'priority' && <PriorityZonesView />}
        {activeTab === 'resources' && <ResourcesView />}
        {activeTab === 'allocation' && <AllocationView />}
        {activeTab === 'routes' && <RoutesView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'forecast' && <ForecastView />}
        {activeTab === 'scenarios' && <ScenariosView />}
        {activeTab === 'incidents' && <IncidentsView />}
        {(activeTab === 'decisions' || activeTab === 'decision-log') && <DecisionLogView />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'datasources' && <DataSourcesView />}
        {activeTab === 'about' && <AboutView />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <div className="h-screen w-screen flex flex-col bg-[#050811] text-slate-100 overflow-hidden select-none font-sans">
        <Header />
        <MainContent />

        {/* Global Modals */}
        <LandingIntroModal />
        <DemoWalkthroughModal />
        <PresentationView />
      </div>
    </SimulationProvider>
  );
}
