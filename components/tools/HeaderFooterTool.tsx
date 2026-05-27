'use client';

import React, { useState, useRef } from 'react';
import { AlignCenter, Loader2, Download } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

type Position = 'left' | 'center' | 'right';
interface HFConfig {
  headerLeft: string; headerCenter: string; headerRight: string;
  footerLeft: string; footerCenter: string; footerRight: string;
  fontSize: number; color: string;
}

const COLORS: Record<string, [number, number, number]> = {
  Black: [0, 0, 0], Gray: [0.4, 0.4, 0.4], Red: [0.8, 0.1, 0.1], Blue: [0.1, 0.2, 0.7],
};

export function HeaderFooterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [cfg, setCfg] = useState<HFConfig>({
    headerLeft: '', headerCenter: '', headerRight: '',
    footerLeft: '', footerCenter: 'Page {page} of {total}', footerRight: '',
    fontSize: 9, color: 'Black',
  });
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

  const resolve = (text: string, page: number, total: number) =>
    text.replace(/{page}/g, String(page)).replace(/{total}/g, String(total));

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const total = doc.getPageCount();
      const [r, g, b] = COLORS[cfg.color] || [0, 0, 0];
      const color = rgb(r, g, b);

      doc.getPages().forEach((page, idx) => {
        const { width, height } = page.getSize();
        const pgNum = idx + 1;
        const draw = (text: string, x: number, y: number, align: Position) => {
          const t = resolve(text, pgNum, total);
          if (!t) return;
          const tw = font.widthOfTextAtSize(t, cfg.fontSize);
          let dx = x;
          if (align === 'center') dx = width / 2 - tw / 2;
          if (align === 'right') dx = width - 20 - tw;
          page.drawText(t, { x: dx, y, size: cfg.fontSize, font, color });
        };
        const headerY = height - 18;
        const footerY = 8;
        draw(cfg.headerLeft, 20, headerY, 'left');
        draw(cfg.headerCenter, 0, headerY, 'center');
        draw(cfg.headerRight, 0, headerY, 'right');
        draw(cfg.footerLeft, 20, footerY, 'left');
        draw(cfg.footerCenter, 0, footerY, 'center');
        draw(cfg.footerRight, 0, footerY, 'right');
      });

      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Failed to add header/footer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const TextField = ({ label, field }: { label: string; field: keyof HFConfig }) => (
    <input
      type="text" placeholder={label} value={cfg[field] as string}
      onChange={e => setCfg(prev => ({ ...prev, [field]: e.target.value }))}
      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500"
    />
  );

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
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><AlignCenter className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload PDF</h3>
              <p className="text-xs text-white/40">Add custom headers and footers to every page.</p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><AlignCenter className="w-5 h-5 text-purple-400" /></div>
                  <div>
                    <h4 className="text-base font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">{totalPages} pages · use {'{page}'} and {'{total}'} tokens</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-white/40 hover:text-white">Change</Button>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono text-white/40 uppercase">Header</p>
                <div className="grid grid-cols-3 gap-2">
                  <TextField label="Left" field="headerLeft" />
                  <TextField label="Center" field="headerCenter" />
                  <TextField label="Right" field="headerRight" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-mono text-white/40 uppercase">Footer</p>
                <div className="grid grid-cols-3 gap-2">
                  <TextField label="Left" field="footerLeft" />
                  <TextField label="Center" field="footerCenter" />
                  <TextField label="Right" field="footerRight" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Font Size</label>
                  <input type="range" min={7} max={14} value={cfg.fontSize} onChange={e => setCfg(p => ({ ...p, fontSize: Number(e.target.value) }))} className="w-full accent-purple-500" />
                  <span className="text-xs text-white/60">{cfg.fontSize}pt</span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Color</label>
                  <select value={cfg.color} onChange={e => setCfg(p => ({ ...p, color: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500">
                    {Object.keys(COLORS).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <AlignCenter className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Header & Footer</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Stamp text at the top and bottom of every PDF page. Use <span className="font-mono text-purple-400">{'{page}'}</span> and <span className="font-mono text-purple-400">{'{total}'}</span> for automatic page numbers.</p>
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Applying...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `stamped-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-white/50 hover:text-white text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <AlignCenter className="w-4 h-4" />Apply Header & Footer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
