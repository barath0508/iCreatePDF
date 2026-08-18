import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PageNumbersTool } from '@/components/tools/PageNumbersTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF Free Online (Custom Pagination) | iCreatePDF',
  description: 'Stamp sequential page numbers or "Page X of Y" onto PDF pages. Choose positions, styling, and fonts. 100% private in-browser pagination, no uploads.',
  keywords: 'add page numbers to pdf, number pdf pages, pdf page numbers online, paginate pdf online, insert page numbers in pdf, page x of y numbering pdf, stamp page numbers pdf, number pdf pages free, how to add page numbers to pdf, pdf page number generator, custom pdf page numbering free, number pages in pdf without acrobat, bates page numbering pdf, legal page numbering pdf, private pdf numbering, add page numbering to pdf on mac, online pdf pagination tool',
  alternates: buildAlternates('/tools/add-page-numbers'),
  openGraph: {
    title: 'Add Page Numbers to PDF Free Online (Custom Pagination) | iCreatePDF',
    description: 'Stamp sequential page numbers or "Page X of Y" onto PDF pages. Choose positions, styling, and fonts. 100% private in-browser pagination, no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Add Page Numbers to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Page Numbers to PDF Free Online (Custom Pagination) | iCreatePDF',
    description: 'Stamp sequential page numbers or "Page X of Y" onto PDF pages. Choose positions, styling, and fonts. 100% private in-browser pagination, no uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PageNumbersPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('add-page-numbers')}
      badge="PDF Numbering"
      title="Add Page Numbers"
      description="Number PDF pages automatically. Select positions (top, bottom, left, right) and label styling formats (e.g. Page X of Y)."
      extraSections={<ToolSeoContent content={toolContent['add-page-numbers']} />}
    >
      <PageNumbersTool />
    </ToolPageShell>
  );
}
