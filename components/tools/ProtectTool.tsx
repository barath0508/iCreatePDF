'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Shield, Loader2, Download, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowNextActions } from '@/components/tools/shared/WorkflowNextActions';
import { MobileActionDock } from '@/components/tools/shared/MobileActionDock';
import { useClipboardFile } from '@/hooks/use-clipboard-file';

export function ProtectTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [protectedBlob, setProtectedBlob] = useState<Blob | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { getPreloadedFiles, hasPreloadedFiles } = require('@/lib/preloader');
    if (hasPreloadedFiles()) {
      handleFiles(getPreloadedFiles());
    }
  }, []);

  useClipboardFile({ onFilePasted: (files) => handleFiles(files) });

  // Power user shortcut: Ctrl+Enter to trigger protection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (file && password && password === confirmPassword && !isProcessing && !downloadUrl) {
          e.preventDefault();
          triggerProtect();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, password, confirmPassword, isProcessing, downloadUrl]);

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
      const { encryptPDF } = await import('@pdfsmaller/pdf-encrypt-lite');
      const encryptedBytes = await encryptPDF(new Uint8Array(buffer), password);

      const blob = new Blob([encryptedBytes as any], { type: 'application/pdf' });
      setProtectedBlob(blob);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Cache in IndexedDB
      const { addRecentFile } = require('@/lib/db');
      addRecentFile({
        name: `protected-${file?.name || 'document.pdf'}`,
        size: blob.size,
        toolName: 'Protect PDF',
        href: '/protect-pdf',
        downloadUrl: url,
        blob: blob,
      });
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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-10 pb-24 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDraggingOver(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer touch-manipulation border border-dashed rounded-2xl p-8 sm:p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] ${
                isDraggingOver
                  ? 'border-brand bg-brand/5'
                  : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                accept="application/pdf,.pdf"
                onClick={(e) => {
                e.stopPropagation();
                (e.target as HTMLInputElement).value = '';
              }}
              className="hidden"
              />
              <div className="p-3 sm:p-4 rounded-full bg-foreground/5 mb-3 sm:mb-4 border border-foreground/10">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
              </div>
              <h3 className="text-lg sm:text-xl font-display text-foreground mb-1 sm:mb-2">
                Select or drag a PDF file
              </h3>
              <p className="text-xs text-foreground/40">
                PDFs are encrypted 100% locally in your browser memory.
              </p>
            </div>
          ) : (
            <div className="p-5 sm:p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 sm:p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 truncate">
                    <h4 className="text-base sm:text-lg font-display text-foreground truncate">{file.name}</h4>
                    <p className="text-xs text-foreground/40">
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
                  className="text-xs text-foreground/40 hover:text-foreground shrink-0"
                >
                  Change File
                </Button>
              </div>

              {!downloadUrl && (
                <form
                  onSubmit={(e) => { e.preventDefault(); triggerProtect(); }}
                  toolname="protect_pdf"
                  tooldescription="Encrypt a PDF document with password security"
                  toolautosubmit="false"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-foreground/5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60">Set Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter strong password"
                      toolparamdescription="Password used to encrypt the PDF document"
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      toolparamdescription="Confirmation matching the encryption password"
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand"
                    />
                  </div>
                </form>
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel - Sticky on Desktop */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit bg-card border border-foreground/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Key className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Protect PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Encrypt your PDF files with a secure password to prevent unauthorized viewing, copying, or printing. Done completely in browser memory.
          </p>

          <div className="pt-3 border-t border-foreground/5">
            {isProcessing ? (
              <Button disabled className="w-full bg-primary/50 text-primary-foreground font-bold font-medium py-6 rounded-xl flex items-center justify-center gap-2">
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
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
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
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold'
                    : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Encrypt PDF</span>
                <kbd className="hidden sm:inline-block ml-1 rounded border border-foreground/20 bg-background/50 px-1 py-0.5 text-[10px] font-mono text-muted-foreground">
                  ↵
                </kbd>
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Sticky Action Dock */}
      <MobileActionDock
        visible={!!file}
        statusText={
          downloadUrl
            ? 'Encrypted PDF ready!'
            : isProcessing
            ? 'Encrypting PDF...'
            : !password
            ? 'Set password to protect'
            : password !== confirmPassword
            ? 'Passwords must match'
            : 'Password ready'
        }
        secondaryAction={
          file && !isProcessing && !downloadUrl
            ? {
                label: 'Change',
                onClick: () => {
                  setFile(null);
                  setDownloadUrl(null);
                  setPassword('');
                  setConfirmPassword('');
                },
              }
            : undefined
        }
        primaryAction={
          downloadUrl
            ? {
                label: 'Download Protected PDF',
                onClick: handleDownload,
                icon: <Download className="w-4 h-4" />,
                className: 'bg-emerald-600 hover:bg-emerald-700 text-white',
              }
            : {
                label: 'Encrypt PDF',
                onClick: triggerProtect,
                disabled: !file || !password || password !== confirmPassword,
                loading: isProcessing,
                icon: <Shield className="w-4 h-4" />,
              }
        }
      />

      {downloadUrl && (
        <WorkflowNextActions
          currentTool="protect-pdf"
          fileBlob={protectedBlob}
          fileName={`protected-${file?.name || 'document.pdf'}`}
        />
      )}
    </div>
  );
}
