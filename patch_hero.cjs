const fs = require('fs');

let appTsx = fs.readFileSync('App.tsx', 'utf8');

appTsx = appTsx.replace(
  /<div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center p-8 sm:p-14 lg:p-20">/g,
  '<div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center p-8 sm:p-14 lg:p-12 xl:p-16">'
);

appTsx = appTsx.replace(
  /<h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-\[1\.15\]">/g,
  '<h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black tracking-tight text-slate-900 leading-[1.15] whitespace-nowrap">'
);

appTsx = appTsx.replace(
  /\{\/\* Right Interactive Widget \*\/}\n            <div className="relative lg:pl-10">/g,
  '{/* Right Interactive Widget */}\n            <div className="relative lg:pl-4">'
);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched hero section in App.tsx");
