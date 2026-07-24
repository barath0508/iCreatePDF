const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /bg-brand hover:bg-brand\/90 text-foreground/g, to: 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' },
  { from: /bg-brand text-foreground/g, to: 'bg-primary text-primary-foreground font-bold' },
  { from: /bg-foreground text-foreground/g, to: 'bg-primary text-primary-foreground font-bold' },
  { from: /bg-foreground\/90 text-foreground/g, to: 'bg-primary text-primary-foreground font-bold' },
  { from: /bg-emerald-600 (.*?)text-foreground/g, to: 'bg-emerald-600 $1text-white' },
  { from: /bg-emerald-500 (.*?)text-foreground/g, to: 'bg-emerald-600 $1text-white' },
  { from: /text-foreground\/30 cursor-not-allowed/g, to: 'text-muted-foreground/60 cursor-not-allowed' },
];

const dirPath = path.resolve('components/tools');
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx'));

let count = 0;
for (const file of files) {
  const filePath = path.join(dirPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const r of replacements) {
    if (r.from.test(content)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed button text contrast in: ${file}`);
    count++;
  }
}

console.log(`Total files updated: ${count}`);
