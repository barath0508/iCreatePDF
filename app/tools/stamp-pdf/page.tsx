import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { StampPdfTool } from '@/components/tools/StampPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Batch Rubber Stamp PDF — Free, Private, No Upload | iCreatePDF',
  description: 'Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text across all pages. 100% private — files process inside browser memory.',
  keywords: 'stamp pdf pages, add rubber stamp to pdf, stamp approved confidential draft pdf, batch stamp pdf documents, online pdf stamping tool free',
  alternates: buildAlternates('/tools/stamp-pdf'),
  openGraph: {
    title: 'Batch Rubber Stamp PDF — iCreatePDF',
    description: 'Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text across all pages.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Batch Rubber Stamp PDF — iCreatePDF' }],
  },
};

export default function StampPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Batch Rubber Stamp PDF',
        description: 'Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text across all pages.',
        url: '/tools/stamp-pdf',
      })}
      badge="Annotation & Stamps"
      title="Batch Rubber Stamp PDF"
      description="Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text across all pages."
      extraSections={<ToolSeoContent content={toolContent['stamp-pdf']} />}
    >
      <StampPdfTool />
    </ToolPageShell>
  );
}
