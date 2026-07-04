const fs = require('fs');

let appTsx = fs.readFileSync('App.tsx', 'utf8');

// Patch Left Content
appTsx = appTsx.replace(
  /<div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-slate-100 border border-slate-200">\n                 <span className="relative flex h-2\.5 w-2\.5">\n                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"><\/span>\n                    <span className="relative inline-flex rounded-full h-2\.5 w-2\.5 bg-indigo-500"><\/span>\n                 <\/span>\n                 <span className="text-slate-700 text-sm font-bold tracking-wide">115 \/ 116 學年度資訊已更新<\/span>\n              <\/div>/,
  `<div className="inline-flex items-center gap-2.5 self-start px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/50 shadow-sm relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                 <Sparkles className="w-4 h-4 text-indigo-500" />
                 <span className="text-indigo-700 text-sm font-bold tracking-wide relative z-10">115 / 116 學年度資訊已更新</span>
              </div>`
);

appTsx = appTsx.replace(
  /<h1 className="text-4xl sm:text-5xl lg:text-\[3\.5rem\] xl:text-\[4rem\] font-black tracking-tight text-slate-900 leading-\[1\.15\] whitespace-nowrap">\n                 探索屬於你的\n                 <br \/>\n                 <span className="text-indigo-600">最佳升學路徑<\/span>\n              <\/h1>/,
  `<h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black tracking-tight text-slate-900 leading-[1.15] whitespace-nowrap">
                 探索屬於你的
                 <br />
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">最佳升學路徑</span>
              </h1>`
);

appTsx = appTsx.replace(
  /<p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">\n                我們為你整理了 115 學年度最完整的升學策略與關鍵時程，助你從容應對學測、統測與分科測驗，不錯過任何重要時刻。\n              <\/p>/,
  `<p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                我們為你整理了 115 學年度最完整的升學策略與關鍵時程，助你從容應對學測、統測與分科測驗，不錯過任何重要時刻。
              </p>`
);

appTsx = appTsx.replace(
  /<div className="flex flex-col sm:flex-row gap-4 mt-6">\n                <a \n                  href="#dashboard" \n                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group\/btn"\n                >\n                  查看倒數\n                  <ArrowRight className="w-5 h-5 group-hover\/btn:translate-x-1 transition-transform" \/>\n                <\/a>\n                <a \n                   href="#paths"\n                   className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center"\n                >\n                   了解管道\n                <\/a>\n              <\/div>/,
  `<div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a 
                  href="#dashboard" 
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  查看倒數
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a 
                   href="#paths"
                   className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all shadow-sm flex items-center justify-center"
                >
                   了解管道
                </a>
              </div>`
);

// Patch Right Widget
const oldRightWidget = `{/* Right Interactive Widget */}
            <div className="relative lg:pl-4">
               <div className="glass-panel rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                        <User className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-800">請選擇你的目前身分</h3>
                  </div>
                  <div className="space-y-4">
                     {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={\`w-full group relative flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 \${
                            activeCategory === cat.id
                              ? 'bg-slate-900 border-slate-900 shadow-md scale-[1.02]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }\`}
                        >
                           <div className="flex items-center gap-4 relative z-10">
                              <div className={\`w-1.5 h-12 rounded-full transition-colors \${
                                 activeCategory === cat.id ? 'bg-indigo-400' : 'bg-slate-200'
                              }\`}></div>
                              <div className="text-left">
                                 <div className={\`font-bold text-lg mb-0.5 \${
                                    activeCategory === cat.id ? 'text-white' : 'text-slate-800'
                                 }\`}>
                                    {cat.label}
                                 </div>
                                 <div className={\`text-sm \${
                                    activeCategory === cat.id ? 'text-slate-400' : 'text-slate-500'
                                 }\`}>
                                    {cat.description}
                                 </div>
                              </div>
                           </div>
                           
                           {activeCategory === cat.id && (
                              <div className="relative z-10 bg-white/10 p-2.5 rounded-full text-white">
                                 <Check className="w-5 h-5" strokeWidth={3} />
                              </div>
                           )}
                        </button>
                     ))}
                  </div>
               </div>
            </div>`;

const newRightWidget = `{/* Right Interactive Widget */}
            <div className="relative lg:pl-4">
               <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white/60 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                     <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm border border-indigo-100">
                        <User className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">請選擇你的目前身分</h3>
                       <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">為你推薦專屬升學資訊</p>
                     </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                     {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={\`w-full group relative flex flex-col p-5 sm:p-6 rounded-3xl border transition-all duration-300 text-left h-full \${
                            isActive
                              ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10 scale-[1.02]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
                          }\`}
                        >
                           <div className="flex items-center justify-between w-full mb-4">
                              <div className={\`p-2.5 rounded-xl transition-colors \${
                                isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                              }\`}>
                                {cat.id === 'high_school' ? <BookOpen className="w-5 h-5" /> :
                                 cat.id === 'vocational' ? <Zap className="w-5 h-5" /> :
                                 cat.id === 'junior_college' ? <Target className="w-5 h-5" /> :
                                 <Sparkles className="w-5 h-5" />}
                              </div>
                              <div className={\`w-7 h-7 rounded-full flex items-center justify-center transition-all \${
                                isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                              }\`}>
                                <ArrowRight className={\`w-4 h-4 transition-transform duration-300 \${isActive ? 'rotate-[-45deg]' : ''}\`} />
                              </div>
                           </div>
                           <div className={\`font-black text-lg sm:text-xl tracking-tight mb-1.5 \${
                              isActive ? 'text-white' : 'text-slate-800'
                           }\`}>
                              {cat.label}
                           </div>
                           <div className={\`text-xs sm:text-sm font-medium leading-relaxed \${
                              isActive ? 'text-slate-400' : 'text-slate-500'
                           }\`}>
                              {cat.description}
                           </div>
                        </button>
                     )})}
                  </div>
               </div>
            </div>`;

appTsx = appTsx.replace(oldRightWidget, newRightWidget);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched hero UI in App.tsx");
