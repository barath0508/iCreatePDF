import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ContactForm } from '@/components/ContactForm';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us - iCreatePDF',
  description: 'Have questions, feedback, or custom feature requests for our local PDF suite? Send us a message and our support team will get back to you shortly.',
  alternates: buildAlternates('/contact'),
  openGraph: {
    title: 'Contact Us - iCreatePDF',
    description: 'Have questions, feedback, or custom feature requests? Get in touch with the iCreatePDF team.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand uppercase font-mono">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-display leading-tight">
              We&apos;d love to <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">hear from you.</span>
            </h1>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-md">
              Have questions, feedback, or custom feature requests for our local PDF suite? Send us a message and our support team will get back to you shortly.
            </p>

            <div className="space-y-4 pt-4 border-t border-foreground/5">
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail className="w-5 h-5 text-brand" />
                <span className="text-sm">support@icreatepdf.com</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <MessageSquare className="w-5 h-5 text-brand" />
                <span className="text-sm">Typical response time: Under 24h</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <span className="text-sm">100% Secure communication channels</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <ContactForm />

        </div>
      </div>

      <FooterSection />
    </main>
  );
}
