import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HEIC to PDF Free Online (iPhone Photos to PDF) | iCreatePDF',
  description: 'Convert Apple iPhone HEIC photos into high-quality PDF documents online free. 100% private client-side converter with zero server uploads.',
  keywords: 'heic to pdf, convert heic to pdf, convert heic to pdf on iphone, how to convert heic to pdf on iphone, iphone heic to pdf converter, convert iphone photos to pdf, apple live photo to pdf, heic image to pdf free, batch heic to pdf converter, convert heic without upload, private heic to pdf',
  alternates: buildAlternates('/tools/heic-to-pdf'),
  openGraph: {
    title: 'Convert HEIC to PDF Free Online (iPhone Photos to PDF) | iCreatePDF',
    description: 'Convert Apple iPhone HEIC photos into high-quality PDF documents online free. 100% private client-side converter with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert HEIC (iPhone Photos) to PDF — iCreatePDF' }],
  },
          {
            question: 'Is my data private when converting HEIC files?',
            answer: 'Yes, 100% private. The HEIC conversion runs locally using WebAssembly and client libraries. No image file is sent to external servers.',
          },
          {
            question: 'Can I combine multiple HEIC images into one PDF?',
            answer: 'Yes. You can upload multiple HEIC images, drag them to arrange the sequence, and compile them into a single PDF document.',
          },
        ]),
        howToSchema({
          name: 'HEIC to PDF',
          description: 'Convert iPhone HEIC photos to PDF document online free.',
          url: '/tools/heic-to-pdf',
          steps: [
            { title: 'Upload HEIC Photos', description: 'Drag and drop your HEIC files into the browser converter.' },
            { title: 'Sort & Reorder', description: 'Drag the photo thumbnails to arrange them in the desired order.' },
            { title: 'Convert & Save', description: 'Click Convert to PDF to compile and download your new PDF file.' },
          ],
        }),
      ]}
      badge="Image Converter"
      title="HEIC to PDF"
      description="Drag & drop multiple HEIC images from iPhone, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={<ToolSeoContent content={toolContent['heic-to-pdf']} />}
    >
      <ConverterSection initialFormatFilter="heic" />
    </ToolPageShell>
  );
}
