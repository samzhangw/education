const fs = require('fs');
let content = fs.readFileSync('Chat.tsx', 'utf8');

content = content.replace(
  /<input\n                type="text"\n                value=\{input\}/g,
  '<input\n                aria-label="輸入問題"\n                type="text"\n                value={input}'
);

fs.writeFileSync('Chat.tsx', content);
console.log("Patched Chat.tsx inputs");
