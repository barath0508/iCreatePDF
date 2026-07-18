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
  title: 'How to Resize PDF Pages to A4, Letter or Custom Size — Free Guide | iCreatePDF',
  description: 'Normalize every page of a PDF to A4, Letter, A3, Legal, or a custom size without losing content quality. 100% browser-based, no uploads.',
  keywords: 'resize pdf, resize pdf to a4, resize pdf pages, change pdf page size, resize pdf free 2026',
  alternates: buildAlternates('/blog/how-to-resize-pdf-pages'),
  openGraph: {
    title: 'How to Resize PDF Pages to A4, Letter or Custom Size — Free Guide',
    description: 'Normalize every page of a PDF to a consistent size without losing content quality.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Mixed-Source Merges', desc: 'Standardize page sizes before merging PDFs that were created with different page dimensions.' },
  { title: 'International Printing', desc: 'Convert a US Letter document to A4 (or vice versa) before printing in a different region.' },
  { title: 'Binder-Ready Documents', desc: 'Resize pages to fit a specific binder or folder format for physical filing.' },
  { title: 'Legal Filings', desc: 'Match court-required page sizes (often Legal or A4) before submitting a document.' },
  { title: 'Scanned Document Cleanup', desc: 'Normalize inconsistent page sizes from a multi-session scanning batch.' },
  { title: 'Custom Formats', desc: 'Set an exact custom width and height for specialized printing or design needs.' },
];

export default function ResizePdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Resize PDF Pages to A4, Letter or Custom Size — Free Guide | iCreatePDF',
          description: 'Normalize every page of a PDF to A4, Letter, A3, Legal, or a custom size without losing content quality. 100% browser-based, no uploads.',
          url: '/blog/how-to-resize-pdf-pages',
          datePublished: '2026-07-18T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Resize PDF Pages to A4, Letter, or a Custom Size — Free Guide
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Normalize inconsistent page sizes into a single standard format, entirely in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Documents pulled from different sources — scans, exports, and downloads — often end up with inconsistent page dimensions. Resizing every page to a single standard (A4, Letter, A3, Legal, or a custom size) keeps the document consistent for printing, filing, or merging, without needing to open a design tool.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Resize a PDF Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/resize-pdf" className="text-brand hover:underline">iCreatePDF Resize PDF</Link>.</li>
            <li>Upload the PDF you want to standardize.</li>
            <li>Choose a target size — A4, Letter, A3, Legal, or enter a custom width and height.</li>
            <li>Download the resized PDF with every page at the same dimensions.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Page resizing is calculated and applied locally in your browser. Your document is never uploaded to any server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Resize PDF Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Will Resizing Distort My Content?</h2>
          <p>
            iCreatePDF scales content proportionally to fit the new page size, preserving aspect ratio so text and images don't stretch or squash. If the new page has a different aspect ratio than the original (for example, going from Letter to A4), some white space margin adjustment is normal and expected — the alternative would be distorting your content, which iCreatePDF avoids.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Resize Tools</h2>
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
                  ['Custom size support', 'Yes', 'Sometimes presets only'],
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

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the difference between resizing and cropping?', a: 'Resizing changes the overall page dimensions and scales content to fit; cropping trims the visible margin without rescaling the remaining content. Use Crop PDF if you just need to remove borders.' },
              { q: 'Can I resize only some pages, not the whole document?', a: 'Yes — select the specific pages you want to standardize, or apply the same target size across the entire document.' },
              { q: 'Does resizing reduce text or image quality?', a: 'No. Content is scaled proportionally without re-compression, so vector text and embedded images retain their original quality.' },
              { q: 'Can I enter exact custom dimensions?', a: 'Yes, enter a specific width and height for non-standard formats beyond the built-in A4/Letter/A3/Legal presets.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Resize your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/resize-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Resize PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-resize-pdf-pages" />
      </article>

      <FooterSection />
    </div>
  );
}
