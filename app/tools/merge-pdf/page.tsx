import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MergeTool } from '@/components/tools/MergeTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Merge PDF Privately (No Upload) — Combine Sensitive PDFs Locally | iCreatePDF',
  description: 'Combine multiple confidential PDF files into one document free online. 100% client-side WebAssembly merge — files never leave your browser, zero server uploads.',
  keywords: 'merge pdf no upload, combine pdf locally, merge confidential pdf, private pdf merger, merge pdf without uploading, combine sensitive pdfs, client side pdf joiner, merge pdf files offline, secure pdf combiner free, merge legal documents pdf, merge pdf, combine pdf, merge pdf online free',
  alternates: buildAlternates('/tools/merge-pdf'),
  openGraph: {
    title: 'Merge PDF Privately (No Upload) — Combine Sensitive PDFs Locally | iCreatePDF',
    description: 'Combine multiple confidential PDF files into one document free online. 100% client-side WebAssembly merge — files never leave your browser, zero server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Private Client-Side PDF Merger — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF Privately (No Upload) — Combine Sensitive PDFs Locally | iCreatePDF',
    description: 'Combine multiple confidential PDF files into one document free online. 100% client-side WebAssembly merge — files never leave your browser, zero server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function MergePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('merge-pdf')}
      badge="PDF Merger"
      title="Merge PDF Files"
      description="Combine multiple PDF files into a single, organized document. All processing is executed client-side."
      extraSections={<ToolSeoContent content={toolContent['merge-pdf']} />}
    >
      <MergeTool />
    </ToolPageShell>
  );
}
