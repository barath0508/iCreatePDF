import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompareTool } from '@/components/tools/CompareTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compare PDF Documents Side-by-Side Online Free | iCreatePDF',
  description: 'Compare PDF documents online for free. Visual side-by-side diff tool with synchronized scrolling 100% locally in your browser. Easily audit contract redlines and revisions.',
  keywords: 'compare pdf documents, compare pdf files, compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff',
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
      jsonLd={toolSchema({
        name: 'Compare PDF Documents',
        description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
        url: '/tools/compare-pdf',
      })}
      badge="Diff Checker"
      title="Compare PDF Documents"
      description="Audit content differences side-by-side with synchronized viewport scrolling."
      extraSections={<ToolSeoContent content={toolContent['compare-pdf']} />}
    >
      <CompareTool />
    </ToolPageShell>
  );
}
