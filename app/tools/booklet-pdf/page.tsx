import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BookletTool } from '@/components/tools/BookletTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Booklet Maker — Convert PDF to Saddle-Stitch Booklet | iCreatePDF',
  description: 'Convert any PDF into a ready-to-print saddle-stitch booklet for double-sided printing. 100% private client-side imposition layout generator.',
  keywords: 'pdf booklet maker, convert pdf to booklet, booklet printing format, saddle stitch pdf, booklet layout generator, print pdf as booklet, booklet pdf creator free, make booklet from pdf online, fold and staple pdf booklet, imposition pdf creator, duplex booklet print layout, 2-up booklet pdf converter, booklet maker without acrobat, mini book pdf generator, zine pdf printer layout',
  alternates: buildAlternates('/tools/booklet-pdf'),
  openGraph: {
    title: 'PDF Booklet Maker — Convert PDF to Saddle-Stitch Booklet | iCreatePDF',
    description: 'Convert any PDF into a ready-to-print saddle-stitch booklet for double-sided printing. 100% private client-side imposition layout generator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Booklet Maker — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Booklet Maker — Convert PDF to Saddle-Stitch Booklet | iCreatePDF',
    description: 'Convert any PDF into a ready-to-print saddle-stitch booklet for double-sided printing. 100% private client-side imposition layout generator.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function BookletToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('booklet-pdf')}
      badge="Printing Imposition"
      title="PDF Booklet Maker"
      description="Convert any PDF into a saddle-stitch booklet for double-sided printing."
      extraSections={<ToolSeoContent content={toolContent['booklet-pdf']} />}
    >
      <BookletTool />
    </ToolPageShell>
  );
}
