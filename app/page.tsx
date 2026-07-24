'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { RecentFilesWidget } from '@/components/landing/RecentFilesWidget';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { FaqSection } from '@/components/landing/faq-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { Reveal } from '@/components/landing/shared/reveal';
import { StudioCard } from '@/components/ui/studio-card';
import {
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText, Shield, FileSignature, Edit, ShieldCheck,
  Code, Layers, Printer, Columns, EyeOff, Crop, BookOpen, Wrench, Info,
  AlignCenter, Maximize2, Moon, QrCode, BookMarked, Trash2,
  Volume2, Stamp, FileSpreadsheet, Accessibility, Copy, FileSearch, Award, Search, ArrowRight
} from 'lucide-react';

const tools = [
  { icon: Combine, title: 'Merge PDF', desc: 'Combine multiple PDF documents into a single file.', href: '/tools/merge-pdf', category: 'organize' },
  { icon: Scissors, title: 'Split PDF', desc: 'Extract page ranges or split a PDF into separate files.', href: '/tools/split-pdf', category: 'organize' },
  { icon: Sliders, title: 'Organize PDF', desc: 'Rearrange, rotate, or delete specific pages visually.', href: '/tools/organize-pdf', category: 'organize' },
  { icon: Image, title: 'JPG to PDF', desc: 'Convert JPG, PNG, WEBP, HEIC images into a clean PDF.', href: '/tools/jpg-to-pdf', category: 'convert' },
  { icon: FileImage, title: 'PNG to PDF', desc: 'Convert PNG images into high-quality PDF documents.', href: '/tools/png-to-pdf', category: 'convert' },
  { icon: FileImage, title: 'HEIC to PDF', desc: 'Convert high-efficiency HEIC photos without uploading.', href: '/tools/heic-to-pdf', category: 'convert' },
  { icon: FileImage, title: 'PDF to JPG', desc: 'Extract each PDF page as high-fidelity JPEG images.', href: '/tools/pdf-to-jpg', category: 'convert' },
  { icon: FileText, title: 'Word to PDF', desc: 'Convert Word (.docx) documents into printable PDFs.', href: '/tools/word-to-pdf', category: 'convert' },
  { icon: FileSpreadsheet, title: 'Excel to PDF', desc: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF tables.', href: '/tools/excel-to-pdf', category: 'convert' },
  { icon: FileText, title: 'TXT to PDF', desc: 'Convert plain text files (.txt) into formatted PDFs.', href: '/tools/txt-to-pdf', category: 'convert' },
  { icon: BookMarked, title: 'RIS to PDF', desc: 'Convert RIS citation files into formatted reference PDFs.', href: '/tools/ris-to-pdf', category: 'convert' },
  { icon: Camera, title: 'Scan to PDF', desc: 'Capture document pages using camera and compile to PDF.', href: '/tools/scan-to-pdf', category: 'convert' },
  { icon: Minimize2, title: 'Compress PDF', desc: 'Optimize PDF file size locally in your browser memory.', href: '/tools/compress-pdf', category: 'utilities' },
  { icon: RotateCw, title: 'Rotate PDF', desc: 'Rotate PDF document pages clockwise individually or in bulk.', href: '/tools/rotate-pdf', category: 'organize' },
  { icon: Shield, title: 'Protect PDF', desc: 'Encrypt PDF files with a secure password locally.', href: '/tools/protect-pdf', category: 'secure' },
  { icon: Unlock, title: 'Unlock PDF', desc: 'Strip password encryption locks from PDF files client-side.', href: '/tools/unlock-pdf', category: 'secure' },
  { icon: Copy, title: 'Prevent Copy', desc: 'Rasterize pages to disable text selection and highlighting.', href: '/tools/prevent-copy', category: 'secure' },
  { icon: FileSearch, title: 'PDF OCR', desc: 'Extract text from scanned, non-copyable PDFs via Tesseract.', href: '/tools/pdf-ocr', category: 'utilities' },
  { icon: Award, title: 'Bulk Certificates', desc: 'Generate customized PDF certificates from spreadsheets.', href: '/tools/bulk-certificates', category: 'convert' },
  { icon: Type, title: 'Watermark PDF', desc: 'Stamp configurable text overlays on all pages of a PDF.', href: '/tools/watermark-pdf', category: 'utilities' },
  { icon: Hash, title: 'Page Numbers', desc: 'Add page numbers with custom layout positioning.', href: '/tools/add-page-numbers', category: 'organize' },
  { icon: FileSignature, title: 'Sign PDF', desc: 'Draw or type your signature and visually stamp on PDF.', href: '/tools/sign-pdf', category: 'secure' },
  { icon: FileText, title: 'PDF to Text', desc: 'Extract structured text layouts from PDF files to TXT.', href: '/tools/pdf-to-text', category: 'utilities' },
  { icon: Edit, title: 'Edit PDF', desc: 'Insert custom text annotations on top of PDF layouts.', href: '/tools/edit-pdf', category: 'utilities' },
  { icon: Sliders, title: 'Fillable Form Builder', desc: 'Design interactive forms with fillable inputs and checkboxes.', href: '/tools/fillable-pdf-builder', category: 'utilities' },
  { icon: ShieldCheck, title: 'Verify Signature', desc: 'Inspect digital certificates and verify signed PDF integrity.', href: '/tools/verify-signature', category: 'secure' },
  { icon: Code, title: 'HTML to PDF', desc: 'Render HTML/CSS code templates into A4 PDF pages locally.', href: '/tools/html-to-pdf', category: 'convert' },
  { icon: FileText, title: 'Markdown to PDF', desc: 'Write styled Markdown and compile to clean A4 PDFs.', href: '/tools/markdown-to-pdf', category: 'convert' },
  { icon: Layers, title: 'Flatten PDF', desc: 'Merge forms and annotation layers into static read-only text.', href: '/tools/flatten-pdf', category: 'secure' },
  { icon: Printer, title: 'Grayscale PDF', desc: 'Convert colorful PDF documents to black and white for printing.', href: '/tools/grayscale-pdf', category: 'utilities' },
  { icon: Columns, title: 'Compare PDF', desc: 'Audit document differences side-by-side with synced scroll.', href: '/tools/compare-pdf', category: 'utilities' },
  { icon: EyeOff, title: 'Redact PDF', desc: 'Draw black boxes over sensitive content — permanently burned.', href: '/tools/redact-pdf', category: 'secure' },
  { icon: Crop, title: 'Crop PDF', desc: 'Trim scanner borders and excess whitespace from PDF margins.', href: '/tools/crop-pdf', category: 'organize' },
  { icon: BookOpen, title: 'Extract Pages', desc: 'Pull specific pages or ranges into a standalone PDF.', href: '/tools/extract-pages', category: 'organize' },
  { icon: Wrench, title: 'Repair PDF', desc: 'Recover corrupted PDF files by rebuilding cross-references.', href: '/tools/repair-pdf', category: 'utilities' },
  { icon: Info, title: 'PDF Metadata', desc: 'View and edit hidden document properties: title, author, tags.', href: '/tools/pdf-metadata', category: 'utilities' },
  { icon: AlignCenter, title: 'Header & Footer', desc: 'Stamp custom text at the top and bottom of every page.', href: '/tools/header-footer', category: 'organize' },
  { icon: Maximize2, title: 'Resize PDF', desc: 'Normalize pages to A4, Letter, A3, Legal, or A5.', href: '/tools/resize-pdf', category: 'organize' },
  { icon: BookMarked, title: 'Bates Numbering', desc: 'Sequential legal stamping with custom prefix and zero-padding.', href: '/tools/bates-numbering', category: 'organize' },
  { icon: Moon, title: 'Invert PDF', desc: 'Pixel-invert every page for eye strain reduction in dark mode.', href: '/tools/invert-pdf', category: 'utilities' },
  { icon: QrCode, title: 'QR to PDF', desc: 'Generate an A4 PDF with embedded QR code for URLs or text.', href: '/tools/qr-to-pdf', category: 'convert' },
  { icon: Trash2, title: 'Delete Pages', desc: 'Remove individual pages or ranges from your PDF file.', href: '/tools/delete-pdf-pages', category: 'organize' },
  { icon: Volume2, title: 'Read Aloud', desc: 'Listen to PDF text using browser speech synthesis.', href: '/tools/read-aloud-pdf', category: 'utilities' },
  { icon: Stamp, title: 'Certify PDF', desc: 'Stamp SHA-256 fingerprint certificate QR code onto PDF.', href: '/tools/certify-pdf', category: 'secure' },
  { icon: FileSpreadsheet, title: 'PDF to Excel', desc: 'Detect PDF tables and export as CSV spreadsheet files.', href: '/tools/pdf-to-excel', category: 'utilities' },
  { icon: Accessibility, title: 'Accessibility Checker', desc: 'Audit PDF for screen-reader WCAG compliance and tagging.', href: '/tools/pdf-accessibility-checker', category: 'utilities' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'convert' | 'organize' | 'secure' | 'utilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navigation />
      
      <HeroSection />

      {/* Tools Dashboard Studio Suite */}
      <section id="tools" className="py-20 lg:py-28 bg-background relative z-10 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <SectionEyebrow className="justify-center">STUDIO TOOLKIT SUITE</SectionEyebrow>
            <Reveal>
              <SectionHeading className="text-center">
                High-performance PDF micro-tools.
              </SectionHeading>
            </Reveal>
          </div>

          {/* Filtering and Search Controls */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 bg-card/80 border border-border rounded-2xl p-4 max-w-7xl mx-auto backdrop-blur-md shadow-sm">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'convert', label: 'Convert' },
                { id: 'organize', label: 'Organize' },
                { id: 'secure', label: 'Secure & Sign' },
                { id: 'utilities', label: 'Utilities' },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-foreground text-background shadow-xs font-bold'
                        : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 h-11 text-xs sm:text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-all text-foreground placeholder:text-muted-foreground font-sans shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground z-10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.map((tool, idx) => (
                <Reveal key={tool.title} delay={Math.min(idx * 25, 250)}>
                  <Link href={tool.href} className="group block h-full">
                    <StudioCard className="h-full flex flex-col justify-between p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background group-hover:border-foreground/40 transition-colors">
                            <tool.icon className="w-5 h-5 text-foreground stroke-[1.5]" />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-2 py-0.5 rounded-md">
                            {tool.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground font-display group-hover:text-muted-foreground transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                        <span>Launch Studio</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform group-hover:translate-x-1" />
                      </div>
                    </StudioCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl max-w-md mx-auto">
              <p className="text-sm font-medium text-foreground">No matching PDF tool found</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for alternative keywords like merge, compress, or OCR.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 px-4 py-1.5 text-xs font-mono bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
      <RecentFilesWidget />
    </main>
  );
}
