const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Add scrollPositions ref
code = code.replace(
  /const \[tipsSearchTerm, setTipsSearchTerm\] = useState\(''\);/,
  "const [tipsSearchTerm, setTipsSearchTerm] = useState('');\n  const scrollPositions = React.useRef<{ [key: string]: number }>({});"
);

// Replace handleOpenPathDetail and add handleClosePathDetail
code = code.replace(
  /const handleOpenPathDetail = \(path: AdmissionPath\) => \{\n    setSelectedPathDetail\(path\);\n    sendUserLog\('view_path_detail', path\.id, path\.title\);\n  \};/,
  `const handleOpenPathDetail = (path: AdmissionPath) => {
    scrollPositions.current['paths_main'] = window.scrollY;
    setSelectedPathDetail(path);
    sendUserLog('view_path_detail', path.id, path.title);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const handleClosePathDetail = () => {
    setSelectedPathDetail(null);
    setTimeout(() => {
      if (scrollPositions.current['paths_main'] !== undefined) {
        window.scrollTo({ top: scrollPositions.current['paths_main'], behavior: 'instant' });
      }
    }, 0);
  };`
);

// Use handleClosePathDetail
code = code.replace(
  /<PathDetailView path=\{selectedPathDetail\} onClose=\{\(\) => setSelectedPathDetail\(null\)\} \/>/g,
  '<PathDetailView path={selectedPathDetail} onClose={handleClosePathDetail} />'
);

// Add handleOpenTip and handleCloseTip
code = code.replace(
  /const toggleTimelineFilter = \(id: string\) => \{/,
  `const handleOpenTip = (tip: PreparationTip) => {
    scrollPositions.current['tips_main'] = window.scrollY;
    setSelectedTip(tip);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const handleCloseTip = () => {
    setSelectedTip(null);
    setTimeout(() => {
      if (scrollPositions.current['tips_main'] !== undefined) {
        window.scrollTo({ top: scrollPositions.current['tips_main'], behavior: 'instant' });
      }
    }, 0);
  };

  const toggleTimelineFilter = (id: string) => {`
);

// Replace setSelectedTip calls
code = code.replace(
  /onClick=\{\(\) => setSelectedTip\(null\)\}/g,
  'onClick={handleCloseTip}'
);

code = code.replace(
  /onClick=\{\(\) => \{ setSelectedTip\(tip\); window.scrollTo\(\{ top: 0, behavior: 'smooth' \}\); \}\}/g,
  'onClick={() => handleOpenTip(tip)}'
);

fs.writeFileSync('App.tsx', code);
console.log("Patched App.tsx scroll");
