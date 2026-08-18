import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { MetadataTool } from '@/components/tools/MetadataTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor — View, Edit & Remove Properties | iCreatePDF',
  description: 'View, edit, or wipe author, title, subject, keywords, and creation dates from PDF properties. 100% private client-side metadata editor.',
  keywords: 'pdf metadata editor, edit pdf metadata, view pdf properties, change pdf author title, remove pdf metadata, sanitize pdf properties, edit pdf creation date, inspect pdf metadata online, clean metadata from pdf, pdf exif viewer, strip metadata from pdf free',
  alternates: buildAlternates('/tools/pdf-metadata'),
  openGraph: {
    title: 'PDF Metadata Editor — View, Edit & Remove Properties | iCreatePDF',
    description: 'View, edit, or wipe author, title, subject, keywords, and creation dates from PDF properties. 100% private client-side metadata editor.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Metadata Editor & Sanitizer — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Metadata Editor — View, Edit & Remove Properties | iCreatePDF',
    description: 'View, edit, or wipe author, title, subject, keywords, and creation dates from PDF properties. 100% private client-side metadata editor.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfMetadataPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('pdf-metadata')}
      badge="Document Properties"
      title="PDF Metadata Editor"
      description="Read and update the hidden title, author, subject, and keyword fields embedded in any PDF."
      extraSections={<ToolSeoContent content={toolContent['pdf-metadata']} />}
    >
      <MetadataTool />
    </ToolPageShell>
  );
}
