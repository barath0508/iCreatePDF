import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { Base64ToPdfTool } from '@/components/tools/Base64ToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Base64 to PDF Converter Online Free — Decode Base64 Locally | iCreatePDF',
  description: 'Decode and convert Base64 strings to downloadable PDF files instantly. 100% private client-side decoding in browser memory — your data never touches a server.',
  keywords: 'base64 to pdf, decode base64 to pdf, convert base64 string to pdf, base64 pdf decoder, base64 to pdf online, data uri to pdf converter, decode base64 binary to pdf, developer tools base64 pdf, convert base64 text file to pdf, client side base64 to pdf decoder, base64 string to download pdf, base64 stream to pdf',
  alternates: buildAlternates('/tools/base64-to-pdf'),
  openGraph: {
    title: 'Base64 to PDF Converter Online Free — Decode Base64 Locally | iCreatePDF',
    description: 'Decode and convert Base64 strings to downloadable PDF files instantly. 100% private client-side decoding in browser memory — your data never touches a server.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Decode Base64 to PDF — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 to PDF Converter Online Free — Decode Base64 Locally | iCreatePDF',
    description: 'Decode and convert Base64 strings to downloadable PDF files instantly. 100% private client-side decoding in browser memory — your data never touches a server.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function Base64ToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('base64-to-pdf')}
      badge="Developer Tool"
      title="Base64 to PDF Decoder"
      description="Instantly convert Base64 encoded strings back to a viewable and downloadable PDF. Your payload is processed locally in browser sandbox memory, keeping sensitive data 100% private."
      extraSections={<ToolSeoContent content={toolContent['base64-to-pdf']} />}
    >
      <Base64ToPdfTool />
    </ToolPageShell>
  );
}
