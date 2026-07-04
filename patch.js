const fs = require('fs');
let code = fs.readFileSync('PortfolioGuide.tsx', 'utf8');

const target = `      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1 bg-slate-100/70 rounded-2xl border border-slate-200/60 sticky top-[72px] sm:top-24 z-30 backdrop-blur-md">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={\`
              flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center
              \${activeTab === tab.id 
                 ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' 
                 : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }
            \`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Areas */}
      <div className="min-h-[50vh]">`;

const replacement = `      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Tabs / Sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex lg:flex-col overflow-x-auto scrollbar-hide gap-2 p-1 lg:p-4 bg-slate-100/70 lg:bg-white rounded-2xl border border-slate-200/60 lg:border-slate-100 lg:shadow-sm sticky top-[72px] sm:top-24 z-30 backdrop-blur-md lg:backdrop-blur-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={\`
                flex items-center gap-3 px-4 sm:px-6 lg:px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center lg:justify-start
                \${activeTab === tab.id 
                  ? 'bg-white lg:bg-indigo-50 text-indigo-600 shadow-sm lg:shadow-none border border-slate-200/50 lg:border-transparent' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }
              \`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Areas */}
        <div className="flex-1 min-w-0 min-h-[50vh]">`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  
  // also need to close the extra div at the end of the file
  const endTarget = `      </div>\n    </div>\n  );\n}`;
  const endReplacement = `      </div>\n      </div>\n    </div>\n  );\n}`;
  code = code.replace(endTarget, endReplacement);
  
  fs.writeFileSync('PortfolioGuide.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
