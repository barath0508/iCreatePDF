'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Trash2, Loader2, Download, FileText } from 'lucide-react';
import { mergePdfs } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

interface PdfFile {
  id: string;
  file: File;
  pagesCount: number;
}

export function MergeTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);

    const addedFiles: PdfFile[] = [];

    for (const file of Array.from(uploadedFiles)) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'pdf') {
        setError('Only PDF files are supported.');
        return;
      }

      try {
        // Read file to parse pages count using pdf-lib
        const arrayBuffer = await file.arrayBuffer();
        const { PDFDocument } = await import('pdf-lib');
        const pdf = await PDFDocument.load(arrayBuffer);
        
        addedFiles.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          pagesCount: pdf.getPageCount(),
        });
      } catch (err) {
        console.error(err);
        setError(`Failed to read PDF file: ${file.name}`);
      }
    }

    if (addedFiles.length > 0) {
      setFiles((prev) => [...prev, ...addedFiles]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setDownloadUrl(null);
  };

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItemIndex.current !== null &&
      dragOverItemIndex.current !== null &&
      dragItemIndex.current !== dragOverItemIndex.current
    ) {
      const updated = [...files];
      const dragged = updated.splice(dragItemIndex.current, 1)[0];
      updated.splice(dragOverItemIndex.current, 0, dragged);
      setFiles(updated);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  const triggerMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffers = await Promise.all(files.map((f) => f.file.arrayBuffer()));
      const mergedBytes = await mergePdfs(buffers, (p) => setProgress(Math.round(p)));

      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to merge PDF files.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `merged-icreatepdf-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace area */}
        <div className="lg:col-span-8 space-y-6">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[220px] ${
              isDraggingOver
                ? 'border-purple-500 bg-purple-500/5'
                : 'border-white/10 bg-zinc-900/30 hover:border-white/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              multiple
              accept=".pdf"
              className="hidden"
            />
            <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-display text-white mb-2">
              Select or drag PDF files
            </h3>
            <p className="text-xs text-white/40">
              Files are merged 100% locally in your browser memory.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                Files Queue ({files.length}) - Drag to reorder
              </span>

              <div className="space-y-2">
                {files.map((item, idx) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragEnter={() => handleDragEnter(idx)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center justify-between p-4 bg-zinc-950 border border-white/5 rounded-xl cursor-move hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-medium text-white truncate max-w-sm sm:max-w-md">
                          {item.file.name}
                        </p>
                        <p className="text-xs text-white/40">
                          {item.pagesCount} pages • {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="p-2 hover:bg-red-950/20 hover:text-red-400 rounded-lg text-white/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Merge PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Combine multiple PDF files into a single document. Drag items to adjust the sequence of documents.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    Merging...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Merged PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFiles([]);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Merge new files
                </Button>
              </div>
            ) : (
              <Button
                disabled={files.length < 2}
                onClick={triggerMerge}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  files.length >= 2 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Merge PDFs
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
