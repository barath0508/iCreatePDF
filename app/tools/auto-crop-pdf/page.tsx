import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { AutoCropTool } from '@/components/tools/AutoCropTool';

export const metadata: Metadata = {
  title: 'Smart Auto-Crop PDF — Trim Blank Margins | iCreatePDF',
  description: 'Automatically scan and crop blank margins, scanner borders, and excess white space from PDF pages. Optimize documents for Kindle, mobile, and tablets 100% locally.',
  keywords: 'auto crop pdf, automatic pdf margin cropper, trim pdf whitespace, remove scanner black borders pdf, optimize pdf for kindle',
  alternates: buildAlternates('/tools/auto-crop-pdf'),
  openGraph: {
    title: 'Smart Auto-Crop PDF — Detect & Trim Blank Margins',
    description: 'Automatically scan and crop blank margins, scanner borders, and excess white space from PDF pages.',
  },
};

export default function AutoCropPdfPage() {
  return (
    <ToolPageShell
      title="Smart Auto-Crop & Margin Optimizer"
      description="Detect and trim blank margins, scanner borders, and excess whitespace to optimize PDFs for small screens and e-readers."
      badge="MARGIN OPTIMIZER ENGINE"
      canonicalPath="/auto-crop-pdf"
      jsonLd={toolSchema({
        name: 'Smart Auto-Crop & Margin Optimizer',
        description: 'Automatically scan and crop blank margins, scanner borders, and excess white space from PDF pages.',
        url: '/auto-crop-pdf',
      })}
      extraSections={<ToolSeoContent content={toolContent['auto-crop-pdf']} />}
    >
      <AutoCropTool />
    </ToolPageShell>
  );
}
