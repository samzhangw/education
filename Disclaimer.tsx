import React from 'react';
import { AlertTriangle, ShieldAlert, Scale, RefreshCw } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      <section className="relative overflow-hidden rounded-[2.5rem] bg-rose-50/50 border border-rose-100 p-8 sm:p-12 text-center">
         <div className="inline-flex items-center justify-center p-4 bg-rose-100 text-rose-600 rounded-2xl mb-6">
           <AlertTriangle className="w-8 h-8" />
         </div>
         <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
           免責聲明
         </h1>
         <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
           請在使用本網站提供的服務前，仔細閱讀以下免責聲明。使用本網站即表示您同意以下條款。
         </p>
      </section>

      <div className="space-y-6">
        
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl shrink-0 hidden sm:block">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 sm:block">
              <RefreshCw className="w-5 h-5 text-slate-500 sm:hidden" />
              1. 資訊準確性與時效性
            </h2>
            <p className="text-slate-600 leading-relaxed">
              本網站致力於提供最新、最準確的升學管道資訊與日程表。然而，教育部及各大學招生委員會可能隨時調整政策、時程與簡章內容。本網站所提供之所有資訊僅供參考，<strong>最終且最具法律效力的規定，請務必以教育部及各招生單位發布之正式簡章為準。</strong>我們不對因依賴本站資訊而導致的任何損失或延誤承擔責任。
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl shrink-0 hidden sm:block">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 sm:block">
              <ShieldAlert className="w-5 h-5 text-slate-500 sm:hidden" />
              2. 決策風險自負
            </h2>
            <p className="text-slate-600 leading-relaxed">
              本網站提供的備考攻略、學習歷程製作建議、落點分析（若有提供）等內容，皆為編輯團隊或客座作者的主觀經驗分享與整理，不構成任何具保證性質的錄取承諾。每一位考生的背景、優勢與當年度的競爭情況皆不相同，請使用者在做出重大升學決策時，務必自行評估風險，並尋求專業教師或輔導顧問的協助。
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl shrink-0 hidden sm:block">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 sm:block">
              <Scale className="w-5 h-5 text-slate-500 sm:hidden" />
              3. 外部連結免責
            </h2>
            <p className="text-slate-600 leading-relaxed">
              本網站可能包含指向第三方網站的連結（如大學甄選入學委員會、技專校院招生委員會聯合會等）。提供這些連結僅為了使用者的方便，本網站不對這些外部網站的內容、隱私政策或安全性負責。使用者點擊外部連結時，須自行承擔相關風險。
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
