import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Turn PDFs into Interactive 3D Flipbooks Free | iCreatePDF',
  description: 'Guide to creating interactive 3D double-page flipbooks from PDF e-books, brochures, and catalogs 100% in your browser.',
  keywords: 'how to create 3d pdf flipbook, convert pdf to flipbook free, online 3d ebook page flipper, double page spread pdf flipbook',
  alternates: buildAlternates('/blogs/how-to-create-interactive-3d-pdf-flipbook'),
};

export default function FlipbookBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Turn PDFs into Interactive 3D Flipbooks Free',
              description: 'Guide to creating interactive 3D double-page flipbooks from PDF e-books, brochures, and catalogs.',
              url: '/blogs/how-to-create-interactive-3d-pdf-flipbook',
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
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Interactive Reader</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Turn PDF Documents into Interactive 3D Flipbooks
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Convert standard PDF files into realistic double-page 3D page-flipping digital books for e-learning, magazine publishing, and catalog presentation.
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
            Traditional PDF viewers scroll vertically down single pages, which can feel unengaging for catalogs, menus, and e-books. A 3D flipbook replicates the authentic experience of reading a physical book with double-page spreads.
          </p>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">How to View Your PDF as a 3D Flipbook</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open the <Link href="/pdf-3d-flipbook" className="text-brand hover:underline font-semibold">Interactive 3D PDF Flipbook Reader</Link>.</li>
            <li>Upload your PDF e-book, catalog, or presentation.</li>
            <li>Use the page navigation buttons or swipe gestures to turn pages in 3D.</li>
            <li>Click <strong>Auto Flip</strong> for hands-free animated presentation.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Experience your PDF as a 3D flipbook</h3>
          <Link href="/pdf-3d-flipbook">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch 3D Flipbook Reader
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
