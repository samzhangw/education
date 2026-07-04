const fs = require('fs');
let appTsx = fs.readFileSync('App.tsx', 'utf8');

appTsx = appTsx.replace(
  /<button \n                      onClick=\{\(\) => setSearchTerm\(''\)\}/g,
  '<button \n                      onClick={() => setSearchTerm(\'\')}\n                      aria-label="清除搜尋"'
);

appTsx = appTsx.replace(
  /<button onClick=\{\(\) => setCalendarMonth\(new Date\(calendarMonth\.getFullYear\(\), calendarMonth\.getMonth\(\) - 1, 1\)\)\} className="p-2\.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">/g,
  '<button aria-label="上個月" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">'
);

appTsx = appTsx.replace(
  /<button onClick=\{\(\) => setCalendarMonth\(new Date\(calendarMonth\.getFullYear\(\), calendarMonth\.getMonth\(\) \+ 1, 1\)\)\} className="p-2\.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">/g,
  '<button aria-label="下個月" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-100">'
);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched more App.tsx");
