'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader2, Download, FileText, Settings, Play } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function TxtToPdfTool() {
  const [text, setText] = useState<string>(`PROPOSAL FOR GREEN INITIATIVE

This proposal outlines the deployment of local, privacy-first software workflows to mitigate corporate digital carbon footprints. 

1. Local In-Browser Processing
iCreatePDF provides high-performance document compilers directly within the browser sandbox. By eliminating client-to-server data transfers, we reduce data center cooling energy requirements and network routing traffic overhead.

2. Benefits of Private Processing
- Zero network latency for files.
- Absolute data confidentiality.
- Compliance with local data sovereignty regulations (GDPR, HIPAA).

3. Proposed Action Items
- Deprecate old server-side converter licenses.
- Deploy iCreatePDF client tools across local intranets.
- Provide training on locally compiled document assembly.

Prepared by: Corporate Sustainability Group
Date: May 2026`);

  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>('Portrait');
  const [marginSize, setMarginSize] = useState<'0.5' | '0.75' | '1.0'>('0.75');
  const [fontFamily, setFontFamily] = useState<'Helvetica' | 'Courier' | 'TimesRoman'>('Helvetica');
  const [fontSize, setFontSize] = useState<number>(11);
  const [lineSpacing, setLineSpacing] = useState<number>(1.3);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [addPageNumbers, setAddPageNumbers] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'txt') {
      setError('Only plain text (.txt) files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setText((e.target?.result as string) || '');
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsText(uploadedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const triggerTxtToPdf = async () => {
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();

      // Embed fonts
      let font;
      let fontBold;
      let fontItalic;

      switch (fontFamily) {
        case 'Courier':
          font = await pdfDoc.embedFont(StandardFonts.Courier);
          fontBold = await pdfDoc.embedFont(StandardFonts.CourierBold);
          fontItalic = await pdfDoc.embedFont(StandardFonts.CourierOblique);
          break;
        case 'TimesRoman':
          font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
          fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
          fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
          break;
        case 'Helvetica':
        default:
          font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
          fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
          break;
      }

      // Determine dimensions (in points: 1 pt = 1/72 inch)
      let widthPt = 595.276; // A4
      let heightPt = 841.890;

      if (pageSize === 'Letter') {
        widthPt = 612;
        heightPt = 792;
      } else if (pageSize === 'Legal') {
        widthPt = 612;
        heightPt = 1008;
      }

      if (orientation === 'Landscape') {
        const temp = widthPt;
        widthPt = heightPt;
        heightPt = temp;
      }

      // Margin
      const margin = parseFloat(marginSize) * 72; // Convert inches to points

      const maxLineWidth = widthPt - (margin * 2);
      const paragraphs = text.split('\n');
      const lines: string[] = [];

      // Simple wrapper based on characters and font widths
      for (const paragraph of paragraphs) {
        if (paragraph.trim() === '') {
          lines.push('');
          continue;
        }

        const words = paragraph.split(/\s+/);
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxLineWidth) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
      }

      // Layout parameters
      const headerHeight = headerTitle ? 40 : 0;
      const footerHeight = addPageNumbers ? 30 : 0;
      
      const contentHeightLimit = heightPt - margin * 2 - headerHeight - footerHeight;
      const lineSpacingHeight = fontSize * lineSpacing;

      let currentPage = pdfDoc.addPage([widthPt, heightPt]);
      let currentY = heightPt - margin - headerHeight;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if line overflows current page bounds
        if (currentY - lineSpacingHeight < margin + footerHeight) {
          currentPage = pdfDoc.addPage([widthPt, heightPt]);
          currentY = heightPt - margin - headerHeight;
        }

        if (line !== '') {
          currentPage.drawText(line, {
            x: margin,
            y: currentY - fontSize,
            size: fontSize,
            font: font,
            color: rgb(0.1, 0.1, 0.1),
          });
        }
        currentY -= lineSpacingHeight;
      }

      // After generating all pages, draw Headers and Footers
      const totalPages = pdfDoc.getPageCount();
      for (let i = 0; i < totalPages; i++) {
        const p = pdfDoc.getPage(i);

        // Header Title
        if (headerTitle.trim() !== '') {
          p.drawText(headerTitle, {
            x: margin,
            y: heightPt - margin + 15,
            size: 9,
            font: fontItalic,
            color: rgb(0.4, 0.4, 0.4),
          });
          // Draw thin separation line
          p.drawLine({
            start: { x: margin, y: heightPt - margin + 8 },
            end: { x: widthPt - margin, y: heightPt - margin + 8 },
            thickness: 0.5,
            color: rgb(0.8, 0.8, 0.8),
          });
        }

        // Footer Page Numbers
        if (addPageNumbers) {
          const numberText = `Page ${i + 1} of ${totalPages}`;
          const textWidth = font.widthOfTextAtSize(numberText, 9);
          p.drawText(numberText, {
            x: widthPt - margin - textWidth,
            y: margin - 20,
            size: 9,
            font: font,
            color: rgb(0.4, 0.4, 0.4),
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to render Text to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'converted-text.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Text Editor Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex justify-between items-center bg-zinc-900/50 px-4 py-3 border-b border-white/10">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Text Document Input
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1 hover:bg-white/5 px-2.5 py-1 rounded-lg transition-colors border border-white/5"
              >
                <Upload className="w-3 h-3" />
                Upload .txt file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleFiles(e.target.files || [])}
                accept=".txt"
                className="hidden"
              />
            </div>
            
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative ${isDraggingOver ? 'bg-purple-900/5' : ''} transition-colors`}
            >
              {isDraggingOver && (
                <div className="absolute inset-0 bg-black/70 border-2 border-dashed border-purple-500 rounded-b-2xl flex flex-col items-center justify-center pointer-events-none z-10">
                  <Upload className="w-8 h-8 text-purple-400 animate-bounce mb-2" />
                  <span className="text-sm font-semibold text-white">Drop .txt file to load text</span>
                </div>
              )}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write or paste your text here..."
                className="w-full h-[400px] bg-transparent p-6 font-mono text-xs text-white/90 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Configurations Action Panel */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Settings className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Settings</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Page Size & Orientation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="A4">A4 (Standard)</option>
                  <option value="Letter">Letter (US)</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Orientation</label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Portrait">Portrait</option>
                  <option value="Landscape">Landscape</option>
                </select>
              </div>
            </div>

            {/* Font Family & Margins */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Helvetica">Sans-Serif</option>
                  <option value="Courier">Monospace</option>
                  <option value="TimesRoman">Serif</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Margin size</label>
                <select
                  value={marginSize}
                  onChange={(e) => setMarginSize(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="0.5">0.5 inch (Narrow)</option>
                  <option value="0.75">0.75 inch (Normal)</option>
                  <option value="1.0">1.0 inch (Wide)</option>
                </select>
              </div>
            </div>

            {/* Font Size & Line Spacing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Font Size ({fontSize}pt)</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="9">9 pt</option>
                  <option value="10">10 pt</option>
                  <option value="11">11 pt</option>
                  <option value="12">12 pt</option>
                  <option value="14">14 pt</option>
                  <option value="16">16 pt</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-mono">Line Spacing</label>
                <select
                  value={lineSpacing}
                  onChange={(e) => setLineSpacing(Number(e.target.value))}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="1.15">1.15 (Compact)</option>
                  <option value="1.3">1.3 (Normal)</option>
                  <option value="1.5">1.5 (Standard)</option>
                  <option value="2.0">2.0 (Double)</option>
                </select>
              </div>
            </div>

            {/* Header Title */}
            <div className="space-y-1.5">
              <label className="text-white/40 font-mono">Header Stamp Text</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                placeholder="Optional running header title..."
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-xs"
              />
            </div>

            {/* Page Numbers Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <label className="text-white/70 font-mono cursor-pointer select-none" htmlFor="page-numbers-check">
                Add Page Numbers
              </label>
              <input
                type="checkbox"
                id="page-numbers-check"
                checked={addPageNumbers}
                onChange={(e) => setAddPageNumbers(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDownloadUrl(null)}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Modify Configuration
                </Button>
              </div>
            ) : (
              <Button
                onClick={triggerTxtToPdf}
                disabled={text.trim() === ''}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                Convert to PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
