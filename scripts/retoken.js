const fs = require('fs');
const path = require('path');

const mappings = [
  // Brand color mappings to pure high-contrast monochrome
  { from: /\bbg-purple-600\b/g, to: 'bg-foreground' },
  { from: /\bhover:bg-purple-700\b/g, to: 'hover:bg-foreground/90' },
  { from: /\bhover:bg-purple-600\b/g, to: 'hover:bg-foreground/90' },
  { from: /\btext-purple-400\b/g, to: 'text-foreground' },
  { from: /\btext-purple-500\b/g, to: 'text-foreground' },
  { from: /\btext-purple-600\b/g, to: 'text-foreground' },
  { from: /\bborder-purple-500\b/g, to: 'border-foreground/50' },
  { from: /\bborder-purple-600\b/g, to: 'border-foreground/50' },
  { from: /\bbg-purple-500\/(\d+)\b/g, to: 'bg-foreground/$1' },
  { from: /\bbg-purple-600\/(\d+)\b/g, to: 'bg-foreground/$1' },
  { from: /\baccent-purple-500\b/g, to: 'accent-foreground' },
  { from: /#a78bfa/g, to: '#ffffff' },
  { from: /#7e5de0/g, to: '#ffffff' },
  
  // Zinc dark mode hardcoded values to design system tokens
  { from: /\bbg-zinc-950\b/g, to: 'bg-card' },
  { from: /\bbg-zinc-900\/30\b/g, to: 'bg-card/40' },
  { from: /\bbg-zinc-900\/50\b/g, to: 'bg-card/60' },
  { from: /\bbg-zinc-900\b/g, to: 'bg-card' },
  { from: /\btext-zinc-400\b/g, to: 'text-muted-foreground' },
  { from: /\btext-zinc-500\b/g, to: 'text-muted-foreground' },
  { from: /\bborder-zinc-800\b/g, to: 'border-border' },
  { from: /\bborder-zinc-700\b/g, to: 'border-border' },
];

function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        processDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const m of mappings) {
        if (m.from.test(content)) {
          content = content.replace(m.from, m.to);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated tokens in: ${fullPath}`);
      }
    }
  }
}

const targetDirs = process.argv.slice(2);
if (targetDirs.length === 0) {
  console.log('Usage: node scripts/retoken.js <dir1> <dir2>...');
  process.exit(1);
}

for (const d of targetDirs) {
  const resolved = path.resolve(d);
  if (fs.existsSync(resolved)) {
    processDir(resolved);
  }
}
