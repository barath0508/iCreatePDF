import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PNG to PDF Converter Free Online (Transparent Images to PDF) | iCreatePDF',
  description: 'Convert PNG images (including transparent PNGs) into high-quality PDF files online free. 100% private client-side converter without uploads.',
  keywords: 'png to pdf, convert png to pdf, transparent png to pdf, png images into one pdf, high quality png to pdf converter, combine png files to pdf, convert photos to pdf online free, transparent background png to pdf, turn png screenshots into pdf document, png to pdf converter free, convert png image to pdf document, transparent png into pdf, high res png to pdf, batch convert png to pdf, save png photos as pdf, png to pdf no watermark',
  alternates: buildAlternates('/tools/png-to-pdf'),
  openGraph: {
    title: 'PNG to PDF Converter Free Online (Transparent Images to PDF) | iCreatePDF',
    description: 'Convert PNG images (including transparent PNGs) into high-quality PDF files online free. 100% private client-side converter without uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PNG Images to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to PDF Converter Free Online (Transparent Images to PDF) | iCreatePDF',
    description: 'Convert PNG images (including transparent PNGs) into high-quality PDF files online free. 100% private client-side converter without uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PngToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('png-to-pdf')}
      badge="Image Converter"
      title="PNG to PDF"
      description="Drag & drop multiple PNG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['png-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="png" />
    </ToolPageShell>
  );
}
