import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RepairTool } from '@/components/tools/RepairTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Repair PDF Online Free - Fix Corrupted PDF Files | iCreatePDF',
  description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
  keywords: 'repair pdf, fix corrupted pdf, recover damaged pdf, pdf repair tool online free, fix broken pdf',
  alternates: buildAlternates('/repair-pdf'),
  openGraph: {
    title: 'Repair PDF Online Free - Fix Corrupted PDF Files | iCreatePDF',
    description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
    type: 'website',
  }
};

export default function RepairPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Repair PDF',
        description: 'Fix corrupted, damaged, or broken PDF files online. Rebuilds cross-reference tables and object streams to recover readable documents locally.',
        url: '/repair-pdf',
      })}
      badge="PDF Recovery"
      title="Repair PDF"
      description="Attempt to recover corrupted or damaged PDF files by rebuilding their internal structure."
      extraSections={<ToolSeoContent content={toolContent['repair-pdf']} />}
    >
      <RepairTool />
    </ToolPageShell>
  );
}
