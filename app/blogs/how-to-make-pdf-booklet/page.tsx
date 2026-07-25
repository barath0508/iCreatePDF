import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Make a PDF Booklet � Free Saddle-Stitch Printing Guide | iCreatePDF',
  description: 'Reorder PDF pages into 2-page landscape booklet spreads ready for double-sided duplex printing and folding.',
  alternates: buildAlternates('/blogs/how-to-make-pdf-booklet'),
  openGraph: {
    title: 'How to Make a PDF Booklet � Free Saddle-Stitch Printing Guide | iCreatePDF',
    description: 'Reorder PDF pages into 2-page landscape booklet spreads ready for double-sided duplex printing and folding.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
  },
};

export default function HowTo_make_pdf_bookletPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Make a PDF Booklet � Free Saddle-Stitch Printing Guide',
              description: 'Reorder PDF pages into 2-page landscape booklet spreads ready for double-sided duplex printing and folding.',
              url: '/blogs/how-to-make-pdf-booklet',
              datePublished: '2026-07-25T00:00:00Z',
            }),
          ]),
        }}
      />
      <Navigation />

      <main className="pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Guides & Articles
          </Link>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 font-bold">
                Printing & Layout
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" /> July 25, 2026
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> 4 min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display text-foreground leading-tight">
              How to Make a PDF Booklet � Free Saddle-Stitch Printing Guide
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl font-sans">
              Reorder PDF pages into 2-page landscape booklet spreads ready for double-sided duplex printing and folding.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground font-display">100% Local & Private Processing</h4>
                <p className="text-xs text-muted-foreground">Your files are processed directly inside your browser memory.</p>
              </div>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs shrink-0">
              <Link href="/tools/booklet-pdf">
                Launch Studio Tool <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-xl font-bold text-foreground font-display">Overview & Key Features</h2>
            <p>Reorder PDF pages into 2-page landscape booklet spreads ready for double-sided duplex printing and folding.</p>

            <h3 className="text-lg font-bold text-foreground font-display">Step-by-Step Instructions</h3>
            <ol className="space-y-2 list-decimal list-inside font-sans text-muted-foreground">
              <li>Open the <Link href="/tools/booklet-pdf" className="text-brand underline font-semibold">Dedicated Tool Workspace</Link> in your web browser.</li>
              <li>Drag and drop your target file into the secure dropzone.</li>
              <li>Adjust your preferred output configuration settings.</li>
              <li>Click process and download your instant file result without server delays.</li>
            </ol>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
