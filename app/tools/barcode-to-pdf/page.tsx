import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BarcodeToPdfTool } from '@/components/tools/BarcodeToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Barcode to PDF Generator — Code 128, EAN, UPC & QR Labels | iCreatePDF',
  description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode sheets as printable PDFs. 100% private client-side label generator.',
  keywords: 'barcode to pdf, barcode generator pdf, code 128 generator, ean-13 barcode generator, upc-a barcode generator, code 39 generator, data matrix generator, pdf417 generator, free barcode to pdf, product label generator, printable barcode sheet pdf, generate barcode labels a4, barcode batch generator pdf, qr and barcode pdf maker, retail barcode labels pdf, inventory barcode sheet generator',
  alternates: buildAlternates('/tools/barcode-to-pdf'),
  openGraph: {
    title: 'Barcode to PDF Generator — Code 128, EAN, UPC & QR Labels | iCreatePDF',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode sheets as printable PDFs. 100% private client-side label generator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Barcode to PDF Generator — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barcode to PDF Generator — Code 128, EAN, UPC & QR Labels | iCreatePDF',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode sheets as printable PDFs. 100% private client-side label generator.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function BarcodeToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('barcode-to-pdf')}
      badge="Barcode Generator"
      title="Barcode to PDF"
      description="Generate a clean A4 PDF with a Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['barcode-to-pdf']} />}
    >
      <BarcodeToPdfTool />
    </ToolPageShell>
  );
}
