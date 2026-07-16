import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExtractPagesTool } from '@/components/tools/ExtractPagesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Extract Pages from PDF Free Online | iCreatePDF',
  description: 'Extract specific pages from a PDF file. Enter page numbers or ranges to pull out exactly the pages you need into a new PDF document.',
  keywords: 'how to separate a page from a pdf, separate a page from pdf, extract pages from pdf, pdf page extractor, pull pages from pdf, pdf page picker online free',
  alternates: buildAlternates('/extract-pages'),
  openGraph: {
    title: 'Extract Pages from PDF Free Online | iCreatePDF',
    description: 'Extract specific pages from a PDF file. Enter page numbers or ranges to pull out exactly the pages you need into a new PDF document.',
    type: 'website',
  }
};

export default function ExtractPagesPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Extract PDF Pages',
        description: 'Extract specific pages from a PDF file. Enter page numbers or ranges to pull out exactly the pages you need into a new PDF document.',
        url: '/extract-pages',
      })}
      badge="Page Extractor"
      title="Extract PDF Pages"
      description="Pick specific pages or ranges — e.g. 1,3,5-8 — and save them as a new PDF."
      extraSections={<ToolSeoContent content={toolContent['extract-pages']} />}
    >
      <ExtractPagesTool />
    </ToolPageShell>
  );
}
