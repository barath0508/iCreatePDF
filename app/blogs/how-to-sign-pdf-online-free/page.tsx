import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const metadata: Metadata = {
  title: 'How to Add a Digital Signature to a PDF Online (Free) | iCreatePDF',
  description: 'Sign PDF documents online for free without uploading them to a server. Draw, type, or import your signature and save a signed copy locally.',
  keywords: 'how to sign pdf online free, add signature to pdf, digital signature pdf browser, sign pdf without uploading, e-sign pdf free 2026',
  alternates: buildAlternates('/blogs/how-to-sign-pdf-online-free'),
  openGraph: {
    title: 'How to Add a Digital Signature to a PDF — Free & No Upload',
    description: 'Sign any PDF document in seconds right inside your browser. No servers. No accounts.',
    type: 'article',
    publishedTime: '2026-05-20T00:00:00Z',
  },
};

const signatureTypes = [
  {
    type: 'Draw Signature',
    desc: 'Use your mouse, trackpad, or touch screen to draw your actual handwritten signature on a canvas.',
    best: 'Personal documents, informal agreements',
    icon: '✏️',
  },
  {
    type: 'Type Signature',
    desc: 'Type your name and choose from handwriting-style fonts to generate a signature automatically.',
    best: 'Quick sign-offs, professional correspondence',
    icon: 'T',
  },
  {
    type: 'Cryptographic (PKCS#7)',
    desc: 'A certificate-backed digital signature embedded in the PDF structure with verifiable identity.',
    best: 'Legal documents, contracts, official filings',
    icon: '🔐',
  },
];

export default function SignPdfBlogPost() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
          title: 'How to Add a Digital Signature to a PDF Online (Free) | iCreatePDF',
          description: 'Sign PDF documents online for free without uploading them to a server. Draw, type, or import your signature and save a signed copy locally.',
          url: '/blogs/how-to-sign-pdf-online-free',
          datePublished: '2026-05-20T00:00:00Z'
        })) }}
      />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 py-32 space-y-10 flex-1 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/40 hover:text-brand transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="space-y-4 border-b border-foreground/10 pb-8">
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase">Digital Signatures</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-display">
            How to Add a Digital Signature to a PDF Online — Free &amp; No Upload Required
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
            Signing PDFs should not require expensive software, cloud accounts, or sending your private documents to unknown servers. Here is how to do it entirely in your browser.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />May 20, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
          </div>
        </div>

        <div className="text-foreground/70 space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            In 2026, you should not have to pay $15/month for the privilege of signing a PDF. Whether you need to sign a rental agreement, an NDA, a school form, or a client contract, it can be done for free in under a minute using just your browser.
          </p>

          
          {/* Table of Contents */}
          <div className="p-6 rounded-2xl bg-card border border-foreground/10 space-y-3 my-6">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75 pl-1">
              <li>
                <Link href="#3-types-of-pdf-signatures-which-do-you-need" className="hover:text-brand transition-colors">
                  3 Types of PDF Signatures — Which Do You Need?
                </Link>
              </li>
              <li>
                <Link href="#step-by-step-sign-a-pdf-with-icreatepdf" className="hover:text-brand transition-colors">
                  Step-by-Step: Sign a PDF With iCreatePDF
                </Link>
              </li>
              <li>
                <Link href="#is-a-browser-based-signed-pdf-legally-valid" className="hover:text-brand transition-colors">
                  Is a Browser-Based Signed PDF Legally Valid?
                </Link>
              </li>
              <li>
                <Link href="#how-to-verify-a-signed-pdf" className="hover:text-brand transition-colors">
                  How to Verify a Signed PDF
                </Link>
              </li>
              <li>
                <Link href="#frequently-asked-questions" className="hover:text-brand transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

<h2 id="3-types-of-pdf-signatures-which-do-you-need" className="text-xl font-bold text-foreground pt-4 font-display">3 Types of PDF Signatures — Which Do You Need?</h2>
          <div className="space-y-4 my-4">
            {signatureTypes.map((s) => (
              <div key={s.type} className="p-4 rounded-xl bg-card border border-foreground/5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-lg shrink-0 font-bold text-brand">
                  {s.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-sm">{s.type}</h3>
                  <p className="text-xs text-foreground/50 leading-normal">{s.desc}</p>
                  <p className="text-[10px] text-brand font-mono uppercase tracking-wide">Best for: {s.best}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 my-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200 leading-relaxed">
              <strong>Important:</strong> A drawn or typed visual signature (e-signature) and a cryptographic digital signature are not the same thing legally. In most jurisdictions, both are valid for contracts, but only cryptographic signatures provide verifiable tamper-evidence. Check your jurisdiction's e-signature laws.
            </p>
          </div>

          <h2 id="step-by-step-sign-a-pdf-with-icreatepdf" className="text-xl font-bold text-foreground pt-4 font-display">Step-by-Step: Sign a PDF With iCreatePDF</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4 text-sm">
            <li>Go to <Link href="/tools/sign-pdf" className="text-brand hover:underline">iCreatePDF Sign PDF</Link>.</li>
            <li>Upload the PDF you need to sign.</li>
            <li>Click <strong className="text-foreground">Add Signature</strong> — choose to draw, type, or upload an image of your signature.</li>
            <li>Drag and resize the signature overlay to position it on the correct signature line.</li>
            <li>Add to additional pages if needed using the page selector.</li>
            <li>Click <strong className="text-foreground">Apply &amp; Download</strong> — the signature is burned into the PDF and ready to share.</li>
          </ol>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/10 border border-brand/20 my-6">
            <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>100% Private:</strong> Your document and signature are processed entirely in your browser. The signature canvas data never leaves your device — we have no server-side signature storage whatsoever.
            </p>
          </div>

          <h2 id="is-a-browser-based-signed-pdf-legally-valid" className="text-xl font-bold text-foreground pt-4 font-display">Is a Browser-Based Signed PDF Legally Valid?</h2>
          <p>
            In most countries — including the United States (ESIGN Act), European Union (eIDAS Regulation), United Kingdom, India, and Australia — electronic signatures on contracts are legally binding when both parties intend to be bound.
          </p>
          <p>
            The visual signature approach (draw/type) qualifies as a <strong className="text-foreground">Simple Electronic Signature (SES)</strong> under eIDAS and is valid for most everyday contracts, agreements, and acknowledgements. For high-value legal transactions requiring a Qualified Electronic Signature (QES), you would need a certificate from a Trust Service Provider (TSP).
          </p>

          <h2 id="how-to-verify-a-signed-pdf" className="text-xl font-bold text-foreground pt-4 font-display">How to Verify a Signed PDF</h2>
          <p>
            Once a document has been signed with a cryptographic certificate, you can verify its authenticity using iCreatePDF's <Link href="/tools/verify-signature" className="text-brand hover:underline">Verify Signature</Link> tool. It reads the embedded PKCS#7 signature block, extracts the signer identity and timestamp, and performs a byte-range integrity check — all locally in your browser.
          </p>

          <h2 id="frequently-asked-questions" className="text-xl font-bold text-foreground pt-4 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I sign a PDF on my phone?', a: 'Yes. iCreatePDF Sign PDF works on mobile browsers. Use the draw mode with your finger for a natural handwritten signature.' },
              { q: 'Can I add my signature image instead of drawing it?', a: 'Yes. You can upload a PNG image of your handwritten signature (ideally on a white or transparent background) and position it on the document.' },
              { q: 'Does signing a PDF lock it from editing?', a: 'The visual signature is burned into the PDF layer — you can still edit other parts if the PDF is not password-protected. Use the Protect PDF tool to restrict editing after signing.' },
              { q: 'Will the recipient be able to see my signature?', a: 'Absolutely. The signature is embedded as visible content on the specified page and position, viewable in any PDF reader.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-4 rounded-xl bg-card border border-foreground/5">
                <p className="text-sm font-bold text-foreground mb-1">{q}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 to-pink-950/20 border border-brand/20 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground font-display">Sign your PDF now — free &amp; private</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">Draw, type, or upload your signature. Files never leave your browser.</p>
          <Link href="/tools/sign-pdf">
            <Button className="bg-brand hover:bg-brand/90 text-foreground font-medium text-xs px-6 rounded-full group">
              Sign PDF Free
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RelatedPosts currentSlug="how-to-sign-pdf-online-free" />
      </article>

      <FooterSection />
    </div>
  );
}
