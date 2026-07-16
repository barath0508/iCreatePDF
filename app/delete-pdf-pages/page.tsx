import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { DeletePagesTool } from '@/components/tools/DeletePagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Cut PDF Pages: How to Cut a Page from PDF Free | iCreatePDF',
  description: 'Wondering how to cut a page from PDF? Easily cut, delete, or remove pages from a PDF document online. 100% private client-side processing, no uploads.',
  keywords: 'how to separate a page from a pdf, separate a page from pdf, how to cut a pdf page, how to cut a page from pdf, cut pdf pages, pdf cut pages, cut pages out of pdf, delete pdf pages, remove pages from pdf, discard pdf pages online, free pdf page deleter, client side page deletion',
  alternates: buildAlternates('/delete-pdf-pages'),
  openGraph: {
    title: 'Cut PDF Pages: How to Cut a Page from PDF Free | iCreatePDF',
    description: 'Wondering how to cut a page from PDF? Easily cut, delete, or remove pages from a PDF document online. 100% private client-side processing, no uploads.',
    type: 'website',
  }
};

export default function DeletePagesPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Delete PDF Pages',
        description: 'Delete pages from a PDF document easily. Enter ranges to discard unwanted pages. 100% private client-side processing, no uploads.',
        url: '/delete-pdf-pages',
      })}
      badge="Page Editor"
      title="Delete PDF Pages"
      description="Remove individual pages or complete page ranges from your PDF document instantly without uploading files."
      extraSections={<ToolSeoContent content={toolContent['delete-pdf-pages']} />}
    >
      <DeletePagesTool />
    </ToolPageShell>
  );
}
