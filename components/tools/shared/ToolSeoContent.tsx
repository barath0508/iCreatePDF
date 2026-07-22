import { CheckCircle2, HelpCircle, ListOrdered } from 'lucide-react';
import type { ToolContent } from '@/lib/tool-content';
import { howToSchema } from '@/lib/seo';

function faqSchema(content: ToolContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function ToolSeoContent({ content }: { content: ToolContent }) {
  const hSchema = howToSchema({
    name: content.name,
    description: content.overview,
    url: content.url,
    steps: content.steps,
  });

  return (
    <section className="border-t border-foreground/5 py-16 relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(content)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hSchema) }}
      />

      <div className="max-w-[900px] mx-auto px-6 space-y-16">
        {/* Overview */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-display text-foreground">
            About the {content.name} Tool
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content.overview}
          </p>
        </div>

        {/* How to steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-brand" />
            How to {content.name}
          </h2>
          <ol className="space-y-4">
            {content.steps.map((step, i) => (
              <li key={step.title} id={`step-${i + 1}`} className="flex gap-4 scroll-mt-24">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Use cases */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            Common Use Cases
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.useCases.map((useCase) => (
              <li
                key={useCase}
                className="flex gap-2 text-xs text-muted-foreground leading-relaxed p-3 rounded-xl bg-foreground/[0.02] border border-foreground/5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{faq.question}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
