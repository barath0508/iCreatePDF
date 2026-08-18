import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { BulkCertificatesTool } from '@/components/tools/BulkCertificatesTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bulk Certificate Generator from CSV/Excel Data | iCreatePDF',
  description: 'Generate customized certificates, awards, and badges in bulk from spreadsheet data. 100% private client-side mail-merge certificate creator.',
  keywords: 'bulk certificate generator, generate certificates from csv, bulk certificate generator from csv, create certificates from csv, generate certificates in bulk, pdf excel certificate maker, mail merge certificates, bulk award letter generator online free, client-side bulk certificate generator, automated certificate printing pdf, batch certificate maker with names, custom diploma generator csv, bulk tickets generator pdf, student certificates from excel',
  alternates: buildAlternates('/tools/bulk-certificates'),
  openGraph: {
    title: 'Bulk Certificate Generator from CSV/Excel Data | iCreatePDF',
    description: 'Generate customized certificates, awards, and badges in bulk from spreadsheet data. 100% private client-side mail-merge certificate creator.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Bulk Certificate Generator from CSV — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Certificate Generator from CSV/Excel Data | iCreatePDF',
    description: 'Generate customized certificates, awards, and badges in bulk from spreadsheet data. 100% private client-side mail-merge certificate creator.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function BulkCertificatesPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('bulk-certificates')}
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
