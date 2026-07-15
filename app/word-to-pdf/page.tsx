import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Word DOCX to PDF Online Free (100% Private) | iCreatePDF',
  description: 'Wondering how to convert DOCX to PDF? Save Word documents as PDF files online instantly. 100% private, local browser conversion that preserves layouts perfectly.',
  keywords: 'how to change docx to pdf, docx to pdf smallpdf, convert docx to pdf, change docx to pdf, to convert docx to pdf, convert docx to pdf free, conversion docx pdf, convert a docx file to pdf, docx to pdf converter free, free docx to pdf converter, docx to pdf converter, .docx to pdf, docx pdf, docx-pdf, ooxml to pdf, dox to pdf, conversion docx to pdf, free docx to pdf, translate docx to pdf, converting docx to pdf online, how to convert docx to pdf, how to transform docx to pdf, save docx as pdf, how to change a docx to pdf, convert word to pdf, docx to pdf, word document converter online, private pdf converter, icreatepdf',
  alternates: buildAlternates('/word-to-pdf'),
  openGraph: {
    title: 'Convert Word DOCX to PDF Online Free (100% Private) | iCreatePDF',
    description: 'Wondering how to convert DOCX to PDF? Save Word documents as PDF files online instantly. 100% private, local browser conversion that preserves layouts perfectly.',
    type: 'website',
  }
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Word to PDF',
        description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
        url: '/word-to-pdf',
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
