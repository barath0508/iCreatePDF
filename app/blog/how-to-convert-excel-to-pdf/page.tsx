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
  title: 'How to Convert Excel to PDF Online — Free Guide | iCreatePDF',
  description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables client-side — no upload, 100% private.',
  keywords: 'excel to pdf, csv to pdf, convert excel to pdf free, spreadsheet to pdf, convert xlsx to pdf online local, private excel pdf converter',
  alternates: buildAlternates('/blog/how-to-convert-excel-to-pdf'),
  openGraph: {
    title: 'How to Convert Excel to PDF Online — Free Guide',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables client-side — 100% private, no upload.',
    type: 'article',
    publishedTime: '2026-07-18T00:00:00Z',
  },
};

const useCases = [
  { title: 'Financial Auditing Reports', desc: 'Convert company balance sheets or income statements to structured, clean PDFs for auditing files.' },
  { title: 'Invoices & Expense Ledgers', desc: 'Print invoice rows or expense lists from CSV records into clean, multi-page layout PDFs.' },
  { title: 'Schedules & Timetables', desc: 'Format employee rosters, school class schedules, or shift planners into printable PDF handbooks.' },
  { title: 'Product Inventory Lists', desc: 'Save supplier inventory lists, SKUs, and pricing sheets as formatted PDF catalogs.' },
  { title: 'Contact Rosters', desc: 'Format customer lists or membership tables into clean PDFs with adjustable font sizes.' },
  { title: 'Private Budgeting Sheets', desc: 'Print personal budgets and financial trackers to PDF locally without exposing bank values to cloud servers.' },
];

export default function ExcelToPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Convert Excel to PDF Online — Free Guide | iCreatePDF',
          description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files to printable, beautifully formatted PDF tables client-side — no upload, 100% private.',
          url: '/blog/how-to-convert-excel-to-pdf',
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
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">File Conversion</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Convert Excel to PDF Online — Free &amp; 100% Client-Side
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Convert Excel workbooks (.xlsx, .xls) and CSV tables into printable, beautifully formatted PDF tables locally — no uploads, no data leaks.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />July 18, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />4 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When you need to share a spreadsheet, converting it to a PDF is the best way to ensure the formatting looks identical on every device. However, most online Excel-to-PDF converters require uploading your file to a remote cloud server. This is a significant security risk for sensitive documents like company payrolls, accounting balance sheets, or pricing catalogs.
          </p>
          <p>
            iCreatePDF resolves this by parsing your workbook and drawing the PDF layout directly on your own device's CPU. Your spreadsheet never crosses the network boundary, ensuring absolute privacy.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Convert Excel to PDF Using iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Navigate to the <Link href="/excel-to-pdf" className="text-brand hover:underline">Excel to PDF Converter</Link>.</li>
            <li>Drag and drop your spreadsheet (.xlsx, .xls, or .csv) into the local upload box.</li>
            <li>Select the sheet and choose which columns to display or hide using the sidebar column checklist.</li>
            <li>Configure page parameters (Orientation, Paper Size, Margin, Font Size, and table Grid Theme).</li>
            <li>Click <strong>Generate PDF</strong> and download your styled PDF table report instantly.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>Privacy Guarantee:</strong> All parsing and PDF rendering run locally in browser memory. Your private financial calculations and records never touch any remote server.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">6 Common Use Cases for Spreadsheet-to-PDF Conversion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {useCases.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-foreground/5 space-y-1.5">
                <h3 className="font-bold text-foreground text-sm">{u.title}</h3>
                <p className="text-xs text-foreground/50 leading-normal">{u.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">Tips for Formatting Wide Excel Tables into A4 PDF Pages</h2>
          <p>
            Excel tables often expand horizontally with many columns. To prevent your columns from getting cut off on standard PDF sheets, apply these simple formatting options in the configuration panel:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong>Select Landscape orientation:</strong> Landscape gives you significantly more horizontal width than Portrait.</li>
            <li><strong>Uncheck unnecessary columns:</strong> Use the column checklist to hide columns that are not critical for your final print report.</li>
            <li><strong>Decrease font size:</strong> Set the font size to "Small" to fit more data columns into a narrower space.</li>
            <li><strong>Toggle Wrap Text:</strong> Wrap text automatically adjusts row heights to prevent longer cells from overflowing layout borders.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display">iCreatePDF vs Typical Cloud Converters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-foreground/70 border border-foreground/10 rounded-xl overflow-hidden">
              <thead className="bg-foreground/5 text-foreground font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Feature</th>
                  <th className="text-left px-4 py-3">iCreatePDF</th>
                  <th className="text-left px-4 py-3">Other Online Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  ['Spreadsheet files uploaded to server', 'Never (100% Local)', 'Always'],
                  ['Select sheets & choose visible columns', 'Yes', 'Rarely'],
                  ['Theme customization (Brand, Dark, Minimalist)', 'Yes', 'No (Standard black & white)'],
                  ['Account required', 'No', 'Often yes'],
                  ['Cost & limitations', 'Free (No limits)', 'Paywalled / capped size'],
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
              { q: 'Can I select a sheet from a multi-sheet workbook?', a: 'Yes! If your uploaded Excel file contains multiple sheets, a sheet selector bar will appear above the preview grid, letting you browse and convert sheets individually.' },
              { q: 'Will the gridlines display in my final PDF?', a: 'By default, yes. However, you can toggle the "Gridlines" checkbox in the sidebar settings off if you want a clean borderless design.' },
              { q: 'Can I add a custom title to the PDF table report?', a: 'Yes, just fill in the "Document Title" text input in the sidebar settings. It will render as a prominent title centered above your table report.' },
              { q: 'Do you support legacy .xls files?', a: 'Yes, we support both modern Excel files (.xlsx) and legacy workbooks (.xls), as well as text spreadsheets (.csv).' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Convert Excel to PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">No registration, no file uploads. Keep your sheet data secure.</p>
          <Link href="/excel-to-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-white font-medium text-xs px-6 rounded-full group">
              Convert Excel to PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-convert-excel-to-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
