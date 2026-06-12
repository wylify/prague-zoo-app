import React, { useState, useMemo } from 'react';
import { BeerStop } from '../types';
import { BEER_STOPS_DATA, TOUR_SUMMARY } from '../data';
import { Compass, Train, Info, MapPin, ExternalLink, RefreshCw, ZoomIn, ZoomOut, WifiOff } from 'lucide-react';

interface InteractiveMapProps {
  stops: BeerStop[];
  selectedStopId: number | null;
  onSelectStop: (id: number) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export default function InteractiveMap({
  stops,
  selectedStopId,
  onSelectStop,
  isOffline,
  setIsOffline
}: InteractiveMapProps) {
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'tourist' | 'live'>('tourist');

  // Map Bounds for linear projection
  const bounds = {
    minLat: 50.070,
    maxLat: 50.104,
    minLng: 14.385,
    maxLng: 14.455,
  };

  const width = 800;
  const height = 500;

  // Projection utilities
  const projectX = (lng: number) => {
    return ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width;
  };

  const projectY = (lat: number) => {
    return ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height;
  };

  // Vltava River Curve coordination
  const riverCoords = useMemo(() => {
    const rawCoords = [
      { lat: 50.070, lng: 14.409 },
      { lat: 50.076, lng: 14.410 },
      { lat: 50.081, lng: 14.412 },
      { lat: 50.086, lng: 14.413 },
      { lat: 50.090, lng: 14.414 },
      { lat: 50.093, lng: 14.415 },
      { lat: 50.096, lng: 14.419 },
      { lat: 50.099, lng: 14.425 },
      { lat: 50.101, lng: 14.432 },
      { lat: 50.100, lng: 14.441 },
      { lat: 50.094, lng: 14.448 },
      { lat: 50.090, lng: 14.455 }
    ];
    return rawCoords.map(pt => ({ x: projectX(pt.lng), y: projectY(pt.lat) }));
  }, []);

  // Bridges representation
  const bridges = useMemo(() => {
    return [
      { name: "Charles Bridge", lat: 50.0862, lngStart: 14.408, lngEnd: 14.4138 },
      { name: "Mánes Bridge", lat: 50.0905, lngStart: 14.409, lngEnd: 14.4145 },
      { name: "Legion Bridge", lat: 50.0812, lngStart: 14.408, lngEnd: 14.4138 },
      { name: "Štefánik Bridge", lat: 50.0940, lngStart: 14.421, lngEnd: 14.426 },
    ].map(b => ({
      name: b.name,
      y: projectY(b.lat),
      xStart: projectX(b.lngStart),
      xEnd: projectX(b.lngEnd)
    }));
  }, []);

  // District Labels
  const districts = [
    { name: "Hradčany", lat: 50.091, lng: 14.394 },
    { name: "Malá Strana", lat: 50.086, lng: 14.402 },
    { name: "Staré Město", lat: 50.086, lng: 14.422 },
    { name: "Nové Město", lat: 50.080, lng: 14.428 },
    { name: "Karlín", lat: 50.092, lng: 14.445 },
    { name: "Smíchov", lat: 50.074, lng: 14.403 },
    { name: "Bubeneč", lat: 50.101, lng: 14.401 }
  ].map(d => ({
    name: d.name,
    x: projectX(d.lng),
    y: projectY(d.lat)
  }));

  // Route drawing coordinate chain (Core Walkway)
  const routeLinePoints = useMemo(() => {
    return TOUR_SUMMARY.coreWalkingRoute
      .map(id => stops.find(s => s.id === id))
      .filter((s): s is BeerStop => s !== undefined)
      .map(s => ({ x: projectX(s.longitude), y: projectY(s.latitude) }));
  }, [stops]);

  const selectedStop = useMemo(() => {
    return stops.find(s => s.id === selectedStopId) || null;
  }, [selectedStopId, stops]);

  return (
    <div id="map-section" className="bg-[#FDFCF8] border border-[#1A1A1A] overflow-hidden p-4 md:p-6 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#1A1A1A] pb-4">
        <div>
          <h3 className="font-serif text-2xl font-black text-editorial-green flex items-center gap-2 italic">
            <Compass className="w-5 h-5 text-editorial-green" />
            <span>Interactive Prague Beer Zoo Map</span>
          </h3>
          <p className="text-xs text-[#636b5d] mt-1 font-serif italic">
            Navigate the 11 animal-themed taverns starting at Hradčany Heights down to Karlín.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Offline/Online toggle */}
          <button
            id="offline-btn"
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1.5 rounded-none border transition cursor-pointer ${
              isOffline
                ? 'bg-rose-50 text-rose-800 border-rose-300'
                : 'bg-[#2D3A27]/10 text-editorial-green border-editorial-green/30'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>{isOffline ? 'OFFLINE ACTIVE' : 'ONLINE SYSTEM'}</span>
          </button>

          {/* Map display type picker (Always available for seamless switching) */}
          <div className="flex bg-[#F2EFE9] border border-[#1A1A1A] rounded-none p-0.5 text-[11px] font-mono font-bold font-black">
            <button
              id="tourist-map-tab"
              onClick={() => setActiveTab('tourist')}
              className={`px-3 py-1 rounded-none transition cursor-pointer ${
                activeTab === 'tourist'
                  ? 'bg-[#1A1A1A] text-white shadow-none'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/55'
              }`}
            >
              VECTOR MAP
            </button>
            <button
              id="live-map-tab"
              onClick={() => {
                setActiveTab('live');
                if (!selectedStopId) onSelectStop(1); // pick first stop in view
              }}
              className={`px-3 py-1 rounded-none transition cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-[#1A1A1A] text-white shadow-none'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/55'
              }`}
            >
              LIVE DIRECTIONS
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full bg-stone-50 border border-[#1A1A1A] rounded-none overflow-hidden relative h-[500px] sm:h-[580px] md:h-[650px] flex flex-col justify-between items-stretch">
          
          {activeTab === 'tourist' ? (
            // CUSTOM ARTISTIC VECTOR MAP OF PRAGUE
            <div className="w-full h-full relative overflow-auto scrollbar-thin scrollbar-thumb-stone-300">
              {/* Map Zoom Controls */}
              <div className="absolute right-3 top-3 bg-white/90 backdrop-blur border border-stone-200 rounded-lg shadow-sm flex flex-col z-10 p-1">
                <button
                  id="zoom-in-btn"
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.8))}
                  className="p-1.5 hover:bg-stone-100 rounded text-stone-600 transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="h-px bg-stone-200 my-0.5"></div>
                <button
                  id="zoom-out-btn"
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.7))}
                  className="p-1.5 hover:bg-stone-100 rounded text-stone-600 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="h-px bg-stone-200 my-0.5" />
                <button
                  id="reset-zoom-btn"
                  onClick={() => setMapZoom(1)}
                  className="p-1.5 hover:bg-stone-100 rounded text-stone-500 text-[10px] font-mono font-bold transition cursor-pointer"
                  title="Reset Zoom"
                >
                  1x
                </button>
              </div>

              {/* Floating Key Legend Card */}
              <div className="absolute left-3 bottom-3 bg-white/90 backdrop-blur-sm border border-stone-200 p-2.5 rounded-lg text-[10px] font-mono text-stone-600 leading-snug shadow-sm max-w-xs z-10">
                <div className="font-bold text-amber-900 border-b border-stone-200 pb-1 mb-1.5 flex items-center justify-between">
                  <span>MAP LEGEND</span>
                  <span>{isOffline ? 'OFFLINE ACTIVE' : 'LOCAL VECTOR'}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-sky-200 border border-sky-400 rounded-sm"></span>
                    <span>Vltava River & Bridges</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-px border-b border-dashed border-amber-600/70 inline-block"></span>
                    <span>Core Self-Guided Walking Trail</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 text-[8px] flex items-center justify-center text-white scale-90">★</span>
                    <span>Beer Zoo Stops (1 - 11)</span>
                  </div>
                </div>
              </div>

              {/* Map Canvas with zoom transformer */}
              <div
                id="map-viewport"
                className="transition-transform duration-300 origin-center min-w-[750px] mx-auto p-4"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  width="100%"
                  height="100%"
                  className="select-none font-sans"
                >
                  {/* Grid Lines for technical vintage vibe */}
                  <g stroke="#eae6db" strokeWidth="0.5" strokeDasharray="3 4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line key={`x-${i}`} x1={(width / 15) * i} y1={0} x2={(width / 15) * i} y2={height} />
                    ))}
                    {Array.from({ length: 11 }).map((_, i) => (
                      <line key={`y-${i}`} x1={0} y1={(height / 10) * i} x2={width} y2={(height / 10) * i} />
                    ))}
                  </g>

                  {/* Vltava River Background Flow */}
                  <g id="river-bed">
                    <path
                      d={`M ${riverCoords[0].x} ${riverCoords[0].y} ` +
                         riverCoords.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ')}
                      fill="none"
                      stroke="#bfdbfe"
                      strokeWidth="32"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={`M ${riverCoords[0].x} ${riverCoords[0].y} ` +
                         riverCoords.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ')}
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Bridges */}
                  <g id="bridges" stroke="#1e293b" strokeWidth="3">
                    {bridges.map((b, i) => (
                      <g key={b.name + i}>
                        <line x1={b.xStart} y1={b.y} x2={b.xEnd} y2={b.y} />
                        <line x1={b.xStart} y1={b.y - 4} x2={b.xEnd} y2={b.y - 4} stroke="#475569" strokeWidth="1" />
                        <line x1={b.xStart} y1={b.y + 4} x2={b.xEnd} y2={b.y + 4} stroke="#475569" strokeWidth="1" />
                        <text x={(b.xStart + b.xEnd) / 2} y={b.y - 7} fontSize="8" fill="#475569" textAnchor="middle" fontWeight="bold">
                          {b.name}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* District Labels */}
                  <g id="districts">
                    {districts.map(d => (
                      <g key={d.name}>
                        <text
                          x={d.x}
                          y={d.y}
                          fill="#8c7853"
                          fontSize="9"
                          fontWeight="bold"
                          letterSpacing="1.5"
                          textAnchor="middle"
                          opacity="0.65"
                          className="uppercase"
                        >
                          {d.name}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Core Walking Route Connection Path (golden chain) */}
                  <g id="route-thread">
                    <path
                      d={`M ${routeLinePoints[0].x} ${routeLinePoints[0].y} ` +
                         routeLinePoints.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ')}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      opacity="0.8"
                    />
                  </g>

                  {/* Excursion paths indicators to Bubeneč */}
                  <g id="excursion-lines" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6">
                    {/* Hradčany -> Bubeneč (Stop 9 Veverka) */}
                    <path d="M 120 180 L 195 50" />
                    <text x="160" y="110" fontSize="7" fill="#0284c7" fontWeight="medium" transform="rotate(-35, 160, 110)">
                      Tram 12/20 to Bubeneč
                    </text>
                  </g>

                  {/* Stops Plot Markers */}
                  <g id="stop-markers">
                    {stops.map(stop => {
                      const sx = projectX(stop.longitude);
                      const sy = projectY(stop.latitude);
                      const isSelected = stop.id === selectedStopId;
                      const isExcursion = TOUR_SUMMARY.excursionStops.includes(stop.id);

                      return (
                        <g
                          key={stop.id}
                          className="cursor-pointer group"
                          transform={`translate(${sx}, ${sy})`}
                          onClick={() => onSelectStop(stop.id)}
                        >
                          {/* Pulsing ring for selected */}
                          {isSelected && (
                            <circle r="14" fill="none" stroke="#d97706" strokeWidth="2" className="animate-ping" opacity="0.6" />
                          )}

                          {/* Marker base Circle */}
                          <circle
                            r={isSelected ? "9" : "7.5"}
                            fill={isSelected ? "#b45309" : isExcursion ? "#0ea5e9" : "#d97706"}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            className="transition-all duration-300 group-hover:scale-125 shadow-md"
                          />

                          {/* Stop Number text */}
                          <text
                            y="2.5"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={isSelected ? "8.5" : "7.5"}
                            fontWeight="black"
                          >
                            {stop.id}
                          </text>

                          {/* Miniature Tooltip on hover */}
                          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <rect
                              x="-60"
                              y="-35"
                              width="120"
                              height="22"
                              rx="4"
                              fill="#1e293b"
                              className="shadow-xl"
                            />
                            <text
                              x="0"
                              y="-21"
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {stop.name}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>
          ) : (
            isOffline ? (
              // Smart Offline Compass Fallback Panel when connectivity is toggled or not available
              <div className="w-full h-full flex flex-col justify-between p-6 bg-[#FDFCF8] text-[#1A1A1A] text-center min-h-[380px]">
                <div className="my-auto space-y-4 max-w-md mx-auto">
                  <div className="flex justify-center">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-full">
                      <WifiOff className="w-8 h-8 text-amber-600 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="font-serif text-2xl font-black text-editorial-green italic">Offline Mode Active</h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif">
                    Many of Prague's historic brick structures or cellar vaults (such as those at <strong>U Hrocha</strong>) may experience cellular failures. In offline mode, the live Google Maps frame is paused to preserve layout.
                  </p>
                  <p className="text-[11px] text-[#636b5d] italic font-mono uppercase tracking-[0.1em] font-semibold bg-[#F2EFE9] py-1 px-3">
                    Target Stop: Stop #{selectedStop?.id} - {selectedStop?.name} ({selectedStop?.originalName})
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  <button
                    id="offline-fall-opt"
                    onClick={() => setActiveTab('tourist')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#2D3A27] hover:bg-[#1C2518] text-white text-xs font-mono font-bold tracking-wider rounded-none cursor-pointer transition"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>USE OFFLINE VECTOR MAP</span>
                  </button>

                  <button
                    id="override-online-map"
                    onClick={() => {
                      setIsOffline(false);
                      console.log("Forcing load of Google Maps coordinates");
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1A1A1A] hover:bg-[#F2EFE9] text-[#1A1A1A] text-xs font-mono font-bold tracking-wider rounded-none cursor-pointer transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>LOAD GOOGLE MAPS ANYWAY</span>
                  </button>
                </div>
              </div>
            ) : (
              // EMBED DIRECTION / GOOGLE MAP VIEWER COOP FOR THE ACTIVE STOP
              <div className="w-full h-full flex flex-col justify-between p-4 bg-stone-50 flex-1">
                <div className="flex justify-between items-center text-xs text-[#2D3A27] bg-[#F2EFE9] p-2 rounded-none border border-[#E8E4D9] mb-3">
                  <div className="flex items-center gap-1.5 font-mono font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse"></span>
                    <span>Curated Map: <strong>Prague Beer Zoo Trace</strong></span>
                  </div>
                  <div className="text-[10px] font-mono font-semibold bg-[#2D3A27]/10 px-1.5 py-0.5 rounded-none text-stone-800">
                    My Map Live
                  </div>
                </div>

                {/* Secure Non-key Map Embed (Google My Maps customized trace) */}
                <div className="w-full flex-grow relative border bg-[#FDFCF8] rounded-none overflow-hidden border-[#1A1A1A]/25 min-h-[300px]">
                  <iframe
                    title="Live Curated Prague Beer Zoo Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    src="https://www.google.com/maps/d/embed?mid=1BgYvgTljxe1dE106vZ0iaapA1aKyM34"
                  ></iframe>
                </div>

                <div className="mt-3 text-center flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    id="google-maps-link"
                    href="https://www.google.com/maps/d/u/0/edit?mid=1BgYvgTljxe1dE106vZ0iaapA1aKyM34&usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#2D3A27] hover:bg-[#1C2518] text-white font-mono font-bold text-xs tracking-wider transition cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>OPEN CURATED MYMAP</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {selectedStop && (
                    <a
                      id="google-maps-stop-link"
                      href={selectedStop.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-mono font-bold text-xs tracking-wider transition cursor-pointer font-black"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>STOP #{selectedStop.id} COORDS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    id="back-to-vector-btn"
                    onClick={() => setActiveTab('tourist')}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-mono font-bold text-stone-600 border border-stone-300 hover:bg-stone-100 transition cursor-pointer bg-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>VECTOR MAP</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>


    </div>
  );
}
