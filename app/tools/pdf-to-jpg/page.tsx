import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToJpgTool } from '@/components/tools/PdfToJpgTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Free Online (Convert PDF to Images) | iCreatePDF',
  description: 'Convert PDF pages into high-resolution JPG or PNG images online for free. Download individual pages or a batch ZIP archive 100% privately.',
  keywords: 'pdf to jpg, convert pdf to image, pdf to png converter, extract images from pdf, pdf to jpg 300 dpi, turn pdf into photo, convert pdf pages to jpeg, high resolution pdf to jpg, batch pdf to jpg converter, pdf to image online free',
  alternates: buildAlternates('/tools/pdf-to-jpg'),
  openGraph: {
    title: 'PDF to JPG Converter Free Online (Convert PDF to Images) | iCreatePDF',
    description: 'Convert PDF pages into high-resolution JPG or PNG images online for free. Download individual pages or a batch ZIP archive 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF Pages to JPG Images — iCreatePDF' }],
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
