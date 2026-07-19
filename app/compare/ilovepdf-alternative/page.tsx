import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Lock, Zap, Coins, Check, X } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iLovePDF Alternative: Free, No Upload Limit, No File Cap | iCreatePDF',
  description: 'Looking for an iLovePDF alternative? iCreatePDF is free, has no 25MB file cap, and never uploads your files — everything runs locally in your browser.',
  keywords: 'ilovepdf alternative, ilovepdf vs icreatepdf, free pdf tool no file limit, ilovepdf free alternative',
  alternates: buildAlternates('/compare/ilovepdf-alternative'),
  openGraph: {
    title: 'iLovePDF Alternative: Free, No Upload Limit, No File Cap | iCreatePDF',
    description: 'iCreatePDF is a free iLovePDF alternative with no file size cap and 100% local, in-browser processing.',
    type: 'website',
  },
};

const rows = [
  { attribute: 'Price', icreate: 'Free, unlimited', them: 'Free tier, then $6.61/mo Pro' },
  { attribute: 'Free-tier file size limit', icreate: 'No limit', them: '~25 MB per file' },
  { attribute: 'Where files are processed', icreate: 'Your browser — never uploaded', them: "iLovePDF's servers" },
  { attribute: 'Account required for full use', icreate: 'No', them: 'Often required for larger files/batches' },
  { attribute: 'Works offline once loaded', icreate: 'Yes', them: 'No' },
  { attribute: 'Watermarks on free output', icreate: 'None', them: 'None' },
];

const faqs = [
  {
    q: 'Is iCreatePDF really free, unlike iLovePDF Pro?',
    a: 'Yes. Every tool on iCreatePDF is free with no file-size cap, no daily task limit, and no account requirement, because processing runs on your device instead of on our servers — there\'s no server cost per file that would require a paywall.',
  },
  {
    q: 'Does iCreatePDF have the same file-size limit as iLovePDF\'s free tier?',
    a: "No. iLovePDF's free tier caps files at roughly 25 MB. iCreatePDF has no fixed cap — the practical limit is your device's own memory, since files are processed in your browser rather than uploaded.",
  },
  {
    q: 'Can I use iCreatePDF instead of iLovePDF for sensitive documents?',
    a: 'Yes. Because files are never uploaded to a server, iCreatePDF avoids the privacy exposure that comes with sending contracts, IDs, or financial documents to third-party cloud infrastructure.',
  },
  {
    q: 'What can iLovePDF do that iCreatePDF cannot?',
    a: 'iLovePDF supports some server-side operations like reflowable paragraph text editing that require heavier processing than a browser can efficiently handle. For page-level editing, merging, splitting, converting, protecting, and signing, iCreatePDF covers the same core workflows.',
  },
];

export default function IlovepdfAlternativePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'iLovePDF Alternative' },
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
              iLovePDF Alternative
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              A Free iLovePDF Alternative <br className="sm:hidden" /> With No File Cap
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              iLovePDF's free tier caps files around 25MB and pushes larger files behind Pro. iCreatePDF has no file-size cap, because your files never leave your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Coins, title: 'No file-size cap', body: 'Process files of any size — your device handles it, not a rate-limited server.' },
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
            <h2 className="text-2xl font-bold font-display text-center">iCreatePDF vs. iLovePDF</h2>
            <div className="border border-foreground/10 rounded-2xl overflow-x-auto bg-card">
              <table className="w-full text-xs min-w-[520px]">
                <thead>
                  <tr className="bg-foreground/5 text-foreground/40 border-b border-foreground/10 uppercase tracking-wider font-mono">
                    <th className="text-left font-semibold p-4">Attribute</th>
                    <th className="text-left font-semibold p-4 text-brand">iCreatePDF</th>
                    <th className="text-left font-semibold p-4">iLovePDF</th>
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
              Figures reflect iLovePDF's publicly stated free-tier terms at time of writing and may change; verify current terms on ilovepdf.com. iCreatePDF is not affiliated with or endorsed by iLovePDF.
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
              46+ free PDF tools, no file cap, no uploads, no account required.
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
