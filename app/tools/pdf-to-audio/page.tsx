import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { PdfToAudioTool } from '@/components/tools/PdfToAudioTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF to Audio — Listen to PDF Text with Text-to-Speech (TTS) | iCreatePDF',
  description: 'Convert PDF text into natural-sounding speech. Listen to PDF books, papers, and contracts read aloud directly in your browser.',
  keywords: 'pdf to audio, read pdf aloud, listen to pdf text, text to speech pdf, pdf audio generator, convert pdf to mp3 audio, listen to books pdf, speech synthesis pdf, audio reader for pdf, pdf voice reader online, text to speech pdf reader online free',
  alternates: buildAlternates('/tools/pdf-to-audio'),
  openGraph: {
    title: 'PDF to Audio — Listen to PDF Text with Text-to-Speech (TTS) | iCreatePDF',
    description: 'Convert PDF text into natural-sounding speech. Listen to PDF books, papers, and contracts read aloud directly in your browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF to Audio & Speech Reader — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Audio — Listen to PDF Text with Text-to-Speech (TTS) | iCreatePDF',
    description: 'Convert PDF text into natural-sounding speech. Listen to PDF books, papers, and contracts read aloud directly in your browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfToAudioToolPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-to-audio')}
      badge="Accessibility & Audio"
      title="PDF to Audio Reader"
      description="Listen to PDF document text using speech synthesis hands-free."
      extraSections={<ToolSeoContent content={toolContent['pdf-to-audio']} />}
    >
      <PdfToAudioTool />
    </ToolPageShell>
  );
}
