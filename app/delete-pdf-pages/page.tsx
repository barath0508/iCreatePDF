import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { DeletePagesTool } from '@/components/tools/DeletePagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Delete PDF Pages Online Free - Remove Pages from PDF | iCreatePDF',
  description: 'Delete pages from a PDF document easily. Enter ranges to discard unwanted pages. 100% private client-side processing, no uploads.',
  keywords: 'delete pdf pages, remove pages from pdf, discard pdf pages online, free pdf page deleter, client side page deletion',
  alternates: buildAlternates('/delete-pdf-pages'),
  openGraph: {
    title: 'Delete PDF Pages Online Free - Remove Pages from PDF',
    description: 'Delete pages from a PDF document easily. Enter ranges to discard unwanted pages. 100% private client-side processing, no uploads.',
    type: 'website',
  }
};

export default function DeletePagesPage() {
  return (
    <ToolPageShell
      badge="Page Editor"
      title="Delete PDF Pages"
      description="Remove individual pages or complete page ranges from your PDF document instantly without uploading files."
      extraSections={<ToolSeoContent content={toolContent['delete-pdf-pages']} />}
    >
      <DeletePagesTool />
    </ToolPageShell>
  );
}
