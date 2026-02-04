import React, { useState, useEffect } from 'react';
import { AdmissionPath } from './types';
import { X, Check, ArrowRightLeft, AlertCircle, MousePointerClick, ThumbsUp, ThumbsDown, Info, LayoutGrid } from 'lucide-react';

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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-[95vw] xl:max-w-7xl h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-3">
              <div className="p-2 sm:p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                <ArrowRightLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              升學管道超級比一比
            </h2>
            <p className="text-slate-500 font-medium mt-1 ml-1 text-sm sm:text-base">
              目前身分：<span className="text-indigo-600 font-bold">{categoryLabel}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Selection Bar */}
        <div className="px-5 py-4 sm:px-6 bg-slate-50 border-b border-slate-200/60 overflow-x-auto shrink-0 scrollbar-hide">
          <div className="flex items-center gap-4 min-w-max">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MousePointerClick className="w-3 h-3" />
              選擇比較項目 (最多{MAX_SELECTION}項)
            </span>
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="flex gap-2">
              {paths.map(path => {
                const isSelected = selectedIds.includes(path.id);
                const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTION;
                
                return (
                  <button
                    key={path.id}
                    onClick={() => !isDisabled && toggleSelection(path.id)}
                    disabled={isDisabled}
                    className={`
                      px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all border
                      ${isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                        : isDisabled
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                      }
                    `}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {path.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Table Container */}
        <div className="flex-1 overflow-auto bg-slate-50/50 custom-scrollbar relative">
          <table className="w-full border-collapse min-w-[600px] sm:min-w-full text-left">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-30 bg-slate-100 border-b border-r border-slate-200 p-4 min-w-[120px] text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                  比較項目
                </th>
                {selectedPaths.map(path => (
                  <th key={path.id} className="sticky top-0 z-20 bg-white border-b border-slate-200 p-4 min-w-[200px] w-1/4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                        {path.icon}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-base sm:text-lg font-bold text-slate-800">{path.title}</span>
                         {path.percentage && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-fit mt-1">
                                名額 {path.percentage}
                            </span>
                         )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row: Description */}
              <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                 <th className="sticky left-0 z-20 bg-slate-50 border-r border-slate-200 p-4 text-sm font-bold text-slate-700 align-top shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    簡介
                 </th>
                 {selectedPaths.map(path => (
                    <td key={path.id} className="p-4 border-b border-slate-100 align-top text-sm text-slate-600 leading-relaxed font-medium">
                       {path.description}
                    </td>
                 ))}
              </tr>

              {/* Row: Suitability */}
              <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                 <th className="sticky left-0 z-20 bg-slate-50 border-r border-slate-200 p-4 text-sm font-bold text-slate-700 align-top shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2">
                       <LayoutGrid className="w-4 h-4 text-indigo-500" />
                       適合對象
                    </div>
                 </th>
                 {selectedPaths.map(path => (
                    <td key={path.id} className="p-4 border-b border-slate-100 align-top text-sm font-bold text-indigo-900 bg-indigo-50/30">
                       {path.suitability}
                    </td>
                 ))}
              </tr>

              {/* Row: Pros */}
              <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                 <th className="sticky left-0 z-20 bg-slate-50 border-r border-slate-200 p-4 text-sm font-bold text-slate-700 align-top shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2 text-emerald-600">
                       <ThumbsUp className="w-4 h-4" />
                       優點
                    </div>
                 </th>
                 {selectedPaths.map(path => (
                    <td key={path.id} className="p-4 border-b border-slate-100 align-top">
                       <ul className="space-y-3">
                          {path.pros?.map((pro, idx) => (
                             <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60 text-sm text-slate-700 leading-relaxed group hover:bg-emerald-100/50 transition-colors">
                                <div className="mt-0.5 p-1 bg-white rounded-full text-emerald-500 shadow-sm shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                                  <Check className="w-3 h-3" strokeWidth={3} />
                                </div>
                                <span>{pro}</span>
                             </li>
                          )) || <li className="text-slate-400 text-xs italic">無相關資料</li>}
                       </ul>
                    </td>
                 ))}
              </tr>

              {/* Row: Cons */}
              <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                 <th className="sticky left-0 z-20 bg-slate-50 border-r border-slate-200 p-4 text-sm font-bold text-slate-700 align-top shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2 text-rose-500">
                       <ThumbsDown className="w-4 h-4" />
                       缺點/風險
                    </div>
                 </th>
                 {selectedPaths.map(path => (
                    <td key={path.id} className="p-4 border-b border-slate-100 align-top">
                       <ul className="space-y-3">
                          {path.cons?.map((con, idx) => (
                             <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 border border-rose-100/60 text-sm text-slate-700 leading-relaxed group hover:bg-rose-100/50 transition-colors">
                                <div className="mt-0.5 p-1 bg-white rounded-full text-rose-500 shadow-sm shrink-0 border border-rose-100 group-hover:scale-110 transition-transform">
                                  <X className="w-3 h-3" strokeWidth={3} />
                                </div>
                                <span>{con}</span>
                             </li>
                          )) || <li className="text-slate-400 text-xs italic">無相關資料</li>}
                       </ul>
                    </td>
                 ))}
              </tr>

               {/* Row: Details */}
               <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                 <th className="sticky left-0 z-20 bg-slate-50 border-r border-slate-200 p-4 text-sm font-bold text-slate-700 align-top shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2">
                       <Info className="w-4 h-4 text-slate-400" />
                       重點摘要
                    </div>
                 </th>
                 {selectedPaths.map(path => (
                    <td key={path.id} className="p-4 border-b border-slate-100 align-top">
                       <ul className="space-y-2">
                          {path.details.map((detail, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 ring-4 ring-slate-50"></div>
                                {detail}
                             </li>
                          ))}
                       </ul>
                    </td>
                 ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer Hint */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100 text-center shrink-0">
           <p className="text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
             <AlertCircle className="w-3 h-3" />
             左右滑動表格可查看完整內容
           </p>
        </div>
      </div>
    </div>
  );
}