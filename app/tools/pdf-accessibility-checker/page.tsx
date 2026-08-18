import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { AccessibilityCheckerTool } from '@/components/tools/AccessibilityCheckerTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Accessibility Checker — WCAG & Section 508 Validator | iCreatePDF',
  description: 'Audit PDF documents for WCAG 2.1, Section 508, and PDF/UA accessibility compliance. Inspect tags, headings, alt-text, and color contrast locally.',
  keywords: 'pdf accessibility checker, check pdf accessibility, wcag pdf compliance, section 508 pdf checker, pdf ua accessibility audit, pdf screen reader test, accessible pdf validator, check pdf alt text, pdf reading order test, accessibility compliance report pdf',
  alternates: buildAlternates('/tools/pdf-accessibility-checker'),
  openGraph: {
    title: 'PDF Accessibility Checker — WCAG & Screen Reader Audit ...',
    description: 'Audit any PDF for screen-reader accessibility: tagging, declared language, real text layers, and labeled form fields. Free, instant, and fully private in your browser.',
    type: 'website',
  }
};

export default function PdfAccessibilityCheckerPage() {
  return (
    <ToolPageShell
      badge="Accessibility"
      title="PDF Accessibility Checker"
      description="Scan any PDF for the accessibility issues that block screen readers — missing tags, undeclared language, scanned-image pages, and unlabeled form fields."
      jsonLd={[
        ...toolSchema({
          name: 'PDF Accessibility Checker (WCAG)',
          description: 'Audit PDF documents for WCAG 2.1, Section 508, and PDF/UA accessibility compliance. Inspect tags, headings, alt-text, and color contrast locally.',
          url: '/tools/pdf-accessibility-checker',
        }),
        faqSchema(toolContent['pdf-accessibility-checker'].faqs),
        howToSchema({
          name: 'PDF Accessibility Checker (WCAG)',
          description: toolContent['pdf-accessibility-checker'].overview,
          url: '/tools/pdf-accessibility-checker',
          steps: toolContent['pdf-accessibility-checker'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['pdf-accessibility-checker']} />}
    >
      <AccessibilityCheckerTool />
    </ToolPageShell>
  );
}
