import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { AdjustMarginsTool } from '@/components/tools/AdjustMarginsTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Adjust PDF Margins — Free, Private, No Upload | iCreatePDF',
  description: 'Add extra border padding for hole-punching, binder binding, or margin notes. 100% private — files process inside browser memory.',
  alternates: buildAlternates('/tools/adjust-pdf-margins'),
  openGraph: {
    title: 'Adjust PDF Margins — iCreatePDF',
    description: 'Add extra border padding for hole-punching, binder binding, or margin notes.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Adjust PDF Margins — iCreatePDF' }],
  },
};

export default function AdjustMarginsToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Adjust PDF Margins',
        description: 'Add extra border padding for hole-punching, binder binding, or margin notes.',
        url: '/tools/adjust-pdf-margins',
      })}
      badge="Page Layout"
      title="Adjust PDF Margins"
      description="Add extra border padding for hole-punching, binder binding, or margin notes."
      extraSections={<ToolSeoContent content={toolContent['adjust-pdf-margins']} />}
    >
      <AdjustMarginsTool />
    </ToolPageShell>
  );
}
