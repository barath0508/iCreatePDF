import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { OrganizeTool } from '@/components/tools/OrganizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Free Online — Reorder Pages | iCreatePDF',
  description: 'Reorder, delete, and organize PDF pages visually free online. Drag and drop thumbnails to rearrange layout. 100% private in browser memory.',
  keywords: 'organize pdf, reorder pdf pages, rotate pdf pages, delete pages pdf, private pdf organizer',
  alternates: buildAlternates('/tools/organize-pdf'),
  openGraph: {
    title: 'Organize PDF Pages Online — Reorder & Delete | iCreatePDF',
    description: 'Reorder, delete, and organize PDF pages visually online free. Processed 100% locally in your browser tab with zero server uploads for complete privacy.',
    type: 'website',
  }
};

export default function OrganizePdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Organize & Rotate PDF',
          description: 'Rearrange, rotate, or delete specific pages in a PDF. 100% client-side with visual page preview thumbnails.',
          url: '/tools/organize-pdf',
        }),
        faqSchema([
          {
            question: 'How do I organize and reorder PDF pages?',
            answer: 'Upload your PDF document. Use the drag-and-drop thumbnail grid to rearrange page sequences, delete individual pages, or rotate page layouts, then click Save changes.',
          },
          {
            question: 'Is my data secure when organizing PDF pages?',
            answer: 'Yes. The entire organizing process is performed on your local computer via client libraries. Your PDF pages are never uploaded to any remote server.',
          },
          {
            question: 'Can I delete pages from a PDF here?',
            answer: 'Yes. You can visually click the delete icon on any page thumbnail to exclude it from the output PDF compilation.',
          },
        ]),
        howToSchema({
          name: 'Organize & Rotate PDF',
          description: 'Visually rearrange, rotate, or delete pages in your PDF files online.',
          url: '/tools/organize-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Select or drag your PDF document into the page organizer grid.' },
            { title: 'Reorder & Edit Pages', description: 'Drag page thumbnails to sort, click rotate icons, or click delete to remove pages.' },
            { title: 'Download Output', description: 'Click Save PDF to write the organized page structure and download your file.' },
          ],
        }),
      ]}
      badge="PDF Page Editor"
      title="Organize & Rotate PDF"
      description="Drag page thumbnails to reorder pages. Rotate pages or flag specific pages for removal from the output."
      extraSections={<ToolSeoContent content={toolContent['organize-pdf']} />}
    >
      <OrganizeTool />
    </ToolPageShell>
  );
}
