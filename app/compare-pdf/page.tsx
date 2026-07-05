import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CompareTool } from '@/components/tools/CompareTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compare PDF Online - Sync Scroll Document Revision Check | iCreatePDF',
  description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
  keywords: 'compare pdf, compare two pdfs online, side by side pdf compare, sync scroll pdf, visual pdf diff',
  alternates: buildAlternates('/compare-pdf'),
  openGraph: {
    title: 'Compare PDF Online - Sync Scroll Document Revision Check | iCreatePDF',
    description: 'Compare two PDF document versions side-by-side with synchronized scrolling locally in the browser. Easily audit content differences.',
    type: 'website',
  }
};

export default function ComparePdfPage() {
  return (
    <ToolPageShell badge="Diff Checker" title="Compare PDF Revisions" description="Audit content differences side-by-side with synchronized viewport scrolling.">
      <CompareTool />
    </ToolPageShell>
  );
}
