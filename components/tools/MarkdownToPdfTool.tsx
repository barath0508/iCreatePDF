'use client';

import React, { useState, useRef } from 'react';
import { Eye, Loader2, Download, FileText } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function MarkdownToPdfTool() {
  const [markdown, setMarkdown] = useState(`# Document Title

This is a beautiful Markdown document compiled 100% locally.

## Key Features
- High performance rendering
- Completely private document generation
- Works directly inside browser memory

## Instructions
Simply modify this editor and click compile to get a clean PDF.`);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const parseMarkdownToHtml = (md: string): string => {
    let html = md;
    
    // Headings
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    
    // Bold / Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Lists
    html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
    
    // Wrap paragraphs
    const lines = html.split('\n');
    const formattedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<li')) return trimmed;
      return `<p>${trimmed}</p>`;
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          h1 { color: #8b5cf6; font-size: 28px; margin-top: 0; margin-bottom: 12px; }
          h2 { color: #333; font-size: 20px; margin-top: 20px; margin-bottom: 8px; }
          p { font-size: 14px; color: #333; margin-bottom: 12px; }
          li { font-size: 14px; color: #444; margin-left: 20px; margin-bottom: 6px; }
        </style>
      </head>
      <body>
        ${formattedLines.join('\n')}
      </body>
      </html>
    `;
  };

  const triggerMarkdownToPdf = async () => {
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const iframe = iframeRef.current;
      if (!iframe) throw new Error('Render engine not initialized.');

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error('Render context unavailable.');

      doc.open();
      doc.write('<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:40px;color:#111;line-height:1.6;}pre{white-space:pre-wrap;font-size:14px;color:#333;}</style></head><body></body></html>');
      doc.close();

      const pre = doc.createElement('pre');
      pre.textContent = markdown;
      doc.body.appendChild(pre);

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.276, 841.890]); // A4 Size
      const { width, height } = page.getSize();

      const elements = doc.body.querySelectorAll('h1, h2, h3, p, li');
      let currentY = height - 60;

      elements.forEach((el) => {
        const text = el.textContent?.trim() || '';
        if (!text) return;

        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize) || 12;
        const color = style.color;
        
        let pdfColor = rgb(0.15, 0.15, 0.15);
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          pdfColor = rgb(
            parseInt(rgbMatch[1]) / 255,
            parseInt(rgbMatch[2]) / 255,
            parseInt(rgbMatch[3]) / 255
          );
        }

        const isListItem = el.tagName.toLowerCase() === 'li';
        const indentX = isListItem ? 70 : 50;
        const bulletText = isListItem ? '•  ' + text : text;

        page.drawText(bulletText, {
          x: indentX,
          y: currentY - fontSize,
          size: fontSize * 0.9,
          color: pdfColor,
        });

        currentY -= (fontSize * 1.8 + 12);
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to render Markdown to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'markdown-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace Markdown Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center bg-card/60 px-4 py-3 border-b border-foreground/10">
              <span className="text-xs font-mono text-brand flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Markdown Editor
              </span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 bg-transparent p-6 font-mono text-xs text-foreground/90 focus:outline-none resize-none"
            />
          </div>

          <iframe ref={iframeRef} className="hidden" title="Render sandbox" />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <FileText className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Markdown to PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Write or paste clean Markdown syntax. It converts instantly to standard document headers, bullet lists, and paragraphs styled beautifully inside an A4 PDF output.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDownloadUrl(null)}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Edit Markdown
                </Button>
              </div>
            ) : (
              <Button
                onClick={triggerMarkdownToPdf}
                className="w-full bg-brand hover:bg-brand/90 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Compile to PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
