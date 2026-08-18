import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MarkdownToPdfTool } from '@/components/tools/MarkdownToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter Online Free — Format MD to PDF | iCreatePDF',
  description: 'Convert Markdown (.md) documents, notes, and READMEs into beautifully formatted PDF files with code syntax highlighting. 100% private.',
  keywords: 'markdown to pdf, convert md to pdf, markdown editor to pdf, md file to pdf document, format markdown as pdf report, styled markdown to pdf, markdown resume to pdf, github markdown to pdf, code blocks markdown to pdf, markdown to printable pdf',
  alternates: buildAlternates('/tools/markdown-to-pdf'),
  openGraph: {
    title: 'Convert Markdown to PDF Online Free - MD to PDF | iCreatePDF',
    description: 'Convert styled Markdown to PDF online free. Compile MD to PDF locally in your browser with complete privacy. No uploads, fast and secure.',
    type: 'website',
  }
};

export default function MarkdownToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Markdown to PDF Converter',
          description: 'Convert Markdown (.md) documents, notes, and READMEs into beautifully formatted PDF files with code syntax highlighting. 100% private.',
          url: '/tools/markdown-to-pdf',
        }),
        faqSchema(toolContent['markdown-to-pdf'].faqs),
        howToSchema({
          name: 'Markdown to PDF Converter',
          description: toolContent['markdown-to-pdf'].overview,
          url: '/tools/markdown-to-pdf',
          steps: toolContent['markdown-to-pdf'].steps,
        }),
      ]}badge="Markdown Engine"
      title="Markdown to PDF Converter"
      description="Write syntax-styled Markdown documents and compile them to clean A4 PDFs locally."
      extraSections={<ToolSeoContent content={toolContent['markdown-to-pdf']} />}
    >
      <MarkdownToPdfTool />
    </ToolPageShell>
  );
}
