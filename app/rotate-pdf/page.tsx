import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/shared/ToolPageShell';
import { RotateTool } from '@/components/tools/RotateTool';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Rotate PDF Online - Free & Private | iCreatePDF',
  description: 'Rotate PDF pages in seconds. 100% client-side, drag & drop files, select rotation angles visually, and download instantly.',
  keywords: 'rotate pdf, rotate pdf pages, rotate pdf online, free rotate pdf, private pdf rotation',
  alternates: buildAlternates('/rotate-pdf'),
  openGraph: {
    title: 'Rotate PDF Online - Free & Private | iCreatePDF',
    description: 'Rotate PDF pages in seconds. 100% client-side, drag & drop files, select rotation angles visually, and download instantly.',
    type: 'website',
  }
};

export default function RotatePdfPage() {
  return (
    <ToolPageShell badge="PDF Page Rotator" title="Rotate PDF Pages" description="Rotate specific pages of your PDF document or apply a bulk clockwise rotation to all pages locally.">
      <RotateTool />
    </ToolPageShell>
  );
}
