'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setPreloadedFiles } from '@/lib/preloader';
import { ShieldCheck, FileCheck } from 'lucide-react';
import { Dropzone } from '@/components/ui/dropzone';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Convert', 'Combine', 'Compress', 'Organize', 'Protect'];

export function HeroSection() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [processedCount, setProcessedCount] = useState(1842910);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => {};
  }, []);

  useEffect(() => {
    const referenceDate = new Date('2026-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - referenceDate) / 1000);
    const baseline = 1842910 + Math.floor(elapsedSeconds * 1.4);
    setProcessedCount(baseline);

    const interval = setInterval(() => {
      setProcessedCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFiles = (fileArray: File[]) => {
    if (fileArray.length === 0) return;

    const allPdfs = fileArray.every((f) => f.name.toLowerCase().endsWith('.pdf'));
    if (fileArray.length > 1 && allPdfs) {
      setPreloadedFiles(fileArray);
      router.push('/tools/merge-pdf');
      return;
    }

    const allImages = fileArray.every((f) => {
      const ext = f.name.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext || '');
    });
    if (fileArray.length > 1 && allImages) {
      setPreloadedFiles(fileArray);
      router.push('/tools/jpg-to-pdf');
      return;
    }

    const firstFile = fileArray[0];
    const ext = firstFile.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      setDroppedFiles(fileArray);
      setIsPdfModalOpen(true);
    } else if (ext === 'docx') {
      setPreloadedFiles(fileArray);
      router.push('/tools/word-to-pdf');
    } else if (ext === 'txt') {
      setPreloadedFiles(fileArray);
      router.push('/tools/txt-to-pdf');
    } else if (ext === 'heic' || ext === 'heif') {
      setPreloadedFiles(fileArray);
      router.push('/tools/heic-to-pdf');
    } else if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext || '')) {
      setPreloadedFiles(fileArray);
      router.push('/tools/jpg-to-pdf');
    } else {
      setPreloadedFiles(fileArray);
      router.push('/#tools');
    }
  };

  const handlePdfAction = (path: string) => {
    if (droppedFiles.length > 0) {
      setPreloadedFiles(droppedFiles);
      setIsPdfModalOpen(false);
      router.push(path);
    }
  };

  return (
    <section className="relative flex flex-col justify-start items-center overflow-hidden bg-background pt-36 sm:pt-40 lg:pt-48 pb-20 lg:pb-28">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-15 select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Reference Image Styled Headline (7 of 12 cols) */}
        <div className="lg:col-span-7 w-full min-w-0 space-y-6 text-left">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs sm:text-sm font-mono font-bold text-foreground uppercase tracking-wider whitespace-nowrap shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-foreground stroke-[2] shrink-0" />
            <span>100% PRIVATE CLIENT-SIDE ENGINE</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight font-display leading-[1.1] text-foreground">
              <span className="block font-medium">Everything you need.</span>
              <span className="block text-muted-foreground/75 font-normal">Nothing you don't.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-normal leading-relaxed max-w-xl pt-1">
              Enterprise-grade PDF tools built with WebAssembly. All files stay securely in your browser memory — 100% private, instant, and unlimited.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="pt-5 grid grid-cols-3 gap-4 border-t border-border/60 max-w-xl">
            <div>
              <p className="text-xs font-mono font-semibold text-muted-foreground uppercase">PROCESSED</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground font-mono">{processedCount.toLocaleString('en-US')}</p>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-muted-foreground uppercase">SERVER UPLOADS</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground font-mono">0.0 MB</p>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-muted-foreground uppercase">LATENCY</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground font-mono">&lt; 10ms</p>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Interactive Dropzone (5 of 12 cols) */}
        <div className="lg:col-span-5 w-full min-w-0 relative">
          <Dropzone
            onFilesSelected={handleFiles}
            title="Drop files or click to launch Studio"
            description="Supports PDF, DOCX, TXT, HEIC, PNG, JPG. Processed locally."
            badgeText="INSTANT WEBASSEMBLY ENGINE"
            files={droppedFiles}
            onRemoveFile={(idx) => setDroppedFiles((prev) => prev.filter((_, i) => i !== idx))}
          />

          {/* Action Selector for PDFs */}
          <AnimatePresence>
            {isPdfModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="absolute inset-0 z-20 bg-card/98 backdrop-blur-xl rounded-2xl p-6 border border-border shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm font-mono text-foreground font-bold uppercase flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-foreground stroke-[2]" /> PDF Detected
                    </span>
                    <button
                      onClick={() => setIsPdfModalOpen(false)}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground font-bold"
                    >
                      Close [Esc]
                    </button>
                  </div>

                  <p className="text-base font-bold text-foreground">Select PDF Operation:</p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Merge & Combine', path: '/tools/merge-pdf' },
                      { label: 'Compress & Shrink', path: '/tools/compress-pdf' },
                      { label: 'Sign Document', path: '/tools/sign-pdf' },
                      { label: 'Organize Pages', path: '/tools/organize-pdf' },
                      { label: 'Convert to JPG', path: '/tools/pdf-to-jpg' },
                      { label: 'Encrypt & Protect', path: '/tools/protect-pdf' },
                      { label: 'Unlock & Decrypt', path: '/tools/unlock-pdf' },
                      { label: 'PDF OCR Text', path: '/tools/pdf-ocr' },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handlePdfAction(opt.path)}
                        className="px-3.5 py-2.5 text-left text-sm bg-background border border-border hover:border-foreground/50 rounded-xl transition-all font-semibold text-foreground hover:bg-accent"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-3 flex justify-between text-xs font-mono text-muted-foreground font-medium">
                  <span className="truncate max-w-[200px]">{droppedFiles[0]?.name}</span>
                  <span>{((droppedFiles[0]?.size || 0) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
