import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Free Online (Extract Pages) | iCreatePDF',
  description: 'Convert PDF pages to high-quality JPG images free online. Processed 100% locally in browser memory with zero server uploads for absolute privacy.',
  keywords: 'convert pdf to jpg, pdf to jpg, pdf to image, extract pdf pages to jpg, private pdf to jpg, no upload pdf to jpg',
  alternates: buildAlternates('/tools/pdf-to-jpg'),
  openGraph: {
    title: 'Convert PDF to JPG Online — Extract PDF Pages | iCreatePDF',
    description: 'Convert PDF pages to high-quality JPG images free online. 100% private local browser processing.',
    type: 'website',
  }
};

export default function PdfToJpgPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert PDF to JPG',
          description: 'Convert PDF pages to JPG images in seconds. 100% client-side, drag & drop files, and download image ZIP instantly.',
          url: '/tools/pdf-to-jpg',
        }),
        faqSchema([
          {
            question: 'How do I convert PDF pages to JPG images?',
            answer: 'Upload your PDF file. The browser engine renders each page into a high-fidelity image canvas. You can select specific pages to convert and download them as a ZIP archive.',
          },
          {
            question: 'Does this tool upload my PDF to a server?',
            answer: 'No. The conversion is completed entirely inside your browser memory using PDFJS. Your files are never uploaded to any external server.',
          },
          {
            question: 'Can I choose the output image quality?',
            answer: 'Yes, you can adjust the rendering scale factor to get high-resolution images or standard web-friendly versions.',
          },
        ]),
        howToSchema({
          name: 'Convert PDF to JPG',
          description: 'Extract PDF document pages as high-quality JPG images locally.',
          url: '/tools/pdf-to-jpg',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF document into the browser.' },
            { title: 'Set Quality & Pages', description: 'Select the image resolution scale and the pages you want to convert.' },
            { title: 'Download ZIP', description: 'Click Convert PDF to JPG and download your images in a ZIP file.' },
          ],
        }),
      ]}
      badge="PDF Extractor"
      title="Convert PDF to JPG"
      description="Extract each page of your PDF file as a high-quality JPEG image. All processes run locally and package downloads into a ZIP."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-jpg']} />}
    >
      <PdfToJpgTool />
    </ToolPageShell>
  );
}
