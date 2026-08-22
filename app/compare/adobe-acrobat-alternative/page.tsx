import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, Zap, Coins, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Free Adobe Acrobat Alternative Online (No Subscription Required) | iCreatePDF',
  description: 'Looking for a free Adobe Acrobat alternative? iCreatePDF offers 70+ in-browser PDF tools — merge, compress, edit, sign, convert, and protect PDFs with zero cost and 100% privacy.',
  keywords: 'adobe acrobat alternative, free adobe acrobat alternative, edit pdf without acrobat, free pdf editor alternative to adobe, best free alternative to adobe acrobat pro, online acrobat alternative',
  alternates: buildAlternates('/compare/adobe-acrobat-alternative'),
  openGraph: {
    title: 'Free Adobe Acrobat Alternative Online (No Subscription Required)',
    description: 'Looking for a free Adobe Acrobat alternative? iCreatePDF offers 70+ in-browser PDF tools with zero cost and 100% privacy.',
    type: 'website',
  },
};

const rows = [
  { attribute: 'Annual Cost', icreate: 'Free ($0 / year)', them: '$239.88 / year (Acrobat Pro)' },
  { attribute: 'Software Installation', icreate: 'None (Runs in any browser)', them: 'Large 2GB+ desktop installer' },
  { attribute: 'Privacy & Storage', icreate: '100% Local (Never leaves device)', them: 'Synced to Adobe Document Cloud' },
  { attribute: 'Account / Credit Card Required', icreate: 'No account needed', them: 'Mandatory Adobe ID + billing info' },
  { attribute: 'Cross-Device Compatibility', icreate: 'Mac, Windows, Linux, iOS, Android', them: 'Limited by license seats' },
  { attribute: 'Watermarks on Free Export', icreate: 'Zero Watermarks', them: 'Trial limits and paid locks' },
];

const faqs = [
  {
    q: 'Can iCreatePDF replace Adobe Acrobat for everyday PDF tasks?',
    a: 'Yes. For 95% of standard PDF workflows — merging contracts, compressing documents for email, converting between PDF and Office formats, filling forms, and adding digital signatures — iCreatePDF provides an instant, zero-cost alternative that runs directly in your browser.',
  },
  {
    q: 'Is iCreatePDF safer than Adobe Document Cloud?',
    a: 'iCreatePDF processes all files in-memory using WebAssembly and Canvas APIs without uploading them to cloud servers. Adobe Acrobat automatically syncs your files to Adobe Document Cloud servers unless manually disabled, which may violate corporate NDA or compliance policies.',
  },
  {
    q: 'Why is iCreatePDF completely free?',
    a: 'Because iCreatePDF runs on your device\'s local CPU rather than expensive cloud servers, our infrastructure costs are a tiny fraction of Adobe\'s server farms. We pass those savings to users by keeping the entire suite completely free.',
  },
];

export default function AdobeAcrobatAlternativePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Adobe Acrobat Alternative' },
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
              Adobe Acrobat Alternative
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              A Free Adobe Acrobat Alternative <br /> With Zero Subscription
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              Why pay $240 every year for Adobe Acrobat Pro? Merge, compress, convert, edit, sign, and protect PDFs for free in your browser with 100% privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Coins, title: 'Save $240 / year', body: 'Get access to 70+ essential PDF tools with zero subscription fees or hidden trial charges.' },
              { icon: Lock, title: 'Zero Cloud Uploads', body: 'Unlike Adobe Cloud Sync, iCreatePDF keeps 100% of your documents on your local device.' },
              { icon: Zap, title: 'No App to Install', body: 'Instant in-browser WebAssembly engine. Works on Mac, Windows, Chromebooks, and phones.' },
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
              iCreatePDF vs. Adobe Acrobat Pro
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-foreground/70">
                <thead>
                  <tr className="border-b border-foreground/10 text-left">
                    <th className="pb-4 font-semibold text-foreground">Feature</th>
                    <th className="pb-4 font-semibold text-brand">iCreatePDF</th>
                    <th className="pb-4 font-semibold text-foreground/50">Adobe Acrobat Pro</th>
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
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
            <h3 className="text-2xl font-bold font-display text-foreground">Switch to iCreatePDF Today</h3>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-md mx-auto">
              Enjoy complete freedom from monthly software subscriptions. Fast, private, and unlimited.
            </p>
            <Link href="/#tools">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-semibold px-8 rounded-full">
                Explore All 70+ Free PDF Tools
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
