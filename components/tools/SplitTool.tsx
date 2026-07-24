'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, FileText, Plus, Trash2 } from 'lucide-react';
import { splitPdf, SplitRange } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

export function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [ranges, setRanges] = useState<SplitRange[]>([{ start: 1, end: 1 }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrls, setDownloadUrls] = useState<string[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrls([]);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(arrayBuffer);
      
      setFile(uploadedFile);
      setPagesCount(pdf.getPageCount());
      setRanges([{ start: 1, end: pdf.getPageCount() }]);
    } catch (err) {
      console.error(err);
      setError(`Failed to read PDF file: ${uploadedFile.name}`);
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

  const addRange = () => {
    setRanges((prev) => [...prev, { start: 1, end: pagesCount }]);
  };

  const removeRange = (idx: number) => {
    setRanges((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateRange = (idx: number, key: 'start' | 'end', val: number) => {
    setRanges((prev) =>
      prev.map((range, i) =>
        i === idx 
          ? { 
              ...range, 
              [key]: isNaN(val) ? 1 : Math.max(1, Math.min(pagesCount, val)) 
            } 
          : range
      )
    );
  };

  const triggerSplit = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const splitDocsBytes = await splitPdf(buffer, ranges, (p) => setProgress(Math.round(p)));
      
      const urls = splitDocsBytes.map((bytes) => {
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      });
      
      setDownloadUrls(urls);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to split PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `split-${index + 1}-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Workspace area */}
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
                Split PDF operations are processed 100% locally on your browser.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
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
                    setDownloadUrls([]);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              {/* Range Editor */}
              <div className="space-y-3 pt-4 border-t border-foreground/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
                    Split Ranges
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRange}
                    className="h-7 text-xs border-foreground/10 hover:bg-foreground/5"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Add Range
                  </Button>
                </div>

                <div className="space-y-2">
                  {ranges.map((range, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-background/40 border border-foreground/5 rounded-xl"
                    >
                      <span className="text-xs font-mono text-foreground/40 w-16">
                        Range {idx + 1}
                      </span>
                      
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-foreground/40 font-mono">From:</span>
                          <input
                            type="number"
                            min="1"
                            max={pagesCount}
                            value={range.start}
                            onChange={(e) => updateRange(idx, 'start', parseInt(e.target.value))}
                            className="w-16 h-8 text-center bg-card/80 border border-foreground/10 text-foreground rounded text-sm font-mono"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-foreground/40 font-mono">To:</span>
                          <input
                            type="number"
                            min="1"
                            max={pagesCount}
                            value={range.end}
                            onChange={(e) => updateRange(idx, 'end', parseInt(e.target.value))}
                            className="w-16 h-8 text-center bg-card/80 border border-foreground/10 text-foreground rounded text-sm font-mono"
                          />
                        </div>
                      </div>

                      {ranges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRange(idx)}
                          className="p-1 text-foreground/40 hover:text-red-400 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
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

        {/* Action Panel */}
        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Split Options</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Extract selected page ranges as separate documents. All page divisions are processed fully inside your browser memory.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Splitting...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrls.length > 0 ? (
              <div className="space-y-2">
                {downloadUrls.map((url, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleDownload(url, idx)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Download Split Part {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrls([]);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Split new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerSplit}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Split PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
