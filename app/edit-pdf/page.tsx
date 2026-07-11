import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { EditPdfTool } from '@/components/tools/EditPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Edit PDF Online - Add Text Overlays & Annotations | iCreatePDF',
  description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
  keywords: 'edit pdf, annotate pdf, add text to pdf, overlay text on pdf, edit pdf free online',
  alternates: buildAlternates('/edit-pdf'),
  openGraph: {
    title: 'Edit PDF Online - Add Text Overlays & Annotations | iCreatePDF',
    description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
    type: 'website',
  }
};

export default function EditPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Edit PDF Annotations',
        description: 'Edit PDF files directly in your web browser. Place text overlay annotations, customize colors, and write them back into the PDF.',
        url: '/edit-pdf',
      })}
      badge="PDF Annotations"
      title="Edit PDF Annotations"
      description="Insert custom text overlay boxes and position them on PDF layouts client-side."
      extraSections={<ToolSeoContent content={toolContent['edit-pdf']} />}
    >
      <EditPdfTool />
    </ToolPageShell>
  );
}
