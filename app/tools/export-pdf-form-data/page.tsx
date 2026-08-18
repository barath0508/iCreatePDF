import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FormDataExtractorTool } from '@/components/tools/FormDataExtractorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Export PDF Form Data to CSV — Extract AcroForm Fields | iCreatePDF',
  description: 'Extract filled AcroForm fields from single or batch PDFs directly into CSV spreadsheets. 100% private client-side data extraction without uploads.',
  keywords: 'export pdf form data, extract data from pdf form, convert acroform to csv, export fillable pdf fields, extract fdf xml to spreadsheet, pdf form data extractor free, scrape pdf form inputs, export filled pdf questionnaire, convert pdf responses to excel, acroform parser online, batch extract pdf form answers',
  alternates: buildAlternates('/tools/export-pdf-form-data'),
  openGraph: {
    title: 'Export PDF Form Data to CSV — Extract AcroForm Fields | iCreatePDF',
    description: 'Extract filled AcroForm fields from single or batch PDFs directly into CSV spreadsheets. 100% private client-side data extraction without uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Export PDF Form Data to CSV — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Export PDF Form Data to CSV — Extract AcroForm Fields | iCreatePDF',
    description: 'Extract filled AcroForm fields from single or batch PDFs directly into CSV spreadsheets. 100% private client-side data extraction without uploads.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function FormDataExtractorToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('export-pdf-form-data')}
      badge="Data Extraction"
      title="Export PDF Form Data"
      description="Extract filled AcroForm fields from single or multiple PDFs into CSV spreadsheets."
      extraSections={<ToolSeoContent content={toolContent['export-pdf-form-data']} />}
    >
      <FormDataExtractorTool />
    </ToolPageShell>
  );
}
