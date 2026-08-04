import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { Pdf3DFlipbookTool } from '@/components/tools/Pdf3DFlipbookTool';

export const metadata: Metadata = {
  title: 'Interactive 3D PDF Flipbook Reader | iCreatePDF',
  description: 'Convert PDF catalogs, e-books, magazines, and brochures into a double-page flipbook reader with a 3D perspective, directly in your web browser.',
  keywords: '3d pdf flipbook, interactive pdf reader, 3d book page flip pdf, online ebook flipbook viewer, double page spread pdf viewer',
  alternates: buildAlternates('/tools/pdf-3d-flipbook'),
  openGraph: {
    title: 'Interactive 3D PDF Flipbook Reader',
    description: 'Convert PDF catalogs, e-books, and brochures into a double-page flipbook reader with a 3D perspective.',
  },
};

export default function Pdf3DFlipbookPage() {
  return (
    <ToolPageShell
      title="Interactive 3D PDF Flipbook Reader"
      description="Experience digital e-books, catalogs, and brochures as a double-page spread with a 3D-style perspective."
      badge="3D INTERACTIVE READER"
      canonicalPath="/pdf-3d-flipbook"
      jsonLd={toolSchema({
        name: 'Interactive 3D PDF Flipbook Reader',
        description: 'Convert PDF catalogs, e-books, and brochures into a double-page flipbook reader with a 3D perspective.',
        url: '/pdf-3d-flipbook',
      })}
      extraSections={<ToolSeoContent content={toolContent['pdf-3d-flipbook']} />}
    >
      <Pdf3DFlipbookTool />
    </ToolPageShell>
  );
}
