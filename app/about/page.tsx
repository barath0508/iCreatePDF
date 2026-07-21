import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Code2, Users, Mail, Building2, Cpu, Lock, Award } from 'lucide-react';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About iCreatePDF — Publisher Information, Privacy Mission & Web Suite',
  description: 'Learn about iCreatePDF, our engineering principles, zero-upload architecture, and publisher team. 46+ free, browser-native PDF tools built for complete privacy.',
  alternates: buildAlternates('/about'),
  openGraph: {
    title: 'About iCreatePDF — Publisher Information & Privacy-First Tools',
    description: 'Learn about iCreatePDF, our zero-upload WebAssembly architecture, publisher information, and mission.',
    type: 'website',
  },
};

const publisherSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.icreatepdf.online/#organization',
  name: 'iCreatePDF',
  legalName: 'iCreatePDF Tools',
  url: 'https://www.icreatepdf.online',
  logo: 'https://www.icreatepdf.online/logo.png',
  foundingDate: '2026',
  description: 'Free browser-based PDF utilities engineered for zero-upload privacy, security, and accessibility.',
  knowsAbout: [
    'Document Processing',
    'PDF Editing',
    'WebAssembly Utilities',
    'Client-Side Encryption',
    'Document Security'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'crop0339@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Spanish', 'Hindi', 'Tamil']
  }
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'About' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(publisherSchema),
        }}
      />
      <Navigation />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 space-y-16">

        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand uppercase font-mono">
            Publisher Information & Engineering Principles
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            Private PDF utilities, engineered for the modern web
          </h1>
          <p className="text-foreground/50 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            iCreatePDF is an independent digital productivity suite offering 46+ free, browser-native PDF tools. Our software is designed around one unyielding rule: <strong className="text-foreground/80">your files never leave your device</strong>.
          </p>
        </div>

        {/* Publisher Transparency Card */}
        <section className="p-8 rounded-3xl bg-card border border-foreground/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-foreground">Publisher & Operating Entity</h2>
              <p className="text-xs text-foreground/40 font-mono">Official Transparency & E-E-A-T Details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground/70 leading-relaxed border-t border-foreground/5 pt-6">
            <div className="space-y-3">
              <p>
                <strong>Platform Name:</strong> iCreatePDF (<a href="https://www.icreatepdf.online" className="text-brand hover:underline font-mono">icreatepdf.online</a>)
              </p>
              <p>
                <strong>Development Team:</strong> Founded and maintained by Barath and the iCreatePDF web software engineering team.
              </p>
              <p>
                <strong>Primary Contact:</strong> <a href="mailto:crop0339@gmail.com" className="text-brand hover:underline">crop0339@gmail.com</a>
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Core Focus:</strong> Private client-side PDF conversions, document security, OCR text extraction, and digital signature tools.
              </p>
              <p>
                <strong>Languages Supported:</strong> English, Spanish (Español), Hindi (हिन्दी), Tamil (தமிழ்).
              </p>
              <p>
                <strong>Hosting Infrastructure:</strong> Deployed globally on Vercel Edge Serverless Infrastructure with strict TLS 1.3 security headers.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand" /> Zero-Upload WebAssembly Architecture
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Conventional online PDF converters require users to upload sensitive files—financial ledgers, identity scans, legal contracts, medical reports—to remote cloud servers. Even when servers promise temporary storage, transmitting confidential documents introduces needless cybersecurity exposure.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed">
            iCreatePDF operates on a zero-upload architecture. Using modern browser technologies like WebAssembly (Wasm), HTML5 Canvas, and client-side JavaScript libraries (including PDF-Lib and Tesseract OCR Wasm modules), all document parsing, rendering, page splitting, merging, compression, and text extraction occur directly in your browser's local sandbox memory space.
          </p>
        </section>

        {/* Sustainability & Free Business Model */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-brand" /> Business Model & AdSense Funding
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Because document processing runs on your own device CPU rather than remote cloud servers, iCreatePDF does not incur heavy per-file server compute bills. We sustain our platform development, domain maintenance, and tool expanding efforts through privacy-conscious advertising (Google AdSense) rather than subscription paywalls or file size limits.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed">
            We are committed to delivering 100% free access to all 46+ tools without hidden charges, mandatory account sign-ups, or watermarked outputs. Read our complete <Link href="/privacy" className="text-brand hover:underline underline-offset-2">Privacy Policy</Link> and <Link href="/terms" className="text-brand hover:underline underline-offset-2">Terms of Service</Link>.
          </p>
        </section>

        {/* Security & Quality */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand" /> Editorial Standards & Security Commitments
          </h2>
          <ul className="space-y-2 text-sm text-foreground/60 leading-relaxed list-disc pl-5">
            <li><strong>Continuous Dependency Audits:</strong> All client-side processing libraries undergo regular vulnerability patching.</li>
            <li><strong>Offline Capability:</strong> Once loaded in your web browser, core document processing functions operate even when disconnected from the internet.</li>
            <li><strong>Comprehensive Guides:</strong> Every tool page includes step-by-step instructions, use cases, and technical FAQs written by our document engineering team.</li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3">
          <h2 className="text-base font-bold font-display flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand" /> Get in Touch
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Have questions about our technology stack, press inquiries, or feature suggestions? Visit our <Link href="/contact" className="text-brand hover:underline underline-offset-2">contact page</Link> or send an email directly to <a href="mailto:crop0339@gmail.com" className="text-brand hover:underline underline-offset-2">crop0339@gmail.com</a>.
          </p>
        </section>

      </div>

      <FooterSection />
    </main>
  );
}

