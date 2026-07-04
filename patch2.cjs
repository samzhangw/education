const fs = require('fs');
let code = fs.readFileSync('PortfolioGuide.tsx', 'utf8');

const target = `                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                  不同入學管道的履歷優化建議
                </h2>
                <div className="space-y-8 mt-8">
                  <div className="p-6 border-l-4 border-indigo-500 bg-slate-50 rounded-r-2xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">大學申請入學</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      <strong>重視：</strong> 學術探究精神、高中三年成長軌跡、跨領域學習。<br/>
                      <strong>優化建議：</strong> 
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      <li><strong>連結核心素養：</strong> 將自主學習或課程成果與該科系重視的「核心素養」連結。</li>
                      <li><strong>展現學術潛力：</strong> 專題報告應強調你的「研究方法」與「問題解決過程」，證明你具備大學所需的學術基礎。</li>
                      <li><strong>完整的高三下自述：</strong> 「學習歷程自述」是決勝關鍵，必須清晰交代「為什麼是這個科系」以及「這三年你做了什麼準備」。</li>
                    </ul>
                  </div>

                  <div className="p-6 border-l-4 border-teal-500 bg-slate-50 rounded-r-2xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">四技二專甄選入學 (高職生)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      <strong>重視：</strong> 專業實作能力、證照含金量、技職與業界接軌。<br/>
                      <strong>優化建議：</strong> 
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      <li><strong>凸顯專題實作：</strong> 這是科大教授最看重的部分。請詳細說明你在專題中的「技術貢獻」，並附上清晰的成品照片與架構圖。</li>
                      <li><strong>證照與技術展現：</strong> 如果有乙級以上證照，一定要在多元表現中重點放大其學習過程，不要只放一張證書。</li>
                      <li><strong>實習心得：</strong> 若有建教合作或校外實習經驗，請強調你對「職場環境」的認知與實務抗壓性。</li>
                    </ul>
                  </div>

                  <div className="p-6 border-l-4 border-amber-500 bg-slate-50 rounded-r-2xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">特殊選才</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      <strong>重視：</strong> 極度突出的單科偏才、特殊境遇中的強大韌性。<br/>
                      <strong>優化建議：</strong> 
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      <li><strong>聚焦「極端亮點」：</strong> 不要放平庸的成績單，把所有版面留給你的「特殊成就」（如國際競賽、大型開源專案、特殊專業領域）。</li>
                      <li><strong>故事性與影響力：</strong> 說明你的特殊才能如何對他人產生影響？如果是特殊境遇學生，請展現你在逆境中如何突破資源限制。</li>
                    </ul>
                  </div>
                </div>`;

const replacement = `                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
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
                    大學申請入學
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
                    <div className="p-6 border-l-4 border-indigo-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">大學申請入學</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        <strong>重視：</strong> 學術探究精神、高中三年成長軌跡、跨領域學習。<br/>
                        <strong>優化建議：</strong> 
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        <li><strong>連結核心素養：</strong> 將自主學習或課程成果與該科系重視的「核心素養」連結。</li>
                        <li><strong>展現學術潛力：</strong> 專題報告應強調你的「研究方法」與「問題解決過程」，證明你具備大學所需的學術基礎。</li>
                        <li><strong>完整的高三下自述：</strong> 「學習歷程自述」是決勝關鍵，必須清晰交代「為什麼是這個科系」以及「這三年你做了什麼準備」。</li>
                      </ul>
                    </div>
                  )}

                  {optTab === 'vocational' && (
                    <div className="p-6 border-l-4 border-teal-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">四技二專甄選入學 (高職生)</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        <strong>重視：</strong> 專業實作能力、證照含金量、技職與業界接軌。<br/>
                        <strong>優化建議：</strong> 
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        <li><strong>凸顯專題實作：</strong> 這是科大教授最看重的部分。請詳細說明你在專題中的「技術貢獻」，並附上清晰的成品照片與架構圖。</li>
                        <li><strong>證照與技術展現：</strong> 如果有乙級以上證照，一定要在多元表現中重點放大其學習過程，不要只放一張證書。</li>
                        <li><strong>實習心得：</strong> 若有建教合作或校外實習經驗，請強調你對「職場環境」的認知與實務抗壓性。</li>
                      </ul>
                    </div>
                  )}

                  {optTab === 'special' && (
                    <div className="p-6 border-l-4 border-amber-500 bg-slate-50 rounded-r-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">特殊選才</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        <strong>重視：</strong> 極度突出的單科偏才、特殊境遇中的強大韌性。<br/>
                        <strong>優化建議：</strong> 
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        <li><strong>聚焦「極端亮點」：</strong> 不要放平庸的成績單，把所有版面留給你的「特殊成就」（如國際競賽、大型開源專案、特殊專業領域）。</li>
                        <li><strong>故事性與影響力：</strong> 說明你的特殊才能如何對他人產生影響？如果是特殊境遇學生，請展現你在逆境中如何突破資源限制。</li>
                      </ul>
                    </div>
                  )}
                </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('PortfolioGuide.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
