import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ReadAloudTool } from '@/components/tools/ReadAloudTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Read Aloud PDF Online — Free Text-to-Speech PDF Reader | iCreatePDF',
  description: 'Listen to any PDF document read out loud with natural voice synthesis. Adjust pitch, rate, and volume. 100% private in-browser TTS.',
  keywords: 'read aloud pdf, pdf voice reader, text to speech pdf reader, listen to pdf online, audiobook from pdf, read my pdf out loud, narration for pdf documents, browser text to speech pdf, accessible voice reader pdf',
  alternates: buildAlternates('/tools/read-aloud-pdf'),
  openGraph: {
    title: 'PDF Read Aloud — Text-to-Speech Reader Free | iCreatePDF',
    description: 'Listen to any PDF read aloud in your browser. Choose a voice, adjust reading speed, and follow along with live word highlighting. 100% private, no upload required.',
    type: 'website',
  }
};

export default function ReadAloudPdfPage() {
  return (
    <ToolPageShell
      badge="Text-to-Speech"
      title="PDF Read Aloud"
      description="Have any PDF read aloud using your browser's own voices. Adjust speed, pick a voice, and follow along as words highlight in real time."
      jsonLd={[
        ...toolSchema({
          name: 'Read Aloud PDF Reader',
          description: 'Listen to any PDF document read out loud with natural voice synthesis. Adjust pitch, rate, and volume. 100% private in-browser TTS.',
          url: '/tools/read-aloud-pdf',
        }),
        faqSchema(toolContent['read-aloud-pdf'].faqs),
        howToSchema({
          name: 'Read Aloud PDF Reader',
          description: toolContent['read-aloud-pdf'].overview,
          url: '/tools/read-aloud-pdf',
          steps: toolContent['read-aloud-pdf'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['read-aloud-pdf']} />}
    >
      <ReadAloudTool />
    </ToolPageShell>
  );
}
