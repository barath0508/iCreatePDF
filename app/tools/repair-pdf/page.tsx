import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RepairTool } from '@/components/tools/RepairTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Repair PDF Online Free — Fix Corrupted & Damaged PDF Files | iCreatePDF',
  description: 'Recover and repair corrupted, damaged, or unreadable PDF files online free. Rebuild cross-reference tables 100% privately in your browser.',
  keywords: 'repair pdf, fix corrupted pdf, recover damaged pdf, repair broken pdf file, pdf recovery online, uncorrupt pdf free, restore unreadable pdf, fix damaged pdf headers, repair truncated pdf document, salvage unopenable pdf file, fix corrupt pdf file free',
  alternates: buildAlternates('/tools/repair-pdf'),
  openGraph: {
    title: 'Repair PDF Online Free — Fix Corrupted & Damaged PDF Files | iCreatePDF',
    description: 'Recover and repair corrupted, damaged, or unreadable PDF files online free. Rebuild cross-reference tables 100% privately in your browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Repair Corrupted PDF Files — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Repair PDF Online Free — Fix Corrupted & Damaged PDF Files | iCreatePDF',
    description: 'Recover and repair corrupted, damaged, or unreadable PDF files online free. Rebuild cross-reference tables 100% privately in your browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function RepairPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('repair-pdf')}
      badge="PDF Recovery"
      title="Repair PDF"
      description="Attempt to recover corrupted or damaged PDF files by rebuilding their internal structure."
      extraSections={<ToolSeoContent content={toolContent['repair-pdf']} />}
    >
      <RepairTool />
    </ToolPageShell>
  );
}
