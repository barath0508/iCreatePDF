import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { UnlockTool } from '@/components/tools/UnlockTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Unlock PDF Online Free — Remove Password & Restrictions | iCreatePDF',
  description: 'Remove passwords and permissions security from PDF documents online free. Unlock editing, copying, and printing restrictions 100% privately in-browser.',
  keywords: 'unlock pdf, remove pdf password, pdf password remover, decrypt pdf online, remove restrictions from pdf, unlock secured pdf, remove print permission password pdf, decrypt protected pdf file',
  alternates: buildAlternates('/tools/unlock-pdf'),
  openGraph: {
    title: 'Unlock PDF Online Free — Remove Password & Restrictions | iCreatePDF',
    description: 'Remove passwords and permissions security from PDF documents online free. Unlock editing, copying, and printing restrictions 100% privately in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Unlock PDF & Remove Password — iCreatePDF' }],
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
