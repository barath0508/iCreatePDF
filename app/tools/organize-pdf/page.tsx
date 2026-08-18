import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { OrganizeTool } from '@/components/tools/OrganizeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Free Online — Reorder, Rotate & Delete | iCreatePDF',
  description: 'Visually rearrange, sort, reorder, rotate, and delete PDF pages with drag-and-drop ease. 100% private in-browser document organizer.',
  keywords: 'organize pdf, reorder pdf pages, delete pdf pages, rearrange pdf pages, remove pages from pdf, sort pdf pages online, visual pdf page organizer, organize pdf pages free, drag and drop pdf organizer, rearrange pdf pages in browser, rotate and organize pdf',
  alternates: buildAlternates('/tools/organize-pdf'),
  openGraph: {
    title: 'Organize PDF Pages Free Online — Reorder, Rotate & Delete | iCreatePDF',
    description: 'Visually rearrange, sort, reorder, rotate, and delete PDF pages with drag-and-drop ease. 100% private in-browser document organizer.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Organize PDF Pages Visually — iCreatePDF' }],
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
