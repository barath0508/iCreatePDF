import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { InvertTool } from '@/components/tools/InvertTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invert PDF Colors Online — Dark Mode & High Contrast PDF | iCreatePDF',
  description: 'Invert PDF colors to enable dark mode for night reading and reduce eye strain. Invert black and white scans 100% locally in your browser.',
  keywords: 'invert pdf, invert pdf colors, dark mode pdf, pdf night mode converter, invert black and white pdf, high contrast pdf reader, read pdf in dark mode, invert scanned document colors, reverse pdf colors online, eye friendly pdf inverter',
  alternates: buildAlternates('/tools/invert-pdf'),
  openGraph: {
    title: 'PDF Color Inverter: Invert PDF Colors Free | iCreatePDF',
    description: 'Free online PDF color inverter. Create a dark mode version of any PDF for night reading, reverse document colors online to reduce eye strain. 100% private.',
    type: 'website',
  }
};

export default function InvertPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Invert PDF Colors & Dark Mode',
          description: 'Invert PDF colors to enable dark mode for night reading and reduce eye strain. Invert black and white scans 100% locally in your browser.',
          url: '/tools/invert-pdf',
        }),
        faqSchema(toolContent['invert-pdf'].faqs),
        howToSchema({
          name: 'Invert PDF Colors & Dark Mode',
          description: toolContent['invert-pdf'].overview,
          url: '/tools/invert-pdf',
          steps: toolContent['invert-pdf'].steps,
        }),
      ]}badge="Dark Mode"
      title="Invert PDF Colors"
      description="Flip every pixel — turn white pages black for night reading and eye strain reduction."
      extraSections={<ToolSeoContent content={toolContent['invert-pdf']} />}
    >
      <InvertTool />
    </ToolPageShell>
  );
}
