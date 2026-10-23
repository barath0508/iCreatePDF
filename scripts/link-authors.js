const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '../app/blogs');
const files = fs.readdirSync(blogsDir);

let count = 0;
for (const file of files) {
  const fullPath = path.join(blogsDir, file, 'page.tsx');
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const target = '<span className="font-semibold text-foreground/60">Barath R</span>';
    const replacement = '<Link href="/authors/barath-r" className="font-semibold text-foreground/70 hover:text-brand underline">Barath R</Link>';
    
    if (content.includes(target)) {
      // Ensure Link is imported
      if (!content.includes("import Link from 'next/link';") && !content.includes('import Link from "next/link";')) {
        content = "import Link from 'next/link';\n" + content;
      }
      content = content.replace(target, replacement);
      fs.writeFileSync(fullPath, content, 'utf8');
      count++;
      console.log(`Updated author link in: ${file}`);
    }
  }
}

console.log(`\nSuccessfully updated author links in ${count} blog posts.`);
