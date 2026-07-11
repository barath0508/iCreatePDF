import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Convert Word DOCX to PDF Free Without Layout Shifts | iCreatePDF',
  description: 'Convert standard Microsoft Word files (.docx) into clean PDFs entirely client-side, preserving text layout, tables, and images without server uploads.',
  keywords: 'convert word to pdf free, docx to pdf online, word to pdf layout preserved, microsoft word docx converter free, local docx to pdf',
  alternates: buildAlternates('/blog/how-to-convert-word-docx-to-pdf-free'),
  openGraph: {
    title: 'How to Convert Word DOCX to PDF Free Without Layout Shifts',
    description: 'Avoid formatting issues and preserve document layout by converting Word documents to PDF locally in the browser sandbox.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function WordToPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert Word DOCX to PDF Free Without Layout Shifts | iCreatePDF',
          description: 'Convert standard Microsoft Word files (.docx) into clean PDFs entirely client-side, preserving text layout, tables, and images without server uploads.',
          url: '/blog/how-to-convert-word-docx-to-pdf-free',
          datePublished: '2026-05-29T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">Image Conversion</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert Word DOCX to PDF Free (No Formatting Shifts)
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Sharing raw Word files often causes fonts and alignment to shift depending on the recipient’s device. Learn how to convert DOCX files to PDF cleanly in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When you send a Microsoft Word (.docx) file, it relies on the font files and page size defaults installed on the reader’s computer. If they open the document on a phone, tablet, or Mac without Microsoft Office, the margins will shift, wrapping text in awkward positions. Converting to PDF compiles all layout variables into static grids that look identical on any device.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand" />
            The Layout Shift Problem
          </h2>
          <p>
            Standard online docx-to-pdf converters frequently break spacing, tables, or image captions. This is because they use basic Linux conversion servers that lack proper Word compatibility. iCreatePDF processes conversions locally using modern document parsing libraries to preserve structural layouts, tables, borders, and margins.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-brand" />
            Steps to Convert Word to PDF
          </h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Open the <Link href="/word-to-pdf" className="text-brand hover:underline">Word to PDF</Link> tool page.</li>
            <li>Upload your <code>.docx</code> Word file. The file is processed client-side.</li>
            <li>Review the structural layout and preview generated page outlines.</li>
            <li>Click <strong>Download PDF</strong>.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Advantages of Universal PDFs</h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-foreground">Cross-Platform Consistency:</strong> iOS, Android, macOS, and Windows display the exact same formatting.</li>
            <li><strong className="text-foreground">Non-Editable by Default:</strong> Restricts casual edits to pricing structures or legal clauses.</li>
            <li><strong className="text-foreground">Smaller Size:</strong> Compressed PDF formats load faster than resource-heavy Word docs.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <FileText className="w-5 h-5 text-brand" />
            Convert Word Documents Offline
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Export Word (.docx) files to standard PDF documents client-side in the browser sandbox.</p>
          <Link href="/word-to-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Convert DOCX to PDF
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-word-docx-to-pdf-free" />
      </article>

      <FooterSection />
    </div>
  );
}
