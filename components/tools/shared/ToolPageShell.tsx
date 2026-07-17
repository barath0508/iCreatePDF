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
      
      {/* Privacy & Technical Details Section */}
      <section className="border-t border-foreground/5 bg-foreground/[0.005] py-16 mt-20 relative z-10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl font-bold font-display text-foreground">
              {title}: Private, Browser-Based Processing
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Learn how the {title} tool securely compiles and edits your files directly inside your browser sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="p-1 rounded bg-brand/10 text-brand text-xs font-mono">🔒</span>
                Zero Server Uploads (100% Private)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                Your privacy is our highest priority. Unlike conventional online PDF converters that upload your sensitive documents to remote cloud storage servers, the {title} tool operates entirely inside your web browser's local sandbox. Your files are never transmitted across the network, ensuring absolute confidentiality for personal, legal, and financial documents.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="p-1 rounded bg-brand/10 text-brand text-xs font-mono">⚡</span>
                Powered by Local WebAssembly
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                We leverage cutting-edge browser technologies, including WebAssembly (Wasm) compiles of professional document engines and HTML5 canvas APIs, to power the {title} tool directly on your device's CPU. This local execution model provides instant processing speeds while bypassing slow internet upload and download queues.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="p-1 rounded bg-brand/10 text-brand text-xs font-mono">✨</span>
                No Limits, No Watermarks, No Sign-Up
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                The {title} tool comes with fully unrestricted access — no file size caps, daily usage limits, page count restrictions, or registration prompts. Every output is pristine quality without added branding or watermarks, making it ideal for both personal and professional workflows.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="p-1 rounded bg-brand/10 text-brand text-xs font-mono">🔌</span>
                Full Offline Capabilities
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                Since the {title} tool renders and processes everything client-side within your browser sandbox, it does not require an active internet connection to function. Once the page is loaded, you can safely disconnect your device and keep working offline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {extraSections}
      <FooterSection />
    </main>
  );
}
