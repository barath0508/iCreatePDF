import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExtractPagesTool } from '@/components/tools/ExtractPagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Pages from PDF Free Online — Separate Custom Pages | iCreatePDF',
  description: 'Extract individual pages or custom page ranges from a PDF into a new document. 100% private client-side processing with zero server uploads.',
  keywords: 'extract pages from pdf, pdf page extractor, pull pages from pdf, pdf page picker online free, extract specific pages from pdf, save selected pages from pdf, separate a page from pdf, how to separate pages from pdf, extract pages into separate files, extract page range from pdf free, save one page from pdf as new file',
  alternates: buildAlternates('/tools/extract-pages'),
  openGraph: {
    title: 'Extract Pages from PDF Free Online — Separate Custom Pages | iCreatePDF',
    description: 'Extract individual pages or custom page ranges from a PDF into a new document. 100% private client-side processing with zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Extract Pages from PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extract Pages from PDF Free Online — Separate Custom Pages | iCreatePDF',
    description: 'Extract individual pages or custom page ranges from a PDF into a new document. 100% private client-side processing with zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ExtractPagesPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('extract-pages')}
      badge="Page Extractor"
      title="Extract PDF Pages"
      description="Pick specific pages or ranges — e.g. 1,3,5-8 — and save them as a new PDF."
      extraSections={<ToolSeoContent content={toolContent['extract-pages']} />}
    >
      <ExtractPagesTool />
    </ToolPageShell>
  );
}
