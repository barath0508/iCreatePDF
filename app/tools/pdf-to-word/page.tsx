import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToWordTool } from '@/components/tools/PdfToWordTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to Word Free Online (Editable DOCX) | iCreatePDF',
  description: 'Convert PDF files to editable Word (DOCX) documents online free. Preserve text, headers, and table formatting accurately in browser memory.',
  keywords: 'pdf to word, convert pdf to word, pdf to docx converter, convert pdf to editable word, pdf to word free online, turn pdf into word document, convert scanned pdf to word editable, best pdf to word converter, export pdf to docx, pdf to word without email',
  alternates: buildAlternates('/tools/pdf-to-word'),
  openGraph: {
    title: 'Convert PDF to Word Free Online (Editable DOCX) | iCreatePDF',
    description: 'Convert PDF files to editable Word (DOCX) documents online free. Preserve text, headers, and table formatting accurately in browser memory.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF to Editable Word (DOCX) — iCreatePDF' }],
  },
};

export default function PdfToWordToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert PDF to Editable Word (DOCX)',
          description: 'Convert PDF files to editable Word (DOCX) documents online free. Preserve text, headers, and table formatting accurately in browser memory.',
          url: '/tools/pdf-to-word',
        }),
        faqSchema(toolContent['pdf-to-word'].faqs),
        howToSchema({
          name: 'Convert PDF to Editable Word (DOCX)',
          description: toolContent['pdf-to-word'].overview,
          url: '/tools/pdf-to-word',
          steps: toolContent['pdf-to-word'].steps,
        }),
      ]}),
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
