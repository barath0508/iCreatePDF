import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, getToolFullJsonLd } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfPresentationModeTool } from '@/components/tools/PdfPresentationModeTool';

export const metadata: Metadata = {
  title: 'PDF Presentation Mode — Present PDF Slides with Laser Pointer | iCreatePDF',
  description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
  keywords: 'pdf presentation mode, present pdf like powerpoint, full screen pdf presentation, pdf slideshow with laser pointer, present pdf slides online, presentation viewer for pdf, keynote presentation pdf, present pdf without adobe acrobat, pdf presenter tool, slideshow mode for pdf document',
  alternates: buildAlternates('/tools/pdf-presentation-mode'),
  openGraph: {
    title: 'PDF Presentation Mode — Present PDF Slides with Laser Pointer | iCreatePDF',
    description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Presentation Mode & Slideshow — iCreatePDF' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Presentation Mode — Present PDF Slides with Laser Pointer | iCreatePDF',
    description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
    images: ['https://www.icreatepdf.online/opengraph-image'],
  },
};

export default function PdfPresentationModePage() {
  return (
    <ToolPageShell
      title="PDF Presentation & Laser Pointer Mode"
      description="Present slide decks seamlessly with glowing digital laser pointer, live pen annotation, highlighter, and fullscreen presentation view."
      badge="SLIDE PRESENTER ENGINE"
      canonicalPath="/pdf-presentation-mode"
      jsonLd={getToolFullJsonLd('pdf-presentation-mode')}
      extraSections={<ToolSeoContent content={toolContent['pdf-presentation-mode']} />}
    >
      <PdfPresentationModeTool />
    </ToolPageShell>
  );
}
