import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfTocBuilderTool } from '@/components/tools/PdfTocBuilderTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Table of Contents Builder — Create Bookmarks & Outline | iCreatePDF',
  description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
  keywords: 'pdf toc builder, add table of contents to pdf, create pdf bookmarks, generate pdf outline, table of contents generator pdf, clickable table of contents pdf, add navigation bookmarks pdf, build pdf index, custom pdf toc creator, create bookmark hierarchy in pdf',
  alternates: buildAlternates('/tools/pdf-toc-builder'),
  openGraph: {
    title: 'PDF Table of Contents Builder — Create Bookmarks & Outline | iCreatePDF',
    description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Build PDF Table of Contents — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Table of Contents Builder — Create Bookmarks & Outline | iCreatePDF',
    description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfTocBuilderToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-toc-builder')}
      badge="Document Navigation"
      title="PDF TOC & Bookmarks Builder"
      description="Add, edit, or reorganize clickable outline bookmarks for PDFs."
      extraSections={<ToolSeoContent content={toolContent['pdf-toc-builder']} />}
    >
      <PdfTocBuilderTool />
    </ToolPageShell>
  );
}
