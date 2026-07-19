import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CropTool } from '@/components/tools/CropTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Crop PDF Pages Online Free | iCreatePDF',
  description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
  keywords: 'i2pdf crop, pdf cut pages, crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer, cut pages in pdf, crop pdf online i2pdf',
  alternates: buildAlternates('/tools/crop-pdf'),
  openGraph: {
    title: 'Crop PDF Pages Online Free | iCreatePDF',
    description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
    type: 'website',
  }
};

export default function CropPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Crop PDF Pages',
        description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
        url: '/tools/crop-pdf',
      })}
      badge="Page Editor"
      title="Crop PDF Pages"
      description="Remove scanner borders and excess whitespace by trimming page margins."
      extraSections={<ToolSeoContent content={toolContent['crop-pdf']} />}
    >
      <CropTool />
    </ToolPageShell>
  );
}
