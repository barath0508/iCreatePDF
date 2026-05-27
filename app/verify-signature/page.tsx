import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { VerifySignatureTool } from '@/components/tools/VerifySignatureTool';
import { FooterSection } from '@/components/landing/footer-section';

export const metadata: Metadata = {
  title: 'Verify PDF Signature - Validate Certificates Online | iCreatePDF',
  description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
  keywords: 'verify pdf signature, validate digital signature pdf, check pdf certificate, verify signed pdf online',
  alternates: { canonical: '/verify-signature' },
  openGraph: {
    title: 'Verify PDF Signature - Validate Certificates Online | iCreatePDF',
    description: 'Validate cryptographic signatures on PDF files locally. Inspect signer identity details and document byte-range integrity.',
    type: 'website',
  }
};

export default function VerifySignaturePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 tracking-wide uppercase font-mono">
            Security Validator
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Verify PDF Signatures
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Extract cryptographic certificate metadata and check file integrity post-signature.
          </p>
        </div>
        <VerifySignatureTool />
      </div>
      <FooterSection />
    </main>
  );
}
