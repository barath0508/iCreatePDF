import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ExcelToPdfTool } from '@/components/tools/ExcelToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Excel to PDF Converter Free Online (XLS/XLSX to PDF) | iCreatePDF',
  description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV into clean, printable PDF documents. Auto-fit table margins and orientation. 100% private.',
  keywords: 'excel to pdf, convert excel to pdf free, spreadsheet to pdf, convert xlsx to pdf online, convert xls to pdf, private excel pdf converter, fit excel sheet to pdf page, excel workbook to pdf document, convert excel tables to pdf, export xlsx as pdf free, excel to pdf high resolution',
  alternates: buildAlternates('/tools/excel-to-pdf'),
  openGraph: {
    title: 'Excel to PDF Converter Free Online (XLS/XLSX to PDF) | iCreatePDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV into clean, printable PDF documents. Auto-fit table margins and orientation. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert Excel to PDF — iCreatePDF' }],
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
