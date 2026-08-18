import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter Free Online (Convert Images to PDF) | iCreatePDF',
  description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
  keywords: 'jpg to pdf, image to pdf, convert jpg to pdf, photo to pdf converter, picture to pdf online free, combine jpg to pdf, convert images into one pdf, jpeg to pdf converter, convert screenshot to pdf, multiple photos to one pdf, best jpg to pdf converter, jpg to pdf high quality',
  alternates: buildAlternates('/tools/jpg-to-pdf'),
  openGraph: {
    title: 'JPG to PDF Converter Free Online (Convert Images to PDF) | iCreatePDF',
    description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert JPG Images to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert JPG to PDF Free Online — 100% Private | iCreatePDF',
    description: 'Convert JPG, JPEG, PNG, WEBP, or HEIC images to PDF free. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function JpgToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert JPG Images to PDF',
          description: 'Convert JPG, PNG, WEBP, and BMP images into a single polished PDF document. Reorder photos and adjust margins 100% privately in-browser.',
          url: '/tools/jpg-to-pdf',
        }),
        faqSchema(toolContent['jpg-to-pdf'].faqs),
        howToSchema({
          name: 'Convert JPG Images to PDF',
          description: toolContent['jpg-to-pdf'].overview,
          url: '/tools/jpg-to-pdf',
          steps: toolContent['jpg-to-pdf'].steps,
        }),
      ]}),
        howToSchema({
          name: 'JPG to PDF',
          description: 'Convert JPG/JPEG images to a high-quality PDF document online free.',
          url: '/tools/jpg-to-pdf',
          steps: [
            { title: 'Upload Images', description: 'Drag and drop your JPG/JPEG files into the converter.' },
            { title: 'Arrange Pages', description: 'Drag thumbnails to reorder pages and set layout preferences.' },
            { title: 'Convert & Save', description: 'Click Convert to PDF and download your compiled PDF file instantly.' },
          ],
        }),
      ]}
      badge="Image Converter"
      title="JPG to PDF"
      description="Drag & drop multiple JPG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['jpg-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="jpg" />
    </ToolPageShell>
  );
}
