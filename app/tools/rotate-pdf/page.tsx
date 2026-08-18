import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RotateTool } from '@/components/tools/RotateTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Rotate PDF Free Online — Rotate PDF Pages and Save Permanently | iCreatePDF',
  description: 'Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scans 100% locally in browser memory.',
  keywords: 'rotate pdf, rotate pdf pages, turn pdf upside down fix, rotate and save pdf, pdf orientation changer, how to rotate one page in pdf, rotate landscape to portrait pdf, flip pdf pages, rotate all pages in pdf free, rotate pdf sideways to normal, permanently rotate pdf online',
  alternates: buildAlternates('/tools/rotate-pdf'),
  openGraph: {
    title: 'Rotate PDF Free Online — Rotate PDF Pages and Save Permanently | iCreatePDF',
    description: 'Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scans 100% locally in browser memory.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Rotate PDF Pages & Save — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rotate PDF Free Online — Rotate PDF Pages and Save Permanently | iCreatePDF',
    description: 'Rotate PDF pages 90, 180, or 270 degrees and save permanently. Fix sideways or upside-down scans 100% locally in browser memory.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function RotatePdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('rotate-pdf')}
      badge="PDF Page Rotator"
      title="Rotate PDF Pages"
      description="Rotate specific pages of your PDF document or apply a bulk clockwise rotation to all pages locally."
      extraSections={<ToolSeoContent content={toolContent['rotate-pdf']} />}
    >
      <RotateTool />
    </ToolPageShell>
  );
}
