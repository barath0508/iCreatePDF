import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { WordToPdfTool } from '@/components/tools/WordToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Convert DOCX to PDF Free Online (100% Private) | iCreatePDF',
  description: 'Convert DOCX files to PDF online free. ⚡ Fast, no formatting loss & zero server uploads. Convert your DOCX files to PDF instantly in browser memory.',
  keywords: 'convert docx to pdf, docx files to pdf, how to convert docx to pdf, word to pdf, convert word to pdf, word to pdf free, word document to pdf, doc to pdf, microsoft word to pdf, word to pdf online free, convert word to pdf without losing formatting, docx to pdf converter, word to pdf locally, word to pdf no upload, save word as pdf, word file to pdf',
  alternates: buildAlternates('/tools/word-to-pdf'),
  openGraph: {
    title: 'Convert DOCX to PDF Free Online — 100% Private | iCreatePDF',
    description: 'Convert DOCX files to PDF free online. No uploads, no formatting loss. 100% private browser processing.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Convert DOCX to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert DOCX to PDF Free Online — 100% Private | iCreatePDF',
    description: 'Convert DOCX files to PDF free. No uploads. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Convert DOCX to PDF',
          description: 'Convert DOCX files to PDF documents free online without formatting shifts. Processed 100% client-side inside browser sandbox.',
          url: '/tools/word-to-pdf',
        }),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert DOCX to PDF for free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Select or drag your .docx Word document into the dropzone. The converter instantly compiles it to a clean PDF in browser memory. Click Download PDF to save.',
              },
            },
            {
              '@type': 'Question',
              name: 'Will converting DOCX to PDF change my formatting?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. iCreatePDF processes your DOCX file layout locally, preserving font styles, margins, tables, and images without layout distortion.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is it safe to convert private DOCX files here?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, 100% safe. Your DOCX document never leaves your device and is never uploaded to any remote cloud server.',
              },
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Convert DOCX to PDF Online Free',
          step: [
            { '@type': 'HowToStep', text: 'Upload or drag your .docx Word file into the browser box.' },
            { '@type': 'HowToStep', text: 'Wait 1 second for the client-side engine to compile text & layout.' },
            { '@type': 'HowToStep', text: 'Click Download PDF to save your file instantly.' },
          ],
        },
      ]}
      badge="DOCX Converter"
      title="Convert DOCX to PDF"
      description="Drop your Word document (.docx) to compile it into a PDF layout. Processed 100% privately in your browser."
      extraSections={<ToolSeoContent content={toolContent['word-to-pdf']} />}
    >
      <div className="relative z-10">
        <WordToPdfTool />
      </div>
    </ToolPageShell>
  );
}
