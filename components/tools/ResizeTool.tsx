'use client';

import React, { useState, useRef } from 'react';
import { Maximize2, Loader2, Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

const PAGE_SIZES: Record<string, [number, number]> = {
  'A4 (595 × 842)': [595, 842],
  'A3 (842 × 1191)': [842, 1191],
  'Letter (612 × 792)': [612, 792],
  'Legal (612 × 1008)': [612, 1008],
  'A5 (420 × 595)': [420, 595],
};

export function ResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedSize, setSelectedSize] = useState('A4 (595 × 842)');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [totalPages, setTotalPages] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    const buf = await f.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    setTotalPages(doc.getPageCount());
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setProgress(0); setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const srcPdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
      const outDoc = await PDFDocument.create();
      let [tw, th] = PAGE_SIZES[selectedSize];
      if (orientation === 'landscape') [tw, th] = [th, tw];

      for (let i = 1; i <= srcPdf.numPages; i++) {
        setProgress(Math.round(((i - 1) / srcPdf.numPages) * 100));
        const page = await srcPdf.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport: vp, canvas }).promise;
        const pngBytes = await (await fetch(canvas.toDataURL('image/png'))).arrayBuffer();
        const img = await outDoc.embedPng(pngBytes);
        const newPage = outDoc.addPage([tw, th]);
        const scale = Math.min(tw / vp.width, th / vp.height);
        const iw = vp.width * scale, ih = vp.height * scale;
        newPage.drawImage(img, { x: (tw - iw) / 2, y: (th - ih) / 2, width: iw, height: ih });
      }

      const bytes = await outDoc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
      setProgress(100);
    } catch (err: any) {
      setError(err?.message || 'Resize failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-zinc-900/30 hover:border-white/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><Maximize2 className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload PDF to resize pages</h3>
              <p className="text-xs text-white/40">Normalize all pages to A4, Letter, A3, Legal, or A5 size.</p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><Maximize2 className="w-5 h-5 text-purple-400" /></div>
                  <div>
                    <h4 className="text-base font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">{totalPages} pages</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-white/40 hover:text-white">Change</Button>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-mono text-white/40 uppercase">Target Page Size</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(PAGE_SIZES).map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${selectedSize === size ? 'bg-purple-600 text-white border border-purple-500' : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'}`}>
                      {size.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-mono text-white/40 uppercase">Orientation</p>
                <div className="flex gap-2">
                  {(['portrait', 'landscape'] as const).map(o => (
                    <button key={o} onClick={() => setOrientation(o)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${orientation === o ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>{o}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Page Resizer</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Normalize all PDF pages to a standard size. Useful for mixing A4 and Letter pages in the same document before printing.</p>
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />Resizing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `resized-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Resized PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-white/50 hover:text-white text-xs h-8">Resize another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <Maximize2 className="w-4 h-4" />Resize Pages
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
