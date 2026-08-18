import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SignTool } from '@/components/tools/SignTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sign PDF Free Online — Create Electronic Signature | iCreatePDF',
  description: 'Sign PDF documents online free with a legally recognized electronic signature. Draw, type, or upload your signature without uploading files.',
  keywords: 'sign pdf, electronic signature pdf, sign pdf online free, digital signature pdf, e-sign pdf document, how to sign pdf without printing, draw signature on pdf, sign contract online free, legal electronic signature pdf',
  alternates: buildAlternates('/tools/sign-pdf'),
  openGraph: {
    title: 'Sign PDF Free Online — Create Electronic Signature | iCreatePDF',
    description: 'Sign PDF documents online free with a legally recognized electronic signature. Draw, type, or upload your signature without uploading files.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Sign PDF Documents Online — iCreatePDF' }],
  },
          {
            question: 'Is my signature safe when signing PDFs here?',
            answer: 'Yes. iCreatePDF works completely client-side in browser memory. Your documents and signature files are never sent to a server.',
          },
          {
            question: 'Can I add multiple signatures to one PDF?',
            answer: 'Yes, you can place and duplicate multiple signatures and text initials across different pages of the document before exporting.',
          },
        ]),
        howToSchema({
          name: 'Sign PDF Documents',
          description: 'Add a secure e-signature to your PDF documents locally in your browser.',
          url: '/tools/sign-pdf',
          steps: [
            { title: 'Upload PDF', description: 'Drag and drop your document into the signing window.' },
            { title: 'Draw or Type Signature', description: 'Create your signature by typing, drawing, or uploading an image file.' },
            { title: 'Place & Save', description: 'Position the signature on the page, adjust the size, and click Download PDF.' },
          ],
        }),
      ]}
      badge="E-Signature"
      title="Sign PDF Documents"
      description="Place, resize, and overlay signatures on document pages 100% client-side."
      extraSections={<ToolSeoContent content={toolContent['sign-pdf']} />}
    >
      <SignTool />
    </ToolPageShell>
  );
}
