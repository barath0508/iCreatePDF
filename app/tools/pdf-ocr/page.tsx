import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Scanned PDF to Text Free Online (OCR PDF to Text) | iCreatePDF',
  description: 'Convert scanned PDF documents to text free online with client-side OCR. Extract editable, searchable text from scanned or copy-protected PDFs. 100% private.',
  keywords: 'convert scanned pdf documents to text, convert scanned pdf to text, ocr pdf to text, pdf ocr to text, online ocr pdf, scan to pdf text, free ocr online pdf, pdf text scanner, convert a pdf image to text, scanned text, scanned pdf to text, ocr conversion pdf, pdf to text scanner, scan text from pdf, free ocr pdf to text, turn scanned document into text, convert scanned pdf to editable text, convert scanned pdf to text online free, pdf scan ocr, pdf scan to text, scanned pdf ocr to text, extract text from pdf, local pdf ocr',
  alternates: buildAlternates('/tools/pdf-ocr'),
  openGraph: {
    title: 'Convert Scanned PDF to Text Free Online (OCR PDF) | iCreatePDF',
    description: 'Convert scanned PDF documents to text free online with local OCR. Extract editable text from scanned or copy-protected PDFs. 100% private.',
    type: 'website',
  }
};

export default function PdfOcrPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert Scanned PDF to Text (OCR)',
          description: 'Convert scanned PDF documents to text free online using client-side OCR (Optical Character Recognition). Process scanned documents 100% locally in your browser.',
          url: '/tools/pdf-ocr',
        }),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert scanned PDF documents to text?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Drop your scanned PDF document into our online OCR tool. The browser engine recognizes character patterns and extracts copyable, editable text instantly.',
              },
            },
            {
              '@type': 'Question',
              name: 'Are my scanned documents private when converting to text?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The OCR engine runs entirely inside your browser using WebAssembly. Your scanned files are never uploaded to any remote server.',
              },
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Convert Scanned PDF Documents to Text',
          step: [
            { '@type': 'HowToStep', text: 'Select or drag your scanned PDF file into the dropzone.' },
            { '@type': 'HowToStep', text: 'Choose your document language (English, Spanish, Hindi, Tamil).' },
            { '@type': 'HowToStep', text: 'Click Extract Text to copy or download your editable text file.' },
          ],
        },
      ]}
      badge="OCR Extraction"
      title="Convert Scanned PDF to Text (OCR)"
      description="Extract editable text from scanned or copy-protected PDFs client-side using local character recognition."
      extraSections={<ToolSeoContent content={toolContent['pdf-ocr']} />}
    >
      <PdfOcrTool />
    </ToolPageShell>
  );
}
