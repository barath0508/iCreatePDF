import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SignTool } from '@/components/tools/SignTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Digital Signature to PDF Online Free | iCreatePDF',
  description: 'Add a digital signature to PDF online for free. Draw, type, or upload your signature to sign contracts & documents locally in your browser. 100% private.',
  keywords: 'digital signature online on pdf, insert signature in pdf online, virtual signature on pdf, electronically sign pdf online, sign documents online pdf, online signature on pdf, online sign on document, digital sign free, e signature on pdf online, sign electronically online, digitally sign pdf online, pdf digital signature online free, adding signature to pdf online free, e sign document online, digital signature online in pdf, digital signature pdf online free, sign in document online, online pdf signature, esign online pdf, online signature on pdf free, esign pdf online, how to esign for free, pdf file signature online, sign a pdf file online, online signature pdf, esign pdf online free, electronic signature pdf free online, pdf digital signature online, how to make document signable online, add digital signature to pdf online, how to add digital signature to pdf, sign pdf locally, how to sign contract pdf without printing, sign pdf online free, add signature to pdf, digital signature pdf browser, private digital signature pdf tool, sign pdf document locally, secure e-signature free, sign contract browser sandbox, write signature on pdf, draw signature free, sign lease agreement pdf, client-side digital e-sign',
  alternates: buildAlternates('/sign-pdf'),
  openGraph: {
    title: 'Add Digital Signature to PDF Online Free | iCreatePDF',
    description: 'Add a digital signature to PDF online for free. Draw, type, or upload your signature to sign contracts & documents locally in your browser. 100% private.',
    type: 'website',
  }
};

export default function SignPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Sign PDF Documents',
        description: 'Draw, type, or upload your signature and stamp it on PDF pages. 100% client-side, keeping your signature and documents safe and private.',
        url: '/sign-pdf',
      })}
      badge="E-Signature"
      title="Sign PDF Documents"
      description="Place, resize, and overlay signatures on document pages 100% client-side."
      extraSections={<ToolSeoContent content={toolContent['sign-pdf']} />}
    >
      <SignTool />
    </ToolPageShell>
  );
}
