const fs = require('fs');
let code = fs.readFileSync('PortfolioGuide.tsx', 'utf8');

// Replace the entire Content Areas div
const startIdx = code.indexOf('{/* Content Areas */}');
const endMarker = '// Helper icons';
const endIdx = code.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `{/* Content Areas */}
        <div className="flex-1 min-w-0 min-h-[50vh]">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">上傳時間</h3>
                <div className="text-xl font-black text-slate-800">每學期 / 每學年</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">平時累積，每學期末依各校規定時間上傳，<strong className="text-rose-500">錯過無法補救</strong></p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">課程成果件數</h3>
                <div className="text-xl font-black text-slate-800">每學期至多 6 件</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">高三下勾選提交至多 3 件。強調課程關聯與學科素養。</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">多元表現件數</h3>
                <div className="text-xl font-black text-slate-800">每學年至多 10 件</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">高三下勾選提交至多 10 件。包含社團、幹部、競賽、志工、自主學習等。</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">高三下統整</h3>
                <div className="text-xl font-black text-slate-800">學習歷程自述</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">包含高中學習歷程反思、就讀動機、未來學習計畫與生涯規劃。</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                  <Target className="w-5 h-5" />
                </div>
                為什麼要有學習歷程檔案？
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed font-medium">
                  過去的「備審資料」往往是高三下學期考完學測後，短短一兩個月內「擠」出來的產物，甚至出現過度包裝、花錢代作的問題。108課綱推動「學習歷程檔案」，核心目的在於實現<strong>「重在過程，不在結果」</strong>的教育理念：
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">呈現三年成長軌跡</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">紀錄真實的學習歷程，展現學生在高中三年的探索、改變與學術成長，而非一次性的火力展示。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">展現學科內外的核心素養</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">除了成績單上的冷硬數字，大學端更看重學生是否具備解決問題、批判思考與自主學習的軟實力。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">引導適性揚才</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">鼓勵學生提早進行生涯探索，透過修課與課外活動，發掘自己的熱情所在，並對接適合的大學校系。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">確保真實性與防弊</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">透過學校教師的認證機制（課程學習成果需經任課教師認證），確保資料的真實性，減少過度包裝與代寫疑慮。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Tab */}
        {activeTab === 'course' && (
           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
               <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                   <BookOpen className="w-5 h-5" />
                 </div>
                 課程學習成果撰寫框架
               </h2>
               <p className="text-slate-700 leading-relaxed font-medium mb-6">
                 課程學習成果是教授評估你是否具備該科系基礎學科能力的重要依據。請務必挑選與你「未來想申請科系」高度相關的課程（如：想讀資工，就挑數學、資訊課程；想讀財金，就挑公民、數學）。
               </p>
               <div className="space-y-4">
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <h3 className="font-bold text-slate-900 text-lg">百字簡述（Summary）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      教授看一份備審的時間非常短，這100字是決定他要不要繼續往下看的關鍵。請精煉寫出：<strong>這門課是什麼？你做了什麼專題/報告？你學到的最核心能力是什麼？</strong><br/>
                      <span className="inline-block mt-2 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md text-xs">範例：「本報告透過實地踏查與文獻回顧，分析在地商圈沒落原因，並提出數位轉型建議，培養了我數據分析與田野調查的能力。」</span>
                    </p>
                 </div>
                 
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <h3 className="font-bold text-slate-900 text-lg">動機與目的（Motivation）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      為什麼要做這個主題？是因為生活中的某個觀察？還是為了解決某個痛點？展現你的「問題意識」。
                    </p>
                 </div>

                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <h3 className="font-bold text-slate-900 text-lg">探究過程與方法（Process & Method）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      不要只放結果！教授更看重你「怎麼得到這個結果的」。你用了什麼實驗方法？發了多少問卷？如何分析數據？過程中遇到了什麼困難（Bug、數據不合理）？你又是如何解決的？<br/>
                      <strong>展現解決問題的能力，比完美的成功結果更吸引人。</strong>
                    </p>
                 </div>

                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
                      <h3 className="font-bold text-slate-900 text-lg">反思與收穫（Reflection）</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium pl-11">
                      你從這個報告中學到了什麼硬實力（如Python程式能力、SPSS統計）與軟實力（如團隊溝通、時間管理）？這個經驗如何幫助你面對未來的挑戰？
                    </p>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Extracurricular Tab */}
        {activeTab === 'extracurricular' && (
           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -z-10"></div>
               <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                 <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                   <Award className="w-5 h-5" />
                 </div>
                 多元表現佈局策略
               </h2>
               <p className="text-slate-700 leading-relaxed font-medium mb-6">
                 多元表現涵蓋了你課堂之外的所有軌跡。大學端希望看到的是一個「立體的人」，而不只是個讀書機器。重質不重量，不需要十項全能，但需要有1-2個你願意投入極大熱情的「亮點」。
               </p>
               <div className="grid sm:grid-cols-2 gap-6">
                 {/* Card 1 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Target className="w-4 h-4 text-indigo-500" />
                       自主學習計畫
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      這是展現你「學習熱忱」與「規劃能力」的最佳欄位。你學了什麼不是重點（就算是學烤餅乾也可以），重點是你的<strong>計畫是否合理、你是否確實執行、遇到困難怎麼解決</strong>。
                    </p>
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full inline-block">大學教授最看重的項目之一</div>
                 </div>
                 
                 {/* Card 2 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <User className="w-4 h-4 text-emerald-500" />
                       社團參與與幹部經驗
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      不要只放一張當社長的聘書，那沒有意義。請具體寫出你<strong>辦了什麼活動、帶領了多少人、解決了什麼人際衝突、拉了多少贊助</strong>，並學到了什麼領導或溝通技巧。
                    </p>
                 </div>

                 {/* Card 3 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Award className="w-4 h-4 text-amber-500" />
                       檢定證照與競賽
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      如果有與你想申請科系相關的檢定（如語文檢定、APCS程式檢定）當然很好。但如果沒有也沒關係，不必為了湊數去考不相關的證照。競賽未得獎也能寫，重點是<strong>參賽過程的磨練</strong>。
                    </p>
                 </div>

                 {/* Card 4 */}
                 <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 transition-transform hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                       <Lightbulb className="w-4 h-4 text-rose-500" />
                       志工服務與其他
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                      重點在於你的「心得與成長」，而非時數的多寡。如果只是去掃地，但你觀察到了社區的環保問題並提出反思，這就是一份很棒的多元表現。<strong>強調你的社會關懷與實踐力。</strong>
                    </p>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Reflection Tab */}
        {activeTab === 'reflection' && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  自我覺察的反思結構 (ORID)
                </h2>
                <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
                  <p>教授想看的不是「活動內容的流水帳」，而是「活動帶給你的改變」。建議使用業界與學界廣泛應用的 <strong>ORID 焦點討論法</strong> 來結構化你的反思：</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1">
                      <div className="text-indigo-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm">O</div> Objective (客觀事實)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>發生了什麼事？</strong> 客觀、具體地簡述活動內容、你在團隊中的角色、以及你遇到的具體事件或困難。</p>
                      <div className="p-3 bg-white rounded-xl text-xs text-slate-500 border border-slate-200 border-l-4 border-l-indigo-500">
                        <strong>❌ 錯誤示範：</strong> 我參加了資訊社，做了一個專題。<br/>
                        <strong>✅ 正確示範：</strong> 我在組內負責後端資料庫建置，但在整合階段遇到了 API 資料格式與前端不一致的衝突問題。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1">
                      <div className="text-rose-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-sm">R</div> Reflective (感受與反應)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>你當下有什麼感覺？</strong> 誠實面對自己的情緒。面對困難時的挫折、解決問題後的成就感，這讓你看起來是個真實的人。</p>
                      <div className="p-3 bg-white rounded-xl text-xs text-slate-500 border border-slate-200 border-l-4 border-l-rose-500">
                        <strong>❌ 錯誤示範：</strong> 我覺得很開心，學到很多。<br/>
                        <strong>✅ 正確示範：</strong> 當下覺得非常焦慮且有挫折感，因為距離發表只剩兩天，我很怕拖累團隊進度。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1">
                      <div className="text-emerald-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-sm">I</div> Interpretive (詮釋與意義)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>你學到了什麼？</strong> 找出事件背後的意義，發現自己的優缺點。你是如何解決問題的？</p>
                      <div className="p-3 bg-white rounded-xl text-xs text-slate-500 border border-slate-200 border-l-4 border-l-emerald-500">
                        <strong>❌ 錯誤示範：</strong> 我學會了溝通很重要。<br/>
                        <strong>✅ 正確示範：</strong> 我學到了系統化除錯的方法。我主動召集前端同學比對 JSON 格式，發現溝通斷層的原因在於缺乏統一的規格文件。
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-transform hover:-translate-y-1">
                      <div className="text-amber-600 font-black text-xl mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-sm">D</div> Decisional (決定與行動)</div>
                      <p className="text-sm text-slate-600 mb-3"><strong>未來你會怎麼做？</strong> 將學到的經驗應用在未來，並嘗試將這個行動連結到你想申請的科系特質。</p>
                      <div className="p-3 bg-white rounded-xl text-xs text-slate-500 border border-slate-200 border-l-4 border-l-amber-500">
                        <strong>❌ 錯誤示範：</strong> 我以後會更努力學習。<br/>
                        <strong>✅ 正確示範：</strong> 我決定未來在任何專案初期，都要先建立標準化的 API 規格書。這次經驗也讓我確信，我想進入資管系深化專案管理與系統分析的能力。
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* Optimization Tab */}
        {activeTab === 'optimization' && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
             <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -z-10"></div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                  不同入學管道的履歷優化建議
                </h2>

                <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1 bg-slate-50 rounded-xl border border-slate-200 mt-6 mb-6">
                  <button
                    onClick={() => setOptTab('high_school')}
                    className={\`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 \${optTab === 'high_school' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}\`}
                  >
                    大學申請入學 (高中)
                  </button>
                  <button
                    onClick={() => setOptTab('vocational')}
                    className={\`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 \${optTab === 'vocational' ? 'bg-white text-teal-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}\`}
                  >
                    四技二專甄選 (高職)
                  </button>
                  <button
                    onClick={() => setOptTab('special')}
                    className={\`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex-1 \${optTab === 'special' ? 'bg-white text-amber-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}\`}
                  >
                    特殊選才
                  </button>
                </div>

                <div className="space-y-8 min-h-[250px]">
                  {optTab === 'high_school' && (
                    <div className="p-6 border-l-4 border-indigo-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <BookOpen className="w-5 h-5 text-indigo-500" />
                         大學申請入學
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-indigo-50 p-4 rounded-xl">
                        <strong>評分核心：</strong> 普大教授非常看重「學術探究精神」、「邏輯論述能力」以及「高中三年的成長軌跡」。他們想知道你是否具備應付大學學術研究的基礎能力。
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">精準對接「校系分則」與「核心素養」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">在上傳資料前，務必查閱該校系的「準備指引」。如果該系看重「溝通協調」，你的檔案就必須強調團隊合作的經驗；若看重「邏輯推理」，就必須展現你的數理分析或程式專題。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現「學術潛力」與「研究方法」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">在課程成果或自主學習中，不要只給出結論。請詳細說明你的「文獻回顧」、「實驗設計」、「問卷發放與統計方法」。證明你懂「怎麼做研究」。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">決勝關鍵：「學習歷程自述」 (高三下)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">這是一份總結。你必須清晰地串聯這三年的所有亮點，並回答三個問題：<strong>為什麼是這個領域？為什麼是這所學校？這三年你做了什麼準備？</strong> (強烈建議採用 O-R-I-D 結構撰寫)</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {optTab === 'vocational' && (
                    <div className="p-6 border-l-4 border-teal-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Target className="w-5 h-5 text-teal-500" />
                         四技二專甄選入學 (高職生)
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-teal-50 p-4 rounded-xl">
                        <strong>評分核心：</strong> 科大教授最看重的是「專業實作能力」、「即戰力」與「對產業的認知」。他們想找的是動手能力強，且了解業界趨勢的學生。
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">絕對核心：「專題實作與實習科目成果」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">這是科大端審查的重中之重。請詳細說明你在專題團隊中的「具體技術貢獻」，務必附上清晰的成品照片、系統架構圖、程式碼片段或設計草圖，證明這真的是你做的。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">放大「專業證照」的價值</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">如果有乙級以上證照，一定要在多元表現中獨立成篇。不要只放一張證書，要寫出你「為了考取這張證照付出了什麼訓練」、「這張證照代表你具備了什麼產業技能」。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現對「產業生態」的認知</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">若有建教合作、校外實習、或是參加業界講座的經驗，請在自述中強調。展現你對該領域職場環境的認知、實務抗壓性，以及與業界接軌的企圖心。</p>
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
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-amber-50 p-4 rounded-xl">
                        <strong>評分核心：</strong> 不看學測成績，專門尋找具有「極度突出的單科偏才」、「特殊領域卓越成就」或是「處於特殊境遇卻展現強大韌性」的學生。
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">聚焦放大「極端亮點」 (偏才型)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">版面極其珍貴，不要放平庸的在校成績單或普通的志工獎狀。把所有版面留給你的「特殊成就」（如：奧林匹亞競賽國手、大型開源專案貢獻者、發表過國際論文、具備特殊發明專利等）。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">強調「影響力」與「獨特性」</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">你的特殊才能是否對他人或社會產生了實質影響？例如：你寫了一個幫助視障者的APP並上架獲得大量下載。這比單純的程式比賽得獎更具說服力。</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">3</div>
                           <div>
                              <strong className="text-slate-900 block mb-1">展現逆境中的韌性 (特殊境遇型)</strong>
                              <p className="text-sm text-slate-600 leading-relaxed">若是因家庭經濟、偏鄉資源缺乏等特殊境遇報考，請在自述中真誠展現你「如何在資源極度匱乏的情況下，依然保持強大的學習動機並取得突破」。教授看重的是你的「韌性」與未來的「潛力」。</p>
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
           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
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
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900">及早規劃，學期末立刻整理</strong>
                        <p className="text-sm text-emerald-800/80">人的記憶是不可靠的。每學期期末考完，就應該立刻把當學期的報告、照片、心得整理成 PDF 上傳。千萬不要拖到系統快關閉才草草了事。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900">展現「失敗與修正」的真實過程</strong>
                        <p className="text-sm text-emerald-800/80">教授不喜歡看完美的假人。如果你在實驗中失敗了，或是專題進度大落後，請寫出你「為什麼失敗」、「你是如何找出問題並修正的」。這會讓你展現出極高的抗壓性與解決問題的能力。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-emerald-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-1 text-emerald-900">排版乾淨俐落，重點螢光筆標示</strong>
                        <p className="text-sm text-emerald-800/80">教授審查時間有限。請善用粗體字、列點說明（Bullet points）、圖表輔助。第一頁強烈建議放上「百字摘要」，讓教授一秒抓住重點。</p>
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
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-rose-100">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900">只有照片和獎狀，毫無反思文字</strong>
                        <p className="text-sm text-rose-800/80">教授無法通靈。放了十張參加營隊的照片，卻不寫你學到了什麼，這份資料的價值就是零。<strong>沒有反思的紀錄，就是無效的紀錄。</strong></p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-rose-100">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900">過度包裝、抄襲與找人代寫</strong>
                        <p className="text-sm text-rose-800/80">大學教授閱卷無數，是不是高中生自己寫的口吻，一眼就能看穿。若被發現代寫或使用 ChatGPT 直出而未經消化，二階面試時絕對會被問倒，甚至直接面臨取消資格的風險。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-rose-900 font-medium leading-relaxed bg-white/60 p-4 rounded-2xl border border-rose-100">
                      <div className="p-1 bg-white rounded-full text-rose-500 shrink-0 mt-0.5 shadow-sm border border-rose-200">
                        <XIcon className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="block mb-1 text-rose-900">小學生日記般的流水帳心得</strong>
                        <p className="text-sm text-rose-800/80">「今天天氣很好，大家都很熱情，我學到很多，謝謝老師。」這種心得毫無意義。請具體寫出「學到了什麼能力（如：資料統整、上台簡報技巧）」以及「如何應用在未來」。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
           </div>
        )}
      </div>`;

  code = code.substring(0, startIdx) + replacement + '\n      </div>\n    </div>\n  );\n}\n\n' + code.substring(endIdx);
  fs.writeFileSync('PortfolioGuide.tsx', code);
  console.log("Success");
} else {
  console.log("Markers not found");
}
