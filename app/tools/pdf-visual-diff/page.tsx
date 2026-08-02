import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
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

const faqs = [
  {
    question: 'How does visual pixel diff work?',
    answer: 'Our engine renders both documents to canvas buffers and compares pixel luminance values, highlighting added or changed elements in bright red.',
  },
  {
    question: 'What is the curtain slider view?',
    answer: 'The curtain slider lets you drag a divider back and forth across the page to inspect micro-changes between Revision A and Revision B.',
  },
];

export default function PdfVisualDiffPage() {
  return (
    <ToolPageShell
      title="PDF Visual Pixel & Text Diff Engine"
      description="Identify layout updates, visual discrepancies, and text changes between two document revisions instantly."
      badge="VISUAL COMPARISON ENGINE"
      canonicalPath="/pdf-visual-diff"
      jsonLd={[
        ...toolSchema({
          name: 'PDF Visual Pixel & Text Diff Engine',
          description: 'Compare two PDF revisions side-by-side or using a visual pixel diff curtain slider 100% locally.',
          url: '/pdf-visual-diff',
        }),
        faqSchema(faqs),
      ]}
    >
      <PdfVisualDiffTool />
    </ToolPageShell>
  );
}
