import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, Shield, Key, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Password Protect and Unlock PDF Files Securely | iCreatePDF',
  description: 'Learn how to encrypt your PDF files with owner/user passwords and strip passwords from encrypted files 100% locally in your browser sandbox.',
  keywords: 'password protect pdf, protect pdf with password free, decrypt pdf online, unlock password protected pdf, local pdf encryption',
  alternates: buildAlternates('/blogs/how-to-password-protect-and-unlock-pdf'),
  openGraph: {
    title: 'How to Password Protect and Unlock PDF Files Securely',
    description: 'Protect confidential files or strip locks from document pages using local cryptography client-side.',
    type: 'article',
    publishedTime: '2026-05-29T00:00:00Z',
  },
};

export default function ProtectUnlockPdfBlog() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Password Protect and Unlock PDF Files Securely | iCreatePDF',
          description: 'Learn how to encrypt your PDF files with owner/user passwords and strip passwords from encrypted files 100% locally in your browser sandbox.',
          url: '/blogs/how-to-password-protect-and-unlock-pdf',
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
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full uppercase">Security &amp; Privacy</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Password Protect and Decrypt PDF Files Securely
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Protecting sensitive documents with password encryption is a necessity. Learn how to encrypt and decrypt PDF files client-side in the browser using local WebAssembly.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            When sharing financial reports, personal identities, or legal contracts, leaving files unprotected exposes them to data sniffing or unauthorized access. Standard PDF specifications allow locking files behind user passwords (to view) or owner passwords (to edit/print).
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand" />
            Why Local Encryption Matters
          </h2>
          <p>
            Standard online lock utilities upload your files and clear-text passwords to remote servers. This completely defeats the purpose of encryption: if their database is breached, your password and files are leaked. iCreatePDF resolves this by running the encryption block locally using WebAssembly routines—meaning your files and passwords never cross the network.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Key className="w-5 h-5 text-brand" />
            How to Password Protect a PDF
          </h2>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/protect-pdf" className="text-brand hover:underline">Protect PDF</Link> tool page.</li>
            <li>Drag in the document you want encrypted.</li>
            <li>Enter a strong password and confirm it in the validation box.</li>
            <li>Click <strong>Encrypt PDF</strong>.</li>
            <li>Download the secure password-protected file.</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4 font-display flex items-center gap-2">
            <Unlock className="w-5 h-5 text-brand" />
            How to Unlock a Password Protected PDF
          </h2>
          <p>
            If you need to strip encryption from a PDF file so it can be opened easily without typing the password every time:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 text-sm">
            <li>Go to the <Link href="/tools/unlock-pdf" className="text-brand hover:underline">Unlock PDF</Link> page.</li>
            <li>Upload the protected PDF file.</li>
            <li>Type the current password when prompted.</li>
            <li>Click <strong>Unlock PDF</strong>. The tool strips the password encryption block.</li>
            <li>Download the unprotected PDF.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Shield className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Secure Your Files</h4>
            <p className="text-xs text-foreground/50">Add 128-bit password locks to documents locally.</p>
            <Link href="/tools/protect-pdf" className="inline-block pt-2">
              <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-4 rounded-full">
                Protect PDF
              </Button>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3 text-center">
            <Unlock className="w-8 h-8 text-brand mx-auto" />
            <h4 className="font-bold font-display text-foreground text-sm">Decrypt Your Files</h4>
            <p className="text-xs text-foreground/50">Strip password encryption locks client-side.</p>
            <Link href="/tools/unlock-pdf" className="inline-block pt-2">
              <Button className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 font-medium text-xs px-4 rounded-full">
                Unlock PDF
              </Button>
            </Link>
          </div>
        </div>

        <RelatedPosts currentSlug="how-to-password-protect-and-unlock-pdf" />
      </article>

      <FooterSection />
    </div>
  );
}
