import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PreventCopyTool } from '@/components/tools/PreventCopyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Prevent PDF Copying Online Free — Disable Text Selection & Extraction | iCreatePDF',
  description: 'Flatten and rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private client-side security tool.',
  keywords: 'prevent copy pdf, disable text selection pdf, rasterize pdf to prevent copying, make pdf uncopyable, protect pdf from being copied, disable copy paste pdf, disable text extraction from pdf, lock pdf content, prevent copying text from pdf, anti copying pdf security',
  alternates: buildAlternates('/tools/prevent-copy'),
  openGraph: {
    title: 'Prevent PDF Copying Online Free — Disable Text Selection & Extraction | iCreatePDF',
    description: 'Flatten and rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private client-side security tool.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Prevent PDF Text Copying — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prevent PDF Copying Online Free — Disable Text Selection & Extraction | iCreatePDF',
    description: 'Flatten and rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private client-side security tool.',
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
