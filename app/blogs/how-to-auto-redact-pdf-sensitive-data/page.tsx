import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Auto-Redact Sensitive PII from PDF Files — Guide | iCreatePDF',
  description: 'Learn how to automatically scan and sanitize Emails, SSNs, Credit Cards, and PII from PDF documents 100% locally in your browser with zero server uploads.',
  keywords: 'how to auto redact pdf, sanitize pii in pdf, automatic pdf redaction guide, redact ssn email pdf',
  alternates: buildAlternates('/blogs/how-to-auto-redact-pdf-sensitive-data'),
};

export default function AutoRedactBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Auto-Redact Sensitive PII from PDF Files',
              description: 'Learn how to automatically scan and sanitize Emails, SSNs, and Credit Cards from PDF documents locally.',
              url: '/blogs/how-to-auto-redact-pdf-sensitive-data',
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
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Security &amp; Privacy</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Auto-Redact Sensitive PII from PDF Files Online
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Automatically detect emails, social security numbers, credit card numbers, and custom confidential phrases in your PDFs and burn blackout boxes over them 100% locally.
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
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When sharing legal contracts, financial statements, or medical forms, manually blacking out sensitive Personally Identifiable Information (PII) line by line is slow and prone to oversight.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3">
            <h3 className="text-sm font-bold text-foreground">Why Browser-Based Redaction Matters</h3>
            <p className="text-xs text-foreground/70">
              Uploading confidential documents with SSNs or credit cards to cloud-based PDF tools creates privacy risks. iCreatePDF processes the text stream entirely inside local JavaScript memory buffer, ensuring zero bytes ever leave your device.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">Step-by-Step Auto-Redaction Guide</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open the <Link href="/auto-redact-pdf" className="text-brand hover:underline font-semibold">Smart Auto-Redact PDF Tool</Link>.</li>
            <li>Select your PDF file — the document is loaded into memory buffer.</li>
            <li>Click <strong>Scan PDF for Sensitive Data</strong> to automatically find Emails, SSNs, Credit Cards, and Phone Numbers.</li>
            <li>Optionally enter custom keywords or regulatory phrases to blackout.</li>
            <li>Review matched entries and click <strong>Redact Targets &amp; Download PDF</strong>.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Auto-Redact your PDF securely now</h3>
          <Link href="/auto-redact-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Auto-Redactor
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
