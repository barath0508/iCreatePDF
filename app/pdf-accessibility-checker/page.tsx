import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { AccessibilityCheckerTool } from '@/components/tools/AccessibilityCheckerTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Accessibility Checker — WCAG & Screen Reader Audit | iCreatePDF',
  description: 'Audit any PDF for screen-reader accessibility: tagging, declared language, real text layers, and labeled form fields. Free, instant, and fully private in your browser.',
  keywords: 'pdf accessibility checker, pdf a11y, wcag pdf, screen reader pdf, pdf tagged check, pdf accessibility audit online free',
  alternates: buildAlternates('/pdf-accessibility-checker'),
  openGraph: {
    title: 'PDF Accessibility Checker — WCAG & Screen Reader Audit | iCreatePDF',
    description: 'Audit any PDF for screen-reader accessibility: tagging, declared language, real text layers, and labeled form fields.',
    type: 'website',
  }
};

export default function PdfAccessibilityCheckerPage() {
  return (
    <ToolPageShell
      badge="Accessibility"
      title="PDF Accessibility Checker"
      description="Scan any PDF for the accessibility issues that block screen readers — missing tags, undeclared language, scanned-image pages, and unlabeled form fields."
      jsonLd={toolSchema({
        name: 'PDF Accessibility Checker',
        description: 'Audit any PDF for screen-reader accessibility: tagging, declared language, real text layers, and labeled form fields.',
        url: '/pdf-accessibility-checker',
      })}
      extraSections={<ToolSeoContent content={toolContent['pdf-accessibility-checker']} />}
    >
      <AccessibilityCheckerTool />
    </ToolPageShell>
  );
}
