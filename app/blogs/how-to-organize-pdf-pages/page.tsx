import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Organize PDF Pages Online — Free Guide | iCreatePDF',
  description: 'Rearrange, rotate, or delete specific pages in a PDF using visual thumbnails. 100% browser-based, no uploads, all in one pass.',
  keywords: 'organize pdf, reorder pdf pages, rearrange pdf pages online, pdf page organizer, organize pdf free 2026',
  alternates: buildAlternates('/blogs/how-to-organize-pdf-pages'),
  openGraph: {
    title: 'How to Organize PDF Pages Online — Free Guide',
    description: 'Rearrange, rotate, or delete specific pages in a PDF using visual thumbnails.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Reordering Report Sections', desc: 'Move an appendix to the end or bring a summary page to the front without re-exporting the source file.' },
  { title: 'Combining Scan Batches', desc: 'Fix page order after scanning a document out of sequence.' },
  { title: 'Building Custom Packets', desc: 'Reorder pages pulled from different sources into one logically ordered handout.' },
  { title: 'Cleaning Up Before Sharing', desc: 'Rotate misaligned pages and delete blanks in a single pass before sending a document out.' },
  { title: 'Presentation Prep', desc: 'Rearrange exported slide pages into the correct presentation order.' },
  { title: 'Legal Document Assembly', desc: 'Order exhibits, annexures, and signature pages correctly for a court-ready filing.' },
];

export default function OrganizePdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Organize PDF Pages Online — Free Guide | iCreatePDF',
          description: 'Rearrange, rotate, or delete specific pages in a PDF using visual thumbnails. 100% browser-based, no uploads, all in one pass.',
          url: '/blogs/how-to-organize-pdf-pages',
          datePublished: '2026-07-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Organize PDF Pages Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Reorder, rotate, and delete pages in a single visual pass, without juggling three separate tools — done entirely in your browser.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-07-18">July 18, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            A document assembled from multiple scans or sources rarely comes out in the right order the first time. Rather than switching between a separate reorder tool, a rotate tool, and a delete tool, iCreatePDF's Organize PDF lets you fix all three in one visual pass over a thumbnail grid of your document.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#step-by-step-organize-a-pdf-using-icreatepdf" className="hover:text-brand transition-colors">
                  Step-by-Step: Organize a PDF Using iCreatePDF
                </Link>
              </li>
              <li>
                <Link href="#6-reasons-to-organize-a-pdf" className="hover:text-brand transition-colors">
                  6 Reasons to Organize a PDF
                </Link>
              </li>
              <li>
                <Link href="#organize-vs-single-purpose-tools" className="hover:text-brand transition-colors">
                  Organize vs. Single-Purpose Tools
                </Link>
              </li>
              <li>
                <Link href="#icreatepdf-vs-other-page-organizers" className="hover:text-brand transition-colors">
                  iCreatePDF vs Other Page Organizers
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions" className="hover:text-brand transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

<h2 id="step-by-step-organize-a-pdf-using-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Organize a PDF Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/organize-pdf" className="text-brand hover:underline">iCreatePDF Organize PDF</Link>.</li>
            <li>Upload your PDF — every page appears as a draggable thumbnail.</li>
            <li>Drag pages into the correct order, rotate any sideways pages, and delete ones you don't need.</li>
            <li>Save and download the reorganized PDF.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Reordering, rotation, and deletion are all applied locally in your browser using a JavaScript PDF library. Your document is never uploaded anywhere.
            </p>
          </div>

          <h2 id="6-reasons-to-organize-a-pdf" className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Organize a PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="organize-vs-single-purpose-tools" className="text-xl font-bold text-foreground pt-4 font-display">Organize vs. Single-Purpose Tools</h2>
          <p>
            If you only need one type of change, iCreatePDF's dedicated tools work fine on their own: <Link href="/tools/rotate-pdf" className="text-brand hover:underline">Rotate PDF</Link> for orientation fixes, <Link href="/tools/delete-pdf-pages" className="text-brand hover:underline">Delete PDF Pages</Link> for removals, or <Link href="/tools/merge-pdf" className="text-brand hover:underline">Merge PDF</Link> to combine multiple files first. Organize PDF is for when you need several of these changes at once and want to review the whole document visually before saving.
          </p>

          <h2 id="icreatepdf-vs-other-page-organizers" className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Page Organizers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">iCreatePDF</th>
                  <th className="text-left px-4 py-3">Typical Online Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['File uploads to server', 'Never', 'Always'],
                  ['Reorder, rotate & delete in one pass', 'Yes', 'Often separate tools'],
                  ['Account required', 'No', 'Often yes'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
                ].map(([feature, ours, theirs]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 font-medium text-foreground/80">{feature}</td>
                    <td className="px-4 py-3 text-emerald-400">{ours}</td>
                    <td className="px-4 py-3 text-red-400/80">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I undo a page reorder before saving?', a: 'Yes — drag pages again to fix the order any time before you click Save; nothing is finalized until you download the result.' },
              { q: 'Does organizing affect page content quality?', a: 'No. Reordering, rotating, and deleting only change page position and orientation metadata — the underlying content is untouched.' },
              { q: 'Can I merge two files and then organize them together?', a: 'Yes — merge your files first with Merge PDF, then open the combined file in Organize PDF to fine-tune the order.' },
              { q: 'Is there a page count limit?', a: "No arbitrary limit. Very large documents (hundreds of pages) depend on your device's available memory to load smoothly." },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Organize your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/organize-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Organize PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-organize-pdf-pages" />
      </article>

      <FooterSection />
    </div>
  );
}
