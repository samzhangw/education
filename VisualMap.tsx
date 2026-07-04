import React from 'react';
import { ArrowRight, ArrowDown, Map, GraduationCap, Star, Users, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { StudentCategory, AdmissionPath } from './types';
import { ADMISSION_PATHS } from './constants';

interface VisualMapProps {
  activeCategory: StudentCategory;
  onPathClick: (path: AdmissionPath) => void;
}

const VisualMap: React.FC<VisualMapProps> = ({ activeCategory, onPathClick }) => {
  const getPath = (id: string) => {
    const paths = ADMISSION_PATHS[activeCategory] || [];
    return paths.find(p => p.id === id);
  };

  const renderNode = (id: string, customTitle?: string, customTime?: string, variant: 'primary' | 'secondary' | 'accent' | 'default' = 'primary') => {
    const path = getPath(id);
    const title = customTitle || path?.title || id;
    const isClickable = !!path;
    
    let colorClasses = '';
    let iconBg = '';
    
    switch (variant) {
      case 'primary':
        colorClasses = 'bg-white border-indigo-200 text-slate-800 hover:border-indigo-400 hover:shadow-[0_8px_20px_rgba(99,102,241,0.12)]';
        iconBg = 'bg-indigo-50 text-indigo-600';
        break;
      case 'secondary':
        colorClasses = 'bg-white border-emerald-200 text-slate-800 hover:border-emerald-400 hover:shadow-[0_8px_20px_rgba(16,185,129,0.12)]';
        iconBg = 'bg-emerald-50 text-emerald-600';
        break;
      case 'accent':
        colorClasses = 'bg-white border-amber-200 text-slate-800 hover:border-amber-400 hover:shadow-[0_8px_20px_rgba(245,158,11,0.12)]';
        iconBg = 'bg-amber-50 text-amber-600';
        break;
      case 'default':
        colorClasses = 'bg-white border-rose-200 text-slate-800 hover:border-rose-400 hover:shadow-[0_8px_20px_rgba(244,63,94,0.12)]';
        iconBg = 'bg-rose-50 text-rose-600';
        break;
    }

    return (
      <div 
        onClick={() => isClickable && onPathClick(path)}
        className={`relative flex flex-col p-4 rounded-[1.25rem] border-2 transition-all duration-300 ${isClickable ? 'cursor-pointer hover:-translate-y-1' : ''} ${colorClasses} w-[160px] sm:w-[180px] shadow-sm bg-white/80 backdrop-blur-sm z-10 group`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${iconBg}`}>
             {path?.icon ? React.cloneElement(path.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" }) : <GraduationCap className="w-4 h-4" />}
          </div>
          {isClickable && (
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
               <ChevronRight className={`w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors ${variant === 'secondary' ? 'group-hover:text-emerald-500 group-hover:bg-emerald-50' : ''} ${variant === 'accent' ? 'group-hover:text-amber-500 group-hover:bg-amber-50' : ''} ${variant === 'default' ? 'group-hover:text-rose-500 group-hover:bg-rose-50' : ''}`} />
            </div>
          )}
        </div>
        <div className="font-bold text-base leading-tight mb-1">{title}</div>
        {customTime && <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">{customTime}</div>}
      </div>
    );
  };

  if (activeCategory === 'high_school') {
    return (
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-x-auto relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
         
         <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-sm shadow-indigo-200">
               <Map className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">升學知識視覺地圖</h3>
               <p className="text-sm text-slate-500 font-medium mt-1">點擊各管道區塊，即可查看詳細資訊與流程</p>
            </div>
         </div>
         
         <div className="min-w-[850px] py-8 relative px-4">
            {/* Background connecting lines */}
            <div className="absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-emerald-200 via-indigo-200 to-rose-200 -translate-y-1/2 rounded-full -z-10 opacity-60"></div>
            
            <div className="flex items-center justify-between gap-6 relative">
               
               {/* Phase 1 */}
               <div className="flex flex-col items-center gap-2 relative">
                 <div className="h-24 flex items-center">
                    {renderNode('special', undefined, '高三上 11-1月', 'secondary')}
                 </div>
               </div>

               {/* Phase 2: Exam */}
               <div className="flex flex-col items-center gap-2 relative shrink-0">
                 <div className="h-24 flex items-center">
                    <div className="px-6 py-4 rounded-2xl bg-slate-800 text-white font-black text-lg shadow-xl shadow-slate-200 border border-slate-700 relative z-10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                      學科能力測驗 (1月)
                    </div>
                 </div>
               </div>

               {/* Phase 3: Main paths */}
               <div className="flex flex-col gap-6 relative z-10 py-6">
                 {/* Connecting branches to main paths */}
                 <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-6 h-[calc(100%-6rem)] border-l-2 border-t-2 border-b-2 border-indigo-200 rounded-l-xl -z-10 opacity-60"></div>

                 <div className="flex items-center gap-4 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-indigo-200 -z-10"></div>
                    {renderNode('star', undefined, '3月', 'accent')}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
                       <CheckCircle2 className="w-3 h-3" />
                       錄取即分發
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-indigo-200 -z-10"></div>
                    {renderNode('individual', undefined, '3月 - 6月', 'primary')}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold">
                       <ArrowRight className="w-3 h-3" />
                       未錄取可分發
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-indigo-200 -z-10"></div>
                    {renderNode('tech_apply', undefined, '3月 - 5月', 'primary')}
                 </div>
               </div>

               {/* Phase 4: Final */}
               <div className="flex flex-col gap-5 items-center relative z-10 shrink-0">
                  <div className="px-6 py-3 rounded-xl bg-slate-800 text-white font-black text-sm shadow-md border border-slate-700">
                    分科測驗 (7月)
                  </div>
                  <div className="h-6 w-0.5 bg-rose-200"></div>
                  {renderNode('placement', undefined, '8月', 'default')}
               </div>
               
            </div>
         </div>
      </div>
    );
  }

  if (activeCategory === 'vocational') {
    return (
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-x-auto relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
         
         <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-sm shadow-indigo-200">
               <Map className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">升學知識視覺地圖</h3>
               <p className="text-sm text-slate-500 font-medium mt-1">點擊各管道區塊，即可查看詳細資訊與流程</p>
            </div>
         </div>
         
         <div className="min-w-[950px] py-8 relative px-4">
            
            <div className="flex items-center justify-between gap-6 relative">
               
               {/* Background line segments */}
               <div className="absolute top-[3rem] left-20 right-20 h-1 bg-gradient-to-r from-emerald-200 via-indigo-200 to-rose-200 rounded-full -z-10 opacity-60"></div>
               <div className="absolute top-[10.5rem] left-20 right-[35%] h-1 bg-emerald-200 rounded-full -z-10 opacity-60"></div>

               {/* Column 1: Pre-exam */}
               <div className="flex flex-col gap-6 relative z-10 shrink-0">
                 {renderNode('tech_special', undefined, '高三上 11-1月', 'secondary')}
                 {renderNode('tech_excellence', undefined, '1-6月 (不採計統測)', 'secondary')}
               </div>

               {/* Column 2: Exam */}
               <div className="flex flex-col items-center shrink-0">
                  <div className="px-6 py-4 rounded-2xl bg-slate-800 text-white font-black text-lg shadow-xl shadow-slate-200 border border-slate-700 relative z-10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                    統一入學測驗 (4-5月)
                  </div>
               </div>

               {/* Column 3: Main paths */}
               <div className="flex flex-col gap-6 relative z-10">
                 <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-6 h-[calc(100%-6rem)] border-l-2 border-t-2 border-b-2 border-indigo-200 rounded-l-xl -z-10 opacity-60"></div>
                 
                 <div className="flex items-center gap-4 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-indigo-200 -z-10"></div>
                    {renderNode('tech_star', undefined, '3-4月', 'accent')}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
                       <CheckCircle2 className="w-3 h-3" />
                       依校排錄取
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 relative">
                    <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-indigo-200 -z-10"></div>
                    {renderNode('selection', undefined, '5-7月', 'primary')}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold whitespace-nowrap">
                       <ArrowRight className="w-3 h-3" />
                       未錄取可分發
                    </div>
                 </div>
               </div>

               {/* Column 4: Final */}
               <div className="flex flex-col items-center shrink-0 relative z-10 pt-[4.5rem]">
                  <div className="absolute left-[-2rem] top-1/2 w-8 h-0.5 bg-rose-200 -z-10"></div>
                  {renderNode('registration', undefined, '7-8月', 'default')}
               </div>

            </div>
         </div>
      </div>
    );
  }

  // Fallback for others (freshman, junior_college)
  return null;
};

export default VisualMap;
