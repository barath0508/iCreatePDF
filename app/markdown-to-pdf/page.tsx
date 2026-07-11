import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MarkdownToPdfTool } from '@/components/tools/MarkdownToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Markdown to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert styled Markdown text files into standard PDF page layouts locally. Completely private, browser-based Markdown-to-PDF utility.',
  keywords: 'markdown to pdf, convert md to pdf, markdown editor pdf converter, client side md pdf',
  alternates: buildAlternates('/markdown-to-pdf'),
  openGraph: {
    title: 'Convert Markdown to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert styled Markdown text files into standard PDF page layouts locally. Completely private, browser-based Markdown-to-PDF utility.',
    type: 'website',
  }
};

export default function MarkdownToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Markdown to PDF Converter',
        description: 'Convert styled Markdown text files into standard PDF page layouts locally. Completely private, browser-based Markdown-to-PDF utility.',
        url: '/markdown-to-pdf',
      })}
      badge="Markdown Engine"
      title="Markdown to PDF Converter"
      description="Write syntax-styled Markdown documents and compile them to clean A4 PDFs locally."
      extraSections={<ToolSeoContent content={toolContent['markdown-to-pdf']} />}
    >
      <MarkdownToPdfTool />
    </ToolPageShell>
  );
}
