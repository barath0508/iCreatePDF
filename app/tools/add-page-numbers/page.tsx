import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PageNumbersTool } from '@/components/tools/PageNumbersTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF Free Online (Custom Pagination) | iCreatePDF',
  description: 'Stamp sequential page numbers or "Page X of Y" onto PDF pages. Choose positions, styling, and fonts. 100% private in-browser pagination, no uploads.',
  keywords: 'add page numbers to pdf, number pdf pages, pdf page numbers online, paginate pdf online, insert page numbers in pdf, page x of y numbering pdf, stamp page numbers pdf, number pdf pages free, how to add page numbers to pdf, pdf page number generator, custom pdf page numbering free, number pages in pdf without acrobat, bates page numbering pdf, legal page numbering pdf, private pdf numbering',
  alternates: buildAlternates('/tools/add-page-numbers'),
  openGraph: {
    title: 'Add PDF Page Numbers Online - Free & Private | iCreatePDF',
    description: 'Stamp page numbers onto a PDF document. Customize positioning, number label formatting, and fonts locally in-browser.',
    type: 'website',
  }
};

export default function PageNumbersPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Add Page Numbers to PDF',
          description: 'Stamp sequential page numbers or "Page X of Y" onto PDF pages. Choose positions, styling, and fonts. 100% private in-browser pagination, no uploads.',
          url: '/tools/add-page-numbers',
        }),
        faqSchema(toolContent['add-page-numbers'].faqs),
        howToSchema({
          name: 'Add Page Numbers to PDF',
          description: toolContent['add-page-numbers'].overview,
          url: '/tools/add-page-numbers',
          steps: toolContent['add-page-numbers'].steps,
        }),
      ]}badge="PDF Numbering"
      title="Add Page Numbers"
      description="Number PDF pages automatically. Select positions (top, bottom, left, right) and label styling formats (e.g. Page X of Y)."
      extraSections={<ToolSeoContent content={toolContent['add-page-numbers']} />}
    >
      <PageNumbersTool />
    </ToolPageShell>
  );
}
