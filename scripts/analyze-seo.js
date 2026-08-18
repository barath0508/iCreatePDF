const fs = require('fs');
const path = require('path');

const toolsDir = path.join(process.cwd(), 'app', 'tools');
const dirs = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

const report = [];

for (const dir of dirs) {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    report.push({ dir, status: 'MISSING_PAGE' });
    continue;
  }
  const content = fs.readFileSync(pagePath, 'utf8');
  
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  const kwMatch = content.match(/keywords:\s*['"`]([^'"`]+)['"`]/);
  const hasFullHelper = content.includes('getToolFullJsonLd');
  const hasJsonLd = content.includes('jsonLd=');
  const hasFaq = hasFullHelper || content.includes('faqSchema(');
  const hasHowTo = hasFullHelper || content.includes('howToSchema(');
  const hasToolSchema = hasFullHelper || content.includes('toolSchema(');

  const keywords = kwMatch ? kwMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];

  report.push({
    dir,
    title: titleMatch ? titleMatch[1] : null,
    descLength: descMatch ? descMatch[1].length : 0,
    keywordCount: keywords.length,
    keywords,
    hasJsonLd,
    hasFaq,
    hasHowTo,
    hasToolSchema
  });
}

fs.writeFileSync(path.join(__dirname, 'seo-audit-result.json'), JSON.stringify(report, null, 2));
console.log(`Audited ${report.length} tools. Output saved to scripts/seo-audit-result.json`);
