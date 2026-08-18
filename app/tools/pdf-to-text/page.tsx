import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToTextTool } from '@/components/tools/PdfToTextTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Text Extractor Online Free — Convert PDF to TXT | iCreatePDF',
  description: 'Extract raw and structured text from PDF documents into clean .txt files online free. 100% private client-side text extractor without uploads.',
  keywords: 'pdf to text, extract text from pdf, convert pdf to txt, copy text from pdf, pdf to text converter online, plain text from pdf, batch pdf to text, extract words from pdf, parse text in pdf document, client side pdf text extractor',
  alternates: buildAlternates('/tools/pdf-to-text'),
  openGraph: {
    title: 'PDF to Text Extractor Online Free — Convert PDF to TXT | iCreatePDF',
    description: 'Extract raw and structured text from PDF documents into clean .txt files online free. 100% private client-side text extractor without uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Extract Text from PDF — iCreatePDF' }],
  },
          {
            question: 'Does PDF to text extraction upload my documents?',
            answer: 'No. The text parser operates entirely inside your local browser tab. No file data is sent to external servers.',
          },
          {
            question: 'Can I extract text from scanned PDF images?',
            answer: 'No, this tool extracts native text streams. For scanned PDF image documents, please use our PDF OCR Tool to run Optical Character Recognition.',
          },
        ]),
        howToSchema({
          name: 'PDF to Text Extractor',
          description: 'Extract plain text from your PDF documents locally in your browser.',
          url: '/tools/pdf-to-text',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF document into the text extractor.' },
            { title: 'Extract Text', description: 'Wait a fraction of a second for character stream parsing.' },
            { title: 'Copy or Save', description: 'Copy the extracted text or download it as a plain .txt document.' },
          ],
        }),
      ]}
      badge="Text Extractor"
      title="PDF to Text Extractor"
      description="Extract structural text contents page-by-page locally in your browser."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-text']} />}
    >
      <PdfToTextTool />
    </ToolPageShell>
  );
}
