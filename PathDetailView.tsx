import React from 'react';
import { AdmissionPath } from './types';
import { ExternalLink, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, BookOpen, Target, Search, ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

interface PathDetailViewProps {
  path: AdmissionPath | null;
  onClose: () => void;
}

export default function PathDetailView({ path, onClose }: PathDetailViewProps) {
  if (!path) return null;

  return (
    <div className="relative z-10 bg-white w-full rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header Section */}
        <div className="relative p-6 sm:p-10 lg:p-12 pb-12 sm:pb-16 overflow-hidden border-b border-slate-100 bg-slate-900">
          {/* Abstract Background */}
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-indigo-500/20 blur-[100px] rounded-full mix-blend-screen"></div>
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          </div>
          
          {/* Navigation Bar */}
          <div className="relative z-10 flex items-center justify-between mb-6 sm:mb-10">
            <button 
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm group backdrop-blur-sm active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              返回總覽
            </button>
            <div className="text-white/40 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-right leading-tight">
              Admission<br className="sm:hidden" /> Path Details
            </div>
          </div>
          
          {/* Main Title Area */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 mt-4">
            <div className="p-4 bg-white/10 border border-white/20 rounded-3xl text-white shrink-0 backdrop-blur-md shadow-xl shadow-black/10">
               {React.isValidElement(path.icon) 
                  ? React.cloneElement(path.icon as React.ReactElement<{ className?: string }>, { className: "w-12 h-12" }) 
                  : path.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-sm">
                {path.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                 {path.percentage && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-100 border border-indigo-400/30 backdrop-blur-sm shadow-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse"></div>
                      招生名額約 {path.percentage}
                    </span>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-8 sm:p-12 space-y-12 bg-slate-50/50">
          
          {/* Description & Suitability Split */}
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
               <p className="text-slate-700 text-lg leading-relaxed font-medium">
                 {path.description}
               </p>
            </div>
            <div className="lg:col-span-2">
               <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 relative overflow-hidden group h-full flex flex-col justify-center">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 group-hover:bg-indigo-100 transition-colors"></div>
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Target className="w-4 h-4 text-indigo-500" />
                   適合對象
                 </h3>
                 <p className="text-slate-800 font-bold text-xl leading-relaxed">
                   {path.suitability}
                 </p>
               </div>
            </div>
          </div>

          {/* Section: Timeline Process */}
          <div>
             <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                重點摘要與流程
             </h3>
             <div className="pl-4 sm:pl-6">
                <div className="space-y-0 relative">
                   {/* Main vertical line */}
                   <div className="absolute left-[1.125rem] top-4 bottom-8 w-[2px] bg-slate-200 -z-10"></div>
                   
                   {(() => {
                      let stepCount = 0;
                      return path.details.map((detail, idx) => {
                         const isWarning = detail.includes('⚠️');
                         if (!isWarning) stepCount++;
                         return (
                            <div key={idx} className="relative flex gap-6 pb-10 last:pb-0 group">
                               {/* Step Indicator */}
                               {isWarning ? (
                                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-rose-200 text-rose-500 flex items-center justify-center shrink-0 shadow-sm relative z-10 mt-1">
                                     <AlertTriangle className="w-4 h-4" />
                                  </div>
                               ) : (
                                  <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-white text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm relative z-10 group-hover:scale-110 group-hover:bg-indigo-600 transition-all mt-1">
                                     {stepCount}
                                  </div>
                               )}
                               
                               {/* Content Card */}
                               <div className="flex-1 pt-1.5">
                                  <div className={`px-6 py-5 rounded-2xl border shadow-sm font-medium leading-relaxed transition-all text-base ${
                                     isWarning
                                        ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                                        : 'bg-white border-slate-200/60 text-slate-700 group-hover:border-indigo-100 group-hover:shadow-md'
                                  }`}>
                                     {detail}
                                  </div>
                               </div>
                            </div>
                         );
                      });
                   })()}
                </div>
             </div>
          </div>

          {/* Section: Pros & Cons Grid */}
          <div>
             <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-sm">
                   <LayoutGrid className="w-5 h-5" />
                </div>
                優劣勢分析
             </h3>
             <div className="grid md:grid-cols-2 gap-6">
                {/* Pros Column */}
                <div className="bg-white rounded-[2rem] p-8 border border-emerald-100 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -z-10 group-hover:bg-emerald-100 transition-colors"></div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-100/50 text-emerald-600 rounded-2xl">
                        <ThumbsUp className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-slate-900">優點與機會</h4>
                   </div>
                   <ul className="space-y-4">
                      {path.pros.map((item, idx) => (
                         <li key={idx} className="flex items-start gap-4 text-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Cons Column */}
                <div className="bg-white rounded-[2rem] p-8 border border-rose-100 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-full blur-3xl -z-10 group-hover:bg-rose-100 transition-colors"></div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-rose-100/50 text-rose-600 rounded-2xl">
                        <ThumbsDown className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-slate-900">風險與挑戰</h4>
                   </div>
                   <ul className="space-y-4">
                      {path.cons.map((item, idx) => (
                         <li key={idx} className="flex items-start gap-4 text-slate-700">
                            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 relative z-30">
          <p className="text-sm text-slate-400 font-bold hidden sm:block">
            升大學管道資訊網整理
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <button 
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm active:scale-95 text-sm sm:text-base"
             >
               返回總覽
             </button>
             <button 
                onClick={() => {
                   const query = `115學年度 ${path.title} 簡章`;
                   window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors shadow-sm active:scale-95 text-sm sm:text-base"
             >
               <Search className="w-4 h-4" />
               搜尋簡章
             </button>
             {path.link && (
               <a 
                  href={path.link}
                  target="_blank"
                  rel="noopener noreferrer"
                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-md transition-all active:scale-95 group text-sm sm:text-base"
               >
                 官方網站
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
             )}
          </div>
        </div>
    </div>
  );
}
