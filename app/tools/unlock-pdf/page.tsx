import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { UnlockTool } from '@/components/tools/UnlockTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Unlock PDF Free Online — Remove Password | iCreatePDF',
  description: 'Remove password encryption and copy/print restrictions from PDF files free online. ⚡ 100% private local browser decryption — no uploads.',
  keywords: 'local pdf password remover, decrypt pdf client-side, remove pdf security password private, offline pdf unlocker, strip pdf permissions local, unlock pdf owner password, bypass pdf print restriction, remove copy restriction pdf',
  alternates: buildAlternates('/tools/unlock-pdf'),
  openGraph: {
    title: 'Unlock PDF Free Online — Remove PDF Password | iCreatePDF',
    description: 'Strip password encryption locks from PDF files online for free. Processed 100% locally inside your browser sandbox with zero uploads for absolute privacy.',
    type: 'website',
  }
};

export default function UnlockPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Unlock Protected PDF',
          description: 'Remove passwords and decryption locks from PDF files client-side. Your files and passwords are never uploaded to any remote server.',
          url: '/tools/unlock-pdf',
        }),
        faqSchema([
          {
            question: 'How do I remove a password from a PDF file?',
            answer: 'Upload your password-locked PDF. Type in the document password to authenticate the decryption permission locally, and download your unlocked PDF file.',
          },
          {
            question: 'Is my PDF password uploaded to any servers?',
            answer: 'No. The decryption and password verification occur completely within your local browser memory using PDF libraries. Your passwords are never transmitted.',
          },
          {
            question: 'Can I remove restrictions like printing and text copying?',
            answer: 'Yes, if you enter the correct owner password, this tool will strip away all print, edit, and copy permissions blocks from the document.',
          },
        ]),
        howToSchema({
          name: 'Unlock Protected PDF',
          description: 'Decrypt and remove passwords or restrictions from PDF files locally.',
          url: '/tools/unlock-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your password-restricted PDF into the tool.' },
            { title: 'Enter Password', description: 'Type the document password to permit security removal.' },
            { title: 'Save Unlocked PDF', description: 'Click Unlock PDF to compile and download the decrypted file.' },
          ],
        }),
      ]}
      badge="PDF Decrypter"
      title="Unlock Protected PDF"
      description="Strips password security locks from document files. Decryption occurs completely local inside browser memory."
      extraSections={<ToolSeoContent content={toolContent['unlock-pdf']} />}
    >
      <UnlockTool />
    </ToolPageShell>
  );
}
