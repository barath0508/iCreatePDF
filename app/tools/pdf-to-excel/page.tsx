import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TableExtractorTool } from '@/components/tools/TableExtractorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Excel Converter Free Online (Extract Tables to XLSX) | iCreatePDF',
  description: 'Convert PDF tables and bank statements into editable Microsoft Excel (XLSX) spreadsheets online for free. 100% private client-side extraction.',
  keywords: 'pdf to excel, convert pdf to excel, pdf to xlsx converter, extract tables from pdf to excel, pdf bank statement to excel, pdf to excel converter free, convert pdf table to spreadsheet, scanned pdf to excel table, turn pdf into excel spreadsheet',
  alternates: buildAlternates('/tools/pdf-to-excel'),
  openGraph: {
    title: 'PDF to Excel Converter Free Online (Extract Tables to XLSX) | iCreatePDF',
    description: 'Convert PDF tables and bank statements into editable Microsoft Excel (XLSX) spreadsheets online for free. 100% private client-side extraction.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF to Excel (XLSX) — iCreatePDF' }],
  },
          {
            question: 'Is it safe to extract tables from private financial PDFs?',
            answer: 'Yes. iCreatePDF processes your data 100% locally. Your PDF files and table outputs are never uploaded to any remote server.',
          },
          {
            question: 'Can I export to CSV or XLSX?',
            answer: 'Our local tool compiles the extracted data into a standard CSV format, which can be opened directly in Microsoft Excel, Google Sheets, or Apple Numbers.',
          },
        ]),
        howToSchema({
          name: 'PDF to Excel Table Extractor',
          description: 'Extract tables from PDF documents to Excel-ready CSV sheets locally.',
          url: '/tools/pdf-to-excel',
          steps: [
            { title: 'Upload PDF File', description: 'Drag and drop your PDF containing data tables.' },
            { title: 'Wait for Parsing', description: 'The text alignment heuristic parser recognizes rows and cell segments.' },
            { title: 'Download CSV', description: 'Click Export to CSV to save your table data spreadsheet.' },
          ],
        }),
      ]}
      extraSections={<ToolSeoContent content={toolContent['pdf-to-excel']} />}
    >
      <TableExtractorTool />
    </ToolPageShell>
  );
}
