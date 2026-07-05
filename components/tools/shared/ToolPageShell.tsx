import React from 'react';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';

interface ToolPageShellProps {
  /** Short badge label shown above the title (e.g. "PDF Merger") */
  badge: string;
  /** Main h1 heading */
  title: string;
  /** Description paragraph below the heading */
  description: string;
  /** JSON-LD structured data objects to inject */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Extra sections rendered after children (e.g. FeaturesSection for scan-to-pdf) */
  extraSections?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolPageShell({
  badge,
  title,
  description,
  jsonLd,
  extraSections,
  children,
}: ToolPageShellProps) {
  // Flatten jsonLd into an array of objects for rendering
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navigation />
      <div className="pt-24 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand tracking-wide uppercase font-mono">
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-display">
            {title}
          </h1>
          <p className="text-foreground/40 text-sm max-w-xl mx-auto">
            {description}
          </p>
        </div>
        {children}
      </div>
      {extraSections}
      <FooterSection />
    </main>
  );
}
