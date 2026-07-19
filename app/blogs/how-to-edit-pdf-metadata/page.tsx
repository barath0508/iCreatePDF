import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Settings, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Edit PDF Metadata & Properties Online | iCreatePDF',
  description: 'Learn how to view and edit metadata fields in a PDF. Change title, author, subject, keywords, and add professional headers or footers locally.',
  keywords: 'edit pdf metadata, change pdf author, pdf document properties, add header footer to pdf, pdf properties editor free',
  alternates: buildAlternates('/blogs/how-to-edit-pdf-metadata'),
  openGraph: {
    title: 'How to Edit PDF Metadata & Properties Online',
    description: 'Protect your privacy by stripping author info and editing document properties. Clean up metadata or add headers and footers 100% locally.',
    type: 'article',
    publishedTime: '2026-05-26T00:00:00Z',
  },
};

const metadataFields = [
  { field: 'Title', purpose: 'The primary name of the document, showing up in the PDF reader title bar.' },
  { field: 'Author', purpose: 'The creator of the document. Crucial to change or clear for anonymity.' },
  { field: 'Subject', purpose: 'A short description or summary of what the document covers.' },
  { field: 'Keywords', purpose: 'Comma-separated terms that search tools use to catalog the file.' },
  { field: 'Creator / Producer', purpose: 'The software used to compile or convert the original document.' },
];

export default function EditMetadataBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
          title: 'How to Edit PDF Metadata & Properties Online | iCreatePDF',
          description: 'Learn how to view and edit metadata fields in a PDF. Change title, author, subject, keywords, and add professional headers or footers locally.',
          url: '/blogs/how-to-edit-pdf-metadata',
          datePublished: '2026-05-26T00:00:00Z'
        }),
            {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I edit PDF metadata?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Upload your file, customize the title, author, subject, or keywords fields, and download the updated PDF document."
                }
              },
              {
                "@type": "Question",
                "name": "Is modifying PDF properties secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, iCreatePDF edits PDF headers locally in your browser, bypassing cloud uploads to keep metadata changes private."
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
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase">Document Setup</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Edit PDF Metadata and Document Properties
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Clean up document traits, change the author, edit keywords, or add consistent headers and footers to your files securely in the browser.
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
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When you export a document from word processors or document creation tools, metadata is automatically bundled inside the PDF file. This metadata can reveal your full name, organization, the exact time the file was created, and the software used. For security and privacy, changing or clearing these fields is highly recommended.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Metadata Sanitization:</strong> Edit or clear author, title, keywords, and creation dates from files.</li>
              <li><strong>SEO Optimization:</strong> Add tags and descriptions to optimize document discovery.</li>
              <li><strong>Local Cleanup:</strong> Ensure private registry values are scrubbed before publishing.</li>
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
                <Link href="#what-are-the-core-pdf-metadata-fields-and-why-do-they-matter" className="hover:text-brand transition-colors">
                  What Are the Core PDF Metadata Fields and Why Do They Matter?
                </Link>
              </li>
              <li>
                <Link href="#how-do-you-modify-pdf-metadata-fields-in-your-browser" className="hover:text-brand transition-colors">
                  How Do You Modify PDF Metadata Fields in Your Browser?
                </Link>
              </li>
              <li>
                <Link href="#why-should-you-add-running-headers-and-footers-with-metadata" className="hover:text-brand transition-colors">
                  Why Should You Add Running Headers and Footers with Metadata?
                </Link>
              </li>
            </ul>
          </div>


          <h2 id="what-are-the-core-pdf-metadata-fields-and-why-do-they-matter" className="text-xl font-bold text-foreground pt-4 font-display">What Are the Core PDF Metadata Fields and Why Do They Matter?</h2>
          <div className="space-y-4">
            {metadataFields.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 flex items-start gap-3">
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded font-mono shrink-0 mt-0.5">{f.field}</span>
                <p className="text-xs text-foreground/70 leading-relaxed">{f.purpose}</p>
              </div>
            ))}
          </div>

          <h2 id="how-do-you-modify-pdf-metadata-fields-in-your-browser" className="text-xl font-bold text-foreground pt-4 font-display">How Do You Modify PDF Metadata Fields in Your Browser?</h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Open the <Link href="/tools/pdf-metadata" className="text-brand hover:underline">/pdf-metadata</Link> tool.</li>
            <li>Drag your file in. The tool will parse and display existing properties.</li>
            <li>Change the Author, Title, Subject, or Keywords text fields.</li>
            <li>Click <em>Apply Changes</em> and download the updated PDF file.</li>
          </ol>

          <h2 id="why-should-you-add-running-headers-and-footers-with-metadata" className="text-xl font-bold text-foreground pt-4 font-display">Why Should You Add Running Headers and Footers with Metadata?</h2>
          <p>
            In addition to internal property tags, you may need to add visual tags to the PDF pages. The <strong>Add Header &amp; Footer</strong> tool lets you place custom page numbers, branding, dates, or classifications directly on top and bottom margins of every page.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li>Align text left, center, or right.</li>
            <li>Inject dynamic variables like <code className="text-brand font-mono">{"{page}"}</code> (current page number) or <code className="text-brand font-mono">{"{total}"}</code> (total pages).</li>
            <li>Choose font size, placement margins, and colors to match your document style.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display flex items-center justify-center gap-2">
            <Settings className="w-5 h-5 text-pink-400" />
            Edit Document Properties Securely
          </h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Update metadata entirely inside your browser. No files are uploaded to any external server.</p>
          <Link href="/tools/pdf-metadata">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Open Metadata Editor
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-6 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4 my-6">
            {[
              { q: 'How do I edit PDF metadata?', a: 'Upload your file, customize the title, author, subject, or keywords fields, and download the updated PDF document.' },
              { q: 'Is modifying PDF properties secure?', a: 'Yes, iCreatePDF edits PDF headers locally in your browser, bypassing cloud uploads to keep metadata changes private.' }
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>



        <RelatedPosts currentSlug="how-to-edit-pdf-metadata" />
      </article>

      <FooterSection />
    </div>
  );
}
