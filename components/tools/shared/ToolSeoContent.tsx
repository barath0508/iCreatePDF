import { CheckCircle2, HelpCircle, ListOrdered, ShieldCheck, Lock, Cpu, FileText, UserCheck, Globe, ArrowRight, BookOpen } from 'lucide-react';
import type { ToolContent } from '@/lib/tool-content';
import { howToSchema } from '@/lib/seo';
import { getToolTechSpec, getDynamicRelatedLinks } from '@/lib/tool-tech-specs';
import Link from 'next/link';

function generateToolJsonLd(content: ToolContent) {
  const cleanUrl = content.url.startsWith('/tools/') ? content.url.replace('/tools/', '/') : content.url;
  const fullUrl = `https://www.icreatepdf.online${cleanUrl}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': `${fullUrl}#software`,
        name: `${content.name} — iCreatePDF`,
        url: fullUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web Browser)',
        browserRequirements: 'Requires JavaScript and WebAssembly support',
        description: content.overview,
        image: 'https://www.icreatepdf.online/logo.png',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.icreatepdf.online/#organization',
          name: 'iCreatePDF',
          url: 'https://www.icreatepdf.online',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullUrl}#breadcrumb`,
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
            name: 'PDF Tools',
            item: 'https://www.icreatepdf.online/#tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.name,
            item: fullUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${fullUrl}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function ToolSeoContent({ content }: { content: ToolContent }) {
  const cleanSlug = content.url.replace(/^(\/|tools\/)/, '').replace(/\/$/, '');
  const techSpec = getToolTechSpec(cleanSlug, content.name, 'Utilities');
  const relatedLinks = getDynamicRelatedLinks(cleanSlug);
  const toolJsonLd = generateToolJsonLd(content);

  const hSchema = howToSchema({
    name: content.name,
    description: content.overview,
    url: content.url,
    steps: content.steps,
  });

  return (
    <section className="border-t border-foreground/10 py-16 relative z-10 bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hSchema) }}
      />

      <div className="max-w-[960px] mx-auto px-6 space-y-16">
        {/* Overview & Architecture */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider font-mono">
            <Cpu className="w-3.5 h-3.5" /> Technical Guide &amp; Operational Scope
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">
            About the {content.name} Engine
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed text-base">
            {content.overview}
          </p>
          <div className="p-4 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground leading-relaxed space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand" /> Zero-Server Privacy Architecture
            </p>
            <p>
              {techSpec.architectureBlurb}
            </p>
          </div>
        </div>

        {/* How to steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-brand" />
            How to {content.name} Step-by-Step
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.steps.map((step, i) => (
              <li key={step.title} id={`step-${i + 1}`} className="p-4 rounded-xl bg-card border border-border/60 space-y-2 scroll-mt-24">
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-brand text-brand-foreground text-xs font-mono font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Technical Specifications Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand" />
            Technical Specifications &amp; Engine Details
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border/80 bg-card">
            <table className="w-full text-xs text-left text-muted-foreground">
              <thead className="bg-muted/50 text-foreground text-[11px] font-mono uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Specification</th>
                  <th className="px-4 py-3 font-semibold">Implementation Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Supported Input Formats</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-foreground/90">{techSpec.inputFormats}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Output Format</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-foreground/90">{techSpec.outputFormat}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Underlying Client Engine</td>
                  <td className="px-4 py-2.5">{techSpec.engine}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Max Recommended File Size in RAM</td>
                  <td className="px-4 py-2.5">{techSpec.memoryLimit}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Network Security Standard</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-500">Zero Server Uploads (0 Bytes Transmitted across external networks)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Privacy &amp; Compliance</td>
                  <td className="px-4 py-2.5">100% In-Browser Sandbox (ISO 32000, GDPR &amp; HIPAA Safe)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Use Cases */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            Practical Use Cases &amp; Workflows
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.useCases.map((useCase) => (
              <li
                key={useCase}
                className="flex gap-2.5 text-xs text-muted-foreground leading-relaxed p-3.5 rounded-xl bg-card border border-border/60 hover:border-brand/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="p-4 sm:p-5 rounded-xl bg-card border border-border/60 hover:border-brand/30 transition-colors">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-brand font-mono text-xs">Q:</span> {faq.question}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial & E-E-A-T Transparency Footer Card */}
        <div className="p-6 rounded-2xl bg-card border border-brand/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand/10 text-brand">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-foreground">Editorial Quality &amp; Fact-Checking Standard</h3>
              <p className="text-[11px] text-muted-foreground font-mono">Verified by Barath R · Lead Software Engineer &amp; iCreatePDF Technical Team</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This technical documentation and interactive utility guide is published in compliance with Google Publisher Quality Guidelines, E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) principles, and web accessibility standards. For policy questions, visit our{' '}
            <Link href="/adsense-policy" className="text-brand hover:underline font-medium">AdSense Policy page</Link> or{' '}
            <Link href="/privacy" className="text-brand hover:underline font-medium">Privacy Policy</Link>.
          </p>
        </div>

        {/* Related Tools & Blog Guides Hub */}
        <div className="p-6 rounded-2xl bg-muted/30 border border-border/80 space-y-4">
          <h3 className="text-sm font-bold font-display text-foreground uppercase tracking-wider font-mono">
            Explore Related PDF Tools &amp; Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-3 rounded-lg bg-card border border-border hover:border-brand text-muted-foreground hover:text-foreground font-medium transition-colors inline-flex items-center justify-between group"
              >
                <span className="flex items-center gap-1.5 truncate">
                  {link.isTutorial && <BookOpen className="w-3.5 h-3.5 text-brand shrink-0" />}
                  <span className="truncate">{link.name}</span>
                </span>
                <ArrowRight className="w-3 h-3 text-brand shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

