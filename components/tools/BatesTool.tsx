'use client';

import React, { useState, useRef } from 'react';
import { Hash, Loader2, Download } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { sanitizeTextForPdf } from '@/lib/pdf';

type BatesPos = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';

const COLORS: Record<string, [number, number, number]> = {
  Black: [0, 0, 0], Gray: [0.4, 0.4, 0.4], Blue: [0.1, 0.2, 0.7], Red: [0.8, 0.1, 0.1],
};

export function BatesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [digits, setDigits] = useState(6);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [position, setPosition] = useState<BatesPos>('bottom-right');
  const [fontSize, setFontSize] = useState(8);
  const [color, setColor] = useState('Black');
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

  const padNum = (n: number) => String(n).padStart(digits, '0');
  const batesLabel = (page: number) => `${prefix}${padNum(startNum + page - 1)}${suffix}`;
  const preview = batesLabel(1);

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setProgress(0); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const [r, g, b] = COLORS[color] || [0, 0, 0];
      const clr = rgb(r, g, b);

      doc.getPages().forEach((page, idx) => {
        setProgress(Math.round(((idx) / totalPages) * 100));
        const { width, height } = page.getSize();
        const label = sanitizeTextForPdf(batesLabel(idx + 1));
        const tw = font.widthOfTextAtSize(label, fontSize);
        const margin = 14;
        const isTop = position.startsWith('top');
        const y = isTop ? height - margin - fontSize : margin;
        let x = margin;
        if (position.includes('center')) x = width / 2 - tw / 2;
        if (position.includes('right')) x = width - margin - tw;
        page.drawText(label, { x, y, size: fontSize, font, color: clr });
      });

      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
      setProgress(100);
    } catch (err: any) {
      setError(err?.message || 'Bates numbering failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const positions: BatesPos[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

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
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Hash className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload PDF for Bates numbering</h3>
              <p className="text-xs text-foreground/40">Add sequential stamps for legal and compliance documents.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Hash className="w-5 h-5 text-brand" /></div>
                  <div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">{totalPages} pages</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Prefix</label>
                  <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="e.g. DOC-" className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Suffix</label>
                  <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="e.g. -EX" className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Start Number</label>
                  <input type="number" min={1} max={9999} value={startNum} onChange={e => setStartNum(Number(e.target.value))} className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Digit Padding</label>
                  <input type="number" min={1} max={9999} value={digits} onChange={e => setDigits(Number(e.target.value))} className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-foreground/40 uppercase">Position</label>
                <div className="grid grid-cols-3 gap-2">
                  {positions.map(p => (
                    <button key={p} onClick={() => setPosition(p)} className={`py-1.5 rounded-lg text-[10px] font-mono capitalize transition-all ${position === p ? 'bg-primary text-primary-foreground font-bold' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'}`}>
                      {p.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Font Size</label>
                  <input type="number" min={6} max={14} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Color</label>
                  <select value={color} onChange={e => setColor(e.target.value)} className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand">
                    {Object.keys(COLORS).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-background/40 rounded-xl text-xs text-foreground/50">
                Preview: <span className="font-mono text-brand">{preview}</span> ... <span className="font-mono text-brand">{batesLabel(totalPages)}</span>
              </div>
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Hash className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Bates Numbering</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Sequential document stamping used in legal discovery, medical records, and compliance workflows. Supports custom prefix, suffix, and zero-padded numbering.</p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />Stamping...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5"><div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} /></div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `bates-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Bates PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Number another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Hash className="w-4 h-4" />Apply Bates Numbers
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
