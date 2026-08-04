import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfVisualDiffTool } from '@/components/tools/PdfVisualDiffTool';

export const metadata: Metadata = {
  title: 'PDF Visual Pixel & Text Diff Engine | iCreatePDF',
  description: 'Automated visual regression and text comparison tool for PDF files. Compare two PDF revisions side-by-side or using a visual pixel diff curtain slider 100% locally.',
  keywords: 'pdf visual diff, compare pdf pixel diff, pdf revision compare, visual pdf diff slider, text diff pdf tool, zero server pdf comparison',
  alternates: buildAlternates('/tools/pdf-visual-diff'),
  openGraph: {
    title: 'PDF Visual Pixel & Text Diff Engine',
    description: 'Compare two PDF revisions side-by-side or using a visual pixel diff curtain slider 100% locally.',
  },
};

export default function PdfVisualDiffPage() {
  return (
    <ToolPageShell
      title="PDF Visual Pixel & Text Diff Engine"
      description="Identify layout updates, visual discrepancies, and text changes between two document revisions instantly."
      badge="VISUAL COMPARISON ENGINE"
      canonicalPath="/pdf-visual-diff"
      jsonLd={toolSchema({
        name: 'PDF Visual Pixel & Text Diff Engine',
        description: 'Compare two PDF revisions side-by-side or using a visual pixel diff curtain slider 100% locally.',
        url: '/pdf-visual-diff',
      })}
      extraSections={<ToolSeoContent content={toolContent['pdf-visual-diff']} />}
    >
      <PdfVisualDiffTool />
    </ToolPageShell>
  );
}
