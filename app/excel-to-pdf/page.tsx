import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExcelToPdfTool } from '@/components/tools/ExcelToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Excel to PDF — Convert Spreadsheet Online Free | iCreatePDF',
  description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables. Customize columns, orientations, margins, and themes client-side — no upload, 100% private.',
  keywords: 'excel to pdf, csv to pdf, convert excel to pdf free, spreadsheet to pdf, convert xlsx to pdf online local, private excel pdf converter',
  alternates: buildAlternates('/excel-to-pdf'),
  openGraph: {
    title: 'Excel to PDF — Convert Spreadsheet Online Free | iCreatePDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables client-side — 100% private, no upload.',
    type: 'website',
  }
};

export default function ExcelToPdfPage() {
  return (
    <ToolPageShell
      badge="File Conversion"
      title="Excel to PDF"
      description="Convert Excel workbooks and CSV spreadsheets into beautifully styled PDF table reports locally in browser memory buffer."
      jsonLd={toolSchema({
        name: 'Excel to PDF Converter',
        description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files into printable, formatted PDF tables without remote uploads.',
        url: '/excel-to-pdf',
      })}
      extraSections={<ToolSeoContent content={toolContent['excel-to-pdf']} />}
    >
      <ExcelToPdfTool />
    </ToolPageShell>
  );
}
