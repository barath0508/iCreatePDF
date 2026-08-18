import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HeaderFooterTool } from '@/components/tools/HeaderFooterTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
  description: 'Add custom headers and footers to every page of your PDF. Include titles, dates, page numbers, or custom branding. 100% browser-based.',
  keywords: 'add header footer pdf, pdf header footer online, stamp header pdf, pdf footer text, add header to pdf free, insert running head on pdf, add footer to pdf pages, stamp date and title on pdf, page header generator pdf, custom headers and footers pdf',
  alternates: buildAlternates('/tools/header-footer'),
  openGraph: {
    title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
    description: 'Add custom headers and footers to every page of your PDF. Include page numbers, company name, date, or any text. 100% browser-based.',
    type: 'website',
  }
};

export default function HeaderFooterPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Add Header & Footer to PDF',
          description: 'Add custom headers and footers to every page of your PDF. Include titles, dates, page numbers, or custom branding. 100% browser-based.',
          url: '/tools/header-footer',
        }),
        faqSchema(toolContent['header-footer'].faqs),
        howToSchema({
          name: 'Add Header & Footer to PDF',
          description: toolContent['header-footer'].overview,
          url: '/tools/header-footer',
          steps: toolContent['header-footer'].steps,
        }),
      ]}badge="Page Stamper"
      title="Add Header & Footer to PDF"
      description="Stamp text at the top and bottom of every page. Supports automatic page numbers with {'{page}'} and {'{total}'}."
      extraSections={<ToolSeoContent content={toolContent['header-footer']} />}
    >
      <HeaderFooterTool />
    </ToolPageShell>
  );
}
