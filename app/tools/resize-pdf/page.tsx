import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ResizeTool } from '@/components/tools/ResizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Resize PDF Pages — Change Page Size to A4, Letter, Legal | iCreatePDF',
  description: 'Scale and resize PDF document pages to standard sizes (A4, Letter, Legal, A3) with custom scaling. 100% private in-browser page resizer.',
  keywords: 'resize pdf, change pdf page size, scale pdf pages, resize pdf to a4, resize pdf to letter size, resize pdf dimensions, scale down pdf page area, fit pdf to page size, change pdf canvas size online',
  alternates: buildAlternates('/tools/resize-pdf'),
  openGraph: {
    title: 'Resize PDF Pages to A4, Letter or Custom Size | iCreatePDF',
    description: 'Normalize all PDF pages to A4, Letter, A3, Legal, or a custom size. Resize pages without losing content quality, entirely in your browser.',
    type: 'website',
  }
};

export default function ResizePdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Resize PDF Page Dimensions',
          description: 'Scale and resize PDF document pages to standard sizes (A4, Letter, Legal, A3) with custom scaling. 100% private in-browser page resizer.',
          url: '/tools/resize-pdf',
        }),
        faqSchema(toolContent['resize-pdf'].faqs),
        howToSchema({
          name: 'Resize PDF Page Dimensions',
          description: toolContent['resize-pdf'].overview,
          url: '/tools/resize-pdf',
          steps: toolContent['resize-pdf'].steps,
        }),
      ]}badge="Page Formatter"
      title="PDF Page Resizer"
      description="Normalize all PDF pages to A4, Letter, A3, Legal, or A5 in portrait or landscape orientation."
      extraSections={<ToolSeoContent content={toolContent['resize-pdf']} />}
    >
      <ResizeTool />
    </ToolPageShell>
  );
}
