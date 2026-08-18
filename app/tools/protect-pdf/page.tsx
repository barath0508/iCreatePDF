import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Protect PDF — Password Protect & AES Encrypt PDF Online | iCreatePDF',
  description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
  keywords: 'protect pdf, password protect pdf, encrypt pdf online, add password to pdf, lock pdf file, secure pdf document, aes 256 bit pdf encryption, set password on pdf free, restrict pdf access, protect confidential pdf file',
  alternates: buildAlternates('/tools/protect-pdf'),
  openGraph: {
    title: 'Protect PDF — Password Protect & AES Encrypt PDF Online | iCreatePDF',
    description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Password Protect & Encrypt PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Protect PDF Free Online — Encrypt PDF | iCreatePDF',
    description: 'Password protect PDF with AES encryption. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ProtectPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Password Protect & Encrypt PDF',
          description: 'Encrypt PDF documents with military-grade AES password protection. Restrict unauthorized opening, copying, and printing 100% privately.',
          url: '/tools/protect-pdf',
        }),
        faqSchema(toolContent['protect-pdf'].faqs),
        howToSchema({
          name: 'Password Protect & Encrypt PDF',
          description: toolContent['protect-pdf'].overview,
          url: '/tools/protect-pdf',
          steps: toolContent['protect-pdf'].steps,
        }),
      ]}),
        howToSchema({
          name: 'Protect PDF Files',
          description: 'Secure and encrypt your PDF files with a password locally in your browser.',
          url: '/tools/protect-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your PDF document into the encryption box.' },
            { title: 'Set Password', description: 'Type in a strong user or owner password.' },
            { title: 'Encrypt & Download', description: 'Click Encrypt PDF to compile and save your password-locked file.' },
          ],
        }),
      ]}
      badge="PDF Shield"
      title="Protect PDF Files"
      description="Encrypt your PDF files with secure passwords locally in browser memory."
      extraSections={<ToolSeoContent content={toolContent['protect-pdf']} />}
    >
      <ProtectTool />
    </ToolPageShell>
  );
}
