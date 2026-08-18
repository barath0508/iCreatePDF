import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ResizeTool } from '@/components/tools/ResizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Resize PDF Pages — Change Page Size to A4, Letter, Legal | iCreatePDF',
  description: 'Scale and resize PDF document pages to standard sizes (A4, Letter, Legal, A3) with custom scaling. 100% private in-browser page resizer.',
  keywords: 'resize pdf, change pdf page size, scale pdf pages, resize pdf to a4, resize pdf to letter size, resize pdf dimensions, scale down pdf page area, fit pdf to page size, change pdf canvas size online, modify pdf page width and height, rescale pdf pages to letter size',
  alternates: buildAlternates('/tools/resize-pdf'),
  openGraph: {
    title: 'Resize PDF Pages — Change Page Size to A4, Letter, Legal | iCreatePDF',
    description: 'Scale and resize PDF document pages to standard sizes (A4, Letter, Legal, A3) with custom scaling. 100% private in-browser page resizer.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Resize PDF Page Dimensions — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resize PDF Pages — Change Page Size to A4, Letter, Legal | iCreatePDF',
    description: 'Scale and resize PDF document pages to standard sizes (A4, Letter, Legal, A3) with custom scaling. 100% private in-browser page resizer.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ResizePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('resize-pdf')}
      badge="Page Formatter"
      title="PDF Page Resizer"
      description="Normalize all PDF pages to A4, Letter, A3, Legal, or A5 in portrait or landscape orientation."
      extraSections={<ToolSeoContent content={toolContent['resize-pdf']} />}
    >
      <ResizeTool />
    </ToolPageShell>
  );
}
