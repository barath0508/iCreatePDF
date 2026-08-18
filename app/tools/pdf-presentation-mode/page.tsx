import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema, howToSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfPresentationModeTool } from '@/components/tools/PdfPresentationModeTool';

export const metadata: Metadata = {
  title: 'PDF Presentation Mode — Present PDF Slides with Laser Pointer | iCreatePDF',
  description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
  keywords: 'pdf presentation mode, present pdf like powerpoint, full screen pdf presentation, pdf slideshow with laser pointer, present pdf slides online, presentation viewer for pdf, keynote presentation pdf, present pdf without adobe acrobat, pdf presenter tool',
  alternates: buildAlternates('/tools/pdf-presentation-mode'),
  openGraph: {
    title: 'PDF Presentation Mode — Present PDF Slides with Laser Pointer | iCreatePDF',
    description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
    type: 'website',
    images: [{ url: 'https://www.icreatepdf.online/opengraph-image', width: 1200, height: 630, alt: 'PDF Presentation Mode & Slideshow — iCreatePDF' }],
  },
};

export default function PdfPresentationModePage() {
  return (
    <ToolPageShell
      title="PDF Presentation & Laser Pointer Mode"
      description="Present slide decks seamlessly with glowing digital laser pointer, live pen annotation, highlighter, and fullscreen presentation view."
      badge="SLIDE PRESENTER ENGINE"
      canonicalPath="/pdf-presentation-mode"
      jsonLd={[
        ...toolSchema({
          name: 'PDF Presentation Mode & Slideshow',
          description: 'Present PDF documents like a PowerPoint slideshow with full-screen view, speaker notes, and virtual laser pointer. 100% private in-browser.',
          url: '/tools/pdf-presentation-mode',
        }),
        faqSchema(toolContent['pdf-presentation-mode'].faqs),
        howToSchema({
          name: 'PDF Presentation Mode & Slideshow',
          description: toolContent['pdf-presentation-mode'].overview,
          url: '/tools/pdf-presentation-mode',
          steps: toolContent['pdf-presentation-mode'].steps,
        }),
      ]}extraSections={<ToolSeoContent content={toolContent['pdf-presentation-mode']} />}
    >
      <PdfPresentationModeTool />
    </ToolPageShell>
  );
}
