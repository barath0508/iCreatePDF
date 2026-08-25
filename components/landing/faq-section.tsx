'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from './shared/reveal';

const faqs = [
  {
    question: "Is iCreatePDF really 100% free?",
    answer: "Yes, truly! There are no hidden paywalls, daily limits, file size caps, or signup requirements. Every single tool is completely free for everyone to use."
  },
  {
    question: "Are my documents kept private and secure?",
    answer: "Absolutely. Unlike other online PDF converters that send your files to remote cloud servers, iCreatePDF runs entirely in your web browser. Your files never leave your computer or phone, ensuring 100% confidentiality."
  },
  {
    question: "Can I use the tools when I'm offline?",
    answer: "Yes. Because all the processing happens on your own device, once the webpage is loaded, you can merge, compress, convert, and sign documents even without an active internet connection."
  },
  {
    question: "Do you store or see my files?",
    answer: "No, never. We have zero servers holding your files. Once you download your modified PDF or close the tab, the data is immediately cleared from your browser's memory."
  },
  {
    question: "What types of files can I work with?",
    answer: "You can convert images (JPG, PNG, WEBP, HEIC), Word docs (.docx), Excel spreadsheets (.xlsx), plain text (.txt), and Markdown into PDFs. You can also merge, split, compress, protect, e-sign, redact, and edit existing PDF documents."
  },
  {
    question: "How does in-browser PDF processing work?",
    answer: "Modern browsers are powerful enough to do the heavy lifting themselves. By using fast browser technology (WebAssembly), your own computer handles the conversion and editing directly. It is much faster and guarantees your files remain completely in your hands."
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
