const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');
code = code.replace(
  /<div className="min-h-screen font-sans pb-24 relative overflow-hidden mesh-bg text-slate-800">/,
  '<div className="min-h-screen font-sans pb-24 relative mesh-bg text-slate-800 overflow-x-hidden">'
);
fs.writeFileSync('App.tsx', code);
console.log("Patched App.tsx overflow");
