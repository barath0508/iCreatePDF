import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SignTool } from '@/components/tools/SignTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sign PDF Free Online — Create Electronic Signature | iCreatePDF',
  description: 'Sign PDF documents online free with a legally recognized electronic signature. Draw, type, or upload your signature without uploading files.',
  keywords: 'sign pdf, electronic signature pdf, sign pdf online free, digital signature pdf, e-sign pdf document, how to sign pdf without printing, draw signature on pdf, sign contract online free, legal electronic signature pdf, sign pdf on iphone without acrobat, free electronic signature tool for pdf',
  alternates: buildAlternates('/tools/sign-pdf'),
  openGraph: {
    title: 'Sign PDF Free Online — Create Electronic Signature | iCreatePDF',
    description: 'Sign PDF documents online free with a legally recognized electronic signature. Draw, type, or upload your signature without uploading files.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Sign PDF Documents Online — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign PDF Free Online — Create Electronic Signature | iCreatePDF',
    description: 'Sign PDF documents online free with a legally recognized electronic signature. Draw, type, or upload your signature without uploading files.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function SignPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('sign-pdf')}
      badge="E-Signature"
      title="Sign PDF Documents"
      description="Place, resize, and overlay signatures on document pages 100% client-side."
      extraSections={<ToolSeoContent content={toolContent['sign-pdf']} />}
    >
      <SignTool />
    </ToolPageShell>
  );
}
