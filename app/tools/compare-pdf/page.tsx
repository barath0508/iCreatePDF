import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompareTool } from '@/components/tools/CompareTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
  description: 'Compare two PDF files side-by-side with synchronized scrolling. Spot contract revisions, redlines, and edits 100% locally with zero server uploads.',
  keywords: 'compare pdf documents, compare pdf files, compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff, contract comparison tool online, spot differences in pdf, audit pdf redlines, compare revised pdf with original, pdf diff viewer online free, visual contract audit, compare signed pdf vs draft, legal document comparison free',
  alternates: buildAlternates('/tools/compare-pdf'),
  openGraph: {
    title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
    description: 'Compare two PDF files side-by-side with synchronized scrolling. Spot contract revisions, redlines, and edits 100% locally with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Compare PDF Documents Side-by-Side — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
    description: 'Compare two PDF files side-by-side with synchronized scrolling. Spot contract revisions, redlines, and edits 100% locally with zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ComparePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('compare-pdf')}
      badge="Diff Checker"
      title="Compare PDF Documents"
      description="Audit content differences side-by-side with synchronized viewport scrolling."
      extraSections={<ToolSeoContent content={toolContent['compare-pdf']} />}
    >
      <CompareTool />
    </ToolPageShell>
  );
}
