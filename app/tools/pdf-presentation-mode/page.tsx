import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
import { ToolSeoContent } from '@/components/tools/shared/ToolSeoContent';
import { toolContent } from '@/lib/tool-content';
import { PdfPresentationModeTool } from '@/components/tools/PdfPresentationModeTool';

export const metadata: Metadata = {
  title: 'PDF Presentation Mode — Digital Laser Pointer | iCreatePDF',
  description: 'Present PDF slide decks directly in your web browser with glowing digital laser pointer, ink pen, yellow highlighter, slide timer, and full-screen view.',
  keywords: 'pdf presentation mode, laser pointer for pdf, present pdf fullscreen, digital ink pen pdf presenter, pdf slideshow tool',
  alternates: buildAlternates('/tools/pdf-presentation-mode'),
  openGraph: {
    title: 'PDF Presentation Mode — Digital Laser Pointer & Slide Tool',
    description: 'Present PDF slide decks directly in your web browser with glowing digital laser pointer, ink pen, and highlighter.',
  },
};

export default function PdfPresentationModePage() {
  return (
    <ToolPageShell
      title="PDF Presentation & Laser Pointer Mode"
      description="Present slide decks seamlessly with glowing digital laser pointer, live pen annotation, highlighter, and fullscreen presentation view."
      badge="SLIDE PRESENTER ENGINE"
      canonicalPath="/pdf-presentation-mode"
      jsonLd={toolSchema({
        name: 'PDF Presentation & Laser Pointer Mode',
        description: 'Present PDF slide decks directly in your web browser with digital laser pointer and ink tools.',
        url: '/pdf-presentation-mode',
      })}
      extraSections={<ToolSeoContent content={toolContent['pdf-presentation-mode']} />}
    >
      <PdfPresentationModeTool />
    </ToolPageShell>
  );
}
