import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BarcodeToPdfTool } from '@/components/tools/BarcodeToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Barcode to PDF Generator — Code 128, EAN, UPC & QR Labels | iCreatePDF',
  description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode sheets as printable PDFs. 100% private client-side label generator.',
  keywords: 'barcode to pdf, barcode generator pdf, code 128 generator, ean-13 barcode generator, upc-a barcode generator, code 39 generator, data matrix generator, pdf417 generator, free barcode to pdf, product label generator, printable barcode sheet pdf, generate barcode labels a4, barcode batch generator pdf, qr and barcode pdf maker, retail barcode labels pdf',
  alternates: buildAlternates('/tools/barcode-to-pdf'),
  openGraph: {
    title: 'Barcode to PDF Generator: Code 128, EAN-13, UPC-A & Mor...',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcodes. Download as A4 PDF. Processed 100% locally in-browser for complete privacy.',
    type: 'website',
  }
};

export default function BarcodeToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Barcode to PDF Generator',
          description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode sheets as printable PDFs. 100% private client-side label generator.',
          url: '/tools/barcode-to-pdf',
        }),
        faqSchema(toolContent['barcode-to-pdf'].faqs),
        howToSchema({
          name: 'Barcode to PDF Generator',
          description: toolContent['barcode-to-pdf'].overview,
          url: '/tools/barcode-to-pdf',
          steps: toolContent['barcode-to-pdf'].steps,
        }),
      ]}badge="Barcode Generator"
      title="Barcode to PDF"
      description="Generate a clean A4 PDF with a Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['barcode-to-pdf']} />}
    >
      <BarcodeToPdfTool />
    </ToolPageShell>
  );
}
