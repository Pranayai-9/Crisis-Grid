import React, { useState, useRef } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Zone,
  Hospital,
  Shelter,
  Incident,
  Resource,
  RoadSegment
} from '../../types';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertCircle,
  Building2,
  Tent,
  Truck,
  Flame,
  Shield,
  MapPin,
  Compass,
  Navigation
} from 'lucide-react';

interface MapLayerState {
  showZones: boolean;
  showFloods: boolean;
  showRoads: boolean;
  showIncidents: boolean;
  showFacilities: boolean;
  showResources: boolean;
  showRoutes: boolean;
}

export const DisasterMap: React.FC = () => {
  const {
    zones,
    hospitals,
    shelters,
    incidents,
    roads,
    resources,
    selectedZoneId,
    selectZone,
    selectIncident,
    activeRoutes,
    nh27Blocked
  } = useSimulation();

  const [layers, setLayers] = useState<MapLayerState>({
    showZones: true,
    showFloods: true,
    showRoads: true,
    showIncidents: true,
    showFacilities: true,
    showResources: true,
    showRoutes: true
  });

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [hoveredEntity, setHoveredEntity] = useState<{
    title: string;
    sub: string;
    x: number;
    y: number;
    severity?: string;
  } | null>(null);

  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Helper color map for zone severity
  const getZoneFill = (severity: string, isSelected: boolean) => {
    if (isSelected) {
      return severity === 'CRITICAL'
        ? 'rgba(225, 29, 72, 0.45)'
        : severity === 'HIGH'
        ? 'rgba(234, 88, 12, 0.45)'
        : severity === 'MODERATE'
        ? 'rgba(217, 119, 6, 0.35)'
        : 'rgba(16, 185, 129, 0.35)';
    }

    switch (severity) {
      case 'CRITICAL':
        return 'rgba(190, 18, 60, 0.28)';
      case 'HIGH':
        return 'rgba(194, 65, 12, 0.22)';
      case 'MODERATE':
        return 'rgba(180, 83, 9, 0.18)';
      case 'LOW':
      default:
        return 'rgba(15, 118, 110, 0.14)';
    }
  };

  const getZoneStroke = (severity: string, isSelected: boolean) => {
    if (isSelected) return '#38bdf8'; // Cyan focus outline
    switch (severity) {
      case 'CRITICAL':
        return '#f43f5e';
      case 'HIGH':
        return '#f97316';
      case 'MODERATE':
        return '#f59e0b';
      case 'LOW':
      default:
        return '#14b8a6';
    }
  };

  // Convert polygon coordinates to SVG points string
  const getPolygonPoints = (points: [number, number][]) => {
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  };

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsPanning(true);
    setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-[520px] lg:h-full bg-[#050811] rounded-lg border border-slate-800 overflow-hidden select-none flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      id="crisisgrid-disaster-map-container"
    >
      {/* Top Map HUD overlay */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-mono text-slate-300">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>VARUNA GIS / GRID 12-ZONES</span>
          <span className="text-slate-500">|</span>
          <span className="text-[11px] text-cyan-300">DATUM: WGS-84 SYNTHETIC</span>
        </div>

        {/* Selected Zone Pill */}
        {selectedZoneId && (
          <div className="bg-cyan-950/90 border border-cyan-700/80 px-3 py-1.5 rounded shadow-lg text-xs font-mono text-cyan-200 hidden sm:flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>FOCUSED: {zones.find((z) => z.id === selectedZoneId)?.code}</span>
          </div>
        )}
      </div>

      {/* Top Right Controls & Layer Toggle */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        {/* Layer Toggle Menu */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="p-2 rounded bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg transition cursor-pointer"
            title="Toggle Map Layers"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl p-3 z-30 text-xs font-mono text-slate-300 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                GIS Map Layers
              </div>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Flood Extent Zones</span>
                <input
                  type="checkbox"
                  checked={layers.showFloods}
                  onChange={(e) => setLayers({ ...layers, showFloods: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Road Network & Bridges</span>
                <input
                  type="checkbox"
                  checked={layers.showRoads}
                  onChange={(e) => setLayers({ ...layers, showRoads: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Active Incident Markers</span>
                <input
                  type="checkbox"
                  checked={layers.showIncidents}
                  onChange={(e) => setLayers({ ...layers, showIncidents: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Hospitals & Shelters</span>
                <input
                  type="checkbox"
                  checked={layers.showFacilities}
                  onChange={(e) => setLayers({ ...layers, showFacilities: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Deployed Resources</span>
                <input
                  type="checkbox"
                  checked={layers.showResources}
                  onChange={(e) => setLayers({ ...layers, showResources: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer hover:text-white">
                <span>Dispatch Routes</span>
                <input
                  type="checkbox"
                  checked={layers.showRoutes}
                  onChange={(e) => setLayers({ ...layers, showRoutes: e.target.checked })}
                  className="rounded accent-cyan-500"
                />
              </label>
            </div>
          )}
        </div>

        {/* Zoom In */}
        <button
          onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
          className="p-2 rounded bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg transition cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
          className="p-2 rounded bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg transition cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset */}
        <button
          onClick={resetView}
          className="p-2 rounded bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg transition cursor-pointer"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 border border-slate-700/80 px-3 py-2 rounded-lg shadow-xl backdrop-blur-md text-[11px] font-mono text-slate-300 flex flex-wrap items-center gap-3">
        <span className="text-slate-400 font-bold uppercase text-[10px]">SEVERITY:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/80 border border-rose-400" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-orange-500/80 border border-orange-400" />
          <span>High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80 border border-amber-400" />
          <span>Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-teal-500/80 border border-teal-400" />
          <span>Low</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-rose-500 inline-block border-t border-b border-rose-500" />
          <span className="text-rose-400">Blocked Road</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-1 bg-cyan-400 inline-block" />
          <span className="text-cyan-300">Active Corridor</span>
        </div>
      </div>

      {/* Hover Tooltip Card */}
      {hoveredEntity && (
        <div
          className="absolute z-30 pointer-events-none bg-slate-950/95 border border-cyan-700/80 rounded px-2.5 py-1.5 shadow-xl text-xs font-mono"
          style={{
            left: Math.min(window.innerWidth - 200, hoveredEntity.x + 15),
            top: Math.max(10, hoveredEntity.y - 45)
          }}
        >
          <div className="font-bold text-white flex items-center gap-1.5">
            {hoveredEntity.severity && (
              <span
                className={`w-2 h-2 rounded-full ${
                  hoveredEntity.severity === 'CRITICAL'
                    ? 'bg-rose-500'
                    : hoveredEntity.severity === 'HIGH'
                    ? 'bg-orange-500'
                    : 'bg-amber-500'
                }`}
              />
            )}
            {hoveredEntity.title}
          </div>
          <div className="text-[10px] text-slate-400">{hoveredEntity.sub}</div>
        </div>
      )}

      {/* SVG Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden">
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30, 41, 59, 0.4)" strokeWidth="0.6" />
            </pattern>

            {/* Flood Hatch Pattern */}
            <pattern id="floodHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
            </pattern>

            {/* Inundation Depth Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Tactical Grid */}
          <rect width="1000" height="800" fill="#040812" />
          <rect width="1000" height="800" fill="url(#grid)" />

          {/* Natural Waterways / Varuna River Basin */}
          <g id="waterways" opacity="0.8">
            {/* Main Varuna River Channel */}
            <path
              d="M 120 180 Q 280 220 450 210 T 700 280 T 890 380 T 960 480"
              fill="none"
              stroke="#0369a1"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 120 180 Q 280 220 450 210 T 700 280 T 890 380 T 960 480"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray="8,6"
            />

            {/* North Drainage Feeder */}
            <path
              d="M 520 80 Q 510 140 480 210"
              fill="none"
              stroke="#0284c7"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* East Breach Canal */}
            <path
              d="M 680 270 Q 690 340 680 430 Q 670 480 750 540"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Water flow direction markers */}
            <text x="320" y="235" fill="#7dd3fc" fontSize="9" fontFamily="monospace" opacity="0.7">
              &gt;&gt; VARUNA RIVER (5.2m) &gt;&gt;
            </text>
            <text x="730" y="325" fill="#7dd3fc" fontSize="8" fontFamily="monospace" opacity="0.8">
              &gt;&gt; EAST CANAL BREACH &gt;&gt;
            </text>
          </g>

          {/* 1. Zone Polygons & Flood Inundation */}
          {layers.showZones && (
            <g id="zone-polygons">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                const fill = getZoneFill(zone.severity, isSelected);
                const stroke = getZoneStroke(zone.severity, isSelected);
                const points = getPolygonPoints(zone.coordinates.polygon);

                return (
                  <g
                    key={zone.id}
                    onClick={() => selectZone(zone.id)}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredEntity({
                        title: `${zone.code} — ${zone.name}`,
                        sub: `Pop: ${zone.populationExposed.toLocaleString()} | Severity: ${zone.severity} | Priority: #${zone.priorityRank}`,
                        x: e.clientX,
                        y: e.clientY,
                        severity: zone.severity
                      });
                    }}
                    onMouseLeave={() => setHoveredEntity(null)}
                  >
                    {/* Zone Boundary Polygon */}
                    <polygon
                      points={points}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3 : 1.5}
                      strokeDasharray={zone.severity === 'CRITICAL' ? 'none' : undefined}
                      className="hover:opacity-90"
                    />

                    {/* Flood Inundation Hatch if water level > 3m */}
                    {layers.showFloods && zone.waterLevelMeters >= 3.0 && (
                      <polygon points={points} fill="url(#floodHatch)" opacity="0.6" pointerEvents="none" />
                    )}

                    {/* Zone Label & Rank Badge */}
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y - 12}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize={isSelected ? '13' : '11'}
                      fontWeight="bold"
                      fontFamily="monospace"
                      pointerEvents="none"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {zone.code}
                    </text>
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y + 3}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize="9"
                      fontFamily="sans-serif"
                      pointerEvents="none"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {zone.name}
                    </text>

                    {/* Severity Pill Badge */}
                    <rect
                      x={zone.coordinates.x - 28}
                      y={zone.coordinates.y + 10}
                      width="56"
                      height="14"
                      rx="3"
                      fill={
                        zone.severity === 'CRITICAL'
                          ? '#be123c'
                          : zone.severity === 'HIGH'
                          ? '#c2410c'
                          : zone.severity === 'MODERATE'
                          ? '#b45309'
                          : '#0f766e'
                      }
                      opacity="0.9"
                    />
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y + 20}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="bold"
                      fontFamily="monospace"
                      pointerEvents="none"
                    >
                      {zone.severity} #{zone.priorityRank}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* 2. Road Network Segments */}
          {layers.showRoads && (
            <g id="road-network">
              {roads.map((road) => {
                const isNh27 = road.id === 'road-nh27-main';
                const isBlocked = road.status === 'BLOCKED' || (isNh27 && nh27Blocked);
                const isCaution = road.status === 'CAUTION';
                const isFlooded = road.status === 'FLOODED';

                const strokeColor = isBlocked
                  ? '#f43f5e'
                  : isFlooded
                  ? '#fb923c'
                  : isCaution
                  ? '#fbbf24'
                  : '#38bdf8';

                const strokeWidth = road.criticalRoute ? 4.5 : 3;
                const pathData = road.coordinates
                  .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`)
                  .join(' ');

                // Midpoint for road label
                const mid = road.coordinates[Math.floor(road.coordinates.length / 2)];

                return (
                  <g
                    key={road.id}
                    onMouseEnter={(e) =>
                      setHoveredEntity({
                        title: road.name,
                        sub: `Status: ${isBlocked ? 'BLOCKED' : road.status} | Depth: ${
                          isBlocked ? '110cm' : road.inundationDepthCm + 'cm'
                        } | Access: ${isBlocked ? '0%' : road.accessibilityPercent + '%'}`,
                        x: e.clientX,
                        y: e.clientY
                      })
                    }
                    onMouseLeave={() => setHoveredEntity(null)}
                  >
                    {/* Shadow underlay */}
                    <path d={pathData} fill="none" stroke="#020617" strokeWidth={strokeWidth + 3} />

                    {/* Actual Road Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isBlocked ? '6,4' : isCaution ? '8,4' : 'none'}
                      opacity={isBlocked ? 0.9 : 0.85}
                    />

                    {/* Blocked Marker (Red X) if road is blocked */}
                    {isBlocked && (
                      <g transform={`translate(${mid[0]}, ${mid[1]})`}>
                        <circle r="9" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />
                        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#ffffff" strokeWidth="2" />
                        <line x1="5" y1="-5" x2="-5" y2="5" stroke="#ffffff" strokeWidth="2" />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* 3. Dispatch Recommended Route Vector */}
          {layers.showRoutes && activeRoutes.length > 0 && (
            <g id="recommended-route">
              {activeRoutes
                .filter((r) => r.isRecommended)
                .map((route) => {
                  const pathData = route.waypoints
                    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`)
                    .join(' ');

                  return (
                    <g key={route.id}>
                      {/* Pulsing highlight corridor */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.35"
                        filter="url(#glow)"
                      />
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="10,6"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="32"
                          to="0"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  );
                })}
            </g>
          )}

          {/* 4. Critical Facilities (Hospitals & Shelters) */}
          {layers.showFacilities && (
            <g id="facilities">
              {/* Hospitals */}
              {hospitals.map((hosp) => (
                <g
                  key={hosp.id}
                  transform={`translate(${hosp.coordinates.x}, ${hosp.coordinates.y})`}
                  className="cursor-pointer"
                  onMouseEnter={(e) =>
                    setHoveredEntity({
                      title: hosp.name,
                      sub: `Beds: ${hosp.occupiedBeds}/${hosp.totalBeds} (${Math.round(
                        (hosp.occupiedBeds / hosp.totalBeds) * 100
                      )}%) | ICU: ${hosp.icuAvailable} avail | Flood: ${hosp.floodRisk}`,
                      x: e.clientX,
                      y: e.clientY
                    })
                  }
                  onMouseLeave={() => setHoveredEntity(null)}
                >
                  <circle
                    r="11"
                    fill={hosp.status === 'CRITICAL' ? '#991b1b' : '#065f46'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="shadow"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    H
                  </text>
                </g>
              ))}

              {/* Shelters */}
              {shelters.map((sh) => (
                <g
                  key={sh.id}
                  transform={`translate(${sh.coordinates.x}, ${sh.coordinates.y})`}
                  className="cursor-pointer"
                  onMouseEnter={(e) =>
                    setHoveredEntity({
                      title: sh.name,
                      sub: `Occupancy: ${sh.currentOccupants}/${sh.capacity} (${Math.round(
                        (sh.currentOccupants / sh.capacity) * 100
                      )}%) | Food: ${sh.suppliesDaysRemaining}d remaining`,
                      x: e.clientX,
                      y: e.clientY
                    })
                  }
                  onMouseLeave={() => setHoveredEntity(null)}
                >
                  <rect
                    x="-8"
                    y="-8"
                    width="16"
                    height="16"
                    rx="3"
                    fill={sh.status === 'FULL' ? '#c2410c' : '#1e3a8a'}
                    stroke="#93c5fd"
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    S
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 5. Incidents Markers */}
          {layers.showIncidents && (
            <g id="incidents">
              {incidents
                .filter((inc) => inc.status !== 'RESOLVED')
                .map((inc) => {
                  const isCritical = inc.severity === 'CRITICAL';
                  const markerColor = isCritical ? '#f43f5e' : inc.severity === 'HIGH' ? '#f97316' : '#f59e0b';

                  return (
                    <g
                      key={inc.id}
                      transform={`translate(${inc.coordinates.x}, ${inc.coordinates.y})`}
                      className="cursor-pointer"
                      onClick={() => selectIncident(inc.id)}
                      onMouseEnter={(e) =>
                        setHoveredEntity({
                          title: `Incident: ${inc.type} (${inc.severity})`,
                          sub: `${inc.description} [${inc.peopleAffected} affected]`,
                          x: e.clientX,
                          y: e.clientY,
                          severity: inc.severity
                        })
                      }
                      onMouseLeave={() => setHoveredEntity(null)}
                    >
                      {/* Pulsing ring on critical incidents */}
                      {isCritical && (
                        <circle r="12" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.7">
                          <animate attributeName="r" values="8;16;8" dur="1.8s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0;0.8" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                      )}

                      <circle r="6" fill={markerColor} stroke="#0f172a" strokeWidth="1.5" />
                    </g>
                  );
                })}
            </g>
          )}

          {/* 6. Deployed Resources */}
          {layers.showResources && (
            <g id="resources">
              {resources
                .filter((r) => r.status === 'DEPLOYED' || r.status === 'EN_ROUTE')
                .map((res) => {
                  const isMed = res.type === 'MEDICAL_TEAM' || res.type === 'AMBULANCE';
                  const pinColor = isMed ? '#06b6d4' : '#10b981';

                  return (
                    <g
                      key={res.id}
                      transform={`translate(${res.coordinates.x}, ${res.coordinates.y})`}
                      onMouseEnter={(e) =>
                        setHoveredEntity({
                          title: `${res.callsign} (${res.type})`,
                          sub: `Status: ${res.status} | Personnel: ${res.personnelCount} | Fuel: ${res.fuelBatteryPercent}%`,
                          x: e.clientX,
                          y: e.clientY
                        })
                      }
                      onMouseLeave={() => setHoveredEntity(null)}
                    >
                      <circle r="7" fill="#020617" stroke={pinColor} strokeWidth="2" />
                      <circle r="3.5" fill={pinColor} />
                    </g>
                  );
                })}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
