import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfVisualDiffTool } from '@/components/tools/PdfVisualDiffTool';

export const metadata: Metadata = {
  title: 'PDF Visual Diff — Pixel-by-Pixel Document Comparison | iCreatePDF',
  description: 'Compare two versions of architectural plans, diagrams, or documents with pixel-level visual difference overlays. 100% private.',
  keywords: 'pdf visual diff, compare pdf versions visually, visual diff tool pdf, compare drawings pdf, architectural drawings pdf compare, pixel by pixel pdf diff, highlight differences between two pdfs, visual comparison for pdf blueprints',
  alternates: buildAlternates('/tools/pdf-visual-diff'),
  openGraph: {
    title: 'PDF Visual Diff — Pixel-by-Pixel Document Comparison | iCreatePDF',
    description: 'Compare two versions of architectural plans, diagrams, or documents with pixel-level visual difference overlays. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Visual Diff & Blueprint Compare — iCreatePDF' }],
  },
};

export default function PdfVisualDiffPage() {
  return (
    <ToolPageShell
      title="PDF Visual Pixel & Text Diff Engine"
      description="Identify layout updates, visual discrepancies, and text changes between two document revisions instantly."
      badge="VISUAL COMPARISON ENGINE"
      canonicalPath="/pdf-visual-diff"
      jsonLd={[
        ...toolSchema({
          name: 'PDF Visual Diff & Blueprint Compare',
          description: 'Compare two versions of architectural plans, diagrams, or documents with pixel-level visual difference overlays. 100% private.',
          url: '/tools/pdf-visual-diff',
        }),
        faqSchema(toolContent['pdf-visual-diff'].faqs),
        howToSchema({
          name: 'PDF Visual Diff & Blueprint Compare',
          description: toolContent['pdf-visual-diff'].overview,
          url: '/tools/pdf-visual-diff',
          steps: toolContent['pdf-visual-diff'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['pdf-visual-diff']} />}
    >
      <PdfVisualDiffTool />
    </ToolPageShell>
  );
}
