const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Remove overflow-clip from the main wrapper
code = code.replace(
  /<div className="min-h-screen font-sans pb-24 relative mesh-bg text-slate-800 overflow-clip">/,
  '<div className="min-h-screen font-sans pb-24 relative text-slate-800">'
);

// Add the background mesh to an absolute div to contain its overflow
code = code.replace(
  /\{\/\* Delicate background patterns \*\/\}/,
  `{/* Delicate background patterns */}
      <div className="fixed inset-0 z-[-1] overflow-hidden mesh-bg pointer-events-none"></div>`
);

fs.writeFileSync('App.tsx', code);
console.log("Patched App.tsx completely removing overflow from wrapper");
