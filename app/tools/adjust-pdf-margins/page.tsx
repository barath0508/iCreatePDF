import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { AdjustMarginsTool } from '@/components/tools/AdjustMarginsTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Adjust PDF Margins Online Free — Add Border Padding | iCreatePDF',
  description: 'Add margin padding to PDF documents for hole-punching, binder binding, or notes. 100% private client-side processing without server uploads.',
  keywords: 'adjust pdf margins, add margin to pdf, increase pdf margins, adjust margins pdf online, margins for hole punching pdf, binder margins pdf, print margins pdf, change pdf margins free, crop-free margins pdf, expand pdf margins online, pdf page border padding, resize pdf margins for printing, wide margin pdf creator, pdf margin expander free, add white border to pdf, gutter margin pdf creator',
  alternates: buildAlternates('/tools/adjust-pdf-margins'),
  openGraph: {
    title: 'Adjust PDF Margins Online Free — Add Border Padding | iCreatePDF',
    description: 'Add margin padding to PDF documents for hole-punching, binder binding, or notes. 100% private client-side processing without server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Adjust PDF Margins — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adjust PDF Margins Online Free — Add Border Padding | iCreatePDF',
    description: 'Add margin padding to PDF documents for hole-punching, binder binding, or notes. 100% private client-side processing without server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function AdjustMarginsToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('adjust-pdf-margins')}
      badge="Page Layout"
      title="Adjust PDF Margins"
      description="Add extra border padding for hole-punching, binder binding, or margin notes."
      extraSections={<ToolSeoContent content={toolContent['adjust-pdf-margins']} />}
    >
      <AdjustMarginsTool />
    </ToolPageShell>
  );
}
