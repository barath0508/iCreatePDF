import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Password Protect PDF \u2014 Encrypt PDF Free Online | iCreatePDF',
  description: 'Password protect and encrypt PDF files free online. Add owner and user passwords with AES encryption \u2014 100% private, processed locally in your browser, no uploads.',
  keywords: 'password protect pdf, encrypt pdf, protect pdf with password, lock pdf, pdf password protection, add password to pdf free, encrypt pdf file, secure pdf online free, pdf encryption free, password protect pdf locally, how to lock a pdf, pdf password lock, protect pdf document, add password to pdf online free, password protect pdf no upload, secure pdf file, pdf security online free, AES pdf encryption, protect confidential pdf',
  alternates: buildAlternates('/tools/protect-pdf'),
  openGraph: {
    title: 'Password Protect PDF \u2014 Encrypt PDF Free Online | iCreatePDF',
    description: 'Password protect and encrypt PDF files. AES encryption, 100% private \u2014 no uploads.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Protect PDF \u2014 iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Protect PDF \u2014 Encrypt PDF Free Online | iCreatePDF',
    description: 'Password protect PDF. AES encryption. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ProtectPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Protect PDF Files',
        description: 'Encrypt and password protect your PDF files client-side. Set secure owner and user passwords locally in your browser memory space.',
        url: '/tools/protect-pdf',
      })}
      badge="PDF Shield"
      title="Protect PDF Files"
      description="Encrypt your PDF files with secure passwords locally in browser memory."
      extraSections={<ToolSeoContent content={toolContent['protect-pdf']} />}
    >
      <ProtectTool />
    </ToolPageShell>
  );
}
