import React, { useState, useEffect } from 'react';
import { AdmissionPath } from './types';
import { X, Check, ArrowRightLeft, AlertCircle, MousePointerClick, ThumbsUp, ThumbsDown, Info, LayoutGrid, Target, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  paths: AdmissionPath[];
  categoryLabel: string;
}

const MAX_SELECTION = 4;

export default function ComparisonModal({ isOpen, onClose, paths, categoryLabel }: ComparisonModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Reset selection when modal opens or category changes
  useEffect(() => {
    if (isOpen) {
      // Default select the first 2 paths if none selected, or keep previous selection if valid
      const validIds = selectedIds.filter(id => paths.find(p => p.id === id));
      if (validIds.length === 0) {
        setSelectedIds(paths.slice(0, 2).map(p => p.id));
      } else {
        setSelectedIds(validIds);
      }
    }
  }, [isOpen, paths]);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) { // Prevent unselecting the last one
        setSelectedIds(selectedIds.filter(s => s !== id));
      }
    } else {
      if (selectedIds.length < MAX_SELECTION) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  if (!isOpen) return null;

  const selectedPaths = paths.filter(p => selectedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative z-10 bg-slate-50 w-full max-w-[95vw] xl:max-w-[1400px] h-[95vh] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Header Section */}
        <div className="relative p-6 sm:p-8 border-b border-slate-200/60 bg-white shrink-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
          
          <div className="absolute top-[-50%] right-[-10%] w-[30%] h-[200%] bg-indigo-50/50 blur-3xl rounded-full -z-10 mix-blend-multiply"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                  <ArrowRightLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  升學管道超級比一比
                </h2>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-medium ml-1 text-sm sm:text-base">
                 <span>目前身分：</span>
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                   {categoryLabel}
                 </span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Path Selector */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 shrink-0">
              <MousePointerClick className="w-4 h-4" />
              選擇比較項目 ({selectedIds.length}/{MAX_SELECTION})
            </span>
            <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
              {paths.map(path => {
                const isSelected = selectedIds.includes(path.id);
                const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTION;
                
                return (
                  <button
                    key={path.id}
                    onClick={() => !isDisabled && toggleSelection(path.id)}
                    disabled={isDisabled}
                    className={`
                      px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all border relative overflow-hidden group
                      ${isSelected 
                         ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                         : isDisabled 
                          ? 'bg-white text-slate-300 border-slate-100 cursor-not-allowed opacity-60' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                         <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                    )}
                    {!isSelected && !isDisabled && (
                      <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
                         <Plus className="w-3 h-3" />
                      </div>
                    )}
                    {path.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Board */}
        <div className="flex-1 overflow-auto custom-scrollbar relative p-4 sm:p-6 lg:p-8">
          
          <div className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max pb-8 h-full">
             
             {/* Sticky Row Headers (Optional for layout, but we'll use a card-based column approach) */}
             
             {/* Columns */}
             {selectedPaths.map((path, index) => {
               
               const colorClass = 
                 index === 0 ? 'indigo' : 
                 index === 1 ? 'emerald' : 
                 index === 2 ? 'amber' : 'rose';

               const bgHeaderMap = {
                 indigo: 'bg-indigo-50 border-indigo-100',
                 emerald: 'bg-emerald-50 border-emerald-100',
                 amber: 'bg-amber-50 border-amber-100',
                 rose: 'bg-rose-50 border-rose-100'
               };
               
               const textTitleMap = {
                 indigo: 'text-indigo-900',
                 emerald: 'text-emerald-900',
                 amber: 'text-amber-900',
                 rose: 'text-rose-900'
               };

               const iconBgMap = {
                 indigo: 'bg-indigo-100 text-indigo-600',
                 emerald: 'bg-emerald-100 text-emerald-600',
                 amber: 'bg-amber-100 text-amber-600',
                 rose: 'bg-rose-100 text-rose-600'
               };

               return (
                 <div key={path.id} className="flex flex-col w-[320px] sm:w-[360px] lg:w-[400px] shrink-0 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex-1 h-fit">
                    
                    {/* Column Header */}
                    <div className={`p-6 sm:p-8 border-b relative overflow-hidden ${bgHeaderMap[colorClass]}`}>
                       <div className="flex items-start justify-between gap-4 relative z-10">
                          <div className={`p-3 sm:p-4 rounded-2xl shadow-sm border border-white/50 bg-white/80 backdrop-blur-sm ${iconBgMap[colorClass]}`}>
                             {path.icon}
                          </div>
                          {path.percentage && (
                             <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-600 shadow-sm border border-slate-100">
                               名額 {path.percentage}
                             </span>
                          )}
                       </div>
                       <h3 className={`text-2xl font-black mt-6 leading-tight ${textTitleMap[colorClass]}`}>
                         {path.title}
                       </h3>
                    </div>

                    {/* Column Content */}
                    <div className="flex flex-col divide-y divide-slate-100 flex-1">
                       
                       {/* Description */}
                       <div className="p-6 sm:p-8">
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            簡介
                         </div>
                         <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                           {path.description}
                         </p>
                       </div>

                       {/* Suitability */}
                       <div className="p-6 sm:p-8 bg-slate-50/50">
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-500" />
                            適合對象
                         </div>
                         <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed">
                           {path.suitability}
                         </p>
                       </div>

                       {/* Pros */}
                       <div className="p-6 sm:p-8">
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-emerald-500" />
                            優點
                         </div>
                         <ul className="space-y-3">
                            {path.pros?.map((pro, idx) => (
                               <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-medium">{pro}</span>
                               </li>
                            )) || <li className="text-slate-400 text-sm italic">無相關資料</li>}
                         </ul>
                       </div>

                       {/* Cons */}
                       <div className="p-6 sm:p-8 bg-slate-50/50">
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <ThumbsDown className="w-4 h-4 text-rose-400" />
                            缺點 / 風險
                         </div>
                         <ul className="space-y-3">
                            {path.cons?.map((con, idx) => (
                               <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                  <span className="font-medium">{con}</span>
                               </li>
                            )) || <li className="text-slate-400 text-sm italic">無相關資料</li>}
                         </ul>
                       </div>

                       {/* Details / Process */}
                       <div className="p-6 sm:p-8 flex-1">
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4 text-slate-400" />
                            重點摘要
                         </div>
                         <ul className="space-y-4">
                            {path.details.map((detail, idx) => (
                               <li key={idx} className="relative pl-5 text-sm text-slate-600 leading-relaxed">
                                  <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-slate-300 ring-4 ring-slate-100"></div>
                                  {detail}
                               </li>
                            ))}
                         </ul>
                       </div>

                    </div>
                 </div>
               );
             })}
             
             {/* Empty State / Add More Hint */}
             {selectedIds.length < MAX_SELECTION && (
               <div className="flex flex-col items-center justify-center w-[240px] shrink-0 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 text-slate-400 p-8 h-full min-h-[600px]">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-bold text-center">
                    還可以選擇<br/>{MAX_SELECTION - selectedIds.length} 個比較項目
                  </p>
                  <p className="text-xs mt-2 text-center text-slate-400">
                    在上方點選項目即可加入比較
                  </p>
               </div>
             )}

          </div>
        </div>

        {/* Footer Hint */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 text-center shrink-0 z-20">
           <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
             <ArrowRight className="w-4 h-4 text-indigo-400" />
             左右滑動卡片查看更多項目
           </p>
        </div>

      </div>
    </div>
  );
}
