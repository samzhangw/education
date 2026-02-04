import React, { useState, useEffect } from 'react';
import { CATEGORIES, ADMISSION_PATHS, IMPORTANT_DATES, LOGGING_API_URL } from './constants';
import { StudentCategory, ImportantDate, AdmissionPath } from './types';
import { GraduationCap, Calendar, Info, ArrowRight, CheckCircle2, ExternalLink, Timer, AlertCircle, Clock, Menu, X, LayoutGrid, Mail, Share2, Check, Copy, ChevronRight, Sparkles, ChevronDown, User, ArrowRightLeft, Star, CalendarDays, Printer, MousePointerClick, Target, Trophy, ChevronRightCircle, Zap } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import ComparisonModal from './ComparisonModal';
import PrintScheduleModal from './PrintScheduleModal';
import PathDetailModal from './PathDetailModal';

// --- Utility Functions for Date Handling ---

const parseTaiwanDate = (dateStr: string): Date | null => {
  try {
    const match = dateStr.match(/(\d{3})[./](\d{2})[./](\d{2})/);
    if (!match) return null;

    const year = parseInt(match[1], 10) + 1911;
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);

    return new Date(year, month, day);
  } catch (e) {
    return null;
  }
};

const getDaysRemaining = (targetDate: Date): number => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getEventStatus = (dateStr: string) => {
    const date = parseTaiwanDate(dateStr);
    if (!date) return 'unknown';
    const now = new Date();
    now.setHours(0,0,0,0);
    
    // Check if the date is strictly in the past (yesterday or before)
    if (date < now) return 'past';
    
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 14 && diffDays >= 0) return 'soon';
    return 'future';
};

const getDateParts = (dateStr: string) => {
    const date = parseTaiwanDate(dateStr);
    if (!date) return { month: '??', day: '??' };
    return {
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        day: date.getDate().toString().padStart(2, '0')
    };
};

// Logging function to Google Apps Script
const sendUserLog = async (action: string, detail: string, extra?: string) => {
  if (!LOGGING_API_URL || (LOGGING_API_URL as string) === "") return;

  try {
    // We use no-cors to avoid CORS errors from Google Apps Script.
    // This makes the request "opaque", so we won't get a readable response,
    // but the data will be sent to the server.
    await fetch(LOGGING_API_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        action: action,
        detail: detail,
        extra: extra || '',
        url: window.location.href,
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      }),
    });
  } catch (error) {
    // Fail silently to not disturb user experience
    console.warn("Logging failed", error);
  }
};

// Configuration for Major Exams per Category
const MAJOR_EXAMS: Record<StudentCategory, { title: string; dateStr: string; color: string; gradient: string; icon: any }[]> = {
  high_school: [
    { title: '高中英聽(一)', dateStr: '114/10/18', color: 'text-emerald-600', gradient: 'from-emerald-400 to-teal-500', icon: 'ear' },
    { title: '學測 (GSAT)', dateStr: '115/01/17', color: 'text-indigo-600', gradient: 'from-indigo-400 to-violet-500', icon: 'pen' },
    { title: '分科測驗', dateStr: '115/07/11', color: 'text-rose-600', gradient: 'from-rose-400 to-pink-500', icon: 'book' },
  ],
  vocational: [
    { title: '統測 (TVE)', dateStr: '115/04/25', color: 'text-blue-600', gradient: 'from-blue-400 to-cyan-500', icon: 'tool' },
  ],
  junior_college: [
    { title: '二技統測', dateStr: '115/04/25', color: 'text-blue-600', gradient: 'from-blue-400 to-cyan-500', icon: 'cap' },
  ]
};

const COUNTDOWN_TOOLS = [
  { title: '會考倒數', subtitle: '國中教育會考', url: 'https://tyctw.github.io/115clock/', color: 'bg-emerald-500' },
  { title: '統測倒數', subtitle: '四技二專統測', url: 'https://tcte.onrender.com/', color: 'bg-blue-500' },
  { title: '學測倒數', subtitle: '大學學科能力測驗', url: 'https://ceecc.vercel.app/', color: 'bg-indigo-500' },
  { title: '分科倒數', subtitle: '大學分科測驗', url: 'https://ceeecc.vercel.app/', color: 'bg-rose-500' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<StudentCategory>('high_school');
  const [upcomingEvent, setUpcomingEvent] = useState<ImportantDate | null>(null);
  const [daysToEvent, setDaysToEvent] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedPathDetail, setSelectedPathDetail] = useState<AdmissionPath | null>(null);

  const activePaths = ADMISSION_PATHS[activeCategory];
  
  const activeDates = IMPORTANT_DATES
    .filter((d) => d.category.includes(activeCategory))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Log initial page load
  useEffect(() => {
    sendUserLog('page_view', 'home_loaded');
  }, []);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const next = activeDates.find(item => {
      const dateObj = parseTaiwanDate(item.date);
      return dateObj && dateObj >= now;
    });

    if (next) {
      setUpcomingEvent(next);
      const dateObj = parseTaiwanDate(next.date);
      if (dateObj) setDaysToEvent(getDaysRemaining(dateObj));
    } else {
      setUpcomingEvent(null);
    }
  }, [activeCategory, activeDates]);

  // Wrapper for category change to log it
  const handleCategoryChange = (id: StudentCategory) => {
    setActiveCategory(id);
    sendUserLog('change_category', id);
    setIsCategoryMenuOpen(false);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPathDetail = (path: AdmissionPath) => {
    setSelectedPathDetail(path);
    sendUserLog('view_path_detail', path.id, path.title);
  };

  const handleCountdownClick = (toolName: string, url: string) => {
    sendUserLog('click_external_tool', toolName, url);
  };

  const categoryExams = MAJOR_EXAMS[activeCategory];
  const sortedExams = [...categoryExams].sort((a, b) => {
      const da = parseTaiwanDate(a.dateStr)?.getTime() || 0;
      const db = parseTaiwanDate(b.dateStr)?.getTime() || 0;
      return da - db;
  });
  
  const upcomingExams = sortedExams.filter(e => {
      const d = parseTaiwanDate(e.dateStr);
      return d && getDaysRemaining(d) >= 0;
  });

  const nearestExam = upcomingExams.length > 0 ? upcomingExams[0] : sortedExams[sortedExams.length - 1];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyFeedback(true);
      sendUserLog('share_action', 'copy_link');
      setTimeout(() => setShowCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleNativeShare = async () => {
    sendUserLog('share_action', 'native_share');
    const shareData = {
      title: '升大學管道',
      text: '探索屬於你的最佳升學路徑，115 學年度最新資訊整理。',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled:', err);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans pb-24 relative overflow-hidden bg-slate-50">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 rounded-xl text-white shadow-inner">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
              <span className="font-extrabold text-xl sm:text-2xl text-slate-800 tracking-tight flex flex-col sm:flex-row sm:gap-2 leading-none sm:leading-normal">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">升大學管道</span>
              </span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Desktop Category Switcher */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 hover:bg-slate-100 text-slate-700 rounded-full border border-slate-200/50 transition-all text-sm font-bold shadow-sm"
                >
                  <span className={`w-2 h-2 rounded-full ${
                    activeCategory === 'high_school' ? 'bg-indigo-500' : 
                    activeCategory === 'vocational' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}></span>
                  {CATEGORIES.find(c => c.id === activeCategory)?.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsCategoryMenuOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                       {CATEGORIES.map(cat => (
                         <button
                           key={cat.id}
                           onClick={() => handleCategoryChange(cat.id)}
                           className={`w-full text-left px-4 py-3 rounded-xl flex flex-col gap-0.5 transition-colors ${
                             activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'
                           }`}
                         >
                           <span className="font-bold text-sm flex items-center justify-between">
                              {cat.label}
                              {activeCategory === cat.id && <Check className="w-4 h-4" />}
                           </span>
                           <span className="text-xs text-slate-400 font-medium">{cat.description}</span>
                         </button>
                       ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300 active:scale-95"
                title="分享頁面"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300 active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div className={`fixed inset-0 z-[60] ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-800">
                 <LayoutGrid className="w-5 h-5 text-indigo-500" />
                 <h3 className="font-bold text-lg">更多工具</h3>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
              
              {/* Mobile Category Switcher */}
              <div className="mb-8 lg:hidden">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <User className="w-3 h-3" />
                   選擇你的身分
                </h4>
                <div className="grid gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        activeCategory === cat.id
                          ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                          : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-500 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col items-start gap-0.5">
                         <span className={`font-bold text-sm ${activeCategory === cat.id ? 'text-indigo-700' : 'text-slate-700'}`}>{cat.label}</span>
                         <span className="text-xs text-slate-400">{cat.description}</span>
                      </div>
                      {activeCategory === cat.id && (
                        <div className="bg-indigo-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                專屬倒數計時器
              </h4>
              <div className="grid gap-3">
                 {COUNTDOWN_TOOLS.map((tool) => (
                    <a 
                      key={tool.title}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCountdownClick(tool.title, tool.url)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                         <Clock className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                         <div className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors text-lg">{tool.title}</div>
                         <div className="text-xs text-slate-400 font-medium">{tool.subtitle}</div>
                      </div>
                    </a>
                 ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200 md:hidden">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">快速導航</h4>
                <div className="space-y-2">
                  {[
                    { id: 'dashboard', label: '備考儀表板' },
                    { id: 'paths', label: '入學管道' },
                    { id: 'timeline', label: '重要日程' }
                  ].map(item => (
                    <a key={item.id} href={`#${item.id}`} onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-slate-100 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all font-medium shadow-sm">
                      {item.label}
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200" onClick={() => setIsShareModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800">分享頁面</h3>
                </div>
                <button onClick={() => setIsShareModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             <div className="p-8 flex flex-col items-center gap-6 bg-gradient-to-b from-white to-slate-50">
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
                  <QRCodeCanvas value={typeof window !== 'undefined' ? window.location.href : ''} size={180} level={"H"} />
                </div>
                <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                  掃描 QR Code <br/> 將最新的升學資訊分享給朋友
                </p>
                
                <div className="w-full space-y-3">
                   <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex-1 overflow-hidden">
                        <input 
                          type="text" 
                          readOnly 
                          value={typeof window !== 'undefined' ? window.location.href : ''} 
                          className="w-full bg-transparent text-sm text-slate-600 outline-none truncate font-medium"
                        />
                      </div>
                      <button 
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Copy className="w-3 h-3" />
                        複製
                      </button>
                   </div>
                   
                   {typeof navigator !== 'undefined' && navigator.share && (
                      <button 
                        onClick={handleNativeShare}
                        className="w-full py-3 flex items-center justify-center gap-2 text-white font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-200 rounded-xl transition-all active:scale-[0.98]"
                      >
                        <Share2 className="w-4 h-4" />
                        使用系統分享
                      </button>
                   )}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <ComparisonModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        paths={activePaths}
        categoryLabel={CATEGORIES.find(c => c.id === activeCategory)?.label || ''}
      />

      {/* Print Schedule Modal */}
      <PrintScheduleModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        category={activeCategory}
        paths={activePaths}
        dates={activeDates}
      />

      {/* Path Detail Modal */}
      <PathDetailModal
         isOpen={!!selectedPathDetail}
         onClose={() => setSelectedPathDetail(null)}
         path={selectedPathDetail}
      />

      <main className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">
        
        {/* Redesigned Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 shadow-2xl ring-1 ring-white/10 group isolate">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-3xl animate-float"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] rounded-full bg-gradient-to-tl from-fuchsia-400/30 to-rose-400/30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg animate-in slide-in-from-left-5 duration-700">
                 <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                 </span>
                 <span className="text-white/90 text-sm font-bold tracking-wide">115 學年度最新資訊已更新</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] animate-in slide-in-from-bottom-5 duration-700 delay-100">
                 探索屬於你的
                 <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-sm">
                   最佳升學路徑
                 </span>
              </h1>

              <p className="text-lg sm:text-xl text-indigo-100 font-medium leading-relaxed max-w-xl animate-in slide-in-from-bottom-5 duration-700 delay-200">
                我們為你整理了 115 學年度最完整的升學策略與關鍵時程，助你從容應對學測、統測與分科測驗，不錯過任何重要時刻。
              </p>

              <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom-5 duration-700 delay-300">
                <a 
                  href="#dashboard" 
                  className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1 transition-all flex items-center gap-2 group/btn"
                >
                  查看倒數
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a 
                   href="#paths"
                   className="px-8 py-4 bg-indigo-800/40 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-indigo-800/60 hover:border-white/40 transition-all backdrop-blur-md"
                >
                   了解管道
                </a>
              </div>
            </div>

            {/* Right Interactive Widget */}
            <div className="relative animate-in zoom-in-95 duration-700 delay-200 lg:pl-10">
               <div className="absolute inset-0 bg-indigo-500/10 blur-3xl -z-10 rounded-full"></div>
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                     <Zap className="w-24 h-24 text-white rotate-12" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-white/20 rounded-xl text-white">
                        <User className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-white">請選擇你的目前身分</h3>
                  </div>

                  <div className="space-y-3">
                     {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`w-full group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                            activeCategory === cat.id
                              ? 'bg-white border-white shadow-lg scale-[1.02]'
                              : 'bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30'
                          }`}
                        >
                           <div className="flex items-center gap-4 relative z-10">
                              <div className={`w-2 h-10 rounded-full transition-colors ${
                                 activeCategory === cat.id ? 'bg-indigo-600' : 'bg-white/20'
                              }`}></div>
                              <div className="text-left">
                                 <div className={`font-bold text-lg ${
                                    activeCategory === cat.id ? 'text-slate-900' : 'text-white'
                                 }`}>
                                    {cat.label}
                                 </div>
                                 <div className={`text-xs ${
                                    activeCategory === cat.id ? 'text-slate-500' : 'text-indigo-200'
                                 }`}>
                                    {cat.description}
                                 </div>
                              </div>
                           </div>
                           
                           {activeCategory === cat.id && (
                              <div className="relative z-10 bg-indigo-100 p-2 rounded-full text-indigo-600 animate-in zoom-in spin-in-12 duration-300">
                                 <Check className="w-5 h-5" strokeWidth={3} />
                              </div>
                           )}
                           
                           {/* Hover Effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white text-rose-500 rounded-2xl shadow-sm border border-slate-100">
              <Timer className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">備考儀表板</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Upcoming Event Card */}
            {upcomingEvent ? (
              <div className="glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-sm">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="flex items-center gap-2.5 text-indigo-600 font-bold mb-4 bg-indigo-50/80 w-fit px-3 py-1 rounded-full text-xs border border-indigo-100/50 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  下一個重要日程
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{upcomingEvent.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-6">
                    <Calendar className="w-4 h-4" />
                    {upcomingEvent.date}
                  </div>
                  
                  <div className="flex items-baseline gap-2 bg-white/50 rounded-2xl p-4 border border-indigo-50/50 backdrop-blur-sm">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">
                      {daysToEvent > 0 ? daysToEvent : '今天'}
                    </span>
                    {daysToEvent > 0 && <span className="text-slate-500 font-bold">天後</span>}
                  </div>
                  <p className="text-sm text-slate-500 mt-4 line-clamp-2 leading-relaxed">{upcomingEvent.description}</p>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-center items-center text-center text-slate-400 border-dashed border-2">
                 <CheckCircle2 className="w-12 h-12 text-emerald-300 mb-4" />
                 <p className="font-medium">目前沒有即將到來的事件</p>
              </div>
            )}

            {/* Major Exam Countdown - Redesigned */}
            {nearestExam && (() => {
               const examDate = parseTaiwanDate(nearestExam.dateStr);
               if (!examDate) return null;
               const daysLeft = getDaysRemaining(examDate);
               const isPast = daysLeft < 0;

               return (
                 <div className="relative group overflow-hidden rounded-[2rem] p-1 z-0 h-full">
                    {/* Animated Border/Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${nearestExam.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="absolute inset-[1px] bg-white/80 backdrop-blur-xl rounded-[calc(2rem-1px)] z-10 border border-white/50 group-hover:border-white/80 transition-colors"></div>

                    <div className="relative z-20 p-8 flex flex-col h-full justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-100 shadow-sm ${nearestExam.color}`}>
                                        <Target className="w-3 h-3" />
                                        目標鎖定
                                     </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none">
                                    {nearestExam.title}
                                </h3>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${nearestExam.gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-100/50 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                                {nearestExam.icon === 'tool' ? <LayoutGrid className="w-7 h-7" /> :
                                 nearestExam.icon === 'cap' ? <GraduationCap className="w-7 h-7" /> :
                                 nearestExam.icon === 'book' ? <Trophy className="w-7 h-7" /> :
                                 <Timer className="w-7 h-7" />}
                            </div>
                        </div>

                        {/* The Big Countdown */}
                        <div className="flex flex-col items-center justify-center py-6">
                            {isPast ? (
                                <span className="text-4xl font-black text-slate-300">已結束</span>
                            ) : (
                                <div className="flex items-baseline gap-2">
                                     <span className={`text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${nearestExam.gradient} drop-shadow-sm`}>
                                        {daysLeft}
                                     </span>
                                     <span className="text-xl font-bold text-slate-400 uppercase tracking-widest">Days</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm font-medium text-slate-500 bg-white/60 rounded-xl p-3 border border-slate-100/50 shadow-sm backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span>考試日期：<span className="font-bold text-slate-700">{nearestExam.dateStr}</span></span>
                            </div>
                            {!isPast && (
                                <div className="hidden sm:flex items-center gap-1 text-xs text-indigo-500 font-bold px-2 py-0.5 bg-indigo-50 rounded-md">
                                    <Clock className="w-3 h-3" />
                                    倒數中
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
               );
            })()}
          </div>
        </section>

        {/* Content Container */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Admission Paths */}
          <div className="lg:col-span-7 space-y-10">
            <div id="paths" className="scroll-mt-32 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm border border-slate-100">
                    <Info className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">入學管道總覽</h2>
               </div>
               
               {/* Comparison Button */}
               <button 
                 onClick={() => setIsCompareModalOpen(true)}
                 className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl font-bold text-sm shadow-sm border border-slate-200 hover:border-indigo-200 transition-all active:scale-95"
               >
                 <ArrowRightLeft className="w-4 h-4" />
                 <span className="hidden sm:inline">超級比一比</span>
               </button>
            </div>

            <div className="space-y-6">
              {activePaths.map((path) => (
                <div 
                  key={path.id} 
                  onClick={() => handleOpenPathDetail(path)}
                  className="glass-card rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-indigo-200/50 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${
                     path.id === 'special' ? 'bg-purple-500' : 
                     path.id === 'star' || path.id === 'tech_star' ? 'bg-amber-500' :
                     path.id === 'placement' || path.id === 'registration' ? 'bg-rose-500' :
                     'bg-indigo-500'
                  }`} />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md text-indigo-600">
                        {path.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{path.title}</h3>
                        {path.percentage && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            名額 {path.percentage}
                          </span>
                        )}
                      </div>
                    </div>
                    {path.link && (
                      <a 
                        href={path.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm hover:shadow border border-slate-200 hover:border-indigo-100"
                      >
                        官方網站
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
                    {path.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/60 shadow-inner">
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        重點摘要
                      </h4>
                      <ul className="space-y-3">
                        {path.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0"></span>
                            <span className="flex-1 font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center bg-gradient-to-br from-indigo-50/80 to-violet-50/80 rounded-2xl p-6 border border-indigo-100">
                       <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                           <LayoutGrid className="w-4 h-4" />
                           適合對象
                       </h4>
                       <p className="text-slate-700 font-medium leading-relaxed">
                         {path.suitability}
                       </p>
                    </div>
                  </div>

                  {/* Hover Hint */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     <span className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full shadow-sm">
                        <MousePointerClick className="w-4 h-4" />
                        點擊查看完整分析
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div id="timeline" className="scroll-mt-32 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-amber-500 rounded-2xl shadow-sm border border-slate-100">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">重要日程</h2>
                </div>
                
                {/* Print/Customize Button */}
                <button 
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-xl font-bold text-sm shadow-sm border border-slate-200 hover:border-amber-200 transition-all active:scale-95"
                  title="列印客製化日程表"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">列印日程</span>
                </button>
              </div>

              <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white/60 max-h-[85vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-6 relative z-10 px-2">
                  {activeDates.map((item, index) => {
                    const status = getEventStatus(item.date);
                    const isPast = status === 'past';
                    const isSoon = status === 'soon';
                    const { month, day } = getDateParts(item.date);
                    
                    return (
                      <div key={index} className={`relative flex gap-4 group ${isPast ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}>
                        
                        {/* Date Column */}
                        <div className="flex flex-col items-center min-w-[3.5rem] sm:min-w-[4rem] pt-1">
                           <div className={`text-xs sm:text-sm font-black tracking-wider ${item.isHighlight ? 'text-indigo-600' : 'text-slate-400'}`}>
                             {month}
                           </div>
                           <div className={`text-xl sm:text-2xl font-black leading-none mb-1 ${item.isHighlight ? 'text-indigo-600' : 'text-slate-700'}`}>
                             {day}
                           </div>
                           {/* Connector Line */}
                           <div className={`flex-1 w-0.5 my-2 rounded-full ${index === activeDates.length - 1 ? 'bg-transparent' : 'bg-slate-200'}`}></div>
                        </div>

                        {/* Content Card */}
                        <div className={`flex-1 p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden mb-2
                            ${item.isHighlight 
                                ? 'bg-gradient-to-br from-white to-amber-50 border-amber-200 shadow-lg shadow-amber-100/50 hover:shadow-xl hover:scale-[1.02]' 
                                : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 hover:translate-x-1'
                            }
                        `}>
                            {item.isHighlight && (
                                <div className="absolute top-0 right-0 p-2">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                </div>
                            )}
                            
                            {/* Original Date String (for ranges) */}
                             <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {item.date}
                             </div>

                            <h3 className={`font-bold text-lg mb-2 ${item.isHighlight ? 'text-slate-800' : 'text-slate-700'}`}>
                                {item.title}
                            </h3>
                            
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                {item.description}
                            </p>

                            {isSoon && (
                                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold animate-pulse">
                                    <Clock className="w-3 h-3" />
                                    即將到來
                                </div>
                            )}
                        </div>
                      </div>
                    )
                  })}
                 </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12 text-center relative z-10">
         <div className="flex flex-col items-center gap-6">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 bg-white/40 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
               <span className="flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4" />
                  如資料有誤歡迎糾正
               </span>
               <span className="hidden sm:inline text-slate-300">|</span>
               <span className="flex items-center gap-2">
                  聯絡信箱：
                  <a href="mailto:tyctw.analyze@gmail.com" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
                    tyctw.analyze@gmail.com
                  </a>
               </span>
            </div>
            
            <p className="text-slate-400 text-xs font-medium">
               版權所有 © {new Date().getFullYear()} 升大學管道。保留所有權利。
            </p>
         </div>
      </footer>
      
      {/* Toast Notification for Copy Feedback */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/90 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-500 flex items-center gap-3 border border-slate-700/50 ${showCopyFeedback ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
         <div className="bg-emerald-500 rounded-full p-1">
            <Check className="w-3 h-3 text-white" />
         </div>
         <span className="text-sm font-bold tracking-wide">連結已複製到剪貼簿</span>
      </div>
    </div>
  );
}