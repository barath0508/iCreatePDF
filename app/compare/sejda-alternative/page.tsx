import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, Zap, Coins, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sejda Alternative: Free Online PDF Editor with No Daily Limits | iCreatePDF',
  description: 'Looking for a Sejda PDF alternative? iCreatePDF has no 3-task daily limit, no 50MB cap, and never uploads your files — everything runs 100% locally in your browser for free.',
  keywords: 'sejda alternative, sejda pdf alternative, sejda vs icreatepdf, free sejda alternative no limit, sejda free alternative unlimited tasks, best sejda alternative',
  alternates: buildAlternates('/compare/sejda-alternative'),
  openGraph: {
    title: 'Sejda Alternative: Free Online PDF Editor with No Daily Limits',
    description: 'Looking for a Sejda PDF alternative? iCreatePDF has no 3-task daily limit and 100% private in-browser processing.',
    type: 'website',
  },
};

const rows = [
  { attribute: 'Daily Task Limit', icreate: 'Unlimited Free', them: 'Capped at 3 tasks per day' },
  { attribute: 'File Size Limit', icreate: 'No limit (Device RAM)', them: 'Capped at 50 MB / 200 pages' },
  { attribute: 'Pricing for Unlimited', icreate: 'Free forever ($0)', them: '$7.50/week or $63/year' },
  { attribute: 'File Upload Privacy', icreate: '100% In-Browser (Zero uploads)', them: 'Uploaded to Sejda cloud servers' },
  { attribute: 'Watermarks / Hidden Fees', icreate: 'None', them: 'None (if within limits)' },
  { attribute: 'Works Offline', icreate: 'Yes (WebAssembly)', them: 'No (Requires cloud connection)' },
];

const faqs = [
  {
    q: 'Why switch from Sejda to iCreatePDF?',
    a: 'Sejda stops working after you perform 3 tasks in an hour, requiring you to pay $7.50/week to continue editing. iCreatePDF has no task limits, no hourly timers, and no file caps, allowing you to process dozens of documents continuously for free.',
  },
  {
    q: 'Can iCreatePDF edit text and fill forms like Sejda?',
    a: 'Yes. iCreatePDF includes form filling, vector signature stamping, text insertion, and redaction capabilities that run entirely inside your browser engine.',
  },
  {
    q: 'Are my confidential documents uploaded to a server?',
    a: 'No. While Sejda uploads your files to their cloud infrastructure for server-side processing, iCreatePDF runs locally on your machine. Your bank statements, contracts, and medical records never leave your device.',
  },
];

export default function SejdaAlternativePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Sejda Alternative' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <Navigation />

      <div className="pt-32 pb-24 flex-1">
        <div className="max-w-[1000px] mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand tracking-wide uppercase font-mono">
              Sejda PDF Alternative
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              A Free Sejda Alternative <br /> With No 3-Task Daily Limit
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              Tired of Sejda locking you out after 3 conversions? iCreatePDF is 100% free with unlimited tasks, no file size caps, and zero server uploads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Coins, title: 'No 3-Task Limits', body: 'Edit, merge, and compress as many PDFs as you need without waiting for a daily reset timer.' },
              { icon: Lock, title: 'Zero Cloud Storage', body: 'Sejda holds files on cloud servers for 2 hours. iCreatePDF never uploads a single byte.' },
              { icon: Zap, title: 'No 50MB Cap', body: 'Process massive multi-hundred-page textbooks and scans without hitting arbitrary file size restrictions.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card/40 border border-foreground/5 space-y-3">
                <div className="p-2.5 w-fit rounded-xl bg-brand/10 text-brand border border-brand/20">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground font-display">{f.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="p-8 rounded-3xl bg-card/30 border border-foreground/5 space-y-6">
            <h2 className="text-2xl font-bold font-display text-foreground text-center">
              iCreatePDF vs. Sejda PDF
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-foreground/70">
                <thead>
                  <tr className="border-b border-foreground/10 text-left">
                    <th className="pb-4 font-semibold text-foreground">Feature</th>
                    <th className="pb-4 font-semibold text-brand">iCreatePDF</th>
                    <th className="pb-4 font-semibold text-foreground/50">Sejda PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {rows.map((r) => (
                    <tr key={r.attribute}>
                      <td className="py-3.5 font-medium text-foreground/90">{r.attribute}</td>
                      <td className="py-3.5 text-emerald-400 font-semibold">{r.icreate}</td>
                      <td className="py-3.5 text-foreground/50">{r.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-foreground text-center mb-6">
              Frequently Asked Questions
            </h2>
            {faqs.map((f) => (
              <div key={f.q} className="p-5 rounded-2xl bg-card/40 border border-foreground/5 space-y-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base">{f.q}</h3>
                <p className="text-xs text-sm text-foreground/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
            <h3 className="text-2xl font-bold font-display text-foreground">Edit Unlimited PDFs Now</h3>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-md mx-auto">
              No account. No credit card. No hourly task limits.
            </p>
            <Link href="/edit-pdf">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-semibold px-8 rounded-full">
                Open Free Online PDF Editor
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
