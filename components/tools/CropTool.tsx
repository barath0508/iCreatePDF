'use client';

import React, { useState, useRef } from 'react';
import { Crop, Loader2, Download, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function CropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [margins, setMargins] = useState({ top: 10, bottom: 10, left: 10, right: 10 });
  const [pageInfo, setPageInfo] = useState<{ count: number; w: number; h: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mmToPts = (mm: number) => mm * 2.8346;

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    try {
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const page = doc.getPage(0);
      const { width, height } = page.getSize();
      setPageInfo({ count: doc.getPageCount(), w: Math.round(width / 2.8346), h: Math.round(height / 2.8346) });
    } catch { setPageInfo(null); }
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const pages = doc.getPages();
      pages.forEach(page => {
        const { width, height } = page.getSize();
        const t = mmToPts(margins.top), b = mmToPts(margins.bottom);
        const l = mmToPts(margins.left), r = mmToPts(margins.right);
        page.setCropBox(l, b, width - l - r, height - t - b);
        page.setMediaBox(l, b, width - l - r, height - t - b);
      });
      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Crop failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const MarginInput = ({ label, key2 }: { label: string; key2: keyof typeof margins }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-mono text-foreground/40 uppercase">{label} (mm)</label>
      <input
        type="number" min={0} max={100} value={margins[key2]}
        onChange={e => setMargins(prev => ({ ...prev, [key2]: Number(e.target.value) }))}
        className="w-full bg-background/40 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand"
      />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Crop className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload PDF to crop</h3>
              <p className="text-xs text-foreground/40">Remove scanner borders and whitespace by trimming margins.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Crop className="w-5 h-5 text-brand" /></div>
                  <div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                    {pageInfo && <p className="text-xs text-foreground/40">{pageInfo.count} pages · {pageInfo.w} × {pageInfo.h} mm</p>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); setPageInfo(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MarginInput label="Top" key2="top" />
                <MarginInput label="Bottom" key2="bottom" />
                <MarginInput label="Left" key2="left" />
                <MarginInput label="Right" key2="right" />
              </div>
              {pageInfo && (
                <div className="p-3 bg-background/40 rounded-xl text-xs text-foreground/50">
                  New size: <span className="text-brand font-mono">{pageInfo.w - margins.left - margins.right} × {pageInfo.h - margins.top - margins.bottom} mm</span> (cropped from {pageInfo.w} × {pageInfo.h} mm)
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Crop className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Crop PDF</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Remove unwanted scanner borders and excess whitespace by trimming margins from any side of all PDF pages.</p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Cropping...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `cropped-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Cropped PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); setPageInfo(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Crop another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Crop className="w-4 h-4" />Crop PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
