import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'HEIC to PDF: Convert iPhone Photos Free & Privately | iCreatePDF',
  description: 'Convert iPhone HEIC photos to PDF directly in your browser. 100% local client-side conversion, zero server uploads, safe for sensitive photos.',
  keywords: 'heic to pdf, convert heic to pdf, convert iphone heic to pdf, heic to pdf converter, convert heic to pdf offline, offline heic to pdf converter, convert heic to pdf locally, iphone heic to pdf private, local image converter',
  alternates: buildAlternates('/heic-to-pdf'),
  openGraph: {
    title: 'HEIC to PDF: Convert iPhone Photos Free & Privately | iCreatePDF',
    description: 'Convert iPhone HEIC photos to PDF directly in your browser. 100% local client-side conversion, zero server uploads, safe for sensitive photos.',
    type: 'website',
  }
};

export default function HeicToPdfPage() {
  return (
    <ToolPageShell
      badge="Image Converter"
      title="HEIC to PDF"
      description="Drag & drop multiple HEIC images from iPhone, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={
        <>
          <FeaturesSection />
          <HowItWorksSection />
          <SecuritySection />
          <CtaSection />
        </>
      }
    >
      <ConverterSection initialFormatFilter="heic" />
    </ToolPageShell>
  );
}
