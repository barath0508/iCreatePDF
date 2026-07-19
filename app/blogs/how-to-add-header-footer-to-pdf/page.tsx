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
  title: 'How to Add a Header and Footer to a PDF — Free Guide | iCreatePDF',
  description: 'Add custom headers and footers to every page of a PDF — company name, date, page numbers, or any text. 100% browser-based, no uploads.',
  keywords: 'add header footer pdf, pdf header footer online free, add page numbers and footer pdf, pdf running header 2026',
  alternates: buildAlternates('/blogs/how-to-add-header-footer-to-pdf'),
  openGraph: {
    title: 'How to Add a Header and Footer to a PDF — Free Guide',
    description: 'Add custom headers and footers to every page of a PDF, entirely in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Company Branding', desc: 'Add your company name and logo text to the header of every page in an outgoing document.' },
  { title: 'Document Dating', desc: 'Stamp a footer with the print or export date so recipients know how current the version is.' },
  { title: 'Confidentiality Notices', desc: 'Add a "Confidential — Do Not Distribute" footer to sensitive internal documents.' },
  { title: 'Report Series Labels', desc: 'Add a running header identifying which report or chapter a page belongs to.' },
  { title: 'Client Deliverables', desc: 'Add a client name and project reference to the header of a delivered document.' },
  { title: 'Legal Document Formatting', desc: 'Add required running headers or footers for court filing formatting standards.' },
];

export default function HeaderFooterBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Add a Header and Footer to a PDF — Free Guide | iCreatePDF',
          description: 'Add custom headers and footers to every page of a PDF — company name, date, page numbers, or any text. 100% browser-based, no uploads.',
          url: '/blogs/how-to-add-header-footer-to-pdf',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Add a Header and Footer to a PDF — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Stamp a company name, date, confidentiality note, or any custom text into the header or footer of every page — right in your browser.
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
            A consistent header or footer — a company name, confidentiality notice, or date — gives a document a professional, finished look and provides context no matter which page a reader lands on. Adding one to an existing PDF doesn't require going back to the original source file.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Professional Branding:</strong> Headers and footers establish corporate style and project numbering consistency.</li>
              <li><strong>Privacy Assurance:</strong> Local canvas stamping keeps corporate contracts offline and secure.</li>
              <li><strong>Simple Layouts:</strong> Pick margins that prevent headers from overlapping primary document text.</li>
            </ul>
          </div>

          <p>
            A <strong>PDF header</strong> represents identifying content aligned at the top margin of a page, while a <strong>PDF footer</strong> appears at the bottom. Stamping these components allows you to establish legal notices, version dates, or corporate ownership across a document. Processing your document layout locally means company agreements remain safe from server leaks.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: How Do You Add a Header or Footer to a PDF?</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/header-footer" className="text-brand hover:underline">iCreatePDF Header &amp; Footer</Link>.</li>
            <li>Upload the PDF you want to stamp.</li>
            <li>Enter your header and/or footer text, and choose the alignment.</li>
            <li>Apply to all pages and download the finished PDF.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Header and footer text is stamped directly onto the PDF in your browser. Your document is never uploaded to a server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">What Are the Common Reasons to Add a Header or Footer?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">How Do Headers and Footers Compare to Page Numbers and Bates Numbering?</h2>
          <p>
            If all you need is sequential page numbers, use the dedicated <Link href="/tools/add-page-numbers" className="text-brand hover:underline">Add Page Numbers</Link> tool for a simpler workflow. If you need legal-style sequential document identifiers (common in litigation), use <Link href="/tools/bates-numbering" className="text-brand hover:underline">Bates Numbering</Link> instead. Header &amp; Footer is best for custom text — names, dates, notices — that isn't a simple counter.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">How Does iCreatePDF Compare to Other Header and Footer Tools?</h2>
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
                  ['Custom alignment', 'Yes', 'Varies'],
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

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions About This Tool</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I add different text to the header and footer at the same time?', a: 'Yes — set independent header and footer text, and both are applied together across every page in one pass.' },
              { q: 'Will the header/footer overlap my existing content?', a: 'No, text is placed in the page margin area, which keeps it clear of your document\'s main content.' },
              { q: 'Can I include the current date automatically?', a: 'Yes — insert a date placeholder that\'s filled in automatically when the PDF is generated.' },
              { q: 'Can I apply this to only some pages instead of all?', a: 'The tool is designed for consistent headers/footers across the whole document; for page-specific text, use Edit PDF to add custom overlays to individual pages.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        
          <p className="text-xs text-foreground/45 border-t border-foreground/5 pt-4 mt-6">
            Learn more about formatting rules in official <a href="https://learn.microsoft.com/en-us" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">Microsoft Document Styling Guides</a>.
          </p>
</div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Add a header or footer now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your files stay on your device.</p>
          <Link href="/tools/header-footer">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Add Header &amp; Footer Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-add-header-footer-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
