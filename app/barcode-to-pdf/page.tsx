import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BarcodeToPdfTool } from '@/components/tools/BarcodeToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Barcode to PDF Generator: Code 128, EAN-13, UPC-A & More | iCreatePDF',
  description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcodes and embed them into a clean A4 PDF. 100% client-side, free, no sign-up.',
  keywords: 'barcode to pdf, barcode generator pdf, code 128 generator, ean-13 barcode generator, upc-a barcode generator, code 39 generator, data matrix generator, pdf417 generator, free barcode to pdf, product label generator',
  alternates: buildAlternates('/barcode-to-pdf'),
  openGraph: {
    title: 'Barcode to PDF Generator: Code 128, EAN-13, UPC-A & More | iCreatePDF',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcodes and embed them into a clean A4 PDF. 100% client-side, free, no sign-up.',
    type: 'website',
  }
};

export default function BarcodeToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Barcode to PDF',
        description: 'Generate Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcodes and embed them into a clean A4 PDF.',
        url: '/barcode-to-pdf',
      })}
      badge="Barcode Generator"
      title="Barcode to PDF"
      description="Generate a clean A4 PDF with a Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 barcode. Instant live preview."
      extraSections={<ToolSeoContent content={toolContent['barcode-to-pdf']} />}
    >
      <BarcodeToPdfTool />
    </ToolPageShell>
  );
}
