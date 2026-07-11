import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { GrayscaleTool } from '@/components/tools/GrayscaleTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Grayscale PDF Online: Convert PDF to Black & White | iCreatePDF',
  description: 'Convert color PDF documents to black and white (grayscale) locally. Optimize your layouts for ink-saving printing client-side.',
  keywords: 'grayscale pdf online, grayscale pdf, convert pdf to black and white, ink saving pdf converter',
  alternates: buildAlternates('/grayscale-pdf'),
  openGraph: {
    title: 'Grayscale PDF Online: Convert PDF to Black & White | iCreatePDF',
    description: 'Convert color PDF documents to black and white (grayscale) locally. Optimize your layouts for ink-saving printing client-side.',
    type: 'website',
  }
};

export default function GrayscalePdfPage() {
  return (
    <ToolPageShell
      badge="Print Optimizer"
      title="Grayscale PDF Converter"
      description="Convert color document pages, figures, and charts to ink-saving black and white."
      extraSections={<ToolSeoContent content={toolContent['grayscale-pdf']} />}
    >
      <GrayscaleTool />
    </ToolPageShell>
  );
}
