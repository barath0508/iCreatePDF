'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, Download, FileText, Settings, Sparkles } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

interface RisRecord {
  type?: string;
  authors: string[];
  title?: string;
  journal?: string;
  year?: string;
  volume?: string;
  issue?: string;
  startPage?: string;
  endPage?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  place?: string;
  abstract?: string;
}

interface StyledWord {
  text: string;
  isItalic: boolean;
}

export function RisToPdfTool() {
  const [inputText, setInputText] = useState<string>(`TY  - JOUR
AU  - Shannon, Claude E.
TI  - A Mathematical Theory of Communication
JO  - Bell System Technical Journal
VL  - 27
IS  - 3
SP  - 379
EP  - 423
PY  - 1948
DO  - 10.1002/j.1538-7305.1948.tb01338.x
ER  - 

TY  - BOOK
AU  - Turing, Alan M.
TI  - Computing Machinery and Intelligence
PB  - Oxford University Press
PY  - 1950
ER  - `);

  const [records, setRecords] = useState<RisRecord[]>([]);
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'harvard' | 'chicago'>('apa');
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>('Portrait');
  const [marginSize, setMarginSize] = useState<'0.5' | '0.75' | '1.0'>('0.75');
  const [fontFamily, setFontFamily] = useState<'Helvetica' | 'Courier' | 'TimesRoman'>('Helvetica');
  const [fontSize, setFontSize] = useState<number>(11);
  const [lineSpacing, setLineSpacing] = useState<number>(1.4);
  const [headerTitle, setHeaderTitle] = useState<string>('Bibliography');
  const [addPageNumbers, setAddPageNumbers] = useState<boolean>(true);
  const [hangingIndent, setHangingIndent] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-parse on load or input change
  useEffect(() => {
    try {
      const parsed = parseRis(inputText);
      setRecords(parsed);
    } catch (e) {
      // Ignore preview errors
    }
  }, [inputText]);

  useEffect(() => {
    // Check for preloaded files (if any integration exists)
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  const parseRis = (text: string): RisRecord[] => {
    const parsedRecords: RisRecord[] = [];
    let currentRecord: RisRecord = { authors: [] };

    const lines = text.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      const match = line.match(/^([A-Z0-9]{2})\s*-\s*(.*)$/);
      if (!match) continue;

      const tag = match[1];
      const val = match[2].trim();

      if (tag === 'TY') {
        if (currentRecord.type || currentRecord.authors.length > 0 || currentRecord.title) {
          parsedRecords.push(currentRecord);
        }
        currentRecord = { type: val, authors: [] };
      } else if (tag === 'ER') {
        if (currentRecord.type || currentRecord.authors.length > 0 || currentRecord.title) {
          parsedRecords.push(currentRecord);
        }
        currentRecord = { authors: [] };
      } else if (tag === 'AU') {
        currentRecord.authors.push(val);
      } else if (tag === 'TI' || tag === 'T1') {
        currentRecord.title = val;
      } else if (tag === 'JO' || tag === 'T2' || tag === 'JF' || tag === 'JA') {
        currentRecord.journal = val;
      } else if (tag === 'PY' || tag === 'Y1') {
        const yearMatch = val.match(/\d{4}/);
        currentRecord.year = yearMatch ? yearMatch[0] : val;
      } else if (tag === 'VL') {
        currentRecord.volume = val;
      } else if (tag === 'IS') {
        currentRecord.issue = val;
      } else if (tag === 'SP') {
        currentRecord.startPage = val;
      } else if (tag === 'EP') {
        currentRecord.endPage = val;
      } else if (tag === 'DO') {
        currentRecord.doi = val;
      } else if (tag === 'UR') {
        currentRecord.url = val;
      } else if (tag === 'PB') {
        currentRecord.publisher = val;
      } else if (tag === 'CY') {
        currentRecord.place = val;
      } else if (tag === 'AB' || tag === 'N2') {
        currentRecord.abstract = val;
      }
    }

    if (currentRecord.type || currentRecord.authors.length > 0 || currentRecord.title) {
      if (!parsedRecords.includes(currentRecord)) {
        parsedRecords.push(currentRecord);
      }
    }

    return parsedRecords.filter(r => r.type || r.authors.length > 0 || r.title);
  };

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'ris' && ext !== 'txt') {
      setError('Only RIS (.ris) or plain text (.txt) citation files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setInputText((e.target?.result as string) || '');
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsText(uploadedFile);
  };

  const formatAuthors = (authors: string[], style: 'apa' | 'mla' | 'harvard' | 'chicago'): string => {
    if (!authors || authors.length === 0) return 'Unknown Author';

    const parseAuthorName = (name: string) => {
      const parts = name.split(',');
      if (parts.length === 2) {
        return { last: parts[0].trim(), first: parts[1].trim() };
      }
      const spaceParts = name.trim().split(/\s+/);
      if (spaceParts.length > 1) {
        const last = spaceParts[spaceParts.length - 1];
        const first = spaceParts.slice(0, spaceParts.length - 1).join(' ');
        return { last, first };
      }
      return { last: name.trim(), first: '' };
    };

    const formatted = authors.map(auth => {
      const { last, first } = parseAuthorName(auth);
      if (!first) return { last, first, initials: '' };
      const initials = first.split(/\s+/).map(p => p[0] ? p[0] + '.' : '').join(' ');
      return { last, first, initials };
    });

    if (style === 'apa' || style === 'harvard') {
      const names = formatted.map(f => f.initials ? `${f.last}, ${f.initials}` : f.last);
      if (names.length === 1) return names[0];
      if (names.length === 2) return `${names[0]} & ${names[1]}`;
      if (names.length > 2) {
        return names.slice(0, -1).join(', ') + `, & ${names[names.length - 1]}`;
      }
    } else if (style === 'mla') {
      if (formatted.length === 1) {
        return `${formatted[0].last}, ${formatted[0].first}`;
      }
      if (formatted.length === 2) {
        return `${formatted[0].last}, ${formatted[0].first}, and ${formatted[1].first} ${formatted[1].last}`;
      }
      return `${formatted[0].last}, ${formatted[0].first}, et al.`;
    } else if (style === 'chicago') {
      if (formatted.length === 1) {
        return `${formatted[0].last}, ${formatted[0].first}`;
      }
      if (formatted.length === 2) {
        return `${formatted[0].last}, ${formatted[0].first} and ${formatted[1].first} ${formatted[1].last}`;
      }
      if (formatted.length > 2) {
        const mainPart = formatted.slice(0, -1).map((f, idx) => idx === 0 ? `${f.last}, ${f.first}` : `${f.first} ${f.last}`).join(', ');
        return `${mainPart}, and ${formatted[formatted.length - 1].first} ${formatted[formatted.length - 1].last}`;
      }
    }
    return 'Unknown Author';
  };

  const formatCitation = (record: RisRecord, style: 'apa' | 'mla' | 'harvard' | 'chicago'): string => {
    const authorStr = formatAuthors(record.authors, style);
    const year = record.year || 'n.d.';
    const title = record.title ? record.title.replace(/\.$/, '') : 'Untitled Document';

    let source = record.journal || record.publisher || '';
    if (record.place && record.publisher) {
      source = `${record.place}: ${record.publisher}`;
    }

    const vol = record.volume;
    const issue = record.issue;
    const sp = record.startPage;
    const ep = record.endPage;
    const pages = sp && ep ? `${sp}-${ep}` : (sp || ep || '');

    const doi = record.doi;
    const url = record.url;
    const identifier = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : (url || '');

    let citation = '';

    switch (style) {
      case 'apa':
        citation = `${authorStr}`;
        citation += ` (${year}).`;
        citation += ` ${title}.`;
        if (source) citation += ` *${source}*`;
        if (vol) {
          citation += `, *${vol}*`;
          if (issue) citation += `(${issue})`;
        }
        if (pages) citation += `, ${pages}`;
        citation += '.';
        if (identifier) citation += ` ${identifier}`;
        break;

      case 'mla':
        citation = `${authorStr}.`;
        citation += ` "${title}."`;
        if (source) citation += ` *${source}*`;
        if (vol) citation += `, vol. ${vol}`;
        if (issue) citation += `, no. ${issue}`;
        citation += `, ${year}`;
        if (pages) citation += `, pp. ${pages}`;
        citation += '.';
        if (identifier) citation += ` ${identifier}`;
        break;

      case 'harvard':
        citation = `${authorStr}, ${year}.`;
        citation += ` ${title}.`;
        if (source) citation += ` *${source}*`;
        if (vol) {
          citation += `, ${vol}`;
          if (issue) citation += `(${issue})`;
        }
        if (pages) citation += `, pp. ${pages}`;
        citation += '.';
        if (identifier) citation += ` Available at: ${identifier}`;
        break;

      case 'chicago':
        citation = `${authorStr}.`;
        citation += ` "${title}."`;
        if (source) {
          citation += ` *${source}*`;
        }
        if (vol) {
          citation += ` ${vol}`;
          if (issue) citation += `, no. ${issue}`;
        }
        citation += ` (${year})`;
        if (pages) citation += `: ${pages}`;
        citation += '.';
        if (identifier) citation += ` ${identifier}`;
        break;
    }

    return citation;
  };

  const parseToStyledWords = (text: string): StyledWord[] => {
    const parts = text.split('*');
    const words: StyledWord[] = [];

    parts.forEach((part, index) => {
      const isItalic = index % 2 === 1;
      const rawWords = part.split(/(\s+)/);
      rawWords.forEach(w => {
        if (w) {
          words.push({ text: w, isItalic });
        }
      });
    });
    return words;
  };

  const triggerRisToPdf = async () => {
    if (records.length === 0) {
      setError('Please input or upload valid RIS citation data.');
      return;
    }
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

      // Dimensions (in points: 1 pt = 1/72 inch)
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

      const margin = parseFloat(marginSize) * 72;
      const maxLineWidth = widthPt - (margin * 2);
      const lineSpacingHeight = fontSize * lineSpacing;

      let currentPage = pdfDoc.addPage([widthPt, heightPt]);
      let currentY = heightPt - margin - (headerTitle ? 40 : 0);

      // Draw document title if it exists on first page
      if (headerTitle) {
        currentPage.drawText(sanitizeTextForPdf(headerTitle), {
          x: margin,
          y: heightPt - margin + 15,
          size: 16,
          font: fontBold,
          color: rgb(0.1, 0.1, 0.1),
        });
      }

      for (let recordIndex = 0; recordIndex < records.length; recordIndex++) {
        const record = records[recordIndex];
        const formattedText = formatCitation(record, citationStyle);
        const sanitizedText = sanitizeTextForPdf(formattedText);
        const styledWords = parseToStyledWords(sanitizedText);

        let currentX = margin;
        let isFirstLineOfCitation = true;

        // Check page overflow before starting new citation
        if (currentY - lineSpacingHeight * 2 < margin + 30) {
          currentPage = pdfDoc.addPage([widthPt, heightPt]);
          currentY = heightPt - margin;
        }

        // Draw citations
        for (let i = 0; i < styledWords.length; i++) {
          const word = styledWords[i];
          const wordFont = word.isItalic ? fontItalic : font;
          const wordWidth = wordFont.widthOfTextAtSize(word.text, fontSize);

          // Handle wrapping
          if (currentX + wordWidth > widthPt - margin) {
            currentY -= lineSpacingHeight;
            isFirstLineOfCitation = false;
            
            // Check overflow
            if (currentY < margin + 30) {
              currentPage = pdfDoc.addPage([widthPt, heightPt]);
              currentY = heightPt - margin;
            }
            
            // Indent for hanging indent
            currentX = hangingIndent ? margin + 36 : margin;
          }

          // Draw word (if not just leading space on wrapped line)
          const textToDraw = (currentX === (hangingIndent ? margin + 36 : margin) && word.text.startsWith(' '))
            ? word.text.trimStart()
            : word.text;

          if (textToDraw !== '') {
            currentPage.drawText(textToDraw, {
              x: currentX,
              y: currentY - fontSize,
              size: fontSize,
              font: wordFont,
              color: rgb(0.1, 0.1, 0.1),
            });
            currentX += wordFont.widthOfTextAtSize(textToDraw, fontSize);
          }
        }

        // Extra spacing between citations
        currentY -= lineSpacingHeight * 1.6;
      }

      // Draw Footers/Page Numbers
      const totalPages = pdfDoc.getPageCount();
      for (let i = 0; i < totalPages; i++) {
        const p = pdfDoc.getPage(i);
        if (addPageNumbers) {
          const numberText = `Page ${i + 1} of ${totalPages}`;
          const textWidth = font.widthOfTextAtSize(numberText, 8);
          p.drawText(numberText, {
            x: widthPt - margin - textWidth,
            y: margin - 20,
            size: 8,
            font: font,
            color: rgb(0.5, 0.5, 0.5),
          });
        }
        // Small signature footer
        p.drawText('Compiled client-side with iCreatePDF.com', {
          x: margin,
          y: margin - 20,
          size: 8,
          font: fontItalic,
          color: rgb(0.6, 0.6, 0.6),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to render RIS citations to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'citations.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex justify-between items-center bg-card/60 px-4 py-3 border-b border-foreground/10">
              <span className="text-xs font-mono text-brand flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                RIS Data Workspace
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-foreground/50 hover:text-foreground flex items-center gap-1 hover:bg-foreground/5 px-2.5 py-1 rounded-lg transition-colors border border-foreground/5"
              >
                <Upload className="w-3 h-3" />
                Upload .ris file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleFiles(e.target.files || [])}
                accept=".ris,.txt"
                className="hidden"
              />
            </div>
            
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative ${isDraggingOver ? 'bg-brand/5' : ''} transition-colors`}
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your RIS tags here or drag and drop a .ris file..."
                className="w-full h-80 px-4 py-3 bg-transparent text-sm font-mono border-0 focus:ring-0 focus:outline-none text-foreground/90 resize-none leading-relaxed"
              />
              {isDraggingOver && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex flex-col items-center justify-center border-2 border-dashed border-brand/50 rounded-b-2xl">
                  <Upload className="w-10 h-10 text-brand animate-bounce mb-2" />
                  <span className="text-sm font-medium">Drop your RIS citation file here</span>
                </div>
              )}
            </div>
          </div>

          {/* Reference List Preview */}
          {records.length > 0 && (
            <div className="bg-card border border-foreground/10 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand" />
                Parsed Citation Preview ({records.length})
              </h3>
              <div className="divide-y divide-foreground/5 max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {records.map((rec, i) => (
                  <div key={i} className="pt-3 first:pt-0 text-xs text-foreground/75 leading-relaxed">
                    <span className="font-semibold text-brand/90 font-mono block mb-1">
                      [{i + 1}] {rec.authors[0] ? rec.authors[0].split(',')[0] : 'Unknown'} ({rec.year || 'n.d.'})
                    </span>
                    <span className="text-foreground/90 font-medium">“{rec.title || 'Untitled'}”</span>
                    {rec.journal && <span className="italic text-foreground/60"> — {rec.journal}</span>}
                    {rec.volume && <span className="text-foreground/50">, Vol. {rec.volume}</span>}
                    {rec.issue && <span className="text-foreground/50">({rec.issue})</span>}
                    {rec.startPage && <span className="text-foreground/50">, pp. {rec.startPage}{rec.endPage ? `-${rec.endPage}` : ''}</span>}
                    {rec.doi && <span className="block font-mono text-[10px] text-brand/60 mt-0.5">DOI: {rec.doi}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Configurations Column (Right) */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-semibold flex items-center gap-2 border-b border-foreground/5 pb-3">
            <Settings className="w-4 h-4 text-brand" />
            PDF Formatting Settings
          </h3>

          <div className="space-y-4 text-xs">
            {/* Citation Style */}
            <div className="space-y-1.5">
              <label className="font-medium text-foreground/70">Citation Style</label>
              <select
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value as any)}
                className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-brand"
              >
                <option value="apa">APA 7th Edition</option>
                <option value="mla">MLA 9th Edition</option>
                <option value="harvard">Harvard Style</option>
                <option value="chicago">Chicago Manual</option>
              </select>
            </div>

            {/* Typography */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground/70">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-brand"
                >
                  <option value="Helvetica">Helvetica (Sans)</option>
                  <option value="TimesRoman">Times (Serif)</option>
                  <option value="Courier">Courier (Mono)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-foreground/70">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-brand"
                >
                  <option value="9">9 pt</option>
                  <option value="10">10 pt</option>
                  <option value="11">11 pt</option>
                  <option value="12">12 pt</option>
                  <option value="13">13 pt</option>
                </select>
              </div>
            </div>

            {/* Layout Options */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground/70">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-brand"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-foreground/70">Margins</label>
                <select
                  value={marginSize}
                  onChange={(e) => setMarginSize(e.target.value as any)}
                  className="w-full bg-background border border-foreground/10 rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-brand"
                >
                  <option value="0.5">0.5 inch (Narrow)</option>
                  <option value="0.75">0.75 inch (Normal)</option>
                  <option value="1.0">1.0 inch (Wide)</option>
                </select>
              </div>
            </div>

            {/* Line spacing & header title */}
            <div className="space-y-1.5">
              <label className="font-medium text-foreground/70">Bibliography Header Title</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                placeholder="e.g. Bibliography / Works Cited"
                className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-brand"
              />
            </div>

            {/* Formatting toggles */}
            <div className="flex flex-col gap-2 pt-2 border-t border-foreground/5">
              <label className="flex items-center gap-2 cursor-pointer text-foreground/80 hover:text-foreground">
                <input
                  type="checkbox"
                  checked={hangingIndent}
                  onChange={(e) => setHangingIndent(e.target.checked)}
                  className="rounded border-foreground/20 text-brand focus:ring-brand"
                />
                Apply Hanging Indent (0.5")
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-foreground/80 hover:text-foreground">
                <input
                  type="checkbox"
                  checked={addPageNumbers}
                  onChange={(e) => setAddPageNumbers(e.target.checked)}
                  className="rounded border-foreground/20 text-brand focus:ring-brand"
                />
                Include Page Numbers
              </label>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-foreground/5">
            {downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl py-5 transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Citations PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={triggerRisToPdf}
                  disabled={isProcessing}
                  className="w-full font-medium py-5 border-foreground/10 hover:bg-foreground/5 text-foreground/80 hover:text-foreground"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Re-compiling...
                    </>
                  ) : (
                    'Re-compile Settings'
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={triggerRisToPdf}
                disabled={isProcessing || records.length === 0}
                className="w-full bg-brand hover:bg-brand/90 text-white font-semibold rounded-xl py-5 transition-all shadow-md shadow-brand/10 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Compiling PDF...
                  </>
                ) : (
                  <>
                    Compile RIS to PDF
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
