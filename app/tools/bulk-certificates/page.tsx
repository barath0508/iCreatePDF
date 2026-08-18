import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BulkCertificatesTool } from '@/components/tools/BulkCertificatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bulk Certificate Generator from CSV/Excel Data | iCreatePDF',
  description: 'Generate customized certificates, awards, and badges in bulk from spreadsheet data. 100% private client-side mail-merge certificate creator.',
  keywords: 'bulk certificate generator, generate certificates from csv, bulk certificate generator from csv, create certificates from csv, generate certificates in bulk, pdf excel certificate maker, mail merge certificates, bulk award letter generator online free, client-side bulk certificate generator, automated certificate printing pdf, batch certificate maker with names, custom diploma generator csv, bulk tickets generator pdf',
  alternates: buildAlternates('/tools/bulk-certificates'),
  openGraph: {
    title: 'Generate Certificates from CSV Free in Bulk | iCreatePDF',
    description: 'Generate certificates, badges, and tickets in bulk from spreadsheet data. Processed 100% locally in-browser with zero server uploads for complete privacy.',
    type: 'website',
  }
};

export default function BulkCertificatesPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Bulk Certificate Generator from CSV',
          description: 'Generate customized certificates, awards, and badges in bulk from spreadsheet data. 100% private client-side mail-merge certificate creator.',
          url: '/tools/bulk-certificates',
        }),
        faqSchema(toolContent['bulk-certificates'].faqs),
        howToSchema({
          name: 'Bulk Certificate Generator from CSV',
          description: toolContent['bulk-certificates'].overview,
          url: '/tools/bulk-certificates',
          steps: toolContent['bulk-certificates'].steps,
        }),
      ]}badge="Generation"
      title="Bulk Certificate Generator"
      description="Create hundreds of customized PDF certificates or award letters dynamically from an Excel list."
      extraSections={
        <>
          <ToolSeoContent content={toolContent['bulk-certificates']} />
          <section className="border-t border-foreground/5 py-12 bg-foreground/[0.005]">
            <div className="max-w-[900px] mx-auto px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need a detailed step-by-step walkthrough? Read our guide on{' '}
                <a href="/blogs/how-to-generate-certificates-in-bulk" className="text-brand hover:underline font-semibold">
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
