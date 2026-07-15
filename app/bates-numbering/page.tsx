import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BatesTool } from '@/components/tools/BatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bates Numbering PDF: EasyBates Online Alternative | iCreatePDF',
  description: 'Apply sequential bates numbering to legal PDF documents securely. The ultimate EasyBates online alternative that runs 100% locally in your browser.',
  keywords: 'easybates, easybates online, easybates alternative, easybates free, bates numbering pdf, bates numbering, add bates stamps pdf, bates numbering tool, legal document numbering, secure bates numbering pdf tool, legal page numbering private, local bates stamp generator, legal discovery document numbering, client-side bates numbering, medical records sequential numbering, compliance page stamps',
  alternates: buildAlternates('/bates-numbering'),
  openGraph: {
    title: 'Bates Numbering PDF: EasyBates Online Alternative | iCreatePDF',
    description: 'Apply sequential bates numbering to legal PDF documents securely. The ultimate EasyBates online alternative that runs 100% locally in your browser.',
    type: 'website',
  }
};

export default function BatesPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Bates Numbering',
        description: 'Apply sequential Bates numbering to legal PDF documents securely. Works 100% client-side with no uploads, keeping legal files private.',
        url: '/bates-numbering',
      })}
      badge="Legal Stamping"
      title="Bates Numbering"
      description="Sequential document stamping for legal discovery, medical records, and compliance workflows."
      extraSections={<ToolSeoContent content={toolContent['bates-numbering']} />}
    >
      <BatesTool />
    </ToolPageShell>
  );
}
