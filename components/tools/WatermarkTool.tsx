'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, FileText, Type } from 'lucide-react';
import { addWatermarkToPdf, WatermarkOptions } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

export function WatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [options, setOptions] = useState<WatermarkOptions>({
    text: 'CONFIDENTIAL',
    size: 50,
    opacity: 0.25,
    colorHex: '#FF0000',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!file) return;

    let isMounted = true;
    const loadPreview = async () => {
      setIsPreviewLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        setPagesCount(pdf.numPages);

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });

        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport, canvas }).promise;
          }
        }
      } catch (err) {
        console.error('Error loading PDF preview:', err);
      } finally {
        if (isMounted) setIsPreviewLoading(false);
      }
    };

    loadPreview();
    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    setFile(uploadedFile);
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

  const triggerWatermark = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const watermarkedBytes = await addWatermarkToPdf(buffer, options, (p) => setProgress(Math.round(p)));
      
      const blob = new Blob([watermarkedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to add watermark.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `watermarked-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/5'
                  : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept=".pdf"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Upload className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-foreground/40">
                Watermarks are applied 100% locally on your browser.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-card border border-foreground/10 rounded-2xl flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">
                    {pagesCount} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              {/* Live Preview Card */}
              <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-foreground/5 pb-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-foreground/60">Live Preview (Page 1)</h3>
                  <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded border border-brand/20 uppercase font-mono">Real-time</span>
                </div>
                
                <div className="relative border border-foreground/5 rounded-xl overflow-hidden bg-card/50 flex justify-center items-center p-4 min-h-[300px]">
                  {isPreviewLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10 space-y-2">
                      <Loader2 className="w-6 h-6 text-brand animate-spin" />
                      <span className="text-xs text-foreground/60 font-mono">Rendering preview...</span>
                    </div>
                  )}
                  
                  <div className="relative">
                    <canvas ref={canvasRef} className="max-w-full max-h-[500px] shadow-2xl rounded" />
                    
                    {/* Watermark HTML Overlay matching options */}
                    <div 
                      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
                      style={{
                        opacity: options.opacity,
                        color: options.colorHex,
                        fontSize: `${Math.max(10, options.size * 0.6)}px`, // scaled down slightly for container preview
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        transform: 'rotate(45deg)',
                        whiteSpace: 'nowrap',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      {options.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Options Panel */}
        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Watermark options</h3>
          </div>

          <div className="space-y-4">
            {/* Watermark text */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Text</label>
              <input
                type="text"
                value={options.text}
                onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}
                className="w-full h-10 px-3 bg-card/80 border border-foreground/10 text-foreground rounded-lg text-sm"
              />
            </div>

            {/* Font size */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Size ({options.size}pt)</label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={options.size}
                onChange={(e) => setOptions((prev) => ({ ...prev, size: parseInt(e.target.value) }))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Opacity ({Math.round(options.opacity * 100)}%)</label>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={options.opacity}
                onChange={(e) => setOptions((prev) => ({ ...prev, opacity: parseFloat(e.target.value) }))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={options.colorHex}
                  onChange={(e) => setOptions((prev) => ({ ...prev, colorHex: e.target.value }))}
                  className="w-10 h-10 border-0 bg-transparent rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={options.colorHex}
                  onChange={(e) => setOptions((prev) => ({ ...prev, colorHex: e.target.value }))}
                  className="flex-1 h-10 px-3 bg-card/80 border border-foreground/10 text-foreground rounded-lg text-sm uppercase font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Watermarking...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
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
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Watermark new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerWatermark}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <Type className="w-4 h-4" />
                Add Watermark
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
