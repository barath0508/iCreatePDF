'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    // Simulate message transmission locally
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-purple-500/30">
      <Navigation />
      
      <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-purple-400 uppercase font-mono">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight">
              We&apos;d love to <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">hear from you.</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Have questions, feedback, or custom feature requests for our local PDF suite? Send us a message and our support team will get back to you shortly.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-sm">support@icreatepdf.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Typical response time: Under 24h</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <span className="text-sm">100% Secure communication channels</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl relative">
            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-white/40 max-w-sm">
                  Thank you for reaching out. We have received your query and will reply to you as soon as possible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 border-white/10 text-white hover:bg-white/5"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full h-11 px-4 bg-zinc-900/60 border border-white/10 text-white rounded-xl text-sm focus:border-purple-500/30 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. john@example.com"
                      className="w-full h-11 px-4 bg-zinc-900/60 border border-white/10 text-white rounded-xl text-sm focus:border-purple-500/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Message Description</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe how we can help you..."
                    className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 text-white rounded-xl text-sm focus:border-purple-500/30 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>

      <FooterSection />
    </main>
  );
}
