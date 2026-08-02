import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert JPG to PDF Free Online (100% Private) | iCreatePDF',
  description: 'Convert JPG/JPEG images to a high-quality PDF document online free. ⚡ Fast, secure, and 100% local — drag & drop to reorder pages and save instantly.',
  keywords: 'jpg to pdf, jpeg to pdf, convert jpg to pdf, image to pdf, png to pdf, webp to pdf, heic to pdf, jpg to pdf free, convert image to pdf online, multiple jpg to pdf, jpg to pdf no upload, iphone photos to pdf, combine images to pdf, photo to pdf converter, jpg to pdf converter free, convert jpeg to pdf online, image to pdf converter online free, how to convert jpg to pdf, make pdf from image, jpg to pdf without quality loss, compress jpg to pdf, jpg to pdf iphone, jpg to pdf android',
  alternates: buildAlternates('/tools/jpg-to-pdf'),
  openGraph: {
    title: 'Convert JPG to PDF Free Online — 100% Private | iCreatePDF',
    description: 'Convert JPG, JPEG, PNG, WEBP, or HEIC images to PDF free. No uploads, no account. 100% private browser-based processing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'JPG to PDF Converter \u2014 iCreatePDF' }],
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
          name: 'JPG to PDF',
          description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
          url: '/tools/jpg-to-pdf',
        }),
        faqSchema([
          {
            question: 'How do I convert JPG images to PDF for free?',
            answer: 'Drag and drop your JPG or JPEG images into the upload box. Arrange the page order by dragging the thumbnails, adjust page layout parameters if needed, and click Convert to PDF.',
          },
          {
            question: 'Are my uploaded photos secure?',
            answer: 'Yes. iCreatePDF processes all image compilation client-side in your browser memory. Your images are never uploaded to any remote server.',
          },
          {
            question: 'Can I combine multiple JPG files into a single PDF?',
            answer: 'Yes, you can upload as many JPG/JPEG/PNG images as you want and combine them into a single PDF document in your desired page order.',
          },
        ]),
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
