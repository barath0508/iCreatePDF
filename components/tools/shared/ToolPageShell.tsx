import React from 'react';
import Navigation from '@/components/landing/navigation';
import FooterSection from '@/components/landing/footer-section';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ToolPageShellProps {
  title: string;
  description: string;
  badge?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  extraSections?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolPageShell({
  title,
  description,
  badge = 'CLIENT-SIDE PRIVACY ENGINE',
  canonicalPath = '/',
  jsonLd,
  extraSections,
  children,
}: ToolPageShellProps) {
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    operatingSystem: 'Web Browser',
    applicationCategory: 'BusinessApplication',
    url: `https://www.icreatepdf.online${canonicalPath}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.icreatepdf.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: `https://www.icreatepdf.online${canonicalPath}`,
      },
    ],
  };

  const activeJsonLd = jsonLd || defaultJsonLd;

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Navigation />

      <div className="pt-40 sm:pt-48 lg:pt-52 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2.5 text-sm font-mono text-muted-foreground pb-2 font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 stroke-[1.5]" />
          <span className="text-foreground font-semibold">{title}</span>
        </nav>

        {/* Tool Page Editorial Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs sm:text-sm font-mono font-bold text-foreground tracking-wider uppercase shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-foreground stroke-[2]" />
            <span>{badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground font-display leading-[1.08]">
            {title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Primary Interactive Tool Interface */}
        <div className="w-full">
          {children}
        </div>

        {/* Extra Educational / SEO Content Sections */}
        {extraSections && (
          <div className="w-full pt-10 border-t border-border/60">
            {extraSections}
          </div>
        )}
      </div>

      <FooterSection />
    </main>
  );
}

export default ToolPageShell;
