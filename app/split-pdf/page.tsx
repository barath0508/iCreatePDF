import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SplitTool } from '@/components/tools/SplitTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Split PDF Online - Free & Private | iCreatePDF',
  description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
  keywords: 'split pdf, extract pages pdf, split pdf online, split pdf free, private pdf splitter',
  alternates: buildAlternates('/split-pdf'),
  openGraph: {
    title: 'Split PDF Online - Free & Private | iCreatePDF',
    description: 'Extract page ranges or separate all pages in a PDF. 100% client-side, drag & drop files, and download split parts instantly.',
    type: 'website',
  }
};

export default function SplitPdfPage() {
  return (
    <ToolPageShell badge="PDF Splitter" title="Split PDF Files" description="Extract individual pages or select custom ranges from your PDF document locally inside your browser.">
      <SplitTool />
    </ToolPageShell>
  );
}
