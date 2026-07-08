import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { SignTool } from '@/components/tools/SignTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sign PDF Locally: Draw & Place Digital Signatures | iCreatePDF',
  description: 'Draw, type, or upload your signature and stamp it on PDF pages. 100% client-side, keeping your signature and documents safe and private.',
  keywords: 'sign pdf locally, how to sign contract pdf without printing, sign pdf online free, add signature to pdf, digital signature pdf browser, private digital signature pdf tool, sign pdf document locally, secure e-signature free, sign contract browser sandbox, write signature on pdf, draw signature free, sign lease agreement pdf, client-side digital e-sign',
  alternates: buildAlternates('/sign-pdf'),
  openGraph: {
    title: 'Sign PDF Locally: Draw & Place Digital Signatures | iCreatePDF',
    description: 'Draw, type, or upload your signature and stamp it on PDF pages. 100% client-side, keeping your signature and documents safe and private.',
    type: 'website',
  }
};

export default function SignPdfPage() {
  return (
    <ToolPageShell
      badge="E-Signature"
      title="Sign PDF Documents"
      description="Place, resize, and overlay signatures on document pages 100% client-side."
    >
      <SignTool />
    </ToolPageShell>
  );
}
