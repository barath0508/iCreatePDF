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
  title: 'How to Delete Pages from a PDF Online — Free Guide | iCreatePDF',
  description: 'Cut, delete, or remove unwanted pages from a PDF document. 100% browser-based, no uploads, remove one page or several at once.',
  keywords: 'delete pdf pages, cut page from pdf, remove pages from pdf, delete pdf page online free, cut pdf pages 2026',
  alternates: buildAlternates('/blogs/how-to-delete-pages-from-pdf'),
  openGraph: {
    title: 'How to Delete Pages from a PDF Online — Free Guide',
    description: 'Cut, delete, or remove unwanted pages from a PDF document, entirely in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Remove Blank Scanner Pages', desc: 'Delete accidental blank pages a scanner or copier adds between sections.' },
  { title: 'Trim Cover Pages', desc: 'Remove a title page or cover sheet before combining a document into a larger file.' },
  { title: 'Cut Confidential Sections', desc: 'Remove an internal-only page before sharing a document externally.' },
  { title: 'Shorten Long Reports', desc: 'Cut an appendix or reference section you don\'t need to distribute to every recipient.' },
  { title: 'Fix Duplicate Scans', desc: 'Remove a page that got scanned twice by mistake.' },
  { title: 'Prepare for Print', desc: 'Cut pages that shouldn\'t be included in a specific print run, like draft watermark pages.' },
];

export default function DeletePagesBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
          title: 'How to Delete Pages from a PDF Online — Free Guide | iCreatePDF',
          description: 'Cut, delete, or remove unwanted pages from a PDF document. 100% browser-based, no uploads, remove one page or several at once.',
          url: '/blogs/how-to-delete-pages-from-pdf',
          datePublished: '2026-07-18T00:00:00Z'
        }),
            {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can I delete multiple pages at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes \u2014 select as many pages as you need from the thumbnail grid before saving; they are all removed in a single operation."
                }
              },
              {
                "@type": "Question",
                "name": "Will deleting pages affect the ones that remain?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Remaining pages keep their original content and quality; only their page numbers shift to fill the gap."
                }
              },
              {
                "@type": "Question",
                "name": "Can I undo a deletion after saving?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Once downloaded, re-upload your original file if you kept a copy \u2014 the deletion itself cannot be undone within the tool after saving."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a limit to how many pages I can delete?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No arbitrary limit \u2014 you can delete any number of pages, including down to a single remaining page."
                }
              }
            ]
          }
          ]),
        }}
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
            How to Delete Pages from a PDF Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Cut a blank page, a duplicate scan, or an entire section out of a PDF in seconds, directly in your browser.
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
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Blank scanner pages, duplicate scans, and outdated cover sheets are some of the most common reasons a PDF needs a quick page removal before it's ready to send. iCreatePDF lets you pick exactly which pages to cut from a visual thumbnail grid, without touching the rest of the document.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Quick Pruning:</strong> Remove blank pages, appendices, or unwanted drafts from PDF sets.</li>
              <li><strong>Interactive Previews:</strong> View page thumbnails to select and delete pages accurately.</li>
              <li><strong>Privacy Protection:</strong> Delete sensitive pages from files locally before sharing.</li>
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
                <Link href="#step-by-step-how-do-you-delete-pages-from-a-pdf-offline" className="hover:text-brand transition-colors">
                  Step-by-Step: How Do You Delete Pages from a PDF Offline?
                </Link>
              </li>
              <li>
                <Link href="#why-delete-specific-pages-from-your-pdf-file" className="hover:text-brand transition-colors">
                  Why Delete Specific Pages from Your PDF File?
                </Link>
              </li>
              <li>
                <Link href="#what-is-the-difference-between-deleting-and-extracting-pdf-pages" className="hover:text-brand transition-colors">
                  What is the Difference Between Deleting and Extracting PDF Pages?
                </Link>
              </li>
              <li>
                <Link href="#how-does-icreatepdf-compare-to-other-pdf-page-removal-tools" className="hover:text-brand transition-colors">
                  How Does iCreatePDF Compare to Other PDF Page Removal Tools?
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions-about-this-tool" className="hover:text-brand transition-colors">
                  Frequently Asked Questions About This Tool
                </Link>
              </li>
            </ul>
          </div>


          <h2 id="step-by-step-how-do-you-delete-pages-from-a-pdf-offline" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: How Do You Delete Pages from a PDF Offline?</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/delete-pdf-pages" className="text-brand hover:underline">iCreatePDF Delete PDF Pages</Link>.</li>
            <li>Upload your PDF — every page appears as a thumbnail.</li>
            <li>Click each page you want to remove; they're marked for deletion.</li>
            <li>Click <strong className="text-foreground">Save</strong> and download the trimmed PDF.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Page removal happens locally by rebuilding the PDF in your browser using a JavaScript library. Nothing is uploaded to any server.
            </p>
          </div>

          <h2 id="why-delete-specific-pages-from-your-pdf-file" className="text-xl font-bold text-foreground pt-4 font-display">Why Delete Specific Pages from Your PDF File?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="what-is-the-difference-between-deleting-and-extracting-pdf-pages" className="text-xl font-bold text-foreground pt-4 font-display">What is the Difference Between Deleting and Extracting PDF Pages?</h2>
          <p>
            Deleting removes selected pages and keeps everything else — useful when most of the document is correct and only a few pages need to go. If you want the opposite — pulling out just a handful of pages into a new, smaller PDF — use <Link href="/tools/extract-pages" className="text-brand hover:underline">Extract Pages</Link> instead. For more advanced reordering alongside deletion, see <Link href="/tools/organize-pdf" className="text-brand hover:underline">Organize PDF</Link>.
          </p>

          <h2 id="how-does-icreatepdf-compare-to-other-pdf-page-removal-tools" className="text-xl font-bold text-foreground pt-4 font-display">How Does iCreatePDF Compare to Other PDF Page Removal Tools?</h2>
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
                  ['Visual page selection', 'Yes', 'Varies'],
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

          <h2 id="frequently-asked-questions-about-this-tool" className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions About This Tool</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I delete multiple pages at once?', a: 'Yes — select as many pages as you need from the thumbnail grid before saving; they are all removed in a single operation.' },
              { q: 'Will deleting pages affect the ones that remain?', a: 'No. Remaining pages keep their original content and quality; only their page numbers shift to fill the gap.' },
              { q: 'Can I undo a deletion after saving?', a: 'Once downloaded, re-upload your original file if you kept a copy — the deletion itself cannot be undone within the tool after saving.' },
              { q: 'Is there a limit to how many pages I can delete?', a: 'No arbitrary limit — you can delete any number of pages, including down to a single remaining page.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Delete PDF pages now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/delete-pdf-pages">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Delete PDF Pages Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-delete-pages-from-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
