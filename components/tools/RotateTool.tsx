'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, RotateCw, Loader2, Download, FileText, Layers } from 'lucide-react';
import { organizePdf, PageEditInstruction } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

interface PageThumbnail {
  originalIndex: number;
  rotation: number;
  dataUrl: string;
}

export function RotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setPages([]);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    setFile(uploadedFile);
    setIsLoadingPreviews(true);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const count = pdf.numPages;
      const loadedPages: PageThumbnail[] = [];

      for (let i = 1; i <= count; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.25 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          await page.render({ canvasContext: context, viewport, canvas }).promise;
          loadedPages.push({
            originalIndex: i - 1,
            rotation: 0,
            dataUrl: canvas.toDataURL('image/jpeg', 0.8),
          });
        }
      }

      setPages(loadedPages);
    } catch (err) {
      console.error(err);
      setError('Failed to generate page previews. You can still rotate them, but previews could not be rendered.');
    } finally {
      setIsLoadingPreviews(false);
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

  const rotatePage = (idx: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
    setDownloadUrl(null);
  };

  const rotateAllPages = () => {
    setPages((prev) =>
      prev.map((p) => ({ ...p, rotation: (p.rotation + 90) % 360 }))
    );
    setDownloadUrl(null);
  };

  const triggerRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const instructions: PageEditInstruction[] = pages.map((p) => ({
        originalIndex: p.originalIndex,
        rotation: p.rotation,
        delete: false,
      }));

      const rotatedBytes = await organizePdf(buffer, instructions, (p) => setProgress(Math.round(p)));
      const blob = new Blob([rotatedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to rotate PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `rotated-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
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
                accept=".pdf"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-display text-white mb-2">
                Select or drag a PDF file to rotate
              </h3>
              <p className="text-xs text-white/40">
                Rotations are applied locally inside your web browser.
              </p>
            </div>
          ) : isLoadingPreviews ? (
            <div className="p-12 text-center bg-zinc-950 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <p className="text-sm text-white/60">Generating page previews...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Pages Queue ({pages.length}) - Click thumbnails to rotate
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rotateAllPages}
                    className="h-7 text-xs border-white/10 hover:bg-white/5"
                  >
                    Rotate All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setPages([]);
                      setDownloadUrl(null);
                    }}
                    className="text-xs text-white/40 hover:text-white"
                  >
                    Change File
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {pages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => rotatePage(idx)}
                    className="relative bg-zinc-950 border border-white/5 rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-between cursor-pointer hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={img.dataUrl}
                        alt=""
                        style={{ transform: `rotate(${img.rotation}deg)` }}
                        className="max-h-full max-w-full object-contain transition-transform duration-200"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 text-[10px] text-white/70 rounded-full font-mono border border-white/10">
                        Page {img.originalIndex + 1}
                      </span>
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <RotateCw className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex justify-center border-t border-white/5 bg-zinc-900/50 p-2">
                      <span className="text-[10px] text-white/40 font-mono">
                        Rotation: {img.rotation}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Rotate PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Rotate individual pages or apply bulk rotation to all pages in the document.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    Rotating...
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
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setPages([]);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Rotate new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={pages.length === 0}
                onClick={triggerRotate}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  pages.length > 0 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Rotate PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
