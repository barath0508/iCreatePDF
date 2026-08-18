import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MarkdownToPdfTool } from '@/components/tools/MarkdownToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter Online Free — Format MD to PDF | iCreatePDF',
  description: 'Convert Markdown (.md) documents, notes, and READMEs into beautifully formatted PDF files with code syntax highlighting. 100% private.',
  keywords: 'markdown to pdf, convert md to pdf, markdown editor to pdf, md file to pdf document, format markdown as pdf report, styled markdown to pdf, markdown resume to pdf, github markdown to pdf, code blocks markdown to pdf, markdown to printable pdf, export markdown as styled pdf',
  alternates: buildAlternates('/tools/markdown-to-pdf'),
  openGraph: {
    title: 'Markdown to PDF Converter Online Free — Format MD to PDF | iCreatePDF',
    description: 'Convert Markdown (.md) documents, notes, and READMEs into beautifully formatted PDF files with code syntax highlighting. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Markdown to PDF Converter — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown to PDF Converter Online Free — Format MD to PDF | iCreatePDF',
    description: 'Convert Markdown (.md) documents, notes, and READMEs into beautifully formatted PDF files with code syntax highlighting. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function MarkdownToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('markdown-to-pdf')}
      badge="Markdown Engine"
      title="Markdown to PDF Converter"
      description="Write syntax-styled Markdown documents and compile them to clean A4 PDFs locally."
      extraSections={<ToolSeoContent content={toolContent['markdown-to-pdf']} />}
    >
      <MarkdownToPdfTool />
    </ToolPageShell>
  );
}
