import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 sm:p-12 text-center">
         <div className="inline-flex items-center justify-center p-4 bg-emerald-100 text-emerald-600 rounded-2xl mb-6">
           <Shield className="w-8 h-8" />
         </div>
         <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
           隱私權政策
         </h1>
         <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
           我們非常重視您的隱私權。本政策說明了我們如何收集、使用及保護您的資料。
         </p>
      </section>

      <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-slate-100 shadow-sm space-y-12">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
             <Eye className="w-6 h-6 text-indigo-500" />
             1. 資訊收集與使用
          </h2>
          <p className="text-slate-600 leading-relaxed pl-9">
            目前本網站為靜態展示性質，我們<strong>不會</strong>主動要求您註冊帳號，也<strong>不會</strong>收集您的姓名、身分證字號、聯絡方式等個人敏感識別資料。您在網站上使用的篩選功能、頁面切換等狀態，僅會暫存於您的瀏覽器中，不會上傳至我們的伺服器。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
             <Database className="w-6 h-6 text-blue-500" />
             2. Cookie 與分析工具
          </h2>
          <p className="text-slate-600 leading-relaxed pl-9">
            為了改善使用者體驗並分析網站流量，我們可能會使用第三方的網站分析工具（如 Google Analytics）。這些工具可能會在您的瀏覽器中寫入並讀取 Cookie，用於收集匿名化的流量數據（如您訪問的頁面、停留時間、使用的設備類型等）。這些數據僅用於整體流量統計分析，無法用於識別您的個人身分。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
             <Lock className="w-6 h-6 text-emerald-500" />
             3. 資料安全保護
          </h2>
          <p className="text-slate-600 leading-relaxed pl-9">
            雖然我們目前不收集敏感個人資料，但我們仍採用標準的 SSL 安全加密通訊協定，確保您在瀏覽本網站時，資料傳輸過程的安全性。若未來本網站新增需要註冊或收集個人資料的功能，我們將會更新本隱私權政策，並採取嚴格的技術及管理措施來保護您的資料。
          </p>
        </div>

        <div className="pt-8 border-t border-slate-100">
           <p className="text-sm text-slate-500">
             最後更新日期：2026年7月<br />
             如果您對我們的隱私政策有任何疑問，請透過頁底的聯絡信箱與我們聯繫。
           </p>
        </div>

      </div>
    </div>
  );
}
