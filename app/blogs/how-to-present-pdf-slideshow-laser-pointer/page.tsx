import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Present PDFs with Laser Pointer & Ink Tools | iCreatePDF',
  description: 'Guide to presenting PDF slides in browser with glowing digital laser pointer, live pen annotation, yellow highlighter, and fullscreen presenter mode.',
  keywords: 'how to present pdf slides, digital laser pointer pdf, present pdf online fullscreen, live draw on pdf presentation',
  alternates: buildAlternates('/blogs/how-to-present-pdf-slideshow-laser-pointer'),
};

export default function PresentationModeBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Present PDFs with Laser Pointer & Ink Tools',
              description: 'Guide to presenting PDF slides in browser with glowing digital laser pointer, live pen annotation, and highlighter.',
              url: '/blogs/how-to-present-pdf-slideshow-laser-pointer',
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
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Presentation &amp; Utility</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Present PDF Slide Decks with a Digital Laser Pointer
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Deliver impressive webinars and live presentations directly from PDF files with a glowing red laser trail, digital ink pen, yellow highlighter, and live timer.
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
            Converting PDF slides into PowerPoint before every meeting is inefficient. With iCreatePDF's presentation engine, you can present PDFs directly in fullscreen mode with professional interactive markup tools.
          </p>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">How to Launch PDF Presentation Mode</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/pdf-presentation-mode" className="text-brand hover:underline font-semibold">PDF Presentation Mode</Link>.</li>
            <li>Upload your PDF presentation deck.</li>
            <li>Click <strong>Fullscreen</strong> to expand the slide viewport.</li>
            <li>Select <strong>Laser Pointer</strong> to guide audience attention with a glowing red trail.</li>
            <li>Use <strong>Digital Pen</strong> or <strong>Highlighter</strong> to sketch diagrams or highlight key bullet points live.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display font-display">Present your PDF slide deck now</h3>
          <Link href="/pdf-presentation-mode">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Presenter Mode
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
