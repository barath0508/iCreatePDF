import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FormDataExtractorTool } from '@/components/tools/FormDataExtractorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Export PDF Form Data � Free, Private, No Upload | iCreatePDF',
  description: 'Extract filled AcroForm fields from single or multiple PDFs into CSV spreadsheets. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/export-pdf-form-data'),
  openGraph: {
    title: 'Export PDF Form Data � iCreatePDF',
    description: 'Extract filled AcroForm fields from single or multiple PDFs into CSV spreadsheets.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Export PDF Form Data � iCreatePDF' }],
  },
};

export default function FormDataExtractorToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Export PDF Form Data',
        description: 'Extract filled AcroForm fields from single or multiple PDFs into CSV spreadsheets.',
        url: '/tools/export-pdf-form-data',
      })}
      badge="Data Extraction"
      title="Export PDF Form Data"
      description="Extract filled AcroForm fields from single or multiple PDFs into CSV spreadsheets."
      extraSections={<ToolSeoContent content={toolContent['export-pdf-form-data']} />}
    >
      <FormDataExtractorTool />
    </ToolPageShell>
  );
}
