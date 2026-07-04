import React from 'react';
import { Users, Mail, Target, Zap, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] isolate p-8 sm:p-16 text-center">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 -z-10"></div>
         <div className="inline-flex items-center justify-center p-4 bg-indigo-100 text-indigo-600 rounded-2xl mb-6">
           <Users className="w-8 h-8" />
         </div>
         <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
           關於我們
         </h1>
         <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
           我們是一群致力於讓教育資訊更透明、更容易理解的團隊。我們的目標是幫助每一位高中職學生，在升學的十字路口不再感到迷惘。
         </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Target className="w-6 h-6 text-indigo-500" />
          我們的使命
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
               <Zap className="w-5 h-5 text-amber-500" />
               化繁為簡
            </h3>
            <p className="text-slate-600 leading-relaxed">
              繁複的升學簡章往往讓人卻步。我們將數百頁的官方文件，轉化為直覺、清晰的資訊圖表與重點整理。
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-emerald-500" />
               客觀中立
            </h3>
            <p className="text-slate-600 leading-relaxed">
              提供完全客觀、無商業干預的升學資訊。我們不推銷課程，只提供你真正需要的升學策略與客觀分析。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-900 rounded-[2rem] p-8 sm:p-12 text-white text-center border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-black mb-6">聯絡我們</h2>
        <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
          如果你對本網站有任何建議、發現資料有誤需要更正，或者有合作提案，都非常歡迎與我們聯繫。
        </p>
        <a 
          href="mailto:tyctw.analyze@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <Mail className="w-5 h-5" />
          tyctw.analyze@gmail.com
        </a>
      </section>

    </div>
  );
}
