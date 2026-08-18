import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfReadingThemesTool } from '@/components/tools/PdfReadingThemesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Reading Themes — Sepia, Dark Mode & Solarized Reader | iCreatePDF',
  description: 'Read PDF documents comfortably with custom color themes (Dark Mode, Sepia, Solarized, High Contrast) to reduce eye fatigue.',
  keywords: 'pdf reading themes, sepia pdf reader, dark mode pdf viewer, solarized theme pdf, reading view for pdf, eye strain relief pdf, comfortable reading pdf online, custom theme pdf viewer, high contrast pdf reading, read pdf online with themes',
  alternates: buildAlternates('/tools/pdf-reading-themes'),
  openGraph: {
    title: 'PDF Reading Themes — Sepia, Dark Mode & Solarized Reader | iCreatePDF',
    description: 'Read PDF documents comfortably with custom color themes (Dark Mode, Sepia, Solarized, High Contrast) to reduce eye fatigue.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Reading Themes & Viewer — iCreatePDF' }],
  },
};

export default function PdfReadingThemesToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'PDF Reading Themes & Viewer',
          description: 'Read PDF documents comfortably with custom color themes (Dark Mode, Sepia, Solarized, High Contrast) to reduce eye fatigue.',
          url: '/tools/pdf-reading-themes',
        }),
        faqSchema(toolContent['pdf-reading-themes'].faqs),
        howToSchema({
          name: 'PDF Reading Themes & Viewer',
          description: toolContent['pdf-reading-themes'].overview,
          url: '/tools/pdf-reading-themes',
          steps: toolContent['pdf-reading-themes'].steps,
        }),
      ]}badge="Reading Utility"
      title="PDF Reading Themes"
      description="Apply Sepia, Warm Amber, Soft Mint, or Dark filters to reduce eye strain."
      extraSections={<ToolSeoContent content={toolContent['pdf-reading-themes']} />}
    >
      <PdfReadingThemesTool />
    </ToolPageShell>
  );
}
