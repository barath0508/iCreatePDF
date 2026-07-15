import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PNG to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert PNG images to high-quality PDF files. Completely client-side, drag & drop multiple PNGs, reorder, adjust sizes, and download instantly.',
  keywords: 'convert png to pdf, png to pdf, convert image to pdf, free online png to pdf, private pdf converter',
  alternates: buildAlternates('/png-to-pdf'),
  openGraph: {
    title: 'Convert PNG to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert PNG images to high-quality PDF files. Completely client-side, drag & drop multiple PNGs, reorder, adjust sizes, and download instantly.',
    type: 'website',
  }
};

export default function PngToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PNG to PDF',
        description: 'Convert PNG images to high-quality PDF files. Completely client-side, drag & drop multiple PNGs, reorder, adjust sizes, and download instantly.',
        url: '/png-to-pdf',
      })}
      badge="Image Converter"
      title="PNG to PDF"
      description="Drag & drop multiple PNG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['png-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="png" />
    </ToolPageShell>
  );
}
