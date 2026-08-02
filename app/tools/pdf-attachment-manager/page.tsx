import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { PdfAttachmentManagerTool } from '@/components/tools/PdfAttachmentManagerTool';

export const metadata: Metadata = {
  title: 'PDF Attachment Manager — Extract & Embed Files | iCreatePDF',
  description: 'Inspect, extract, or embed file attachments inside PDF documents. Supports ZUGFeRD / Factur-X XML e-invoices, spreadsheets, and source docs 100% locally.',
  keywords: 'pdf attachment manager, extract xml from pdf, zugferd pdf extractor, factur-x e-invoice attachment, embed files in pdf, pdf portfolio builder',
  alternates: buildAlternates('/tools/pdf-attachment-manager'),
  openGraph: {
    title: 'PDF Attachment Manager — Extract & Embed File Packages',
    description: 'Inspect, extract, or embed file attachments inside PDF documents 100% locally.',
  },
};

const faqs = [
  {
    question: 'Can I extract XML e-invoices from PDF files?',
    answer: 'Yes! ZUGFeRD and Factur-X electronic invoices store structured XML attachments inside the PDF catalog. Our tool extracts them instantly.',
  },
  {
    question: 'What file formats can I embed into a PDF?',
    answer: 'You can attach any file type including XML, CSV, XLSX, DOCX, PNG, and ZIP directly into the PDF EmbeddedFiles tree.',
  },
  {
    question: 'Is processing private and offline?',
    answer: 'Yes, attachment parsing and embedding are executed entirely within browser WebAssembly and local JavaScript memory.',
  },
];

export default function PdfAttachmentManagerPage() {
  return (
    <ToolPageShell
      title="PDF Attachment Manager"
      description="Inspect, extract, and attach file streams (ZUGFeRD e-invoices, XML, Excel, images) inside your PDF package."
      badge="E-INVOICE & PORTFOLIO ENGINE"
      canonicalPath="/pdf-attachment-manager"
      jsonLd={[
        ...toolSchema({
          name: 'PDF Attachment Manager',
          description: 'Inspect, extract, or embed file attachments inside PDF documents 100% locally.',
          url: '/pdf-attachment-manager',
        }),
        faqSchema(faqs),
      ]}
    >
      <PdfAttachmentManagerTool />
    </ToolPageShell>
  );
}
