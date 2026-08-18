import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfAttachmentManagerTool } from '@/components/tools/PdfAttachmentManagerTool';

export const metadata: Metadata = {
  title: 'PDF Attachment Manager — View, Extract & Embed Files | iCreatePDF',
  description: 'Inspect, extract, or embed file attachments inside PDF documents. Manage embedded media and datasets 100% privately in your browser.',
  keywords: 'pdf attachment manager, extract pdf attachments, embed files in pdf, add attachments to pdf, view embedded pdf files, remove attachments from pdf, pdf portfolio extractor, download attachments from pdf, manage embedded documents pdf',
  alternates: buildAlternates('/tools/pdf-attachment-manager'),
  openGraph: {
    title: 'PDF Attachment Manager — View, Extract & Embed Files | iCreatePDF',
    description: 'Inspect, extract, or embed file attachments inside PDF documents. Manage embedded media and datasets 100% privately in your browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Attachment Manager — iCreatePDF' }],
  },
};

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
          description: 'Inspect, extract, or embed file attachments inside PDF documents. Manage embedded media and datasets 100% privately in your browser.',
          url: '/tools/pdf-attachment-manager',
        }),
        faqSchema(toolContent['pdf-attachment-manager'].faqs),
        howToSchema({
          name: 'PDF Attachment Manager',
          description: toolContent['pdf-attachment-manager'].overview,
          url: '/tools/pdf-attachment-manager',
          steps: toolContent['pdf-attachment-manager'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['pdf-attachment-manager']} />}
    >
      <PdfAttachmentManagerTool />
    </ToolPageShell>
  );
}
