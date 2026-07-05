'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from './shared/reveal';

const faqs = [
  {
    question: "Is iCreatePDF completely free?",
    answer: "Yes, iCreatePDF is 100% free with no page limits, file size restrictions, or registration requirements. All conversion and document editing features are fully unlocked for everyone."
  },
  {
    question: "Are my documents secure on iCreatePDF?",
    answer: "Absolutely. iCreatePDF works entirely client-side. Your files are processed locally in your browser sandbox using WebAssembly and Javascript. They are never uploaded to any external server, ensuring absolute privacy."
  },
  {
    question: "Can I use iCreatePDF offline?",
    answer: "Yes. Since all processing runs locally within your browser sandbox, once the page is loaded, the tools do not need an active internet connection to modify, merge, compress, or convert your PDF files."
  },
  {
    question: "Do you upload my files to any remote server?",
    answer: "No, never. Unlike conventional PDF tools that upload your sensitive documents to cloud servers, iCreatePDF compiles everything directly on your CPU. Your data never leaves your local device."
  },
  {
    question: "What file formats are supported by iCreatePDF?",
    answer: "We support converting JPG, PNG, WEBP, HEIC, BMP, Word (.docx), TXT, HTML, and Markdown to PDF. You can also merge, split, rotate, compress, protect, unlock, sign, grayscale, flatten, and edit existing PDFs."
  },
  {
    question: "How does local browser-based PDF processing work?",
    answer: "We leverage cutting-edge browser technologies like WebAssembly (Wasm) compiles of C/C++ library engines, Javascript binary arrays, and HTML5 canvas APIs to perform heavy-duty document computations directly in your browser memory space."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-background text-foreground overflow-hidden border-t border-border">
      <div className="relative z-10 max-w-[900px] mx-auto px-6">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/[0.03] border border-border text-[11px] font-semibold text-brand uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-foreground leading-tight">
            Have questions? <br />
            <span className="text-muted-foreground">We have answers.</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border rounded-2xl bg-card/40 hover:bg-card/70 transition-all duration-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-foreground/90 hover:text-foreground transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-border' : 'max-h-0'
                  }`}
                  style={{ visibility: isOpen ? 'visible' : 'hidden' }}
                >
                  <p className="px-6 py-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
