import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ReadAloudTool } from '@/components/tools/ReadAloudTool';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Read Aloud — Text-to-Speech Reader Online Free | iCreatePDF',
  description: 'Listen to any PDF read aloud in your browser. Choose a voice, adjust reading speed, and follow along with live word highlighting. 100% private, no upload required.',
  keywords: 'pdf read aloud, pdf text to speech, listen to pdf, pdf voice reader, pdf audio reader online free',
  alternates: buildAlternates('/read-aloud-pdf'),
  openGraph: {
    title: 'PDF Read Aloud — Text-to-Speech Reader Online Free | iCreatePDF',
    description: 'Listen to any PDF read aloud in your browser with adjustable voice and speed. 100% private, no upload required.',
    type: 'website',
  }
};

export default function ReadAloudPdfPage() {
  return (
    <ToolPageShell
      badge="Text-to-Speech"
      title="PDF Read Aloud"
      description="Have any PDF read aloud using your browser's own voices. Adjust speed, pick a voice, and follow along as words highlight in real time."
      jsonLd={toolSchema({
        name: 'PDF Read Aloud',
        description: 'Listen to any PDF read aloud in your browser with adjustable voice and speed.',
        url: '/read-aloud-pdf',
      })}
    >
      <ReadAloudTool />
    </ToolPageShell>
  );
}
