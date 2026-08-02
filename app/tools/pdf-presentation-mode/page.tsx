import React from 'react';
import type { Metadata } from 'next';
import { buildAlternates, toolSchema, faqSchema } from '@/lib/seo';
import ToolPageShell from '@/components/tools/shared/ToolPageShell';
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

const faqs = [
  {
    question: 'How does the laser pointer work?',
    answer: 'The laser pointer creates a glowing red cursor trail over the slide canvas so audience members can easily follow your presentation.',
  },
  {
    question: 'Can I annotate on slides while presenting?',
    answer: 'Yes! Switch between Digital Pen and Yellow Highlighter to write or highlight points live during your presentation.',
  },
];

export default function PdfPresentationModePage() {
  return (
    <ToolPageShell
      title="PDF Presentation & Laser Pointer Mode"
      description="Present slide decks seamlessly with glowing digital laser pointer, live pen annotation, highlighter, and fullscreen presentation view."
      badge="SLIDE PRESENTER ENGINE"
      canonicalPath="/pdf-presentation-mode"
      jsonLd={[
        ...toolSchema({
          name: 'PDF Presentation & Laser Pointer Mode',
          description: 'Present PDF slide decks directly in your web browser with digital laser pointer and ink tools.',
          url: '/pdf-presentation-mode',
        }),
        faqSchema(faqs),
      ]}
    >
      <PdfPresentationModeTool />
    </ToolPageShell>
  );
}
