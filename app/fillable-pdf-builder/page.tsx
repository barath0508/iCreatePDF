import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { FillableFormBuilderTool } from '@/components/tools/FillableFormBuilderTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Create PDF Form: Best Free Fillable PDF Form Creator | iCreatePDF',
  description: 'Create interactive, fillable PDF forms online. The best free fillable PDF form creator. Add text inputs, checkboxes, and dropdowns 100% locally and privately.',
  keywords: 'create pdf form, best free fillable pdf form creator, pdf fillable form free, free pdf fillable forms, free fillable pdf form creator, fillable pdf free, free fill forms, create fillable pdf form, pdf form generator, create fillable pdf free, fillable pdf builder, interactive form builder, create fillable pdf online free, pdf form creator offline, client side pdf fields',
  alternates: buildAlternates('/fillable-pdf-builder'),
  openGraph: {
    title: 'Create PDF Form: Best Free Fillable PDF Form Creator | iCreatePDF',
    description: 'Create interactive, fillable PDF forms online. The best free fillable PDF form creator. Add text inputs, checkboxes, and dropdowns 100% locally and privately.',
    type: 'website',
  }
};

export default function FillablePdfBuilderPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Interactive Fillable PDF Form Builder',
        description: 'Create interactive, fillable PDF forms client-side for free. Overlay text inputs, checkboxes, dropdown selectors, and radio options locally in your browser.',
        url: '/fillable-pdf-builder',
      })}
      badge="Form Engine"
      title="Fillable PDF Form Builder"
      description="Design interactive, fillable PDF forms. Position text fields, dropdown lists, checkboxes, and radio choices locally."
      extraSections={
        <>
          <ToolSeoContent content={toolContent['fillable-pdf-builder']} />
          <section className="border-t border-foreground/5 py-12 bg-foreground/[0.005]">
            <div className="max-w-[900px] mx-auto px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need a detailed step-by-step walkthrough? Read our guide on{' '}
                <a href="/blog/how-to-create-fillable-pdf-forms-free" className="text-brand hover:underline font-semibold">
                  How to Create Fillable PDF Forms Free Online
                </a>.
              </p>
            </div>
          </section>
        </>
      }
    >
      <FillableFormBuilderTool />
    </ToolPageShell>
  );
}
