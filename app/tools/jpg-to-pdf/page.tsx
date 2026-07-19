import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert JPG or JPEG images to high-quality PDF files. Drag and drop multiple JPGs, reorder, and download instantly. Processed 100% locally for absolute privacy.',
  keywords: 'jpg to pdf, convert jpg to pdf, jpeg to pdf, convert image to pdf, free online jpg to pdf, private pdf converter',
  alternates: buildAlternates('/tools/jpg-to-pdf'),
  openGraph: {
    title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert JPG or JPEG images to high-quality PDF files. Drag and drop multiple JPGs, reorder, and download instantly. Processed 100% locally for absolute privacy.',
    type: 'website',
  }
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
