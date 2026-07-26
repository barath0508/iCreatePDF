import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PNG to PDF Free Online — 100% Private (No Upload) | iCreatePDF',
  description: 'Convert PNG images to PDF online free. ⚡ Preserve image transparency and quality. 100% secure client-side browser processing.',
  keywords: 'convert png to pdf, png to pdf, convert image to pdf, free online png to pdf, private pdf converter',
  alternates: buildAlternates('/tools/png-to-pdf'),
  openGraph: {
    title: 'Convert PNG to PDF Free Online — 100% Private | iCreatePDF',
    description: 'Convert PNG images into a high-quality PDF document online free. Drag and drop, reorder pages. Processed 100% locally.',
    type: 'website',
  }
};

export default function PngToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'PNG to PDF',
          description: 'Convert PNG images to high-quality PDF files. Completely client-side, drag & drop multiple PNGs, reorder, adjust sizes, and download instantly.',
          url: '/tools/png-to-pdf',
        }),
        faqSchema([
          {
            question: 'How do I convert a PNG image to PDF for free?',
            answer: 'Drop your PNG files into the area, set page order and margins, and click Convert to PDF to process and download locally.',
          },
          {
            question: 'Does this tool preserve PNG image transparency?',
            answer: 'Yes, transparency is preserved. The PDF generation engine places PNG image data directly into the PDF streams.',
          },
          {
            question: 'Can I convert PNG to PDF without uploading my files?',
            answer: 'Yes. iCreatePDF processes your files entirely inside your browser memory. Your images are never sent to external servers.',
          },
        ]),
        howToSchema({
          name: 'PNG to PDF',
          description: 'Convert PNG images to high-quality PDF files free online.',
          url: '/tools/png-to-pdf',
          steps: [
            { title: 'Upload PNGs', description: 'Drag and drop your PNG images into the converter.' },
            { title: 'Order & Adjust', description: 'Sort the pages and adjust margins or layout.' },
            { title: 'Download PDF', description: 'Click Convert to PDF and download the result instantly.' },
          ],
        }),
      ]}
      badge="Image Converter"
      title="PNG to PDF"
      description="Drag & drop multiple PNG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['png-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="png" />
    </ToolPageShell>
  );
}
