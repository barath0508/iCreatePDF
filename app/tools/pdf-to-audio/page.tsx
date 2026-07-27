import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToAudioTool } from '@/components/tools/PdfToAudioTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Audio Reader — Free, Private, No Upload | iCreatePDF',
  description: 'Listen to PDF document text using speech synthesis hands-free. 100% private — files process inside browser memory.',
  keywords: 'pdf to audio, convert pdf to speech mp3, listen to pdf text, read pdf aloud audio file, text to speech pdf reader, free pdf audio converter',
  alternates: buildAlternates('/tools/pdf-to-audio'),
  openGraph: {
    title: 'PDF to Audio Reader — iCreatePDF',
    description: 'Listen to PDF document text using speech synthesis hands-free.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF to Audio Reader — iCreatePDF' }],
  },
};

export default function PdfToAudioToolPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'PDF to Audio Reader',
        description: 'Listen to PDF document text using speech synthesis hands-free.',
        url: '/tools/pdf-to-audio',
      })}
      badge="Accessibility & Audio"
      title="PDF to Audio Reader"
      description="Listen to PDF document text using speech synthesis hands-free."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-audio']} />}
    >
      <PdfToAudioTool />
    </ToolPageShell>
  );
}
