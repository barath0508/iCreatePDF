import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExtractPagesTool } from '@/components/tools/ExtractPagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Pages from PDF Free Online — Separate Custom Pages | iCreatePDF',
  description: 'Extract individual pages or custom page ranges from a PDF into a new document. 100% private client-side processing with zero server uploads.',
  keywords: 'extract pages from pdf, pdf page extractor, pull pages from pdf, pdf page picker online free, extract specific pages from pdf, save selected pages from pdf, separate a page from pdf, how to separate pages from pdf, extract pages into separate files, extract page range from pdf free',
  alternates: buildAlternates('/tools/extract-pages'),
  openGraph: {
    title: 'Extract Pages from PDF Free Online | iCreatePDF',
    description: 'Extract pages from a PDF document to create a new PDF file online free. Processed 100% locally in your browser for absolute data privacy and security.',
    type: 'website',
  }
};

export default function ExtractPagesPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Extract Pages from PDF',
          description: 'Extract individual pages or custom page ranges from a PDF into a new document. 100% private client-side processing with zero server uploads.',
          url: '/tools/extract-pages',
        }),
        faqSchema(toolContent['extract-pages'].faqs),
        howToSchema({
          name: 'Extract Pages from PDF',
          description: toolContent['extract-pages'].overview,
          url: '/tools/extract-pages',
          steps: toolContent['extract-pages'].steps,
        }),
      ]}badge="Page Extractor"
      title="Extract PDF Pages"
      description="Pick specific pages or ranges — e.g. 1,3,5-8 — and save them as a new PDF."
      extraSections={<ToolSeoContent content={toolContent['extract-pages']} />}
    >
      <ExtractPagesTool />
    </ToolPageShell>
  );
}
