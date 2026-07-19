import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PreventCopyTool } from '@/components/tools/PreventCopyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Prevent PDF Copy Online Free - Make PDF Non-Copyable | iCreatePDF',
  description: 'Rasterize PDF pages into flat images to prevent direct text highlighting, selection, and copying. Processed 100% locally in-browser for absolute privacy.',
  keywords: 'prevent pdf copy, make pdf non-copyable, disable text selection pdf, protect pdf from copying, rasterize pdf online free',
  alternates: buildAlternates('/tools/prevent-copy'),
  openGraph: {
    title: 'Prevent PDF Copy Online Free - Make PDF Non-Copyable | iCreatePDF',
    description: 'Rasterize PDF pages into flat images to prevent direct text highlighting, selection, and copying. Processed 100% locally in-browser for absolute privacy.',
    type: 'website',
  }
};

export default function PreventCopyPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Prevent PDF Copy',
        description: 'Prevent text copying, text selection, and extraction from your PDF files. Rasterize your PDF pages client-side to make the PDF non-copyable for free.',
        url: '/tools/prevent-copy',
      })}
      badge="Security"
      title="Prevent PDF Copy"
      description="Disable text selection and copying. Converts text pages to flat images to make files copy-proof."
      extraSections={<ToolSeoContent content={toolContent['prevent-copy']} />}
    >
      <PreventCopyTool />
    </ToolPageShell>
  );
}
