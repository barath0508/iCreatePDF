import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Edit PDF Free Online — Add Text, Annotations & Shapes | iCreatePDF',
  description: 'Edit PDF documents online free. Add text overlays, comments, highlights, drawings, and shapes locally in browser memory. 100% secure, zero uploads.',
  keywords: 'edit pdf, annotate pdf, add text to pdf, overlay text on pdf, edit pdf free online, write on pdf online, private pdf editor, pdf markup tool online, insert text into pdf document, free browser pdf editor, highlight and draw on pdf, edit pdf without adobe acrobat, add comments to pdf online, client side pdf editor, best free online pdf editor',
  alternates: buildAlternates('/tools/edit-pdf'),
  openGraph: {
    title: 'Edit PDF Free Online — Add Text, Annotations & Shapes | iCreatePDF',
    description: 'Edit PDF documents online free. Add text overlays, comments, highlights, drawings, and shapes locally in browser memory. 100% secure, zero uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Edit PDF & Add Annotations — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edit PDF Free Online — Add Text, Annotations & Shapes | iCreatePDF',
    description: 'Edit PDF documents online free. Add text overlays, comments, highlights, drawings, and shapes locally in browser memory. 100% secure, zero uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function EditPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('edit-pdf')}
      badge="PDF Annotations"
      title="Edit PDF Annotations"
      description="Insert custom text overlay boxes and position them on PDF layouts client-side."
      extraSections={<ToolSeoContent content={toolContent['edit-pdf']} />}
    >
      <EditPdfTool />
    </ToolPageShell>
  );
}
