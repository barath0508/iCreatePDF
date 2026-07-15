import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { ScanToPdfTool } from '@/components/tools/ScanToPdfTool';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { buildAlternates, toolSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
  description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
  keywords: 'scan to pdf, document scanner online, webcam to pdf, mobile camera scan to pdf, free online scanner, icreatepdf',
  alternates: buildAlternates('/scan-to-pdf'),
  openGraph: {
    title: 'Scan to PDF Online - Free Document Scanner | iCreatePDF',
    description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
    type: 'website',
  }
};

export default function ScanToPdfPage() {
  return (
    <ToolPageShell
      jsonLd={toolSchema({
        name: 'Scan to PDF',
        description: 'Scan document pages with your mobile or webcam camera. Crop, compile, and convert captured photos into a single PDF locally. 100% private.',
        url: '/scan-to-pdf',
      })}
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
