'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileSearch, Loader2, Download, Copy, Check, Languages, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LANGUAGES = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish (Español)' },
  { code: 'hin', name: 'Hindi (हिन्दी)' },
  { code: 'tam', name: 'Tamil (தமிழ்)' },
];

export function PdfOcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedLang, setSelectedLang] = useState('eng');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setExtractedText(null);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setError('Only PDF documents are supported.');
      return;
    }

    setFile(uploadedFile);
  };

  const triggerOcr = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setStatusMessage('Loading PDF document...');

    let worker: any = null;

    try {
      // 1. Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      // 2. Initialize Tesseract Worker
      setStatusMessage(`Loading ${LANGUAGES.find(l => l.code === selectedLang)?.name} dictionary...`);
      const { createWorker } = await import('tesseract.js');

      worker = await createWorker(selectedLang, undefined, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pageProgress = Math.round(m.progress * 100);
            setProgress(pageProgress);
          }
        }
      });

      let fullText = '';

      // 3. Process page by page
      for (let i = 1; i <= numPages; i++) {
        setStatusMessage(`Page ${i} of ${numPages}: Rendering canvas...`);
        setProgress(0);

        const page = await pdf.getPage(i);
        // Render at 1.5x scale (good balance between OCR speed and resolution accuracy)
        const vp = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;

        await page.render({ canvasContext: ctx, viewport: vp, canvas: canvas as any }).promise;

        setStatusMessage(`Page ${i} of ${numPages}: Extracting characters...`);
        const { data: { text } } = await worker.recognize(canvas);

        fullText += `--- Page ${i} ---\n${text}\n\n`;
      }

      setExtractedText(fullText.trim());
      setStatusMessage('OCR Completed successfully.');
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'OCR extraction failed. Ensure your document is readable.');
    } finally {
      if (worker) {
        try {
          await worker.terminate();
        } catch (e) {
          console.error('Failed to terminate tesseract worker', e);
        }
      }
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}-ocr.txt`;
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
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
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
                <FileSearch className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                Upload scanned PDF for OCR
              </h3>
              <p className="text-xs text-foreground/40">
                Extract text locally from non-copyable pages using client-side AI.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                    <p className="text-xs text-foreground/40">
                      PDF Document • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isProcessing}
                  onClick={() => {
                    setFile(null);
                    setExtractedText(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground"
                >
                  Change File
                </Button>
              </div>

              {!extractedText && !isProcessing && (
                <div className="pt-4 border-t border-foreground/5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60 block flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5" />
                      Document Language (For higher accuracy)
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand appearance-none"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/60 font-mono text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {extractedText && (
                <div className="space-y-2 pt-4 border-t border-foreground/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-foreground/40">OCR Extracted Text</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="text-xs flex items-center gap-1.5 text-foreground/60 hover:text-foreground"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? 'Copied' : 'Copy Text'}
                    </Button>
                  </div>
                  <textarea
                    readOnly
                    value={extractedText}
                    className="w-full h-80 bg-background border border-foreground/10 rounded-xl p-4 font-mono text-xs text-foreground/80 focus:outline-none focus:border-foreground/20 resize-y"
                  />
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <FileSearch className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">PDF OCR</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Extract searchable text layers from scanned paper documents or flat copy-proof files. Everything is processed 100% locally on your computer.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2 truncate">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand shrink-0" />
                    <span className="truncate">{statusMessage}</span>
                  </span>
                  <span className="shrink-0">{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5">
                  <div className="bg-brand h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : extractedText ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Plain Text (.txt)
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setExtractedText(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  OCR another file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file}
                onClick={triggerOcr}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'
                }`}
              >
                <FileSearch className="w-4 h-4" />
                Run OCR Text Extraction
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
