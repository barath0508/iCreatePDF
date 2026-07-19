import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Scale, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'What is Bates Numbering & How to Add Stamps to PDF | iCreatePDF',
  description: 'Learn the purpose of Bates numbering in legal discovery and how to apply sequential stamps to PDF pages. 100% free and secure offline stamp tool.',
  keywords: 'bates numbering pdf, bates stamp legal, add bates numbers to pdf, legal pdf stamping, sequential page numbering pdf',
  alternates: buildAlternates('/blogs/bates-numbering-pdf-guide'),
  openGraph: {
    title: 'What is Bates Numbering & How to Add Stamps to PDF',
    description: 'Understand the standard legal practice of Bates numbering and learn how to stamp your PDF documents instantly in your browser.',
    type: 'article',
    publishedTime: '2026-05-26T00:00:00Z',
  },
};

export default function BatesNumberingBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'What is Bates Numbering & How to Add Stamps to PDF | iCreatePDF',
          description: 'Learn the purpose of Bates numbering in legal discovery and how to apply sequential stamps to PDF pages. 100% free and secure offline stamp tool.',
          url: '/blogs/bates-numbering-pdf-guide',
          datePublished: '2026-05-26T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">Legal &amp; Compliance</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            What is Bates Numbering? (Complete Guide &amp; PDF Tool)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Discover the essential standard of legal page numbering, why it is critical for case files, and how to apply custom prefix, suffix, and padded numbers.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand border border-brand/10">BR</span>
              Written by <span className="font-semibold text-foreground/60">Barath R</span> (Lead Developer &amp; PDF Expert)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime="2026-05-26">May 26, 2026</time>
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            In legal trials, discovery proceedings, and regulatory submissions, tracking thousands of documents is a logistical nightmare. To ensure every page can be uniquely referenced, law firms and legal departments use a system called <strong>Bates Numbering</strong>.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Legal Standard:</strong> Bates numbering is required by courts to uniquely index and verify discovery documents.</li>
              <li><strong>Security & Privilege:</strong> Stamping files locally on your CPU preserves client attorney privilege.</li>
              <li><strong>Prefix Customization:</strong> Use clear, descriptive party prefixes (e.g. PLAINTIFF-) to ensure sorting accuracy.</li>
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
                <Link href="#what-are-the-origins-and-definition-of-bates-numbering" className="hover:text-brand transition-colors">
                  What Are the Origins and Definition of Bates Numbering?
                </Link>
              </li>
              <li>
                <Link href="#what-is-the-anatomy-of-a-bates-number" className="hover:text-brand transition-colors">
                  What is the Anatomy of a Bates Number?
                </Link>
              </li>
              <li>
                <Link href="#why-is-sequential-page-stamping-crucial-for-legal-discovery" className="hover:text-brand transition-colors">
                  Why is Sequential Page Stamping Crucial for Legal Discovery?
                </Link>
              </li>
              <li>
                <Link href="#how-can-you-add-bates-stamps-to-a-pdf-with-icreatepdf" className="hover:text-brand transition-colors">
                  How Can You Add Bates Stamps to a PDF with iCreatePDF?
                </Link>
              </li>
            </ul>
          </div>


          <p>
            <strong>Bates numbering</strong> is a specialized method used to index legal documents, identifying each page with a unique, sequential number. In the digital age, a <strong>Bates stamp</strong> represents a non-editable, running text string (containing case prefixes and leading zero digits) placed in page margins. Stamping files client-side ensures privileged client discovery records are never uploaded to unsecured cloud databases.
          </p>

          <h2 id="what-are-the-origins-and-definition-of-bates-numbering" className="text-xl font-bold text-foreground pt-4 font-display">What Are the Origins and Definition of Bates Numbering?</h2>
          <p>
            Invented by Edwin G. Bates in the late 19th century, the Bates stamping machine stamped numbers sequentially on physical documents. In the digital age, Bates numbering refers to appending unique identification numbers, prefixes, and suffixes to the margins of electronic PDF pages.
          </p>

          <h2 id="what-is-the-anatomy-of-a-bates-number" className="text-xl font-bold text-foreground pt-4 font-display">What is the Anatomy of a Bates Number?</h2>
          <p>
            A typical Bates stamp consists of three parts:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-foreground">Prefix:</strong> Identifies the source or party (e.g., <code className="text-brand font-mono">PLAINTIFF-</code> or <code className="text-brand font-mono">SMITH-</code>).</li>
            <li><strong className="text-foreground">Padded Number:</strong> A padded sequence containing leading zeros for sorting (e.g., <code className="text-brand font-mono">000001</code> instead of <code className="text-brand font-mono">1</code>).</li>
            <li><strong className="text-foreground">Suffix:</strong> Additional context (e.g., <code className="text-brand font-mono">-CONFIDENTIAL</code>).</li>
          </ul>
          <p>Example: <strong className="text-foreground font-mono">CASE-000142-SECURE</strong></p>

          <h2 id="why-is-sequential-page-stamping-crucial-for-legal-discovery" className="text-xl font-bold text-foreground pt-4 font-display">Why is Sequential Page Stamping Crucial for Legal Discovery?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-card border border-foreground/5 space-y-2">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />Reference Clarity</h3>
              <p className="text-xs text-foreground/50 leading-normal">Allows attorneys, judges, and clerks to refer to a specific page instantly: "Please see Document Smith-000412."</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-foreground/5 space-y-2">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />Tamper Evidence</h3>
              <p className="text-xs text-foreground/50 leading-normal">Missing pages are immediately obvious if there is a gap in the sequential numbering series.</p>
            </div>
          </div>

          <h2 id="how-can-you-add-bates-stamps-to-a-pdf-with-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">How Can You Add Bates Stamps to a PDF with iCreatePDF?</h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Navigate to the <Link href="/tools/bates-numbering" className="text-brand hover:underline">/bates-numbering</Link> tool page.</li>
            <li>Select the document.</li>
            <li>Enter your custom Prefix, starting number, and number of padded digits (e.g., 6).</li>
            <li>Select the stamping position (e.g., Bottom Right corner).</li>
            <li>Click <em>Apply Bates Numbering</em> to compile and download your legal files.</li>
          </ol>
        
          <p className="text-xs text-foreground/45 border-t border-foreground/5 pt-4 mt-6">
            For details on legal compliance requirements, refer to federal court rules and standard <a href="https://support.microsoft.com/en-us" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">court discovery procedures</a>.
          </p>
</div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Scale className="w-5 h-5 text-orange-400" />
            Apply Legal Bates Stamps Instantly
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Completely client-side. Keep sensitive legal files out of third-party cloud portals.</p>
          <Link href="/tools/bates-numbering">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Start Bates Numbering
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="bates-numbering-pdf-guide" />
      </article>

      <FooterSection />
    </div>
  );
}
