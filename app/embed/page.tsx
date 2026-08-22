import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ShieldCheck, Code2, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Embed Free PDF Tools on Your Website | iCreatePDF Widgets',
  description: 'Add free client-side PDF compression, merging, and conversion widgets to your blog, school portal, or web application. 100% private with zero server uploads.',
  keywords: 'embed pdf tool, pdf widget, free pdf converter widget, embed pdf compressor, icreatepdf widget',
  alternates: buildAlternates('/embed'),
};

export default function EmbedWidgetPage() {
  const embedCode1 = `<iframe src="https://icreatepdf.online/tools/compress-pdf" width="100%" height="520" frameborder="0" style="border-radius:12px;border:1px solid #333;" title="iCreatePDF Compress Tool"></iframe>
<p style="font-size:12px;color:#888;margin-top:6px;font-family:sans-serif;">
  Free client-side tool provided by <a href="https://icreatepdf.online" target="_blank" style="color:#a855f7;text-decoration:none;font-weight:600;">iCreatePDF (100% Private PDF Tools)</a>
</p>`;

  const embedCode2 = `<iframe src="https://icreatepdf.online/tools/merge-pdf" width="100%" height="520" frameborder="0" style="border-radius:12px;border:1px solid #333;" title="iCreatePDF Merge Tool"></iframe>
<p style="font-size:12px;color:#888;margin-top:6px;font-family:sans-serif;">
  Free client-side tool provided by <a href="https://icreatepdf.online" target="_blank" style="color:#a855f7;text-decoration:none;font-weight:600;">iCreatePDF (100% Private PDF Tools)</a>
</p>`;

  const badgeCode1 = `<a href="https://icreatepdf.online" target="_blank" rel="noopener" title="100% Private Client-Side PDF Tools">
  <img src="https://img.shields.io/badge/Powered%20by-iCreatePDF-a855f7?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Powered by iCreatePDF" />
</a>`;

  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col justify-between selection:bg-brand/30">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-32 space-y-12 flex-1 w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-semibold text-brand">
            <Sparkles className="w-3.5 h-3.5" />
            Webmaster &amp; Developer Tools
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-foreground">
            Embed Free PDF Tools on Your Website
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Give your visitors instant, private PDF utilities directly on your blog, university portal, or company intranet. Zero server configuration required.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
              🔒
            </div>
            <h3 className="text-sm font-bold text-foreground">100% Client-Side</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Files process in user memory. No documents are sent to any external server.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-foreground">Zero Maintenance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drop the iframe snippet onto any HTML page, WordPress, Webflow, or Notion site.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
              ✨
            </div>
            <h3 className="text-sm font-bold text-foreground">Free Forever</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No API keys, no usage limits, no credit card required for your visitors.
            </p>
          </div>
        </div>

        {/* Widget 1: Compress PDF */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display text-foreground">1. Embed "Compress PDF" Widget</h2>
              <p className="text-xs text-muted-foreground">Allows visitors to reduce PDF file sizes directly on your page.</p>
            </div>
            <Link href="/compress-pdf" target="_blank" className="text-xs text-brand hover:underline flex items-center gap-1">
              Preview Tool <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-purple-200 overflow-x-auto font-mono leading-relaxed">
              <code>{embedCode1}</code>
            </pre>
          </div>
        </div>

        {/* Widget 2: Merge PDF */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display text-foreground">2. Embed "Merge PDF" Widget</h2>
              <p className="text-xs text-muted-foreground">Allows visitors to combine multiple PDF files into one.</p>
            </div>
            <Link href="/merge-pdf" target="_blank" className="text-xs text-brand hover:underline flex items-center gap-1">
              Preview Tool <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-purple-200 overflow-x-auto font-mono leading-relaxed">
              <code>{embedCode2}</code>
            </pre>
          </div>
        </div>

        {/* Badge: Powered By */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-foreground">3. "Powered by iCreatePDF" Markdown &amp; HTML Badge</h2>
            <p className="text-xs text-muted-foreground">For GitHub READMEs, open-source projects, and student resource websites.</p>
          </div>

          <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center gap-3">
            <img src="https://img.shields.io/badge/Powered%20by-iCreatePDF-a855f7?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Preview Badge" />
            <span className="text-xs text-muted-foreground">&larr; Live badge preview</span>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-purple-200 overflow-x-auto font-mono leading-relaxed">
              <code>{badgeCode1}</code>
            </pre>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/30 to-pink-950/30 border border-brand/20 text-center space-y-3">
          <h3 className="text-xl font-bold font-display text-foreground">Need a custom widget integration?</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            All 70+ iCreatePDF tools can be embedded seamlessly. Contact our engineering team for specialized enterprise or educational portal styling.
          </p>
          <Link href="/contact">
            <Button className="bg-brand hover:bg-brand/90 text-foreground text-xs font-semibold px-6 rounded-full mt-2">
              Contact Developer Support
            </Button>
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
