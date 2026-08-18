import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { InvertTool } from '@/components/tools/InvertTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invert PDF Colors Online — Dark Mode & High Contrast PDF | iCreatePDF',
  description: 'Invert PDF colors to enable dark mode for night reading and reduce eye strain. Invert black and white scans 100% locally in your browser.',
  keywords: 'invert pdf, invert pdf colors, dark mode pdf, pdf night mode converter, invert black and white pdf, high contrast pdf reader, read pdf in dark mode, invert scanned document colors, reverse pdf colors online, eye friendly pdf inverter, negative pdf reader online',
  alternates: buildAlternates('/tools/invert-pdf'),
  openGraph: {
    title: 'Invert PDF Colors Online — Dark Mode & High Contrast PDF | iCreatePDF',
    description: 'Invert PDF colors to enable dark mode for night reading and reduce eye strain. Invert black and white scans 100% locally in your browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Invert PDF Colors & Dark Mode — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invert PDF Colors Online — Dark Mode & High Contrast PDF | iCreatePDF',
    description: 'Invert PDF colors to enable dark mode for night reading and reduce eye strain. Invert black and white scans 100% locally in your browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function InvertPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('invert-pdf')}
      badge="Dark Mode"
      title="Invert PDF Colors"
      description="Flip every pixel — turn white pages black for night reading and eye strain reduction."
      extraSections={<ToolSeoContent content={toolContent['invert-pdf']} />}
    >
      <InvertTool />
    </ToolPageShell>
  );
}
