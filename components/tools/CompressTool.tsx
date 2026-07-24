'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
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
    setDownloadUrl(null);
    
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

  const triggerCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      
      setProgress(30);
      const pdfDoc = await PDFDocument.load(buffer);
      
      setProgress(60);
      // Save with compression options enabled (object stream compression compresses streams)
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
      });
      
      setProgress(90);
      const blob = new Blob([compressedBytes as any], { type: 'application/pdf' });
      setCompressedSize(blob.size);
      
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);

      // Cache reference in IndexedDB
      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `compressed-${file?.name || 'document.pdf'}`,
        size: blob.size,
        toolName: 'Compress PDF',
        href: '/tools/compress-pdf',
        downloadUrl: url,
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to compress PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `compressed-${file?.name}`;
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
                Select or drag a PDF file to compress
              </h3>
              <p className="text-xs text-foreground/40">
                Compression is processed 100% locally on your browser.
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
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono space-y-1">
                  <p>✓ Compression Complete</p>
                  <p>Original Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <p>Compressed Size: {(compressedSize / (1024 * 1024)).toFixed(2)} MB</p>
                  <p>Reduction: {Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100))}%</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Compress PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Compress your PDF streams and objects locally to decrease the file size for attachments and emails.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Compressing...
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
                  Download Compressed PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Compress new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerCompress}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Compress PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
