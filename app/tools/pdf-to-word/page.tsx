import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToWordTool } from '@/components/tools/PdfToWordTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to Word Free Online (100% Private) | iCreatePDF',
  description: 'Convert PDF files to editable Word DOCX documents online free. ⚡ Fast text & formatting preservation, processed entirely local in browser memory.',
  keywords: 'pdf to word converter, convert pdf to word, pdf to docx, convert pdf to docx online free, private pdf to word, no upload pdf to word',
  alternates: buildAlternates('/tools/pdf-to-word'),
  openGraph: {
    title: 'Convert PDF to Word Free Online — 100% Private | iCreatePDF',
    description: 'Convert PDF files to editable Word DOCX documents online free. Fast formatting preservation, local browser processing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF to Word Converter — iCreatePDF' }],
  },
};

export default function PdfToWordToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'PDF to Word Converter',
          description: 'Extract structured text and headings into editable Word (.docx) documents.',
          url: '/tools/pdf-to-word',
        }),
        faqSchema([
          {
            question: 'How do I convert a PDF to Word for free?',
            answer: 'Upload or drop your PDF document, wait a second for the local browser engine to process and extract text structure, and download your editable Word file (.docx).',
          },
          {
            question: 'Will my Word document keep the original PDF formatting?',
            answer: 'Yes, our local conversion layout engine extracts headers, tables, columns, and text styles to reconstruct formatting as closely as possible.',
          },
          {
            question: 'Is it secure to convert sensitive PDFs here?',
            answer: 'Yes. iCreatePDF processes your files locally using WebAssembly. Your files never leave your device and are never sent to external servers.',
          },
        ]),
        howToSchema({
          name: 'PDF to Word Converter',
          description: 'Convert PDF files into editable Microsoft Word (.docx) documents online.',
          url: '/tools/pdf-to-word',
          steps: [
            { title: 'Upload PDF', description: 'Select or drag your PDF file into the browser box.' },
            { title: 'Wait for Extraction', description: 'The client-side engine parses text, images, and layout elements.' },
            { title: 'Download DOCX', description: 'Click Download Word to save the editable document on your device.' },
          ],
        }),
      ]}
      badge="Document Converter"
      title="PDF to Word Converter"
      description="Extract structured text and headings into editable Word (.docx) documents."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-word']} />}
    >
      <PdfToWordTool />
    </ToolPageShell>
  );
}
