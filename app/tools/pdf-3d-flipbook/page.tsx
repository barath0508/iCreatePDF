import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { Pdf3DFlipbookTool } from '@/components/tools/Pdf3DFlipbookTool';

export const metadata: Metadata = {
  title: 'Interactive 3D PDF Flipbook Reader — Free Online Viewer | iCreatePDF',
  description: 'Convert PDF catalogs, e-books, magazines, and brochures into an interactive 3D double-page flipbook reader directly in your web browser.',
  keywords: '3d pdf flipbook, interactive pdf reader, 3d book page flip pdf, online ebook flipbook viewer, double page spread pdf viewer',
  alternates: buildAlternates('/tools/pdf-3d-flipbook'),
  openGraph: {
    title: 'Interactive 3D PDF Flipbook Reader',
    description: 'Convert PDF catalogs, e-books, and brochures into an interactive 3D double-page flipbook reader.',
  },
};

const faqs = [
  {
    question: 'How does the 3D flipbook viewer work?',
    answer: 'It renders your PDF pages into high-resolution canvas textures displayed in a realistic double-page 3D spread with animated page turns.',
  },
  {
    question: 'Can I auto-flip through pages like a presentation?',
    answer: 'Yes! Click the Auto Flip button to start an automatic slideshow loop.',
  },
];

export default function Pdf3DFlipbookPage() {
  return (
    <ToolPageShell
      title="Interactive 3D PDF Flipbook Reader"
      description="Experience digital e-books, catalogs, and brochures with a realistic double-page 3D page-flipping spread."
      badge="3D INTERACTIVE READER"
      canonicalPath="/pdf-3d-flipbook"
      jsonLd={[
        ...toolSchema({
          name: 'Interactive 3D PDF Flipbook Reader',
          description: 'Convert PDF catalogs, e-books, and brochures into an interactive 3D double-page flipbook reader.',
          url: '/pdf-3d-flipbook',
        }),
        faqSchema(faqs),
      ]}
    >
      <Pdf3DFlipbookTool />
    </ToolPageShell>
  );
}
