const fs = require('fs');
let appTsx = fs.readFileSync('App.tsx', 'utf8');

appTsx = appTsx.replace(
  /title="小字體"/g,
  'title="小字體" aria-label="小字體"'
);
appTsx = appTsx.replace(
  /title="中字體"/g,
  'title="中字體" aria-label="中字體"'
);
appTsx = appTsx.replace(
  /title="大字體"/g,
  'title="大字體" aria-label="大字體"'
);
appTsx = appTsx.replace(
  /title=\{articleTheme === 'light' \? '切換深色模式' : '切換淺色模式'\}/g,
  'title={articleTheme === \'light\' ? \'切換深色模式\' : \'切換淺色模式\'} aria-label={articleTheme === \'light\' ? \'切換深色模式\' : \'切換淺色模式\'}'
);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched article buttons in App.tsx");
