import React, { useState, useMemo, useEffect } from 'react';
import { BeerStop, UserNote } from '../types';
import { BEER_STOPS_DATA } from '../data';
import { Search, SlidersHorizontal, BookOpen, AlertTriangle, CreditCard, Banknote, MapPin, ExternalLink, Sparkles, CheckSquare, Clock } from 'lucide-react';

interface TourScheduleProps {
  stops: BeerStop[];
  selectedStopId: number | null;
  onSelectStop: (id: number) => void;
  userProgress: UserNote[];
  onToggleVisited: (id: number) => void;
  onUpdateNotes: (id: number, notes: string) => void;
  onUpdateRating: (id: number, rating: number) => void;
}

export default function TourSchedule({
  stops,
  selectedStopId,
  onSelectStop,
  userProgress,
  onToggleVisited,
  onUpdateNotes,
  onUpdateRating
}: TourScheduleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'castle' | 'old-town' | 'extensions'>('all');

  // Categorize stops into intuitive buckets for easy navigation
  const getCategory = (stop: BeerStop): 'castle' | 'old-town' | 'extensions' => {
    if (stop.id === 1 || stop.id === 2 || stop.id === 3) {
      return 'castle'; // Historic Hradčany & Malá Strana
    }
    if (stop.id === 4 || stop.id === 5 || stop.id === 6 || stop.id === 7 || stop.id === 8) {
      return 'old-town'; // Old Town core
    }
    return 'extensions'; // Nové Město, Karlín, Bubeneč
  };

  const getCategoryLabel = (id: number) => {
    if (id === 1 || id === 2 || id === 3) return { label: 'CASTLE HEIGHTS', bg: 'bg-[#2D3A27] text-white border-transparent' };
    if (id === 4 || id === 5 || id === 6 || id === 7 || id === 8) return { label: 'OLD TOWN CORE', bg: 'bg-[#E8E4D9] text-[#1A1A1A] border-[#1A1A1A]/20' };
    return { label: 'URBAN EXTENSION', bg: 'bg-white text-stone-700 border border-[#1A1A1A]' };
  };

  // Reset filter and scroll when selectedStopId changes
  useEffect(() => {
    if (selectedStopId) {
      const targetStop = stops.find(s => s.id === selectedStopId);
      if (targetStop) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = term === '' || 
          targetStop.name.toLowerCase().includes(term) ||
          targetStop.originalName.toLowerCase().includes(term) ||
          targetStop.beers.some(b => b.toLowerCase().includes(term)) ||
          targetStop.description.toLowerCase().includes(term);

        const matchesCategory = selectedCategory === 'all' || getCategory(targetStop) === selectedCategory;

        if (!matchesSearch || !matchesCategory) {
          setSearchTerm('');
          setSelectedCategory('all');
        }

        // Smooth scroll to card after rendering updates
        setTimeout(() => {
          const targetElement = document.getElementById(`stop-card-${selectedStopId}`);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 120);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStopId]);

  // Process search, filters, and sorts
  const processedStops = useMemo(() => {
    let result = [...stops];

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(term) ||
          s.originalName.toLowerCase().includes(term) ||
          s.beers.some(b => b.toLowerCase().includes(term)) ||
          s.description.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(s => getCategory(s) === selectedCategory);
    }

    // Sort by stop ID number
    result.sort((a, b) => a.id - b.id);

    return result;
  }, [stops, searchTerm, selectedCategory]);

  return (
    <div id="tour-schedule-root" className="space-y-4 md:space-y-6">
      {/* Search and Category Filters Panel */}
      <div className="bg-[#FDFCF8] border border-[#1A1A1A] p-3 sm:p-4 md:p-6 rounded-none shadow-xs space-y-3 sm:space-y-4 no-print">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#636b5d]" />
            <input
              id="beer-search"
              type="text"
              placeholder="Search stops, Czech names, or draft beer (e.g. Kozel, Budvar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-mono font-bold pl-9 pr-4 py-2 bg-white border border-[#1A1A1A] rounded-none focus:outline-none focus:ring-1 focus:ring-[#2D3A27] text-[#1A1A1A]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-[#1A1A1A]/15">
          <span className="text-[10px] font-mono font-bold text-[#636b5d] uppercase tracking-widest mr-2">Quarter Categories:</span>
          {[
            { id: 'all', label: 'All 11 Zoo Stops' },
            { id: 'castle', label: 'Castle Heights (Stops 1-3)' },
            { id: 'old-town', label: 'Old Town Core (Stops 4-8)' },
            { id: 'extensions', label: 'Extensions & Neighborhoods (Stops 9-11)' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-filter-${tab.id}`}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`text-[11px] font-mono font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-none border transition duration-150 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#2D3A27] border-[#182314] text-white shadow-none'
                  : 'bg-white border-[#1A1A1A] text-stone-700 hover:bg-[#F2EFE9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List of Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {processedStops.length > 0 ? (
          processedStops.map((stop) => {
            const isSelected = stop.id === selectedStopId;
            const progress = userProgress.find(p => p.stopId === stop.id) || {
              stopId: stop.id,
              visited: false,
              rating: 0,
              notes: ''
            };
            const catMeta = getCategoryLabel(stop.id);

            return (
              <div
                key={stop.id}
                id={`stop-card-${stop.id}`}
                className={`h-full bg-[#FDFCF8] border transition-all duration-250 flex flex-col justify-between overflow-hidden cursor-pointer print:break-inside-avoid print:border-[#1A1A1A] rounded-none ${
                  isSelected
                    ? 'border-2 border-[#2D3A27] bg-[#FDFCF8]'
                    : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A] shadow-none'
                }`}
                onClick={() => onSelectStop(stop.id)}
              >
                {/* Stop Card Header */}
                <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-[#1A1A1A]/10 pb-2 sm:pb-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-mono text-[9px] font-black text-[#2D3A27] bg-[#2D3A27]/10 px-1.5 py-0.5 rounded-none border border-[#2D3A27]/20">
                            STOP #{stop.id}
                          </span>
                          <span className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded-none border ${catMeta.bg}`}>
                            {catMeta.label}
                          </span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl text-editorial-green font-black tracking-tight mt-1 flex items-center gap-1.5 sm:gap-2 italic">
                          <span>{stop.name}</span>
                          <span className="text-lg sm:text-xl">{stop.animalEmoji}</span>
                        </h4>
                        <p className="font-serif text-xs italic text-[#636b5d]">{stop.originalName}</p>
                      </div>

                      {/* Visited Checkbox / Rubber stamp */}
                      <button
                        id={`visited-stamp-${stop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVisited(stop.id);
                        }}
                        className={`flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-none border transition cursor-pointer ${
                          progress.visited
                            ? 'bg-[#2D3A27] text-white border-[#2D3A27]'
                            : 'bg-white text-stone-500 border-[#1A1A1A]/30 hover:bg-[#F2EFE9]'
                        }`}
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>{progress.visited ? 'STAMPED' : 'STAMP'}</span>
                      </button>
                    </div>

                    {/* Quick Facts and Details Panels */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs pt-1">
                      <div className="flex items-start gap-1 sm:gap-1.5 bg-[#F2EFE9] p-1.5 sm:p-2 rounded-none border border-[#E8E4D9]">
                        {stop.payment === 'Cash Only' ? (
                          <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2D3A27] flex-shrink-0 mt-0.5" />
                        ) : (
                          <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-[8px] sm:text-[9px] font-mono text-[#636b5d] uppercase block leading-none font-bold">PAYMENT</span>
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-stone-700 leading-tight block mt-0.5">{stop.payment}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-1 sm:gap-1.5 bg-[#F2EFE9] p-1.5 sm:p-2 rounded-none border border-[#E8E4D9]">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2D3A27] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[8px] sm:text-[9px] font-mono text-[#636b5d] uppercase block leading-none font-bold">WEEKEND</span>
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-stone-700 leading-tight block mt-0.5">{stop.hours.saturday.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Short highlight quote */}
                    <p className="text-xs text-[#1A1A1A] leading-relaxed font-serif bg-[#F2EFE9]/50 rounded-none p-2 sm:p-3 border border-[#E8E4D9] italic">
                      &ldquo;{stop.shortFact}&rdquo;
                    </p>
                  </div>

                  {/* Always Expanded Details Block */}
                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-[#1A1A1A]/10 flex-grow flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3">
                      {/* Vibe description */}
                      <div>
                        <h5 className="text-[10px] font-mono text-[#636b5d] uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-editorial-green" />
                          <span>THE ATMOSPHERE & CRAFT:</span>
                        </h5>
                        <p className="text-xs text-[#1A1A1A] leading-relaxed font-serif">{stop.description}</p>
                      </div>

                      {/* Historic facts */}
                      <div className="bg-[#2D3A27]/5 p-2.5 sm:p-3 rounded-none border border-[#2D3A27]/20">
                        <h6 className="text-[10px] font-mono text-[#2D3A27] uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#2D3A27]" />
                          <span>HISTORY & TRIVIA:</span>
                        </h6>
                        <p className="text-[11px] sm:text-[11.5px] text-[#2D3A27] leading-relaxed font-serif">{stop.history}</p>
                      </div>

                      {/* Address & Mini Map Card */}
                      <div className="space-y-2">
                        <div className="text-xs text-[#1A1A1A] bg-[#F2EFE9] p-2 sm:p-2.5 rounded-none border border-[#E8E4D9]">
                          <div className="flex gap-1.5 items-start">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                            <span>{stop.address}</span>
                          </div>
                        </div>

                        {/* Interactive Mini Map Embed */}
                        <div className="w-full h-24 sm:h-28 relative border border-[#1A1A1A]/15 overflow-hidden bg-stone-100">
                          <iframe
                            title={`Micro map of ${stop.name}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            src={`https://maps.google.com/maps?q=${stop.latitude},${stop.longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                          ></iframe>
                        </div>
                      </div>
                    </div>

                    {/* Your Personal Travel notes (Persistent Offline Feature) */}
                    <div className="no-print space-y-1 sm:space-y-1.5 pt-2 border-t border-[#1A1A1A]/5">
                      <label className="block text-[9px] sm:text-[10px] font-mono text-[#636b5d] uppercase font-bold">
                        ✍️ Travel Notebook (Saves Instantly):
                      </label>
                      <textarea
                        id={`note-textarea-${stop.id}`}
                        onClick={(e) => e.stopPropagation()} // stop map jump on click textarea
                        value={progress.notes}
                        onChange={(e) => onUpdateNotes(stop.id, e.target.value)}
                        placeholder="Jot down notes (e.g., 'Tasted draft X-well, cash only...')"
                        rows={2}
                        className="w-full text-xs font-sans p-1.5 sm:p-2 bg-white border border-[#1A1A1A] rounded-none focus:outline-none focus:ring-1 focus:ring-[#2D3A27] text-[#1A1A1A] placeholder-stone-400"
                      />
                      
                      {/* Rating selector */}
                      <div className="flex items-center gap-2 pt-1 font-sans">
                        <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#636b5d] font-bold">Your Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              id={`rate-btn-${stop.id}-${star}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateRating(stop.id, star);
                              }}
                              className={`text-base leading-none transition duration-100 cursor-pointer ${
                                star <= progress.rating ? 'text-amber-600 hover:scale-110' : 'text-stone-300 hover:text-[#2D3A27]'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer (Beers selection) */}
                <div className="bg-[#F2EFE9]/40 border-t border-[#1A1A1A]/10 px-3.5 py-2.5 sm:px-5 sm:py-3.5 flex flex-wrap justify-between items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 text-stone-600 text-xs">
                    <span className="font-mono font-bold text-stone-400 text-[10px] uppercase tracking-wider">Poured:</span>
                    <span className="font-mono font-bold text-[#1A1A1A]">{stop.beers[0].split(' ')[0]}...</span>
                  </div>

                  <a
                    id={`stop-gmaps-link-${stop.id}`}
                    href={stop.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#2D3A27] hover:underline"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 bg-[#FDFCF8] border border-[#1A1A1A] rounded-none p-10 text-center text-stone-500">
            <AlertTriangle className="w-8 h-8 text-rose-700 mx-auto mb-2 opacity-75" />
            <h5 className="font-serif font-black text-[#2D3A27] italic text-lg">No stops matching your match filters</h5>
            <p className="text-xs text-[#636b5d] mt-1 max-w-sm mx-auto font-serif">
              Try adjusting your query string or switching quarter category tabs to find your beer zoo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
