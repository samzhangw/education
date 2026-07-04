const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

code = code.replace(
  /max-w-5xl/g,
  'max-w-6xl'
);
code = code.replace(
  /<main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto/g,
  '<main className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'
);
fs.writeFileSync('App.tsx', code);
console.log("Patched layout");
