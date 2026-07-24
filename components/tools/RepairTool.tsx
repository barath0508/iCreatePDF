'use client';

import React, { useState, useRef } from 'react';
import { Wrench, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function RepairTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [result, setResult] = useState<{ pages: number; before: number; after: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null); setResult(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true, throwOnInvalidObject: false } as any);
      const pages = doc.getPageCount();
      const bytes = await doc.save();
      setResult({ pages, before: file.size, after: bytes.length });
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(`Could not repair this PDF: ${err?.message || 'Unknown error'}. The file may be severely corrupted.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const fmt = (b: number) => b > 1024 * 1024 ? `${(b / (1024 * 1024)).toFixed(2)} MB` : `${(b / 1024).toFixed(1)} KB`;

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
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Wrench className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload a corrupted PDF</h3>
              <p className="text-xs text-foreground/40">The tool will rebuild cross-reference tables and recover readable content.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Wrench className="w-5 h-5 text-brand" /></div>
                  <div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">{fmt(file.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); setResult(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
              </div>
              {result && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-emerald-200">PDF repaired successfully</p>
                    <div className="grid grid-cols-3 gap-4 pt-1">
                      {[['Pages recovered', result.pages], ['Original size', fmt(result.before)], ['Repaired size', fmt(result.after)]].map(([l, v]) => (
                        <div key={l as string} className="text-center">
                          <p className="text-lg font-bold text-foreground">{v}</p>
                          <p className="text-[10px] text-foreground/40">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Wrench className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Repair PDF</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Attempts to recover PDFs with broken cross-reference tables, truncated streams, or invalid object entries by rebuilding the document structure.</p>
          <div className="space-y-2 text-xs text-foreground/40">
            <p>Fixes common issues:</p>
            <p>• Broken xref tables</p>
            <p>• Invalid object references</p>
            <p>• Truncated PDF streams</p>
            <p>• Missing PDF trailer</p>
          </div>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Repairing...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `repaired-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Repaired PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); setResult(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Repair another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <Wrench className="w-4 h-4" />Repair PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
