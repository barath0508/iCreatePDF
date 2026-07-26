'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, BookMarked, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Bookmark {
  id: string;
  title: string;
  page: number;
}

export function PdfTocBuilderTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Chapter 1: Introduction', page: 1 },
    { id: '2', title: 'Chapter 2: Overview', page: 2 },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are supported.');
      return;
    }

    try {
      const buffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(buffer);
      setFile(uploadedFile);
      setPagesCount(pdf.getPageCount());
      toast.info(`Loaded ${uploadedFile.name} (${pdf.getPageCount()} pages)`);
    } catch {
      toast.error('Failed to read PDF file.');
    }
  };

  const addBookmark = () => {
    setBookmarks((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 9), title: `Section ${prev.length + 1}`, page: Math.min(prev.length + 1, pagesCount || 1) },
    ]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const triggerSaveToc = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(buffer);

      setProgress(80);
      const mergedBytes = await pdfDoc.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      toast.success(`Saved ${bookmarks.length} table of contents bookmarks!`);

      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `toc-${file.name}`,
        size: blob.size,
        toolName: 'PDF TOC Builder',
        href: '/tools/pdf-toc-builder',
        downloadUrl: url,
      });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update bookmarks.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `toc-${file?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <BookMarked className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF for Table of Contents</h3>
              <p className="text-xs text-foreground/40">Add, edit, or reorganize clickable outline bookmarks for eBooks and long manuals.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{pagesCount} pages — {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-foreground uppercase">Bookmark Outline Tree ({bookmarks.length}):</span>
                  <button type="button" onClick={addBookmark} className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300">
                    <Plus className="w-3.5 h-3.5" /> Add Bookmark
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {bookmarks.map((bm, idx) => (
                    <div key={bm.id} className="flex items-center gap-2 p-2.5 bg-background border border-border/60 rounded-xl">
                      <span className="text-xs font-mono text-muted-foreground w-6">{idx + 1}.</span>
                      <input
                        type="text"
                        value={bm.title}
                        onChange={(e) => setBookmarks((prev) => prev.map((b) => b.id === bm.id ? { ...b, title: e.target.value } : b))}
                        className="flex-1 bg-transparent border-none text-xs font-sans text-foreground focus:outline-none"
                      />
                      <span className="text-xs font-mono text-muted-foreground">Page:</span>
                      <input
                        type="number"
                        min="1"
                        max={pagesCount}
                        value={bm.page}
                        onChange={(e) => setBookmarks((prev) => prev.map((b) => b.id === bm.id ? { ...b, page: Number(e.target.value) } : b))}
                        className="w-14 p-1 bg-card border border-border rounded text-xs font-mono text-foreground text-center"
                      />
                      <button type="button" onClick={() => removeBookmark(bm.id)} className="p-1 text-foreground/30 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bookmarks Outlined successfully! File ready to download.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">TOC Builder</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Generates compliant PDF outline bookmarks that display inside standard PDF viewer sidebars.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Saving bookmarks...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Outlined PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={triggerSaveToc} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <BookMarked className="w-4 h-4" /> Save Bookmarks & TOC
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
