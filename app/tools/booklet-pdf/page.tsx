import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BookletTool } from '@/components/tools/BookletTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Booklet Maker � Free, Private, No Upload | iCreatePDF',
  description: 'Convert any PDF into a saddle-stitch booklet for double-sided printing. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/booklet-pdf'),
  openGraph: {
    title: 'PDF Booklet Maker � iCreatePDF',
    description: 'Convert any PDF into a saddle-stitch booklet for double-sided printing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Booklet Maker � iCreatePDF' }],
  },
};

export default function BookletToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF Booklet Maker',
        description: 'Convert any PDF into a saddle-stitch booklet for double-sided printing.',
        url: '/tools/booklet-pdf',
      })}
      badge="Printing Imposition"
      title="PDF Booklet Maker"
      description="Convert any PDF into a saddle-stitch booklet for double-sided printing."
      extraSections={<ToolSeoContent content={toolContent['booklet-pdf']} />}
    >
      <BookletTool />
    </ToolPageShell>
  );
}
