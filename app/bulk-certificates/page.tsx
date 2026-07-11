import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BulkCertificatesTool } from '@/components/tools/BulkCertificatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Free Bulk Certificate Generator Online - PDF & Excel | iCreatePDF',
  description: 'Generate certificates, award letters, or tickets in bulk online. Upload a PDF template and Excel/CSV spreadsheet list to create personalized certificates locally for free.',
  keywords: 'bulk certificate generator, generate certificates in bulk, pdf excel certificate maker, mail merge certificates, bulk award letter generator online free, client-side bulk certificate generator',
  alternates: buildAlternates('/bulk-certificates'),
  openGraph: {
    title: 'Free Bulk Certificate Generator Online - PDF & Excel | iCreatePDF',
    description: 'Generate certificates, award letters, or tickets in bulk online. Upload a PDF template and Excel/CSV spreadsheet list to create personalized certificates locally for free.',
    type: 'website',
  }
};

export default function BulkCertificatesPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Bulk Certificate Generator',
        description: 'Generate certificates, award letters, or tickets in bulk online. Upload a PDF template and Excel/CSV spreadsheet list to create personalized certificates locally for free.',
        url: '/bulk-certificates',
      })}
      badge="Generation"
      title="Bulk Certificate Generator"
      description="Create hundreds of customized PDF certificates or award letters dynamically from an Excel list."
      extraSections={<ToolSeoContent content={toolContent['bulk-certificates']} />}
    >
      <BulkCertificatesTool />
    </ToolPageShell>
  );
}
