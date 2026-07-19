import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Columns, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Split and Delete PDF Pages Free | iCreatePDF',
  description: 'Learn how to extract pages, split files, or delete specific pages visually with previews. Done entirely in the browser with no server uploads.',
  keywords: 'split pdf pages free, extract pdf pages, delete pages from pdf, cut pdf pages online, separate pdf pages',
  alternates: buildAlternates('/blogs/how-to-split-pdf-pages-free'),
  openGraph: {
    title: 'How to Split and Delete PDF Pages Free',
    description: 'Learn how to split large documents or delete blank pages visually 100% locally in your browser sandbox.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function SplitPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Split and Delete PDF Pages Free | iCreatePDF',
          description: 'Learn how to extract pages, split files, or delete specific pages visually with previews. Done entirely in the browser with no server uploads.',
          url: '/blogs/how-to-split-pdf-pages-free',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Editing</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Split, Delete, and Separate PDF Pages Visually
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Managing huge PDFs can be challenging. Learn how to crop out pages, delete blank sheets, or split a large scanned document into separate single-page files.
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
            Many digital packages are delivered as massive single files containing reports, receipts, and invoices combined. To archive them cleanly, you often need to separate pages into individual documents or delete junk filler pages.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#visual-splitting-vs-batch-splitting" className="hover:text-brand transition-colors">
                  Visual Splitting vs. Batch Splitting
                </Link>
              </li>
              <li>
                <Link href="#how-to-split-a-pdf" className="hover:text-brand transition-colors">
                  How to Split a PDF
                </Link>
              </li>
              <li>
                <Link href="#how-to-delete-specific-pages" className="hover:text-brand transition-colors">
                  How to Delete Specific Pages
                </Link>
              </li>
            </ul>
          </div>

<h2 id="visual-splitting-vs-batch-splitting" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Columns className="w-5 h-5 text-brand" />
            Visual Splitting vs. Batch Splitting
          </h2>
          <p>
            Standard cut utilities require you to type page ranges like "1-3, 5-7" blindly. Visual interfaces let you see preview thumbnails of every page. You can click on exactly the pages you want to split or delete, eliminating the risk of cutting the wrong page.
          </p>

          <h2 id="how-to-split-a-pdf" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Columns className="w-5 h-5 text-brand" />
            How to Split a PDF
          </h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/split-pdf" className="text-brand hover:underline">Split PDF</Link> tool page.</li>
            <li>Drag and drop your multi-page document.</li>
            <li>Use the split configurations:
              <ul className="list-disc list-inside pl-6 pt-1 space-y-1">
                <li><strong>Split by Range:</strong> Enter numeric ranges (e.g. 1-5, 6-10) to slice the document.</li>
                <li><strong>Extract All Pages:</strong> Saves every page as a separate PDF file bundled in a single ZIP folder.</li>
              </ul>
            </li>
            <li>Click <strong>Split PDF</strong>.</li>
          </ol>

          <h2 id="how-to-delete-specific-pages" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-brand" />
            How to Delete Specific Pages
          </h2>
          <p>
            If you simply want to strip blank sheets, disclaimer pages, or cover pages:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/delete-pdf-pages" className="text-brand hover:underline">Delete PDF Pages</Link> tool.</li>
            <li>Upload your file. Previews of all pages will populate.</li>
            <li>Hover over any page thumbnail and click the Trash icon to queue it for deletion.</li>
            <li>Click <strong>Remove Pages</strong>.</li>
            <li>Download the trimmed PDF document.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Columns className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Split Large PDFs</h4>
            <p className="text-xs text-foreground/50">Slice files by ranges or extract individual pages.</p>
            <Link href="/tools/split-pdf" className="inline-block pt-2">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-4 rounded-full">
                Split PDF
              </Button>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Trash2 className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Delete Junk Pages</h4>
            <p className="text-xs text-foreground/50">Visually prune pages with live previews.</p>
            <Link href="/tools/delete-pdf-pages" className="inline-block pt-2">
              <Button className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 font-medium text-xs px-4 rounded-full">
                Delete Pages
              </Button>
            </Link>
          </div>
        </div>

        <RelatedPosts currentSlug="how-to-split-pdf-pages-free" />
      </article>

      <FooterSection />
    </div>
  );
}
