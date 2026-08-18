import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ScanToPdfTool } from '@/components/tools/ScanToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Scan to PDF Free Online — Camera Document Scanner | iCreatePDF',
  description: 'Scan physical paper documents using your mobile or webcam camera and compile into clean PDF files with automatic contrast enhancement. 100% private.',
  keywords: 'scan to pdf, document scanner online, camera to pdf, scan paper to pdf, photo to scanned document pdf, mobile scanner to pdf, high contrast document scan pdf, convert photo to black and white scan pdf, online webcam document scanner, scan documents to pdf with webcam, mobile camera to pdf scanner, scan receipts to pdf free, take picture and convert to pdf, high quality document scanner online',
  alternates: buildAlternates('/tools/scan-to-pdf'),
  openGraph: {
    title: 'Scan to PDF Free Online — Camera Document Scanner | iCreatePDF',
    description: 'Scan physical paper documents using your mobile or webcam camera and compile into clean PDF files with automatic contrast enhancement. 100% private.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'Scan to PDF Document Scanner — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scan to PDF Free Online — Camera Document Scanner | iCreatePDF',
    description: 'Scan physical paper documents using your mobile or webcam camera and compile into clean PDF files with automatic contrast enhancement. 100% private.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function ScanToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={getToolFullJsonLd('scan-to-pdf')}
      badge="Device Scanner"
      title="Scan to PDF"
      description="Scan multiple pages and compile them into a high-quality PDF in seconds. Processed entirely inside your browser sandbox."
      extraSections={<ToolSeoContent content={toolContent['scan-to-pdf']} />}
    >
      <div className="relative z-10">
        <ScanToPdfTool />
      </div>
    </ToolPageShell>
  );
}
