import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Manage & Embed File Attachments in PDF (ZUGFeRD & E-Invoices) | iCreatePDF',
  description: 'Guide to extracting and embedding XML e-invoices, spreadsheets, and source files into PDF containers 100% client-side.',
  keywords: 'how to extract zugferd xml from pdf, embed file in pdf, pdf portfolio builder, factur-x attachment extractor',
  alternates: buildAlternates('/blogs/how-to-manage-and-embed-pdf-attachments'),
};

export default function AttachmentManagerBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: 'How to Manage & Embed File Attachments in PDF',
              description: 'Guide to extracting and embedding XML e-invoices, spreadsheets, and source files into PDF containers.',
              url: '/blogs/how-to-manage-and-embed-pdf-attachments',
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
          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Document Management</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Extract &amp; Embed File Attachments in PDF Container Files
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Learn how to unpack ZUGFeRD / Factur-X XML e-invoices or bundle spreadsheets, docs, and images directly into a PDF document catalog.
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
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Standard PDFs can act as multi-file containers, embedding structured XML payloads (such as ZUGFeRD electronic invoices mandated in Europe), raw data tables, or background source files.
          </p>

          <h2 className="text-xl font-bold text-foreground font-display pt-4">Steps to Extract or Attach Files in PDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open the <Link href="/pdf-attachment-manager" className="text-brand hover:underline font-semibold">PDF Attachment Manager</Link>.</li>
            <li>Upload your PDF file to inspect its embedded catalog tree.</li>
            <li>Click <strong>Extract</strong> next to any embedded file (e.g. `factur-x.xml`) to download it instantly.</li>
            <li>To attach new files, click <strong>Select Files to Embed</strong> and choose XML, CSV, XLSX, or image files.</li>
            <li>Click <strong>Embed &amp; Save PDF</strong> to download your updated multi-file container.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Manage PDF attachments free</h3>
          <Link href="/pdf-attachment-manager">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Launch Attachment Manager
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}
