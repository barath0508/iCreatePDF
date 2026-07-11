import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { InvertTool } from '@/components/tools/InvertTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invert PDF Colors Online Free - Dark Mode PDF | iCreatePDF',
  description: 'Invert the colors of your PDF to create a dark mode version. Ideal for night reading, reducing eye strain, and saving white ink when printing.',
  keywords: 'invert pdf colors, dark mode pdf, pdf color inverter, night mode pdf, invert pdf online free',
  alternates: buildAlternates('/invert-pdf'),
  openGraph: {
    title: 'Invert PDF Colors Online Free - Dark Mode PDF | iCreatePDF',
    description: 'Invert the colors of your PDF to create a dark mode version. Ideal for night reading, reducing eye strain, and saving white ink when printing.',
    type: 'website',
  }
};

export default function InvertPdfPage() {
  return (
    <ToolPageShell
      badge="Dark Mode"
      title="Invert PDF Colors"
      description="Flip every pixel — turn white pages black for night reading and eye strain reduction."
      extraSections={<ToolSeoContent content={toolContent['invert-pdf']} />}
    >
      <InvertTool />
    </ToolPageShell>
  );
}
