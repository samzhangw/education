import React from 'react';
import { AdmissionPath } from './types';
import { X, ExternalLink, ThumbsUp, ThumbsDown, LayoutGrid, CheckCircle2, AlertTriangle, BookOpen, Target } from 'lucide-react';

interface PathDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  path: AdmissionPath | null;
}

export default function PathDetailModal({ isOpen, onClose, path }: PathDetailModalProps) {
  if (!isOpen || !path) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      <div className="relative bg-slate-50 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        
        {/* Header - White background for separation */}
        <div className="relative p-6 sm:p-8 flex flex-col gap-4 bg-white border-b border-slate-100 shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-5 pr-8">
            <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-600 shrink-0 mt-1 shadow-sm">
               {/* Clone icon to increase size for header */}
               {React.isValidElement(path.icon) 
                  ? React.cloneElement(path.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" }) 
                  : path.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">{path.title}</h2>
                 {path.percentage && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                      名額約 {path.percentage}
                    </span>
                 )}
              </div>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                {path.description}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content - Gray background for card contrast */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          
          {/* Section 1: Suitability (Highlighted Card) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 relative overflow-hidden group hover:border-indigo-200 transition-colors">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-500" />
              適合對象
            </h3>
            <p className="text-slate-800 font-bold text-lg leading-relaxed">
              {path.suitability}
            </p>
          </div>

          {/* Section 2: Details / Process (Timeline Style) */}
          <div>
             <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 pl-1">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                重點摘要與流程
             </h3>
             <div className="pl-2">
                <div className="space-y-0">
                   {path.details.map((detail, idx) => (
                      <div key={idx} className="relative flex gap-5 pb-8 last:pb-0 group">
                         {/* Connecting Line */}
                         {idx !== path.details.length - 1 && (
                            <div className="absolute top-8 left-[0.875rem] w-0.5 h-full bg-slate-200 -z-10 group-hover:bg-indigo-100 transition-colors"></div>
                         )}
                         
                         {/* Step Circle */}
                         <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0 shadow-sm relative z-10 group-hover:scale-110 group-hover:border-indigo-300 transition-all">
                            {idx + 1}
                         </div>
                         
                         {/* Content Bubble */}
                         <div className="pt-0.5 flex-1">
                            <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-sm text-slate-700 font-medium leading-relaxed group-hover:border-indigo-100 group-hover:shadow-md transition-all">
                               {detail}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Section 3: Pros & Cons (Split Grid) */}
          <div>
             <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 pl-1">
                <LayoutGrid className="w-5 h-5 text-indigo-500" />
                優劣勢分析
             </h3>
             <div className="grid sm:grid-cols-2 gap-5">
                {/* Pros Card */}
                <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/60 hover:bg-emerald-50 transition-colors">
                   <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      優點與機會
                   </h4>
                   <ul className="space-y-4">
                      {path.pros.map((item, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="leading-relaxed font-medium">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Cons Card */}
                <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100/60 hover:bg-rose-50 transition-colors">
                   <h4 className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ThumbsDown className="w-4 h-4" />
                      風險與挑戰
                   </h4>
                   <ul className="space-y-4">
                      {path.cons.map((item, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                            <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                            <span className="leading-relaxed font-medium">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200/60 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <p className="text-xs text-slate-400 font-medium hidden sm:block">
            升大學管道資訊網整理
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
             <button 
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
             >
               關閉
             </button>
             {path.link && (
               <a 
                 href={path.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
               >
                 前往官方網站
                 <ExternalLink className="w-4 h-4" />
               </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}