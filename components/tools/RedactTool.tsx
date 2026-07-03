'use client';

import React, { useState, useRef, useCallback } from 'react';
import { EyeOff, Loader2, Download, Trash2, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

interface Rect { x: number; y: number; w: number; h: number; page: number; }

export function RedactTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rects, setRects] = useState<Rect[]>([]);
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
    setError(null); setDownloadUrl(null); setRects([]);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    setCurrentPage(1);
    const buf = await f.arrayBuffer();
    await renderPage(buf, 1);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    setDrawing({ x, y });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
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

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-zinc-900/30 hover:border-white/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><EyeOff className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload a PDF to redact</h3>
              <p className="text-xs text-white/40">Draw black boxes over sensitive areas. Processed 100% locally.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white font-medium">{file.name}</span>
                  <span className="text-xs text-white/40">({totalPages} pages)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setRects([]); }} className="text-xs text-white/40 hover:text-white">Change File</Button>
              </div>
              {totalPages > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => changePage(p)} className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${currentPage === p ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                      {p} {rects.filter(r => r.page === p).length > 0 && <span className="text-red-400">•</span>}
                    </button>
                  ))}
                </div>
              )}
              <div className="text-xs text-white/40 bg-black/30 rounded-lg px-3 py-2">Click and drag on the document to draw redaction boxes</div>
              <div ref={containerRef} className="rounded-xl overflow-hidden border border-white/10 cursor-crosshair">
                <canvas ref={canvasRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} className="w-full" />
              </div>
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

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <EyeOff className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Redact PDF</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Draw black boxes over confidential data — Aadhaar numbers, PAN, signatures, addresses. Redactions are burned permanently into the document.</p>
          <div className="space-y-2 text-xs text-white/40">
            <p>• Select a page using the tabs</p>
            <p>• Click &amp; drag to draw redaction boxes</p>
            <p>• Repeat on any page</p>
            <p>• Click Apply to burn them in</p>
          </div>
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Applying Redactions...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `redacted-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Redacted PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setRects([]); setDownloadUrl(null); }} className="w-full text-white/50 hover:text-white text-xs h-8">Redact another file</Button>
              </div>
            ) : (
              <Button disabled={!file || rects.length === 0} onClick={applyRedactions} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file && rects.length > 0 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <EyeOff className="w-4 h-4" />Apply Redactions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
