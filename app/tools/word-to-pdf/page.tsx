import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Word to PDF Converter — Free, Private, No Upload | iCreatePDF',
  description: 'Convert Word DOCX to PDF online free without losing formatting. 100% private — Word documents are processed locally in your browser, never uploaded to any server.',
  keywords: 'word to pdf, docx to pdf, convert word to pdf, word to pdf free, convert docx to pdf, word document to pdf, doc to pdf, microsoft word to pdf, word to pdf online free, convert word to pdf without losing formatting, docx to pdf converter, word to pdf locally, word to pdf no upload, save word as pdf, how to convert word to pdf, word to pdf iphone, word to pdf android, word to pdf free offline, word file to pdf',
  alternates: buildAlternates('/tools/word-to-pdf'),
  openGraph: {
    title: 'Word to PDF Converter — Free, Private, No Upload | iCreatePDF',
    description: 'Convert Word DOCX to PDF free online. No uploads, no formatting loss. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Word to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word to PDF Converter — Free, Private, No Upload | iCreatePDF',
    description: 'Convert DOCX to PDF free. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Word to PDF',
        description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
        url: '/tools/word-to-pdf',
      })}
      badge="DOCX converter"
      title="Word to PDF"
      description="Drop your Word document (.docx) to compile it into a PDF layout. Processed entirely inside your browser memory."
      extraSections={<ToolSeoContent content={toolContent['word-to-pdf']} />}
    >
      <div className="relative z-10">
        <WordToPdfTool />
      </div>
    </ToolPageShell>
  );
}
