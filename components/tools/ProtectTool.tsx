'use client';

import React, { useState, useRef } from 'react';
import { Upload, Shield, Loader2, Download, Key } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function ProtectTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setError('Only PDF documents are supported.');
      return;
    }

    setFile(uploadedFile);
  };

  const triggerProtect = async () => {
    if (!file || !password) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      
      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: Math.random().toString(36).substring(7),
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
        },
      });

      const encryptedBytes = await pdfDoc.save();
      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to encrypt PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `protected-${file?.name}`;
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
                  ? 'border-purple-500 bg-purple-500/5'
                  : 'border-white/10 bg-zinc-900/30 hover:border-white/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept=".pdf"
                className="hidden"
              />
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-display text-white mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-white/40">
                PDFs are encrypted 100% locally in your browser memory.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display text-white">{file.name}</h4>
                    <p className="text-xs text-white/40">
                      PDF Document • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="text-xs text-white/40 hover:text-white"
                >
                  Change File
                </Button>
              </div>

              {!downloadUrl && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/60">Set Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter strong password"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/60">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
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
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Key className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Protect PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Encrypt your PDF files with a secure password to prevent unauthorized viewing, copying, or printing. Done completely in browser memory.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-purple-600/50 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Encrypting...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Protected PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Protect new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file || !password || password !== confirmPassword}
                onClick={triggerProtect}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file && password && password === confirmPassword
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <Shield className="w-4 h-4" />
                Encrypt PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
