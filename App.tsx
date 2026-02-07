
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Search, 
  Filter, 
  Sparkles, 
  Sun, 
  Moon, 
  Info,
  X,
  CheckCircle2,
  CalendarDays,
  Volume2,
  Zap,
  BellRing,
  Download
} from 'lucide-react';
import { fetchMonthlyFestivalsOffline, getAdvancedPanchang } from './services/festivalService';
import { Festival, FestivalCategory } from './types';
import FestivalCard from './components/FestivalCard';
import NotificationPanel from './components/NotificationPanel';
import SpiritualBot from './components/SpiritualBot';
import { playTempleBell, playChime } from './utils/sound';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [panchang, setPanchang] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanchangLoading, setIsPanchangLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FestivalCategory>(FestivalCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifiedFestivals, setNotifiedFestivals] = useState<string[]>([]);
  const [shownNotifications, setShownNotifications] = useState<string[]>([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('dharma_notifications');
    const shown = localStorage.getItem('dharma_shown_today');
    if (saved) setNotifiedFestivals(JSON.parse(saved));
    if (shown) setShownNotifications(JSON.parse(shown));
    
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.requestPermissions();
    } else if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    
    fetchTodayPanchang();
  }, []);

  const fetchTodayPanchang = async () => {
    setIsPanchangLoading(true);
    const data = await getAdvancedPanchang(new Date().toDateString());
    setPanchang(data);
    setIsPanchangLoading(false);
  };

  useEffect(() => {
    const checkScheduled = () => {
      const todayStr = new Date().toISOString().split('T')[0];
      festivals.forEach(f => {
        if (f.date === todayStr && notifiedFestivals.includes(f.id) && !shownNotifications.includes(f.id)) {
          handleScheduledAlert(f);
        }
      });
    };

    const interval = setInterval(checkScheduled, 60000);
    checkScheduled();
    return () => clearInterval(interval);
  }, [festivals, notifiedFestivals, shownNotifications]);

  const handleScheduledAlert = (festival: Festival) => {
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: `🙏 Aaj hai ${festival.hindiName}`,
            body: `${festival.name} - ${festival.significance}`,
            id: new Date().getTime(),
            schedule: { at: new Date(Date.now() + 1000) },
            sound: 'temple_bell.wav',
            attachments: [],
            actionTypeId: "",
            extra: null
          }
        ]
      });
    } else if (Notification.permission === "granted") {
      new Notification(`🙏 Aaj hai ${festival.hindiName}`, {
        body: `${festival.name} - ${festival.significance}`,
        icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910795.png'
      });
    }
    if (soundEnabled) playTempleBell();
    
    const updated = [...shownNotifications, festival.id];
    setShownNotifications(updated);
    localStorage.setItem('dharma_shown_today', JSON.stringify(updated));
    setSelectedFestival(festival);
  };

  const loadFestivals = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchMonthlyFestivalsOffline(currentDate.getMonth(), currentDate.getFullYear());
    setFestivals(data);
    setIsLoading(false);
  }, [currentDate]);

  useEffect(() => {
    loadFestivals();
  }, [loadFestivals]);

  const toggleNotification = (festival: Festival) => {
    let updated;
    if (notifiedFestivals.includes(festival.id)) {
      updated = notifiedFestivals.filter(id => id !== festival.id);
    } else {
      updated = [...notifiedFestivals, festival.id];
      if (soundEnabled) playChime();
    }
    setNotifiedFestivals(updated);
    localStorage.setItem('dharma_notifications', JSON.stringify(updated));
  };

  const filteredFestivals = useMemo(() => {
    return festivals.filter(f => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = f.name.toLowerCase().includes(query) || f.hindiName.toLowerCase().includes(query);
      const matchesCategory = activeCategory === FestivalCategory.ALL ||
        (activeCategory === FestivalCategory.EKADASHI && f.name.includes('Ekadashi')) ||
        (activeCategory === FestivalCategory.SHIVARATRI && f.name.includes('Shivaratri')) ||
        (activeCategory === FestivalCategory.PURNIMA && f.name.includes('Purnima')) ||
        (activeCategory === FestivalCategory.AMAVASYA && f.name.includes('Amavasya')) ||
        (activeCategory === FestivalCategory.MAJOR && f.type === 'major');
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [festivals, searchQuery, activeCategory]);

  const monthLabel = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <header className="max-w-7xl mx-auto pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 gradient-saffron text-white rounded-xl shadow-md">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dharma Calendar 2026</h1>
            <p className="text-sm text-gray-500">Hindu Festival Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setSoundEnabled(!soundEnabled); if (!soundEnabled) playChime(); }}
            className={`p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 ${soundEnabled ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
          >
            <Volume2 size={20} />
          </button>

          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="p-3 bg-orange-600 text-white rounded-xl shadow-lg border border-orange-400 hover:bg-orange-700 hover:scale-105 transition-all animate-pulse"
              title="Install App"
            >
              <Download size={20} />
            </button>
          )}
          
          <button 
            onClick={() => setIsNotificationPanelOpen(true)}
            className="relative p-3 bg-white shadow-lg rounded-xl border border-gray-100 text-gray-600 hover:text-orange-500 hover:shadow-orange-100 transition-all duration-300"
          >
            {notifiedFestivals.length > 0 ? (
              <BellRing size={24} className="text-orange-600 animate-wiggle" />
            ) : (
              <Bell size={24} />
            )}
            {notifiedFestivals.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                {notifiedFestivals.length}
              </span>
            )}
          </button>
          
          <div className="flex items-center bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-4 hover:bg-orange-50 text-orange-500 transition-colors"><ChevronLeft size={20} /></button>
            <div className="px-6 font-bold text-gray-700 font-cinzel min-w-[160px] text-center tracking-widest">{monthLabel}</div>
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-4 hover:bg-orange-50 text-orange-500 transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search festivals..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
              {Object.values(FestivalCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Sun size={18} /> Today's Panchang
              </h4>
              {!isPanchangLoading && panchang ? (
                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="block text-xs opacity-75 mb-1">Tithi</span>
                    <span className="text-sm font-medium">{panchang.tithi}</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="block text-xs opacity-75 mb-1">Nakshatra</span>
                    <span className="text-sm font-medium">{panchang.nakshatra}</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-xs italic opacity-90">"{panchang.spiritualTip}"</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-pulse">
                  <div className="h-12 bg-white/10 rounded-lg"></div>
                  <div className="h-12 bg-white/10 rounded-lg"></div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium mt-4">Loading festivals...</p>
            </div>
          ) : filteredFestivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              {filteredFestivals.map((festival) => (
                <FestivalCard 
                  key={festival.id} 
                  festival={festival} 
                  onNotify={toggleNotification}
                  isNotified={notifiedFestivals.includes(festival.id)}
                  onDetails={setSelectedFestival}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 glass-card rounded-2xl">
              <CalendarDays size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">No festivals found</p>
              <button onClick={() => { setActiveCategory(FestivalCategory.ALL); setSearchQuery(''); }} className="mt-6 px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Show All
              </button>
            </div>
          )}
        </section>
      </main>

      {selectedFestival && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl transition-all duration-500">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-zoom-in border border-orange-100">
            <div className="h-72 gradient-saffron relative p-12 flex flex-col justify-end text-white overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
              <button onClick={() => setSelectedFestival(null)} className="absolute top-10 right-10 p-4 bg-black/10 rounded-full hover:bg-black/20 transition-all hover:rotate-90"><X size={24} /></button>
              <div className="flex items-center gap-10 relative z-10">
                <span className="text-8xl drop-shadow-2xl animate-bounce-slow">{selectedFestival.icon}</span>
                <div>
                  <h2 className="text-5xl font-cinzel font-black tracking-tighter leading-none">{selectedFestival.name}</h2>
                  <p className="text-orange-50 text-2xl font-lora italic opacity-90 mt-2">{selectedFestival.hindiName}</p>
                </div>
              </div>
            </div>
            <div className="p-14 space-y-10 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-orange-600 font-black mb-4 uppercase text-[10px] tracking-[0.3em]">Mahatva</h4>
                <p className="text-gray-700 leading-relaxed font-medium text-lg">{selectedFestival.significance}</p>
              </section>
              <section className="space-y-6">
                <h4 className="flex items-center gap-2 text-orange-600 font-black mb-4 uppercase text-[10px] tracking-[0.3em]">Kaise Manaye</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {selectedFestival.rituals.map((r, i) => (
                    <div key={i} className="flex items-center gap-5 p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100 hover:bg-orange-100 transition-colors group">
                      <span className="w-10 h-10 bg-orange-600 text-white flex-shrink-0 rounded-full flex items-center justify-center text-sm font-black shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">{i + 1}</span>
                      <span className="text-sm font-black text-gray-800 tracking-tight">{r}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <NotificationPanel 
        isOpen={isNotificationPanelOpen} 
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={festivals.filter(f => notifiedFestivals.includes(f.id))}
        onRemove={(id) => setNotifiedFestivals(prev => prev.filter(nid => nid !== id))}
      />
      
      <SpiritualBot />

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-8deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-wiggle { animation: wiggle 1.5s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 12s infinite linear; }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-zoom-in { animation: zoom-in 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ff9933; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default App;
