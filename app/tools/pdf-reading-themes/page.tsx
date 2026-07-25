import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfReadingThemesTool } from '@/components/tools/PdfReadingThemesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Reading Themes � Free, Private, No Upload | iCreatePDF',
  description: 'Apply Sepia, Warm Amber, Soft Mint, or Dark filters to reduce eye strain. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/pdf-reading-themes'),
  openGraph: {
    title: 'PDF Reading Themes � iCreatePDF',
    description: 'Apply Sepia, Warm Amber, Soft Mint, or Dark filters to reduce eye strain.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Reading Themes � iCreatePDF' }],
  },
};

export default function PdfReadingThemesToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF Reading Themes',
        description: 'Apply Sepia, Warm Amber, Soft Mint, or Dark filters to reduce eye strain.',
        url: '/tools/pdf-reading-themes',
      })}
      badge="Reading Utility"
      title="PDF Reading Themes"
      description="Apply Sepia, Warm Amber, Soft Mint, or Dark filters to reduce eye strain."
      extraSections={<ToolSeoContent content={toolContent['pdf-reading-themes']} />}
    >
      <PdfReadingThemesTool />
    </ToolPageShell>
  );
}
