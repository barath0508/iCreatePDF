import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BatesTool } from '@/components/tools/BatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bates Numbering PDF Online Free — Legal Document Stamping (No Upload) | iCreatePDF',
  description: 'Apply sequential Bates stamps and legal exhibit numbers to discovery documents. 100% private client-side processing with zero server uploads. Free EasyBates alternative.',
  keywords: 'bates numbering pdf, bates numbering online free, bates stamp pdf no upload, legal document numbering free, easybates online alternative, easybates free, confidential discovery numbering, legal exhibit numbering pdf, client-side bates numbering, medical records sequential numbering, litigation bates stamp online, add bates stamps pdf',
  alternates: buildAlternates('/tools/bates-numbering'),
  openGraph: {
    title: 'Bates Numbering PDF Online Free — Legal Document Stamping (No Upload) | iCreatePDF',
    description: 'Apply sequential Bates stamps and legal exhibit numbers to discovery documents. 100% private client-side processing with zero server uploads. Free EasyBates alternative.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Bates Numbering for Legal Documents — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bates Numbering PDF Online Free — Legal Document Stamping (No Upload) | iCreatePDF',
    description: 'Apply sequential Bates stamps and legal exhibit numbers to discovery documents. 100% private client-side processing with zero server uploads. Free EasyBates alternative.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function BatesPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('bates-numbering')}
      badge="Legal Stamping"
      title="Bates Numbering"
      description="Sequential document stamping for legal discovery, medical records, and compliance workflows."
      extraSections={<ToolSeoContent content={toolContent['bates-numbering']} />}
    >
      <BatesTool />
    </ToolPageShell>
  );
}
