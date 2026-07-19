import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert DOCX to PDF Online Free (100% Private) | iCreatePDF',
  description: 'Convert DOCX to PDF online for free. Wondering how to change from DOCX to PDF without formatting shifts? Convert Word documents 100% privately in your browser.',
  keywords: 'convert docx to pdf, change from docx to pdf, docx to pdf, change docx to pdf, how to convert docx to pdf, docx to pdf freeware, docx to pdf free, convert word to pdf local, docx to pdf converter free, docx to pdf for free, docx to pdf converter, convert docx to pdf free, microsoft word docx to pdf, docx into pdf, docx a pdf, docx file to pdf, docx to pf, docx in pdf, .docx to pdf, convert docx to pdf for free, convert word to pdf free offline, word to pdf without changing format, convert docx to pdf without word, save docx as pdf, private pdf converter, icreatepdf',
  alternates: buildAlternates('/tools/word-to-pdf'),
  openGraph: {
    title: 'Convert DOCX to PDF Online Free (100% Private) | iCreatePDF',
    description: 'Convert DOCX to PDF online for free. Wondering how to change from DOCX to PDF without formatting shifts? Convert Word documents 100% privately in your browser.',
    type: 'website',
  }
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
