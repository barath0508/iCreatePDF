import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Compare PDF Revisions with Visual Pixel Diff | i...',
  description: 'Learn how to detect visual layout shifts, graphic changes, and text updates between two PDF document revisions using an interactive curtain slider.',
  keywords: 'how to compare pdf visual diff, compare pdf pixel diff, pdf visual regression tool, compare pdf online free',
  alternates: buildAlternates('/blogs/how-to-compare-pdf-visual-diff'),
};

export default function VisualDiffBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Compare PDF Revisions with Visual Pixel Diff',
              description: 'Learn how to detect visual layout shifts and text updates between two PDF revisions using an interactive curtain slider.',
              url: '/blogs/how-to-compare-pdf-visual-diff',
              datePublished: '2026-08-01T00:00:00Z',
            })
          ),
        }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Comparison &amp; Audit</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Compare PDF Revisions with Visual Pixel &amp; Text Diff
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Spot tiny font adjustments, graphic shifts, and text modifications between document revisions using an automated visual diff curtain slider.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-08-01">August 1, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When reviewing legal contracts, engineering drawings, or marketing collateral, comparing text alone is not enough—layout shifts, missing signatures, or altered image figures require visual pixel-by-pixel inspection.
          </p>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">How to Use the Visual Diff Tool</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open the <Link href="/pdf-visual-diff" className="text-brand hover:underline font-semibold">PDF Visual Pixel &amp; Text Diff Engine</Link>.</li>
            <li>Upload Document A (Original) and Document B (Revision).</li>
            <li>Use the <strong>Curtain Slider</strong> to drag back and forth and see micro-differences overlayed.</li>
            <li>Switch to <strong>Pixel Diff Map</strong> to highlight changed pixels in bright red.</li>
            <li>Check the <strong>Word-Level Changes</strong> panel for extracted text modifications.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display font-display">Compare your PDF revisions visually now</h3>
          <Link href="/pdf-visual-diff">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Visual Diff Engine
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
