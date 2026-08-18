import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { AutoCropTool } from '@/components/tools/AutoCropTool';

export const metadata: Metadata = {
  title: 'Auto-Crop PDF Online — Smart Margin & Whitespace Trimmer | iCreatePDF',
  description: 'Automatically detect and crop blank margins, scanner borders, and excess white space from PDF pages. Optimize documents for Kindle, tablet, and mobile locally.',
  keywords: 'auto crop pdf, automatic pdf margin cropper, trim pdf whitespace, remove scanner black borders pdf, optimize pdf for kindle, auto crop pdf pages online, smart pdf cropper, remove white borders from pdf, batch crop pdf automatically, trim scanned pdf margins, automatic margin detector pdf, crop scanned book pdf, kindle pdf optimizer, trim whitespace from pdf free, crop pdf for ipad',
  alternates: buildAlternates('/tools/auto-crop-pdf'),
  openGraph: {
    title: 'Auto-Crop PDF Online — Smart Margin & Whitespace Trimmer | iCreatePDF',
    description: 'Automatically detect and crop blank margins, scanner borders, and excess white space from PDF pages. Optimize documents for Kindle, tablet, and mobile locally.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Smart Auto-Crop PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Crop PDF Online — Smart Margin & Whitespace Trimmer | iCreatePDF',
    description: 'Automatically detect and crop blank margins, scanner borders, and excess white space from PDF pages. Optimize documents for Kindle, tablet, and mobile locally.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function AutoCropPdfPage() {
  return (
    <ToolPageShell
      title="Smart Auto-Crop & Margin Optimizer"
      description="Detect and trim blank margins, scanner borders, and excess whitespace to optimize PDFs for small screens and e-readers."
      badge="MARGIN OPTIMIZER ENGINE"
      canonicalPath="/auto-crop-pdf"
      jsonLd={getToolFullJsonLd('auto-crop-pdf')}
      extraSections={<ToolSeoContent content={toolContent['auto-crop-pdf']} />}
    >
      <AutoCropTool />
    </ToolPageShell>
  );
}
