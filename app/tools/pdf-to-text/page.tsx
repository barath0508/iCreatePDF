import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToTextTool } from '@/components/tools/PdfToTextTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to Text Free Online (Extract Text) | iCreatePDF',
  description: 'Extract editable text from any PDF document free online. ⚡ Fast and 100% private browser-based text extraction — no server uploads needed.',
  keywords: 'convert pdf to readable text, pdf to readable text, scan text from pdf, convert pdf image to text, convert pdf to machine readable format, pdf scan to text converter, pdf scan to text, image pdf to text, pdf text scanner, pdf to text, extract text from pdf, pdf text reader, read pdf text online',
  alternates: buildAlternates('/tools/pdf-to-text'),
  openGraph: {
    title: 'Convert PDF to Text Online — Extract PDF Text | iCreatePDF',
    description: 'Extract editable text from any PDF document free online. 100% private browser-based text extraction.',
    type: 'website',
  }
};

export default function PdfToTextPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'PDF to Text Extractor',
          description: 'Extract raw text layouts from PDF documents page-by-page. 100% browser-based text extraction utility.',
          url: '/tools/pdf-to-text',
        }),
        faqSchema([
          {
            question: 'How do I convert a PDF to a text file online?',
            answer: 'Upload your PDF file. The extractor parses the character streams from the PDF structure page-by-page and displays editable plain text for copy-pasting or downloading as a .txt file.',
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
