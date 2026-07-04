const fs = require('fs');

let appTsx = fs.readFileSync('App.tsx', 'utf8');

// 1. Home button
appTsx = appTsx.replace(
  /<div className="flex items-center gap-3 group cursor-pointer" onClick=\{\(\) => window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)\}>/g,
  '<button className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })} aria-label="回到最上方">'
);
appTsx = appTsx.replace(
  /<\/span>\n\s*<\/div>\n\s*<div className="flex items-center gap-2 sm:gap-4">/g,
  '</span>\n          </button>\n          \n          <div className="flex items-center gap-2 sm:gap-4">'
);

// 2. Share button 
appTsx = appTsx.replace(
  /<button \n                onClick=\{\(\) => setIsShareModalOpen\(true\)\}/g,
  '<button \n                onClick={() => setIsShareModalOpen(true)}\n                aria-label="分享頁面"'
);

// 3. Menu open button
appTsx = appTsx.replace(
  /<button \n                onClick=\{\(\) => setIsDrawerOpen\(true\)\}/g,
  '<button \n                onClick={() => setIsDrawerOpen(true)}\n                aria-label="開啟選單"'
);

// 4. Menu close button
appTsx = appTsx.replace(
  /<button onClick=\{\(\) => setIsDrawerOpen\(false\)\} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">/g,
  '<button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" aria-label="關閉選單">'
);

// 5. Share modal close
appTsx = appTsx.replace(
  /<button onClick=\{\(\) => setIsShareModalOpen\(false\)\} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">/g,
  '<button onClick={() => setIsShareModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors" aria-label="關閉分享">'
);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched App.tsx");

let pathCard = fs.readFileSync('PathCard.tsx', 'utf8');
pathCard = pathCard.replace(
  /<button\n                      onClick=\{\(e\) => onSearchBrochure\(e, path\)\}/g,
  '<button\n                      onClick={(e) => onSearchBrochure(e, path)}\n                      aria-label={`搜尋 ${path.name} 簡章`}'
);
pathCard = pathCard.replace(
  /<a\n                          href=\{path\.link\}\n                         target="_blank"/g,
  '<a\n                          href={path.link}\n                         target="_blank"\n                         aria-label={`前往 ${path.name} 官網`}'
);
fs.writeFileSync('PathCard.tsx', pathCard);
console.log("Patched PathCard.tsx");

let printModal = fs.readFileSync('PrintScheduleModal.tsx', 'utf8');
printModal = printModal.replace(
  /<button onClick=\{onClose\} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">/g,
  '<button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors" aria-label="關閉列印視窗">'
);
fs.writeFileSync('PrintScheduleModal.tsx', printModal);
console.log("Patched PrintScheduleModal.tsx");

