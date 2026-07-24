'use client';

import React, { useState, useRef } from 'react';
import { Accessibility, Loader2, Download, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { PDFDocument, PDFName, PDFString, PDFBool, PDFDict } from 'pdf-lib';
import { Button } from '@/components/ui/button';

type CheckStatus = 'pass' | 'fail' | 'na';

interface Check {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
}

export function AccessibilityCheckerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [isFixing, setIsFixing] = useState(false);
  const [fixedUrl, setFixedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setChecks(null); setFixedUrl(null);
    const f = uploadedFiles[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Only PDF documents are supported.'); return; }
    setFile(f);
  };

  const runCheck = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null); setFixedUrl(null);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const results: Check[] = [];

      const title = doc.getTitle();
      results.push({
        id: 'title',
        label: 'Document Title',
        status: title && title.trim().length > 0 ? 'pass' : 'fail',
        detail: title && title.trim().length > 0
          ? `Screen readers will announce "${title}".`
          : 'No title is set — screen readers fall back to the filename. Fix it with our free Metadata Editor.',
      });

      const lang = doc.catalog.get(PDFName.of('Lang'));
      const langOk = lang instanceof PDFString && lang.asString().trim().length > 0;
      results.push({
        id: 'lang',
        label: 'Document Language Declared',
        status: langOk ? 'pass' : 'fail',
        detail: langOk
          ? `Language is set to "${(lang as PDFString).asString()}".`
          : 'No /Lang entry in the document catalog — assistive tech cannot auto-select the correct pronunciation and voice.',
      });

      let tagged = false;
      const markInfo = doc.catalog.lookupMaybe(PDFName.of('MarkInfo'), PDFDict);
      if (markInfo) {
        const marked = markInfo.get(PDFName.of('Marked'));
        tagged = marked instanceof PDFBool ? marked.asBoolean() : false;
      }
      results.push({
        id: 'tagged',
        label: 'Tagged for Screen Readers',
        status: tagged ? 'pass' : 'fail',
        detail: tagged
          ? 'Document declares a tagged structure tree.'
          : 'Document is not tagged — screen readers cannot reliably determine reading order, headings, or image alt text.',
      });

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const pdfjsDoc = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
      const emptyPages: number[] = [];
      for (let i = 1; i <= pdfjsDoc.numPages; i++) {
        const page = await pdfjsDoc.getPage(i);
        const textContent = await page.getTextContent();
        const charCount = textContent.items.reduce((sum: number, it: any) => sum + (it.str?.trim().length || 0), 0);
        if (charCount === 0) emptyPages.push(i);
      }
      results.push({
        id: 'textlayer',
        label: 'Text Layer on Every Page',
        status: emptyPages.length === 0 ? 'pass' : 'fail',
        detail: emptyPages.length === 0
          ? 'Every page has a real, selectable text layer.'
          : `Page${emptyPages.length > 1 ? 's' : ''} ${emptyPages.join(', ')} appear to be scanned images with no text — completely inaccessible to screen readers. Run OCR before publishing.`,
      });

      try {
        const form = doc.getForm();
        const fields = form.getFields();
        if (fields.length === 0) {
          results.push({ id: 'formlabels', label: 'Form Field Labels', status: 'na', detail: 'This document has no fillable form fields.' });
        } else {
          const unlabeled = fields.filter(f => !f.acroField.dict.get(PDFName.of('TU')));
          results.push({
            id: 'formlabels',
            label: 'Form Field Labels',
            status: unlabeled.length === 0 ? 'pass' : 'fail',
            detail: unlabeled.length === 0
              ? `All ${fields.length} form field(s) have an accessible tooltip label.`
              : `${unlabeled.length} of ${fields.length} form field(s) have no tooltip (/TU) label for screen readers.`,
          });
        }
      } catch {
        results.push({ id: 'formlabels', label: 'Form Field Labels', status: 'na', detail: 'This document has no fillable form fields.' });
      }

      setChecks(results);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const fixLanguage = async () => {
    if (!file) return;
    setIsFixing(true);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      doc.catalog.set(PDFName.of('Lang'), PDFString.of('en-US'));
      const bytes = await doc.save();
      setFixedUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Failed to apply fix.');
    } finally {
      setIsFixing(false);
    }
  };

  const passCount = checks?.filter(c => c.status === 'pass').length ?? 0;
  const applicable = checks?.filter(c => c.status !== 'na').length ?? 0;
  const langCheck = checks?.find(c => c.id === 'lang');

  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    if (status === 'pass') return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
    if (status === 'fail') return <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
    return <MinusCircle className="w-5 h-5 text-foreground/25 shrink-0" />;
  };

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
              className={`cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] ${isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'}`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Accessibility className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Upload a PDF to audit</h3>
              <p className="text-xs text-foreground/40">Checks tagging, language, text layer, and form labels for screen-reader compatibility.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Accessibility className="w-5 h-5 text-brand" /></div>
                  <h4 className="text-base font-display text-foreground">{file.name}</h4>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setChecks(null); setFixedUrl(null); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
              </div>

              {checks && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-mono text-foreground/40 uppercase">Results</span>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${passCount === applicable ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>{passCount}/{applicable} Passed</span>
                  </div>
                  {checks.map(c => (
                    <div key={c.id} className={`p-4 rounded-xl border flex items-start gap-3 ${c.status === 'fail' ? 'bg-red-500/5 border-red-500/10' : c.status === 'pass' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-foreground/[0.02] border-foreground/5'}`}>
                      <StatusIcon status={c.status} />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">{c.label}</p>
                        <p className="text-xs text-foreground/50 leading-relaxed">{c.detail}</p>
                      </div>
                    </div>
                  ))}

                  {langCheck?.status === 'fail' && (
                    <div className="pt-2">
                      {fixedUrl ? (
                        <Button onClick={() => { const a = document.createElement('a'); a.href = fixedUrl; a.download = `lang-fixed-${file.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-5 rounded-xl flex items-center justify-center gap-2 text-sm">
                          <Download className="w-4 h-4" />Download with Language Fixed
                        </Button>
                      ) : (
                        <Button onClick={fixLanguage} disabled={isFixing} variant="ghost" className="w-full border border-foreground/10 text-foreground/70 hover:text-foreground py-5 rounded-xl text-sm">
                          {isFixing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Quick Fix: Set Language to English (en-US)
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Accessibility className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Accessibility Checker</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Audits your PDF against common screen-reader and WCAG-adjacent requirements: tagging, declared language, real text layers, and labeled form fields — all analyzed locally.</p>
          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</Button>
            ) : (
              <Button disabled={!file} onClick={runCheck} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}><Accessibility className="w-4 h-4" />Run Accessibility Check</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
