import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TableExtractorTool } from '@/components/tools/TableExtractorTool';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Excel — Extract Tables to CSV Online Free | iCreatePDF',
  description: 'Extract tables from any PDF into Excel-ready CSV files. Detects rows and columns from text layout automatically, right in your browser — no upload, no sign-up.',
  keywords: 'pdf to excel, pdf table extractor, extract table from pdf, pdf to csv, convert pdf table to spreadsheet online free',
  alternates: buildAlternates('/pdf-to-excel'),
  openGraph: {
    title: 'PDF to Excel — Extract Tables to CSV Online Free | iCreatePDF',
    description: 'Extract tables from any PDF into Excel-ready CSV files, right in your browser — no upload, no sign-up.',
    type: 'website',
  }
};

export default function PdfToExcelPage() {
  return (
    <ToolPageShell
      badge="Data Extraction"
      title="PDF to Excel"
      description="Detect tables inside a PDF and export them as Excel-ready CSV, using text-position heuristics that run entirely in your browser."
      jsonLd={toolSchema({
        name: 'PDF to Excel',
        description: 'Extract tables from any PDF into Excel-ready CSV files, detecting rows and columns from text layout automatically.',
        url: '/pdf-to-excel',
      })}
    >
      <TableExtractorTool />
    </ToolPageShell>
  );
}
