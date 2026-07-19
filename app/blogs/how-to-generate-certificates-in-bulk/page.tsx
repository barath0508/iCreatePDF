import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Award, PlusCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Generate Certificates in Bulk from Excel List | iCreatePDF',
  description: 'Need to create certificates, invitation cards, or tickets for hundreds of recipients? Learn how to generate personalized certificates client-side in bulk using a template and Excel.',
  keywords: 'bulk certificate generator, generate certificates in bulk, pdf excel certificate maker, mail merge certificates, bulk award letter generator online free',
  alternates: buildAlternates('/blogs/how-to-generate-certificates-in-bulk'),
  openGraph: {
    title: 'How to Generate Certificates in Bulk from Excel List',
    description: 'A complete step-by-step tutorial on building a visual template mapping, connecting a spreadsheet rows table, and generating PDF certificate bundles client-side.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function BulkCertificatesBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Generate Certificates in Bulk from Excel List | iCreatePDF',
          description: 'Need to create certificates, invitation cards, or tickets for hundreds of recipients? Learn how to generate personalized certificates client-side in bulk using a template and Excel.',
          url: '/blogs/how-to-generate-certificates-in-bulk',
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
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Generate Certificates in Bulk from an Excel Sheet (Mail Merge)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Issuing certificates one-by-one is tedious. Learn how to map columns from a spreadsheet directly onto a PDF layout template to build hundreds of personalized certificates instantly.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Whether you run a training course, coordinate a seminar, or manage award distributions, you regularly need to issue customized certificates. Standard mail merge in traditional desktop office tools is slow, shifts formatting fonts, and uploads documents to third-party clouds. Performing a local PDF mail merge solves these issues.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#the-bulk-generation-workflow" className="hover:text-brand transition-colors">
                  The Bulk Generation Workflow
                </Link>
              </li>
              <li>
                <Link href="#formatting-fonts-amp-colors-locally" className="hover:text-brand transition-colors">
                  Formatting Fonts &amp; Colors Locally
                </Link>
              </li>
              <li>
                <Link href="#export-options-zip-vs-combined-pdf" className="hover:text-brand transition-colors">
                  Export Options: ZIP vs. Combined PDF
                </Link>
              </li>
            </ul>
          </div>

<h2 id="the-bulk-generation-workflow" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-brand" />
            The Bulk Generation Workflow
          </h2>
          <p>
            iCreatePDF splits bulk certificate generation into three simple steps:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong>Upload Layout Template:</strong> A single-page PDF template representing the blank certificate structure.</li>
            <li><strong>Import Spreadsheet Data:</strong> An Excel table (.xlsx) or CSV containing rows of details (Recipient Name, Course Title, Issue Date, Grade).</li>
            <li><strong>Map Draggable Placeholders:</strong> A visual browser preview where you drag spreadsheet variable labels onto their positions on the template page.</li>
          </ul>

          <h2 id="formatting-fonts-amp-colors-locally" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand" />
            Formatting Fonts &amp; Colors Locally
          </h2>
          <p>
            Once you drag a placeholder like <code>{`{{Name}}`}</code> onto the canvas, you can adjust:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4 text-xs">
            <li><strong>Font Family:</strong> Embed clean standard PDF typefaces (Helvetica, Times Roman, Courier).</li>
            <li><strong>Text Alignment:</strong> Set alignment to <em>Center</em> for names to ensure short and long names remain centered on the layout.</li>
            <li><strong>Font Size &amp; Weights:</strong> Scale sizes up to 144pt and configure Bold weights.</li>
            <li><strong>Branding Color:</strong> Pick custom hex color codes matching your corporate style guide.</li>
          </ul>

          <h2 id="export-options-zip-vs-combined-pdf" className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand" />
            Export Options: ZIP vs. Combined PDF
          </h2>
          <p>
            After setting up, choose how you want to download the generated files:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li><strong>Combined PDF:</strong> Compiles all certificates into a single, multi-page PDF document. Ideal for bulk printing at a print shop.</li>
            <li><strong>ZIP Folder (Individual PDFs):</strong> Creates separate PDF files for each row, named after the primary naming column (e.g. <code>Certificate - John_Doe.pdf</code>). Ideal for emailing to recipients.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-brand" />
            Start Bulk Generation Now
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Generate hundreds of personalized PDF certificates or invites 100% locally from your Excel list.</p>
          <Link href="/tools/bulk-certificates">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Bulk Certificate Generator
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-generate-certificates-in-bulk" />
      </article>

      <FooterSection />
    </div>
  );
}
