import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToTextTool } from '@/components/tools/PdfToTextTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Text from PDF Online - Free & Private | iCreatePDF',
  description: 'Extract raw text layouts from PDF documents page-by-page. 100% browser-based text extraction utility.',
  keywords: 'pdf to text, extract text from pdf, pdf text reader, read pdf text online',
  alternates: buildAlternates('/pdf-to-text'),
  openGraph: {
    title: 'Extract Text from PDF Online - Free & Private | iCreatePDF',
    description: 'Extract raw text layouts from PDF documents page-by-page. 100% browser-based text extraction utility.',
    type: 'website',
  }
};

export default function PdfToTextPage() {
  return (
    <ToolPageShell
      badge="Text Extractor"
      title="PDF to Text Extractor"
      description="Extract structural text contents page-by-page locally in your browser."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-text']} />}
    >
      <PdfToTextTool />
    </ToolPageShell>
  );
}
