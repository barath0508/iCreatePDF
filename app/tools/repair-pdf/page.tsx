import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RepairTool } from '@/components/tools/RepairTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Repair PDF Online Free — Fix Corrupted & Damaged PDF Files | iCreatePDF',
  description: 'Recover and repair corrupted, damaged, or unreadable PDF files online free. Rebuild cross-reference tables 100% privately in your browser.',
  keywords: 'repair pdf, fix corrupted pdf, recover damaged pdf, repair broken pdf file, pdf recovery online, uncorrupt pdf free, restore unreadable pdf, fix damaged pdf headers, repair truncated pdf document',
  alternates: buildAlternates('/tools/repair-pdf'),
  openGraph: {
    title: 'Repair PDF Free - Fix Corrupted PDF | iCreatePDF',
    description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
    type: 'website',
  }
};

export default function RepairPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Repair Corrupted PDF Files',
          description: 'Recover and repair corrupted, damaged, or unreadable PDF files online free. Rebuild cross-reference tables 100% privately in your browser.',
          url: '/tools/repair-pdf',
        }),
        faqSchema(toolContent['repair-pdf'].faqs),
        howToSchema({
          name: 'Repair Corrupted PDF Files',
          description: toolContent['repair-pdf'].overview,
          url: '/tools/repair-pdf',
          steps: toolContent['repair-pdf'].steps,
        }),
      ]}badge="PDF Recovery"
      title="Repair PDF"
      description="Attempt to recover corrupted or damaged PDF files by rebuilding their internal structure."
      extraSections={<ToolSeoContent content={toolContent['repair-pdf']} />}
    >
      <RepairTool />
    </ToolPageShell>
  );
}
