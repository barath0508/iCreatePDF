'use client';

import React, { useState, useRef, useCallback } from 'react';
import { EyeOff, Loader2, Download, Trash2, FileText, ScanSearch, X } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { detectPii, type PiiType } from '@/lib/pii-detect';

interface Rect { x: number; y: number; w: number; h: number; page: number; }
interface Suggestion extends Rect { id: string; type: PiiType; value: string; }

const PII_LABELS: Record<PiiType, string> = {
  email: 'Email',
  phone: 'Phone',
  ssn: 'SSN',
  creditCard: 'Card',
  iban: 'IBAN',
};

export function RedactTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectProgress, setDetectProgress] = useState({ page: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rects, setRects] = useState<Rect[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [drawing, setDrawing] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderPage = useCallback(async (pdfBytes: ArrayBuffer, pageNum: number) => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) }).promise;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.4 });
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    setScale(1.4);
    setPageSize({ w: page.getViewport({ scale: 1 }).width, h: page.getViewport({ scale: 1 }).height });
    setTotalPages(pdf.numPages);
    // Draw existing rects for this page
    const pageRects = rects.filter(r => r.page === pageNum);
    ctx.fillStyle = '#000';
    pageRects.forEach(r => ctx.fillRect(r.x * 1.4, r.y * 1.4, r.w * 1.4, r.h * 1.4));
  }, [rects]);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null); setRects([]); setSuggestions([]);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    setCurrentPage(1);
    const buf = await f.arrayBuffer();
    await renderPage(buf, 1);
  };

  const detectSensitiveData = async () => {
    if (!file) return;
    setIsDetecting(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;

      const found: Suggestion[] = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setDetectProgress({ page: pageNum, total: pdf.numPages });
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const textContent = await page.getTextContent();

        let fullText = '';
        const itemSpans: { start: number; end: number; transform: number[]; width: number; height: number }[] = [];
        for (const item of textContent.items as any[]) {
          if (typeof item.str !== 'string') continue;
          const start = fullText.length;
          fullText += item.str + ' ';
          itemSpans.push({ start, end: start + item.str.length, transform: item.transform, width: item.width, height: item.height || 10 });
        }

        const matches = detectPii(fullText);
        for (const match of matches) {
          const overlapping = itemSpans.filter(s => s.start < match.end && s.end > match.start);
          if (overlapping.length === 0) continue;

          let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
          for (const span of overlapping) {
            const [ex, ey] = [span.transform[4], span.transform[5]];
            const corners = viewport.convertToViewportRectangle([ex, ey, ex + span.width, ey + span.height]);
            const rx0 = Math.min(corners[0], corners[2]);
            const ry0 = Math.min(corners[1], corners[3]);
            const rx1 = Math.max(corners[0], corners[2]);
            const ry1 = Math.max(corners[1], corners[3]);
            x0 = Math.min(x0, rx0); y0 = Math.min(y0, ry0);
            x1 = Math.max(x1, rx1); y1 = Math.max(y1, ry1);
          }
          const pad = 1.5;
          found.push({
            id: `${pageNum}-${match.start}-${match.type}`,
            page: pageNum,
            x: x0 - pad, y: y0 - pad, w: (x1 - x0) + pad * 2, h: (y1 - y0) + pad * 2,
            type: match.type, value: match.value,
          });
        }
      }
      setSuggestions(found);
    } catch (err: any) {
      setError(err?.message || 'Auto-detection failed.');
    } finally {
      setIsDetecting(false);
      setDetectProgress({ page: 0, total: 0 });
    }
  };

  const acceptSuggestion = (s: Suggestion) => {
    setSuggestions(prev => prev.filter(x => x.id !== s.id));
    setRects(prev => [...prev, { x: s.x, y: s.y, w: s.w, h: s.h, page: s.page }]);
    if (s.page === currentPage) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#000';
        ctx.fillRect(s.x * scale, s.y * scale, s.w * scale, s.h * scale);
      }
    }
  };

  const dismissSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(x => x.id !== id));
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const point = 'touches' in e ? (e.touches[0] ?? e.changedTouches[0]) : e;
    return { x: (point.clientX - rect.left) * scaleX, y: (point.clientY - rect.top) * scaleY };
  };

  const onPointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    setDrawing({ x, y });
  };

  const onPointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    if ('touches' in e) e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    setCurrentRect({ x: drawing.x, y: drawing.y, w: x - drawing.x, h: y - drawing.y });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    // Redraw page then overlay
    const img = new Image();
    img.src = canvas.toDataURL();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(drawing.x, drawing.y, x - drawing.x, y - drawing.y);
  };

  const onPointerUp = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing || !currentRect) { setDrawing(null); return; }
    const { x: cx, y: cy } = getCanvasCoords(e);
    const newRect: Rect = {
      x: Math.min(drawing.x, cx) / scale,
      y: Math.min(drawing.y, cy) / scale,
      w: Math.abs(cx - drawing.x) / scale,
      h: Math.abs(cy - drawing.y) / scale,
      page: currentPage,
    };
    setRects(prev => [...prev, newRect]);
    setDrawing(null);
    setCurrentRect(null);
    // Fill black on canvas
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#000';
    ctx.fillRect(newRect.x * scale, newRect.y * scale, newRect.w * scale, newRect.h * scale);
  };

  const applyRedactions = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const srcPdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= srcPdf.numPages; i++) {
        const page = await srcPdf.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport: vp, canvas }).promise;
        // Apply black boxes for this page
        ctx.fillStyle = '#000';
        rects.filter(r => r.page === i).forEach(r => {
          ctx.fillRect(r.x * 1.5, r.y * 1.5, r.w * 1.5, r.h * 1.5);
        });
        const pngBytes = await (await fetch(canvas.toDataURL('image/png'))).arrayBuffer();
        const pngImg = await outDoc.embedPng(pngBytes);
        const newPage = outDoc.addPage([vp.width, vp.height]);
        newPage.drawImage(pngImg, { x: 0, y: 0, width: vp.width, height: vp.height });
      }

      const bytes = await outDoc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Redaction failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const changePage = async (p: number) => {
    if (!file) return;
    setCurrentPage(p);
    const buf = await file.arrayBuffer();
    await renderPage(buf, p);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-4">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><EyeOff className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload a PDF to redact</h3>
              <p className="text-xs text-foreground/40">Draw black boxes over sensitive areas. Processed 100% locally.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand" />
                  <span className="text-sm text-foreground font-medium">{file.name}</span>
                  <span className="text-xs text-foreground/40">({totalPages} pages)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setRects([]); setSuggestions([]); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>
              {totalPages > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => changePage(p)} className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${currentPage === p ? 'bg-primary text-primary-foreground font-bold' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'}`}>
                      {p}{' '}
                      {rects.filter(r => r.page === p).length > 0 && <span className="text-red-400">•</span>}
                      {suggestions.filter(s => s.page === p).length > 0 && <span className="text-amber-400">•</span>}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="text-xs text-foreground/40 bg-background/30 rounded-lg px-3 py-2">Click/tap and drag on the document to draw redaction boxes</div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isDetecting}
                  onClick={detectSensitiveData}
                  className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-lg h-8"
                >
                  {isDetecting ? (
                    <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Scanning page {detectProgress.page}/{detectProgress.total}...</>
                  ) : (
                    <><ScanSearch className="w-3.5 h-3.5 mr-1.5" />Auto-Detect Sensitive Data</>
                  )}
                </Button>
              </div>
              <div ref={containerRef} className="relative rounded-xl overflow-hidden border border-foreground/10 cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  onMouseDown={onPointerDown}
                  onMouseMove={onPointerMove}
                  onMouseUp={onPointerUp}
                  onTouchStart={onPointerDown}
                  onTouchMove={onPointerMove}
                  onTouchEnd={onPointerUp}
                  className="w-full touch-none"
                />
                {pageSize.w > 0 && suggestions.filter(s => s.page === currentPage).map(s => (
                  <div
                    key={s.id}
                    onClick={() => acceptSuggestion(s)}
                    title={`Click to redact this ${PII_LABELS[s.type]} — "${s.value}"`}
                    className="absolute border-2 border-amber-400 bg-amber-400/25 hover:bg-amber-400/40 cursor-pointer group transition-colors"
                    style={{
                      left: `${(s.x / pageSize.w) * 100}%`,
                      top: `${(s.y / pageSize.h) * 100}%`,
                      width: `${(s.w / pageSize.w) * 100}%`,
                      height: `${(s.h / pageSize.h) * 100}%`,
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[10px] font-mono bg-amber-500 text-black px-1.5 py-0.5 rounded whitespace-nowrap">
                      {PII_LABELS[s.type]}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismissSuggestion(s.id); }}
                      className="absolute -top-5 right-0 bg-foreground/80 hover:bg-foreground text-background rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              {suggestions.filter(s => s.page === currentPage).length > 0 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-xs text-amber-300">{suggestions.filter(s => s.page === currentPage).length} suggested redaction{suggestions.filter(s => s.page === currentPage).length > 1 ? 's' : ''} on this page — click a box to redact, or the × to dismiss</span>
                </div>
              )}
              {rects.length > 0 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <span className="text-xs text-red-300">{rects.length} redaction box{rects.length > 1 ? 'es' : ''} drawn</span>
                  <button onClick={() => { setRects([]); file && file.arrayBuffer().then(buf => renderPage(buf, currentPage)); }} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 className="w-3 h-3" />Clear All</button>
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <EyeOff className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Redact PDF</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Draw black boxes over confidential data, or click Auto-Detect to automatically find emails, phone numbers, SSNs, IBANs, and card numbers. Redactions are burned permanently into the document.</p>
          <div className="space-y-2 text-xs text-foreground/40">
            <p>• Click Auto-Detect to scan every page for PII</p>
            <p>• Click a suggested box to redact it, or × to dismiss</p>
            <p>• Click &amp; drag to draw manual redaction boxes</p>
            <p>• Click Apply to burn them in</p>
          </div>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Applying Redactions...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `redacted-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Redacted PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setRects([]); setSuggestions([]); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Redact another file</Button>
              </div>
            ) : (
              <Button disabled={!file || rects.length === 0} onClick={applyRedactions} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file && rects.length > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <EyeOff className="w-4 h-4" />Apply Redactions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
