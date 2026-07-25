import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { FaqSection } from '@/components/landing/faq-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { ToolsFilter, ToolItem } from '@/components/landing/ToolsFilter';
import dynamic from 'next/dynamic';

// Heavy below-fold sections: dynamic import for code splitting (still SSR'd — correct pattern for Server Components)
const InfrastructureSection = dynamic(
  () => import('@/components/landing/infrastructure-section').then((m) => m.InfrastructureSection)
);
const SecuritySection = dynamic(
  () => import('@/components/landing/security-section').then((m) => m.SecuritySection)
);
// RecentFilesWidget is client-only (uses localStorage), wrapped in a client boundary
const RecentFilesWidget = dynamic(
  () => import('@/components/landing/RecentFilesWidget').then((m) => m.RecentFilesWidget),
  { loading: () => null }
);

const tools: ToolItem[] = [
  { iconName: 'Combine', title: 'Merge PDF', desc: 'Combine multiple PDF documents into a single file.', href: '/tools/merge-pdf', category: 'organize' },
  { iconName: 'Scissors', title: 'Split PDF', desc: 'Extract page ranges or split a PDF into separate files.', href: '/tools/split-pdf', category: 'organize' },
  { iconName: 'Sliders', title: 'Organize PDF', desc: 'Rearrange, rotate, or delete specific pages visually.', href: '/tools/organize-pdf', category: 'organize' },
  { iconName: 'Image', title: 'JPG to PDF', desc: 'Convert JPG, PNG, WEBP, HEIC images into a clean PDF.', href: '/tools/jpg-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'PNG to PDF', desc: 'Convert PNG images into high-quality PDF documents.', href: '/tools/png-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'HEIC to PDF', desc: 'Convert high-efficiency HEIC photos without uploading.', href: '/tools/heic-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'PDF to JPG', desc: 'Extract each PDF page as high-fidelity JPEG images.', href: '/tools/pdf-to-jpg', category: 'convert' },
  { iconName: 'FileText', title: 'Word to PDF', desc: 'Convert Word (.docx) documents into printable PDFs.', href: '/tools/word-to-pdf', category: 'convert' },
  { iconName: 'FileSpreadsheet', title: 'Excel to PDF', desc: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF tables.', href: '/tools/excel-to-pdf', category: 'convert' },
  { iconName: 'FileText', title: 'TXT to PDF', desc: 'Convert plain text files (.txt) into formatted PDFs.', href: '/tools/txt-to-pdf', category: 'convert' },
  { iconName: 'BookMarked', title: 'RIS to PDF', desc: 'Convert RIS citation files into formatted reference PDFs.', href: '/tools/ris-to-pdf', category: 'convert' },
  { iconName: 'Camera', title: 'Scan to PDF', desc: 'Capture document pages using camera and compile to PDF.', href: '/tools/scan-to-pdf', category: 'convert' },
  { iconName: 'Minimize2', title: 'Compress PDF', desc: 'Optimize PDF file size locally in your browser memory.', href: '/tools/compress-pdf', category: 'utilities' },
  { iconName: 'RotateCw', title: 'Rotate PDF', desc: 'Rotate PDF document pages clockwise individually or in bulk.', href: '/tools/rotate-pdf', category: 'organize' },
  { iconName: 'Shield', title: 'Protect PDF', desc: 'Encrypt PDF files with a secure password locally.', href: '/tools/protect-pdf', category: 'secure' },
  { iconName: 'Unlock', title: 'Unlock PDF', desc: 'Strip password encryption locks from PDF files client-side.', href: '/tools/unlock-pdf', category: 'secure' },
  { iconName: 'Copy', title: 'Prevent Copy', desc: 'Rasterize pages to disable text selection and highlighting.', href: '/tools/prevent-copy', category: 'secure' },
  { iconName: 'FileSearch', title: 'PDF OCR', desc: 'Extract text from scanned, non-copyable PDFs via Tesseract.', href: '/tools/pdf-ocr', category: 'utilities' },
  { iconName: 'Award', title: 'Bulk Certificates', desc: 'Generate customized PDF certificates from spreadsheets.', href: '/tools/bulk-certificates', category: 'convert' },
  { iconName: 'Type', title: 'Watermark PDF', desc: 'Stamp configurable text overlays on all pages of a PDF.', href: '/tools/watermark-pdf', category: 'utilities' },
  { iconName: 'Hash', title: 'Page Numbers', desc: 'Add page numbers with custom layout positioning.', href: '/tools/add-page-numbers', category: 'organize' },
  { iconName: 'FileSignature', title: 'Sign PDF', desc: 'Draw or type your signature and visually stamp on PDF.', href: '/tools/sign-pdf', category: 'secure' },
  { iconName: 'FileText', title: 'PDF to Text', desc: 'Extract structured text layouts from PDF files to TXT.', href: '/tools/pdf-to-text', category: 'utilities' },
  { iconName: 'Edit', title: 'Edit PDF', desc: 'Insert custom text annotations on top of PDF layouts.', href: '/tools/edit-pdf', category: 'utilities' },
  { iconName: 'Sliders', title: 'Fillable Form Builder', desc: 'Design interactive forms with fillable inputs and checkboxes.', href: '/tools/fillable-pdf-builder', category: 'utilities' },
  { iconName: 'ShieldCheck', title: 'Verify Signature', desc: 'Inspect digital certificates and verify signed PDF integrity.', href: '/tools/verify-signature', category: 'secure' },
  { iconName: 'Code', title: 'HTML to PDF', desc: 'Render HTML/CSS code templates into A4 PDF pages locally.', href: '/tools/html-to-pdf', category: 'convert' },
  { iconName: 'FileText', title: 'Markdown to PDF', desc: 'Write styled Markdown and compile to clean A4 PDFs.', href: '/tools/markdown-to-pdf', category: 'convert' },
  { iconName: 'Layers', title: 'Flatten PDF', desc: 'Merge forms and annotation layers into static read-only text.', href: '/tools/flatten-pdf', category: 'secure' },
  { iconName: 'Printer', title: 'Grayscale PDF', desc: 'Convert colorful PDF documents to black and white for printing.', href: '/tools/grayscale-pdf', category: 'utilities' },
  { iconName: 'Columns', title: 'Compare PDF', desc: 'Audit document differences side-by-side with synced scroll.', href: '/tools/compare-pdf', category: 'utilities' },
  { iconName: 'EyeOff', title: 'Redact PDF', desc: 'Draw black boxes over sensitive content — permanently burned.', href: '/tools/redact-pdf', category: 'secure' },
  { iconName: 'Crop', title: 'Crop PDF', desc: 'Trim scanner borders and excess whitespace from PDF margins.', href: '/tools/crop-pdf', category: 'organize' },
  { iconName: 'BookOpen', title: 'Extract Pages', desc: 'Pull specific pages or ranges into a standalone PDF.', href: '/tools/extract-pages', category: 'organize' },
  { iconName: 'Wrench', title: 'Repair PDF', desc: 'Recover corrupted PDF files by rebuilding cross-references.', href: '/tools/repair-pdf', category: 'utilities' },
  { iconName: 'Info', title: 'PDF Metadata', desc: 'View and edit hidden document properties: title, author, tags.', href: '/tools/pdf-metadata', category: 'utilities' },
  { iconName: 'AlignCenter', title: 'Header & Footer', desc: 'Stamp custom text at the top and bottom of every page.', href: '/tools/header-footer', category: 'organize' },
  { iconName: 'Maximize2', title: 'Resize PDF', desc: 'Normalize pages to A4, Letter, A3, Legal, or A5.', href: '/tools/resize-pdf', category: 'organize' },
  { iconName: 'BookMarked', title: 'Bates Numbering', desc: 'Sequential legal stamping with custom prefix and zero-padding.', href: '/tools/bates-numbering', category: 'organize' },
  { iconName: 'Moon', title: 'Invert PDF', desc: 'Pixel-invert every page for eye strain reduction in dark mode.', href: '/tools/invert-pdf', category: 'utilities' },
  { iconName: 'QrCode', title: 'QR to PDF', desc: 'Generate an A4 PDF with embedded QR code for URLs or text.', href: '/tools/qr-to-pdf', category: 'convert' },
  { iconName: 'Trash2', title: 'Delete Pages', desc: 'Remove individual pages or ranges from your PDF file.', href: '/tools/delete-pdf-pages', category: 'organize' },
  { iconName: 'Volume2', title: 'Read Aloud', desc: 'Listen to PDF text using browser speech synthesis.', href: '/tools/read-aloud-pdf', category: 'utilities' },
  { iconName: 'Stamp', title: 'Certify PDF', desc: 'Stamp SHA-256 fingerprint certificate QR code onto PDF.', href: '/tools/certify-pdf', category: 'secure' },
  { iconName: 'FileSpreadsheet', title: 'PDF to Excel', desc: 'Detect PDF tables and export as CSV spreadsheet files.', href: '/tools/pdf-to-excel', category: 'utilities' },
  { iconName: 'Accessibility', title: 'Accessibility Checker', desc: 'Audit PDF for screen-reader WCAG compliance and tagging.', href: '/tools/pdf-accessibility-checker', category: 'utilities' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* ItemList JSON-LD: structured data for all 46+ tools */}
      <Script
        id="tools-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'iCreatePDF Free Online PDF Tools',
            description: '46+ free browser-based PDF tools — no uploads, no sign-up, no limits.',
            url: 'https://www.icreatepdf.online',
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.title,
              url: `https://www.icreatepdf.online${tool.href}`,
              description: tool.desc,
            })),
          }),
        }}
      />
      <Navigation />

      <HeroSection />

      {/* Tools Dashboard Studio Suite */}
      <section id="tools" aria-label="PDF Tools Suite" className="py-20 lg:py-28 bg-background relative z-10 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <SectionEyebrow className="justify-center">STUDIO TOOLKIT SUITE</SectionEyebrow>
            <SectionHeading className="text-center">
              High-performance PDF micro-tools.
            </SectionHeading>
          </div>

          {/* Client island: filter controls + tool grid */}
          <ToolsFilter tools={tools} />
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
