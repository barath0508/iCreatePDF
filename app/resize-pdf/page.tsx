import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ResizeTool } from '@/components/tools/ResizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Resize PDF Pages to A4, Letter or Custom Size Free | iCreatePDF',
  description: 'Normalize all PDF pages to A4, Letter, A3, Legal, or a custom size. Resize pages without losing content quality, entirely in your browser.',
  keywords: 'resize pdf pages, pdf page size changer, convert pdf to a4, pdf page resizer online free, normalize pdf size',
  alternates: buildAlternates('/resize-pdf'),
  openGraph: {
    title: 'Resize PDF Pages to A4, Letter or Custom Size Free | iCreatePDF',
    description: 'Normalize all PDF pages to A4, Letter, A3, Legal, or a custom size. Resize pages without losing content quality, entirely in your browser.',
    type: 'website',
  }
};

export default function ResizePdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF Page Resizer',
        description: 'Normalize all PDF pages to A4, Letter, A3, Legal, or a custom size. Resize pages without losing content quality, entirely in your browser.',
        url: '/resize-pdf',
      })}
      badge="Page Formatter"
      title="PDF Page Resizer"
      description="Normalize all PDF pages to A4, Letter, A3, Legal, or A5 in portrait or landscape orientation."
      extraSections={<ToolSeoContent content={toolContent['resize-pdf']} />}
    >
      <ResizeTool />
    </ToolPageShell>
  );
}
