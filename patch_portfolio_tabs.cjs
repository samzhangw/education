const fs = require('fs');
let code = fs.readFileSync('PortfolioGuide.tsx', 'utf8');

code = code.replace(
  /<div className="w-full flex lg:flex-col overflow-x-auto scrollbar-hide gap-2 p-1 lg:p-4 bg-slate-100\/70 lg:bg-white rounded-2xl border border-slate-200\/60 lg:border-slate-100 lg:shadow-sm backdrop-blur-md lg:backdrop-blur-none">/g,
  '<div role="tablist" aria-label="學習歷程指南" className="w-full flex lg:flex-col overflow-x-auto scrollbar-hide gap-2 p-1 lg:p-4 bg-slate-100/70 lg:bg-white rounded-2xl border border-slate-200/60 lg:border-slate-100 lg:shadow-sm backdrop-blur-md lg:backdrop-blur-none">'
);

code = code.replace(
  /<button\n                key=\{tab\.id\}\n                onClick=\{\(\) => setActiveTab\(tab\.id as any\)\}/g,
  '<button\n                key={tab.id}\n                role="tab"\n                aria-selected={activeTab === tab.id}\n                aria-controls={`panel-${tab.id}`}\n                onClick={() => setActiveTab(tab.id as any)}'
);

code = code.replace(
  /\{activeTab === 'overview' && \(\n          <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-300">/g,
  '{activeTab === \'overview\' && (\n          <div id="panel-overview" role="tabpanel" className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-300">'
);

code = code.replace(
  /\{activeTab === 'course' && \(\n           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">/g,
  '{activeTab === \'course\' && (\n           <div id="panel-course" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">'
);

code = code.replace(
  /\{activeTab === 'extracurricular' && \(\n           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">/g,
  '{activeTab === \'extracurricular\' && (\n           <div id="panel-extracurricular" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">'
);

code = code.replace(
  /\{activeTab === 'reflection' && \(\n          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">/g,
  '{activeTab === \'reflection\' && (\n          <div id="panel-reflection" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">'
);

code = code.replace(
  /\{activeTab === 'optimization' && \(\n          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">/g,
  '{activeTab === \'optimization\' && (\n          <div id="panel-optimization" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">'
);

code = code.replace(
  /\{activeTab === 'tips' && \(\n           <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">/g,
  '{activeTab === \'tips\' && (\n           <div id="panel-tips" role="tabpanel" className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">'
);

fs.writeFileSync('PortfolioGuide.tsx', code);
console.log("Patched PortfolioGuide tab attributes");
