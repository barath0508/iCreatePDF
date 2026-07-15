import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SplitTool } from '@/components/tools/SplitTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'How to Split PDF Pages Free: Split PDF Online | iCreatePDF',
  description: 'Extract page ranges or separate all pages in a PDF document. Split PDF pages online for free 100% client-side inside your browser sandbox.',
  keywords: 'how to split pdf pages free, split pdf pages free, split pdf, extract pages pdf, split pdf online, split pdf free, private pdf splitter',
  alternates: buildAlternates('/split-pdf'),
  openGraph: {
    title: 'How to Split PDF Pages Free: Split PDF Online | iCreatePDF',
    description: 'Extract page ranges or separate all pages in a PDF document. Split PDF pages online for free 100% client-side inside your browser sandbox.',
    type: 'website',
  }
};

export default function SplitPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Split PDF Files',
        description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
        url: '/split-pdf',
      })}
      badge="PDF Splitter"
      title="Split PDF Files"
      description="Extract individual pages or select custom ranges from your PDF document locally inside your browser."
      extraSections={<ToolSeoContent content={toolContent['split-pdf']} />}
    >
      <SplitTool />
    </ToolPageShell>
  );
}
