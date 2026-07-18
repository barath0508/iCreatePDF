import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Lock, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PDF24 Alternative: No Install, Browser-Based Privacy | iCreatePDF',
  description: 'Looking for a PDF24 alternative? iCreatePDF is free, requires no desktop install, and processes files entirely in your browser tab — every tool, not just some.',
  keywords: 'pdf24 alternative, pdf24 vs icreatepdf, pdf24 tools alternative, browser-based pdf tool no install',
  alternates: buildAlternates('/pdf24-alternative'),
  openGraph: {
    title: 'PDF24 Alternative: No Install, Browser-Based Privacy | iCreatePDF',
    description: 'iCreatePDF is a free PDF24 alternative that never requires a desktop install and never uploads your files.',
    type: 'website',
  },
};

const rows = [
  { attribute: 'Price', icreate: 'Free, unlimited', them: 'Free, ad-supported' },
  { attribute: 'Where web tools process files', icreate: 'Your browser — never uploaded', them: "PDF24's servers (web tools)" },
  { attribute: 'Offline private processing', icreate: 'Yes — in any browser, no install', them: 'Only via separate Windows desktop app' },
  { attribute: 'Works on Mac / Linux / mobile', icreate: 'Yes — same browser experience everywhere', them: 'Desktop app is Windows-only' },
  { attribute: 'Account required', icreate: 'No', them: 'No' },
  { attribute: 'Task or file-size limits', icreate: 'None', them: 'None' },
];

const faqs = [
  {
    q: "Isn't PDF24 already free and unlimited like iCreatePDF?",
    a: "Yes — PDF24's pricing and limits are close to iCreatePDF's. The real difference is architecture: PDF24's web tools still upload your file to their servers to process it, and true local processing only exists in their separate Windows desktop app. iCreatePDF processes every tool locally in your browser, on any operating system, with nothing to install.",
  },
  {
    q: 'Do I need to install anything to use iCreatePDF privately?',
    a: 'No. Every tool runs in your browser tab using JavaScript and WebAssembly — there is no separate desktop app, and no download required to get the privacy benefit that PDF24 reserves for its Windows-only installer.',
  },
  {
    q: 'Can I use iCreatePDF on a Mac, Linux machine, Chromebook, or phone?',
    a: "Yes — since processing happens in your browser rather than a native app, iCreatePDF works identically across operating systems and devices, unlike PDF24's desktop app which is Windows-only.",
  },
  {
    q: 'Which tool has more features?',
    a: "PDF24 has a broad catalog built over many years. iCreatePDF currently covers 46+ tools across conversion, editing, security, and document management — check the specific tool you need on either site if you're comparing feature-for-feature.",
  },
];

export default function Pdf24AlternativePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'PDF24 Alternative' },
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
              PDF24 Alternative
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              A PDF24 Alternative <br className="sm:hidden" /> With Nothing to Install
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              PDF24's web tools still upload your file to their servers — true local processing requires installing their separate Windows desktop app. iCreatePDF processes every tool locally, in any browser, with no install at all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Private by default', body: 'Every tool — not just a desktop app — processes files locally in your browser tab.' },
              { icon: Globe, title: 'No install, any OS', body: 'Works the same on Windows, Mac, Linux, Chromebook, or mobile — nothing to download.' },
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
            <h2 className="text-2xl font-bold font-display text-center">iCreatePDF vs. PDF24</h2>
            <div className="border border-foreground/10 rounded-2xl overflow-x-auto bg-card">
              <table className="w-full text-xs min-w-[520px]">
                <thead>
                  <tr className="bg-foreground/5 text-foreground/40 border-b border-foreground/10 uppercase tracking-wider font-mono">
                    <th className="text-left font-semibold p-4">Attribute</th>
                    <th className="text-left font-semibold p-4 text-brand">iCreatePDF</th>
                    <th className="text-left font-semibold p-4">PDF24</th>
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
              Figures reflect PDF24's publicly stated terms at time of writing and may change; verify current terms on pdf24.org. iCreatePDF is not affiliated with or endorsed by PDF24.
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
              46+ free PDF tools, nothing to install, no uploads, no account required.
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
