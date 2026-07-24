'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Loader2, Download, Table, Plus, Settings, Trash2, 
  ArrowRight, CheckCircle, ShieldAlert, AlignLeft, AlignCenter, AlignRight, 
  Eye, Type, Palette, Move, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StandardFonts, rgb } from 'pdf-lib';
import { sanitizeTextForPdf } from '@/lib/pdf';

export interface FontOption {
  id: string;
  name: string;
  category: 'standard' | 'serif' | 'script' | 'sans';
  cssFamily: string;
  githubPath?: string;
  standardFontName?: 'Helvetica' | 'TimesRoman' | 'Courier';
}

export const FONT_OPTIONS: FontOption[] = [
  // Standard PDF Fonts
  { id: 'Helvetica', name: 'Helvetica (Standard Sans)', category: 'standard', cssFamily: 'Helvetica, Arial, sans-serif', standardFontName: 'Helvetica' },
  { id: 'TimesRoman', name: 'Times Roman (Standard Serif)', category: 'standard', cssFamily: 'Georgia, "Times New Roman", serif', standardFontName: 'TimesRoman' },
  { id: 'Courier', name: 'Courier (Standard Monospace)', category: 'standard', cssFamily: '"Courier New", Courier, monospace', standardFontName: 'Courier' },

  // Formal & Serif Certificate Fonts
  { id: 'Cinzel', name: 'Cinzel (Roman Certificate Header)', category: 'serif', cssFamily: "'Cinzel', serif", githubPath: 'ofl/cinzel/Cinzel%5Bwght%5D.ttf' },
  { id: 'Playfair Display', name: 'Playfair Display (Luxury Serif)', category: 'serif', cssFamily: "'Playfair Display', serif", githubPath: 'ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf' },
  { id: 'Cormorant Garamond', name: 'Cormorant Garamond (Regal Serif)', category: 'serif', cssFamily: "'Cormorant Garamond', serif", githubPath: 'ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf' },
  { id: 'Lora', name: 'Lora (Literary Serif)', category: 'serif', cssFamily: "'Lora', serif", githubPath: 'ofl/lora/Lora%5Bwght%5D.ttf' },
  { id: 'Merriweather', name: 'Merriweather (Editorial Serif)', category: 'serif', cssFamily: "'Merriweather', serif", githubPath: 'ofl/merriweather/Merriweather%5Bopsz,wdth,wght%5D.ttf' },
  { id: 'Cinzel Decorative', name: 'Cinzel Decorative (Ornate Serif)', category: 'serif', cssFamily: "'Cinzel Decorative', serif", githubPath: 'ofl/cinzeldecorative/CinzelDecorative-Regular.ttf' },

  // Calligraphy & Script Fonts
  { id: 'Great Vibes', name: 'Great Vibes (Elegant Calligraphy)', category: 'script', cssFamily: "'Great Vibes', cursive", githubPath: 'ofl/greatvibes/GreatVibes-Regular.ttf' },
  { id: 'Dancing Script', name: 'Dancing Script (Fluid Cursive)', category: 'script', cssFamily: "'Dancing Script', cursive", githubPath: 'ofl/dancingscript/DancingScript%5Bwght%5D.ttf' },
  { id: 'Alex Brush', name: 'Alex Brush (Formal Signature)', category: 'script', cssFamily: "'Alex Brush', cursive", githubPath: 'ofl/alexbrush/AlexBrush-Regular.ttf' },
  { id: 'Pinyon Script', name: 'Pinyon Script (Classic Script)', category: 'script', cssFamily: "'Pinyon Script', cursive", githubPath: 'ofl/pinyonscript/PinyonScript-Regular.ttf' },
  { id: 'Allura', name: 'Allura (Flowing Script)', category: 'script', cssFamily: "'Allura', cursive", githubPath: 'ofl/allura/Allura-Regular.ttf' },
  { id: 'MonteCarlo', name: 'MonteCarlo (Royal Cursive)', category: 'script', cssFamily: "'MonteCarlo', cursive", githubPath: 'ofl/montecarlo/MonteCarlo-Regular.ttf' },
  { id: 'Parisienne', name: 'Parisienne (Fine Script)', category: 'script', cssFamily: "'Parisienne', cursive", githubPath: 'ofl/parisienne/Parisienne-Regular.ttf' },
  { id: 'Sacramento', name: 'Sacramento (Delicate Cursive)', category: 'script', cssFamily: "'Sacramento', cursive", githubPath: 'ofl/sacramento/Sacramento-Regular.ttf' },
  { id: 'Tangerine', name: 'Tangerine (Calligraphic Script)', category: 'script', cssFamily: "'Tangerine', cursive", githubPath: 'ofl/tangerine/Tangerine-Regular.ttf' },

  // Modern Sans-Serif Fonts
  { id: 'Montserrat', name: 'Montserrat (Geometric Sans)', category: 'sans', cssFamily: "'Montserrat', sans-serif", githubPath: 'ofl/montserrat/Montserrat%5Bwght%5D.ttf' },
  { id: 'Roboto', name: 'Roboto (Clean Sans)', category: 'sans', cssFamily: "'Roboto', sans-serif", githubPath: 'ofl/roboto/Roboto%5Bwdth,wght%5D.ttf' },
  { id: 'Oswald', name: 'Oswald (Bold Display Sans)', category: 'sans', cssFamily: "'Oswald', sans-serif", githubPath: 'ofl/oswald/Oswald%5Bwght%5D.ttf' },
];

export const COLOR_PRESETS = [
  { label: 'Black', value: '#000000' },
  { label: 'Slate Dark', value: '#1E293B' },
  { label: 'Royal Gold', value: '#D97706' },
  { label: 'Burgundy', value: '#881337' },
  { label: 'Navy Blue', value: '#1E3A8A' },
  { label: 'Emerald', value: '#065F46' },
  { label: 'Silver Grey', value: '#475569' },
  { label: 'Rose Gold', value: '#E11D48' },
  { label: 'Warm Bronze', value: '#78350F' },
  { label: 'Royal Purple', value: '#581C87' },
  { label: 'Pure White', value: '#FFFFFF' },
];

interface Placeholder {
  id: string; // Column header name
  x: number; // Percent from left (0 - 100)
  y: number; // Percent from top (0 - 100)
  fontSize: number;
  fontFamily: string;
  isBold: boolean;
  color: string; // Hex color string
  alignment: 'left' | 'center' | 'right';
}

export function BulkCertificatesTool() {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [activePlaceholderId, setActivePlaceholderId] = useState<string | null>(null);
  const [nameColumn, setNameColumn] = useState<string>('');
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number } | null>(null);
  const [displayWidth, setDisplayWidth] = useState(600);
  const [previewMode, setPreviewMode] = useState<'sample' | 'field'>('sample');
  const [isSnappingToCenter, setIsSnappingToCenter] = useState({ x: false, y: false });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadZipUrl, setDownloadZipUrl] = useState<string | null>(null);
  const [isDraggingOverTemplate, setIsDraggingOverTemplate] = useState(false);
  const [isDraggingOverData, setIsDraggingOverData] = useState(false);

  const templateInputRef = useRef<HTMLInputElement>(null);
  const dataInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDragRef = useRef<{ id: string; startX: number; startY: number; startLeft: number; startTop: number } | null>(null);
  const fontBytesCache = useRef<Map<string, ArrayBuffer>>(new Map());

  // Inject Google Fonts stylesheet dynamically
  useEffect(() => {
    const linkId = 'google-fonts-bulk-cert';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allura&family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:wght@400;700&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Lora:wght@400;700&family=Merriweather:wght@400;700&family=MonteCarlo&family=Montserrat:wght@400;700&family=Oswald:wght@400;700&family=Parisienne&family=Pinyon+Script&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&family=Sacramento&family=Tangerine:wght@700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Resize listener to keep display width synchronized
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setDisplayWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [templateFile, dataFile]);

  // Render PDF template page 1 on canvas
  useEffect(() => {
    if (!templateFile) return;

    const renderTemplate = async () => {
      try {
        setError(null);
        const buffer = await templateFile.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const nativeWidth = unscaledViewport.width;
        const nativeHeight = unscaledViewport.height;
        setPdfSize({ width: nativeWidth, height: nativeHeight });

        // Render at high DPI (2.0x scale) for crisp preview
        const vp = page.getViewport({ scale: 2.0 });
        
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport: vp, canvas: canvas as any }).promise;
          
          if (containerRef.current) {
            setDisplayWidth(containerRef.current.clientWidth);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to render PDF template preview.');
      }
    };

    renderTemplate();
  }, [templateFile, dataFile]);

  // Handle template file upload
  const handleTemplateFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') {
      setError('Only PDF templates are supported.');
      return;
    }
    setTemplateFile(f);
  };

  // Handle spreadsheet file upload
  const handleDataFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    const f = uploadedFiles[0];
    if (!f) return;

    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
      setError('Supported spreadsheets: .xlsx, .xls, .csv');
      return;
    }

    try {
      const buffer = await f.arrayBuffer();
      const XLSX = await import('xlsx');
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (jsonData.length < 2) {
        setError('Spreadsheet must contain at least a header row and one data row.');
        return;
      }

      const rawHeaders = jsonData[0].map(h => String(h || '').trim());
      const parsedHeaders = rawHeaders.filter(h => h !== '');

      const parsedRows = jsonData.slice(1).map(row => {
        const rowObj: Record<string, string> = {};
        rawHeaders.forEach((header, idx) => {
          if (header) {
            rowObj[header] = row[idx] !== undefined ? String(row[idx]).trim() : '';
          }
        });
        return rowObj;
      }).filter(rowObj => Object.values(rowObj).some(val => val !== ''));

      if (parsedRows.length === 0) {
        setError('No valid data rows found in the spreadsheet.');
        return;
      }

      setHeaders(parsedHeaders);
      setRows(parsedRows);
      setNameColumn(parsedHeaders[0]);
      setDataFile(f);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse spreadsheet file.');
    }
  };

  // Add a placeholder to mapping workspace
  const addPlaceholder = (header: string) => {
    if (placeholders.some(p => p.id === header)) return;

    // Pick font based on field header name heuristic
    let fontChoice = 'Cinzel';
    if (header.toLowerCase().includes('name')) fontChoice = 'Great Vibes';
    else if (header.toLowerCase().includes('date') || header.toLowerCase().includes('title')) fontChoice = 'Lora';

    const newPlaceholder: Placeholder = {
      id: header,
      x: 50, // center
      y: 40 + placeholders.length * 10,
      fontSize: header.toLowerCase().includes('name') ? 32 : 20,
      fontFamily: fontChoice,
      isBold: false,
      color: '#1E293B',
      alignment: 'center',
    };

    setPlaceholders([...placeholders, newPlaceholder]);
    setActivePlaceholderId(header);
  };

  // Drag placeholder handlers (mouse + touch)
  const getPoint = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const touch = e.touches[0] ?? (e as TouchEvent).changedTouches?.[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.preventDefault();
    const placeholder = placeholders.find(p => p.id === id);
    if (!placeholder || !containerRef.current) return;

    const { x, y } = getPoint(e);
    setActivePlaceholderId(id);
    activeDragRef.current = {
      id,
      startX: x,
      startY: y,
      startLeft: placeholder.x,
      startTop: placeholder.y,
    };
  };

  // Global mousemove/touchmove listeners
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      const dragInfo = activeDragRef.current;
      const container = containerRef.current;
      if (!dragInfo || !container) return;

      const { x: clientX, y: clientY } = getPoint(e);
      const deltaX = clientX - dragInfo.startX;
      const deltaY = clientY - dragInfo.startY;

      const containerRect = container.getBoundingClientRect();
      const deltaPercentX = (deltaX / containerRect.width) * 100;
      const deltaPercentY = (deltaY / containerRect.height) * 100;

      let rawX = dragInfo.startLeft + deltaPercentX;
      let rawY = dragInfo.startTop + deltaPercentY;

      // Center snapping logic (within 1.5% threshold)
      let snapX = false;
      let snapY = false;

      if (Math.abs(rawX - 50) < 1.5) {
        rawX = 50;
        snapX = true;
      }
      if (Math.abs(rawY - 50) < 1.5) {
        rawY = 50;
        snapY = true;
      }

      setIsSnappingToCenter({ x: snapX, y: snapY });

      const newX = Math.max(0, Math.min(100, rawX));
      const newY = Math.max(0, Math.min(100, rawY));

      setPlaceholders(prev =>
        prev.map(p => (p.id === dragInfo.id ? { ...p, x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) } : p))
      );
    };

    const handleGlobalEnd = () => {
      if (activeDragRef.current) {
        activeDragRef.current = null;
        setIsSnappingToCenter({ x: false, y: false });
      }
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, []);

  // Update style values for active placeholder
  const updatePlaceholderStyle = (key: keyof Placeholder, value: any) => {
    setPlaceholders(prev =>
      prev.map(p => (p.id === activePlaceholderId ? { ...p, [key]: value } : p))
    );
  };

  // Helper: Hex string to PDF-lib color rgb values
  const hexToRgbColor = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return rgb(r / 255, g / 255, b / 255);
  };

  // Fetch / cache custom TTF font bytes
  const getFontBytes = async (fontOption: FontOption): Promise<ArrayBuffer | null> => {
    if (!fontOption.githubPath) return null;
    if (fontBytesCache.current.has(fontOption.id)) {
      return fontBytesCache.current.get(fontOption.id)!;
    }
    const url = `https://raw.githubusercontent.com/google/fonts/main/${fontOption.githubPath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download font: ${fontOption.name}`);
    const buf = await res.arrayBuffer();
    fontBytesCache.current.set(fontOption.id, buf);
    return buf;
  };

  // Run certificate generation
  const handleGenerate = async (mode: 'zip' | 'pdf') => {
    if (!templateFile || rows.length === 0 || placeholders.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);
    setDownloadZipUrl(null);
    setStatusMessage('Preparing PDF engine...');

    try {
      const templateBuffer = await templateFile.arrayBuffer();
      const { PDFDocument, StandardFonts } = await import('pdf-lib');
      const fontkit = (await import('@pdf-lib/fontkit')).default;
      
      let outDoc = mode === 'pdf' ? await PDFDocument.create() : null;
      let zip: any = null;
      
      if (mode === 'zip') {
        setStatusMessage('Initializing ZIP packager...');
        const JSZip = (await import('jszip')).default;
        zip = new JSZip();
      }

      const totalRows = rows.length;

      for (let idx = 0; idx < totalRows; idx++) {
        const row = rows[idx];
        setStatusMessage(`Generating certificate ${idx + 1} of ${totalRows}: ${row[nameColumn] || 'Row'}`);
        setProgress(Math.round((idx / totalRows) * 50));

        // Load fresh template copy
        const doc = await PDFDocument.load(templateBuffer);
        doc.registerFontkit(fontkit);

        const pages = doc.getPages();
        const page = pages[0];
        const { width, height } = page.getSize();

        // Stamp each placeholder item
        for (const ph of placeholders) {
          const textVal = sanitizeTextForPdf(row[ph.id] || '');
          if (!textVal) continue;

          const fontOpt = FONT_OPTIONS.find(f => f.id === ph.fontFamily) || FONT_OPTIONS[0];

          let font;
          if (fontOpt.githubPath) {
            try {
              const fontBytes = await getFontBytes(fontOpt);
              if (fontBytes) {
                font = await doc.embedFont(fontBytes);
              }
            } catch (fontErr) {
              console.warn(`Font load fallback for ${fontOpt.name}:`, fontErr);
            }
          }

          if (!font) {
            let standardFont = StandardFonts.Helvetica;
            if (ph.fontFamily === 'TimesRoman' || fontOpt.standardFontName === 'TimesRoman') {
              standardFont = ph.isBold ? StandardFonts.TimesRomanBold : StandardFonts.TimesRoman;
            } else if (ph.fontFamily === 'Courier' || fontOpt.standardFontName === 'Courier') {
              standardFont = ph.isBold ? StandardFonts.CourierBold : StandardFonts.Courier;
            } else {
              standardFont = ph.isBold ? StandardFonts.HelveticaBold : StandardFonts.Helvetica;
            }
            font = await doc.embedFont(standardFont);
          }

          const color = hexToRgbColor(ph.color);
          const textWidth = font.widthOfTextAtSize(textVal, ph.fontSize);

          // Compute horizontal position based on alignment
          let xPdf = (ph.x / 100) * width;
          if (ph.alignment === 'center') {
            xPdf = xPdf - textWidth / 2;
          } else if (ph.alignment === 'right') {
            xPdf = xPdf - textWidth;
          }

          // Compute vertical position:
          // PDF origin is bottom-left. ph.y is percentage from top of page.
          // Adjust y baseline using font size metrics so visual center matches CSS top translate(-50%)
          const yPdf = height - (ph.y / 100) * height - ph.fontSize * 0.35;

          page.drawText(textVal, {
            x: xPdf,
            y: yPdf,
            size: ph.fontSize,
            font,
            color,
          });
        }

        const generatedBytes = await doc.save();

        if (mode === 'pdf' && outDoc) {
          const tempDoc = await PDFDocument.load(generatedBytes);
          const [copiedPage] = await outDoc.copyPages(tempDoc, [0]);
          outDoc.addPage(copiedPage);
        } else if (mode === 'zip' && zip) {
          const fileNameRaw = row[nameColumn] ? row[nameColumn].replace(/[^a-zA-Z0-9_\-]/g, '_') : `certificate_${idx + 1}`;
          zip.file(`Certificate - ${fileNameRaw}.pdf`, generatedBytes);
        }
      }

      // Finalize output
      if (mode === 'pdf' && outDoc) {
        setStatusMessage('Merging combined PDF document...');
        const combinedBytes = await outDoc.save();
        const blob = new Blob([combinedBytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else if (mode === 'zip' && zip) {
        setStatusMessage('Compressing individual certificates into ZIP file...');
        const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata: { percent: number }) => {
          setProgress(50 + Math.round(metadata.percent / 2));
        });
        setDownloadZipUrl(URL.createObjectURL(zipBlob));
      }

      setStatusMessage('Certificates created successfully!');
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Bulk generation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const activePlaceholder = placeholders.find(p => p.id === activePlaceholderId);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Workspace / Upload / Canvas Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* File Uploaders */}
          {(!templateFile || !dataFile) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* PDF Template Uploader */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOverTemplate(true); }}
                onDragLeave={() => setIsDraggingOverTemplate(false)}
                onDrop={(e) => { e.preventDefault(); setIsDraggingOverTemplate(false); e.dataTransfer.files && handleTemplateFiles(e.dataTransfer.files); }}
                onClick={() => templateInputRef.current?.click()}
                className={`cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 ${
                  isDraggingOverTemplate ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
                }`}
              >
                <input type="file" ref={templateInputRef} onChange={(e) => e.target.files && handleTemplateFiles(e.target.files)} accept=".pdf" className="hidden" />
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                  <FileText className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {templateFile ? templateFile.name : 'Upload PDF Template'}
                </h3>
                <p className="text-xs text-foreground/40 max-w-[200px] mx-auto">
                  Drag in your single-page certificate or letter PDF layout.
                </p>
              </div>

              {/* Excel / CSV Data Uploader */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOverData(true); }}
                onDragLeave={() => setIsDraggingOverData(false)}
                onDrop={(e) => { e.preventDefault(); setIsDraggingOverData(false); e.dataTransfer.files && handleDataFiles(e.dataTransfer.files); }}
                onClick={() => dataInputRef.current?.click()}
                className={`cursor-pointer border border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 ${
                  isDraggingOverData ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
                }`}
              >
                <input type="file" ref={dataInputRef} onChange={(e) => e.target.files && handleDataFiles(e.target.files)} accept=".xlsx,.xls,.csv" className="hidden" />
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                  <Table className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {dataFile ? dataFile.name : 'Upload Spreadsheet List'}
                </h3>
                <p className="text-xs text-foreground/40 max-w-[200px] mx-auto">
                  Drag in your Excel (.xlsx, .xls) or CSV table containing row details.
                </p>
              </div>

            </div>
          )}

          {/* Certificate Design Workspace */}
          {templateFile && dataFile && (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-6">
              
              {/* Workspace Header & Reset */}
              <div className="flex flex-wrap justify-between items-center border-b border-foreground/5 pb-4 gap-4">
                <div className="flex flex-wrap gap-6 text-xs text-foreground/60">
                  <div>
                    <span className="font-mono">Template:</span> <span className="text-foreground font-medium">{templateFile.name}</span>
                  </div>
                  <div>
                    <span className="font-mono">Recipients:</span> <span className="text-foreground font-medium">{dataFile.name} ({rows.length} rows)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Preview Mode */}
                  <div className="flex items-center bg-foreground/5 rounded-lg p-1 text-xs border border-foreground/10">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('sample')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        previewMode === 'sample' ? 'bg-brand text-foreground shadow-xs' : 'text-foreground/50 hover:text-foreground'
                      }`}
                      title="Preview visual rendering using real row data"
                    >
                      Sample Row
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('field')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        previewMode === 'field' ? 'bg-brand text-foreground shadow-xs' : 'text-foreground/50 hover:text-foreground'
                      }`}
                      title="Show column field tags"
                    >
                      Field Tags
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTemplateFile(null);
                      setDataFile(null);
                      setHeaders([]);
                      setRows([]);
                      setPlaceholders([]);
                      setActivePlaceholderId(null);
                      setDownloadUrl(null);
                      setDownloadZipUrl(null);
                    }}
                    className="text-xs text-foreground/40 hover:text-foreground h-8"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Mapper Layout: Left Columns List, Right Canvas */}
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Column Headers Palette */}
                <div className="w-full md:w-52 shrink-0 space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/60 block">Available Columns</label>
                  <p className="text-[11px] text-foreground/40 leading-relaxed">Click a column to place it onto the certificate layout canvas.</p>
                  <div className="flex flex-row md:flex-col flex-wrap gap-2 pt-1">
                    {headers.map(header => {
                      const isAdded = placeholders.some(p => p.id === header);
                      return (
                        <button
                          key={header}
                          onClick={() => !isAdded && addPlaceholder(header)}
                          disabled={isAdded}
                          className={`px-3 py-2 rounded-xl text-xs font-medium text-left border flex items-center justify-between w-full transition-all ${
                            isAdded
                              ? 'bg-foreground/5 border-foreground/5 text-foreground/30 cursor-not-allowed'
                              : 'bg-background hover:bg-foreground/[0.02] border-foreground/10 hover:border-brand/40 hover:text-brand text-foreground'
                          }`}
                        >
                          <span className="truncate">{header}</span>
                          {!isAdded && <Plus className="w-3.5 h-3.5 text-brand shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PDF Canvas Preview Container */}
                <div className="flex-1 bg-background/50 border border-foreground/5 rounded-xl p-4 flex flex-col justify-center items-center overflow-hidden relative">
                  
                  {/* Canvas Container */}
                  <div
                    ref={containerRef}
                    className="relative select-none shadow-lg rounded-lg border border-foreground/10 bg-white"
                    style={{
                      margin: '0 auto',
                      width: '100%',
                      maxWidth: pdfSize ? `${pdfSize.width}px` : 'none',
                      aspectRatio: pdfSize ? `${pdfSize.width} / ${pdfSize.height}` : 'auto',
                    }}
                  >
                    <canvas ref={canvasRef} className="max-w-full block" style={{ width: '100%', height: 'auto' }} />
                    
                    {/* Visual Center Snap Guide Lines */}
                    {isSnappingToCenter.x && (
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-cyan-400 border-r border-cyan-300 pointer-events-none z-30 opacity-80" />
                    )}
                    {isSnappingToCenter.y && (
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-cyan-400 border-b border-cyan-300 pointer-events-none z-30 opacity-80" />
                    )}

                    {/* Render Placed Items */}
                    {placeholders.map(ph => {
                      const isActive = ph.id === activePlaceholderId;
                      const ratio = pdfSize ? displayWidth / pdfSize.width : 1;
                      const fontOpt = FONT_OPTIONS.find(f => f.id === ph.fontFamily) || FONT_OPTIONS[0];

                      // Content string for preview
                      const sampleVal = rows[0] && rows[0][ph.id] !== undefined ? rows[0][ph.id] : null;
                      const displayContent = previewMode === 'sample' 
                        ? (sampleVal && sampleVal.trim() !== '' ? sampleVal : `[${ph.id}]`)
                        : `{{${ph.id}}}`;

                      return (
                        <div
                          key={ph.id}
                          onMouseDown={(e) => handleDragStart(e, ph.id)}
                          onTouchStart={(e) => handleDragStart(e, ph.id)}
                          className={`absolute cursor-move touch-none select-none ${isActive ? 'z-20' : 'z-10'}`}
                          style={{
                            left: `${ph.x}%`,
                            top: `${ph.y}%`,
                            transform: ph.alignment === 'center'
                              ? 'translate(-50%, -50%)'
                              : ph.alignment === 'right'
                              ? 'translate(-100%, -50%)'
                              : 'translate(0%, -50%)',
                          }}
                        >
                          {/* 
                            Zero-padding pure text container.
                            Matches exact coordinates of PDF-lib output.
                          */}
                          <div
                            className={`relative inline-block leading-none transition-all ${
                              isActive
                                ? 'outline-2 outline-brand outline-offset-2 bg-brand/5 rounded-xs'
                                : 'hover:outline-1 hover:outline-dashed hover:outline-foreground/40 rounded-xs'
                            }`}
                            style={{
                              color: ph.color,
                              fontSize: `${Math.max(8, ph.fontSize * ratio)}px`,
                              fontFamily: fontOpt.cssFamily,
                              fontWeight: ph.isBold ? 'bold' : 'normal',
                              whiteSpace: 'nowrap',
                              textAlign: ph.alignment,
                            }}
                          >
                            {displayContent}

                            {/* Floating Active Controls Badge (Rendered outside text bounds) */}
                            {isActive && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-neutral-900 text-white shadow-lg rounded-md px-2 py-0.5 text-[10px] font-mono z-30 pointer-events-auto whitespace-nowrap border border-neutral-700">
                                <span className="font-semibold text-brand">{ph.id}</span>
                                <span className="opacity-40">|</span>
                                <span className="opacity-70 capitalize">{ph.alignment}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPlaceholders(placeholders.filter(p => p.id !== ph.id));
                                    if (activePlaceholderId === ph.id) setActivePlaceholderId(null);
                                  }}
                                  className="text-neutral-400 hover:text-red-400 p-0.5 rounded transition-colors ml-1"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                </div>

              </div>

            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex gap-2 items-start">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

        </div>

        {/* Right Controls & Styling Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Settings className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Generator Controls</h3>
          </div>

          {!templateFile || !dataFile ? (
            <p className="text-xs text-foreground/40 leading-relaxed">
              Upload your single-page certificate PDF template and your recipient spreadsheet list (Excel/CSV) to configure text mapping, typography, colors, and bulk downloads.
            </p>
          ) : (
            <div className="space-y-6">
              
              {/* Selected Item Styling Panel */}
              {activePlaceholder ? (
                <div className="space-y-5 p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Configure: {`{{${activePlaceholder.id}}}`}
                    </span>
                    <button
                      onClick={() => {
                        setPlaceholders(placeholders.filter(p => p.id !== activePlaceholder.id));
                        setActivePlaceholderId(null);
                      }}
                      className="text-foreground/40 hover:text-red-400 p-1"
                      title="Delete field"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Font Family Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground/60 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-brand" />
                      Font Family
                    </label>
                    <select
                      value={activePlaceholder.fontFamily}
                      onChange={(e) => updatePlaceholderStyle('fontFamily', e.target.value)}
                      className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand font-medium"
                    >
                      <optgroup label="Standard PDF Fonts">
                        {FONT_OPTIONS.filter(f => f.category === 'standard').map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Formal & Serif (Certificates)">
                        {FONT_OPTIONS.filter(f => f.category === 'serif').map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Calligraphy & Script (Names)">
                        {FONT_OPTIONS.filter(f => f.category === 'script').map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Modern Sans-Serif">
                        {FONT_OPTIONS.filter(f => f.category === 'sans').map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Font Size & Bold Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/60">Font Size (pt)</label>
                      <input
                        type="number"
                        value={activePlaceholder.fontSize}
                        onChange={(e) => updatePlaceholderStyle('fontSize', Math.max(6, parseInt(e.target.value) || 12))}
                        min={6}
                        max={144}
                        className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5 flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={() => updatePlaceholderStyle('isBold', !activePlaceholder.isBold)}
                        className={`w-full py-2 rounded-lg border text-xs font-medium transition-all ${
                          activePlaceholder.isBold
                            ? 'bg-brand/15 border-brand text-brand font-bold'
                            : 'bg-background border-foreground/10 text-foreground/70 hover:border-foreground/20'
                        }`}
                      >
                        {activePlaceholder.isBold ? 'Bold Weight' : 'Normal Weight'}
                      </button>
                    </div>
                  </div>

                  {/* Alignment Control Buttons */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground/60">Text Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => updatePlaceholderStyle('alignment', 'left')}
                        className={`py-2 rounded-lg border flex items-center justify-center gap-1 text-xs font-medium transition-all ${
                          activePlaceholder.alignment === 'left'
                            ? 'bg-brand/15 border-brand text-brand'
                            : 'bg-background border-foreground/10 text-foreground/70 hover:border-foreground/20'
                        }`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        Left
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePlaceholderStyle('alignment', 'center')}
                        className={`py-2 rounded-lg border flex items-center justify-center gap-1 text-xs font-medium transition-all ${
                          activePlaceholder.alignment === 'center'
                            ? 'bg-brand/15 border-brand text-brand'
                            : 'bg-background border-foreground/10 text-foreground/70 hover:border-foreground/20'
                        }`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        Center
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePlaceholderStyle('alignment', 'right')}
                        className={`py-2 rounded-lg border flex items-center justify-center gap-1 text-xs font-medium transition-all ${
                          activePlaceholder.alignment === 'right'
                            ? 'bg-brand/15 border-brand text-brand'
                            : 'bg-background border-foreground/10 text-foreground/70 hover:border-foreground/20'
                        }`}
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                        Right
                      </button>
                    </div>
                  </div>

                  {/* Color Swatches & Custom Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-brand" />
                      Text Color Options
                    </label>

                    {/* Quick Color Swatches Grid */}
                    <div className="flex flex-wrap gap-1.5 p-2 bg-background border border-foreground/10 rounded-lg">
                      {COLOR_PRESETS.map(preset => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => updatePlaceholderStyle('color', preset.value)}
                          title={preset.label}
                          className={`w-6 h-6 rounded-md border transition-all ${
                            activePlaceholder.color.toLowerCase() === preset.value.toLowerCase()
                              ? 'ring-2 ring-brand ring-offset-1 scale-110 border-white'
                              : 'border-foreground/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: preset.value }}
                        />
                      ))}
                    </div>

                    {/* Custom Color Inputs */}
                    <div className="flex gap-2 items-center pt-1">
                      <input
                        type="color"
                        value={activePlaceholder.color}
                        onChange={(e) => updatePlaceholderStyle('color', e.target.value)}
                        className="w-9 h-9 rounded-lg border border-foreground/10 bg-transparent p-0.5 cursor-pointer overflow-hidden shrink-0"
                      />
                      <input
                        type="text"
                        value={activePlaceholder.color}
                        onChange={(e) => updatePlaceholderStyle('color', e.target.value)}
                        placeholder="#000000"
                        className="w-full bg-background border border-foreground/10 rounded-lg px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* Position Coordinates & Fine Adjustments */}
                  <div className="space-y-1.5 border-t border-foreground/5 pt-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/50 flex items-center gap-1">
                        <Move className="w-3 h-3" />
                        Fine Position Adjustment (%)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          updatePlaceholderStyle('x', 50);
                          updatePlaceholderStyle('y', 50);
                        }}
                        className="text-[10px] font-mono text-brand hover:underline"
                      >
                        Snap Center (50%, 50%)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-foreground/40">X Position (%)</span>
                        <input
                          type="number"
                          step="0.1"
                          value={activePlaceholder.x}
                          onChange={(e) => updatePlaceholderStyle('x', parseFloat(e.target.value) || 0)}
                          className="w-full bg-background border border-foreground/10 rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-foreground/40">Y Position (%)</span>
                        <input
                          type="number"
                          step="0.1"
                          value={activePlaceholder.y}
                          onChange={(e) => updatePlaceholderStyle('y', parseFloat(e.target.value) || 0)}
                          className="w-full bg-background border border-foreground/10 rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-5 rounded-xl border border-dashed border-foreground/10 text-center text-xs text-foreground/40 leading-relaxed space-y-2">
                  <Type className="w-6 h-6 text-foreground/20 mx-auto" />
                  <p>Click any variable label on the canvas preview to adjust its font family, text size, color swatches, and alignment.</p>
                </div>
              )}

              {/* Naming Column Select */}
              <div className="space-y-3 border-t border-foreground/5 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-foreground/60 block">ZIP File Naming Column</label>
                  <select
                    value={nameColumn}
                    onChange={(e) => setNameColumn(e.target.value)}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-brand"
                  >
                    {headers.map(h => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Process & Action Buttons */}
              <div className="pt-4 border-t border-foreground/5">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-foreground/60">
                      <span className="flex items-center gap-2 truncate">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand shrink-0" />
                        <span className="truncate">{statusMessage}</span>
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ) : downloadUrl || downloadZipUrl ? (
                  <div className="space-y-3">
                    
                    {downloadUrl && (
                      <Button
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = downloadUrl;
                          a.download = `combined-certificates-${templateFile.name}`;
                          a.click();
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-md"
                      >
                        <Download className="w-5 h-5" />
                        Download Combined PDF
                      </Button>
                    )}

                    {downloadZipUrl && (
                      <Button
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = downloadZipUrl;
                          a.download = `certificates-bundle.zip`;
                          a.click();
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 shadow-md"
                      >
                        <Download className="w-5 h-5" />
                        Download ZIP (Individual PDFs)
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setDownloadUrl(null);
                        setDownloadZipUrl(null);
                      }}
                      className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                    >
                      Generate another batch
                    </Button>

                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      disabled={placeholders.length === 0}
                      onClick={() => handleGenerate('pdf')}
                      className={`w-full font-medium py-5 rounded-xl flex items-center justify-center gap-2 shadow-sm ${
                        placeholders.length > 0 ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Generate Combined PDF
                    </Button>
                    
                    <Button
                      disabled={placeholders.length === 0}
                      onClick={() => handleGenerate('zip')}
                      className={`w-full font-medium py-5 rounded-xl flex items-center justify-center gap-2 border border-foreground/10 ${
                        placeholders.length > 0 ? 'bg-background hover:bg-foreground/5 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Generate ZIP (Individual PDFs)
                    </Button>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
