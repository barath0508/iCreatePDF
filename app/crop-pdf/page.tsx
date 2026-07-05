import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CropTool } from '@/components/tools/CropTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Crop PDF Pages Online Free | iCreatePDF',
  description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
  keywords: 'crop pdf, trim pdf margins, remove pdf borders, crop pdf pages online free, pdf margin trimmer',
  alternates: buildAlternates('/crop-pdf'),
  openGraph: {
    title: 'Crop PDF Pages Online Free | iCreatePDF',
    description: 'Crop PDF pages by trimming margins from any side. Remove scanner borders, white space, and unwanted margins from all pages locally.',
    type: 'website',
  }
};

export default function CropPdfPage() {
  return (
    <ToolPageShell badge="Page Editor" title="Crop PDF Pages" description="Remove scanner borders and excess whitespace by trimming page margins.">
      <CropTool />
    </ToolPageShell>
  );
}
