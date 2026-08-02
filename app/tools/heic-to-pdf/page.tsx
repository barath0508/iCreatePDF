import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert HEIC to PDF Free Online (iPhone Photos) | iCreatePDF',
  description: 'Convert iPhone HEIC photos to PDF free online. ⚡ 100% private client-side converter — combine multiple HEIC files into one PDF without uploads.',
  keywords: 'how to convert heic to pdf on iphone, heic to pdf iphone, convert heic to pdf iphone, iphone heic to pdf converter, heic to pdf, convert heic to pdf, convert iphone heic to pdf, heic to pdf converter, convert heic to pdf offline, offline heic to pdf converter, convert heic to pdf locally, iphone heic to pdf private, local image converter',
  alternates: buildAlternates('/tools/heic-to-pdf'),
  openGraph: {
    title: 'Convert HEIC to PDF Free Online — iPhone Photos | iCreatePDF',
    description: 'Convert iPhone HEIC photos to PDF online. 100% local and private client-side converter, no file uploads. Reorder and save HEIC images to PDF instantly.',
    type: 'website',
  }
};

export default function HeicToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'HEIC to PDF',
          description: 'Convert iPhone HEIC photos to PDF directly in your browser. 100% local client-side conversion, zero server uploads, safe for sensitive photos.',
          url: '/tools/heic-to-pdf',
        }),
        faqSchema([
          {
            question: 'How do I convert HEIC photos to PDF on iPhone?',
            answer: 'Drop your HEIC files into the upload zone. The local conversion engine converts the HEIC image format to PDF pages client-side. Click Convert to PDF to save.',
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
