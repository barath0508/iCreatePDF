import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { TableExtractorTool } from '@/components/tools/TableExtractorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Excel Converter Free Online (Extract Tables to XLSX) | iCreatePDF',
  description: 'Convert PDF tables and bank statements into editable Microsoft Excel (XLSX) spreadsheets online for free. 100% private client-side extraction.',
  keywords: 'pdf to excel, convert pdf to excel, pdf to xlsx converter, extract tables from pdf to excel, pdf bank statement to excel, pdf to excel converter free, convert pdf table to spreadsheet, scanned pdf to excel table, turn pdf into excel spreadsheet, pdf to xlsx free online no limit',
  alternates: buildAlternates('/tools/pdf-to-excel'),
  openGraph: {
    title: 'PDF to Excel Converter Free Online (Extract Tables to XLSX) | iCreatePDF',
    description: 'Convert PDF tables and bank statements into editable Microsoft Excel (XLSX) spreadsheets online for free. 100% private client-side extraction.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert PDF to Excel (XLSX) — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Excel Converter Free Online (Extract Tables to XLSX) | iCreatePDF',
    description: 'Convert PDF tables and bank statements into editable Microsoft Excel (XLSX) spreadsheets online for free. 100% private client-side extraction.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfToExcelPage() {
  return (
    <ToolPageShell
      badge="Data Extraction"
      title="PDF to Excel"
      description="Detect tables inside a PDF and export them as Excel-ready CSV, using text-position heuristics that run entirely in your browser."
      jsonLd={getToolFullJsonLd('pdf-to-excel')}
      extraSections={<ToolSeoContent content={toolContent['pdf-to-excel']} />}
    >
      <TableExtractorTool />
    </ToolPageShell>
  );
}
