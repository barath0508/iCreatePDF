'use client';

import React, { useState, useRef } from 'react';
import { Eye, Loader2, Download, FileText } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

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
    const lines = md.split(/\r?\n/);
    const htmlLines: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          htmlLines.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        const escaped = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        codeBlockContent.push(escaped);
        continue;
      }

      const trimmed = line.trim();
      if (!trimmed) continue;

      if (/^(\-\-\-|\*\*\*|___)$/.test(trimmed)) {
        htmlLines.push('<hr>');
        continue;
      }

      if (/^# (.*?)$/.test(line)) {
        htmlLines.push(`<h1>${line.replace(/^# /, '')}</h1>`);
        continue;
      }
      if (/^## (.*?)$/.test(line)) {
        htmlLines.push(`<h2>${line.replace(/^## /, '')}</h2>`);
        continue;
      }
      if (/^### (.*?)$/.test(line)) {
        htmlLines.push(`<h3>${line.replace(/^### /, '')}</h3>`);
        continue;
      }
      if (/^#### (.*?)$/.test(line)) {
        htmlLines.push(`<h4>${line.replace(/^#### /, '')}</h4>`);
        continue;
      }

      if (/^> (.*?)$/.test(line)) {
        htmlLines.push(`<blockquote>${line.replace(/^> /, '')}</blockquote>`);
        continue;
      }

      if (/^[\-\*\+] (.*?)$/.test(line)) {
        const content = line.replace(/^[\-\*\+] /, '');
        htmlLines.push(`<li>${content}</li>`);
        continue;
      }

      if (/^\d+\. (.*?)$/.test(line)) {
        const match = line.match(/^(\d+)\. (.*?)$/);
        if (match) {
          htmlLines.push(`<li data-ol="${match[1]}">${match[2]}</li>`);
        }
        continue;
      }

      htmlLines.push(`<p>${line}</p>`);
    }

    if (inCodeBlock && codeBlockContent.length > 0) {
      htmlLines.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          h1 { color: #8b5cf6; font-size: 24px; margin-top: 0; margin-bottom: 12px; }
          h2 { color: #111827; font-size: 18px; margin-top: 20px; margin-bottom: 8px; }
          h3 { color: #374151; font-size: 14px; margin-top: 16px; margin-bottom: 6px; }
          p { font-size: 13px; color: #374151; margin-bottom: 10px; }
          li { font-size: 13px; color: #374151; margin-left: 20px; margin-bottom: 4px; }
          blockquote { font-size: 13px; color: #6b7280; border-left: 3px solid #8b5cf6; padding-left: 10px; margin-bottom: 10px; }
          pre { background: #f3f4f6; padding: 12px; font-family: monospace; font-size: 12px; }
        </style>
      </head>
      <body>
        ${htmlLines.join('\n')}
      </body>
      </html>
    `;
  };

  const wrapText = (text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (!word) continue;
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
          let subWord = '';
          for (const char of word) {
            if (font.widthOfTextAtSize(subWord + char, fontSize) <= maxWidth) {
              subWord += char;
            } else {
              lines.push(subWord);
              subWord = char;
            }
          }
          currentLine = subWord;
        } else {
          currentLine = word;
        }
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
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

      const htmlContent = parseMarkdownToHtml(markdown);
      doc.open();
      doc.write(htmlContent);
      doc.close();

      const pdfDoc = await PDFDocument.create();
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const obliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
      const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);

      const pageHeight = 841.890;
      const pageWidth = 595.276; // A4 Size
      const leftMargin = 50;
      const rightMargin = 50;
      const topMargin = 50;
      const bottomMargin = 50;
      const maxPrintWidth = pageWidth - leftMargin - rightMargin;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - topMargin;

      const elements = doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote, pre, hr');

      elements.forEach((el) => {
        const tagName = el.tagName.toLowerCase();

        if (tagName === 'hr') {
          if (currentY - 15 < bottomMargin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - topMargin;
          }
          page.drawLine({
            start: { x: leftMargin, y: currentY - 5 },
            end: { x: pageWidth - rightMargin, y: currentY - 5 },
            thickness: 1,
            color: rgb(0.85, 0.85, 0.85),
          });
          currentY -= 15;
          return;
        }

        let font = regularFont;
        let fontSize = 10.5;
        let pdfColor = rgb(0.2, 0.2, 0.2);
        let indentX = leftMargin;
        let lineSpacing = 1.4;
        let spaceAfter = 8;
        let prefix = '';

        if (tagName === 'h1') {
          fontSize = 22;
          font = boldFont;
          pdfColor = rgb(0.54, 0.36, 0.96);
          spaceAfter = 14;
        } else if (tagName === 'h2') {
          fontSize = 16;
          font = boldFont;
          pdfColor = rgb(0.11, 0.12, 0.15);
          spaceAfter = 10;
        } else if (tagName === 'h3') {
          fontSize = 13;
          font = boldFont;
          pdfColor = rgb(0.22, 0.25, 0.31);
          spaceAfter = 8;
        } else if (['h4', 'h5', 'h6'].includes(tagName)) {
          fontSize = 11;
          font = boldFont;
          pdfColor = rgb(0.25, 0.25, 0.3);
          spaceAfter = 6;
        } else if (tagName === 'li') {
          fontSize = 10.5;
          font = regularFont;
          pdfColor = rgb(0.2, 0.2, 0.2);
          indentX = leftMargin + 20;
          spaceAfter = 4;
          const olNum = el.getAttribute('data-ol');
          prefix = olNum ? `${olNum}.  ` : '-  ';
        } else if (tagName === 'blockquote') {
          fontSize = 10.5;
          font = obliqueFont;
          pdfColor = rgb(0.4, 0.4, 0.45);
          indentX = leftMargin + 15;
          spaceAfter = 8;
        } else if (tagName === 'pre') {
          fontSize = 9.5;
          font = courierFont;
          pdfColor = rgb(0.15, 0.15, 0.2);
          indentX = leftMargin + 15;
          spaceAfter = 10;
        }

        let text = el.textContent || '';
        if (!text.trim()) return;
        text = sanitizeTextForPdf(text);

        const availableWidth = maxPrintWidth - (indentX - leftMargin);

        let textLines: string[] = [];
        if (tagName === 'pre') {
          const rawLines = text.split('\n');
          rawLines.forEach(l => {
            const wrapped = wrapText(l, font, fontSize, availableWidth);
            if (wrapped.length === 0) textLines.push('');
            else textLines.push(...wrapped);
          });
        } else {
          // Remove inline markdown markers if raw text contains them
          const cleanedText = text.replace(/[\*\_\`]/g, '');
          textLines = wrapText(cleanedText, font, fontSize, availableWidth);
        }

        for (let idx = 0; idx < textLines.length; idx++) {
          let lineStr = textLines[idx];
          if (idx === 0 && prefix) {
            lineStr = prefix + lineStr;
          }

          const lineHeight = fontSize * lineSpacing;
          if (currentY - lineHeight < bottomMargin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - topMargin;
          }

          page.drawText(lineStr, {
            x: indentX,
            y: currentY - fontSize,
            size: fontSize,
            font,
            color: pdfColor,
          });

          currentY -= lineHeight;
        }

        currentY -= spaceAfter;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
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
