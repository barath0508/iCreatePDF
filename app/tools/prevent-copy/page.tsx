import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PreventCopyTool } from '@/components/tools/PreventCopyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Prevent Copy PDF — Rasterize Text & Disable Copy-Paste | iCreatePDF',
  description: 'Rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private security tool.',
  keywords: 'prevent copy pdf, disable text selection pdf, rasterize pdf to prevent copying, protect pdf from being copied, lock pdf content, disable copy paste pdf, make pdf uncopyable, flatten pdf text to image, anti copying pdf security, secure pdf against copying, disable text extraction from pdf, lock pdf text selection',
  alternates: buildAlternates('/tools/prevent-copy'),
  openGraph: {
    title: 'Prevent Copy PDF — Rasterize Text & Disable Copy-Paste | iCreatePDF',
    description: 'Rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private security tool.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Prevent PDF Text Copying — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prevent Copy PDF — Rasterize Text & Disable Copy-Paste | iCreatePDF',
    description: 'Rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private security tool.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PreventCopyPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('prevent-copy')}
      badge="Security"
      title="Make PDF Non-Copyable (Prevent PDF Copy)"
      description="Disable text selection and copying. Converts text pages to flat images to make files copy-proof."
      extraSections={<ToolSeoContent content={toolContent['prevent-copy']} />}
    >
      <PreventCopyTool />
    </ToolPageShell>
  );
}
