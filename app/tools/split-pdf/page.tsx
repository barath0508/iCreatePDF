import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SplitTool } from '@/components/tools/SplitTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Split PDF Free Online — Separate & Extract PDF Pages | iCreatePDF',
  description: 'Split PDF documents into individual files or extract custom page ranges online free. 100% private client-side PDF splitter with zero uploads.',
  keywords: 'split pdf, separate pdf pages, extract pdf pages, split pdf online free, pdf page separator, how to split pdf into multiple files, split pdf by range, extract pages from pdf document, split large pdf file, separate pdf pages into individual documents, cut pdf into separate files free',
  alternates: buildAlternates('/tools/split-pdf'),
  openGraph: {
    title: 'Split PDF Free Online — Separate & Extract PDF Pages | iCreatePDF',
    description: 'Split PDF documents into individual files or extract custom page ranges online free. 100% private client-side PDF splitter with zero uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Split PDF Pages Online — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF Free Online — Separate & Extract PDF Pages | iCreatePDF',
    description: 'Split PDF documents into individual files or extract custom page ranges online free. 100% private client-side PDF splitter with zero uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function SplitPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('split-pdf')}
      badge="PDF Splitter"
      title="Split PDF Files"
      description="Extract individual pages or select custom ranges from your PDF document locally inside your browser."
      extraSections={<ToolSeoContent content={toolContent['split-pdf']} />}
    >
      <SplitTool />
    </ToolPageShell>
  );
}
