import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompareTool } from '@/components/tools/CompareTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
  description: 'Compare two PDF files side-by-side with synchronized scrolling. Spot contract revisions, redlines, and edits 100% locally with zero server uploads.',
  keywords: 'compare pdf documents, compare pdf files, compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff, contract comparison tool online, spot differences in pdf, audit pdf redlines, compare revised pdf with original, pdf diff viewer online free, visual contract audit, compare signed pdf vs draft',
  alternates: buildAlternates('/tools/compare-pdf'),
  openGraph: {
    title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
    description: 'Compare PDF documents online for free. Visual side-by-side diff tool with synchronized scrolling 100% locally in your browser. Easily audit contract redlines and revisions.',
    type: 'website',
  }
};

export default function ComparePdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Compare PDF Documents Side-by-Side',
          description: 'Compare two PDF files side-by-side with synchronized scrolling. Spot contract revisions, redlines, and edits 100% locally with zero server uploads.',
          url: '/tools/compare-pdf',
        }),
        faqSchema(toolContent['compare-pdf'].faqs),
        howToSchema({
          name: 'Compare PDF Documents Side-by-Side',
          description: toolContent['compare-pdf'].overview,
          url: '/tools/compare-pdf',
          steps: toolContent['compare-pdf'].steps,
        }),
      ]}badge="Diff Checker"
      title="Compare PDF Documents"
      description="Audit content differences side-by-side with synchronized viewport scrolling."
      extraSections={<ToolSeoContent content={toolContent['compare-pdf']} />}
    >
      <CompareTool />
    </ToolPageShell>
  );
}
