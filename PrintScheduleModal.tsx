import React, { useState, useEffect } from 'react';
import { AdmissionPath, ImportantDate, StudentCategory } from './types';
import { PATH_KEYWORDS } from './constants';
import { X, Printer, Check, Calendar, FileCheck, ArrowRight } from 'lucide-react';

interface PrintScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: StudentCategory;
  paths: AdmissionPath[];
  dates: ImportantDate[];
}

export default function PrintScheduleModal({ isOpen, onClose, category, paths, dates }: PrintScheduleModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'preview'>('select');

  // Select all paths by default when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedIds(paths.map(p => p.id));
      setStep('select');
    }
  }, [isOpen, paths]);

  if (!isOpen) return null;

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Filter dates based on selected paths keywords
  const filteredDates = dates.filter(date => {
    // If nothing selected, show nothing
    if (selectedIds.length === 0) return false;

    // Check if the date title or description matches any keyword from any selected path
    return selectedIds.some(id => {
      const keywords = PATH_KEYWORDS[id] || [];
      return keywords.some(k => 
        date.title.includes(k) || date.description.includes(k)
      );
    });
  }).sort((a, b) => a.date.localeCompare(b.date));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:block print:p-0 print:absolute print:inset-0 print:bg-white print:z-[9999]">
      {/* Backdrop - Hidden on Print */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity print:hidden" 
        onClick={onClose}
      />
      
      <div className="relative z-10 bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 print:shadow-none print:max-w-none print:max-h-none print:rounded-none print:h-auto print:w-full print:animate-none">
        
        {/* Header - Hidden on Print */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200">
               <Printer className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800">客製化日程表</h2>
               <p className="text-sm text-slate-500 font-medium">選擇您關注的升學管道，建立專屬清單</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors" aria-label="關閉列印視窗">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar print:overflow-visible print:p-0 print:h-auto">
          
          {/* Step 1: Selection (Hidden on Print) */}
          <div className={`${step === 'select' ? 'block' : 'hidden'} print:hidden space-y-6`}>
             <div className="grid sm:grid-cols-2 gap-3">
                {paths.map(path => {
                   const isSelected = selectedIds.includes(path.id);
                   return (
                     <button
                       key={path.id}
                       onClick={() => toggleSelection(path.id)}
                       className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          isSelected 
                            ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                            : 'border-slate-100 bg-white hover:border-indigo-200'
                       }`}
                     >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                           isSelected ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-slate-300'
                        }`}>
                           {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <div>
                           <div className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-600'}`}>{path.title}</div>
                           <div className="text-xs text-slate-400 mt-0.5">包含相關考試與報名時程</div>
                        </div>
                     </button>
                   );
                })}
             </div>
             
             <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-500">
                   已選擇 {selectedIds.length} 個管道，共 {filteredDates.length} 個日程
                </div>
                <button 
                  onClick={() => setStep('preview')}
                  disabled={selectedIds.length === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                  預覽清單
                  <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>

          {/* Step 2: Preview & Print Area */}
          <div id="print-area" className={`${step === 'preview' ? 'block' : 'hidden'} print:block`}>
             
             {/* Printable Header */}
             <div className="hidden print:flex flex-col items-center justify-center mb-8 pb-6 border-b-2 border-slate-800">
                <h1 className="text-3xl font-black text-slate-900 mb-2">115 學年度升大學重要日程表</h1>
                <p className="text-slate-600 font-medium">
                   適用對象：{category === 'high_school' ? '普通高中' : category === 'vocational' ? '技術型高中' : '五專生'}
                </p>
                <div className="flex gap-2 mt-2 text-xs text-slate-500">
                   包含管道：
                   {paths.filter(p => selectedIds.includes(p.id)).map(p => p.title).join('、')}
                </div>
             </div>

             {/* Web Preview Header (Hidden on Print) */}
             <div className="flex items-center gap-2 mb-6 p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 print:hidden">
                <FileCheck className="w-5 h-5" />
                <span className="text-sm font-bold">預覽模式：以下是根據您選擇的管道所篩選的日程</span>
             </div>

             {/* The Schedule Table */}
             <div className="border border-slate-200 rounded-lg overflow-hidden print:border-2 print:border-slate-800 print:rounded-none">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 print:bg-slate-100 border-b border-slate-200 print:border-slate-800">
                      <tr>
                         <th className="p-4 font-black text-slate-700 print:text-black w-[25%]">日期</th>
                         <th className="p-4 font-black text-slate-700 print:text-black w-[35%]">事件名稱</th>
                         <th className="p-4 font-black text-slate-700 print:text-black w-[40%]">說明</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                      {filteredDates.length > 0 ? (
                        filteredDates.map((item, idx) => (
                           <tr key={idx} className="hover:bg-slate-50/50 print:hover:bg-transparent break-inside-avoid">
                              <td className="p-4 align-top font-bold text-indigo-600 print:text-black whitespace-nowrap">
                                 <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 print:hidden" />
                                    {item.date}
                                 </div>
                              </td>
                              <td className="p-4 align-top font-bold text-slate-800 print:text-black">
                                 {item.title}
                              </td>
                              <td className="p-4 align-top text-slate-600 print:text-black font-medium leading-relaxed">
                                 {item.description}
                              </td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                           <td colSpan={3} className="p-12 text-center text-slate-400 font-medium">
                              沒有符合條件的日程，請嘗試選擇更多管道。
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>

             {/* Printable Footer */}
             <div className="hidden print:flex flex-col items-center justify-center mt-10 pt-4 border-t-2 border-slate-800 w-full text-center">
                <p className="font-bold text-slate-900 text-sm mb-1">
                   資料來源：升大學管道資訊網 (https://tyctw.github.io/unipath/)
                </p>
                <p className="text-xs text-slate-600 font-medium">
                   生成日期：{new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })} {new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                </p>
             </div>
          </div>
        </div>

        {/* Footer Actions (Hidden on Print) */}
        <div className={`p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center print:hidden ${step === 'select' ? 'hidden' : 'flex'}`}>
           <button 
             onClick={() => setStep('select')}
             className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
           >
             上一步
           </button>
           <div className="flex gap-3">
             <button 
               onClick={onClose}
               className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
             >
               關閉
             </button>
             <button 
               onClick={handlePrint}
               className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
             >
               <Printer className="w-4 h-4" />
               列印 / 存為 PDF
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}