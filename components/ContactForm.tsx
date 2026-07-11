'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formspree.io/f/xnjkeebq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMessage('Failed to send message. Please try again later.');
        }
      }
    } catch (error) {
      setErrorMessage('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="lg:col-span-7 bg-card border border-foreground/10 rounded-2xl p-8 shadow-2xl relative">
      {isSuccess ? (
        <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-display text-foreground">Message Sent Successfully!</h3>
          <p className="text-xs text-foreground/40 max-w-sm">
            Thank you for reaching out. We have received your query and will reply to you as soon as possible.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="mt-4 border-foreground/10 text-foreground hover:bg-foreground/5"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. John Doe"
                className="w-full h-11 px-4 bg-card/70 border border-foreground/10 text-foreground rounded-xl text-sm focus:border-brand/30 focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="e.g. john@example.com"
                className="w-full h-11 px-4 bg-card/70 border border-foreground/10 text-foreground rounded-xl text-sm focus:border-brand/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Message Description</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Describe how we can help you..."
              className="w-full px-4 py-3 bg-card/70 border border-foreground/10 text-foreground rounded-xl text-sm focus:border-brand/30 focus:outline-none transition-colors resize-none"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSending}
            className="w-full bg-brand hover:bg-brand/90 text-foreground py-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all"
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
  );
}
