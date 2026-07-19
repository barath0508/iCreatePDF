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
  title: 'How to Convert Markdown to PDF Online — Free Guide | iCreatePDF',
  description: 'Convert styled Markdown (.md) files to formatted PDF documents. 100% browser-based, no uploads, preserves headings, lists, code blocks, and links.',
  keywords: 'markdown to pdf, md to pdf, convert markdown to pdf online free, markdown pdf converter 2026',
  alternates: buildAlternates('/blogs/how-to-convert-markdown-to-pdf'),
  openGraph: {
    title: 'How to Convert Markdown to PDF Online — Free Guide',
    description: 'Convert styled Markdown files to formatted PDF documents, entirely in your browser.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'README Documentation', desc: 'Turn a project\'s README.md into a shareable PDF for stakeholders who don\'t use GitHub.' },
  { title: 'Technical Notes', desc: 'Export Markdown developer notes or specs as a formatted PDF for distribution.' },
  { title: 'Blog Draft Exports', desc: 'Convert a Markdown blog draft into a PDF for editorial review before publishing.' },
  { title: 'Meeting Notes', desc: 'Turn Markdown-formatted meeting notes into a clean PDF to archive or share.' },
  { title: 'Knowledge Base Articles', desc: 'Export Markdown-based wiki or knowledge base pages as standalone PDFs.' },
  { title: 'Academic Writing', desc: 'Convert Markdown drafts (common in academic and technical writing tools) into submission-ready PDFs.' },
];

export default function MarkdownToPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert Markdown to PDF Online — Free Guide | iCreatePDF',
          description: 'Convert styled Markdown (.md) files to formatted PDF documents. 100% browser-based, no uploads, preserves headings, lists, code blocks, and links.',
          url: '/blogs/how-to-convert-markdown-to-pdf',
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
            How to Convert Markdown to PDF Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Turn a .md file or pasted Markdown text into a clean, formatted PDF — headings, lists, code blocks, and links preserved — right in your browser.
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
            Markdown is the default writing format for developers, technical writers, and note-takers, but not everyone you share content with reads raw .md files comfortably. Converting to PDF gives you a polished, universally readable document while keeping your Markdown source as the single source of truth.
          </p>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li><strong>Clean Typography:</strong> Render markdown syntax (headers, links, lists) into clean typography documents.</li>
              <li><strong>Developer Speed:</strong> Write in lightweight markdown and generate styled PDF logs locally.</li>
              <li><strong>Confidential Code:</strong> Ideal for developer readmes, code logs, and documentation containing internal keys.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: How Do You Convert Markdown to PDF Offline?</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Open <Link href="/tools/markdown-to-pdf" className="text-brand hover:underline">iCreatePDF Markdown to PDF</Link>.</li>
            <li>Paste your Markdown content, or upload a .md file.</li>
            <li>Preview the rendered formatting — headings, bullet lists, tables, and code blocks.</li>
            <li>Click <strong className="text-foreground">Generate PDF</strong> and download the result.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> Markdown parsing and PDF generation happen entirely in your browser. Your document content is never uploaded anywhere.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Why Format Markdown Files into PDF Documents?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">What Markdown Syntax Elements are Supported by the Parser?</h2>
          <p>
            Standard Markdown syntax renders cleanly, including headings (#), bold/italic text, ordered and unordered lists, tables, blockquotes, links, and fenced code blocks with monospace formatting. If you need to also add fillable form fields to your resulting document, or plain-text formatting without Markdown syntax, see <Link href="/tools/txt-to-pdf" className="text-brand hover:underline">Text to PDF</Link>.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">How Does iCreatePDF Compare to Other Markdown-to-PDF Tools?</h2>
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
                  ['Code block formatting', 'Preserved', 'Varies'],
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
              { q: 'Does it support GitHub Flavored Markdown (tables, checkboxes)?', a: 'Yes — common GitHub Flavored Markdown extensions like tables and task lists render correctly in the exported PDF.' },
              { q: 'Will code blocks keep their formatting?', a: 'Yes, fenced code blocks are rendered in monospace font with preserved indentation for readability.' },
              { q: 'Can I convert a whole folder of Markdown files at once?', a: 'Convert one file at a time through the browser tool; for very large batches, repeat the process for each file.' },
              { q: 'Are links in the Markdown clickable in the PDF?', a: 'Yes, standard Markdown links are preserved as clickable hyperlinks in the generated PDF.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Convert Markdown to PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No sign-up. No uploads. Your content stays on your device.</p>
          <Link href="/tools/markdown-to-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Convert Markdown to PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-markdown-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
