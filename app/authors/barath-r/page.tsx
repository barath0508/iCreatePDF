import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Code2, Cpu, Lock, Award, Mail, ExternalLink, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Barath R — Lead Developer & Creator | iCreatePDF',
  description: 'Learn about Barath R, the software engineer and creator behind iCreatePDF. Discover his background in WebAssembly, browser sandboxing, and private document processing.',
  keywords: 'Barath R, iCreatePDF creator, lead developer iCreatePDF, client side pdf engineer, privacy first developer',
  alternates: buildAlternates('/authors/barath-r'),
  openGraph: {
    title: 'Barath R — Lead Developer & Creator | iCreatePDF',
    description: 'Software engineer and privacy advocate behind iCreatePDF. Specialized in client-side WebAssembly, in-browser PDF manipulation, and zero-knowledge architectures.',
    type: 'profile',
  },
};

const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.icreatepdf.online/authors/barath-r#person',
  name: 'Barath R',
  jobTitle: 'Lead Software Engineer & Creator',
  worksFor: {
    '@type': 'Organization',
    name: 'iCreatePDF',
    url: 'https://www.icreatepdf.online',
  },
  url: 'https://www.icreatepdf.online/authors/barath-r',
  image: 'https://www.icreatepdf.online/logo.png',
  description: 'Software engineer and creator of iCreatePDF, specializing in client-side WebAssembly architectures, browser sandboxing, and private document processing tools.',
  knowsAbout: [
    'WebAssembly (WASM)',
    'Client-Side PDF Manipulation (ISO 32000)',
    'Browser Sandboxing & Memory Security',
    'HTML5 Canvas Rasterization',
    'Zero-Knowledge Web Architectures',
    'Optical Character Recognition (OCR)',
    'TypeScript & Next.js Performance Engineering'
  ],
  sameAs: [
    'https://github.com/barath0508',
    'https://www.icreatepdf.online/about'
  ]
};

const featuredArticles = [
  {
    title: 'How to Merge Multiple PDFs into One File — Free & Private',
    slug: 'how-to-merge-pdf-files-free',
    category: 'Document Management',
    readTime: '4 min read',
  },
  {
    title: 'How to Compress PDF to 200KB Online Free (For Government & Job Portals)',
    slug: 'how-to-compress-pdf-to-200kb-online',
    category: 'Document Optimization',
    readTime: '5 min read',
  },
  {
    title: 'Proof of Zero Server Uploads: How to Verify In-Browser PDF Privacy',
    slug: 'proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
    category: 'Security & Privacy',
    readTime: '6 min read',
  },
  {
    title: 'How to Split PDF Files Online for Free (Separate & Extract Pages)',
    slug: 'how-to-split-pdf-files',
    category: 'Document Management',
    readTime: '4 min read',
  },
];

export default function AuthorBarathPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Authors' },
              { name: 'Barath R' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorSchema),
        }}
      />
      <Navigation />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Profile Header */}
        <section className="p-8 sm:p-10 rounded-3xl bg-card border border-foreground/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand text-2xl font-bold font-mono shrink-0 shadow-inner">
              BR
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-semibold font-mono uppercase tracking-wide">
                <Sparkles className="w-3 h-3" /> Author &amp; Lead Engineer
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-foreground">
                Barath R
              </h1>
              <p className="text-sm text-foreground/60 leading-relaxed font-mono">
                Creator of iCreatePDF · Full-Stack Web Engineer · Privacy &amp; WebAssembly Specialist
              </p>
            </div>
          </div>

          <div className="border-t border-foreground/5 pt-6 text-sm text-foreground/75 leading-relaxed space-y-4">
            <p>
              Hi, I&apos;m Barath. I am a software engineer dedicated to building high-performance, privacy-respecting web applications. Over the past several years, I have focused extensively on modern browser capabilities—specifically <strong>WebAssembly (WASM)</strong>, <strong>HTML5 Canvas rendering</strong>, and <strong>client-side cryptographic sandboxing</strong>.
            </p>
            <p>
              I created <strong>iCreatePDF</strong> out of personal frustration with the traditional online document industry. Almost every commercial PDF converter forces users to upload confidential contracts, tax returns, bank statements, and medical records to remote cloud servers—often locking downloads behind paywalls, adding watermarks, or retaining uploaded documents on mysterious storage clusters.
            </p>
            <p>
              My engineering philosophy is simple: <em>computation should happen where the data already lives</em>. By shifting document manipulation from expensive, privacy-risky cloud servers directly into the user&apos;s browser sandbox, we can deliver faster, completely free, and genuinely private PDF tools for students, professionals, and privacy-minded users worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="sm" variant="outline" className="text-xs font-mono">
              <a href="mailto:crop0339@gmail.com">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-brand" /> crop0339@gmail.com
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="text-xs font-mono">
              <a href="https://github.com/barath0508" target="_blank" rel="noopener noreferrer">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-brand" /> GitHub Profile
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="text-xs font-mono">
              <Link href="/editorial-policy">
                <Award className="w-3.5 h-3.5 mr-1.5 text-brand" /> Editorial Standards
              </Link>
            </Button>
          </div>
        </section>

        {/* Technical Competencies */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand" /> Technical Expertise &amp; Focus Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'PDF Specification (ISO 32000)',
                desc: 'Deep familiarity with cross-reference tables, object streams, linearized document layouts, and AcroForm interactive form dictionaries.',
              },
              {
                title: 'Client-Side WebAssembly (WASM)',
                desc: 'Compiling low-level document parsers and graphic libraries to run inside browser V8 and SpiderMonkey virtual machines with zero latency.',
              },
              {
                title: 'Browser Memory & Sandboxing',
                desc: 'Managing chunked ArrayBuffer allocations, garbage collection cycles, and memory constraints across desktop and mobile devices.',
              },
              {
                title: 'Zero-Knowledge Privacy Architectures',
                desc: 'Architecting web tools where zero customer document bytes ever cross network interfaces or hit external logging infrastructure.',
              },
            ].map((skill, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-card border border-foreground/5 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {skill.title}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Standards & Integrity */}
        <section className="space-y-4 p-8 rounded-3xl bg-brand/5 border border-brand/15">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand" /> Author Commitments &amp; Testing Methodology
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Every technical tutorial, benchmark, and troubleshooting guide authored by Barath R is rooted in real-world testing. Before publishing:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground/65 list-disc pl-5 leading-relaxed">
            <li><strong>Hands-on Verification:</strong> All steps are independently executed across Chrome, Firefox, Safari, and Edge on multiple operating systems (macOS, Windows, iOS, Android).</li>
            <li><strong>Code Integrity:</strong> Underlying client-side algorithms are stress-tested against corrupt PDF headers, password-locked files, and memory limits.</li>
            <li><strong>Accuracy &amp; Freshness:</strong> Guides are updated periodically to account for new browser standards, ECMAScript specifications, and evolving PDF specifications.</li>
          </ul>
        </section>

        {/* Selected Articles */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand" /> Articles &amp; Technical Guides by Barath R
            </h2>
            <Link href="/blogs" className="text-xs font-semibold text-brand hover:underline font-mono">
              View All 70+ Guides &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {featuredArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/blogs/${art.slug}`}
                className="block p-5 rounded-2xl bg-card border border-foreground/5 hover:border-brand/40 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand">
                      {art.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-brand transition-colors">
                      {art.title}
                    </h3>
                  </div>
                  <span className="text-xs text-foreground/40 font-mono shrink-0">
                    {art.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <FooterSection />
    </main>
  );
}
