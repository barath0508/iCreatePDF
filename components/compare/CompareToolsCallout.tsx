'use client';

import React from 'react';
import Link from 'next/link';
import {
  Combine,
  Minimize2,
  FileText,
  FileImage,
  FileSignature,
  ScanText,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const TOP_TOOLS = [
  {
    name: 'Merge PDF',
    href: '/merge-pdf',
    icon: Combine,
    desc: 'No 25MB file caps. Combine multiple files in browser memory.',
  },
  {
    name: 'Compress PDF',
    href: '/compress-pdf',
    icon: Minimize2,
    desc: 'Multi-tier compression with zero server upload exposure.',
  },
  {
    name: 'Word to PDF',
    href: '/word-to-pdf',
    icon: FileText,
    desc: 'Instant in-browser DOCX rendering to PDF format.',
  },
  {
    name: 'PDF to JPG',
    href: '/pdf-to-jpg',
    icon: FileImage,
    desc: 'High-res page rasterization packaged into clean ZIPs.',
  },
  {
    name: 'Sign PDF',
    href: '/sign-pdf',
    icon: FileSignature,
    desc: 'Draw or stamp signatures without sending files to third parties.',
  },
  {
    name: 'PDF OCR',
    href: '/pdf-ocr',
    icon: ScanText,
    desc: 'Tesseract WebAssembly text extraction directly on your CPU.',
  },
];

export function CompareToolsCallout() {
  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-xl space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-[11px] font-mono font-bold text-brand uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Local &bull; No Uploads
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
          Ready to Switch to Private Processing?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Skip server rate-limits, hourly caps, and account paywalls. Start using any of our most popular browser-based tools right now:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {TOP_TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group p-4 rounded-2xl bg-background/60 hover:bg-background border border-border/80 hover:border-brand/40 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-foreground/5 group-hover:bg-brand/10 text-muted-foreground group-hover:text-brand transition-colors">
                  <tool.icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                {tool.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-2 text-center">
        <Link
          href="/#tools"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand hover:underline"
        >
          <span>Explore all 70+ free client-side PDF tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
