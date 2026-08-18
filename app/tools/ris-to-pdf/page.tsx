import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RisToPdfTool } from '@/components/tools/RisToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'RIS to PDF Converter — Format Academic Citations to PDF | iCreatePDF',
  description: 'Convert RIS citation files into beautifully formatted reference bibliographies in PDF format. 100% private academic formatting tool.',
  keywords: 'ris to pdf, convert ris citation to pdf, bibliography to pdf converter, ris file to formatted reference pdf, endnote ris to pdf, zotero citation to pdf, academic references to pdf, export ris bibliography pdf, citation list to printable pdf, convert ris citation list to pdf, format ris bibliography online, ris reference file to pdf, academic citation list to pdf, export ris citations to printable pdf',
  alternates: buildAlternates('/tools/ris-to-pdf'),
  openGraph: {
    title: 'RIS to PDF Converter — Format Academic Citations to PDF | iCreatePDF',
    description: 'Convert RIS citation files into beautifully formatted reference bibliographies in PDF format. 100% private academic formatting tool.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'RIS to PDF Citation Converter — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIS to PDF Converter — Format Academic Citations to PDF | iCreatePDF',
    description: 'Convert RIS citation files into beautifully formatted reference bibliographies in PDF format. 100% private academic formatting tool.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function RisToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('ris-to-pdf')}
      badge="Citation Converter"
      title="RIS to PDF Citation Converter"
      description="Drop your bibliographic reference file (.ris) to parse and compile it into a beautifully formatted bibliography PDF."
      extraSections={<ToolSeoContent content={toolContent['ris-to-pdf']} />}
    >
      <div className="relative z-10">
        <RisToPdfTool />
      </div>
    </ToolPageShell>
  );
}
