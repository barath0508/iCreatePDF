'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function FormDataExtractorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedData, setExtractedData] = useState<Record<string, string>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setDownloadUrl(null);
    const pdfArray = Array.from(uploadedFiles).filter((f) => f.name.toLowerCase().endsWith('.pdf'));
    if (pdfArray.length === 0) {
      toast.error('Please select valid PDF files.');
      return;
    }
    setFiles((prev) => [...prev, ...pdfArray]);
    toast.info(`Added ${pdfArray.length} PDF form(s)`);
  };

  const triggerExtract = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const results: Record<string, string>[] = [];

      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round(((i + 1) / files.length) * 90));
        const file = files[i];
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);

        const form = pdfDoc.getForm();
        const fields = form.getFields();

        const row: Record<string, string> = { '_filename': file.name };
        fields.forEach((field) => {
          const name = field.getName();
          try {
            row[name] = (field as any).getText?.() || '';
          } catch {
            row[name] = 'Checked / Active';
          }
        });

        results.push(row);
      }

      setExtractedData(results);

      // Build CSV string
      if (results.length > 0) {
        const headers = Array.from(new Set(results.flatMap((r) => Object.keys(r))));
        let csv = headers.join(',') + '\n';
        results.forEach((row) => {
          const values = headers.map((h) => `"${(row[h] || '').replace(/"/g, '""')}"`);
          csv += values.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setProgress(100);
        toast.success(`Extracted form fields from ${files.length} PDFs into CSV!`);

        const { addRecentFile } = require('@/lib/db');
        addRecentFile({
          name: 'extracted-form-data.csv',
          size: blob.size,
          toolName: 'Export Form Data',
          href: '/export-pdf-form-data',
          downloadUrl: url,
        });
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to extract form data.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'extracted-form-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {files.length === 0 ? (
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
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" multiple className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <FileSpreadsheet className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag Filled Form PDFs</h3>
              <p className="text-xs text-foreground/40">Extract AcroForm inputs and checkboxes into a CSV spreadsheet automatically.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">Form Queue ({files.length} Files)</h4>
                  <p className="text-xs text-foreground/40">{files.map((f) => f.name).join(', ')}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFiles([]); setDownloadUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Clear All</Button>
              </div>

              {downloadUrl && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CSV Form Spreadsheet Ready! Extracted {extractedData.length} records.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Form Data Exporter</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Extracts filled input values, text fields, and checkbox statuses into a consolidated CSV dataset.
          </p>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 text-brand animate-spin" /> Extracting form data...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Form CSV
                </Button>
                <Button variant="ghost" onClick={() => { setFiles([]); setDownloadUrl(null); }} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Process more files</Button>
              </div>
            ) : (
              <Button disabled={files.length === 0} onClick={triggerExtract} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${files.length > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
                <FileSpreadsheet className="w-4 h-4" /> Export Form Data to CSV
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
