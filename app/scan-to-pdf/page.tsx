import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ScanToPdfTool } from '@/components/tools/ScanToPdfTool';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
  description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
  keywords: 'scan to pdf, document scanner online, webcam to pdf, mobile camera scan to pdf, free online scanner, icreatepdf',
  alternates: buildAlternates('/scan-to-pdf'),
  openGraph: {
    title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
    description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
    type: 'website',
  }
};

export default function ScanToPdfPage() {
  return (
    <ToolPageShell
      badge="Device Scanner"
      title="Scan to PDF"
      description="Scan multiple pages and compile them into a high-quality PDF in seconds. Processed entirely inside your browser sandbox."
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
        <ScanToPdfTool />
      </div>
    </ToolPageShell>
  );
}
