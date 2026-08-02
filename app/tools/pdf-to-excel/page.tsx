import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TableExtractorTool } from '@/components/tools/TableExtractorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert PDF to Excel Online (Extract Tables) | iCreatePDF',
  description: 'Extract tables from any PDF into Excel-ready CSV files free online. ⚡ Instantly detect rows and columns locally in browser memory — no sign-up.',
  keywords: 'pdf to excel, pdf table extractor, extract table from pdf, pdf to csv, convert pdf table to spreadsheet online free',
  alternates: buildAlternates('/tools/pdf-to-excel'),
  openGraph: {
    title: 'Convert PDF to Excel Online — | iCreatePDF',
    description: 'Extract tables from any PDF into Excel-ready CSV files free online. Detects rows and columns from text layout automatically, right in your browser — no upload, no sign-up.',
    type: 'website',
  }
};

export default function PdfToExcelPage() {
  return (
    <ToolPageShell
      badge="Data Extraction"
      title="PDF to Excel"
      description="Detect tables inside a PDF and export them as Excel-ready CSV, using text-position heuristics that run entirely in your browser."
      jsonLd={[
        ...toolSchema({
          name: 'PDF to Excel',
          description: 'Extract tables from any PDF into Excel-ready CSV files, detecting rows and columns from text layout automatically.',
          url: '/tools/pdf-to-excel',
        }),
        faqSchema([
          {
            question: 'How do I convert a PDF to an Excel spreadsheet?',
            answer: 'Upload your PDF file. The local parser detects text position heuristics, groups columns and rows automatically, and creates a spreadsheet table layout for you to export as a CSV.',
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
