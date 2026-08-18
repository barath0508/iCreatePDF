import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { DeletePagesTool } from '@/components/tools/DeletePagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Delete PDF Pages Online Free — Remove & Cut Unwanted Pages | iCreatePDF',
  description: 'Easily cut, delete, or remove pages from any PDF document online for free. 100% private client-side page removal with instant download and no uploads.',
  keywords: 'delete pdf pages, remove pages from pdf, discard pdf pages online, free pdf page deleter, client side page deletion, how to cut pages from a pdf, how do i cut pages from a pdf, cut pdf pages, pdf cut pages, separate a page from pdf, cut pages out of pdf, remove blank pages from pdf, delete unwanted pages in pdf, delete pages from pdf free without acrobat, delete specific page from pdf online',
  alternates: buildAlternates('/tools/delete-pdf-pages'),
  openGraph: {
    title: 'Delete PDF Pages Online Free — Remove & Cut Unwanted Pages | iCreatePDF',
    description: 'Easily cut, delete, or remove pages from any PDF document online for free. 100% private client-side page removal with instant download and no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Cut & Delete PDF Pages — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delete PDF Pages Online Free — Remove & Cut Unwanted Pages | iCreatePDF',
    description: 'Easily cut, delete, or remove pages from any PDF document online for free. 100% private client-side page removal with instant download and no uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function DeletePagesPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('delete-pdf-pages')}
      badge="Page Editor"
      title="Delete PDF Pages"
      description="Remove individual pages or complete page ranges from your PDF document instantly without uploading files."
      extraSections={<ToolSeoContent content={toolContent['delete-pdf-pages']} />}
    >
      <DeletePagesTool />
    </ToolPageShell>
  );
}
