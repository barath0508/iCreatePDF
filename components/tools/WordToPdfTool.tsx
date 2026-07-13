'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Download, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
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
    setProgress(10);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      setProgress(30);

      // Create a temporary hidden container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '800px'; // standard width for docx rendering
      container.style.background = 'white';
      container.style.color = 'black';
      container.style.padding = '40px';
      container.style.fontFamily = 'Calibri, Arial, sans-serif';
      document.body.appendChild(container);

      // Render the DOCX
      // @ts-expect-error
      const docx = await import('docx-preview');
      setProgress(50);
      await docx.renderAsync(buffer, container, undefined, {
        inWrapper: false,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        debug: false
      });

      // Wait a short moment for images/fonts to load
      setProgress(70);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert the container to PDF
      // @ts-expect-error
      const html2pdf = (await import('html2pdf.js')).default || (await import('html2pdf.js'));
      setProgress(85);
      const opt = {
        margin:       [10, 10, 10, 10], // top, left, bottom, right in mm
        filename:     `${file.name.replace('.docx', '')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2.0, // High quality scale
          useCORS: true, 
          logging: false 
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] }
      };

      // Generate the PDF blob
      const pdfBlob = await html2pdf().from(container).set(opt).output('blob');
      
      // Clean up the container
      document.body.removeChild(container);

      const url = URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError((err as any)?.message || 'Failed to convert Word file. Make sure the file is not password-protected.');
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
                accept=".docx"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Upload className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Select or drag a Word (.docx) file
              </h3>
              <p className="text-xs text-foreground/40">
                Word files are parsed and translated to PDF 100% locally.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">
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
                  className="text-xs text-foreground/40 hover:text-foreground"
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
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <FileText className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Word to PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Convert standard .docx word processor documents into clean, portable PDF layouts client-side. Zero cloud uploads.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Converting...
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
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
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
                  Convert new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerWordToPdf}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
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
