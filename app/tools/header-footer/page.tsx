import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { HeaderFooterTool } from '@/components/tools/HeaderFooterTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
  description: 'Add custom headers and footers to every page of your PDF. Include titles, dates, page numbers, or custom branding. 100% browser-based.',
  keywords: 'add header footer pdf, pdf header footer online, stamp header pdf, pdf footer text, add header to pdf free, insert running head on pdf, add footer to pdf pages, stamp date and title on pdf, page header generator pdf, custom headers and footers pdf, add company footer to pdf',
  alternates: buildAlternates('/tools/header-footer'),
  openGraph: {
    title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
    description: 'Add custom headers and footers to every page of your PDF. Include titles, dates, page numbers, or custom branding. 100% browser-based.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Add Header & Footer to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Header and Footer to PDF Online Free | iCreatePDF',
    description: 'Add custom headers and footers to every page of your PDF. Include titles, dates, page numbers, or custom branding. 100% browser-based.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function HeaderFooterPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('header-footer')}
      badge="Page Stamper"
      title="Add Header & Footer to PDF"
      description="Stamp text at the top and bottom of every page. Supports automatic page numbers with {'{page}'} and {'{total}'}."
      extraSections={<ToolSeoContent content={toolContent['header-footer']} />}
    >
      <HeaderFooterTool />
    </ToolPageShell>
  );
}
