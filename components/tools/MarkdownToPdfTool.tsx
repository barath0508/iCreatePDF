'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { 
  FileText, Eye, Loader2, Download, Sparkles, Upload, 
  Copy, Trash2, Table, CheckSquare, Code, Heading1, 
  List, Settings, Palette, Check, LayoutGrid, FileCode, CheckCircle2
} from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

type ThemePreset = 'purple' | 'blue' | 'emerald' | 'dark';
type PageSizeOption = 'a4' | 'letter';
type OrientationOption = 'portrait' | 'landscape';
type MarginOption = 'normal' | 'compact' | 'spacious';

const TEMPLATES = [
  {
    id: 'studio',
    label: '✨ Studio Feature Demo',
    content: `# 🚀 Markdown Document Studio

Welcome to the **iCreatePDF** Markdown Studio. Compile formatted Markdown into clean PDFs 100% locally in your browser.

## ✨ Key Features
- **Privacy First:** 0% cloud uploads. Everything compiles in browser memory.
- **GFM Support:** Full support for tables, task lists, code blocks, and blockquotes.
- **Custom Themes:** Choose from Modern Purple, Corporate Blue, Emerald Eco, or Classic Dark.

## 📋 Project Checklist
- [x] Create styled Markdown document
- [x] Configure page setup & font sizes
- [ ] Export to A4 PDF document

## 📊 Sample Data Table
| Feature | Supported | Mode |
| --- | --- | --- |
| GFM Tables | Yes | Grid Auto |
| Task Checkboxes | Yes | Styled Icons |
| Custom Color Themes | Yes | 4 Presets |

## 💻 Code Snippet
\`\`\`javascript
function convertMarkdownToPdf(markdownText) {
  return "Clean PDF generated 100% locally!";
}
\`\`\`

> *"Markdown is the ultimate lightweight writing format for modern creators."*`
  },
  {
    id: 'spec',
    label: '🛠️ Technical Specification',
    content: `# 🛠️ Project Specification: Real-Time Analytics Pipeline

**Author:** Engineering Team  
**Date:** July 2026  
**Status:** Proposal / Draft  

---

## 1. Executive Summary
This document outlines the system architecture for the new high-throughput event processing engine.

## 2. Infrastructure Architecture
- **Ingestion:** Kafka Cluster (3 broker nodes)
- **Processing:** Apache Flink worker pools
- **Storage:** ClickHouse distributed database

| Layer | Technology | Target SLA |
| --- | --- | --- |
| Ingestion Layer | Apache Kafka | 100k events/sec |
| Processing Engine | Apache Flink | < 50ms Latency |
| Storage Layer | ClickHouse | 10 TB Retention |

## 3. Implementation Plan
- [x] Finalize event schema definition
- [x] Configure load balancer policies
- [ ] Benchmark synthetic workloads

\`\`\`json
{
  "service": "analytics-ingest",
  "port": 8080,
  "workers": 16,
  "healthCheck": "/healthz"
}
\`\`\``
  },
  {
    id: 'notes',
    label: '📝 Meeting Notes',
    content: `# 📝 Product Engineering Sync

**Date:** July 23, 2026  
**Attendees:** Lead Engineer, Product Manager, UX Designer  

---

## 🎯 Strategic Objectives
- Review Q3 Product Roadmap & Feature rollouts.
- Finalize client-side Markdown to PDF engine enhancements.

## 💬 Key Takeaways
- **Performance:** Instant local compilation improves conversion rates.
- **Security:** Zero server uploads is a key privacy requirement.

## ✅ Action Items
- [x] Implement GFM table renderer in PDF engine
- [x] Add theme selector & page numbering options
- [ ] Run cross-browser compatibility suite`
  }
];

export function MarkdownToPdfTool() {
  const [markdown, setMarkdown] = useState(TEMPLATES[0].content);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [theme, setTheme] = useState<ThemePreset>('purple');
  const [pageSize, setPageSize] = useState<PageSizeOption>('a4');
  const [orientation, setOrientation] = useState<OrientationOption>('portrait');
  const [margin, setMargin] = useState<MarginOption>('normal');
  const [showPageNumbers, setShowPageNumbers] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Document Metrics
  const lineCount = markdown.split('\n').length;
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charCount = markdown.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const insertSyntax = (prefix: string, suffix: string = '') => {
    setMarkdown((prev) => `${prev}\n${prefix}sample text${suffix}`);
  };

  const insertTable = () => {
    const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| --- | --- | --- |\n| Item 1 | Data A | Active |\n| Item 2 | Data B | Pending |\n`;
    setMarkdown((prev) => prev + tableTemplate);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setMarkdown(event.target.result);
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseMarkdownToHtml = (md: string): string => {
    const lines = md.split(/\r?\n/);
    const htmlLines: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let tableRows: string[] = [];

    const flushTable = () => {
      if (tableRows.length === 0) return;
      let tableHtml = '<table border="1" style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px;">';
      
      let isHeader = true;
      for (let i = 0; i < tableRows.length; i++) {
        const rowStr = tableRows[i].trim();
        if (/^\|?(\s*:?-+:?\s*\|)+/.test(rowStr)) {
          isHeader = false;
          continue;
        }

        const cells = rowStr.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.length === 0) continue;

        if (isHeader) {
          tableHtml += '<thead><tr style="background:#f3f4f6;">';
          cells.forEach(c => {
            tableHtml += `<th style="padding:6px 10px; text-align:left; border:1px solid #e5e7eb;">${c.trim()}</th>`;
          });
          tableHtml += '</tr></thead><tbody>';
          isHeader = false;
        } else {
          tableHtml += '<tr>';
          cells.forEach(c => {
            tableHtml += `<td style="padding:6px 10px; text-align:left; border:1px solid #e5e7eb;">${c.trim()}</td>`;
          });
          tableHtml += '</tr>';
        }
      }
      tableHtml += '</tbody></table>';
      htmlLines.push(tableHtml);
      tableRows = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        flushTable();
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

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableRows.push(trimmed);
        continue;
      } else {
        flushTable();
      }

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

      if (/^[\-\*\+] \[x\] (.*?)$/i.test(line)) {
        const content = line.replace(/^[\-\*\+] \[x\] /i, '');
        htmlLines.push(`<li data-task="checked">${content}</li>`);
        continue;
      }
      if (/^[\-\*\+] \[ \] (.*?)$/.test(line)) {
        const content = line.replace(/^[\-\*\+] \[ \] /, '');
        htmlLines.push(`<li data-task="unchecked">${content}</li>`);
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

    flushTable();

    if (inCodeBlock && codeBlockContent.length > 0) {
      htmlLines.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
    }

    const themeHeaderColor = theme === 'purple' ? '#8b5cf6' : theme === 'blue' ? '#2563eb' : theme === 'emerald' ? '#059669' : '#38bdf8';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #1f2937; line-height: 1.6; }
          h1 { color: ${themeHeaderColor}; font-size: 24px; margin-top: 0; margin-bottom: 12px; font-weight: 700; }
          h2 { color: #111827; font-size: 18px; margin-top: 20px; margin-bottom: 8px; font-weight: 700; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px; }
          h3 { color: #374151; font-size: 14px; margin-top: 16px; margin-bottom: 6px; font-weight: 600; }
          p { font-size: 13px; color: #374151; margin-bottom: 10px; }
          li { font-size: 13px; color: #374151; margin-left: 20px; margin-bottom: 4px; }
          blockquote { font-size: 13px; color: #6b7280; border-left: 3px solid ${themeHeaderColor}; padding-left: 12px; margin-bottom: 10px; font-style: italic; }
          pre { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; font-family: ui-monospace, monospace; font-size: 12px; border-radius: 8px; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 12px; }
          th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; }
          th { background: #f1f5f9; font-weight: 600; color: #0f172a; }
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

      // Page Dimensions
      let baseWidth = pageSize === 'letter' ? 612.0 : 595.276;
      let baseHeight = pageSize === 'letter' ? 792.0 : 841.890;
      
      const pageWidth = orientation === 'landscape' ? baseHeight : baseWidth;
      const pageHeight = orientation === 'landscape' ? baseWidth : baseHeight;

      // Margins
      const marginSize = margin === 'compact' ? 30 : margin === 'spacious' ? 70 : 50;
      const leftMargin = marginSize;
      const rightMargin = marginSize;
      const topMargin = marginSize;
      const bottomMargin = marginSize;
      const maxPrintWidth = pageWidth - leftMargin - rightMargin;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - topMargin;

      // Theme Color Palette
      const themeColors = {
        purple: { h1: rgb(0.54, 0.36, 0.96), headerBg: rgb(0.95, 0.93, 1.0), border: rgb(0.85, 0.82, 0.95) },
        blue: { h1: rgb(0.15, 0.39, 0.92), headerBg: rgb(0.92, 0.95, 1.0), border: rgb(0.8, 0.86, 0.95) },
        emerald: { h1: rgb(0.02, 0.59, 0.41), headerBg: rgb(0.92, 0.98, 0.95), border: rgb(0.8, 0.92, 0.86) },
        dark: { h1: rgb(0.22, 0.74, 0.97), headerBg: rgb(0.94, 0.96, 0.98), border: rgb(0.85, 0.88, 0.92) }
      }[theme];

      const elements = doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote, pre, table, hr');

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

        // Table Handling
        if (tagName === 'table') {
          const rows = el.querySelectorAll('tr');
          if (rows.length === 0) return;

          let maxCols = 0;
          rows.forEach(r => { maxCols = Math.max(maxCols, r.children.length); });
          if (maxCols === 0) return;

          const colWidth = maxPrintWidth / maxCols;
          const cellPadding = 6;
          const cellFontSize = 9.5;

          rows.forEach((row) => {
            const cells = Array.from(row.children) as HTMLElement[];
            const isHeaderRow = cells.some(c => c.tagName.toLowerCase() === 'th');
            const fontToUse = isHeaderRow ? boldFont : regularFont;

            let rowLineCount = 1;
            cells.forEach(cell => {
              const cellText = sanitizeTextForPdf(cell.textContent || '');
              const lines = wrapText(cellText, fontToUse, cellFontSize, colWidth - (cellPadding * 2));
              rowLineCount = Math.max(rowLineCount, lines.length);
            });

            const rowHeight = (rowLineCount * (cellFontSize * 1.3)) + (cellPadding * 2);

            if (currentY - rowHeight < bottomMargin) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              currentY = pageHeight - topMargin;
            }

            cells.forEach((cell, colIndex) => {
              const cellX = leftMargin + (colIndex * colWidth);
              const cellY = currentY - rowHeight;

              if (isHeaderRow) {
                page.drawRectangle({
                  x: cellX,
                  y: cellY,
                  width: colWidth,
                  height: rowHeight,
                  color: themeColors.headerBg,
                });
              }

              page.drawRectangle({
                x: cellX,
                y: cellY,
                width: colWidth,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: themeColors.border,
              });

              const cellText = sanitizeTextForPdf(cell.textContent || '');
              const lines = wrapText(cellText, fontToUse, cellFontSize, colWidth - (cellPadding * 2));

              let textY = currentY - cellPadding - cellFontSize;
              lines.forEach(l => {
                page.drawText(l, {
                  x: cellX + cellPadding,
                  y: textY,
                  size: cellFontSize,
                  font: fontToUse,
                  color: isHeaderRow ? themeColors.h1 : rgb(0.2, 0.2, 0.2),
                });
                textY -= (cellFontSize * 1.3);
              });
            });

            currentY -= rowHeight;
          });

          currentY -= 10;
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
          pdfColor = themeColors.h1;
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
          const taskStatus = el.getAttribute('data-task');
          if (taskStatus === 'checked') {
            prefix = '[v]  ';
          } else if (taskStatus === 'unchecked') {
            prefix = '[ ]  ';
          } else {
            prefix = olNum ? `${olNum}.  ` : '-  ';
          }
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

      // Draw Page Numbers at bottom
      if (showPageNumbers) {
        const pages = pdfDoc.getPages();
        const total = pages.length;
        pages.forEach((p, idx) => {
          const { width } = p.getSize();
          const pageStr = `Page ${idx + 1} of ${total}`;
          const textW = regularFont.widthOfTextAtSize(pageStr, 9);
          p.drawText(pageStr, {
            x: width - rightMargin - textW,
            y: 20,
            size: 9,
            font: regularFont,
            color: rgb(0.5, 0.5, 0.5),
          });
        });
      }

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
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Control Toolbar */}
      <div className="bg-card border border-foreground/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Templates Selector */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono text-foreground/60 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            Templates:
          </span>
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setMarkdown(tmpl.content)}
              className="text-xs px-3 py-1.5 rounded-lg bg-foreground/5 hover:bg-brand/10 hover:text-brand transition-colors text-foreground font-medium whitespace-nowrap"
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".md,.txt"
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Import .md File
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMarkdown('')}
            className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace Markdown Studio Panel */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Tab Header & Formatting Shortcuts */}
            <div className="flex flex-wrap justify-between items-center bg-card/80 px-4 py-3 border-b border-foreground/10 gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    activeTab === 'editor' ? 'bg-brand/10 text-brand font-semibold' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Markdown Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    activeTab === 'preview' ? 'bg-brand/10 text-brand font-semibold' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </button>
              </div>

              {/* Formatting Shortcuts */}
              {activeTab === 'editor' && (
                <div className="flex items-center gap-1 overflow-x-auto">
                  <button onClick={() => insertSyntax('# ')} title="Heading 1" className="p-1.5 hover:bg-foreground/5 rounded text-foreground/70 hover:text-foreground">
                    <Heading1 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => insertSyntax('- ')} title="Bullet List" className="p-1.5 hover:bg-foreground/5 rounded text-foreground/70 hover:text-foreground">
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => insertSyntax('- [ ] ')} title="Task List" className="p-1.5 hover:bg-foreground/5 rounded text-foreground/70 hover:text-foreground">
                    <CheckSquare className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={insertTable} title="GFM Table" className="p-1.5 hover:bg-foreground/5 rounded text-foreground/70 hover:text-foreground">
                    <Table className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => insertSyntax('```\n', '\n```')} title="Code Block" className="p-1.5 hover:bg-foreground/5 rounded text-foreground/70 hover:text-foreground">
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Editor or Preview Pane */}
            {activeTab === 'editor' ? (
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Write or paste your Markdown content here..."
                className="w-full h-[480px] bg-transparent p-6 font-mono text-xs text-foreground/90 focus:outline-none resize-none leading-relaxed"
              />
            ) : (
              <div 
                className="w-full h-[480px] p-6 overflow-y-auto bg-background/50 prose prose-invert max-w-none text-xs"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(markdown) }}
              />
            )}

            {/* Document Metrics Bar */}
            <div className="flex items-center justify-between bg-card/40 px-4 py-2.5 border-t border-foreground/5 text-[11px] font-mono text-foreground/50">
              <div className="flex items-center gap-4">
                <span>Lines: {lineCount}</span>
                <span>Words: {wordCount}</span>
                <span>Characters: {charCount}</span>
              </div>
              <div>Estimated Read: ~{readTime} min</div>
            </div>

          </div>

          <iframe ref={iframeRef} className="hidden" title="Render sandbox" />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* PDF Output Settings & Export Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
            
            <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
              <Settings className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">PDF Export Studio</h3>
            </div>

            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-foreground/70 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-brand" />
                Color Theme Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'purple', label: '💜 Modern Purple' },
                  { id: 'blue', label: '💙 Corporate Blue' },
                  { id: 'emerald', label: '💚 Emerald Eco' },
                  { id: 'dark', label: '🖤 Classic Dark' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as ThemePreset)}
                    className={`text-xs px-3 py-2 rounded-xl border transition-all text-left font-medium ${
                      theme === t.id
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-foreground/10 hover:border-foreground/20 text-foreground/70'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/60">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as PageSizeOption)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="a4">A4 (Standard)</option>
                  <option value="letter">US Letter</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/60">Orientation</label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as OrientationOption)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/60">Page Margins</label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value as MarginOption)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="normal">Normal (50pt)</option>
                  <option value="compact">Compact (30pt)</option>
                  <option value="spacious">Spacious (70pt)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/60">Page Numbers</label>
                <button
                  onClick={() => setShowPageNumbers(!showPageNumbers)}
                  className={`w-full py-2 px-3 rounded-lg border text-xs text-center font-medium transition-colors ${
                    showPageNumbers
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-foreground/10 text-foreground/50'
                  }`}
                >
                  {showPageNumbers ? '✓ Footer Page #' : 'No Page #' }
                </button>
              </div>
            </div>

            {/* Export Trigger */}
            <div className="pt-4 border-t border-foreground/5">
              {isProcessing ? (
                <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Compiling PDF...
                </Button>
              ) : downloadUrl ? (
                <div className="space-y-2">
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <Download className="w-5 h-5" />
                    Download Formatted PDF
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDownloadUrl(null)}
                    className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                  >
                    Re-Compile / Edit Setup
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={triggerMarkdownToPdf}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
                >
                  <Eye className="w-4 h-4" />
                  Compile to PDF
                </Button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
