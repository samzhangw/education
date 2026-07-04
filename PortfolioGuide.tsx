import React, { useState } from 'react';
import { PenTool, Target, FileText, CheckCircle2, ChevronRight, BookOpen, AlertTriangle, Lightbulb, User, LayoutGrid, Award, ArrowRight, ArrowRightLeft } from 'lucide-react';

export default function PortfolioGuide({ userCategory = 'high_school' }: { userCategory?: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'course' | 'extracurricular' | 'reflection' | 'optimization' | 'tips'>('overview');
  const [optTab, setOptTab] = useState<'high_school' | 'vocational' | 'special'>('high_school');

  React.useEffect(() => {
    if (userCategory === 'vocational') {
      setOptTab('vocational');
    } else {
      setOptTab('high_school');
    }
  }, [userCategory]);

  const tabs = [
    { id: 'overview', label: '檔案總覽', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'course', label: '課程學習成果', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'extracurricular', label: '多元表現', icon: <Award className="w-4 h-4" /> },
    { id: 'reflection', label: '反思與自我覺察', icon: <User className="w-4 h-4" /> },
    { id: 'optimization', label: '各管道優化', icon: <Target className="w-4 h-4" /> },
    { id: 'tips', label: '製作心法與避雷', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] group isolate p-8 sm:p-12">
         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/50 via-purple-50/30 to-transparent rounded-full blur-3xl -z-10"></div>
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
           <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold">
               <PenTool className="w-4 h-4" />
               108課綱核心精神
             </div>
             <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
               學習歷程檔案完全指南
             </h1>
             <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-medium">
               學習歷程（Portfolio）取代了過去高三臨時準備的備審資料。這是一場為期三年的馬拉松，重點不在於你有多少張獎狀，而在於你如何說出你的「學習故事」。
             </p>
           </div>
           <div className="hidden md:flex p-6 bg-slate-50 border border-slate-100 rounded-3xl shrink-0">
             <img src="https://api.dicebear.com/7.x/shapes/svg?seed=portfolio&backgroundColor=e0e7ff" alt="Portfolio Illustration" className="w-32 h-32 rounded-2xl shadow-sm" />
           </div>
         </div>
      </section>
      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Tabs / Sidebar */}
        <div className="w-full lg:w-64 shrink-0 sticky top-[80px] lg:top-32 z-30">
          <div role="tablist" aria-label="學習歷程指南" className="w-full flex lg:flex-col overflow-x-auto scrollbar-hide gap-2 p-1 lg:p-4 bg-slate-100/70 lg:bg-white rounded-2xl border border-slate-200/60 lg:border-slate-100 lg:shadow-sm backdrop-blur-md lg:backdrop-blur-none">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-3 px-4 sm:px-6 lg:px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center lg:justify-start
                  ${activeTab === tab.id 
                    ? 'bg-white lg:bg-indigo-50 text-indigo-600 shadow-sm lg:shadow-none border border-slate-200/50 lg:border-transparent' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="text-center mt-2 text-xs text-slate-400 font-medium lg:hidden flex items-center justify-center gap-1">
             <ArrowRightLeft className="w-3 h-3" /> 滑動可察看更多
          </div>
        </div>

        {/* Content Areas */}
        <div className="flex-1 min-w-0 min-h-[50vh]">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div id="panel-overview" role="tabpanel" className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">上傳時間點</h3>
                <div className="text-xl font-black text-slate-800">每學期 / 每學年</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">課程成果於每學期末上傳；多元表現於每學年結束前上傳。<strong className="text-rose-500">截止後系統關閉，無法補件或修改</strong>。</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">課程學習成果</h3>
                <div className="text-xl font-black text-slate-800">上傳至多 6 件</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">每學期至多上傳 6 件（須經任課教師認證）。高三下申請大學時，從中勾選至多 3 件提交給校系。</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">多元表現</h3>
                <div className="text-xl font-black text-slate-800">上傳至多 10 件</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">每學年至多上傳 10 件（無須教師認證）。高三下申請大學時，從中勾選至多 10 件提交給校系。</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">高三下統整期</h3>
                <div className="text-xl font-black text-slate-800">學習歷程自述</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">申請入學時繳交。包含：高中階段學習歷程反思、就讀動機、未來學習計畫與生涯規劃（至多 800 字及 3 張圖片）。</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                  <Target className="w-5 h-5" />
                </div>
                108課綱推動學習歷程檔案的核心精神
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed font-medium">
                  過去的「備審資料」往往是高三下學期考完學測後，短短一兩個月內為應付面試而「擠」出來的產物，甚至衍伸出過度包裝、花錢代作等教育資源不對等的問題。108課綱推動「學習歷程檔案」，其核心目的在於落實<strong>「重在學習過程，而非僅看結果」</strong>的適性發展理念：
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">記錄真實的三年成長軌跡</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">鼓勵學生提早進行生涯探索，將探索的足跡分散於六個學期，展現高中三年的興趣發展、能力提升與思維改變，杜絕一次性的火力展示。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">呈現學科內外的核心素養</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">大學審查不再只看冰冷的考試分數。透過專題、報告與實作，評量學生是否具備解決問題、批判思考、溝通協調與自主學習等「帶得走的軟實力」。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">引導適性揚才與自我對話</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">透過撰寫「反思（Reflection）」，學生能定期檢視自己的學習成效與興趣偏好，幫助自己在選填志願時，能更精準對接適合的大學校系。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">確保公信力與防弊機制</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">課程學習成果必須經過任課教師的「認證」，且系統限制每學期上傳的時間與件數，確保資料的真實性，減少過度包裝與代寫疑慮。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Tab */}
        {activeTab === 'course' && (
           <div id="panel-course" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
               <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                   <BookOpen className="w-5 h-5" />
                 </div>
                 課程學習成果撰寫專業框架
               </h2>
               <p className="text-slate-700 leading-relaxed font-medium mb-6">
                 「課程學習成果」是大學教授評估你是否具備該科系<strong>基礎學科學力</strong>與<strong>探究實作能力</strong>的最重要依據。請務必挑選與你「未來想申請校系」高度相關的課程（如：申請資訊工程系，應優先挑選數學、自然科學與資訊科技領域的課程成果）。<br/>
                 一份獲得教授青睞的報告，不應只是課堂講義的重點整理，而是要有你個人的「見解」與「反思」。以下為建議的高分報告結構：
               </p>
               <div className="space-y-4">
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <h3 className="font-bold text-slate-900 text-lg">百字簡述（Executive Summary）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      大學教授審閱一份備審資料的時間平均僅有 3 到 5 分鐘。檔案第一頁的「百字摘要」是決定教授是否願意深入閱讀的關鍵。請精煉說明：<strong>這是什麼課程？你做了什麼專題/報告？你學到的最核心能力（或解決的最關鍵問題）是什麼？</strong><br/>
                      <span className="inline-block mt-3 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg text-sm border border-indigo-100">
                        <strong>優良範例：</strong>「本報告於《公民與社會》課程中，透過實地踏查與文獻回顧，分析在地老街商圈沒落之原因，並結合所學之經濟學原理提出數位轉型建議。此專題不僅培養我數據收集與田野調查的能力，更讓我確信未來想朝社會學與公共政策領域發展。」
                      </span>
                    </p>
                 </div>
                 
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <h3 className="font-bold text-slate-900 text-lg">動機與問題意識（Motivation & Problem Statement）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      好的研究始於好的問題。說明你為什麼選擇這個主題？是因為生活中的某個觀察（如：發現學校廚餘量過多）？還是為了解決某個痛點？展現你的「問題意識（Problem Awareness）」，這能證明你具備主動發掘問題的素養，而非被動接受老師指派。
                    </p>
                 </div>

                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <h3 className="font-bold text-slate-900 text-lg">探究過程與研究方法（Process & Methodology）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      <strong>切忌只放「完美結果」！</strong>教授更看重你「如何得出這個結果」。<br/>
                      請具體說明：你使用了什麼實驗方法或工具？樣本數或文獻來源為何？在過程中遇到了什麼困難（例如：實驗數據出現誤差、程式碼產生 Bug、問卷回收率極低）？你又是<strong>如何運用邏輯分析與資源來解決這些問題</strong>的？<br/>
                      <span className="text-rose-600 font-bold">真實的失敗與除錯過程，往往比一帆風順的完美結果更能展現你的學術潛力與抗壓性。</span>
                    </p>
                 </div>

                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
                      <h3 className="font-bold text-slate-900 text-lg">反思、收穫與未來展望（Reflection & Future Outlook）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      除了學科上的「硬知識」（如學會了 Python 語法、光學干涉原理），你更學到了什麼「軟實力」（如團隊意見分歧時的溝通技巧、時間管理能力）？<br/>
                      最後，務必進行<strong>「科系連結」</strong>：這份課程成果帶給你的啟發，如何影響你未來的生涯規劃？它如何成為你申請該目標科系的基石？
                    </p>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Extracurricular Tab */}
        {activeTab === 'extracurricular' && (
           <div id="panel-extracurricular" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -z-10"></div>
               <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                 <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                   <Award className="w-5 h-5" />
                 </div>
                 多元表現佈局與高分策略
               </h2>
               <p className="text-slate-700 leading-relaxed font-medium mb-6">
                 「多元表現」涵蓋了你課堂之外的所有學習與探索軌跡。大學端希望看到的是一個「具備多元潛力、社會關懷與實踐力的立體的人」，而不只是個讀書機器。<br/>
                 <strong>核心原則：重質不重量。</strong>不需要十項全能或硬湊 10 件，只要有 1-3 個你願意投入極大熱情、具備深度反思的「亮點」即可。
               </p>
               <div className="grid sm:grid-cols-2 gap-6">
                 {/* Card 1 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Target className="w-5 h-5 text-indigo-500" />
                       高中自主學習計畫
                    </h3>
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full inline-block mb-3">大學教授最看重的項目</div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      這是最能展現你「學習熱忱」、「時間管理」與「自我規劃能力」的欄位。主題不限（即使是學習烘焙、研究韓流文化也可），教授評估的重點在於：<strong>你的計畫是否具備合理性？你是否能自律地確實執行？在缺乏老師緊盯的情況下，遇到困難你如何尋找資源（如線上課程、文獻）自我解答？</strong>
                    </p>
                 </div>
                 
                 {/* Card 2 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <User className="w-5 h-5 text-emerald-500" />
                       社團參與與幹部經驗
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      <strong className="text-rose-500">切勿只上傳一張「社長聘書」！</strong>聘書無法說明你的能力。請以「專案管理」的角度撰寫：具體說明你主導了什麼大型活動？帶領了多少人的團隊？在籌備過程中如何進行預算控制、時程規劃？最重要的是，<strong>如何解決團隊內的人際衝突與意見分歧？</strong>這能強力展現你的領導與溝通協調素養。
                    </p>
                 </div>

                 {/* Card 3 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Award className="w-5 h-5 text-amber-500" />
                       檢定證照與競賽表現
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      若有與目標科系高度相關的檢定（如語文檢定、APCS程式檢定），能作為客觀的能力證明。但若無相關檢定也無須焦慮，不必為湊件數去考不相關的證照。<br/>
                      競賽經驗<strong>即使未得獎也非常值得撰寫</strong>，重點請放在「備賽過程的艱辛與磨練」，以及「從失敗中獲得的成長」。
                    </p>
                 </div>

                 {/* Card 4 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Lightbulb className="w-5 h-5 text-rose-500" />
                       服務學習與其他活動
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      志工服務的核心在於你的「社會關懷與同理心」，而非時數多寡。如果只是去偏鄉打掃，但你觀察到了偏鄉基礎建設的不足，並提出你的反思與見解，這就是一份具備深度的多元表現。重點在於<strong>你如何將服務經驗內化為自己成長的養分</strong>。
                    </p>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Reflection Tab */}
        {activeTab === 'reflection' && (
          <div id="panel-reflection" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  專業反思寫作結構：ORID 焦點討論法
                </h2>
                <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
                  <p>「反思（Reflection）」是學習歷程檔案的靈魂。教授不看活動的「流水帳簡介」（因為他們可以自己上網查活動內容），他們看重的是<strong>「這個活動/課程帶給你的實質改變」</strong>。<br/>
                  強烈建議使用業界與學界廣泛應用的 <strong>ORID 焦點討論法（Objective, Reflective, Interpretive, Decisional）</strong> 來結構化你的反思，讓文字具備深度與邏輯：</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
                      <div className="text-indigo-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shadow-inner">O</div> Objective (客觀事實)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>發生了什麼事？</strong> 客觀、具體地簡述活動內容、你在團隊中負責的職務，以及你遇到的具體挑戰或事件（人事時地物）。</p>
                      <div className="p-4 bg-white rounded-xl text-xs text-slate-600 border border-slate-200 border-l-4 border-l-indigo-500 shadow-sm">
                        <strong className="text-rose-500">❌ 錯誤示範：</strong> 我參加了校內的資訊社，然後我們小組做了一個很棒的專題。<br/><br/>
                        <strong className="text-emerald-600">✅ 正確示範：</strong> 在校內黑客松中，我擔任小組的後端開發與資料庫建置。在整合階段，我們遇到了 API 資料格式與前端組員規格不一致的嚴重衝突。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
                      <div className="text-rose-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-sm shadow-inner">R</div> Reflective (感受與反應)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>你當下有什麼感覺？</strong> 誠實面對並描述自己的情緒起伏。面對困難時的焦慮、解決問題後的成就感，能讓你在審查委員眼中成為一個「真實立體的人」。</p>
                      <div className="p-4 bg-white rounded-xl text-xs text-slate-600 border border-slate-200 border-l-4 border-l-rose-500 shadow-sm">
                        <strong className="text-rose-500">❌ 錯誤示範：</strong> 我覺得很開心，過程很有趣，大家都學到很多。<br/><br/>
                        <strong className="text-emerald-600">✅ 正確示範：</strong> 當下我感到非常焦慮與自責，因為距離發表只剩兩天，我很擔心因為我負責的後端規格出錯，而拖累整個團隊的進度。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
                      <div className="text-emerald-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shadow-inner">I</div> Interpretive (詮釋與意義)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>你學到了什麼？</strong> 進入深層思考：找出事件背後的意義，發現自己的優勢與盲點。你是如何具體解決上述困境的？</p>
                      <div className="p-4 bg-white rounded-xl text-xs text-slate-600 border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm">
                        <strong className="text-rose-500">❌ 錯誤示範：</strong> 經過這次事件，我學會了團隊溝通真的很重要。<br/><br/>
                        <strong className="text-emerald-600">✅ 正確示範：</strong> 為了趕上進度，我主動召集前端同學，逐行比對 JSON 格式。我深刻體悟到，溝通斷層的根本原因在於專案初期缺乏統一的「規格文件」，這比單純的程式能力更為重要。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
                      <div className="text-amber-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm shadow-inner">D</div> Decisional (決定與行動)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>未來你會怎麼做？</strong> 展現成長型思維：將學到的經驗轉化為未來的具體行動方針，並<strong>嘗試連結至你想申請的目標科系特質</strong>。</p>
                      <div className="p-4 bg-white rounded-xl text-xs text-slate-600 border border-slate-200 border-l-4 border-l-amber-500 shadow-sm">
                        <strong className="text-rose-500">❌ 錯誤示範：</strong> 我以後會更認真學習寫程式，並考上理想的大學。<br/><br/>
                        <strong className="text-emerald-600">✅ 正確示範：</strong> 這次教訓讓我決定，未來在任何專案啟動前，必先制定標準化的 API 規格書。這份經驗也讓我確信，我想進入資管系深化專案管理與系統分析的能力，成為優秀的系統架構師。
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* Optimization Tab */}
        {activeTab === 'optimization' && (
          <div id="panel-optimization" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -z-10"></div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                  不同升學管道的專屬優化策略
                </h2>
                <p className="text-slate-700 leading-relaxed font-medium mb-6">不同入學管道的審查委員，看重的特質與評分權重截然不同。你必須針對目標管道「投其所好」，精準展現優勢。</p>

                <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1 bg-slate-50 rounded-xl border border-slate-200 mt-6 mb-6">
                  <button
                    onClick={() => setOptTab('high_school')}
                    className={`px-4 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 ${optTab === 'high_school' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    大學申請入學 (高中生為主)
                  </button>
                  <button
                    onClick={() => setOptTab('vocational')}
                    className={`px-4 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 ${optTab === 'vocational' ? 'bg-white text-teal-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    四技二專甄選入學 (高職生為主)
                  </button>
                  <button
                    onClick={() => setOptTab('special')}
                    className={`px-4 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 ${optTab === 'special' ? 'bg-white text-amber-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    特殊選才 (偏才/特殊境遇)
                  </button>
                </div>

                <div className="space-y-8 min-h-[250px]">
                  {optTab === 'high_school' && (
                    <div className="p-6 border-l-4 border-indigo-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <BookOpen className="w-5 h-5 text-indigo-500" />
                         大學申請入學 (一般大學)
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <strong>🎯 教授評分核心：</strong> 普大教授非常看重學生的<strong>「學術探究精神」</strong>、<strong>「邏輯論述能力」</strong>以及<strong>「高中三年的成長軌跡」</strong>。他們想確認你是否具備應付大學繁重學術研究的基礎素養，並確認你的動機是否真誠。
                      </p>
                      
                      <div className="space-y-5">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">精準對接「校系分則」與「核心素養」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">在上傳資料前，務必至校系官網查閱該系的「學習準備建議方向」。如果該系看重「溝通協調」，你的檔案就必須強調團隊合作與社團領導經驗；若該系看重「邏輯推理」，就必須放大你的數理分析或程式專題的篇幅。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現「學術潛力」與嚴謹的「研究方法」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">在課程成果或自主學習中，切忌只給出表面結論。請詳細說明你的「文獻回顧（你參考了哪些資料）」、「實驗設計」、「問卷發放與統計方法」。證明你懂「怎麼做嚴謹的研究」。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">決勝關鍵：「學習歷程自述」 (高三下撰寫)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">這是你整份檔案的靈魂總結。你必須清晰地串聯這三年的所有學習亮點，並具體回答三個問題：<strong>「為什麼對這個領域有興趣？」、「為什麼非這所學校的這個系不可？」、「這高中三年，你為了進入這個系做了哪些具體準備？」</strong></p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {optTab === 'vocational' && (
                    <div className="p-6 border-l-4 border-teal-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Target className="w-5 h-5 text-teal-500" />
                         四技二專甄選入學 (科技大學)
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-teal-50 p-4 rounded-xl border border-teal-100">
                        <strong>🎯 教授評分核心：</strong> 科大教授最看重的是<strong>「專業實作與動手能力」</strong>、<strong>「即戰力」</strong>與<strong>「對產業現況的認知」</strong>。他們青睞實務經驗豐富，且具備解決業界真實問題潛力的學生。
                      </p>
                      
                      <div className="space-y-5">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">絕對核心：「專題實作及實習科目學習成果」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">這是科大審查的重中之重（通常佔比極高）。請詳細說明你在專題團隊中的「具體技術貢獻」，務必附上清晰的成品照片、系統架構圖、程式碼片段或 CAD 設計圖，證明這項技術是由你親手完成的。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">放大「專業證照」的實務價值</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">如果有乙級以上或具備業界認可度的證照，一定要在多元表現中獨立成篇。不要只放一張證書圖！要寫出你「為了考取證照所經歷的刻苦訓練過程」，以及「這張證照代表你具備了何種能接軌業界的實務技能」。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現對「產業生態」的認知與企圖心</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">若有建教合作、校外實習、或是參加業界專家講座的經驗，請在自述中大力強調。展現你對該領域職場環境的了解、實務上的抗壓性，以及未來想在該產業深耕的企圖心。</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {optTab === 'special' && (
                    <div className="p-6 border-l-4 border-amber-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Award className="w-5 h-5 text-amber-500" />
                         特殊選才
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <strong>🎯 教授評分核心：</strong> 本管道不看學測/統測成績，專門尋找具有<strong>「極度突出的單科偏才」</strong>、<strong>「特殊領域卓越成就」</strong>或是<strong>「處於特殊境遇卻展現極強生命韌性」</strong>的極少數學生。
                      </p>
                      
                      <div className="space-y-5">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">聚焦放大「極端亮點」 (偏才/專才型)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">備審版面極其珍貴，請捨棄平庸的在校成績單或普通的志工獎狀。把所有版面 100% 留給你的「頂尖特殊成就」（例如：奧林匹亞競賽國手、大型開源專案核心貢獻者、曾發表國際級學術論文、具備特殊發明專利等）。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">強調特殊才能的「社會影響力」與「獨特性」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">除了個人得獎，你的特殊才能是否對他人或社會產生了實質影響？例如：你獨自開發了一款幫助視障者的 APP 並上架獲得數萬下載量，實際改善了弱勢族群的生活。這比單純的程式比賽第一名更具強大說服力。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現逆境中的強大韌性 (特殊境遇型)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">若是因家庭經濟弱勢、偏鄉資源匱乏、或是新住民子女等特殊境遇報考，請在自述中真誠展現你「如何在教育資源極度不平等的困境下，依然保持強烈的求知慾，並突破重重限制取得優異表現」。教授想看見的是你的「韌性」與未來的「爆發潛力」。</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
             </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
           <div id="panel-tips" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Do's */}
                <div className="bg-emerald-50/50 rounded-[2rem] p-8 border border-emerald-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -z-10"></div>
                  <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                       <ThumbsUpIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    高分製作心法 (Do's)
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900 text-lg">及早規劃，學期末立刻建檔</strong>
                        <p className="text-sm text-emerald-800/80">人的記憶極度不可靠。每學期期末考結束，就應該立刻把當學期的專題報告、活動照片、證書與熱騰騰的反思心得整理成 PDF 上傳至學校平台。<strong>一旦錯過學校規定的上傳截止日，系統將永久關閉，高三無法再補救。</strong></p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900 text-lg">展現「失敗與修正」的真實過程</strong>
                        <p className="text-sm text-emerald-800/80">教授最不喜歡看「過度完美、毫無破綻」的假人。如果在實驗中失敗、專題進度大落後、或是團隊發生嚴重爭執，請勇敢寫出你<strong>「如何發現問題、如何調適挫折，並最終找到解法」</strong>。這能高度展現你的抗壓性與解決問題的真實能力。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900 text-lg">排版乾淨俐落，首頁放「百字摘要」</strong>
                        <p className="text-sm text-emerald-800/80">教授審查每份檔案的時間非常有限。請善用粗體字、列點說明（Bullet points）與圖表來輔助閱讀，避免密密麻麻的文字牆。<strong>強烈建議在每一份成果的「第一頁」放上百字摘要</strong>，讓教授一秒抓住你的亮點與能力。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Don'ts */}
                <div className="bg-rose-50/50 rounded-[2rem] p-8 border border-rose-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/50 rounded-full blur-3xl -z-10"></div>
                  <h3 className="text-xl font-black text-rose-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                    </div>
                    常見致命地雷 (Don'ts)
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900 text-lg">只有大量照片與獎狀，毫無反思文字</strong>
                        <p className="text-sm text-rose-800/80">教授無法「通靈」。放了十張參加大學營隊的照片或是一堆參加證明，卻不寫你從中學到了什麼實質知識，這份資料的審查價值趨近於零。記住：<strong>沒有反思紀錄的活動，就是無效的活動。</strong></p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900 text-lg">過度包裝、抄襲與找人代寫</strong>
                        <p className="text-sm text-rose-800/80">大學教授閱卷無數，是不是高中生自己寫的口吻與邏輯，一眼就能看穿。若被發現花錢請補習班代寫，或使用 AI (如 ChatGPT) 直接生成內容而未經自我消化，<strong>在二階面試時絕對會被問倒，且面臨直接被取消錄取資格的嚴重後果。</strong></p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900 text-lg">小學生日記般的流水帳心得</strong>
                        <p className="text-sm text-rose-800/80">「今天天氣很好，活動大家都很熱情，我學到很多，謝謝老師與同學的幫忙。」這種流於表面的心得毫無學術價值。請務必具體寫出<strong>「學到了什麼具體能力（如：文獻檢索、Python爬蟲、簡報設計邏輯）」</strong>以及<strong>「這些能力如何幫助你銜接未來的大學學業」</strong>。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
           </div>
        )}
      </div>
      </div>
    </div>
  );
}

// Helper icons
function ThumbsUpIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>;
}
function XIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}

