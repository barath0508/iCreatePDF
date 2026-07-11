'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Converters: [
    { name: 'JPG to PDF', href: '/jpg-to-pdf' },
    { name: 'PNG to PDF', href: '/png-to-pdf' },
    { name: 'HEIC to PDF', href: '/heic-to-pdf' },
    { name: 'PDF to JPG', href: '/pdf-to-jpg' },
    { name: 'Word to PDF', href: '/word-to-pdf' },
    { name: 'Scan to PDF', href: '/scan-to-pdf' },
    { name: 'TXT to PDF', href: '/txt-to-pdf' },
  ],
  Utilities: [
    { name: 'Merge PDF', href: '/merge-pdf' },
    { name: 'Split PDF', href: '/split-pdf' },
    { name: 'Rotate PDF', href: '/rotate-pdf' },
    { name: 'Compress PDF', href: '/compress-pdf' },
    { name: 'Unlock PDF', href: '/unlock-pdf' },
    { name: 'Protect PDF', href: '/protect-pdf' },
    { name: 'Sign PDF', href: '/sign-pdf' },
    { name: 'Edit PDF', href: '/edit-pdf' },
    { name: 'PDF to Text', href: '/pdf-to-text' },
    { name: 'Verify Signature', href: '/verify-signature' },
    { name: 'HTML to PDF', href: '/html-to-pdf' },
    { name: 'Markdown to PDF', href: '/markdown-to-pdf' },
    { name: 'Flatten PDF', href: '/flatten-pdf' },
    { name: 'Grayscale PDF', href: '/grayscale-pdf' },
    { name: 'Compare PDF', href: '/compare-pdf' },
    { name: 'Redact PDF', href: '/redact-pdf' },
    { name: 'Crop PDF', href: '/crop-pdf' },
    { name: 'Extract Pages', href: '/extract-pages' },
    { name: 'Repair PDF', href: '/repair-pdf' },
    { name: 'PDF Metadata', href: '/pdf-metadata' },
    { name: 'Header & Footer', href: '/header-footer' },
    { name: 'Page Numbers', href: '/add-page-numbers' },
    { name: 'Resize PDF', href: '/resize-pdf' },
    { name: 'Bates Numbering', href: '/bates-numbering' },
    { name: 'Invert PDF', href: '/invert-pdf' },
    { name: 'QR to PDF', href: '/qr-to-pdf' },
    { name: 'Barcode to PDF', href: '/barcode-to-pdf' },
    { name: 'Delete PDF Pages', href: '/delete-pdf-pages' },
  ],
  Resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Why iCreatePDF', href: '/compare' },
    { name: 'LLM Agents (llms.txt)', href: '/llms.txt' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
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
