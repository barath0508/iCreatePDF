import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ScanToPdfTool } from '@/components/tools/ScanToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Scan to PDF Free Online — Camera Document Scanner | iCreatePDF',
  description: 'Scan physical paper documents using your mobile or webcam camera and compile into clean PDF files with automatic contrast enhancement. 100% private.',
  keywords: 'scan to pdf, document scanner online, camera to pdf, scan paper to pdf, photo to scanned document pdf, mobile scanner to pdf, high contrast document scan pdf, convert photo to black and white scan pdf',
  alternates: buildAlternates('/tools/scan-to-pdf'),
  openGraph: {
    title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
    description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
    type: 'website',
  }
};

export default function ScanToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={[
        ...toolSchema({
          name: 'Scan to PDF Document Scanner',
          description: 'Scan physical paper documents using your mobile or webcam camera and compile into clean PDF files with automatic contrast enhancement. 100% private.',
          url: '/tools/scan-to-pdf',
        }),
        faqSchema(toolContent['scan-to-pdf'].faqs),
        howToSchema({
          name: 'Scan to PDF Document Scanner',
          description: toolContent['scan-to-pdf'].overview,
          url: '/tools/scan-to-pdf',
          steps: toolContent['scan-to-pdf'].steps,
        }),
      ]}badge="Device Scanner"
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
