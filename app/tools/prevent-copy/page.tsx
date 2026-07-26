import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PreventCopyTool } from '@/components/tools/PreventCopyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Make PDF Non-Copyable Online Free — Prevent PDF Copy (No Copy PDF) | iCreatePDF',
  description: 'Make PDF non-copyable free online. Disable text selection, highlighting, and copying by rasterizing PDF pages locally. 100% private in-browser tool.',
  keywords: 'make pdf not copyable, no copy pdf, prevent pdf copy, make pdf non-copyable, disable text selection pdf, protect pdf from copying, rasterize pdf online free, copy proof pdf, make pdf text non selectable',
  alternates: buildAlternates('/tools/prevent-copy'),
  openGraph: {
    title: 'Make PDF Non-Copyable Online Free — Prevent PDF Copy | iCreatePDF',
    description: 'Make PDF non-copyable free online. Disable text selection, highlighting, and copying by rasterizing PDF pages locally. 100% private.',
    type: 'website',
  }
};

export default function PreventCopyPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Make PDF Non-Copyable (Prevent Copy)',
          description: 'Make PDF non-copyable free online. Prevent text copying, text selection, and extraction from your PDF files by rasterizing pages client-side.',
          url: '/tools/prevent-copy',
        }),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I make a PDF non-copyable for free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Select or drag your PDF into the tool. It flattens all text layers into rasterized high-resolution images, disabling text highlighting and copy-pasting.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can someone copy text from a no-copy PDF created here?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Standard PDF text selection and copy commands will not function because the document is converted into image canvas layers.',
              },
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Make a PDF Non-Copyable',
          step: [
            { '@type': 'HowToStep', text: 'Upload or drop your PDF document into the browser converter.' },
            { '@type': 'HowToStep', text: 'Choose your preferred image quality resolution.' },
            { '@type': 'HowToStep', text: 'Click Flatten & Prevent Copy to download your non-copyable PDF.' },
          ],
        },
      ]}
      badge="Security"
      title="Make PDF Non-Copyable (Prevent PDF Copy)"
      description="Disable text selection and copying. Converts text pages to flat images to make files copy-proof."
      extraSections={<ToolSeoContent content={toolContent['prevent-copy']} />}
    >
      <PreventCopyTool />
    </ToolPageShell>
  );
}
