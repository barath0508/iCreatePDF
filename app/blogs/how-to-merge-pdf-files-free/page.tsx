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
  title: 'How to Merge Multiple PDFs Into One File — Free Guide | iCreatePDF',
  description: 'Combine multiple PDF files into a single document in seconds using your browser. No software installation, no file uploads, completely free.',
  keywords: 'merge pdf files, combine pdf into one, join pdf online free, merge multiple pdf free, how to merge pdf 2026',
  alternates: buildAlternates('/blogs/how-to-merge-pdf-files-free'),
  openGraph: {
    title: 'How to Merge Multiple PDFs Into One File — Free Guide',
    description: 'Combine PDFs in seconds, directly in your browser. No uploads. No software needed.',
    type: 'article',
    publishedTime: '2026-05-22T00:00:00Z',
  },
};

const useCases = [
  { title: 'Combine Bank Statements', desc: 'Merge 12 monthly PDFs into a single annual statement for your accountant or tax filing.' },
  { title: 'Portfolio & Reports', desc: 'Bundle project reports, cover pages, and appendices into one professional submission.' },
  { title: 'Legal Documents', desc: 'Combine contracts, annexures, and signature pages into a single court-ready document.' },
  { title: 'Photo Books & Albums', desc: 'Turn individual scanned pages or photo PDFs into a cohesive digital album.' },
  { title: 'Resume & Cover Letter', desc: 'Merge your CV, cover letter, and portfolio into one file for job applications.' },
  { title: 'Study Notes', desc: 'Combine lecture slides, notes, and reference sheets into one study document.' },
];

export default function MergePdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
          title: 'How to Merge Multiple PDFs Into One File — Free Guide | iCreatePDF',
          description: 'Combine multiple PDF files into a single document in seconds using your browser. No software installation, no file uploads, completely free.',
          url: '/blogs/how-to-merge-pdf-files-free',
          datePublished: '2026-05-22T00:00:00Z'
        }),
            {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many PDFs can I merge at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "iCreatePDF has no arbitrary file count limit. The practical limit depends on your device RAM \u2014 most modern computers handle 20\u201350 PDFs easily."
                }
              },
              {
                "@type": "Question",
                "name": "Will the merged PDF keep all fonts and images?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. PDF merging preserves all embedded fonts, images, vector graphics, and document structure from each source file."
                }
              },
              {
                "@type": "Question",
                "name": "Can I merge password-protected PDFs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You will need to unlock the PDFs first using the Unlock PDF tool on iCreatePDF, then merge them."
                }
              },
              {
                "@type": "Question",
                "name": "Is the page order maintained?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pages are added in the order you arrange the files in the upload area. You can drag and reorder before merging."
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">PDF Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Merge Multiple PDFs Into One File — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Whether you have 2 files or 20, combining PDFs into a single document takes under 30 seconds with the right tool. Here is everything you need to know.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-22">May 22, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Merging PDF files is one of the most common document tasks — yet many people still email themselves files, use clunky desktop apps, or upload sensitive documents to random websites. There is a better way: merge PDFs directly in your browser with zero uploads.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#step-by-step-merge-pdfs-using-icreatepdf" className="hover:text-brand transition-colors">
                  Step-by-Step: Merge PDFs Using iCreatePDF
                </Link>
              </li>
              <li>
                <Link href="#6-real-world-use-cases-for-pdf-merging" className="hover:text-brand transition-colors">
                  6 Real-World Use Cases for PDF Merging
                </Link>
              </li>
              <li>
                <Link href="#merge-vs-combine-what-is-the-difference" className="hover:text-brand transition-colors">
                  Merge vs Combine — What Is the Difference?
                </Link>
              </li>
              <li>
                <Link href="#icreatepdf-vs-other-merge-tools" className="hover:text-brand transition-colors">
                  iCreatePDF vs Other Merge Tools
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions" className="hover:text-brand transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

<h2 id="step-by-step-merge-pdfs-using-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Merge PDFs Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Navigate to <Link href="/tools/merge-pdf" className="text-brand hover:underline">iCreatePDF Merge PDF</Link>.</li>
            <li>Click <strong className="text-foreground">Upload Files</strong> and select all the PDFs you want to combine (hold Ctrl or Cmd to select multiple).</li>
            <li><strong className="text-foreground">Reorder pages</strong> by dragging thumbnails into your desired sequence.</li>
            <li>Click <strong className="text-foreground">Merge PDF</strong> and download your combined file instantly.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Your PDF files are merged entirely within your browser using the PDF-Lib JavaScript library. No file content is ever sent to our servers or any third party.
            </p>
          </div>

          <h2 id="6-real-world-use-cases-for-pdf-merging" className="text-xl font-bold text-foreground pt-4 font-display">6 Real-World Use Cases for PDF Merging</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="merge-vs-combine-what-is-the-difference" className="text-xl font-bold text-foreground pt-4 font-display">Merge vs Combine — What Is the Difference?</h2>
          <p>
            These terms are often used interchangeably, but technically: <strong className="text-foreground">merging</strong> appends all pages of multiple PDF files into a single new file, preserving all existing content. <strong className="text-foreground">Combining</strong> may also refer to creating a PDF portfolio (a ZIP-like container) — a different format. iCreatePDF performs true merging, producing a flat, universally compatible PDF.
          </p>

          <h2 id="icreatepdf-vs-other-merge-tools" className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Merge Tools</h2>
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
                  ['Account required', 'No', 'Often yes'],
                  ['File size limits', 'Browser memory only', '5–25 MB cap (free tier)'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
                  ['Processing speed', 'Instant (local)', 'Depends on server load'],
                  ['Privacy', 'Files never leave device', 'Files stored on servers'],
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
              { q: 'How many PDFs can I merge at once?', a: 'iCreatePDF has no arbitrary file count limit. The practical limit depends on your device RAM — most modern computers handle 20–50 PDFs easily.' },
              { q: 'Will the merged PDF keep all fonts and images?', a: 'Yes. PDF merging preserves all embedded fonts, images, vector graphics, and document structure from each source file.' },
              { q: 'Can I merge password-protected PDFs?', a: 'You will need to unlock the PDFs first using the Unlock PDF tool on iCreatePDF, then merge them.' },
              { q: 'Is the page order maintained?', a: 'Pages are added in the order you arrange the files in the upload area. You can drag and reorder before merging.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Merge your PDFs now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/merge-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Merge PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-merge-pdf-files-free" />
      </article>

      <FooterSection />
    </div>
  );
}
