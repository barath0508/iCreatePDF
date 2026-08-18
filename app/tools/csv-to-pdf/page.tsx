import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { CsvToPdfTool } from '@/components/tools/CsvToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'CSV to PDF Table Converter Online Free | iCreatePDF',
  description: 'Convert CSV spreadsheet files into clean, formatted, printable PDF tables with custom styling. 100% private client-side processing without server uploads.',
  keywords: 'csv to pdf converter, convert csv to pdf online, csv to pdf table, format csv as pdf free, csv file to pdf generator, private csv pdf converter, spreadsheet data to pdf report, csv to printable pdf, tabular data to pdf converter, auto fit csv to pdf, convert excel csv to pdf free, export csv table as pdf',
  alternates: buildAlternates('/tools/csv-to-pdf'),
  openGraph: {
    title: 'CSV to PDF Table Converter Online Free | iCreatePDF',
    description: 'Convert CSV spreadsheet files into clean, formatted, printable PDF tables with custom styling. 100% private client-side processing without server uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'CSV to PDF Table Converter — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV to PDF Table Converter Online Free | iCreatePDF',
    description: 'Convert CSV spreadsheet files into clean, formatted, printable PDF tables with custom styling. 100% private client-side processing without server uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function CsvToPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('csv-to-pdf')}
      badge="Spreadsheet Converter"
      title="CSV to PDF Table Converter"
      description="Convert CSV data sheets directly into formatted PDF tables with headers."
      extraSections={<ToolSeoContent content={toolContent['csv-to-pdf']} />}
    >
      <CsvToPdfTool />
    </ToolPageShell>
  );
}
