const fs = require('fs');

let content = fs.readFileSync('VisualMap.tsx', 'utf8');

// find the div with onClick and add role, tabIndex, and onKeyDown
content = content.replace(
  /<div \n        onClick=\{\(\) => isClickable && onPathClick\(path\)\}/g,
  '<div \n        role={isClickable ? "button" : undefined}\n        tabIndex={isClickable ? 0 : undefined}\n        onKeyDown={(e) => { if (isClickable && (e.key === \'Enter\' || e.key === \' \')) { e.preventDefault(); onPathClick(path); } }}\n        onClick={() => isClickable && onPathClick(path)}'
);

fs.writeFileSync('VisualMap.tsx', content);
console.log("Patched VisualMap.tsx");
