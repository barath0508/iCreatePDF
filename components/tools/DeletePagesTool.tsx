'use client';

import React, { useState, useRef } from 'react';
import { Trash2, Loader2, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function DeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteRange, setDeleteRange] = useState('');
  const [pagesRemaining, setPagesRemaining] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null); setDeleteRange('');
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);

    try {
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setTotalPages(count);
      setPagesRemaining(count);
    } catch (err: any) {
      setError(`Could not read PDF page count: ${err?.message || 'Unknown error'}`);
      setFile(null);
    }
  };

  const parsePagesToDelete = (input: string, max: number): Set<number> => {
    const toDelete = new Set<number>();
    const segments = input.split(',');
    for (const segment of segments) {
      const trimSeg = segment.trim();
      if (!trimSeg) continue;
      if (trimSeg.includes('-')) {
        const [startStr, endStr] = trimSeg.split('-');
        const start = parseInt(startStr.trim(), 10);
        const end = parseInt(endStr.trim(), 10);
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.min(start, end);
          const e = Math.max(start, end);
          for (let i = s; i <= e; i++) {
            if (i >= 1 && i <= max) toDelete.add(i - 1); // 0-indexed internally
          }
        }
      } else {
        const val = parseInt(trimSeg, 10);
        if (!isNaN(val) && val >= 1 && val <= max) {
          toDelete.add(val - 1);
        }
      }
    }
    return toDelete;
  };

  const handleRangeChange = (val: string) => {
    setDeleteRange(val);
    if (!file) return;
    const toDelete = parsePagesToDelete(val, totalPages);
    setPagesRemaining(Math.max(0, totalPages - toDelete.size));
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const outDoc = await PDFDocument.create();
      
      const toDelete = parsePagesToDelete(deleteRange, totalPages);
      if (toDelete.size === totalPages) {
        throw new Error('You cannot delete all pages. At least one page must remain.');
      }

      const pagesToKeep: number[] = [];
      for (let i = 0; i < totalPages; i++) {
        if (!toDelete.has(i)) pagesToKeep.push(i);
      }

      const copied = await outDoc.copyPages(srcDoc, pagesToKeep);
      copied.forEach(p => outDoc.addPage(p));

      const bytes = await outDoc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Failed to delete pages.');
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
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-zinc-900/30 hover:border-white/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><Trash2 className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload a PDF to delete pages</h3>
              <p className="text-xs text-white/40">Select pages or range of pages to permanently discard.</p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><Trash2 className="w-5 h-5 text-purple-400" /></div>
                  <div>
                    <h4 className="text-base font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">{fmt(file.size)} • {totalPages} pages total</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); setDeleteRange(''); }} className="text-xs text-white/40 hover:text-white">Change</Button>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-white/70">Page Numbers to Delete</label>
                <input
                  type="text"
                  value={deleteRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
                  placeholder="e.g. 2, 4, 6-8"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-white/40">Separate individual pages with commas, or ranges with hyphens. Pages kept: <span className="text-purple-400 font-bold">{pagesRemaining}</span> / {totalPages}</p>
              </div>
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400 shrink-0" />{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Trash2 className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Delete PDF Pages</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Instantly delete any page number or range from your PDF file. The transformation runs entirely in your local browser sandbox, keeping your documents 100% private.</p>
          
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Processing...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `updated-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Updated PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); setDeleteRange(''); }} className="w-full text-white/50 hover:text-white text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file || !deleteRange.trim()} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file && deleteRange.trim() ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <Trash2 className="w-4 h-4" />Delete Pages
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
