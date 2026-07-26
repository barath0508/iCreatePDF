import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SignTool } from '@/components/tools/SignTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sign PDF Free Online — Add E-Signature to PDF (100% Private) | iCreatePDF',
  description: 'Sign PDF documents free online. Draw, type, or upload your signature to sign contracts & agreements locally in your browser. No file uploads.',
  keywords: 'digital signature online on pdf, insert signature in pdf online, virtual signature on pdf, electronically sign pdf online, sign documents online pdf, online signature on pdf, online sign on document, e signature on pdf online, sign electronically online, digitally sign pdf online, e sign document online, online pdf signature, esign online pdf, esign pdf online free, electronic signature pdf free online, sign pdf locally, sign pdf online free, add signature to pdf, secure e-signature free',
  alternates: buildAlternates('/tools/sign-pdf'),
  openGraph: {
    title: 'Sign PDF Free Online — Add E-Signature to PDF | iCreatePDF',
    description: 'Sign PDF documents free online. Draw, type, or upload your signature locally in your browser sandbox. 100% private.',
    type: 'website',
  }
};

export default function SignPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Sign PDF Documents',
          description: 'Draw, type, or upload your signature and stamp it on PDF pages. 100% client-side, keeping your signature and documents safe and private.',
          url: '/tools/sign-pdf',
        }),
        faqSchema([
          {
            question: 'How do I add an electronic signature to a PDF?',
            answer: 'Upload your PDF, click Add Signature, select whether to draw, type, or upload an image signature, position it on your page, and click Sign & Download.',
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
