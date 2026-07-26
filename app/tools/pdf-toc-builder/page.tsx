import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfTocBuilderTool } from '@/components/tools/PdfTocBuilderTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF TOC & Bookmarks Builder — Free, Private, No Upload | iCreatePDF',
  description: 'Add, edit, or reorganize clickable outline bookmarks for PDFs. 100% private — files process inside browser memory.',
  alternates: buildAlternates('/tools/pdf-toc-builder'),
  openGraph: {
    title: 'PDF TOC & Bookmarks Builder — iCreatePDF',
    description: 'Add, edit, or reorganize clickable outline bookmarks for PDFs.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF TOC & Bookmarks Builder — iCreatePDF' }],
  },
};

export default function PdfTocBuilderToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF TOC & Bookmarks Builder',
        description: 'Add, edit, or reorganize clickable outline bookmarks for PDFs.',
        url: '/tools/pdf-toc-builder',
      })}
      badge="Document Navigation"
      title="PDF TOC & Bookmarks Builder"
      description="Add, edit, or reorganize clickable outline bookmarks for PDFs."
      extraSections={<ToolSeoContent content={toolContent['pdf-toc-builder']} />}
    >
      <PdfTocBuilderTool />
    </ToolPageShell>
  );
}
