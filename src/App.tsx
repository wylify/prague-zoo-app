import React, { useState, useEffect } from 'react';
import { BEER_STOPS_DATA, TOUR_SUMMARY } from './data';
import { BeerStop, UserNote } from './types';
import InteractiveMap from './components/InteractiveMap';
import TourSchedule from './components/TourSchedule';
import OfflineDownload from './components/OfflineDownload';
import { Compass, Gift, Calendar, Sparkles, MapPin, RefreshCw, Layers, Award, CheckCircle, Info, Beer } from 'lucide-react';

export default function App() {
  const [selectedStopId, setSelectedStopId] = useState<number | null>(1);
  
  // Initialize device online status directly from navigator data
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });

  // Load and save progress from browser memory
  const [userProgress, setUserProgress] = useState<UserNote[]>(() => {
    const initialProgress: UserNote[] = BEER_STOPS_DATA.map(st => ({
      stopId: st.id,
      visited: false,
      rating: 0,
      notes: ''
    }));
    try {
      const saved = localStorage.getItem('prague_beer_zoo_progress');
      if (saved) {
        const parsed: UserNote[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return initialProgress.map(initialItem => {
            const savedItem = parsed.find(p => p && p.stopId === initialItem.stopId);
            return savedItem ? { ...initialItem, ...savedItem } : initialItem;
          });
        }
      }
    } catch (e) {
      console.error("Local storage fetching failed", e);
    }
    return initialProgress;
  });

  // Auto-sync Quest stamps and journal notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('prague_beer_zoo_progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error("Local storage saving failed", e);
    }
  }, [userProgress]);

  // Sync with device physical connectivity status changes
  useEffect(() => {
    const handleOnline = () => {
      console.log("Device connectivity recovered: Online");
      setIsOffline(false);
    };
    const handleOffline = () => {
      console.log("Device connectivity lost: Offline Mode Active");
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Ensure the app opens at the top of the page on initial load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Handler functions
  const handleSelectStop = (id: number) => {
    setSelectedStopId(id);
  };

  const handleToggleVisited = (id: number) => {
    setUserProgress(prev => prev.map(item => 
      item.stopId === id ? { ...item, visited: !item.visited } : item
    ));
  };

  const handleUpdateNotes = (id: number, notes: string) => {
    setUserProgress(prev => prev.map(item => 
      item.stopId === id ? { ...item, notes } : item
    ));
  };

  const handleUpdateRating = (id: number, rating: number) => {
    setUserProgress(prev => prev.map(item => 
      item.stopId === id ? { ...item, rating } : item
    ));
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your Beer Zoo quest stamps and journal notes? This cannot be undone.")) {
      setUserProgress(BEER_STOPS_DATA.map(st => ({
        stopId: st.id,
        visited: false,
        rating: 0,
        notes: ''
      })));
    }
  };

  const handleResetRatings = () => {
    if (window.confirm("Are you sure you want to reset all of your pub ratings? This cannot be undone.")) {
      setUserProgress(prev => prev.map(item => ({
        ...item,
        rating: 0
      })));
    }
  };

  // Stats calculation
  const totalVisited = userProgress.filter(p => p.visited).length;
  const isQuestComplete = totalVisited === BEER_STOPS_DATA.length;

  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#1A1A1A] antialiased font-sans flex flex-col justify-between selection:bg-amber-850/20 p-1 sm:p-4 md:p-8">
      
      <div className="max-w-6xl w-full mx-auto bg-[#FDFCF8] border-2 sm:border-[8px] md:border-[16px] border-[#E8E4D9] p-2.5 sm:p-6 md:p-12 shadow-sm relative flex flex-col flex-grow">
        
        {/* Banner / Header Section in Editorial Aesthetic (Invisible when printing) */}
        <header className="no-print flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#1A1A1A] pb-4 md:pb-6 mb-4 md:mb-8 gap-4 md:gap-6 w-full">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-editorial-green font-mono text-[10px] tracking-[0.2em] font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-editorial-green"></span>
              <span>11-Stop Authentic Self-Guided Draft Quest</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-black uppercase leading-none tracking-tighter italic text-editorial-green flex items-center gap-2 sm:gap-3">
              <Beer className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-editorial-green" />
              <span>Prague Beer Zoo</span>
            </h1>
            <p className="font-serif text-sm sm:text-base md:text-xl italic opacity-85 uppercase tracking-widest text-[#636b5d]">
              The Official Self-Guided Pilgrimage & Route Map / Pražská Pivní Zoo
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full md:w-auto">
            <button
              id="header-print-jump"
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2D3A27] text-white font-bold font-mono tracking-wider text-[11px] rounded-none transition cursor-pointer text-center"
            >
              Print Route Guide (PDF)
            </button>
          </div>
        </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-1 sm:px-4 md:px-6 py-4 md:py-10 space-y-6 md:space-y-10 w-full flex-grow">
        
        {/* Intro Block - Brief Context (Invisible when printing) */}
        <section className="no-print bg-[#FDFCF8] border border-[#1A1A1A] p-4 md:p-8 relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
            <div>
              <div className="inline-block bg-[#2D3A27] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-none">
                Czech Heritage Walk
              </div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-editorial-green italic tracking-tight">
              About the Prague Beer Zoo Challenge
            </h2>
            <p className="text-xs md:text-sm text-editorial-text leading-relaxed font-sans">
              The <strong>Prague Beer Zoo</strong> is a beautiful, unofficial tavern trail passing through the most famous, centuries-old Czech pubs that bear an animal name. There is no official club or corporate register — the idea was created purely among old-world tavern regulars and local draftsmen. 
            </p>
            <p className="text-xs md:text-sm text-editorial-text leading-relaxed font-sans mt-2">
              Our quest maps the original 11 legendary stops (representing creatures like <strong>oxen, hippos, bears, cats, roosters</strong>, and <strong>stags</strong>). Follow this guide to challenge yourself or explore with friends to complete the trail!
            </p>
          </div>

          <div className="bg-[#2D3A27] text-[#FDFCF8]/95 p-4 md:p-6 border-l border-[#1A1A1A] space-y-3 md:space-y-4 flex flex-col justify-center">
            <h3 className="font-serif text-lg font-bold border-b border-[#FDFCF8]/20 pb-2 text-white flex items-center justify-between">
              <span className="italic">Trail Rules & Strategy</span>
              <Award className="w-5 h-5 text-amber-300" />
            </h3>
            <ul className="text-xs space-y-2 md:space-y-3 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">✔</span>
                <span><strong>No speed running</strong>: Order 0.3L fractions or traditional lunch foods to pace yourself.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">✔</span>
                <span><strong>Bring Czech Koruna (CZK)</strong>: Inner-city castle taverns are historically cash-only!</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">✔</span>
                <span><strong>Respect Regulars</strong>: Do not block tables. Stand with local štamgasti near the wooden taps.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Interactive Maps View */}
        <section className="no-print space-y-4">
          <InteractiveMap
            stops={BEER_STOPS_DATA}
            selectedStopId={selectedStopId}
            onSelectStop={handleSelectStop}
            isOffline={isOffline}
            setIsOffline={setIsOffline}
          />
        </section>

        {/* Section 3: Intuitive Category Guide Schedule */}
        <section id="stops-scheduled" className="space-y-4">
          <div className="no-print flex items-stretch md:items-center justify-between flex-col md:flex-row gap-3 px-1">
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-700" />
                <span>11 Animal Stops - Pocket Explorer</span>
              </h3>
              <p className="text-xs text-stone-500">Interactive tracker, opening days, payment details and notes.</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs bg-stone-200 border border-stone-300 px-2 sm:px-3 py-1.5 rounded-lg font-mono font-bold text-stone-700">
                Quest: {totalVisited}/11 Visited
              </div>
              <button
                id="reset-ratings-btn"
                onClick={handleResetRatings}
                className="text-xs font-semibold px-2 sm:px-2.5 py-1.5 border border-stone-300 rounded-lg hover:bg-stone-100 text-stone-600 transition cursor-pointer bg-white"
              >
                Reset Ratings
              </button>
              <button
                id="reset-tracker-btn"
                onClick={handleResetProgress}
                className="text-xs font-semibold px-2 sm:px-2.5 py-1.5 border border-stone-300 rounded-lg hover:bg-stone-100 text-stone-600 transition cursor-pointer bg-white"
              >
                Reset Stamps
              </button>
            </div>
          </div>

          <TourSchedule
            stops={BEER_STOPS_DATA}
            selectedStopId={selectedStopId}
            onSelectStop={handleSelectStop}
            userProgress={userProgress}
            onToggleVisited={handleToggleVisited}
            onUpdateNotes={handleUpdateNotes}
            onUpdateRating={handleUpdateRating}
          />
        </section>

        {/* Section 4: Offline Guides & Backups */}
        <section className="no-print">
          <OfflineDownload
            stops={BEER_STOPS_DATA}
            userProgress={userProgress}
          />
        </section>

      </main>

      {/* Universal Floating Quest Progress Bar Check (No Tech Logs, pure aesthetic fun!) */}
      {totalVisited > 0 && (
        <div className="no-print sticky bottom-4 right-4 max-w-sm ml-auto mr-4 mb-4 bg-stone-900 text-stone-100 border border-stone-800 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-slide-up z-20">
          <div className="space-y-1">
            <h5 className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">ZOO TOUR TRACKER</h5>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🍺</span>
              <p className="text-xs text-stone-200">
                You checked off <strong>{totalVisited} of 11 animals</strong>!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {isQuestComplete ? (
              <span className="text-emerald-400 text-xs font-bold bg-emerald-900/50 px-2.5 py-1 rounded border border-emerald-800 flex items-center gap-1">
                🏆 Completed!
              </span>
            ) : (
              <div className="h-2 w-20 bg-stone-800 rounded-full overflow-hidden border border-stone-750">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300" 
                  style={{ width: `${(totalVisited / 11) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Block */}
      <footer className="no-print bg-[#2D3A27] text-[#FDFCF8]/85 text-xs text-center py-8 px-4 mt-12 border-t border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="font-serif italic text-white text-sm">
            &ldquo;Kdo nepije pivo, není Čech!&rdquo; — Who doesn&apos;t drink beer, is not a Czech.
          </p>
          <p className="leading-relaxed opacity-90 font-sans">
            Please drink responsibly. Always bring CZK when hiking around Prague Castle. Standard tip is 10% round-up. All stops information is adapted from actual Prague tavern insider circles and historical documents. 
          </p>
          <div className="text-[10px] text-[#FDFCF8]/60 font-mono tracking-widest uppercase">
            PRAGUE BEER ZOO SELF-GUIDED TOUR VOUCHER &bull; DESIGNED IN COOP WITH TOURISM REGULARS
          </div>
        </div>
      </footer>

      </div> {/* Close max-w-6xl Central Paper Layout Sheet */}
    </div>
  );
}
