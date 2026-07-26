import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ProtectTool } from '@/components/tools/ProtectTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Password Protect PDF Free Online — Encrypt PDF (100% Private) | iCreatePDF',
  description: 'Password protect and encrypt PDF files free online. Add strong AES encryption and owner/user passwords locally in your browser without uploads.',
  keywords: 'password protect pdf, encrypt pdf, protect pdf with password, lock pdf, pdf password protection, add password to pdf free, encrypt pdf file, secure pdf online free, pdf encryption free, password protect pdf locally, how to lock a pdf, pdf password lock, protect pdf document, add password to pdf online free, password protect pdf no upload, secure pdf file, pdf security online free, AES pdf encryption, protect confidential pdf',
  alternates: buildAlternates('/tools/protect-pdf'),
  openGraph: {
    title: 'Password Protect PDF Free Online — Encrypt PDF | iCreatePDF',
    description: 'Password protect and encrypt PDF files free online. Strong AES encryption, 100% private local processing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Protect PDF — iCreatePDF' }],
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
          name: 'Protect PDF Files',
          description: 'Encrypt and password protect your PDF files client-side. Set secure owner and user passwords locally in your browser memory space.',
          url: '/tools/protect-pdf',
        }),
        faqSchema([
          {
            question: 'How do I password protect a PDF file?',
            answer: 'Upload your PDF, enter a secure password in the password fields, choose user/owner permissions if needed, and click Encrypt PDF to download.',
          },
          {
            question: 'Is my password secure when locking a PDF here?',
            answer: 'Yes. The encryption process runs entirely inside your browser using WebAssembly. Your password and file content are never uploaded to any server.',
          },
          {
            question: 'What level of encryption is used?',
            answer: 'We use industry-standard AES encryption to lock and password protect your PDF files, preventing unauthorized opening, printing, or copying.',
          },
        ]),
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
