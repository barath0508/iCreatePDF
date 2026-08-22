import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { FooterSection } from '@/components/landing/footer-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { ToolsFilter, ToolItem } from '@/components/landing/ToolsFilter';
import { FeaturedArticlesSection } from '@/components/landing/FeaturedArticlesSection';
import dynamic from 'next/dynamic';

// Heavy below-fold sections: dynamic import for code splitting
const HowItWorksSection = dynamic(
  () => import('@/components/landing/how-it-works-section').then((m) => m.HowItWorksSection)
);
const InfrastructureSection = dynamic(
  () => import('@/components/landing/infrastructure-section').then((m) => m.InfrastructureSection)
);
const SecuritySection = dynamic(
  () => import('@/components/landing/security-section').then((m) => m.SecuritySection)
);
const FaqSection = dynamic(
  () => import('@/components/landing/faq-section').then((m) => m.FaqSection)
);
const CtaSection = dynamic(
  () => import('@/components/landing/cta-section').then((m) => m.CtaSection)
);
// RecentFilesWidget is client-only (uses localStorage), wrapped in a client boundary
const RecentFilesWidget = dynamic(
  () => import('@/components/landing/RecentFilesWidget').then((m) => m.RecentFilesWidget),
  { loading: () => null }
);

const tools: ToolItem[] = [
  { iconName: 'Combine', title: 'Merge PDF', desc: 'Combine multiple PDF documents into a single file.', href: '/merge-pdf', category: 'organize' },
  { iconName: 'Scissors', title: 'Split PDF', desc: 'Extract page ranges or split a PDF into separate files.', href: '/split-pdf', category: 'organize' },
  { iconName: 'Sliders', title: 'Organize PDF', desc: 'Rearrange, rotate, or delete specific pages visually.', href: '/organize-pdf', category: 'organize' },
  { iconName: 'Image', title: 'JPG to PDF', desc: 'Convert JPG, PNG, WEBP, HEIC images into a clean PDF.', href: '/jpg-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'PNG to PDF', desc: 'Convert PNG images into high-quality PDF documents.', href: '/png-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'HEIC to PDF', desc: 'Convert high-efficiency HEIC photos without uploading.', href: '/heic-to-pdf', category: 'convert' },
  { iconName: 'FileImage', title: 'PDF to JPG', desc: 'Extract each PDF page as high-fidelity JPEG images.', href: '/pdf-to-jpg', category: 'convert' },
  { iconName: 'FileText', title: 'Word to PDF', desc: 'Convert Word (.docx) documents into printable PDFs.', href: '/word-to-pdf', category: 'convert' },
  { iconName: 'FileSpreadsheet', title: 'Excel to PDF', desc: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF tables.', href: '/excel-to-pdf', category: 'convert' },
  { iconName: 'FileText', title: 'TXT to PDF', desc: 'Convert plain text files (.txt) into formatted PDFs.', href: '/txt-to-pdf', category: 'convert' },
  { iconName: 'BookMarked', title: 'RIS to PDF', desc: 'Convert RIS citation files into formatted reference PDFs.', href: '/ris-to-pdf', category: 'convert' },
  { iconName: 'Camera', title: 'Scan to PDF', desc: 'Capture document pages using camera and compile to PDF.', href: '/scan-to-pdf', category: 'convert' },
  { iconName: 'Minimize2', title: 'Compress PDF', desc: 'Optimize PDF file size locally in your browser memory.', href: '/compress-pdf', category: 'utilities' },
  { iconName: 'RotateCw', title: 'Rotate PDF', desc: 'Rotate PDF document pages clockwise individually or in bulk.', href: '/rotate-pdf', category: 'organize' },
  { iconName: 'Shield', title: 'Protect PDF', desc: 'Encrypt PDF files with a secure password locally.', href: '/protect-pdf', category: 'secure' },
  { iconName: 'Unlock', title: 'Unlock PDF', desc: 'Strip password encryption locks from PDF files client-side.', href: '/unlock-pdf', category: 'secure' },
  { iconName: 'Copy', title: 'Prevent Copy', desc: 'Rasterize pages to disable text selection and highlighting.', href: '/prevent-copy', category: 'secure' },
  { iconName: 'FileSearch', title: 'PDF OCR', desc: 'Extract text from scanned, non-copyable PDFs via Tesseract.', href: '/pdf-ocr', category: 'utilities' },
  { iconName: 'Award', title: 'Bulk Certificates', desc: 'Generate customized PDF certificates from spreadsheets.', href: '/bulk-certificates', category: 'convert' },
  { iconName: 'Type', title: 'Watermark PDF', desc: 'Stamp configurable text overlays on all pages of a PDF.', href: '/watermark-pdf', category: 'utilities' },
  { iconName: 'Hash', title: 'Page Numbers', desc: 'Add page numbers with custom layout positioning.', href: '/add-page-numbers', category: 'organize' },
  { iconName: 'FileSignature', title: 'Sign PDF', desc: 'Draw or type your signature and visually stamp on PDF.', href: '/sign-pdf', category: 'secure' },
  { iconName: 'FileText', title: 'PDF to Text', desc: 'Extract structured text layouts from PDF files to TXT.', href: '/pdf-to-text', category: 'utilities' },
  { iconName: 'Edit', title: 'Edit PDF', desc: 'Insert custom text annotations on top of PDF layouts.', href: '/edit-pdf', category: 'utilities' },
  { iconName: 'Sliders', title: 'Fillable Form Builder', desc: 'Design interactive forms with fillable inputs and checkboxes.', href: '/fillable-pdf-builder', category: 'utilities' },
  { iconName: 'ShieldCheck', title: 'Verify Signature', desc: 'Inspect digital certificates and verify signed PDF integrity.', href: '/verify-signature', category: 'secure' },
  { iconName: 'Code', title: 'HTML to PDF', desc: 'Render HTML/CSS code templates into A4 PDF pages locally.', href: '/html-to-pdf', category: 'convert' },
  { iconName: 'FileText', title: 'Markdown to PDF', desc: 'Write styled Markdown and compile to clean A4 PDFs.', href: '/markdown-to-pdf', category: 'convert' },
  { iconName: 'Layers', title: 'Flatten PDF', desc: 'Merge forms and annotation layers into static read-only text.', href: '/flatten-pdf', category: 'secure' },
  { iconName: 'Printer', title: 'Grayscale PDF', desc: 'Convert colorful PDF documents to black and white for printing.', href: '/grayscale-pdf', category: 'utilities' },
  { iconName: 'Columns', title: 'Compare PDF', desc: 'Audit document differences side-by-side with synced scroll.', href: '/compare-pdf', category: 'utilities' },
  { iconName: 'EyeOff', title: 'Redact PDF', desc: 'Draw black boxes over sensitive content — permanently burned.', href: '/redact-pdf', category: 'secure' },
  { iconName: 'Crop', title: 'Crop PDF', desc: 'Trim scanner borders and excess whitespace from PDF margins.', href: '/crop-pdf', category: 'organize' },
  { iconName: 'BookOpen', title: 'Extract Pages', desc: 'Pull specific pages or ranges into a standalone PDF.', href: '/extract-pages', category: 'organize' },
  { iconName: 'Wrench', title: 'Repair PDF', desc: 'Recover corrupted PDF files by rebuilding cross-references.', href: '/repair-pdf', category: 'utilities' },
  { iconName: 'Info', title: 'PDF Metadata', desc: 'View and edit hidden document properties: title, author, tags.', href: '/pdf-metadata', category: 'utilities' },
  { iconName: 'AlignCenter', title: 'Header & Footer', desc: 'Stamp custom text at the top and bottom of every page.', href: '/header-footer', category: 'organize' },
  { iconName: 'Maximize2', title: 'Resize PDF', desc: 'Normalize pages to A4, Letter, A3, Legal, or A5.', href: '/resize-pdf', category: 'organize' },
  { iconName: 'BookMarked', title: 'Bates Numbering', desc: 'Sequential legal stamping with custom prefix and zero-padding.', href: '/bates-numbering', category: 'organize' },
  { iconName: 'Moon', title: 'Invert PDF', desc: 'Pixel-invert every page for eye strain reduction in dark mode.', href: '/invert-pdf', category: 'utilities' },
  { iconName: 'QrCode', title: 'QR to PDF', desc: 'Generate an A4 PDF with embedded QR code for URLs or text.', href: '/qr-to-pdf', category: 'convert' },
  { iconName: 'Trash2', title: 'Delete Pages', desc: 'Remove individual pages or ranges from your PDF file.', href: '/delete-pdf-pages', category: 'organize' },
  { iconName: 'Volume2', title: 'Read Aloud', desc: 'Listen to PDF text using browser speech synthesis.', href: '/read-aloud-pdf', category: 'utilities' },
  { iconName: 'Stamp', title: 'Certify PDF', desc: 'Stamp SHA-256 fingerprint certificate QR code onto PDF.', href: '/certify-pdf', category: 'secure' },
  { iconName: 'FileSpreadsheet', title: 'PDF to Excel', desc: 'Detect PDF tables and export as CSV spreadsheet files.', href: '/pdf-to-excel', category: 'utilities' },
  { iconName: 'Accessibility', title: 'Accessibility Checker', desc: 'Audit PDF for screen-reader WCAG compliance and tagging.', href: '/pdf-accessibility-checker', category: 'utilities' },
  { iconName: 'LayoutGrid', title: 'N-up PDF', desc: 'Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet.', href: '/n-up-pdf', category: 'organize' },
  { iconName: 'BookOpen', title: 'Booklet Maker', desc: 'Convert PDF into saddle-stitch booklet for double-sided printing.', href: '/booklet-pdf', category: 'organize' },
  { iconName: 'Maximize2', title: 'Adjust Margins', desc: 'Add extra border padding for hole punching or margin notes.', href: '/adjust-pdf-margins', category: 'organize' },
  { iconName: 'Columns', title: 'Equalize Page Sizes', desc: 'Standardize mixed Letter, Legal, and A4 pages into a uniform size.', href: '/equalize-pdf-page-sizes', category: 'organize' },
  { iconName: 'FileText', title: 'PDF to Word', desc: 'Extract structured text and headings into editable Word (.docx) files.', href: '/pdf-to-word', category: 'convert' },
  { iconName: 'Image', title: 'Extract Images', desc: 'Extract embedded photos and raster graphics into a ZIP file.', href: '/extract-pdf-images', category: 'utilities' },
  { iconName: 'FileSpreadsheet', title: 'Export Form Data', desc: 'Extract filled AcroForm fields into CSV spreadsheets.', href: '/export-pdf-form-data', category: 'utilities' },
  { iconName: 'Volume2', title: 'PDF to Audio', desc: 'Listen to PDF document text using speech synthesis.', href: '/pdf-to-audio', category: 'utilities' },
  { iconName: 'Stamp', title: 'Batch Rubber Stamp', desc: 'Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status text.', href: '/stamp-pdf', category: 'secure' },
  { iconName: 'Moon', title: 'PDF Reading Themes', desc: 'Apply Sepia, Warm Amber, Soft Mint, or Dark filters.', href: '/pdf-reading-themes', category: 'utilities' },
  { iconName: 'ShieldCheck', title: 'Security Auditor', desc: 'Audit PDF encryption strength (AES-128/256) and permissions.', href: '/pdf-security-auditor', category: 'secure' },
  { iconName: 'BookMarked', title: 'PDF TOC Builder', desc: 'Add, edit, or reorganize clickable outline bookmarks.', href: '/pdf-toc-builder', category: 'organize' },
  { iconName: 'BookOpen', title: 'EPUB to PDF', desc: 'Convert EPUB eBook files into clean, printable PDF documents.', href: '/epub-to-pdf', category: 'convert' },
  { iconName: 'Code', title: 'SVG to PDF', desc: 'Convert Scalable Vector Graphics (.svg) into vector PDFs.', href: '/svg-to-pdf', category: 'convert' },
  { iconName: 'FileSpreadsheet', title: 'CSV to PDF', desc: 'Convert CSV data sheets directly into formatted PDF tables.', href: '/csv-to-pdf', category: 'convert' },
  { iconName: 'ShieldAlert', title: 'Auto-Redact PDF', desc: 'Scan & redact sensitive PII (SSNs, emails, credit cards) automatically.', href: '/auto-redact-pdf', category: 'secure' },
  { iconName: 'Paperclip', title: 'PDF Attachment Manager', desc: 'Extract ZUGFeRD e-invoices or embed files inside PDF containers.', href: '/pdf-attachment-manager', category: 'utilities' },
  { iconName: 'SplitSquareVertical', title: 'PDF Visual Diff', desc: 'Audit document revisions with visual pixel diff curtain sliders.', href: '/pdf-visual-diff', category: 'utilities' },
  { iconName: 'BookOpen', title: '3D PDF Flipbook', desc: 'Turn PDF e-books and brochures into 3D double-page flipbooks.', href: '/pdf-3d-flipbook', category: 'utilities' },
  { iconName: 'Monitor', title: 'PDF Presentation Mode', desc: 'Present slides with digital laser pointer, pen annotations & timer.', href: '/pdf-presentation-mode', category: 'utilities' },
  { iconName: 'Crop', title: 'Auto-Crop PDF', desc: 'Detect and trim blank margins and scanner borders automatically.', href: '/auto-crop-pdf', category: 'organize' },
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
      <FeaturedArticlesSection />
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
