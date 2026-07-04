import React from 'react';
import { AdmissionPath } from './types';
import { Search, ExternalLink, CheckCircle2, LayoutGrid, ArrowRight, Target } from 'lucide-react';

interface PathCardProps {
  path: AdmissionPath;
  index: number;
  onOpenDetail: (path: AdmissionPath) => void;
  onSearchBrochure: (e: React.MouseEvent, path: AdmissionPath) => void;
}

export default function PathCard({ path, index, onOpenDetail, onSearchBrochure }: PathCardProps) {
  const colorConfig = 
    index % 4 === 0 ? { bg: 'bg-indigo-500', from: 'from-indigo-500', to: 'to-blue-500', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-100', hover: 'hover:border-indigo-300', shadow: 'shadow-indigo-500/20' } :
    index % 4 === 1 ? { bg: 'bg-amber-500', from: 'from-amber-400', to: 'to-orange-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-100', hover: 'hover:border-amber-300', shadow: 'shadow-amber-500/20' } :
    index % 4 === 2 ? { bg: 'bg-emerald-500', from: 'from-emerald-400', to: 'to-teal-500', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-100', hover: 'hover:border-emerald-300', shadow: 'shadow-emerald-500/20' } :
    { bg: 'bg-rose-500', from: 'from-rose-400', to: 'to-pink-500', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-100', hover: 'hover:border-rose-300', shadow: 'shadow-rose-500/20' };

  return (
    <div 
      onClick={() => onOpenDetail(path)}
      className="bg-white rounded-[2rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 transition-all duration-300 group cursor-pointer relative overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col h-full"
    >
      {/* Top Accent Gradient */}
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${colorConfig.from} ${colorConfig.to}`} />
      
      {/* Subtle Background Blob on Hover */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${colorConfig.light} rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-1/2 -translate-y-1/2`}></div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border group-hover:scale-110 transition-transform duration-500 ${colorConfig.light} ${colorConfig.text} ${colorConfig.border}`}>
                {path.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-slate-800 transition-colors mb-1">{path.title}</h3>
                {path.percentage && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${colorConfig.light} ${colorConfig.text}`}>
                    名額約 {path.percentage}
                  </span>
                )}
              </div>
            </div>
            
            <div className={`w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all text-slate-400`}>
               <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Description */}
          <p className="text-slate-600 leading-relaxed font-medium mb-8 flex-1 text-base">
            {path.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5 border-t border-slate-100">
               <div className="flex-1 min-w-[200px]">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                       <Target className="w-3.5 h-3.5" />
                       適合對象
                   </h4>
                   <p className="text-slate-800 font-bold leading-snug line-clamp-2">
                     {path.suitability}
                   </p>
               </div>
               <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => onSearchBrochure(e, path)}
                      className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-500 shadow-sm"
                      title="搜尋簡章"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                    {path.link && (
                      <a 
                         href={path.link}
                         target="_blank"
                         rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-500 shadow-sm"
                        title="官方網站"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
               </div>
          </div>
      </div>
    </div>
  );
}
