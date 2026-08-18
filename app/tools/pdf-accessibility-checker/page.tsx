import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { AccessibilityCheckerTool } from '@/components/tools/AccessibilityCheckerTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Accessibility Checker — WCAG & Section 508 Validator | iCreatePDF',
  description: 'Audit PDF documents for WCAG 2.1, Section 508, and PDF/UA accessibility compliance. Inspect tags, headings, alt-text, and color contrast locally.',
  keywords: 'pdf accessibility checker, check pdf accessibility, wcag pdf compliance, section 508 pdf checker, pdf ua accessibility audit, pdf screen reader test, accessible pdf validator, check pdf alt text, pdf reading order test, accessibility compliance report pdf, audit pdf for disabled users',
  alternates: buildAlternates('/tools/pdf-accessibility-checker'),
  openGraph: {
    title: 'PDF Accessibility Checker — WCAG & Section 508 Validator | iCreatePDF',
    description: 'Audit PDF documents for WCAG 2.1, Section 508, and PDF/UA accessibility compliance. Inspect tags, headings, alt-text, and color contrast locally.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Accessibility Checker (WCAG) — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Accessibility Checker — WCAG & Section 508 Validator | iCreatePDF',
    description: 'Audit PDF documents for WCAG 2.1, Section 508, and PDF/UA accessibility compliance. Inspect tags, headings, alt-text, and color contrast locally.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfAccessibilityCheckerPage() {
  return (
    <ToolPageShell
      badge="Accessibility"
      title="PDF Accessibility Checker"
      description="Scan any PDF for the accessibility issues that block screen readers — missing tags, undeclared language, scanned-image pages, and unlabeled form fields."
      jsonLd={getToolFullJsonLd('pdf-accessibility-checker')}
      extraSections={<ToolSeoContent content={toolContent['pdf-accessibility-checker']} />}
    >
      <AccessibilityCheckerTool />
    </ToolPageShell>
  );
}
