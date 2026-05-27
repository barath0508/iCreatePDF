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
  title: 'Convert HEIC to PDF Online - Free & Private | iCreatePDF',
  description: 'Convert Apple HEIC photos to PDF online. 100% client-side, drag & drop multiple HEIC images from iPhone, reorder, adjust sizes, and download instantly.',
  keywords: 'convert heic to pdf, iphone heic to pdf, heic to pdf online, free heic to pdf, private pdf converter',
};

export default function HeicToPdfPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-20">
        <ConverterSection initialFormatFilter="heic" />
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
