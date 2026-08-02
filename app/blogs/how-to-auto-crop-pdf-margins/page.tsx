import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Auto-Crop Blank PDF Margins | iCreatePDF',
  description: 'Learn how to automatically detect and trim blank margins, scanner borders, and excess whitespace from PDF pages 100% locally.',
  keywords: 'how to auto crop pdf, trim pdf margins automatically, remove scanner borders pdf, optimize pdf for kindle mobile',
  alternates: buildAlternates('/blogs/how-to-auto-crop-pdf-margins'),
};

export default function AutoCropBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Auto-Crop Blank PDF Margins for Kindle & Tablets',
              description: 'Learn how to automatically detect and trim blank margins, scanner borders, and excess whitespace from PDF pages.',
              url: '/blogs/how-to-auto-crop-pdf-margins',
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
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Page &amp; Formatting</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Auto-Crop PDF Margins for Mobile Screens &amp; E-Readers
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Trim wide blank margins and dark scanner shadows automatically to make reading academic papers, scanned books, and reports effortless on Kindle, iPad, and mobile devices.
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
            When reading academic journals or scanned documents on small screens, wide margins waste valuable display real estate, making text tiny and hard to read. Cropping eliminates wasted whitespace.
          </p>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">Steps to Auto-Crop Margins</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open the <Link href="/auto-crop-pdf" className="text-brand hover:underline font-semibold">Smart Auto-Crop PDF Tool</Link>.</li>
            <li>Upload your PDF document.</li>
            <li>Click <strong>Auto-Detect Whitespace</strong> to analyze page pixels and calculate tight content boundaries.</li>
            <li>Fine-tune top, bottom, left, and right margin sliders if desired.</li>
            <li>Click <strong>Apply Crop &amp; Export PDF</strong> to download your optimized document.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Trim PDF margins automatically now</h3>
          <Link href="/auto-crop-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Auto-Crop Tool
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
