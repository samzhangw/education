import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CATEGORIES, ADMISSION_PATHS, IMPORTANT_DATES, LOGGING_API_URL, PATH_KEYWORDS, PREPARATION_TIPS } from './constants';
import { StudentCategory, ImportantDate, AdmissionPath, PreparationTip } from './types';
import { GraduationCap, Calendar, Info, ArrowRight, CheckCircle2, ExternalLink, Timer, AlertCircle, Clock, Menu, X, LayoutGrid, Mail, Share2, Check, Copy, ChevronRight, Sparkles, ChevronDown, User, ArrowRightLeft, Star, CalendarDays, Printer, MousePointerClick, Target, Trophy, ChevronRightCircle, Zap, Filter, Search, BookOpen, FileText, Sun, Moon, Type } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import ComparisonModal from './ComparisonModal';
import PrintScheduleModal from './PrintScheduleModal';
import PathDetailView from './PathDetailView';
import PortfolioGuide from './PortfolioGuide';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import Disclaimer from './Disclaimer';

import VisualMap from './VisualMap';
import PathCard from './PathCard';

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
    if (!date) return { month: '??', day: '??', year: '??' };
    return {
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        day: date.getDate().toString().padStart(2, '0'),
        year: date.getFullYear().toString()
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
  ],
  freshman: [
    { title: '高一第一次段考', dateStr: '114/10/15', color: 'text-amber-600', gradient: 'from-amber-400 to-orange-500', icon: 'book' },
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
  const [selectedTip, setSelectedTip] = useState<PreparationTip | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ImportantDate | null>(null);
  const [currentView, setCurrentView] = useState<'paths' | 'timeline' | 'tips' | 'portfolio' | 'about' | 'privacy' | 'disclaimer'>('paths');
  const [timelineViewMode, setTimelineViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  
  const [articleFontSize, setArticleFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [articleTheme, setArticleTheme] = useState<'light' | 'dark'>('light');

  const [timelineFilters, setTimelineFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipsSearchTerm, setTipsSearchTerm] = useState('');

  const activePaths = ADMISSION_PATHS[activeCategory];
  
  const activeDates = IMPORTANT_DATES
    .filter((d) => d.category.includes(activeCategory))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Log initial page load
  useEffect(() => {
    sendUserLog('page_view', 'home_loaded');
  }, []);

  // Reset filters when category changes
  useEffect(() => {
    setTimelineFilters(activePaths.map(p => p.id));
    setSearchTerm('');
  }, [activeCategory, activePaths]);

  useEffect(() => {
    setSelectedTip(null);
  }, [currentView]);

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

  const toggleTimelineFilter = (id: string) => {
    setTimelineFilters(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };

  const handleSearchBrochure = (e: React.MouseEvent, path: AdmissionPath) => {
    e.stopPropagation();
    const query = `115學年度 ${path.title} 簡章`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    sendUserLog('search_brochure', path.id, path.title);
  };

  // Filter Logic based on Keywords and Search Term
  const filteredDates = activeDates.filter(date => {
    if (timelineFilters.length === 0) return false;
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      if (!date.title.toLowerCase().includes(term) && !date.description.toLowerCase().includes(term)) {
        return false;
      }
    }

    // Check if date matches keywords of ANY selected filter
    return timelineFilters.some(pathId => {
      const keywords = PATH_KEYWORDS[pathId] || [];
      return keywords.some(k => 
        date.title.includes(k) || date.description.includes(k)
      );
    });
  });

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

  const seoMetadata = React.useMemo(() => {
    let title = '115學年度升大學全攻略 | 學測、統測、分科測驗重要日程與簡章懶人包';
    let description = '完整收錄115學年度高中升大學、高職升科大、五專插大詳細入學管道。提供學測倒數、統測日期、分科測驗簡章、繁星推薦、個人申請、特殊選才及落點分析資訊。';
    
    if (currentView === 'paths' && selectedPathDetail) {
      title = `${selectedPathDetail.title} | 升大學管道`;
      description = selectedPathDetail.description;
    } else if (currentView === 'tips' && selectedTip) {
      title = `${selectedTip.title} | 備考攻略 | 升大學管道`;
      description = selectedTip.summary;
    } else if (currentView === 'timeline') {
      title = '115學年度重要日程 | 學測、統測報名與放榜時間';
    } else if (currentView === 'portfolio') {
      title = '學習歷程檔案完全指南 | 升大學管道';
    } else if (currentView === 'about') {
      title = '關於我們 | 升大學管道';
    }
    
    return { title, description };
  }, [currentView, selectedPathDetail, selectedTip]);

  return (
    <div className="min-h-screen font-sans pb-24 relative overflow-hidden mesh-bg text-slate-800">
      <Helmet>
        <title>{seoMetadata.title}</title>
        <meta name="description" content={seoMetadata.description} />
        <meta property="og:title" content={seoMetadata.title} />
        <meta property="og:description" content={seoMetadata.description} />
        <meta name="twitter:title" content={seoMetadata.title} />
        <meta name="twitter:description" content={seoMetadata.description} />
      </Helmet>
      
      {/* Delicate background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Floating Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl bg-white/80 backdrop-blur-2xl px-5 py-3.5 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center bg-slate-900 p-2.5 rounded-xl text-white shadow-sm shadow-slate-200">
                <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              升大學管道
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Navigation View Switcher */}
            <div className="hidden md:flex bg-slate-100/70 p-1 rounded-xl">
              <button 
                onClick={() => { setCurrentView('paths'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${currentView === 'paths' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                升學管道
              </button>
              <button 
                onClick={() => { setCurrentView('timeline'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${currentView === 'timeline' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                重要日程
              </button>
              <button 
                onClick={() => { setCurrentView('tips'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${currentView === 'tips' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                備考攻略
              </button>
              <button 
                onClick={() => { setCurrentView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${currentView === 'portfolio' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                學習歷程
              </button>
            </div>

            {/* Desktop Category Switcher */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all text-sm font-bold shadow-sm"
              >
                <span className={`w-2 h-2 rounded-full ${
                  activeCategory === 'high_school' ? 'bg-indigo-500' : 
                  activeCategory === 'vocational' ? 'bg-blue-500' : 
                  activeCategory === 'freshman' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></span>
                {CATEGORIES.find(c => c.id === activeCategory)?.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCategoryMenuOpen(false)}></div>
                  <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
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

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 active:scale-95"
                title="分享頁面"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 active:scale-95"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Drawer */}
      <div className={`fixed inset-0 z-[90] ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div className={`relative z-10 ml-auto h-full w-full max-w-xs bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
              
              {/* Mobile View Switcher */}
              <div className="mb-8 md:hidden">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Target className="w-3 h-3" />
                   頁面切換
                </h4>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1.5 rounded-xl">
                  <button 
                    onClick={() => { setCurrentView('paths'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'paths' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  >
                    升學管道
                  </button>
                  <button 
                    onClick={() => { setCurrentView('timeline'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'timeline' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  >
                    重要日程
                  </button>
                  <button 
                    onClick={() => { setCurrentView('tips'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'tips' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  >
                    備考攻略
                  </button>
                  <button 
                    onClick={() => { setCurrentView('portfolio'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'portfolio' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  >
                    學習歷程
                  </button>
                </div>
              </div>

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
              
              {/* Removed duplicate fast navigation links since we have a view switcher */}
           </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200" onClick={() => setIsShareModalOpen(false)} />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
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
                          className="w-full bg-transparent text-base sm:text-sm text-slate-600 outline-none truncate font-medium"
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

      {currentView === 'paths' && (
        <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 lg:space-y-24 relative z-10 min-h-[70vh]">
          {selectedPathDetail ? (
             <PathDetailView path={selectedPathDetail} onClose={() => setSelectedPathDetail(null)} />
          ) : (
            <>
              {/* Redesigned Minimalist Hero Section */}
              <section className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] group isolate">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-indigo-50/50 to-transparent"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center p-8 sm:p-14 lg:p-20">
            
            {/* Left Content */}
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                 <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                 </span>
                 <span className="text-slate-700 text-sm font-bold tracking-wide">115 / 116 學年度資訊已更新</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15]">
                 探索屬於你的
                 <br />
                 <span className="text-indigo-600">最佳升學路徑</span>
              </h1>

              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                我們為你整理了 115 學年度最完整的升學策略與關鍵時程，助你從容應對學測、統測與分科測驗，不錯過任何重要時刻。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a 
                  href="#dashboard" 
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  查看倒數
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a 
                   href="#paths"
                   className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center"
                >
                   了解管道
                </a>
              </div>
            </div>

            {/* Right Interactive Widget */}
            <div className="relative lg:pl-10">
               <div className="glass-panel rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                        <User className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-800">請選擇你的目前身分</h3>
                  </div>

                  <div className="space-y-4">
                     {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`w-full group relative flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                            activeCategory === cat.id
                              ? 'bg-slate-900 border-slate-900 shadow-md scale-[1.02]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                           <div className="flex items-center gap-4 relative z-10">
                              <div className={`w-1.5 h-12 rounded-full transition-colors ${
                                 activeCategory === cat.id ? 'bg-indigo-400' : 'bg-slate-200'
                              }`}></div>
                              <div className="text-left">
                                 <div className={`font-bold text-lg mb-0.5 ${
                                    activeCategory === cat.id ? 'text-white' : 'text-slate-800'
                                 }`}>
                                    {cat.label}
                                 </div>
                                 <div className={`text-sm ${
                                    activeCategory === cat.id ? 'text-slate-400' : 'text-slate-500'
                                 }`}>
                                    {cat.description}
                                 </div>
                              </div>
                           </div>
                           
                           {activeCategory === cat.id && (
                              <div className="relative z-10 bg-white/10 p-2.5 rounded-full text-white">
                                 <Check className="w-5 h-5" strokeWidth={3} />
                              </div>
                           )}
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
            <div className="p-3 bg-white text-slate-800 rounded-2xl shadow-sm border border-slate-200">
              <Timer className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">備考儀表板</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Upcoming Event Card */}
            {upcomingEvent ? (
              <div className="bg-white rounded-[2rem] p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                
                <div className="flex items-center gap-2.5 text-slate-600 font-bold mb-6 bg-slate-50 w-fit px-3 py-1.5 rounded-full text-xs border border-slate-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                  </span>
                  下一個重要日程
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{upcomingEvent.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-8">
                    <Calendar className="w-4 h-4" />
                    {upcomingEvent.date}
                  </div>
                  
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">
                      {daysToEvent > 0 ? daysToEvent : '今天'}
                    </span>
                    {daysToEvent > 0 && <span className="text-slate-500 font-bold text-lg">天後</span>}
                  </div>
                  <p className="text-sm text-slate-500 mt-6 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{upcomingEvent.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-center items-center text-center text-slate-400 border border-slate-200 shadow-sm">
                 <CheckCircle2 className="w-12 h-12 text-slate-300 mb-4" />
                 <p className="font-medium text-lg">目前沒有即將到來的事件</p>
              </div>
            )}

            {/* Major Exam Countdown - Redesigned */}
            {nearestExam && (() => {
               const examDate = parseTaiwanDate(nearestExam.dateStr);
               if (!examDate) return null;
               const daysLeft = getDaysRemaining(examDate);
               const isPast = daysLeft < 0;

               return (
                 <div className="relative group overflow-hidden rounded-[2rem] p-1 z-0 h-full bg-slate-900 shadow-xl">
                    <div className="relative z-20 p-8 flex flex-col h-full justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                                        <Target className="w-3 h-3" />
                                        目標鎖定
                                     </span>
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none">
                                    {nearestExam.title}
                                </h3>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 transform group-hover:rotate-12 transition-all duration-500">
                                {nearestExam.icon === 'tool' ? <LayoutGrid className="w-7 h-7" /> :
                                 nearestExam.icon === 'cap' ? <GraduationCap className="w-7 h-7" /> :
                                 nearestExam.icon === 'book' ? <Trophy className="w-7 h-7" /> :
                                 <Timer className="w-7 h-7" />}
                            </div>
                        </div>

                        {/* The Big Countdown */}
                        <div className="flex flex-col items-center justify-center py-8">
                            {isPast ? (
                                <span className="text-4xl font-black text-slate-500">已結束</span>
                            ) : (
                                <div className="flex items-baseline gap-3">
                                     <span className="text-8xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-sm">
                                        {daysLeft}
                                     </span>
                                     <span className="text-xl font-bold text-slate-400 uppercase tracking-widest">Days</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm font-medium text-slate-300 bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span>考試日期：<span className="font-bold text-white">{nearestExam.dateStr}</span></span>
                            </div>
                            {!isPast && (
                                <div className="hidden sm:flex items-center gap-1 text-xs text-white font-bold px-2.5 py-1 bg-white/20 rounded-md">
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
        <div className="space-y-10 pb-16">
          
          {(activeCategory === 'high_school' || activeCategory === 'vocational') && (
            <div className="mb-10">
               <VisualMap activeCategory={activeCategory} onPathClick={handleOpenPathDetail} />
            </div>
          )}

          {/* Left Column: Admission Paths */}
          <div className="space-y-8">
            <div id="paths" className="scroll-mt-32 flex items-end justify-between mb-2">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm border border-indigo-100">
                       <Info className="w-5 h-5" />
                     </div>
                     <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">入學管道總覽</h2>
                  </div>
                  <p className="text-slate-500 font-medium hidden sm:block">點擊各管道卡片，查看完整分析與流程</p>
               </div>
               
               {/* Comparison Button */}
               <button 
                 onClick={() => setIsCompareModalOpen(true)}
                 className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group"
               >
                 <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                 <span>超級比一比</span>
               </button>
            </div>

            {/* Mobile Comparison Button */}
            <button 
               onClick={() => setIsCompareModalOpen(true)}
               className="sm:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
            >
               <ArrowRightLeft className="w-4 h-4" />
               <span>管道超級比一比</span>
            </button>

            <div className="grid lg:grid-cols-2 gap-6">
              {activePaths.map((path, index) => (
                 <PathCard 
                   key={path.id} 
                   path={path} 
                   index={index} 
                   onOpenDetail={handleOpenPathDetail} 
                   onSearchBrochure={handleSearchBrochure} 
                 />
              ))}
            </div>
          </div>
        </div>
        </>
      )}
      </main>
      )}

      {currentView === 'timeline' && (
      <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 relative z-10 min-h-[70vh]">
          {/* Timeline Section */}
          <div className="w-full">
            <div className="space-y-4">
              <div id="timeline" className="scroll-mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-amber-500 rounded-2xl shadow-sm border border-slate-100">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">重要日程</h2>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex bg-slate-100/80 p-1 rounded-xl">
                    <button 
                      onClick={() => setTimelineViewMode('list')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timelineViewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      列表
                    </button>
                    <button 
                      onClick={() => setTimelineViewMode('calendar')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timelineViewMode === 'calendar' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      日曆
                    </button>
                  </div>
                  
                  {/* Print Button Redesigned */}
                  <button 
                    onClick={() => setIsPrintModalOpen(true)}
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm shadow-sm border border-slate-200 transition-all hover:shadow-md active:scale-95 group"
                    title="列印客製化日程表"
                  >
                    <Printer className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    <span className="hidden sm:inline">列印日程</span>
                  </button>
                </div>
              </div>

              {/* Timeline Filter and Search */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold px-1 shrink-0 uppercase tracking-widest">
                     <Filter className="w-4 h-4" />
                     篩選管道
                  </div>
                  <div className="w-px h-6 bg-slate-200 shrink-0 hidden sm:block mx-1"></div>
                  <div className="flex flex-wrap items-center gap-2 flex-1">
                    {activePaths.map((path) => {
                       const isSelected = timelineFilters.includes(path.id);
                       return (
                          <button
                             key={path.id}
                             onClick={() => toggleTimelineFilter(path.id)}
                             className={`
                                flex-1 flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border min-w-[130px]
                                ${isSelected 
                                   ? 'bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-900/10' 
                                   : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800 hover:border-slate-300'
                                }
                             `}
                          >
                             <span className={`shrink-0 flex items-center justify-center w-5 h-5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {typeof path.icon === 'string' ? path.icon : (
                                  React.cloneElement(path.icon as React.ReactElement, {
                                    className: `w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`
                                  })
                                )}
                             </span>
                             <span className="whitespace-nowrap">{path.title}</span>
                             {isSelected && <Check className="w-3.5 h-3.5 ml-0.5 text-emerald-400" />}
                          </button>
                       )
                    })}
                  </div>
                </div>
                
                <div className="w-full h-px bg-slate-100"></div>
                
                <div className="flex items-center gap-2 px-2 pb-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜尋重要日程... (例如: 報名、簡章、放榜)"
                    className="flex-1 bg-transparent border-none outline-none text-base sm:text-sm text-slate-700 placeholder-slate-400 focus:ring-0 w-full"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                      title="清除搜尋"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {timelineViewMode === 'list' ? (
                 <div className="max-h-[85vh] overflow-y-auto custom-scrollbar pr-1 sm:pr-4">
                    <div className="space-y-0 relative z-10">
                     {filteredDates.length > 0 ? (
                       filteredDates.map((item, index) => {
                      const status = getEventStatus(item.date);
                      const isPast = status === 'past';
                      const isSoon = status === 'soon';
                      const { month, day } = getDateParts(item.date);
                      
                      return (
                        <div key={index} className={`relative flex gap-4 sm:gap-6 pb-8 last:pb-0 group ${isPast ? 'opacity-60 grayscale' : 'opacity-100'}`}>
                          
                          {/* Timeline Line & Dot */}
                          <div className="relative flex flex-col items-center shrink-0 w-6 sm:w-8 pt-6">
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[3px] border-white shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-125
                              ${item.isHighlight ? 'bg-indigo-600 ring-2 ring-indigo-200' : isPast ? 'bg-slate-300' : 'bg-emerald-500'}
                            `}>
                               {item.isHighlight && <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-40"></div>}
                            </div>
                            {index !== filteredDates.length - 1 && (
                               <div className="absolute top-8 bottom-[-2rem] w-px bg-slate-200 group-hover:bg-indigo-200 transition-colors"></div>
                            )}
                          </div>

                          {/* Timeline Card */}
                          <div className="flex-1">
                            <div className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1 ${
                               item.isHighlight 
                                 ? 'bg-slate-900 shadow-xl shadow-slate-900/10 text-white border border-slate-800' 
                                 : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                            }`}>
                               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                  <div className="space-y-3 flex-1">
                                     <div className="flex flex-wrap items-center gap-3">
                                        <div className={`flex flex-col justify-center items-center px-3 py-1 rounded-xl border shadow-sm ${item.isHighlight ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                           <span className={`text-[10px] font-bold uppercase tracking-widest ${item.isHighlight ? 'text-slate-400' : 'text-slate-500'}`}>{month}</span>
                                           <span className={`text-lg sm:text-xl font-black leading-none mt-0.5 ${item.isHighlight ? 'text-white' : 'text-slate-800'}`}>{day}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${item.isHighlight ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                                           <CalendarDays className="w-3.5 h-3.5" />
                                           {item.date}
                                        </div>
                                     </div>
                                     
                                     <div>
                                        <h3 className={`font-black text-lg sm:text-xl mb-1.5 tracking-tight ${item.isHighlight ? 'text-white' : 'text-slate-900'}`}>
                                          {item.title}
                                        </h3>
                                        <p className={`text-xs sm:text-sm leading-relaxed font-medium ${item.isHighlight ? 'text-slate-300' : 'text-slate-600'}`}>
                                          {item.description}
                                        </p>
                                     </div>
                                  </div>

                                  {isSoon && (
                                     <div className="shrink-0">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm ${item.isHighlight ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="animate-pulse">即將到來</span>
                                        </div>
                                     </div>
                                  )}
                                  
                                  {item.isHighlight && !isSoon && (
                                      <div className="shrink-0 absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 opacity-50">
                                          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                                      </div>
                                  )}
                               </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 bg-slate-50 rounded-full mb-4">
                           <Filter className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">沒有符合篩選條件的日程</p>
                        <button 
                           onClick={() => {
                             setTimelineFilters(activePaths.map(p => p.id));
                             setSearchTerm('');
                           }}
                           className="mt-2 text-indigo-600 text-sm font-bold hover:underline"
                        >
                           顯示所有日程
                        </button>
                    </div>
                     )}
                    </div>
                 </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-4 sm:p-8 shadow-sm border border-slate-100 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                      {calendarMonth.getFullYear()}年 {calendarMonth.getMonth() + 1}月
                    </h3>
                    <div className="flex gap-2">
                       <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">
                          <ChevronDown className="w-5 h-5 rotate-90" />
                       </button>
                       <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">
                          <ChevronDown className="w-5 h-5 -rotate-90" />
                       </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                    {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                       <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {Array.from({ length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() }, (_, i) => (
                       <div key={`empty-${i}`} className="min-h-[80px] sm:min-h-[120px] p-2 bg-slate-50/30 rounded-xl border border-transparent"></div>
                    ))}
                    
                    {Array.from({ length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                       const day = i + 1;
                       const currentCellDateStr = `${calendarMonth.getFullYear() - 1911}/${String(calendarMonth.getMonth() + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
                       const dayEvents = filteredDates.filter(d => {
                          const parts = getDateParts(d.date);
                          return parts.month === String(calendarMonth.getMonth() + 1).padStart(2, '0') && 
                                 parts.day === String(day).padStart(2, '0') &&
                                 parts.year === String(calendarMonth.getFullYear());
                       });
                       
                       const isToday = new Date().getDate() === day && new Date().getMonth() === calendarMonth.getMonth() && new Date().getFullYear() === calendarMonth.getFullYear();

                       return (
                          <div key={day} className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 flex flex-col rounded-xl border transition-all ${isToday ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm'}`}>
                             <div className={`text-xs sm:text-sm font-bold w-6 h-6 sm:w-8 sm:h-8 flex shrink-0 items-center justify-center rounded-full mb-1 sm:mb-2 ${isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700'}`}>
                               {day}
                             </div>
                             <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1">
                                {dayEvents.map((evt, idx) => (
                                   <div 
                                      key={idx} 
                                      onClick={() => setSelectedEvent(evt)}
                                      className={`text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-1 rounded-md leading-tight line-clamp-2 text-left whitespace-normal cursor-pointer transition-all ${evt.isHighlight ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-sm'}`} 
                                      title={evt.title}
                                   >
                                     {evt.title}
                                   </div>
                                ))}
                             </div>
                          </div>
                       );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
      </main>
      )}

      {currentView === 'tips' && (
        <main className="pt-28 sm:pt-32 min-h-[70vh]">
          {selectedTip ? (
             <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-row items-center justify-between gap-4 mb-8">
                  <button 
                    onClick={() => setSelectedTip(null)}
                    className="inline-flex items-center w-fit gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group whitespace-nowrap"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">返回攻略列表</span>
                    <span className="sm:hidden">返回</span>
                  </button>

                  <div className="flex items-center gap-1 sm:gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
                    <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-1">
                      <button onClick={() => setArticleFontSize('sm')} className={`p-1.5 rounded-lg font-bold transition-colors ${articleFontSize === 'sm' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`} title="小字體">
                        <Type className="w-3 h-3" />
                      </button>
                      <button onClick={() => setArticleFontSize('base')} className={`p-1.5 rounded-lg font-bold transition-colors ${articleFontSize === 'base' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`} title="中字體">
                        <Type className="w-4 h-4" />
                      </button>
                      <button onClick={() => setArticleFontSize('lg')} className={`p-1.5 rounded-lg font-bold transition-colors ${articleFontSize === 'lg' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`} title="大字體">
                        <Type className="w-5 h-5" />
                      </button>
                    </div>
                    <button onClick={() => setArticleTheme(articleTheme === 'light' ? 'dark' : 'light')} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors" title={articleTheme === 'light' ? '切換深色模式' : '切換淺色模式'}>
                      {articleTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className={`rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-xl border transition-all duration-300 ${articleTheme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-black/20' : 'bg-white shadow-slate-900/5 border-slate-100'}`}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedTip.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${articleTheme === 'dark' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>{tag}</span>
                    ))}
                  </div>
                  
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6 transition-colors ${articleTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {selectedTip.title}
                  </h1>

                  <div className={`flex items-center gap-4 py-6 mb-8 border-y text-sm font-medium transition-colors ${articleTheme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                    <div className="flex items-center gap-3">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${articleTheme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-400'}`}>
                         <User className="w-6 h-6" />
                       </div>
                       <div>
                         <div className={`font-bold transition-colors ${articleTheme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>升大學指南編輯部</div>
                         <div className="text-xs">發布於 備考攻略專欄</div>
                       </div>
                    </div>
                  </div>

                  <div className={`
                    leading-relaxed whitespace-pre-line transition-all duration-300 tracking-wide
                    ${articleFontSize === 'sm' ? 'text-sm' : articleFontSize === 'lg' ? 'text-lg' : 'text-base'}
                    ${articleTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}
                  `}>
                    {selectedTip.content.split('\\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <h3 className={`font-black mt-10 mb-4 flex items-center gap-3 transition-colors ${articleFontSize === 'sm' ? 'text-lg' : articleFontSize === 'lg' ? 'text-2xl' : 'text-xl'} ${articleTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                             <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                             {line.replace(/\*\*/g, '')}
                          </h3>
                        ) : (
                          <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold px-1 rounded transition-colors ${articleTheme === 'dark' ? 'text-white bg-indigo-500/20' : 'text-slate-900 bg-indigo-50/50'}">$1</strong>`)}}></span>
                        )}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-16">
                  <h3 className={`text-xl font-black mb-6 flex items-center gap-2 ${articleTheme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    相關文章推薦
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {PREPARATION_TIPS
                      .filter(t => t.id !== selectedTip.id)
                      .map(t => ({ tip: t, matchCount: t.tags.filter(tag => selectedTip.tags.includes(tag)).length }))
                      .sort((a, b) => b.matchCount - a.matchCount)
                      .slice(0, 3)
                      .map(({tip}) => (
                        <div key={tip.id} className={`rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full cursor-pointer hover:-translate-y-1 ${articleTheme === 'dark' ? 'bg-slate-900 border border-slate-800 hover:border-indigo-500/50' : 'bg-white border border-slate-100 hover:border-indigo-100'}`} onClick={() => { setSelectedTip(tip); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                           <div className="flex flex-wrap gap-1.5 mb-3">
                              {tip.tags.slice(0, 2).map(tag => (
                                 <span key={tag} className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-colors ${articleTheme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700 group-hover:border-indigo-500/30 group-hover:text-indigo-300' : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-600'}`}>{tag}</span>
                              ))}
                           </div>
                           <h4 className={`text-base sm:text-lg font-bold mb-2 transition-colors line-clamp-2 ${articleTheme === 'dark' ? 'text-slate-200 group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>{tip.title}</h4>
                           <div className={`mt-auto text-xs font-bold flex items-center transition-opacity translate-x-[-5px] group-hover:translate-x-0 duration-300 ${articleTheme === 'dark' ? 'text-indigo-400 opacity-80 group-hover:opacity-100' : 'text-indigo-600 opacity-0 group-hover:opacity-100'}`}>
                               繼續閱讀 <ArrowRight className="w-3 h-3 ml-1" />
                           </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
             </article>
          ) : (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-indigo-500 rounded-2xl shadow-sm border border-slate-100">
                     <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">備考攻略專欄</h2>
                </div>
                <div className="relative w-full md:w-96">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                   </div>
                   <input
                      type="text"
                      className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-base sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                      placeholder="搜尋文章標題、標籤或摘要..."
                      value={tipsSearchTerm}
                      onChange={(e) => setTipsSearchTerm(e.target.value)}
                   />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PREPARATION_TIPS.filter(tip => tip.category === 'general' || tip.category === activeCategory)
                    .filter(tip => {
                       if (!tipsSearchTerm) return true;
                       const term = tipsSearchTerm.toLowerCase();
                       return tip.title.toLowerCase().includes(term) || 
                              tip.summary.toLowerCase().includes(term) || 
                              tip.tags.some(tag => tag.toLowerCase().includes(term));
                    })
                    .map(tip => (
                      <div key={tip.id} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 border border-slate-100 hover:border-indigo-100 transition-all duration-300 group flex flex-col h-full cursor-pointer hover:-translate-y-1" onClick={() => { setSelectedTip(tip); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                              {tip.iconName === 'user' ? <User className="w-6 h-6" /> : 
                               tip.iconName === 'file' ? <FileText className="w-6 h-6" /> : 
                               tip.iconName === 'clock' ? <Clock className="w-6 h-6" /> : 
                               <BookOpen className="w-6 h-6" />}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                              {tip.tags.map(tag => (
                                  <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-100 group-hover:border-indigo-50 group-hover:bg-indigo-50/50 transition-colors">{tag}</span>
                              ))}
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">{tip.title}</h3>
                          <p className="text-sm text-slate-500 mb-6 flex-grow line-clamp-3 leading-relaxed">{tip.summary}</p>
                          <div className="flex items-center text-sm font-bold text-indigo-600 mt-auto opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                              閱讀全文 <ArrowRight className="w-4 h-4 ml-1.5" />
                          </div>
                      </div>
                  ))}
              </div>
            </section>
          )}
        </main>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          ></div>
          
          <div className="relative z-10 bg-white w-full max-w-md rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-[0.98] duration-300 ring-1 ring-slate-900/5">
            <div className="relative p-6 sm:p-8 flex flex-col gap-4">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all shadow-sm z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="pr-8">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                       <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-0.5">日程時間</span>
                       <span className="text-sm font-bold text-indigo-700">{selectedEvent.date}</span>
                    </div>
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-snug mb-3">
                   {selectedEvent.title}
                 </h3>
                 <div className="text-slate-600 leading-relaxed text-sm font-medium">
                   {selectedEvent.description}
                 </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 flex justify-end">
               <button 
                 onClick={() => setSelectedEvent(null)}
                 className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-slate-700 active:scale-95 transition-all"
               >
                 關閉
               </button>
            </div>
          </div>
        </div>
      )}

      {currentView === 'portfolio' && (
        <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 lg:space-y-24 relative z-10 min-h-[70vh]">
           <PortfolioGuide userCategory={activeCategory} />
        </main>
      )}

      {currentView === 'about' && (
        <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 min-h-[70vh]">
           <AboutUs />
        </main>
      )}

      {currentView === 'privacy' && (
        <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 min-h-[70vh]">
           <PrivacyPolicy />
        </main>
      )}

      {currentView === 'disclaimer' && (
        <main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 min-h-[70vh]">
           <Disclaimer />
        </main>
      )}

      {/* Footer Section */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 text-center relative z-10 border-t border-slate-200">
         <div className="flex flex-col items-center gap-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-600 bg-white px-8 py-4 rounded-[2rem] sm:rounded-full border border-slate-200 shadow-sm">
               <span className="flex items-center gap-2 font-bold">
                  <Mail className="w-4 h-4" />
                  如資料有誤歡迎糾正
               </span>
               <span className="hidden sm:inline text-slate-300">|</span>
               <span className="flex items-center gap-2">
                  聯絡信箱：
                  <a href="mailto:tyctw.analyze@gmail.com" className="font-bold text-slate-900 hover:text-indigo-600 hover:underline transition-all">
                    tyctw.analyze@gmail.com
                  </a>
               </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-bold text-slate-500">
              <button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                關於我們
              </button>
              <button onClick={() => { setCurrentView('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                隱私權政策
              </button>
              <button onClick={() => { setCurrentView('disclaimer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                免責聲明
              </button>
            </div>

            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
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