import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToPngTool } from '@/components/tools/PdfToPngTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to PNG Converter Free Online (Lossless 300 DPI) | iCreatePDF',
  description: 'Convert PDF pages into crisp, lossless PNG images online for free. Extract transparent backgrounds, choose resolution up to 300 DPI, and download single pages or batch ZIP 100% privately.',
  keywords: 'pdf to png, convert pdf to png, pdf to png converter, extract png from pdf, pdf to transparent png, pdf to png 300 dpi, high resolution pdf to png, convert pdf pages to png, batch pdf to png converter, lossless pdf to image, turn pdf into png online free',
  alternates: buildAlternates('/tools/pdf-to-png'),
  openGraph: {
    title: 'PDF to PNG Converter Free Online (Lossless 300 DPI) | iCreatePDF',
    description: 'Convert PDF pages into crisp, lossless PNG images online for free. Extract transparent backgrounds, choose resolution up to 300 DPI, and download single pages or batch ZIP 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF Pages to Lossless PNG Images — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to PNG Converter Free Online (Lossless 300 DPI) | iCreatePDF',
    description: 'Convert PDF pages into crisp, lossless PNG images online for free. Extract transparent backgrounds, choose resolution up to 300 DPI, and download single pages or batch ZIP 100% privately.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfToPngPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-to-png')}
      badge="Lossless Extraction"
      title="Convert PDF to PNG"
      description="Extract PDF pages as razor-sharp, lossless PNG images with alpha transparency support. Processes 100% locally in your browser memory."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-png']} />}
    >
      <PdfToPngTool />
    </ToolPageShell>
  );
}
