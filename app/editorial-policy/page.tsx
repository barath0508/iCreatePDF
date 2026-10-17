import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, CheckCircle2, FileText, Cpu, UserCheck, Lock, Mail, Award, Laptop, AlertTriangle, RefreshCw } from 'lucide-react';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Standards & Testing Methodology | iCreatePDF',
  description: 'Learn about our rigorous editorial standards, hands-on browser testing methodology, zero-knowledge privacy commitments, and corrections policy.',
  keywords: 'iCreatePDF editorial standards, pdf testing methodology, content quality policy, how we test pdf tools, privacy commitments',
  alternates: buildAlternates('/editorial-policy'),
  openGraph: {
    title: 'Editorial Standards & Testing Methodology | iCreatePDF',
    description: 'Learn how our engineering team tests, verifies, and writes tutorials for 70+ client-side PDF tools.',
    type: 'website',
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Editorial Standards' },
            ])
          ),
        }}
      />
      <Navigation />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5" /> Quality, Integrity &amp; Transparency
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            Editorial Standards &amp; Testing Methodology
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At iCreatePDF, our mission is to empower users with reliable, free, and completely private document utilities. This policy outlines how our engineering team researches, tests, writes, and maintains our educational resources.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: UserCheck,
              title: 'Expert-Led Authorship',
              desc: 'Every guide is written or technical-reviewed by hands-on web software engineers with direct experience in PDF specifications and browser WebAssembly.',
            },
            {
              icon: Laptop,
              title: 'Real-Device Verification',
              desc: 'We never publish theoretical advice. All workflows are physically tested across desktop and mobile browsers before recommendations go live.',
            },
            {
              icon: Lock,
              title: 'Zero-Knowledge Privacy',
              desc: 'Our tutorials reflect our core architecture: your sensitive tax forms, contracts, and identity documents never touch external cloud servers.',
            },
          ].map((pillar, i) => (
            <div key={i} className="p-6 rounded-3xl bg-card border border-foreground/10 space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-brand/10 border border-brand/20 text-brand">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display text-foreground">{pillar.title}</h2>
              <p className="text-xs text-foreground/60 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-foreground/75 leading-relaxed text-sm sm:text-base">

          {/* Section 1: Testing Lab */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <Laptop className="w-5 h-5 text-brand" /> 1. Our Hands-On Testing Matrix
            </h2>
            <p>
              Many online PDF blogs publish theoretical advice or regurgitated marketing summaries. At iCreatePDF, our tutorials are practical documentation written by the very engineers who build and maintain the tools.
            </p>
            <p>
              Before any step-by-step tutorial or technical comparison is published, our team validates the workflow across an active hardware and browser matrix:
            </p>
            <div className="p-5 rounded-2xl bg-card border border-foreground/5 space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <strong className="text-foreground block mb-1">Desktop Environments:</strong>
                  <ul className="list-disc list-inside space-y-1 text-foreground/60">
                    <li>macOS Sonoma / Sequoia (Google Chrome, Apple Safari, Mozilla Firefox)</li>
                    <li>Windows 11 (Google Chrome, Microsoft Edge, Mozilla Firefox)</li>
                    <li>Ubuntu Linux (Chromium, Firefox)</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Mobile &amp; Tablet Environments:</strong>
                  <ul className="list-disc list-inside space-y-1 text-foreground/60">
                    <li>iOS 17+ (Mobile Safari, Chrome for iOS)</li>
                    <li>Android 14+ (Chrome Mobile, Samsung Internet)</li>
                    <li>iPadOS (Split View, Apple Pencil touch annotation)</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground/60">
              We test files of various complexities: large 500+ page eBooks, high-DPI scanned 600 DPI bitmap images, vector architectural blueprints, password-protected documents, and AcroForm fillable tax packages.
            </p>
          </section>

          {/* Section 2: AI-Assisted Content Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand" /> 2. Responsible AI &amp; Originality Policy
            </h2>
            <p>
              We firmly oppose low-effort, programmatic, or scaled AI spam. While modern developers use AI tools for syntax checking and ideation, <strong>every article published on iCreatePDF is conceived, structured, fact-checked, and written by human software engineers</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-foreground/70">
              <li><strong>Zero Unmonitored Generation:</strong> We do not publish automated mass-generated articles or cookie-cutter templates.</li>
              <li><strong>Original Value:</strong> Every article includes unique screenshots, verified command sequences, accurate file size trade-offs, and genuine troubleshooting tips.</li>
              <li><strong>Anti-Plagiarism:</strong> We do not scrape, spin, or duplicate content from competitors. All technical benchmarks and architectural explanations reflect our proprietary client-side codebase.</li>
            </ul>
          </section>

          {/* Section 3: Corrections Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-brand" /> 3. Corrections &amp; Technical Updates
            </h2>
            <p>
              Web standards, PDF specifications (ISO 32000-1 and ISO 32000-2), and browser security sandboxes evolve rapidly. If a browser update modifies canvas memory limits or changes WebAssembly threading behaviors, we promptly re-verify and update our affected guides.
            </p>
            <p>
              If you notice any technical inaccuracy, outdated instruction, or broken link, please contact us at <a href="mailto:crop0339@gmail.com" className="text-brand hover:underline font-mono">crop0339@gmail.com</a> with the subject line <em>&ldquo;Editorial Correction&rdquo;</em>. Our engineering team investigates and issues revisions within 48 hours.
            </p>
          </section>

          {/* Section 4: Monetization & Ad Transparency */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand" /> 4. Advertising &amp; Independence Transparency
            </h2>
            <p>
              Many PDF services utilize aggressive dark patterns: bait-and-switch free trials, mandatory credit card entries, stealth subscriptions, or selling user conversion telemetry to third-party data brokers.
            </p>
            <p>
              iCreatePDF operates under a transparent, ethical business model:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-foreground/70">
              <li><strong>100% Free Forever:</strong> All 70+ tools have no page limits, no watermarks, and no mandatory account sign-ups.</li>
              <li><strong>Clean Advertising:</strong> We fund our infrastructure, domain fees, and continuous development via privacy-compliant display advertising (Google AdSense).</li>
              <li><strong>Non-Intrusive Layouts:</strong> Advertisements are strictly separated from tool workspaces and action buttons to prevent accidental clicks or deceptive experiences.</li>
              <li><strong>Editorial Independence:</strong> Advertisers have zero influence over our technical recommendations, tool reviews, or software architecture decisions.</li>
            </ul>
          </section>

          {/* Section 5: Author Attribution */}
          <section className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3">
            <h2 className="text-base font-bold font-display text-foreground flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand" /> Meet the Editorial &amp; Engineering Team
            </h2>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Want to learn more about the engineers building iCreatePDF? Visit the profile of our Lead Developer, <Link href="/authors/barath-r" className="text-brand hover:underline font-semibold">Barath R</Link>, or read our complete <Link href="/about" className="text-brand hover:underline font-semibold">Publisher &amp; Company Overview</Link>.
            </p>
          </section>

        </div>

      </div>

      <FooterSection />
    </main>
  );
}
