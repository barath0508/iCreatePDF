import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PageNumbersTool } from '@/components/tools/PageNumbersTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add PDF Page Numbers Online - Free & Private | iCreatePDF',
  description: 'Stamp page numbers onto a PDF document. Customize positioning, number label formatting, and fonts locally in-browser.',
  keywords: 'add page numbers to pdf, number pdf pages, pdf page numbers online, private pdf numbering',
  alternates: buildAlternates('/add-page-numbers'),
  openGraph: {
    title: 'Add PDF Page Numbers Online - Free & Private | iCreatePDF',
    description: 'Stamp page numbers onto a PDF document. Customize positioning, number label formatting, and fonts locally in-browser.',
    type: 'website',
  }
};

export default function PageNumbersPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Add Page Numbers',
        description: 'Stamp page numbers onto a PDF document. Customize positioning, number label formatting, and fonts locally in-browser.',
        url: '/add-page-numbers',
      })}
      badge="PDF Numbering"
      title="Add Page Numbers"
      description="Number PDF pages automatically. Select positions (top, bottom, left, right) and label styling formats (e.g. Page X of Y)."
      extraSections={<ToolSeoContent content={toolContent['add-page-numbers']} />}
    >
      <PageNumbersTool />
    </ToolPageShell>
  );
}
