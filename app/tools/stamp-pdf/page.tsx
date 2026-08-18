import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { StampPdfTool } from '@/components/tools/StampPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Stamp PDF Online Free — Add Approved, Confidential & Custom Stamps | iCreatePDF',
  description: 'Add visual stamps (APPROVED, CONFIDENTIAL, DRAFT, FINAL) or custom text seals to PDF pages. 100% private in-browser document stamper.',
  keywords: 'stamp pdf, add stamp to pdf, approved stamp pdf, confidential stamp pdf, draft stamp on pdf, custom text stamp pdf, rubber stamp pdf generator, stamp date and signature on pdf, official stamp pdf online',
  alternates: buildAlternates('/tools/stamp-pdf'),
  openGraph: {
    title: 'Stamp PDF Online Free — Add Approved, Confidential & Custom Stamps | iCreatePDF',
    description: 'Add visual stamps (APPROVED, CONFIDENTIAL, DRAFT, FINAL) or custom text seals to PDF pages. 100% private in-browser document stamper.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Stamp PDF Documents — iCreatePDF' }],
  },
};

export default function StampPdfToolPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Stamp PDF Documents',
          description: 'Add visual stamps (APPROVED, CONFIDENTIAL, DRAFT, FINAL) or custom text seals to PDF pages. 100% private in-browser document stamper.',
          url: '/tools/stamp-pdf',
        }),
        faqSchema(toolContent['stamp-pdf'].faqs),
        howToSchema({
          name: 'Stamp PDF Documents',
          description: toolContent['stamp-pdf'].overview,
          url: '/tools/stamp-pdf',
          steps: toolContent['stamp-pdf'].steps,
        }),
      ]}badge="Annotation & Stamps"
      title="Batch Rubber Stamp PDF"
      description="Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text across all pages."
      extraSections={<ToolSeoContent content={toolContent['stamp-pdf']} />}
    >
      <StampPdfTool />
    </ToolPageShell>
  );
}
