import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BulkCertificatesTool } from '@/components/tools/BulkCertificatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Generate Certificates from CSV Online Free in Bulk | iCreatePDF',
  description: 'Generate certificates from CSV or Excel online in bulk. Upload a PDF template and a spreadsheet to create customized, high-quality certificates instantly.',
  keywords: 'bulk certificate generator, generate certificates from csv, bulk certificate generator from csv, create certificates from csv, generate certificates in bulk, pdf excel certificate maker, mail merge certificates, bulk award letter generator online free, client-side bulk certificate generator',
  alternates: buildAlternates('/bulk-certificates'),
  openGraph: {
    title: 'Generate Certificates from CSV Online Free in Bulk | iCreatePDF',
    description: 'Generate certificates from CSV or Excel online in bulk. Upload a PDF template and a spreadsheet to create customized, high-quality certificates instantly.',
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
      extraSections={
        <>
          <ToolSeoContent content={toolContent['bulk-certificates']} />
          <section className="border-t border-foreground/5 py-12 bg-foreground/[0.005]">
            <div className="max-w-[900px] mx-auto px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need a detailed step-by-step walkthrough? Read our guide on{' '}
                <a href="/blog/how-to-generate-certificates-in-bulk" className="text-brand hover:underline font-semibold">
                  How to Generate Certificates in Bulk from an Excel List
                </a>.
              </p>
            </div>
          </section>
        </>
      }
    >
      <BulkCertificatesTool />
    </ToolPageShell>
  );
}
