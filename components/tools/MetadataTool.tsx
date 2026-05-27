'use client';

import React, { useState, useRef } from 'react';
import { FileText, Loader2, Download, Info } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

interface Meta { title: string; author: string; subject: string; keywords: string; creator: string; }

export function MetadataTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [meta, setMeta] = useState<Meta>({ title: '', author: '', subject: '', keywords: '', creator: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null);
    const f = uploadedFiles[0];
    if (!f || f.type !== 'application/pdf') { setError('Only PDF files are supported.'); return; }
    setFile(f);
    try {
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      setMeta({
        title: doc.getTitle() || '',
        author: doc.getAuthor() || '',
        subject: doc.getSubject() || '',
        keywords: doc.getKeywords() || '',
        creator: doc.getCreator() || '',
      });
    } catch { setMeta({ title: '', author: '', subject: '', keywords: '', creator: '' }); }
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(',').map(k => k.trim()));
      doc.setCreator(meta.creator);
      doc.setProducer('iCreatePDF');
      doc.setModificationDate(new Date());
      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Failed to update metadata.');
    } finally {
      setIsProcessing(false);
    }
  };

  const Field = ({ label, field, placeholder }: { label: string; field: keyof Meta; placeholder: string }) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-white/40 uppercase">{label}</label>
      <input
        type="text" value={meta[field]} placeholder={placeholder}
        onChange={e => setMeta(prev => ({ ...prev, [field]: e.target.value }))}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500"
      />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-zinc-900/30 hover:border-white/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10"><Info className="w-6 h-6 text-purple-400" /></div>
              <h3 className="text-xl font-display text-white mb-2">Upload PDF to edit metadata</h3>
              <p className="text-xs text-white/40">View and update title, author, subject, keywords, and creator.</p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><FileText className="w-5 h-5 text-purple-400" /></div>
                  <h4 className="text-base font-display text-white">{file.name}</h4>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDownloadUrl(null); }} className="text-xs text-white/40 hover:text-white">Change</Button>
              </div>
              <Field label="Title" field="title" placeholder="Document title" />
              <Field label="Author" field="author" placeholder="Author name" />
              <Field label="Subject" field="subject" placeholder="Document subject or description" />
              <Field label="Keywords (comma-separated)" field="keywords" placeholder="pdf, report, 2026" />
              <Field label="Creator Application" field="creator" placeholder="e.g. Microsoft Word" />
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Info className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Metadata Editor</h3>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">Update hidden PDF document properties — useful for fixing author info, adding SEO keywords to reports, or cleaning up metadata before sharing.</p>
          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />Saving...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `updated-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />Download Updated PDF
                </Button>
                <Button variant="ghost" onClick={() => { setFile(null); setDownloadUrl(null); }} className="w-full text-white/50 hover:text-white text-xs h-8">Edit another file</Button>
              </div>
            ) : (
              <Button disabled={!file} onClick={process} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                <FileText className="w-4 h-4" />Save Metadata
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
