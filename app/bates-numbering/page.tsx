import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BatesTool } from '@/components/tools/BatesTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bates Numbering PDF: Secure Page Stamps Online | iCreatePDF',
  description: 'Apply sequential Bates numbering to legal PDF documents securely. Works 100% client-side with no uploads, keeping legal files private.',
  keywords: 'bates numbering pdf, bates numbering, add bates stamps pdf, bates numbering tool, legal document numbering, secure bates numbering pdf tool, legal page numbering private, local bates stamp generator, legal discovery document numbering, client-side bates numbering, medical records sequential numbering, compliance page stamps',
  alternates: buildAlternates('/bates-numbering'),
  openGraph: {
    title: 'Bates Numbering PDF: Secure Page Stamps Online | iCreatePDF',
    description: 'Apply sequential Bates numbering to legal PDF documents securely. Works 100% client-side with no uploads, keeping legal files private.',
    type: 'website',
  }
};

export default function BatesPage() {
  return (
    <ToolPageShell
      badge="Legal Stamping"
      title="Bates Numbering"
      description="Sequential document stamping for legal discovery, medical records, and compliance workflows."
    >
      <BatesTool />
    </ToolPageShell>
  );
}
