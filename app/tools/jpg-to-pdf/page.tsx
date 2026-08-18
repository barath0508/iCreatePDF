import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter Free Online (Convert Images to PDF) | iCreatePDF',
  description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
  keywords: 'jpg to pdf, image to pdf, convert jpg to pdf, photo to pdf converter, picture to pdf online free, combine jpg to pdf, convert images into one pdf, jpeg to pdf converter, convert screenshot to pdf, multiple photos to one pdf, best jpg to pdf converter, jpg to pdf high quality, turn images into pdf free',
  alternates: buildAlternates('/tools/jpg-to-pdf'),
  openGraph: {
    title: 'JPG to PDF Converter Free Online (Convert Images to PDF) | iCreatePDF',
    description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert JPG Images to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPG to PDF Converter Free Online (Convert Images to PDF) | iCreatePDF',
    description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function JpgToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('jpg-to-pdf')}
      badge="Image Converter"
      title="JPG to PDF"
      description="Drag & drop multiple JPG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['jpg-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="jpg" />
    </ToolPageShell>
  );
}
