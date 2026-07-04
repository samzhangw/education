const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

const startStr = '{/* Right Interactive Widget */}';
const endStr = '        </section>';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
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
            </div>
          </div>
`;
  content = content.substring(0, startIndex) + newRightWidget + content.substring(endIndex);
  fs.writeFileSync('App.tsx', content);
  console.log("Replaced Right Widget successfully.");
} else {
  console.log("Could not find start or end index.");
}
