import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExcelToPdfTool } from '@/components/tools/ExcelToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Excel to PDF Free Online (XLS/XLSX) | iCreatePDF',
  description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV to PDF tables free online. Customize column widths, orientation, and margins. 100% private.',
  keywords: 'excel to pdf, csv to pdf, convert excel to pdf free, spreadsheet to pdf, convert xlsx to pdf online local, private excel pdf converter',
  alternates: buildAlternates('/tools/excel-to-pdf'),
  openGraph: {
    title: 'Convert Excel to PDF Free Online — XLS/XLSX | iCreatePDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables. Customize columns, orientations, margins, and themes client-side — no upload, 100% private.',
    type: 'website',
  }
};

export default function ExcelToPdfPage() {
  return (
    <ToolPageShell
      badge="File Conversion"
      title="Excel to PDF"
      description="Convert Excel workbooks and CSV spreadsheets into beautifully styled PDF table reports locally in browser memory buffer."
      jsonLd={[
        ...toolSchema({
          name: 'Excel to PDF Converter',
          description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files into printable, formatted PDF tables without remote uploads.',
          url: '/tools/excel-to-pdf',
        }),
        faqSchema([
          {
            question: 'How do I convert an Excel file to PDF for free?',
            answer: 'Upload your .xlsx or .xls spreadsheet, preview and adjust column configurations or table styles, and download the formatted PDF document.',
          },
          {
            question: 'Are my spreadsheet data sent to any servers?',
            answer: 'No. iCreatePDF converts spreadsheets locally using client-side JavaScript. Your confidential financial data is never sent to external servers.',
          },
          {
            question: 'Can I convert CSV files to PDF tables?',
            answer: 'Yes, this converter fully supports CSV input, formatting columns and cells into a clean PDF table layout.',
          },
        ]),
        howToSchema({
          name: 'Excel to PDF Converter',
          description: 'Convert XLS, XLSX, and CSV spreadsheets to PDF tables online free.',
          url: '/tools/excel-to-pdf',
          steps: [
            { title: 'Upload Spreadsheet', description: 'Drag and drop your Excel or CSV file into the browser.' },
            { title: 'Preview & Customize', description: 'Set landscape/portrait orientation, adjust column sizes, and choose a theme.' },
            { title: 'Save PDF', description: 'Click Generate PDF to save the printable report.' },
          ],
        }),
      ]}
      extraSections={<ToolSeoContent content={toolContent['excel-to-pdf']} />}
    >
      <ExcelToPdfTool />
    </ToolPageShell>
  );
}
