import type { Metadata } from 'next';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, ShieldAlert, Zap, Coins, Globe, Heart, Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iCreatePDF vs. Server-Based PDF Editors | iCreatePDF',
  description: 'Understand the security, speed, and capability differences between client-side (local-only) PDF tools and server-based cloud converters.',
  keywords: 'client side pdf converter, secure pdf tools, local pdf editor, free private pdf tools',
  alternates: buildAlternates('/compare'),
  openGraph: {
    title: 'iCreatePDF vs. Server-Based PDF Editors | iCreatePDF',
    description: 'Understand the security, speed, and capability differences between client-side (local-only) PDF tools and server-based cloud converters.',
    type: 'website',
  }
};

const comparisonMatrix = [
  {
    feature: 'Data Privacy & Security',
    icreate: '100% Secure (Files never leave your browser sandbox/device)',
    others: 'Vulnerable (Files uploaded to third-party servers and cloud storage)',
    icon: ShieldCheck,
    highlight: true,
  },
  {
    feature: 'Upload / Download Speeds',
    icreate: 'Instant (No upload latency; limited only by your CPU speed)',
    others: 'Delayed (Upload & download lags based on internet connection)',
    icon: Zap,
    highlight: false,
  },
  {
    feature: 'Usage Caps & Paywalls',
    icreate: 'No limits (100% free, unlimited pages, files, and tasks)',
    others: 'Strict limits (Hourly caps, subscription paywalls, watermarks)',
    icon: Coins,
    highlight: false,
  },
  {
    feature: 'Offline Mode',
    icreate: 'Supported (Once loaded, runs completely without internet connection)',
    others: 'Unsupported (Requires continuous high-speed internet connection)',
    icon: Globe,
    highlight: false,
  },
];

const detailedFeatures = [
  { category: 'Page Management', feature: 'Split PDF (by ranges or pages)', icreate: true, others: true },
  { category: 'Page Management', feature: 'Merge Multiple PDFs', icreate: true, others: true },
  { category: 'Page Management', feature: 'Reorder / Rotate / Delete Pages Visually', icreate: true, others: true },
  { category: 'Formatting', feature: 'Add Page Numbers & Custom Labels', icreate: true, others: true },
  { category: 'Formatting', feature: 'Add Running Headers & Footers', icreate: true, others: true },
  { category: 'Formatting', feature: 'Bates Legal Numbering', icreate: true, others: true },
  { category: 'Security', feature: 'Add Password Protection', icreate: true, others: true },
  { category: 'Security', feature: 'Strip Password Locks', icreate: true, others: true },
  { category: 'Security', feature: 'Burn Permanent Redactions', icreate: true, others: true },
  { category: 'Annotations', feature: 'Overlay Draggable Text Annotations', icreate: true, others: true },
  { category: 'Annotations', feature: 'Freehand Drawing & Signature Stamps', icreate: true, others: true },
  { category: 'Advanced Processing', feature: 'Flatten PDF Fields & Annots', icreate: true, others: true },
  { category: 'Advanced Processing', feature: 'Repair Broken PDF Cross-References', icreate: true, others: true },
  { category: 'Advanced Processing', feature: 'Compress PDF Object Streams', icreate: true, others: true },
  { category: 'Advanced Processing', feature: 'Reflowable Text Editing (Paragraph edit)', icreate: false, others: true },
  { category: 'Advanced Processing', feature: 'OCR (Searchable Scans)', icreate: false, others: true },
];

export default function ComparePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Compare PDFs' },
            ])
          ),
        }}
      />
      <Navigation />
      
      <div className="pt-32 pb-24 flex-1">
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand tracking-wide uppercase font-mono">
              Technology Audit
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-display">
              Client-Side vs. <br className="sm:hidden" /> Cloud-Based PDF tools
            </h1>
            <p className="text-foreground/40 text-sm sm:text-base leading-relaxed">
              Why uploading documents to external servers is a security risk, and how iCreatePDF utilizes modern web APIs to process files 100% locally.
            </p>
          </div>

          {/* Key Differences Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-card/40 border border-brand/10 hover:border-brand/20 transition-colors space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-2xl" />
              <div className="p-3 w-fit rounded-xl bg-brand/10 text-brand border border-brand/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">iCreatePDF (Local Processing)</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Files are loaded directly into browser RAM using Web APIs. All actions (splitting, merging, password locking, signatures) run on your computer's local CPU. No document information ever leaves your device. Perfect for government IDs, contracts, and financial records.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/20 border border-foreground/5 hover:border-foreground/10 transition-colors space-y-4">
              <div className="p-3 w-fit rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">Other Tools (Server Processing)</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Most traditional online PDF converters upload your source files to remote server infrastructure. Processing takes place in cloud virtual machines, and output files remain on cloud storage instances, creating a potential target for interception and leaks.
              </p>
            </div>
          </div>

          {/* Architectural Comparison Matrix */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-center">Architectural Comparison</h2>
            <div className="border border-foreground/10 rounded-2xl overflow-hidden bg-card">
              <div className="grid grid-cols-12 bg-foreground/5 p-4 text-xs font-mono text-foreground/40 border-b border-foreground/10 uppercase tracking-wider">
                <div className="col-span-4 font-semibold">Attribute</div>
                <div className="col-span-4 text-brand font-semibold">iCreatePDF (Client)</div>
                <div className="col-span-4 font-semibold">Cloud Converters (Server)</div>
              </div>
              <div className="divide-y divide-foreground/5">
                {comparisonMatrix.map((item, idx) => (
                  <div key={idx} className={`grid grid-cols-12 p-4 text-xs items-center ${item.highlight ? 'bg-purple-950/10' : ''}`}>
                    <div className="col-span-4 font-semibold text-foreground flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-brand shrink-0" />
                      {item.feature}
                    </div>
                    <div className="col-span-4 text-foreground/80 pr-4">{item.icreate}</div>
                    <div className="col-span-4 text-foreground/40">{item.others}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Availability Grid */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-display">Supported PDF Capabilities</h2>
              <p className="text-xs text-foreground/40">Comparison of standard editing and creation tools</p>
            </div>

            <div className="border border-foreground/10 rounded-2xl overflow-hidden bg-card max-w-3xl mx-auto">
              <div className="grid grid-cols-12 bg-foreground/5 p-4 text-xs font-mono text-foreground/40 border-b border-foreground/10 uppercase tracking-wider">
                <div className="col-span-6 font-semibold">PDF Tool Function</div>
                <div className="col-span-3 text-center text-brand font-semibold">iCreatePDF</div>
                <div className="col-span-3 text-center font-semibold">Server Editors</div>
              </div>
              <div className="divide-y divide-foreground/5">
                {detailedFeatures.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 p-3 text-xs items-center hover:bg-foreground/5 transition-colors">
                    <div className="col-span-6 text-foreground flex flex-col">
                      <span className="font-medium">{item.feature}</span>
                      <span className="text-[9px] text-foreground/30 font-mono">{item.category}</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.icreate ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-500/50" />
                      )}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.others ? (
                        <Check className="w-4 h-4 text-foreground/60" />
                      ) : (
                        <X className="w-4 h-4 text-foreground/20" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note on Limitations */}
            <div className="p-6 rounded-xl bg-card border border-foreground/10 max-w-3xl mx-auto text-xs text-foreground/50 leading-relaxed space-y-2">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand" />
                Note on Text Reflowing &amp; OCR Limitations
              </p>
              <p>
                To maintain a completely private local environment, iCreatePDF intentionally excludes complex server-side reflow engines and heavy OCR operations. This means that while you can easily split pages, merge files, draw signatures, compress documents, and stamp page numbers privately, reflowing paragraph text embedded inside existing PDF bodies is not supported. For advanced document editing of non-sensitive files, standard cloud platforms can be used.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">Experience Private Client-Side Tools</h3>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-md mx-auto">
              Ready to work with your documents securely? Access all 32+ of our in-browser PDF utilities instantly.
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
