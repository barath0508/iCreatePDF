import type { Metadata } from 'next';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ContactForm } from '@/components/ContactForm';
import { Mail, MessageSquare, ShieldCheck, Building2 } from 'lucide-react';
import { buildAlternates, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us - iCreatePDF Publisher & Support',
  description: 'Contact the iCreatePDF development team. Have questions, feedback, or custom feature requests for our local PDF suite? Reach out directly.',
  alternates: buildAlternates('/contact'),
  openGraph: {
    title: 'Contact Us - iCreatePDF Publisher & Support',
    description: 'Have questions, feedback, or custom feature requests? Get in touch with the iCreatePDF team.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'iCreatePDF', url: '/' },
              { name: 'Contact Us' },
            ])
          ),
        }}
      />
      <Navigation />
      
      <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-semibold text-brand uppercase font-mono">
              Get in Touch with Publisher
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-display leading-tight">
              We&apos;d love to <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">hear from you.</span>
            </h1>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-md">
              Have questions, technical inquiries, or feature requests for our browser-based PDF suite? Send us a message and our development team will respond promptly.
            </p>
            <div className="space-y-4 text-xs text-foreground/40 leading-relaxed max-w-md pt-2">
              <p>
                <strong>Publisher:</strong> iCreatePDF Tools Engineering Team (<a href="https://www.icreatepdf.online" className="text-brand hover:underline font-mono">icreatepdf.online</a>)
              </p>
              <p>
                <strong>Feature Requests:</strong> Our tools run 100% in the browser sandbox. If there is a specific document manipulation utility or conversion format you would like to see added, let us know! We are constantly expanding our client-side WebAssembly processing suite.
              </p>
              <p>
                <strong>Security & Privacy:</strong> If you are a security officer seeking details about our client-side sandbox compilation, local memory allocation, or WebAssembly execution layers, feel free to reach out. We are committed to transparency and open security.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-foreground/5">
              <div className="flex items-center gap-3 text-foreground/70">
                <Building2 className="w-5 h-5 text-brand" />
                <span className="text-sm">iCreatePDF Tools · Global Online Service</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail className="w-5 h-5 text-brand" />
                <a href="mailto:crop0339@gmail.com" className="text-sm hover:underline hover:text-brand transition-colors">crop0339@gmail.com</a>
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
