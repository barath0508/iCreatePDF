import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PNG to PDF Converter Free Online (Transparent Images to PDF) | iCreatePDF',
  description: 'Convert PNG images (including transparent PNGs) into high-quality PDF files online free. 100% private client-side converter without uploads.',
  keywords: 'png to pdf, convert png to pdf, transparent png to pdf, png images into one pdf, high quality png to pdf converter, combine png files to pdf, convert photos to pdf online free, transparent background png to pdf',
  alternates: buildAlternates('/tools/png-to-pdf'),
  openGraph: {
    title: 'PNG to PDF Converter Free Online (Transparent Images to PDF) | iCreatePDF',
    description: 'Convert PNG images (including transparent PNGs) into high-quality PDF files online free. 100% private client-side converter without uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PNG Images to PDF — iCreatePDF' }],
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
