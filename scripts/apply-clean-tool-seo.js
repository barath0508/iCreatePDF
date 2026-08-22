const fs = require('fs');
const path = require('path');

const seoConfig = require('./seo-master-config.json');
const toolsDir = path.join(process.cwd(), 'app', 'tools');

function escapeForSingleQuotedTsString(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}

function updateToolPage(slug) {
  const filePath = path.join(toolsDir, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing file for ${slug}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const conf = seoConfig[slug];
  if (!conf) return;

  // 1. Update imports from @/lib/seo
  content = content.replace(
    /import\s*\{[^}]*\}\s*from\s*['"]@\/lib\/seo['"]/,
    `import { buildAlternates, getToolFullJsonLd } from '@/lib/seo'`
  );

  // 2. Build the new metadata block
  const newMetadata = `export const metadata: Metadata = {
  title: '${escapeForSingleQuotedTsString(conf.title)}',
  description: '${escapeForSingleQuotedTsString(conf.description)}',
  keywords: '${escapeForSingleQuotedTsString(conf.keywords)}',
  alternates: buildAlternates('/tools/${slug}'),
  openGraph: {
    title: '${escapeForSingleQuotedTsString(conf.title)}',
    description: '${escapeForSingleQuotedTsString(conf.description)}',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: '${escapeForSingleQuotedTsString(conf.heading)} — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${escapeForSingleQuotedTsString(conf.title)}',
    description: '${escapeForSingleQuotedTsString(conf.description)}',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};`;

  // Replace export const metadata: Metadata = { ... };
  content = content.replace(
    /export\s+const\s+metadata:\s*Metadata\s*=\s*\{[\s\S]*?\n\};/,
    newMetadata
  );

  // 3. For all tools except hub page, update jsonLd
  if (slug !== 'no-upload-pdf-tools') {
    content = content.replace(
      /jsonLd=\{[\s\S]*?\n(\s*(?:badge=|title=|description=|extraSections=|>))/,
      `jsonLd={getToolFullJsonLd('${slug}')}\n$1`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// Run across all tools
const allSlugs = Object.keys(seoConfig);
console.log(`Applying clean SEO updates to all ${allSlugs.length} tools...`);
for (const slug of allSlugs) {
  updateToolPage(slug);
}
console.log('Finished applying SEO updates!');
