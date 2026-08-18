import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { UnlockTool } from '@/components/tools/UnlockTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Unlock PDF Online Free — Remove Password & Restrictions | iCreatePDF',
  description: 'Remove passwords and permissions security from PDF documents online free. Unlock editing, copying, and printing restrictions 100% privately in-browser.',
  keywords: 'unlock pdf, remove pdf password, pdf password remover, decrypt pdf online, remove restrictions from pdf, unlock secured pdf, remove print permission password pdf, decrypt protected pdf file, open password protected pdf online free, unlock password protected pdf, remove pdf open password free, decrypt locked pdf file, remove pdf restrictions online, unlock secured pdf without software',
  alternates: buildAlternates('/tools/unlock-pdf'),
  openGraph: {
    title: 'Unlock PDF Online Free — Remove Password & Restrictions | iCreatePDF',
    description: 'Remove passwords and permissions security from PDF documents online free. Unlock editing, copying, and printing restrictions 100% privately in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Unlock PDF & Remove Password — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlock PDF Online Free — Remove Password & Restrictions | iCreatePDF',
    description: 'Remove passwords and permissions security from PDF documents online free. Unlock editing, copying, and printing restrictions 100% privately in-browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function UnlockPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('unlock-pdf')}
      badge="PDF Decrypter"
      title="Unlock Protected PDF"
      description="Strips password security locks from document files. Decryption occurs completely local inside browser memory."
      extraSections={<ToolSeoContent content={toolContent['unlock-pdf']} />}
    >
      <UnlockTool />
    </ToolPageShell>
  );
}
