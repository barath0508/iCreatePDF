import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'OCR PDF to Text Free Online: Convert Scanned PDF to Text | iCreatePDF',
  description: 'Free online OCR PDF to text converter. Extract editable text from scanned, image-only, or protected PDF documents 100% locally in your browser with PDF OCR. No registration.',
  keywords: 'ocr pdf to text, pdf ocr to text, online ocr pdf, scan to pdf text, free ocr online pdf, pdf text scanner, convert a pdf image to text, scanned text, scanned pdf to text, ocr conversion pdf, pdf to text scanner, scan text from pdf, free ocr pdf to text, turn scanned document into text, convert a scanned document to editable text, scanned document to text, scanned pdf to text converter, ocr convert scanned pdf to text, convert ocr pdf, ocr convert pdf to text, convert pdf to machine readable format, scan and ocr pdf, convert scanned pdf to editable text, convert scanned pdf to text online free, pdf scan ocr, pdf scan to text, scanned pdf ocr to text, pdf ocr online, extract text from pdf, convert scanned pdf to text, local pdf ocr',
  alternates: buildAlternates('/tools/pdf-ocr'),
  openGraph: {
    title: 'OCR PDF to Text Free Online: Convert Scanned PDF to Text | iCreatePDF',
    description: 'Free online OCR PDF to text converter. Extract editable text from scanned, image-only, or protected PDF documents 100% locally in your browser with PDF OCR. No registration.',
    type: 'website',
  }
};

export default function PdfOcrPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'OCR PDF to Text',
        description: 'Extract text from scanned, image-only, or copy-protected PDF files using client-side OCR (Optical Character Recognition). Process documents 100% locally in your browser for free.',
        url: '/tools/pdf-ocr',
      })}
      badge="Extraction"
      title="OCR PDF to Text (Scan to Text)"
      description="Extract editable text from scanned or copy-protected PDFs client-side using local character recognition."
      extraSections={<ToolSeoContent content={toolContent['pdf-ocr']} />}
    >
      <PdfOcrTool />
    </ToolPageShell>
  );
}
