import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
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

export default function PdfAttachmentManagerPage() {
  return (
    <ToolPageShell
      title="PDF Attachment Manager"
      description="Inspect, extract, and attach file streams (ZUGFeRD e-invoices, XML, Excel, images) inside your PDF package."
      badge="E-INVOICE & PORTFOLIO ENGINE"
      canonicalPath="/pdf-attachment-manager"
      jsonLd={toolSchema({
        name: 'PDF Attachment Manager',
        description: 'Inspect, extract, or embed file attachments inside PDF documents 100% locally.',
        url: '/pdf-attachment-manager',
      })}
      extraSections={<ToolSeoContent content={toolContent['pdf-attachment-manager']} />}
    >
      <PdfAttachmentManagerTool />
    </ToolPageShell>
  );
}
