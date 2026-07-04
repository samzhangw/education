const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');
code = code.replace(
  /<div className="min-h-screen font-sans pb-24 relative mesh-bg text-slate-800 overflow-x-hidden">/,
  '<div className="min-h-screen font-sans pb-24 relative mesh-bg text-slate-800 overflow-clip">'
);
fs.writeFileSync('App.tsx', code);
console.log("Patched App.tsx overflow again");
