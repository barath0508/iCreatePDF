import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { InvertTool } from '@/components/tools/InvertTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invert PDF Online: Flip PDF Colors Online Free | iCreatePDF',
  description: 'Invert PDF colors online for free. Create a dark mode version of any PDF for night reading, reduce eye strain, and save printer ink. 100% private.',
  keywords: 'invert pdf online, invert pdf, pdf dark mode converter, pdf reverse color, invert pdf colors, dark mode pdf, pdf color inverter, night mode pdf, invert pdf online free',
  alternates: buildAlternates('/invert-pdf'),
  openGraph: {
    title: 'Invert PDF Online: Flip PDF Colors Online Free | iCreatePDF',
    description: 'Invert PDF colors online for free. Create a dark mode version of any PDF for night reading, reduce eye strain, and save printer ink. 100% private.',
    type: 'website',
  }
};

export default function InvertPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Invert PDF Colors',
        description: 'Invert the colors of your PDF to create a dark mode version. Ideal for night reading, reducing eye strain, and saving white ink when printing.',
        url: '/invert-pdf',
      })}
      badge="Dark Mode"
      title="Invert PDF Colors"
      description="Flip every pixel — turn white pages black for night reading and eye strain reduction."
      extraSections={<ToolSeoContent content={toolContent['invert-pdf']} />}
    >
      <InvertTool />
    </ToolPageShell>
  );
}
