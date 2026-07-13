import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import { FileText, ShieldCheck, Scale, Ban, AlertTriangle, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - iCreatePDF',
  description: 'Read the terms and conditions for using iCreatePDF, a free browser-based PDF converter and editor. All processing is done locally on your device.',
  alternates: buildAlternates('/terms'),
};

const sections = [
  {
    icon: ShieldCheck,
    title: '1. Acceptance of Terms',
    content: `By accessing and using iCreatePDF (the "Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or tools. These terms constitute a legally binding agreement between you and the operators of iCreatePDF.`,
  },
  {
    icon: Globe,
    title: '2. Description of Service',
    content: `iCreatePDF provides a web-based document processing suite to convert, merge, split, compress, edit, encrypt, decrypt, sign, verify, watermark, OCR, and otherwise manipulate PDF and document files. The Service is free to use for both personal and commercial purposes. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.`,
  },
  {
    icon: ShieldCheck,
    title: '3. Client-Side Processing Warranty',
    content: `All file processing operations—including document conversions, compression, editing, signature stamping, text extraction, and OCR—are executed entirely inside your local browser memory space using client-side JavaScript, WebAssembly, and local APIs.
    
    Your files, document data, and confidential information are never transmitted to, stored on, or processed by remote servers operated by iCreatePDF. You retain full ownership, copyright, and responsibility for any files you upload or process using the Service.`,
  },
  {
    icon: Ban,
    title: '4. User Conduct and Restrictions',
    content: `You agree to use the Service only for lawful purposes. You are strictly prohibited from:
• Using the Service to process files that violate third-party intellectual property, privacy, publicity, or other proprietary rights.
• Attempting to disrupt, overload, scan, or compromise the security and performance of the website infrastructure.
• Reverse engineering, decompiling, or disassembling any compiled client-side code, logic scripts, or WebAssembly modules of the Service, except to the extent permitted by applicable law.
• Scraping, crawling, or utilizing automated scripts to systematically harvest data or submit batch files to the site without express permission.`,
  },
  {
    icon: Scale,
    title: '5. Intellectual Property Rights',
    content: `The website design, layouts, codebases, illustrations, branding assets, custom-built tools, and content are the exclusive property of iCreatePDF and its contributors, protected under copyright, trademark, and other intellectual property laws.
    
    You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for its intended document-processing functions. You may not copy, reproduce, distribute, or create derivative works of our site materials without written consent.`,
  },
  {
    icon: AlertTriangle,
    title: '6. Disclaimer of Warranties',
    content: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.
    
    TO THE FULLEST EXTENT PERMISSIBLE UNDER LAW, ICREATEPDF DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, ACCURATE, ERROR-FREE, COMPATIBLE WITH ALL FILE TYPES, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.`,
  },
  {
    icon: Scale,
    title: '7. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ICREATEPDF, ITS DEVELOPERS, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES.
    
    THIS INCLUDES, BUT IS NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
  },
  {
    icon: Globe,
    title: '8. Governing Law',
    content: `These Terms of Service and any dispute arising out of or related to them shall be governed by and construed in accordance with the laws of the jurisdiction in which the operators of iCreatePDF reside, without regard to conflict of law provisions. Any legal action or proceeding shall be brought exclusively in the competent courts of that jurisdiction.`,
  },
  {
    icon: Mail,
    title: '9. Changes and Contact Information',
    content: `We reserve the right to update or modify these Terms of Service at any time. Changes will be posted directly on this page with an updated "Last updated" date. Your continued use of the website following the posting of modifications indicates your acceptance of the revised Terms.
    
    If you have any questions, feedback, or concerns regarding these Terms, please contact us at:
    
    crop0339@gmail.com`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Terms of Service' },
            ])
          ),
        }}
      />
      <Navigation />

      <main className="flex-1 w-full">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-6 pt-36 pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 tracking-wide uppercase font-mono">
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-display leading-tight">
            Terms of Service
          </h1>
          <p className="text-foreground/40 text-sm max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before using iCreatePDF. By accessing our services, you agree to comply with these terms.
          </p>
          <p className="text-xs text-foreground/30 font-mono">Effective date: May 26, 2026 · Last updated: July 11, 2026</p>
        </div>

        {/* Policy sections */}
        <div className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.title} className="p-6 rounded-2xl bg-card border border-foreground/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brand/10 border border-brand/20">
                    <Icon className="w-4 h-4 text-brand" />
                  </div>
                  <h2 className="text-base font-bold text-foreground font-display">{s.title}</h2>
                </div>
                <div className="text-sm text-foreground/60 leading-relaxed whitespace-pre-line pl-11">
                  {s.content}
                </div>
              </section>
            );
          })}

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-green-950/30 border border-emerald-500/20 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-foreground">Have questions about our Terms?</p>
            <a
              href="mailto:crop0339@gmail.com"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
            >
              crop0339@gmail.com
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
