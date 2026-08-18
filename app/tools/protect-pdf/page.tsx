import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Protect PDF — Password Protect & AES Encrypt PDF Online | iCreatePDF',
  description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
  keywords: 'protect pdf, password protect pdf, encrypt pdf online, add password to pdf, lock pdf file, secure pdf document, aes 256 bit pdf encryption, set password on pdf free, restrict pdf access, protect confidential pdf file, how to password protect a pdf file free, secure pdf with password',
  alternates: buildAlternates('/tools/protect-pdf'),
  openGraph: {
    title: 'Protect PDF — Password Protect & AES Encrypt PDF Online | iCreatePDF',
    description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Password Protect & Encrypt PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protect PDF — Password Protect & AES Encrypt PDF Online | iCreatePDF',
    description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ProtectPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('protect-pdf')}
      badge="PDF Shield"
      title="Protect PDF Files"
      description="Encrypt your PDF files with secure passwords locally in browser memory."
      extraSections={<ToolSeoContent content={toolContent['protect-pdf']} />}
    >
      <ProtectTool />
    </ToolPageShell>
  );
}
