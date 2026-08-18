import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HEIC to PDF Free Online (iPhone Photos to PDF) | iCreatePDF',
  description: 'Convert Apple iPhone HEIC photos into high-quality PDF documents online free. 100% private client-side converter with zero server uploads.',
  keywords: 'heic to pdf, convert heic to pdf, convert heic to pdf on iphone, how to convert heic to pdf on iphone, iphone heic to pdf converter, convert iphone photos to pdf, apple live photo to pdf, heic image to pdf free, batch heic to pdf converter, convert heic without upload, private heic to pdf, best heic to pdf tool',
  alternates: buildAlternates('/tools/heic-to-pdf'),
  openGraph: {
    title: 'Convert HEIC to PDF Free Online (iPhone Photos to PDF) | iCreatePDF',
    description: 'Convert Apple iPhone HEIC photos into high-quality PDF documents online free. 100% private client-side converter with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert HEIC (iPhone Photos) to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert HEIC to PDF Free Online (iPhone Photos to PDF) | iCreatePDF',
    description: 'Convert Apple iPhone HEIC photos into high-quality PDF documents online free. 100% private client-side converter with zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function HeicToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('heic-to-pdf')}
      badge="Image Converter"
      title="HEIC to PDF"
      description="Drag & drop multiple HEIC images from iPhone, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['heic-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="heic" />
    </ToolPageShell>
  );
}
