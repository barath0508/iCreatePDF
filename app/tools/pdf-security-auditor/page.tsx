import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfSecurityAuditorTool } from '@/components/tools/PdfSecurityAuditorTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Security Auditor — Check Encryption & Permission Vulnerabilities | iCreatePDF',
  description: 'Inspect PDF security settings, encryption algorithms, certificate permissions, and hidden scripts. 100% private client-side security audit.',
  keywords: 'pdf security auditor, audit pdf security, check pdf permissions, inspect pdf encryption, pdf vulnerability scanner, test pdf password strength, verify pdf certificate security, audit confidential pdf, pdf security check online, scan pdf for malicious scripts',
  alternates: buildAlternates('/tools/pdf-security-auditor'),
  openGraph: {
    title: 'PDF Security Auditor — Check Encryption & Permission Vulnerabilities | iCreatePDF',
    description: 'Inspect PDF security settings, encryption algorithms, certificate permissions, and hidden scripts. 100% private client-side security audit.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Security Auditor — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Security Auditor — Check Encryption & Permission Vulnerabilities | iCreatePDF',
    description: 'Inspect PDF security settings, encryption algorithms, certificate permissions, and hidden scripts. 100% private client-side security audit.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfSecurityAuditorToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-security-auditor')}
      badge="Security & Audit"
      title="PDF Security Auditor"
      description="Audit PDF encryption strength (AES-128/256) and user permission flags."
      extraSections={<ToolSeoContent content={toolContent['pdf-security-auditor']} />}
    >
      <PdfSecurityAuditorTool />
    </ToolPageShell>
  );
}
