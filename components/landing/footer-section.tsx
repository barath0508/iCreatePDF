'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Converters: [
    { name: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
    { name: 'PNG to PDF', href: '/tools/png-to-pdf' },
    { name: 'HEIC to PDF', href: '/tools/heic-to-pdf' },
    { name: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
    { name: 'Word to PDF', href: '/tools/word-to-pdf' },
    { name: 'Scan to PDF', href: '/tools/scan-to-pdf' },
    { name: 'TXT to PDF', href: '/tools/txt-to-pdf' },
    { name: 'HTML to PDF', href: '/tools/html-to-pdf' },
    { name: 'Markdown to PDF', href: '/tools/markdown-to-pdf' },
    { name: 'QR to PDF', href: '/tools/qr-to-pdf' },
    { name: 'Barcode to PDF', href: '/tools/barcode-to-pdf' },
    { name: 'PDF to Excel', href: '/tools/pdf-to-excel' },
    { name: 'Excel to PDF', href: '/tools/excel-to-pdf' },
  ],
  Utilities: [
    { name: 'Merge PDF', href: '/tools/merge-pdf' },
    { name: 'Split PDF', href: '/tools/split-pdf' },
    { name: 'Organize PDF', href: '/tools/organize-pdf' },
    { name: 'Rotate PDF', href: '/tools/rotate-pdf' },
    { name: 'Compress PDF', href: '/tools/compress-pdf' },
    { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
    { name: 'Protect PDF', href: '/tools/protect-pdf' },
    { name: 'Sign PDF', href: '/tools/sign-pdf' },
    { name: 'Edit PDF', href: '/tools/edit-pdf' },
    { name: 'PDF to Text', href: '/tools/pdf-to-text' },
    { name: 'Verify Signature', href: '/tools/verify-signature' },
    { name: 'Flatten PDF', href: '/tools/flatten-pdf' },
    { name: 'Grayscale PDF', href: '/tools/grayscale-pdf' },
    { name: 'Compare PDF', href: '/tools/compare-pdf' },
    { name: 'Redact PDF', href: '/tools/redact-pdf' },
    { name: 'Crop PDF', href: '/tools/crop-pdf' },
    { name: 'Extract Pages', href: '/tools/extract-pages' },
    { name: 'Repair PDF', href: '/tools/repair-pdf' },
    { name: 'PDF Metadata', href: '/tools/pdf-metadata' },
    { name: 'Header & Footer', href: '/tools/header-footer' },
    { name: 'Page Numbers', href: '/tools/add-page-numbers' },
    { name: 'Resize PDF', href: '/tools/resize-pdf' },
    { name: 'Bates Numbering', href: '/tools/bates-numbering' },
    { name: 'Invert PDF', href: '/tools/invert-pdf' },
    { name: 'Delete PDF Pages', href: '/tools/delete-pdf-pages' },
    { name: 'Watermark PDF', href: '/tools/watermark-pdf' },
    { name: 'Fillable PDF Builder', href: '/tools/fillable-pdf-builder' },
    { name: 'Bulk Certificates', href: '/tools/bulk-certificates' },
    { name: 'Certify PDF', href: '/tools/certify-pdf' },
    { name: 'Accessibility Checker', href: '/tools/pdf-accessibility-checker' },
    { name: 'PDF OCR', href: '/tools/pdf-ocr' },
    { name: 'Prevent Copy', href: '/tools/prevent-copy' },
    { name: 'Read Aloud PDF', href: '/tools/read-aloud-pdf' },
  ],
  Resources: [
    { name: 'Blog', href: '/blogs' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Why iCreatePDF', href: '/compare' },
    { name: 'iLovePDF Alternative', href: '/ilovepdf-alternative' },
    { name: 'Smallpdf Alternative', href: '/smallpdf-alternative' },
    { name: 'PDF24 Alternative', href: '/pdf24-alternative' },
    { name: 'No-Upload PDF Tools', href: '/no-upload-pdf-tools' },
    { name: 'Verify Offline Proof', href: '/blogs/proof-zero-server-uploads-how-to-verify-offline-pdf-converter' },
    { name: 'LLM Agents (llms.txt)', href: '/llms.txt' },
  ],
  'Legal & Languages': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'English (US)', href: '/' },
    { name: 'Español (Spanish)', href: '/es' },
    { name: 'हिन्दी (Hindi)', href: '/hi' },
    { name: 'தமிழ் (Tamil)', href: '/ta' },
  ],
};

const socialLinks = [
  { name: 'Website', href: '/' },
  { name: 'GitHub', href: '#' },
];

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-foreground border-t border-border">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group hover:opacity-90 transition-opacity">
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                  <Image src="/logo.svg" alt="iCreatePDF Logo" fill className="object-contain scale-[1.4]" />
                </div>
                <span className="font-semibold tracking-tight select-none text-foreground text-2xl font-display" style={{ letterSpacing: '-0.02em' }}>
                  iCreate<span className="text-brand">PDF</span>
                </span>
              </Link>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs text-sm">
                Fast, secure, and browser-based converter. Drag &amp; drop images, reorder, adjust sizes, and download your consolidated PDF instantly.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => {
              const isUtilities = title === 'Utilities';
              return (
                <div key={title} className={isUtilities ? 'col-span-1 sm:col-span-2' : 'col-span-1'}>
                  <h3 className="text-sm font-medium text-foreground mb-6">{title}</h3>
                  <ul className={isUtilities ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4' : 'space-y-4'}>
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/70">
            &copy; {currentYear} iCreatePDF. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              Privacy-First Sandbox Mode Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
