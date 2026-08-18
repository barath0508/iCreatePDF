import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ReadAloudTool } from '@/components/tools/ReadAloudTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Read Aloud PDF Online — Free Text-to-Speech PDF Reader | iCreatePDF',
  description: 'Listen to any PDF document read out loud with natural voice synthesis. Adjust pitch, rate, and volume. 100% private in-browser TTS.',
  keywords: 'read aloud pdf, pdf voice reader, text to speech pdf reader, listen to pdf online, audiobook from pdf, read my pdf out loud, narration for pdf documents, browser text to speech pdf, accessible voice reader pdf, speak pdf text online free, listen to pdf book read aloud',
  alternates: buildAlternates('/tools/read-aloud-pdf'),
  openGraph: {
    title: 'Read Aloud PDF Online — Free Text-to-Speech PDF Reader | iCreatePDF',
    description: 'Listen to any PDF document read out loud with natural voice synthesis. Adjust pitch, rate, and volume. 100% private in-browser TTS.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Read Aloud PDF Reader — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Aloud PDF Online — Free Text-to-Speech PDF Reader | iCreatePDF',
    description: 'Listen to any PDF document read out loud with natural voice synthesis. Adjust pitch, rate, and volume. 100% private in-browser TTS.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ReadAloudPdfPage() {
  return (
    <ToolPageShell
      badge="Text-to-Speech"
      title="PDF Read Aloud"
      description="Have any PDF read aloud using your browser's own voices. Adjust speed, pick a voice, and follow along as words highlight in real time."
      jsonLd={getToolFullJsonLd('read-aloud-pdf')}
      extraSections={<ToolSeoContent content={toolContent['read-aloud-pdf']} />}
    >
      <ReadAloudTool />
    </ToolPageShell>
  );
}
