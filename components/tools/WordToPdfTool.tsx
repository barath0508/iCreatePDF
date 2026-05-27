'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Download, FileCode } from 'lucide-react';
import { convertDocxToPdf } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

export function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'docx') {
      setError('Only Word (.docx) files are supported.');
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

  const triggerWordToPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfBytes = await convertDocxToPdf(buffer, (p) => setProgress(Math.round(p)));
      
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to convert Word file. Make sure the file is not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${file?.name.replace('.docx', '')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16">
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
                accept=".docx"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-display text-white mb-2">
                Select or drag a Word (.docx) file
              </h3>
              <p className="text-xs text-white/40">
                Word files are parsed and translated to PDF 100% locally.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">
                      Word Document • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-white/40 hover:text-white"
                >
                  Change File
                </Button>
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
            <FileText className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Word to PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Convert standard Microsoft Word (.docx) text formatting into clean, portable PDF layouts client-side. Zero cloud uploads.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    Converting...
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
                    setDownloadUrl(null);
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Convert new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerWordToPdf}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Convert to PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
