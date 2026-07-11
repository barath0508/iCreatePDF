'use client';

import React, { useState, useRef } from 'react';
import { Stamp, Loader2, Download, Fingerprint, Copy, Check, ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Button } from '@/components/ui/button';

type Mode = 'certify' | 'verify';

async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function CertifyTool() {
  const [mode, setMode] = useState<Mode>('certify');

  // Certify state
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verify state
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyHash, setVerifyHash] = useState<string | null>(null);
  const [expectedHash, setExpectedHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const verifyInputRef = useRef<HTMLInputElement>(null);

  const resetCertify = () => { setFile(null); setHash(null); setDownloadUrl(null); setError(null); };

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null); setDownloadUrl(null); setHash(null);
    const f = uploadedFiles[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Only PDF documents are supported.'); return; }
    setFile(f);
  };

  const certify = async () => {
    if (!file) return;
    setIsProcessing(true); setError(null);
    try {
      const originalBytes = await file.arrayBuffer();
      const digest = await sha256Hex(originalBytes);
      setHash(digest);

      const timestamp = new Date().toISOString();
      const qrPayload = JSON.stringify({ tool: 'iCreatePDF Certify', sha256: digest, file: file.name, certifiedAt: timestamp });

      const QRCode = (await import('qrcode')).default;
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, qrPayload, { width: 260, margin: 1 });
      const qrDataUrl = qrCanvas.toDataURL('image/png');
      const qrBytes = await (await fetch(qrDataUrl)).arrayBuffer();

      const doc = await PDFDocument.load(originalBytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const fontMono = await doc.embedFont(StandardFonts.Courier);
      const qrImage = await doc.embedPng(qrBytes);

      const certPage = doc.addPage([595, 842]); // A4
      const { width, height } = certPage.getSize();
      let y = height - 90;

      certPage.drawText('Certificate of Integrity', { x: 60, y, size: 24, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
      y -= 34;
      certPage.drawText('Issued by iCreatePDF — a cryptographic fingerprint of the original document', { x: 60, y, size: 10, font, color: rgb(0.45, 0.45, 0.45) });
      y -= 60;

      const qrSize = 160;
      certPage.drawImage(qrImage, { x: 60, y: y - qrSize + 20, width: qrSize, height: qrSize });

      const infoX = 60 + qrSize + 30;
      let infoY = y + 20;
      const rows: [string, string][] = [
        ['Original file', file.name],
        ['File size', `${(file.size / 1024).toFixed(1)} KB`],
        ['Algorithm', 'SHA-256'],
        ['Certified at', timestamp],
      ];
      rows.forEach(([label, value]) => {
        certPage.drawText(label.toUpperCase(), { x: infoX, y: infoY, size: 8, font: fontBold, color: rgb(0.5, 0.5, 0.5) });
        certPage.drawText(value.slice(0, 60), { x: infoX, y: infoY - 13, size: 10, font, color: rgb(0.15, 0.15, 0.15) });
        infoY -= 34;
      });

      y = y - qrSize - 20;
      certPage.drawText('SHA-256 FINGERPRINT', { x: 60, y, size: 8, font: fontBold, color: rgb(0.5, 0.5, 0.5) });
      y -= 16;
      // Wrap the 64-char hex hash across two lines for readability
      certPage.drawText(digest.slice(0, 32), { x: 60, y, size: 10, font: fontMono, color: rgb(0.15, 0.15, 0.15) });
      y -= 14;
      certPage.drawText(digest.slice(32), { x: 60, y, size: 10, font: fontMono, color: rgb(0.15, 0.15, 0.15) });

      y -= 50;
      certPage.drawLine({ start: { x: 60, y }, end: { x: width - 60, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
      y -= 26;
      const note = [
        'This fingerprint was computed from the exact bytes of the original file before this certificate page',
        'was appended. To verify the document has not been altered, keep the original (uncertified) file and',
        'recompute its SHA-256 hash — it must match the fingerprint above. Use the Verify tab at iCreatePDF.com/certify-pdf.',
      ];
      note.forEach(line => { certPage.drawText(line, { x: 60, y, size: 8.5, font, color: rgb(0.5, 0.5, 0.5) }); y -= 13; });

      const bytes = await doc.save();
      setDownloadUrl(URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' })));
    } catch (err: any) {
      setError(err?.message || 'Failed to certify PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyFiles = async (uploadedFiles: FileList | File[]) => {
    const f = uploadedFiles[0];
    if (!f) return;
    setVerifyFile(f);
    setIsVerifying(true);
    try {
      const buf = await f.arrayBuffer();
      const digest = await sha256Hex(buf);
      setVerifyHash(digest);
    } finally {
      setIsVerifying(false);
    }
  };

  const copyHash = (value: string) => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const normalizedExpected = expectedHash.trim().toLowerCase().replace(/[^a-f0-9]/g, '');
  const matches = verifyHash && normalizedExpected.length === 64 ? verifyHash === normalizedExpected : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-foreground/5 border border-foreground/10 rounded-xl p-1 gap-1">
          <button onClick={() => setMode('certify')} className={`px-5 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'certify' ? 'bg-brand text-foreground' : 'text-foreground/50 hover:text-foreground'}`}>Certify a PDF</button>
          <button onClick={() => setMode('verify')} className={`px-5 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'verify' ? 'bg-brand text-foreground' : 'text-foreground/50 hover:text-foreground'}`}>Verify a Fingerprint</button>
        </div>
      </div>

      {mode === 'certify' ? (
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
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Stamp className="w-6 h-6 text-brand" /></div>
                <h3 className="text-xl font-display text-foreground mb-2">Upload a PDF to certify</h3>
                <p className="text-xs text-foreground/40">We'll compute a SHA-256 fingerprint and stamp a QR-coded certificate page.</p>
              </div>
            ) : (
              <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
                <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Fingerprint className="w-5 h-5 text-brand" /></div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetCertify} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
                </div>
                {hash && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-foreground/40 uppercase">SHA-256 Fingerprint (of the original file)</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono text-foreground/80 bg-background/40 border border-foreground/10 rounded-xl px-4 py-3 break-all">{hash}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyHash(hash)} className="shrink-0">{isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
          </div>

          <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
              <Stamp className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">PDF Certify</h3>
            </div>
            <p className="text-xs text-foreground/50 leading-relaxed">Appends a tamper-evident certificate page containing a SHA-256 fingerprint and a scannable QR code — a self-serve way to prove a document hasn't been altered since it was fingerprinted.</p>
            <div className="pt-4 border-t border-foreground/5">
              {isProcessing ? (
                <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Certifying...</Button>
              ) : downloadUrl ? (
                <div className="space-y-2">
                  <Button onClick={() => { const a = document.createElement('a'); a.href = downloadUrl; a.download = `certified-${file?.name}`; a.click(); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"><Download className="w-5 h-5" />Download Certified PDF</Button>
                  <Button variant="ghost" onClick={resetCertify} className="w-full text-foreground/50 hover:text-foreground text-xs h-8">Certify another file</Button>
                </div>
              ) : (
                <Button disabled={!file} onClick={certify} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${file ? 'bg-brand hover:bg-brand/90 text-foreground' : 'bg-foreground/5 text-foreground/30 cursor-not-allowed'}`}><Stamp className="w-4 h-4" />Certify PDF</Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {!verifyFile ? (
              <div onClick={() => verifyInputRef.current?.click()} className="cursor-pointer border border-dashed rounded-2xl p-12 transition-all text-center flex flex-col items-center justify-center min-h-[220px] border-foreground/10 bg-card/40 hover:border-foreground/20">
                <input type="file" ref={verifyInputRef} onChange={(e) => e.target.files && handleVerifyFiles(e.target.files)} accept=".pdf" className="hidden" />
                <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Fingerprint className="w-6 h-6 text-brand" /></div>
                <h3 className="text-xl font-display text-foreground mb-2">Upload the original file to verify</h3>
                <p className="text-xs text-foreground/40">Upload the exact file you have, then paste the fingerprint you want to check it against.</p>
              </div>
            ) : (
              <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
                <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                  <h4 className="text-base font-display text-foreground">{verifyFile.name}</h4>
                  <Button variant="ghost" size="sm" onClick={() => { setVerifyFile(null); setVerifyHash(null); setExpectedHash(''); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
                </div>
                {isVerifying ? (
                  <div className="flex items-center gap-2 text-sm text-foreground/50 py-4"><Loader2 className="w-4 h-4 animate-spin" />Computing fingerprint...</div>
                ) : verifyHash && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-foreground/40 uppercase">Computed SHA-256</label>
                    <code className="block text-xs font-mono text-foreground/80 bg-background/40 border border-foreground/10 rounded-xl px-4 py-3 break-all">{verifyHash}</code>
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground/40 uppercase">Expected fingerprint (paste hash from certificate/QR)</label>
                  <input type="text" value={expectedHash} onChange={(e) => setExpectedHash(e.target.value)} placeholder="e.g. 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" className="w-full bg-background/40 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs font-mono text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand" />
                </div>
                {matches !== null && (
                  <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${matches ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    {matches ? <ShieldCheck className="w-5 h-5 shrink-0" /> : <ShieldAlert className="w-5 h-5 shrink-0" />}
                    {matches ? 'Match — this file is byte-for-byte identical to the certified original.' : 'No match — this file differs from the certified original, or the hash was entered incorrectly.'}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
              <ShieldQuestion className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Verify Fingerprint</h3>
            </div>
            <p className="text-xs text-foreground/50 leading-relaxed">Scan the QR code on a certificate page with your phone (or open the embedded text) to get the expected fingerprint, then check it here against the file you were given.</p>
          </div>
        </div>
      )}
    </div>
  );
}
