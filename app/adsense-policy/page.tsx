import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, CheckCircle2, FileText, Cpu, UserCheck, Lock, Mail, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Google AdSense Compliance & Content Policy | iCreatePDF',
  description: 'Learn how iCreatePDF complies with Google AdSense Program policies, quality guidelines, E-E-A-T standards, and AI-assisted content policies.',
  keywords: 'iCreatePDF compliance policy, google adsense policy, AI content guidelines, web accessibility, content quality standards',
  alternates: buildAlternates('/adsense-policy'),
};

const policySections = [
  {
    icon: FileText,
    title: '1. Content Quality & Originality',
    content: `All tools, guides, and documentation on iCreatePDF are created to provide genuine utility and value to users, not to manipulate search engine rankings.

• Every article, tool guide, and technical document is thoroughly reviewed, edited, and verified by humans before publishing.
• We add unique value through original step-by-step browser tutorials, real-time client-side interactive tools, benchmarks, and interactive UI components.
• We strictly refrain from publishing low-quality repetitive content, copying competitor text, or utilizing auto-generated content designed solely for search manipulation.`,
  },
  {
    icon: ShieldCheck,
    title: '2. AdSense Program Policy Compliance',
    content: `iCreatePDF strictly adheres to all Google AdSense Program policies:

• No Invalid Clicks or Impressions: We do not click our own advertisements or encourage users to click ads. Traffic-exchange mechanisms, pay-to-click services, and automated bots are prohibited.
• No Prohibited Content: Our platform contains no adult, violent, hateful, illegal, misleading, or copyrighted content violating AdSense policies.
• Clean Ad Placement: Advertisements are clearly distinguished from interactive PDF utility controls and content elements. Layouts never obscure navigation buttons or trick users into accidental clicks.
• Substantial Page Content: Ads are only displayed on pages featuring functional PDF utility engines or substantial, original documentation.`,
  },
  {
    icon: Cpu,
    title: '3. AI-Generated & Assisted Content Policy',
    content: `Artificial intelligence tools may be used during preliminary research or structural outlining, but AI is never an unmonitored publisher at iCreatePDF.

• Human Editorial Oversight: Every piece of technical documentation undergoes rigorous human review for accuracy, clarity, and practical utility.
• No Scaled Content Abuse: We do not publish automated bulk content or near-identical template pages.
• Practical Enrichment: Articles are enriched with custom code snippets, interactive client-side tool demos, step-by-step workflow diagrams, and verified technical steps.`,
  },
  {
    icon: UserCheck,
    title: '4. E-E-A-T & Trust Signals',
    content: `To uphold Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T):

• Transparent Information: Clear details about our 100% client-side privacy architecture are publicly disclosed across our website.
• Contact & Legal Transparency: Accessible About, Contact, Privacy Policy, Terms of Service, and AdSense Compliance pages are maintained.
• Authoritative Sourcing: Where technical claims are made, we cite official W3C web standards, PDF specification documents (ISO 32000), and reputable open-source web libraries.`,
  },
  {
    icon: Lock,
    title: '5. Technical & User Experience (UX) Standards',
    content: `• Mobile-First Performance: iCreatePDF is built using Next.js and optimized for rapid response times, low latency, and zero server upload overhead.
• Clear Navigation: Clean routing hierarchy with no orphan pages or deceptive download traps.
• Unobtrusive Experience: Advertisements do not block PDF processing canvases, file selection drops, or action buttons.`,
  },
  {
    icon: Mail,
    title: '6. Contact & Compliance Inquiries',
    content: `For any questions, feedback, or policy concerns regarding our AdSense compliance or editorial standards, please contact us directly:

• Website Domain: https://www.icreatepdf.online
• Email Support: crop0339@gmail.com
• Contact Form: https://www.icreatepdf.online/contact

We investigate all policy inquiries promptly and continuously audit our platform for full compliance.`,
  },
];

export default function AdSensePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-brand/20">
      <Navigation />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Policy & Governance
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-display">
            Google AdSense Compliance & Content Policy
          </h1>
          <p className="text-base text-foreground/60 leading-relaxed">
            Last updated: <span className="text-foreground font-medium">July 23, 2026</span> • Site: <span className="text-brand font-mono font-medium">https://www.icreatepdf.online</span>
          </p>
        </div>

        {/* Highlights */}
        <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-brand/5 border border-brand/15 space-y-3">
          <div className="flex items-center gap-2 font-bold text-foreground font-display">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <span>Core Commitment</span>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed">
            This document outlines how <strong>iCreatePDF</strong> maintains strict compliance with Google AdSense Program policies, search quality standards, helpful content requirements, and responsible AI publication practices.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="max-w-3xl mx-auto space-y-8 mb-20">
          {policySections.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.title} className="p-6 lg:p-8 rounded-2xl bg-card border border-border/60 space-y-4 shadow-sm hover:border-brand/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand/10 border border-brand/20">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground font-display">{s.title}</h2>
                </div>
                <div className="text-sm text-foreground/70 leading-relaxed whitespace-pre-line pl-0 lg:pl-12">
                  {s.content}
                </div>
              </section>
            );
          })}

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-brand-950/30 border border-brand/20 text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand mx-auto" />
            <h3 className="text-base font-bold text-foreground font-display">Policy Inquiries & Support</h3>
            <p className="text-xs text-foreground/60">
              For any questions regarding policy enforcement, contact our editorial team directly.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href="mailto:crop0339@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-brand-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" /> Email crop0339@gmail.com
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-border text-foreground text-xs font-semibold hover:border-brand/40 transition-colors"
              >
                Contact Form <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
