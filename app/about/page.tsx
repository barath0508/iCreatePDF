import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Code2, Users, Mail } from 'lucide-react';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About iCreatePDF — Free, Private, Browser-Based PDF Tools',
  description: 'iCreatePDF is a free suite of 46+ PDF tools that run entirely in your browser. Learn why we built it, how the technology works, and how we stay free.',
  alternates: buildAlternates('/about'),
  openGraph: {
    title: 'About iCreatePDF — Free, Private, Browser-Based PDF Tools',
    description: 'Why we built iCreatePDF and how our client-side, no-upload PDF tools work.',
    type: 'website',
  },
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
      <Navigation />

      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6 space-y-16">

        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand uppercase font-mono">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            PDF tools that never see your files
          </h1>
          <p className="text-foreground/50 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            iCreatePDF is a free suite of 46+ PDF tools — merge, split, compress, convert, sign, redact, OCR, and more — built to run entirely inside your web browser.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand" /> Why we built it this way
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Most free PDF tools work by uploading your file to a server, processing it there, and sending back a result. That means every document you touch — contracts, IDs, medical records, financial statements — passes through infrastructure you don't control, even briefly.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed">
            We built iCreatePDF around a different architecture: every tool runs using JavaScript and WebAssembly directly in your browser tab. Your file is loaded into local memory, processed on your device's own CPU, and never transmitted anywhere. When you close the tab, nothing of your document remains — because nothing ever left it in the first place. See exactly what this means on our <Link href="/compare" className="text-brand hover:underline underline-offset-2">technology comparison page</Link>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand" /> How we stay free
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Because processing happens on your device instead of ours, we don't carry the server and storage costs that force most competitors to cap free-tier file sizes or daily task counts. iCreatePDF is supported by non-intrusive advertising rather than subscriptions, so every tool stays free and unlimited — see our <Link href="/privacy" className="text-brand hover:underline underline-offset-2">Privacy Policy</Link> for exactly what data we do and don't collect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Users className="w-5 h-5 text-brand" /> Who this is for
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Students, freelancers, small businesses, and anyone who needs to quickly merge a set of scans, compress a file for email, sign a form, or convert a document — without creating an account, hitting a paywall, or wondering where their file went. We currently offer 46+ tools in English, with Spanish, Hindi, and Tamil support in progress.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3">
          <h2 className="text-base font-bold font-display flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand" /> Get in touch
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Questions, feedback, or a tool you'd like to see? Reach us via our <Link href="/contact" className="text-brand hover:underline underline-offset-2">contact page</Link> or email <a href="mailto:crop0339@gmail.com" className="text-brand hover:underline underline-offset-2">crop0339@gmail.com</a>.
          </p>
        </section>

      </div>

      <FooterSection />
    </main>
  );
}
