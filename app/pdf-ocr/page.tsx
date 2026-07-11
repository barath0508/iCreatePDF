import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Free PDF OCR Online - Convert Scanned PDF to Text | iCreatePDF',
  description: 'Extract text from scanned, image-only, or copy-protected PDF files using client-side OCR (Optical Character Recognition). Process documents 100% locally in your browser for free.',
  keywords: 'pdf ocr online, scanned pdf to text, extract text from pdf, copy-proof pdf to text ocr, convert scanned pdf to text, local pdf ocr',
  alternates: buildAlternates('/pdf-ocr'),
  openGraph: {
    title: 'Free PDF OCR Online - Convert Scanned PDF to Text | iCreatePDF',
    description: 'Extract text from scanned, image-only, or copy-protected PDF files using client-side OCR (Optical Character Recognition). Process documents 100% locally in your browser for free.',
    type: 'website',
  }
};

export default function PdfOcrPage() {
  return (
    <ToolPageShell
      badge="Extraction"
      title="PDF OCR (Scan to Text)"
      description="Extract editable text from scanned or copy-protected PDFs client-side using local character recognition."
      extraSections={<ToolSeoContent content={toolContent['pdf-ocr']} />}
    >
      <PdfOcrTool />
    </ToolPageShell>
  );
}
