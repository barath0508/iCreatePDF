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
  title: 'How to Extract Text from a PDF Online — Free Guide | iCreatePDF',
  description: 'Pull the raw text out of any PDF, page by page, entirely in your browser. No uploads, no software, copy or download as .txt instantly.',
  keywords: 'extract text from pdf, pdf to text online, pdf text extraction free, get text out of pdf, pdf to txt 2026',
  alternates: buildAlternates('/blog/how-to-extract-text-from-pdf'),
  openGraph: {
    title: 'How to Extract Text from a PDF Online — Free Guide',
    description: 'Pull the raw text out of any PDF, page by page, entirely in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Quoting a Report', desc: 'Copy a specific paragraph from a long PDF report into an email or document without retyping it.' },
  { title: 'Search & Analysis', desc: 'Extract text to search, index, or run it through another tool that needs plain text input.' },
  { title: 'Accessibility', desc: 'Convert image-free PDFs to text for screen readers or text-to-speech tools that don\'t parse PDFs well.' },
  { title: 'Data Entry', desc: 'Pull structured content like addresses or line items out of a PDF for entry into a spreadsheet.' },
  { title: 'Translation Tools', desc: 'Extract text first so it can be pasted into a translation service that doesn\'t accept PDF uploads.' },
  { title: 'Archiving', desc: 'Keep a lightweight, searchable text backup of important documents alongside the original PDF.' },
];

export default function PdfToTextBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Extract Text from a PDF Online — Free Guide | iCreatePDF',
          description: 'Pull the raw text out of any PDF, page by page, entirely in your browser. No uploads, no software, copy or download as .txt instantly.',
          url: '/blog/how-to-extract-text-from-pdf',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Text Extraction</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Extract Text from a PDF Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Get the plain text content out of any PDF, page by page, without installing software or sending your document to a server.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            PDFs are great for preserving layout, but that same layout makes it awkward to copy and reuse the text inside them. Extracting the raw text lets you search it, quote it, translate it, or feed it into another tool — and you can do it directly in your browser.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Extract Text Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/pdf-to-text" className="text-brand hover:underline">iCreatePDF Extract Text</Link>.</li>
            <li>Upload your PDF — text is parsed page-by-page directly in your browser.</li>
            <li>Preview the extracted text for each page.</li>
            <li>Copy the text you need, or download the full extraction as a .txt file.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Text parsing runs entirely on your device using a local PDF-parsing library. Your document's contents are never transmitted to iCreatePDF or any third party.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Reasons to Extract Text from a PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">What if My PDF Is a Scanned Image?</h2>
          <p>
            Standard text extraction only works on PDFs that already contain a text layer — documents created digitally (Word exports, e-signed contracts, etc.). If your PDF is a scan or photo with no underlying text layer, extraction will return nothing because there's no text to find. In that case, use <Link href="/pdf-ocr" className="text-brand hover:underline">PDF OCR</Link> first to recognize the text in the scanned image, then extract it.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Other Text Extraction Tools</h2>
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
                  ['Per-page preview', 'Yes', 'Varies'],
                  ['Cost', 'Free', 'Freemium / paywalled'],
                  ['Works on scanned PDFs', 'With OCR add-on', 'Rarely without a paid plan'],
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
              { q: 'Does this preserve formatting like bold or bullet points?', a: 'No — extraction returns raw text content. Formatting, fonts, and layout are not preserved, since the output is a plain text file.' },
              { q: 'Why is some text missing from my extraction?', a: 'If a PDF page is a scanned image rather than digitally created text, there is no text layer to extract. Run it through PDF OCR first.' },
              { q: 'Can I extract text from just one page?', a: 'Yes — each page\'s text is shown separately, so you can copy only the page you need instead of the whole document.' },
              { q: 'Is the extracted text editable?', a: 'Yes, once downloaded as a .txt file or copied to your clipboard, it can be pasted and edited in any text editor or word processor.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Extract text from your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/pdf-to-text">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Extract Text Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-extract-text-from-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
