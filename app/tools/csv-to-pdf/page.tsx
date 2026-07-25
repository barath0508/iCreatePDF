import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CsvToPdfTool } from '@/components/tools/CsvToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'CSV to PDF Table Converter � Free, Private, No Upload | iCreatePDF',
  description: 'Convert CSV data sheets directly into formatted PDF tables with headers. 100% private � files process inside browser memory.',
  alternates: buildAlternates('/tools/csv-to-pdf'),
  openGraph: {
    title: 'CSV to PDF Table Converter � iCreatePDF',
    description: 'Convert CSV data sheets directly into formatted PDF tables with headers.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'CSV to PDF Table Converter � iCreatePDF' }],
  },
};

export default function CsvToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'CSV to PDF Table Converter',
        description: 'Convert CSV data sheets directly into formatted PDF tables with headers.',
        url: '/tools/csv-to-pdf',
      })}
      badge="Spreadsheet Converter"
      title="CSV to PDF Table Converter"
      description="Convert CSV data sheets directly into formatted PDF tables with headers."
      extraSections={<ToolSeoContent content={toolContent['csv-to-pdf']} />}
    >
      <CsvToPdfTool />
    </ToolPageShell>
  );
}
