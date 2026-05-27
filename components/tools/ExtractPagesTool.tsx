'use client';

import React, { useState, useRef } from 'react';
import { BookOpen, Loader2, Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

function parsePageRange(input: string, total: number): number[] {
  const pages: Set<number> = new Set();
  const parts = input.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [a, b] = trimmed.split('-').map(Number);
      for (let i = a; i <= Math.min(b, total); i++) if (i >= 1) pages.add(i);
    } else {
      const n = Number(trimmed);
      if (n >= 1 && n <= total) pages.add(n);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function ExtractPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null); setRangeInput('');
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    const buf = await f.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    setTotalPages(doc.getPageCount());
  };

  const parsedPages = file && rangeInput ? parsePageRange(rangeInput, totalPages) : [];

  const process = async () => {
    if (!file || parsedPages.length === 0) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buf);
      const outDoc = await PDFDocument.create();
      const indices = parsedPages.map(p => p - 1);
      const copied = await outDoc.copyPages(srcDoc, indices);
      copied.forEach(page => outDoc.addPage(page));
      const bytes = await outDoc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Extraction failed.');
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
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><BookOpen className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload PDF to extract pages</h3>
              <p className="text-xs text-white/40">Pick specific pages or ranges to save as a new PDF.</p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><BookOpen className="w-5 h-5 text-purple-400" /></div>
                  <div>
                    <h4 className="text-base font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">{totalPages} pages total</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-white/40 hover:text-white">Change</Button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/40 uppercase">Page Range</label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={e => setRangeInput(e.target.value)}
                  placeholder={`e.g. 1,3,5-8,12 (max: ${totalPages})`}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 font-mono"
                />
                <p className="text-[10px] text-white/30">Use commas for individual pages and dashes for ranges. Example: 1,3,5-8,12</p>
              </div>
              {parsedPages.length > 0 && (
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <p className="text-xs text-purple-300">Extracting {parsedPages.length} page{parsedPages.length > 1 ? 's' : ''}: <span className="font-mono">{parsedPages.join(', ')}</span></p>
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Extract Pages</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Pull specific pages from a large PDF into a compact new document. Perfect for extracting a chapter, exhibit, or individual form from a multi-page file.</p>
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Extracting...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `extracted-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Extracted PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); setRangeInput(''); }} className="w-full text-white/50 hover:text-white text-xs h-8">Extract from another file</Button>
              </div>
            ) : (
              <Button disabled={!file || parsedPages.length === 0} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file && parsedPages.length > 0 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <BookOpen className="w-4 h-4" />Extract Pages
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
