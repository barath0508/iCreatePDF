import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Stamp, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Add Custom Watermark and Page Numbers to PDF | iCreatePDF',
  description: 'Learn how to stamp configurable watermarks and sequential page numbers on all pages of your PDF document securely in your browser.',
  keywords: 'add watermark to pdf, stamp watermark online, add page numbers to pdf free, insert pdf page numbers, custom header footer pdf',
  alternates: buildAlternates('/blogs/how-to-add-watermark-and-page-numbers-to-pdf'),
  openGraph: {
    title: 'How to Add Custom Watermark and Page Numbers to PDF',
    description: 'Add confidentiality stamps, logos, or sequential numbering pages locally in the browser sandbox.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function WatermarkPageNumbersPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Add Custom Watermark and Page Numbers to PDF | iCreatePDF',
          description: 'Learn how to stamp configurable watermarks and sequential page numbers on all pages of your PDF document securely in your browser.',
          url: '/blogs/how-to-add-watermark-and-page-numbers-to-pdf',
          datePublished: '2026-05-29T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Add Custom Watermarks and Page Numbers to PDFs
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Labeling files as "Confidential" or inserting header/footer page numbers organizes professional paperwork. Learn how to stamp PDFs locally.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-29">May 29, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When distributing company brochures, presentations, drafts, or thesis documents, you need to stamp page labels (e.g., "Page 1 of 12") or brand background headers with copyright watermarks. Rather than purchasing expensive professional software, you can perform these operations instantly in the browser.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Copyright Protection:</strong> Watermarks protect draft text and copyright ownership before document release.</li>
              <li><strong>Combined Workflow:</strong> Stamping both watermarks and page numbers in one tool saves processing time.</li>
              <li><strong>Local Security:</strong> Keeping documents on your device is essential for confidential drafts.</li>
            </ul>
          </div>
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#how-can-you-add-custom-text-and-image-watermarks-to-a-pdf" className="hover:text-brand transition-colors">
                  How Can You Add Custom Text and Image Watermarks to a PDF?
                </Link>
              </li>
              <li>
                <Link href="#how-do-you-insert-sequential-page-numbers-into-a-pdf" className="hover:text-brand transition-colors">
                  How Do You Insert Sequential Page Numbers into a PDF?
                </Link>
              </li>
            </ul>
          </div>


          <h2 id="how-can-you-add-custom-text-and-image-watermarks-to-a-pdf" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Stamp className="w-5 h-5 text-brand" />
            How Can You Add Custom Text and Image Watermarks to a PDF?
          </h2>
          <p>
            Watermarking superimposes text overlay (e.g. "DRAFT") diagonally across each page with transparent alpha values so it doesn't block read-ability. Here is how:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/watermark-pdf" className="text-brand hover:underline">Watermark PDF</Link> tool page.</li>
            <li>Upload your PDF file.</li>
            <li>Choose Text Watermark: type your phrase (e.g. "CONFIDENTIAL"), configure opacity percentage, font size, and color.</li>
            <li>Click <strong>Add Watermark</strong> and download the output.</li>
          </ol>

          <h2 id="how-do-you-insert-sequential-page-numbers-into-a-pdf" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Hash className="w-5 h-5 text-brand" />
            How Do You Insert Sequential Page Numbers into a PDF?
          </h2>
          <p>
            Stamping page numbers keeps documents organized and legally compliant. To add pagination headers or footers:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/add-page-numbers" className="text-brand hover:underline">Add Page Numbers</Link> page.</li>
            <li>Drag and drop your document file.</li>
            <li>Select your layout parameters:
              <ul className="list-disc list-inside pl-6 pt-1 space-y-1">
                <li><strong>Position:</strong> Top Left, Top Center, Top Right, Bottom Left, Bottom Center, Bottom Right.</li>
                <li><strong>Number Format:</strong> Plain number (e.g. <code>1</code>) or page count pattern (e.g. <code>Page 1 of 5</code>).</li>
                <li><strong>Range:</strong> Choose starting page and exclude covers.</li>
              </ul>
            </li>
            <li>Click <strong>Add Page Numbers</strong> and export.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Stamp className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Watermark PDF</h4>
            <p className="text-xs text-foreground/50">Add copyright or confidentiality stamps across pages.</p>
            <Link href="/tools/watermark-pdf" className="inline-block pt-2">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-4 rounded-full">
                Watermark PDF
              </Button>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Hash className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Page Numbers</h4>
            <p className="text-xs text-foreground/50">Stamp custom header or footer numbers sequentially.</p>
            <Link href="/tools/add-page-numbers" className="inline-block pt-2">
              <Button className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 font-medium text-xs px-4 rounded-full">
                Add Page Numbers
              </Button>
            </Link>
          </div>
        </div>

        <RelatedPosts currentSlug="how-to-add-watermark-and-page-numbers-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
