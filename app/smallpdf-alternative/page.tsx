import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, Zap, Infinity as InfinityIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smallpdf Alternative: No 2-Task Daily Limit | iCreatePDF',
  description: "Smallpdf's free plan caps you at 2 tasks a day. iCreatePDF is unlimited, free, and never uploads your files — everything runs locally in your browser.",
  keywords: 'smallpdf alternative, smallpdf vs icreatepdf, smallpdf task limit, smallpdf free alternative, smallpdf 2 tasks per day',
  alternates: buildAlternates('/smallpdf-alternative'),
  openGraph: {
    title: 'Smallpdf Alternative: No 2-Task Daily Limit | iCreatePDF',
    description: "iCreatePDF is an unlimited, free Smallpdf alternative with 100% local, in-browser processing.",
    type: 'website',
  },
};

const rows = [
  { attribute: 'Price', icreate: 'Free, unlimited', them: 'Free tier, then $12/mo Pro' },
  { attribute: 'Daily task limit (free tier)', icreate: 'Unlimited', them: '2 tasks per day' },
  { attribute: 'Free-tier file size limit', icreate: 'No limit', them: '100 MB per file' },
  { attribute: 'Where files are processed', icreate: 'Your browser — never uploaded', them: "Smallpdf's servers" },
  { attribute: 'Account required for full use', icreate: 'No', them: 'Often required after free tasks are used' },
  { attribute: 'Works offline once loaded', icreate: 'Yes', them: 'No' },
];

const faqs = [
  {
    q: 'Why does Smallpdf only let me do 2 tasks a day for free?',
    a: "Smallpdf's free plan is intentionally rate-limited to push users toward the Pro subscription. iCreatePDF isn't rate-limited at all — merge, split, compress, and convert as many files as you need, at no cost.",
  },
  {
    q: 'Is iCreatePDF as easy to use as Smallpdf?',
    a: 'iCreatePDF follows the same drag-and-drop, single-purpose-tool pattern Smallpdf popularized — pick a tool, drop your file, download the result. The difference is what happens in between: your file is processed on your device instead of Smallpdf\'s servers.',
  },
  {
    q: 'Do I need to sign up to use iCreatePDF instead of Smallpdf?',
    a: 'No. Every tool works with zero account creation, unlike Smallpdf which asks you to sign in once you hit the daily task limit.',
  },
  {
    q: 'Is my file safer with iCreatePDF than Smallpdf?',
    a: "Smallpdf, like most cloud converters, uploads your file to its servers to process it. iCreatePDF's tools run entirely in your browser via WebAssembly/JavaScript, so your file is never transmitted anywhere.",
  },
];

export default function SmallpdfAlternativePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Smallpdf Alternative' },
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
              Smallpdf Alternative
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              A Smallpdf Alternative <br className="sm:hidden" /> With No 2-Task Limit
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              Smallpdf's free plan stops you after 2 tasks a day. iCreatePDF has no daily limit at all, because processing runs on your device, not a shared server queue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: InfinityIcon, title: 'No daily task limit', body: "Run as many merges, splits, or conversions as you need — no counter, no lockout." },
              { icon: Lock, title: 'Nothing uploaded', body: 'Files stay in your browser sandbox. Nothing is sent to iCreatePDF or anyone else.' },
              { icon: Zap, title: 'Instant, no queue', body: 'No upload/download round trip — processing starts the moment you drop a file.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card/40 border border-foreground/5 space-y-3">
                <div className="p-2.5 w-fit rounded-xl bg-brand/10 text-brand border border-brand/20">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-display">{f.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-center">iCreatePDF vs. Smallpdf</h2>
            <div className="border border-foreground/10 rounded-2xl overflow-x-auto bg-card">
              <table className="w-full text-xs min-w-[520px]">
                <thead>
                  <tr className="bg-foreground/5 text-foreground/40 border-b border-foreground/10 uppercase tracking-wider font-mono">
                    <th className="text-left font-semibold p-4">Attribute</th>
                    <th className="text-left font-semibold p-4 text-brand">iCreatePDF</th>
                    <th className="text-left font-semibold p-4">Smallpdf</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {rows.map((r) => (
                    <tr key={r.attribute}>
                      <td className="p-4 font-semibold text-foreground">{r.attribute}</td>
                      <td className="p-4 text-brand font-medium">{r.icreate}</td>
                      <td className="p-4 text-foreground/60">{r.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-foreground/30 text-center max-w-xl mx-auto">
              Figures reflect Smallpdf's publicly stated free-tier terms at time of writing and may change; verify current terms on smallpdf.com. iCreatePDF is not affiliated with or endorsed by Smallpdf.
            </p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-center">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="p-5 rounded-xl bg-card border border-foreground/5">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.q}</h3>
                  <p className="text-xs text-foreground/50 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">Try iCreatePDF Instead</h3>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-md mx-auto">
              46+ free PDF tools, no daily limit, no uploads, no account required.
            </p>
            <div className="pt-2">
              <Link href="/#convert">
                <button className="bg-brand hover:bg-brand/90 text-foreground font-semibold text-xs px-6 py-3 rounded-full transition-all hover:scale-105">
                  Explore Tools Dashboard &rarr;
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <FooterSection />
    </main>
  );
}
