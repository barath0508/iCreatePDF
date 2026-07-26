const fs = require('fs');
const path = require('path');

function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        processDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('\uFFFD')) {
        // Replace U+FFFD with U+2014 (em-dash)
        content = content.replace(/\uFFFD/g, '—');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed encoding in: ${fullPath}`);
      }
    }
  }
}

const rootDir = path.resolve(__dirname, '../');
processDir(path.join(rootDir, 'app'));
processDir(path.join(rootDir, 'components'));
