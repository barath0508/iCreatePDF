import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToTextTool } from '@/components/tools/PdfToTextTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Text Extractor Online Free — Convert PDF to TXT | iCreatePDF',
  description: 'Extract raw and structured text from PDF documents into clean .txt files online free. 100% private client-side text extractor without uploads.',
  keywords: 'pdf to text, extract text from pdf, convert pdf to txt, copy text from pdf, pdf to text converter online, plain text from pdf, batch pdf to text, extract words from pdf, parse text in pdf document, client side pdf text extractor, copy unselectable text from pdf',
  alternates: buildAlternates('/tools/pdf-to-text'),
  openGraph: {
    title: 'PDF to Text Extractor Online Free — Convert PDF to TXT | iCreatePDF',
    description: 'Extract raw and structured text from PDF documents into clean .txt files online free. 100% private client-side text extractor without uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Extract Text from PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Text Extractor Online Free — Convert PDF to TXT | iCreatePDF',
    description: 'Extract raw and structured text from PDF documents into clean .txt files online free. 100% private client-side text extractor without uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfToTextPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-to-text')}
      badge="Text Extractor"
      title="PDF to Text Extractor"
      description="Extract structural text contents page-by-page locally in your browser."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-text']} />}
    >
      <PdfToTextTool />
    </ToolPageShell>
  );
}
