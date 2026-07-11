import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompareTool } from '@/components/tools/CompareTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compare PDF Files: Side-by-Side Visual Diff Tool | iCreatePDF',
  description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
  keywords: 'compare pdf files, compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff',
  alternates: buildAlternates('/compare-pdf'),
  openGraph: {
    title: 'Compare PDF Files: Side-by-Side Visual Diff Tool | iCreatePDF',
    description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
    type: 'website',
  }
};

export default function ComparePdfPage() {
  return (
    <ToolPageShell
      badge="Diff Checker"
      title="Compare PDF Revisions"
      description="Audit content differences side-by-side with synchronized viewport scrolling."
      extraSections={<ToolSeoContent content={toolContent['compare-pdf']} />}
    >
      <CompareTool />
    </ToolPageShell>
  );
}
