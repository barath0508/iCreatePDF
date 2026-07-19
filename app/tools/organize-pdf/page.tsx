import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { OrganizeTool } from '@/components/tools/OrganizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Online - Free & Private | iCreatePDF',
  description: 'Rearrange, rotate, or delete specific pages in a PDF. 100% client-side with visual page preview thumbnails.',
  keywords: 'organize pdf, reorder pdf pages, rotate pdf pages, delete pages pdf, private pdf organizer',
  alternates: buildAlternates('/tools/organize-pdf'),
  openGraph: {
    title: 'Organize PDF Pages Online - Free & Private | iCreatePDF',
    description: 'Rearrange, rotate, or delete specific pages in a PDF. 100% client-side with visual page preview thumbnails.',
    type: 'website',
  }
};

export default function OrganizePdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Organize & Rotate PDF',
        description: 'Rearrange, rotate, or delete specific pages in a PDF. 100% client-side with visual page preview thumbnails.',
        url: '/tools/organize-pdf',
      })}
      badge="PDF Page Editor"
      title="Organize & Rotate PDF"
      description="Drag page thumbnails to reorder pages. Rotate pages or flag specific pages for removal from the output."
      extraSections={<ToolSeoContent content={toolContent['organize-pdf']} />}
    >
      <OrganizeTool />
    </ToolPageShell>
  );
}
