import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { Pdf3DFlipbookTool } from '@/components/tools/Pdf3DFlipbookTool';

export const metadata: Metadata = {
  title: 'PDF 3D Flipbook Viewer — Interactive Page Turn Experience | iCreatePDF',
  description: 'Convert flat PDF documents into interactive 3D virtual flipbooks with realistic page-turning animations and sounds. 100% browser-based.',
  keywords: 'pdf 3d flipbook, 3d flipbook viewer, interactive pdf flipbook, convert pdf to flipbook free, online flipbook maker, realistic page turn pdf, digital flipbook reader, 3d book presentation pdf, interactive magazine pdf viewer, embed 3d flipbook',
  alternates: buildAlternates('/tools/pdf-3d-flipbook'),
  openGraph: {
    title: 'PDF 3D Flipbook Viewer — Interactive Page Turn Experience | iCreatePDF',
    description: 'Convert flat PDF documents into interactive 3D virtual flipbooks with realistic page-turning animations and sounds. 100% browser-based.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: '3D PDF Flipbook Viewer — iCreatePDF' }],
  },
};

export default function Pdf3DFlipbookPage() {
  return (
    <ToolPageShell
      title="Interactive 3D PDF Flipbook Reader"
      description="Experience digital e-books, catalogs, and brochures as a double-page spread with a 3D-style perspective."
      badge="3D INTERACTIVE READER"
      canonicalPath="/pdf-3d-flipbook"
      jsonLd={[
        ...toolSchema({
          name: '3D PDF Flipbook Viewer',
          description: 'Convert flat PDF documents into interactive 3D virtual flipbooks with realistic page-turning animations and sounds. 100% browser-based.',
          url: '/tools/pdf-3d-flipbook',
        }),
        faqSchema(toolContent['pdf-3d-flipbook'].faqs),
        howToSchema({
          name: '3D PDF Flipbook Viewer',
          description: toolContent['pdf-3d-flipbook'].overview,
          url: '/tools/pdf-3d-flipbook',
          steps: toolContent['pdf-3d-flipbook'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['pdf-3d-flipbook']} />}
    >
      <Pdf3DFlipbookTool />
    </ToolPageShell>
  );
}
