import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF OCR — Convert Scanned PDF to Searchable Text Online | iCreatePDF',
  description: 'Apply Optical Character Recognition (OCR) to scanned PDFs. Make unsearchable scanned documents selectable and copyable 100% in-browser.',
  keywords: 'pdf ocr, ocr pdf online, convert scanned pdf to searchable text, extract text from scanned pdf, searchable pdf converter, free online pdf ocr, optical character recognition pdf, copy text from scanned pdf, tesseract pdf ocr online, scanned image to text pdf, best free pdf ocr tool',
  alternates: buildAlternates('/tools/pdf-ocr'),
  openGraph: {
    title: 'PDF OCR — Convert Scanned PDF to Searchable Text Online | iCreatePDF',
    description: 'Apply Optical Character Recognition (OCR) to scanned PDFs. Make unsearchable scanned documents selectable and copyable 100% in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'OCR PDF: Make Scanned PDFs Searchable — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF OCR — Convert Scanned PDF to Searchable Text Online | iCreatePDF',
    description: 'Apply Optical Character Recognition (OCR) to scanned PDFs. Make unsearchable scanned documents selectable and copyable 100% in-browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfOcrPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-ocr')}
      badge="OCR Extraction"
      title="Convert Scanned PDF to Text (OCR)"
      description="Extract editable text from scanned or copy-protected PDFs client-side using local character recognition."
      extraSections={<ToolSeoContent content={toolContent['pdf-ocr']} />}
    >
      <PdfOcrTool />
    </ToolPageShell>
  );
}
