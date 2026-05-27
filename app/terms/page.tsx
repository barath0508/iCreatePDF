import React from 'react';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-6 py-32 space-y-6 text-white/70 flex-1 w-full">
        <h1 className="text-4xl font-extrabold text-white font-display">Terms of Service</h1>
        <p className="text-xs text-white/40 font-mono">Last updated: May 26, 2026</p>

        <p className="text-sm">
          Welcome to iCreatePDF. By using this website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">1. Use of the Service</h2>
        <p className="text-sm leading-relaxed">
          iCreatePDF provides a browser-based converter tool to transform image files (JPG, PNG, WEBP, HEIC, BMP) into PDF documents. The tool is free to use for both personal and commercial purposes. You agree to use this site only for lawful purposes.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">2. Client-Side Processing Warranty</h2>
        <p className="text-sm leading-relaxed">
          Because iCreatePDF converts files entirely on your local machine, you retain full ownership and responsibility for any files you upload. You are solely responsible for ensuring you have the legal right to use, modify, and compile the images you select.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">3. Disclaimer of Warranties</h2>
        <p className="text-sm leading-relaxed">
          This web application is provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the tool will be uninterrupted, secure, error-free, or compatible with all image file formats.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">4. Limitation of Liability</h2>
        <p className="text-sm leading-relaxed">
          Under no circumstances shall iCreatePDF or its contributors be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of, or the inability to use, this website or tool.
        </p>
      </div>

      <FooterSection />
    </div>
  );
}
