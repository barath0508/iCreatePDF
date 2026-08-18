const fs = require('fs');
const path = require('path');

const seoConfig = require('./seo-master-config.json');
const toolsDir = path.join(process.cwd(), 'app', 'tools');

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
  title: '${conf.title.replace(/'/g, "\\'")}',
  description: '${conf.description.replace(/'/g, "\\'")}',
  keywords: '${conf.keywords.replace(/'/g, "\\'")}',
  alternates: buildAlternates('/tools/${slug}'),
  openGraph: {
    title: '${conf.title.replace(/'/g, "\\'")}',
    description: '${conf.description.replace(/'/g, "\\'")}',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: '${conf.heading.replace(/'/g, "\\'")} — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${conf.title.replace(/'/g, "\\'")}',
    description: '${conf.description.replace(/'/g, "\\'")}',
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
