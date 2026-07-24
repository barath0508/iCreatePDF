import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter \u2014 Free, Private, No Upload | iCreatePDF',
  description: 'Convert JPG, JPEG, PNG, WEBP, or HEIC images to PDF free online. Drag & drop multiple photos, reorder pages, and download instantly. 100% private \u2014 files never leave your browser.',
  keywords: 'jpg to pdf, jpeg to pdf, convert jpg to pdf, image to pdf, png to pdf, webp to pdf, heic to pdf, jpg to pdf free, convert image to pdf online, multiple jpg to pdf, jpg to pdf no upload, iphone photos to pdf, combine images to pdf, photo to pdf converter, jpg to pdf converter free, convert jpeg to pdf online, image to pdf converter online free, how to convert jpg to pdf, make pdf from image, jpg to pdf without quality loss, compress jpg to pdf, jpg to pdf iphone, jpg to pdf android',
  alternates: buildAlternates('/tools/jpg-to-pdf'),
  openGraph: {
    title: 'JPG to PDF Converter \u2014 Free, Private, No Upload | iCreatePDF',
    description: 'Convert JPG, JPEG, PNG, WEBP, or HEIC images to PDF free. No uploads, no account. 100% private browser-based processing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'JPG to PDF Converter \u2014 iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPG to PDF Converter \u2014 Free, Private, No Upload | iCreatePDF',
    description: 'Convert JPG, JPEG, PNG, WEBP, or HEIC images to PDF free. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function JpgToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'JPG to PDF',
        description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
        url: '/tools/jpg-to-pdf',
      })}
      badge="Image Converter"
      title="JPG to PDF"
      description="Drag & drop multiple JPG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['jpg-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="jpg" />
    </ToolPageShell>
  );
}
