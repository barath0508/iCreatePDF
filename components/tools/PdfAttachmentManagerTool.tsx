'use client';

import React, { useState, useRef } from 'react';
import { Upload, Paperclip, Download, Plus, FileText, CheckCircle2, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AttachmentItem {
  filename: string;
  content: Uint8Array;
}

export function PdfAttachmentManagerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [newFilesToAttach, setNewFilesToAttach] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedPdf = e.target.files[0];
      setFile(selectedPdf);
      setIsLoading(true);
      setDownloadUrl(null);
      setNewFilesToAttach([]);

      try {
        const arrayBuffer = await selectedPdf.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;

        const rawAttachments = await pdf.getAttachments();
        const parsedList: AttachmentItem[] = [];

        if (rawAttachments) {
          Object.keys(rawAttachments).forEach((key) => {
            const item = rawAttachments[key];
            if (item && item.content) {
              parsedList.push({
                filename: item.filename || key,
                content: item.content,
              });
            }
          });
        }
        setAttachments(parsedList);
      } catch (err) {
        console.error('Failed to parse attachments:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFilesToAttach((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const downloadAttachment = (item: AttachmentItem) => {
    const blob = new Blob([item.content]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveUpdatedPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      for (const newFile of newFilesToAttach) {
        const fileBytes = await newFile.arrayBuffer();
        await pdfDoc.attach(new Uint8Array(fileBytes), newFile.name, {
          mimeType: newFile.type || 'application/octet-stream',
          description: 'Attached via iCreatePDF',
          creationDate: new Date(),
          modificationDate: new Date(),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error('Failed to attach files:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {!file ? (
        <div
          onClick={() => pdfInputRef.current?.click()}
          className="relative cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[260px] border-border bg-card hover:border-brand/50 transition-all duration-300 shadow-sm"
        >
          <input
            type="file"
            ref={pdfInputRef}
            onChange={handlePdfUpload}
            accept=".pdf"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
            <Paperclip className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">Manage & Embed PDF Attachments</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Extract ZUGFeRD / Factur-X XML e-invoices, or embed spreadsheets, docs, and images directly into your PDF container.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-card border border-border rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand" />
              <div>
                <h4 className="text-sm font-semibold text-foreground truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setFile(null); setAttachments([]); setNewFilesToAttach([]); setDownloadUrl(null); }}
            >
              Change PDF
            </Button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center bg-card border border-border rounded-2xl">
              <RefreshCw className="w-8 h-8 animate-spin text-brand mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Inspecting PDF catalog for embedded files...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Embedded Files */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                <h4 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-brand" />
                  Existing Embedded Attachments ({attachments.length})
                </h4>
                {attachments.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {attachments.map((item, i) => (
                      <div key={i} className="p-3 bg-background border border-border rounded-xl flex items-center justify-between">
                        <span className="text-xs font-mono text-foreground font-semibold truncate max-w-[200px]">
                          {item.filename}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadAttachment(item)}
                          className="text-xs text-brand hover:text-brand/80"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" /> Extract
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-6 text-center border border-dashed border-border rounded-xl">
                    No embedded attachments found in this document catalog.
                  </p>
                )}
              </div>

              {/* Add New Attachments */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                    <Plus className="w-4 h-4 text-brand" />
                    Embed New Files
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => attachInputRef.current?.click()}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Select Files
                  </Button>
                  <input
                    type="file"
                    ref={attachInputRef}
                    onChange={handleAddAttachment}
                    multiple
                    className="hidden"
                  />
                </div>

                {newFilesToAttach.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {newFilesToAttach.map((nf, i) => (
                      <div key={i} className="p-3 bg-background border border-border rounded-xl flex items-center justify-between">
                        <span className="text-xs font-mono text-foreground font-semibold truncate max-w-[200px]">
                          {nf.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewFilesToAttach((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-6 text-center border border-dashed border-border rounded-xl">
                    Select XML, CSV, XLSX, PNG, or DOCX files to attach inside the PDF container.
                  </p>
                )}
              </div>
            </div>
          )}

          {newFilesToAttach.length > 0 && (
            <div className="flex justify-end pt-4">
              <Button
                onClick={saveUpdatedPdf}
                disabled={isProcessing}
                className="bg-brand hover:bg-brand/90 text-foreground font-medium px-8 py-3 rounded-xl"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Paperclip className="w-4 h-4 mr-2" />}
                {isProcessing ? 'Embedding Attachments...' : `Embed ${newFilesToAttach.length} File(s) & Rebuild PDF`}
              </Button>
            </div>
          )}

          {downloadUrl && (
            <div className="p-6 bg-card border border-emerald-500/30 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold text-foreground font-display">PDF Package Created!</h4>
                  <p className="text-xs text-muted-foreground">Embedded file streams attached to PDF catalog.</p>
                </div>
              </div>
              <a href={downloadUrl} download={`attached_${file.name}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold">
                  <Download className="w-4 h-4 mr-2" /> Download PDF Package
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
