import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { ConverterSection } from '@/components/landing/converter-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
  keywords: 'convert jpg to pdf, jpeg to pdf, convert image to pdf, free online jpg to pdf, private pdf converter',
  alternates: { canonical: '/jpg-to-pdf' },
  openGraph: {
    title: 'Convert JPG to PDF Online - Free & Private | iCreatePDF',
    description: 'Convert JPG or JPEG images to high-quality PDF files. Completely client-side, drag & drop multiple JPGs, reorder, adjust sizes, and download instantly.',
    type: 'website',
  }
};

export default function JpgToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-20">
        <ConverterSection initialFormatFilter="jpg" />
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
