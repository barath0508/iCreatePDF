import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { DeletePagesTool } from '@/components/tools/DeletePagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Delete PDF Pages Online Free — Remove & Cut Unwanted Pages | iCreatePDF',
  description: 'Easily cut, delete, or remove pages from any PDF document online for free. 100% private client-side page removal with instant download and no uploads.',
  keywords: 'delete pdf pages, remove pages from pdf, discard pdf pages online, free pdf page deleter, client side page deletion, how to cut pages from a pdf, how do i cut pages from a pdf, cut pdf pages, pdf cut pages, separate a page from pdf, cut pages out of pdf, remove blank pages from pdf, delete unwanted pages in pdf, delete pages from pdf free without acrobat',
  alternates: buildAlternates('/tools/delete-pdf-pages'),
  openGraph: {
    title: 'Cut PDF Pages: How to Cut Pages from a PDF Free | iCreatePDF',
    description: 'Wondering how to cut pages from a PDF? Easily cut, delete, or remove pages from a PDF document online for free. 100% private client-side processing, no uploads.',
    type: 'website',
  }
};

export default function DeletePagesPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Cut & Delete PDF Pages',
          description: 'Easily cut, delete, or remove pages from any PDF document online for free. 100% private client-side page removal with instant download and no uploads.',
          url: '/tools/delete-pdf-pages',
        }),
        faqSchema(toolContent['delete-pdf-pages'].faqs),
        howToSchema({
          name: 'Cut & Delete PDF Pages',
          description: toolContent['delete-pdf-pages'].overview,
          url: '/tools/delete-pdf-pages',
          steps: toolContent['delete-pdf-pages'].steps,
        }),
      ]}badge="Page Editor"
      title="Delete PDF Pages"
      description="Remove individual pages or complete page ranges from your PDF document instantly without uploading files."
      extraSections={<ToolSeoContent content={toolContent['delete-pdf-pages']} />}
    >
      <DeletePagesTool />
    </ToolPageShell>
  );
}
