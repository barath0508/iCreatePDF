import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, Eye, Globe, Trash2, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | iCreatePDF — 100% Client-Side PDF Tool',
  description: 'iCreatePDF processes all PDF and image files entirely in your browser. No uploads, no servers, no data collection. Read our full privacy policy.',
  keywords: 'icreatepdf privacy policy, pdf tool privacy, no upload pdf converter, client-side pdf privacy, gdpr pdf tool',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    icon: Lock,
    title: '1. No File Uploads — Ever',
    content: `All PDF generation, conversion, compression, merging, splitting, editing, signing, and verification operations performed by iCreatePDF occur entirely inside your web browser using client-side JavaScript. Your files, images, and documents are processed locally on your device and are never transmitted to, stored on, or processed by any remote server or cloud infrastructure operated by iCreatePDF or any third party.

This is a fundamental architectural choice, not just a policy — our servers have no capability to receive or store your files.`,
  },
  {
    icon: Eye,
    title: '2. Information We Collect',
    content: `We collect the minimum data necessary to operate our website:

• Aggregated analytics (page views, session duration, tool usage counts) — collected via privacy-respecting analytics that do not identify you personally.
• Browser type and approximate geographic region (country level) for performance monitoring.
• Error logs (anonymised) to help us fix technical issues.

We do NOT collect: names, email addresses, IP addresses (stored beyond the current session), file names, file contents, or any information from the files you process.`,
  },
  {
    icon: ShieldCheck,
    title: '3. Cookies and Local Storage',
    content: `iCreatePDF does not use tracking cookies or advertising cookies of any kind.

We may use browser localStorage or sessionStorage solely to remember your UI preferences (such as default page size, output quality settings, or dark mode preference). This data never leaves your device and is not transmitted anywhere.

You can clear this data at any time through your browser's developer tools or settings panel.`,
  },
  {
    icon: Globe,
    title: '4. Third-Party Services',
    content: `Our website may load resources from the following trusted third-party providers:

• Google Fonts — to serve typography assets (font files). Google may log the request. No personal data related to your file usage is shared.
• Vercel — our hosting platform. Vercel may collect server access logs (HTTP request metadata) for operational security purposes, governed by Vercel's own privacy policy.
• Search Console / Analytics — we use Google Search Console for indexing verification only, and may use a self-hosted or privacy-first analytics tool (e.g., Plausible or Umami) for traffic statistics.

None of these third parties have access to any files you process on iCreatePDF.`,
  },
  {
    icon: ShieldCheck,
    title: '5. Children\'s Privacy',
    content: `iCreatePDF is a general-purpose document tool and is not directed at children under the age of 13 (or under 16 in the European Union). We do not knowingly collect personal information from children. If you believe a child has inadvertently provided us with personal data, please contact us and we will delete it promptly.`,
  },
  {
    icon: Globe,
    title: '6. International Users & GDPR',
    content: `If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, your privacy is additionally protected under the General Data Protection Regulation (GDPR) or equivalent legislation.

Because iCreatePDF processes no personal data from your files and collects only minimal aggregated analytics, our legal basis for any processing is legitimate interest (operating and improving our free service). You have the right to:
• Access any personal data we hold about you.
• Request correction or deletion of your data.
• Object to processing or request restriction.
• Lodge a complaint with your local data protection authority.

To exercise any of these rights, contact us using the email below.`,
  },
  {
    icon: Globe,
    title: '7. CCPA — California Residents',
    content: `Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information.

iCreatePDF does not sell, rent, or trade personal information. The minimal analytics data we collect is not sold to any third party. California residents may contact us at the email below to exercise their CCPA rights.`,
  },
  {
    icon: Trash2,
    title: '8. Data Retention',
    content: `Because we do not store your files or personally identifiable information, there is no file data to retain or delete. Aggregated, anonymised analytics data (page view counts, session durations) may be retained for up to 24 months for the purpose of product improvement.

Any contact form submissions or support emails are retained only as long as necessary to resolve your query, after which they are permanently deleted.`,
  },
  {
    icon: Lock,
    title: '9. Security',
    content: `iCreatePDF serves all pages over HTTPS (TLS 1.2+). Our hosting infrastructure includes DDoS protection, automatic TLS certificate rotation, and security headers (Content Security Policy, X-Frame-Options, Strict-Transport-Security).

Since we do not store your files or personal data on our servers, the attack surface for data breaches is minimal by design. Your files remain on your device throughout the entire processing workflow.`,
  },
  {
    icon: Mail,
    title: '10. Changes to This Policy & Contact',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Material changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.

If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:

privacy@icreatepdf.com

We aim to respond to all legitimate privacy requests within 14 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />

      <main className="flex-1 w-full">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-6 pt-36 pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 tracking-wide uppercase font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy First
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
            iCreatePDF is built on a simple principle: <strong className="text-white/70">your files never leave your device</strong>.
            Everything runs in your browser. No uploads. No cloud. No exceptions.
          </p>
          <p className="text-xs text-white/30 font-mono">Effective date: May 27, 2026 · Last updated: May 27, 2026</p>
        </div>

        {/* Quick trust badges */}
        <div className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'No File Uploads', sub: 'Files stay on your device' },
              { label: 'No Accounts Required', sub: 'Zero registration needed' },
              { label: 'No Tracking Cookies', sub: 'No ad or user tracking' },
            ].map((b) => (
              <div key={b.label} className="p-4 rounded-2xl bg-zinc-950 border border-white/5">
                <p className="text-xs font-bold text-emerald-400">{b.label}</p>
                <p className="text-[10px] text-white/40 mt-1">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy sections */}
        <div className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.title} className="p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <h2 className="text-base font-bold text-white font-display">{s.title}</h2>
                </div>
                <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line pl-11">
                  {s.content}
                </div>
              </section>
            );
          })}

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-green-950/30 border border-emerald-500/20 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-white">Questions about your privacy?</p>
            <a
              href="mailto:privacy@icreatepdf.com"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
            >
              privacy@icreatepdf.com
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
