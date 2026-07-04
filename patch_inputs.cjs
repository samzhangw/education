const fs = require('fs');

let appTsx = fs.readFileSync('App.tsx', 'utf8');

appTsx = appTsx.replace(
  /<input \n                           type="text" \n                           readOnly/g,
  '<input \n                           aria-label="分享連結"\n                           type="text" \n                           readOnly'
);

appTsx = appTsx.replace(
  /<input\n                    type="text"\n                    value=\{searchTerm\}/g,
  '<input\n                    aria-label="搜尋重要日程"\n                    type="text"\n                    value={searchTerm}'
);

appTsx = appTsx.replace(
  /<input\n                      type="text"\n                      className="block w-full pl-11 pr-4/g,
  '<input\n                      aria-label="搜尋文章標題、標籤或摘要"\n                      type="text"\n                      className="block w-full pl-11 pr-4'
);

fs.writeFileSync('App.tsx', appTsx);
console.log("Patched App.tsx inputs");
