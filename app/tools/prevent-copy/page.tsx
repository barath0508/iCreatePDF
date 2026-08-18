import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PreventCopyTool } from '@/components/tools/PreventCopyTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Prevent Copy PDF — Rasterize Text & Disable Copy-Paste | iCreatePDF',
  description: 'Rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private security tool.',
  keywords: 'prevent copy pdf, disable text selection pdf, rasterize pdf to prevent copying, protect pdf from being copied, lock pdf content, disable copy paste pdf, make pdf uncopyable, flatten pdf text to image, anti copying pdf security',
  alternates: buildAlternates('/tools/prevent-copy'),
  openGraph: {
    title: 'Prevent Copy PDF — Rasterize Text & Disable Copy-Paste | iCreatePDF',
    description: 'Rasterize PDF pages into unselectable vector-image hybrids to prevent text copying, scraping, and highlighting. 100% private security tool.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Prevent PDF Text Copying — iCreatePDF' }],
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
