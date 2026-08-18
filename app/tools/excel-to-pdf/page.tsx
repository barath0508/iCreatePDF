import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExcelToPdfTool } from '@/components/tools/ExcelToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Excel to PDF Converter Free Online (XLS/XLSX to PDF) | iCreatePDF',
  description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV into clean, printable PDF documents. Auto-fit table margins and orientation. 100% private.',
  keywords: 'excel to pdf, convert excel to pdf free, spreadsheet to pdf, convert xlsx to pdf online, convert xls to pdf, private excel pdf converter, fit excel sheet to pdf page, excel workbook to pdf document, convert excel tables to pdf, export xlsx as pdf free, excel to pdf high resolution, best excel to pdf converter',
  alternates: buildAlternates('/tools/excel-to-pdf'),
  openGraph: {
    title: 'Excel to PDF Converter Free Online (XLS/XLSX to PDF) | iCreatePDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV into clean, printable PDF documents. Auto-fit table margins and orientation. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert Excel to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel to PDF Converter Free Online (XLS/XLSX to PDF) | iCreatePDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV into clean, printable PDF documents. Auto-fit table margins and orientation. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ExcelToPdfPage() {
  return (
    <ToolPageShell
      badge="File Conversion"
      title="Excel to PDF"
      description="Convert Excel workbooks and CSV spreadsheets into beautifully styled PDF table reports locally in browser memory buffer."
      jsonLd={getToolFullJsonLd('excel-to-pdf')}
      extraSections={<ToolSeoContent content={toolContent['excel-to-pdf']} />}
    >
      <ExcelToPdfTool />
    </ToolPageShell>
  );
}
