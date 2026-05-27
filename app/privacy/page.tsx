import React from 'react';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between selection:bg-purple-500/30">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-6 py-32 space-y-6 text-white/70 flex-1 w-full">
        <h1 className="text-4xl font-extrabold text-white font-display">Privacy Policy</h1>
        <p className="text-xs text-white/40 font-mono">Last updated: May 26, 2026</p>
        
        <p className="text-sm">
          At iCreatePDF, we take your privacy extremely seriously. We want to be completely transparent about how our tool operates and how we protect your personal files.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">1. Local Client-Side Processing</h2>
        <p className="text-sm leading-relaxed">
          The core of iCreatePDF is that <strong>all conversion processes occur completely inside your local web browser</strong>. Your images, documents, and generated PDF files are processed using client-side JavaScript APIs (specifically canvas rendering and local compilation). They are never uploaded, stored, or processed on any remote server.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">2. Collection of Data</h2>
        <p className="text-sm leading-relaxed">
          Because everything runs client-side, we do not collect, view, copy, store, or sell any of your uploaded files. We do not require registration, email sign-ups, or login credentials to use the converter tool.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">3. Local Storage and Cookies</h2>
        <p className="text-sm leading-relaxed">
          Our site does not use tracking cookies. We may use standard browser session storage or local storage exclusively to save your default setting preferences (e.g., page size or margins) to make future conversions quicker for you.
        </p>

        <h2 className="text-xl font-bold text-white pt-4 font-display">4. Third-Party Services</h2>
        <p className="text-sm leading-relaxed">
          We may integrate privacy-friendly analytics (such as Umami) or Google Search Console to monitor page speeds, traffic sources, and tool usage statistics. These services collect only aggregated, non-identifying data and do not have access to any file content.
        </p>
      </div>

      <FooterSection />
    </div>
  );
}
