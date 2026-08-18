import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CropTool } from '@/components/tools/CropTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Crop PDF Pages Free Online — Trim Margins & Borders | iCreatePDF',
  description: 'Crop PDF pages online free. Trim whitespace margins, scanner borders, and resize page areas 100% locally in browser memory. No watermark.',
  keywords: 'crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer, cut pages in pdf, crop pdf online, resize pdf canvas, crop white space from pdf, crop pdf page area, trim pdf for mobile reading, i2pdf crop, crop pdf without acrobat, free online pdf page trimmer, crop pdf document on mac',
  alternates: buildAlternates('/tools/crop-pdf'),
  openGraph: {
    title: 'Crop PDF Pages Free Online — Trim Margins & Borders | iCreatePDF',
    description: 'Crop PDF pages online free. Trim whitespace margins, scanner borders, and resize page areas 100% locally in browser memory. No watermark.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Crop PDF Pages — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crop PDF Pages Free Online — Trim Margins & Borders | iCreatePDF',
    description: 'Crop PDF pages online free. Trim whitespace margins, scanner borders, and resize page areas 100% locally in browser memory. No watermark.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function CropPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('crop-pdf')}
      badge="Page Editor"
      title="Crop PDF Pages"
      description="Remove scanner borders and excess whitespace by trimming page margins."
      extraSections={<ToolSeoContent content={toolContent['crop-pdf']} />}
    >
      <CropTool />
    </ToolPageShell>
  );
}
