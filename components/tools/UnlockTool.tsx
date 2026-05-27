'use client';

import React, { useState, useRef } from 'react';
import { Upload, Layers, Loader2, Download, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UnlockTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);
    setIsEncrypted(false);
    
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      
      // Try to load. If it requires a password, it will throw an error
      try {
        await PDFDocument.load(arrayBuffer);
        setIsEncrypted(false);
        setError('This PDF is not password protected. No decryption needed.');
      } catch (err: any) {
        // If it throws password error
        setIsEncrypted(true);
        setFile(uploadedFile);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to read PDF file: ${uploadedFile.name}`);
    }
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

  const triggerUnlock = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      
      setProgress(40);
      
      // Load with password
      const pdfDoc = await PDFDocument.load(buffer, { password });
      
      setProgress(70);
      
      // Save doc (saving loaded document strips encryption)
      const unlockedBytes = await pdfDoc.save();
      
      const blob = new Blob([unlockedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError('Failed to decrypt. Please verify the password and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `unlocked-${file?.name}`;
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
                Select or drag a protected PDF file
              </h3>
              <p className="text-xs text-white/40">
                Decryption runs 100% locally inside browser sandbox memory.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-white">{file.name}</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    ✓ Protected PDF Loaded
                  </p>
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

              {isEncrypted && !downloadUrl && (
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Document Password"
                    className="w-full h-10 px-3 bg-zinc-900 border border-white/10 text-white rounded-lg text-sm"
                  />
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
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Unlock PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Remove password encryption from your PDF document. The correct password must be entered to compile an unlocked copy.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    Unlocking...
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
                  <Unlock className="w-5 h-5" />
                  Download Unlocked PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                    setPassword('');
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Unlock new file
                </Button>
              </div>
            ) : (
              <Button
                disabled={!file || !password}
                onClick={triggerUnlock}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  file && password ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <Unlock className="w-4 h-4" />
                Unlock PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
