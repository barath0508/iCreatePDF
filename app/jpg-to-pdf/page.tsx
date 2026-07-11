import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ConverterSection } from '@/components/landing/converter-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
  keywords: 'convert jpg to pdf, jpeg to pdf, convert image to pdf, free online jpg to pdf, private pdf converter',
  alternates: buildAlternates('/jpg-to-pdf'),
  openGraph: {
    title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
    type: 'website',
  }
};

export default function JpgToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'JPG to PDF',
        description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
        url: '/jpg-to-pdf',
      })}
      badge="Image Converter"
      title="JPG to PDF"
      description="Drag & drop multiple JPG images, reorder, adjust sizes, and download as a high-quality PDF instantly."
      extraSections={
        <>
          <FeaturesSection />
          <HowItWorksSection />
          <SecuritySection />
          <CtaSection />
        </>
      }
    >
      <ConverterSection initialFormatFilter="jpg" />
    </ToolPageShell>
  );
}
