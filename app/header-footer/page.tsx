import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HeaderFooterTool } from '@/components/tools/HeaderFooterTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
  description: 'Add custom headers and footers to every page of your PDF. Include page numbers, company name, date, or any text. 100% browser-based.',
  keywords: 'add header footer pdf, pdf header footer online, stamp header pdf, pdf footer text, add header to pdf free',
  alternates: buildAlternates('/header-footer'),
  openGraph: {
    title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
    description: 'Add custom headers and footers to every page of your PDF. Include page numbers, company name, date, or any text. 100% browser-based.',
    type: 'website',
  }
};

export default function HeaderFooterPage() {
  return (
    <ToolPageShell
      badge="Page Stamper"
      title="Add Header & Footer to PDF"
      description="Stamp text at the top and bottom of every page. Supports automatic page numbers with {'{page}'} and {'{total}'}."
      extraSections={<ToolSeoContent content={toolContent['header-footer']} />}
    >
      <HeaderFooterTool />
    </ToolPageShell>
  );
}
