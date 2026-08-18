import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Word to PDF Converter Free Online (Convert DOCX to PDF) | iCreatePDF',
  description: 'Convert Microsoft Word documents (.docx, .doc) into high-quality PDF files online free. Preserve layouts, fonts, and tables. 100% private.',
  keywords: 'word to pdf, convert word to pdf, docx to pdf converter, save word document as pdf, doc to pdf online free, word to pdf converter, convert doc to pdf without acrobat, export docx to pdf, ms word to pdf free, convert word file to high resolution pdf',
  alternates: buildAlternates('/tools/word-to-pdf'),
  openGraph: {
    title: 'Word to PDF Converter Free Online (Convert DOCX to PDF) | iCreatePDF',
    description: 'Convert Microsoft Word documents (.docx, .doc) into high-quality PDF files online free. Preserve layouts, fonts, and tables. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert Word (DOCX) to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word to PDF Converter Free Online (Convert DOCX to PDF) | iCreatePDF',
    description: 'Convert Microsoft Word documents (.docx, .doc) into high-quality PDF files online free. Preserve layouts, fonts, and tables. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('word-to-pdf')}
      badge="DOCX Converter"
      title="Convert DOCX to PDF"
      description="Drop your Word document (.docx) to compile it into a PDF layout. Processed 100% privately in your browser."
      extraSections={<ToolSeoContent content={toolContent['word-to-pdf']} />}
    >
      <div className="relative z-10">
        <WordToPdfTool />
      </div>
    </ToolPageShell>
  );
}
