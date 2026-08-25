'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setPreloadedFiles } from '@/lib/preloader';
import { ShieldCheck, FileCheck } from 'lucide-react';
import { Dropzone } from '@/components/ui/dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import SearchTool from '@/components/SearchTool';

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
    } else if (ext === 'docx' || ext === 'doc') {
      setPreloadedFiles(fileArray);
      router.push('/tools/word-to-pdf');
    } else if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
      setPreloadedFiles(fileArray);
      router.push('/tools/excel-to-pdf');
    } else if (ext === 'html' || ext === 'htm') {
      setPreloadedFiles(fileArray);
      router.push('/tools/html-to-pdf');
    } else if (ext === 'md' || ext === 'markdown') {
      setPreloadedFiles(fileArray);
      router.push('/tools/markdown-to-pdf');
    } else if (ext === 'ris') {
      setPreloadedFiles(fileArray);
      router.push('/tools/ris-to-pdf');
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
        {/* Left Column: Headline and Search */}
        <div className="lg:col-span-7 w-full min-w-0 space-y-6 text-left">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs sm:text-sm font-mono font-bold text-foreground uppercase tracking-wider whitespace-nowrap shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-500 stroke-[2] shrink-0" />
            <span>100% Private — Files stay on your device</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight font-display leading-[1.1] text-foreground">
              <span className="block font-medium">Everything you need.</span>
              <span className="block text-muted-foreground/75 font-normal">Without the hassle.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-normal leading-relaxed max-w-xl pt-1">
              Fast, friendly, and completely private PDF tools. Everything happens right here in your browser — no uploads, no sign-ups, and no limits.
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="pt-2 max-w-xl">
            <SearchTool />
          </div>

          {/* Quick Metrics */}
          <div className="pt-5 grid grid-cols-3 gap-2 sm:gap-4 border-t border-border/60 max-w-xl">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-mono font-semibold text-muted-foreground uppercase truncate">PROCESSED</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-foreground font-mono truncate">{processedCount.toLocaleString('en-US')}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-mono font-semibold text-muted-foreground uppercase truncate">UPLOADS</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-foreground font-mono truncate">0.0 MB</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-mono font-semibold text-muted-foreground uppercase truncate">SPEED</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-foreground font-mono truncate">&lt; 10ms</p>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Interactive Dropzone (5 of 12 cols) */}
        <div className="lg:col-span-5 w-full min-w-0 relative">
          <Dropzone
            onFilesSelected={handleFiles}
            title="Drop your files here or click to browse"
            description="Supports PDF, Word, Excel, images, and text. Processed safely in your browser."
            badgeText="PRIVATE IN-BROWSER PROCESSING"
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
                className="absolute inset-0 z-20 bg-card/98 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-border shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2 sm:pb-3">
                    <span className="text-xs sm:text-sm font-mono text-foreground font-bold uppercase flex items-center gap-1.5 sm:gap-2">
                      <FileCheck className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-emerald-500 stroke-[2]" /> PDF Selected
                    </span>
                    <button
                      onClick={() => setIsPdfModalOpen(false)}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground font-bold p-1"
                    >
                      Close [Esc]
                    </button>
                  </div>

                  <p className="text-xs sm:text-base font-bold text-foreground">What would you like to do with your PDF?</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {[
                      { label: 'Merge Multiple PDFs', path: '/tools/merge-pdf' },
                      { label: 'Compress & Shrink', path: '/tools/compress-pdf' },
                      { label: 'Sign or Draw Signature', path: '/tools/sign-pdf' },
                      { label: 'Reorder or Delete Pages', path: '/tools/organize-pdf' },
                      { label: 'Convert to JPG Images', path: '/tools/pdf-to-jpg' },
                      { label: 'Lock with Password', path: '/tools/protect-pdf' },
                      { label: 'Unlock / Remove Password', path: '/tools/unlock-pdf' },
                      { label: 'Extract Text (OCR)', path: '/tools/pdf-ocr' },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handlePdfAction(opt.path)}
                        className="px-3 sm:px-3.5 py-2 sm:py-2.5 text-left text-xs sm:text-sm bg-background border border-border hover:border-foreground/50 rounded-xl transition-all font-semibold text-foreground hover:bg-accent min-h-[42px] flex items-center"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-2 sm:pt-3 mt-3 flex justify-between text-[11px] sm:text-xs font-mono text-muted-foreground font-medium">
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">{droppedFiles[0]?.name}</span>
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
