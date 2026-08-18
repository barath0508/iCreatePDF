import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BatesTool } from '@/components/tools/BatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bates Numbering PDF — Free Legal Stamping (EasyBates Alternative) | iCreatePDF',
  description: 'Apply sequential Bates stamps with custom prefixes and padding to legal discovery documents. The best free, 100% private EasyBates online alternative.',
  keywords: 'easybates, easybates online, easybates alternative, easybates free, bates numbering pdf, bates numbering, add bates stamps pdf, bates numbering tool, legal document numbering, secure bates numbering pdf tool, legal page numbering private, local bates stamp generator, legal discovery document numbering, client-side bates numbering, medical records sequential numbering, compliance page stamps, litigation bates stamp online, confidential discovery numbering',
  alternates: buildAlternates('/tools/bates-numbering'),
  openGraph: {
    title: 'Bates Numbering PDF: EasyBates Online Alternative | iCr...',
    description: 'Apply sequential bates numbering to legal PDF documents securely. The ultimate EasyBates online alternative that runs 100% locally in your browser.',
    type: 'website',
  }
};

export default function BatesPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Bates Numbering for Legal Documents',
          description: 'Apply sequential Bates stamps with custom prefixes and padding to legal discovery documents. The best free, 100% private EasyBates online alternative.',
          url: '/tools/bates-numbering',
        }),
        faqSchema(toolContent['bates-numbering'].faqs),
        howToSchema({
          name: 'Bates Numbering for Legal Documents',
          description: toolContent['bates-numbering'].overview,
          url: '/tools/bates-numbering',
          steps: toolContent['bates-numbering'].steps,
        }),
      ]}badge="Legal Stamping"
      title="Bates Numbering"
      description="Sequential document stamping for legal discovery, medical records, and compliance workflows."
      extraSections={<ToolSeoContent content={toolContent['bates-numbering']} />}
    >
      <BatesTool />
    </ToolPageShell>
  );
}
