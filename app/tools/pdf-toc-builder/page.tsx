import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfTocBuilderTool } from '@/components/tools/PdfTocBuilderTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Table of Contents Builder — Create Bookmarks & Outline | iCreatePDF',
  description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
  keywords: 'pdf toc builder, add table of contents to pdf, create pdf bookmarks, generate pdf outline, table of contents generator pdf, clickable table of contents pdf, add navigation bookmarks pdf, build pdf index, custom pdf toc creator',
  alternates: buildAlternates('/tools/pdf-toc-builder'),
  openGraph: {
    title: 'PDF Table of Contents Builder — Create Bookmarks & Outline | iCreatePDF',
    description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Build PDF Table of Contents — iCreatePDF' }],
  },
};

export default function PdfTocBuilderToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Build PDF Table of Contents',
          description: 'Build interactive tables of contents and hierarchical navigation bookmarks for PDF documents. 100% private browser-based TOC generator.',
          url: '/tools/pdf-toc-builder',
        }),
        faqSchema(toolContent['pdf-toc-builder'].faqs),
        howToSchema({
          name: 'Build PDF Table of Contents',
          description: toolContent['pdf-toc-builder'].overview,
          url: '/tools/pdf-toc-builder',
          steps: toolContent['pdf-toc-builder'].steps,
        }),
      ]}badge="Document Navigation"
      title="PDF TOC & Bookmarks Builder"
      description="Add, edit, or reorganize clickable outline bookmarks for PDFs."
      extraSections={<ToolSeoContent content={toolContent['pdf-toc-builder']} />}
    >
      <PdfTocBuilderTool />
    </ToolPageShell>
  );
}
