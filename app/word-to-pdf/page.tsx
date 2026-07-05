import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert Word to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
  keywords: 'convert word to pdf, docx to pdf, word document converter online, free docx to pdf, private pdf converter, icreatepdf',
  alternates: buildAlternates('/word-to-pdf'),
  openGraph: {
    title: 'Convert Word to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert DOCX Word documents into PDF files. Completely client-side inside browser sandbox, preserving text layout with 100% data privacy.',
    type: 'website',
  }
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      badge="DOCX converter"
      title="Word to PDF"
      description="Drop your Word document (.docx) to compile it into a PDF layout. Processed entirely inside your browser memory."
      extraSections={
        <>
          <FeaturesSection />
          <HowItWorksSection />
          <SecuritySection />
          <CtaSection />
        </>
      }
    >
      <div className="relative z-10">
        <WordToPdfTool />
      </div>
    </ToolPageShell>
  );
}
