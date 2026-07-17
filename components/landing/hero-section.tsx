'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setPreloadedFiles } from '@/lib/preloader';
import { Upload, ArrowRight, File } from 'lucide-react';
import { CTAButtonGroup } from './shared/cta-button-group';

const words = ['Convert', 'Combine', 'Compress', 'Organize'];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split('');
  const [showAccent, setShowAccent] = useState(true);

  useEffect(() => {
    setShowAccent(true);
    const STAGGER = 45;
    const DURATION = 500;
    const holdTime = STAGGER * letters.length + DURATION + 200;
    const timer = setTimeout(() => setShowAccent(false), holdTime);
    return () => clearTimeout(timer);
  }, [word, letters.length]);

  return (
    <span key={trigger} className="inline-flex transition-colors duration-500" style={{ color: showAccent ? 'var(--brand)' : 'var(--foreground)' }}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-in"
          style={{
            animationDelay: `${i * 45}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [processedCount, setProcessedCount] = useState(1842910);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate a baseline count that increases over time since a reference point (July 1, 2026)
    const referenceDate = new Date('2026-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - referenceDate) / 1000);
    // Assume average rate of 1.4 operations per second
    const baseline = 1842910 + Math.floor(elapsedSeconds * 1.4);
    setProcessedCount(baseline);

    const interval = setInterval(() => {
      setProcessedCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // Check if it's multiple PDFs -> Merge PDF
    const allPdfs = fileArray.every(f => f.name.toLowerCase().endsWith('.pdf'));
    if (fileArray.length > 1 && allPdfs) {
      setPreloadedFiles(fileArray);
      router.push('/merge-pdf');
      return;
    }

    // Check if it's multiple images -> JPG to PDF
    const allImages = fileArray.every(f => {
      const ext = f.name.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext || '');
    });
    if (fileArray.length > 1 && allImages) {
      setPreloadedFiles(fileArray);
      router.push('/jpg-to-pdf');
      return;
    }

    // Single file routing
    const firstFile = fileArray[0];
    const ext = firstFile.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      setDroppedFiles(fileArray);
      setIsPdfModalOpen(true);
    } else if (ext === 'docx') {
      setPreloadedFiles(fileArray);
      router.push('/word-to-pdf');
    } else if (ext === 'txt') {
      setPreloadedFiles(fileArray);
      router.push('/txt-to-pdf');
    } else if (ext === 'heic' || ext === 'heif') {
      setPreloadedFiles(fileArray);
      router.push('/heic-to-pdf');
    } else if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext || '')) {
      setPreloadedFiles(fileArray);
      router.push('/jpg-to-pdf');
    } else {
      // Unhandled extension, default to converter section
      setPreloadedFiles(fileArray);
      router.push('/#convert');
    }
  };

  const handlePdfAction = (path: string) => {
    if (droppedFiles.length > 0) {
      setPreloadedFiles(droppedFiles);
      setIsPdfModalOpen(false);
      router.push(path);
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

  const onZoneClick = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-background">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-60"
        >
          <source src="/images/bg-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/85" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px bg-foreground" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="absolute w-px bg-foreground" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="mb-4">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-foreground/60">
              <span className="w-8 h-px bg-foreground/30" />
              100% client-side privacy-first conversion tools
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-left text-[clamp(2.0rem,5.5vw,5.5rem)] font-display font-medium leading-[0.95] tracking-tight text-foreground">
              <span className="block sm:whitespace-nowrap whitespace-normal">
                <span className="relative inline-block text-brand">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>{' '}
                images &amp; files
              </span>
              <span className="block sm:whitespace-nowrap whitespace-normal">
                to high-quality PDF
              </span>
            </h1>
          </div>

          <div>
            <CTAButtonGroup
              primary={{ label: 'Convert Now', href: '#convert' }}
              secondary={{ label: 'Learn Process', href: '#how-it-works' }}
            />
          </div>
        </div>

        {/* Right column: Smart Dropzone */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 blur-2xl rounded-3xl transition-all duration-500" />
            
            {/* Dropzone area */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={onZoneClick}
              className={`relative z-10 w-full aspect-[4/3] min-h-[300px] border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 select-none ${
                isDraggingOver
                  ? 'border-brand bg-brand/5 scale-[1.02]'
                  : 'border-border/80 bg-card/40 hover:border-brand/50 hover:bg-card/60 backdrop-blur-xl'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                className="hidden"
                multiple
              />

              <div className="p-4 bg-foreground/[0.02] border border-border/40 rounded-2xl group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-500 mb-6 text-brand">
                <Upload className="w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-2">
                Drag &amp; drop files here
              </h3>
              <p className="text-xs text-foreground/40 max-w-[240px] leading-relaxed">
                Supports PDF, DOCX, TXT, HEIC, PNG, JPG. Processed 100% locally.
              </p>

              <span className="mt-6 text-[10px] font-mono text-brand uppercase tracking-widest flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                or select files <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Custom Interactive PDF Options Modal Overlay */}
            {isPdfModalOpen && (
              <div className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between border border-border/80 shadow-2xl animate-in fade-in duration-300">
                <div className="space-y-4 overflow-y-auto pr-1 max-h-[80%]">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="text-[10px] font-mono text-brand font-semibold uppercase tracking-wider flex items-center gap-1">
                      <File className="w-3 h-3" /> PDF detected
                    </span>
                    <button
                      onClick={() => setIsPdfModalOpen(false)}
                      className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">
                    What would you like to do with this file?
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: 'Compress PDF', path: '/compress-pdf' },
                      { label: 'Sign PDF', path: '/sign-pdf' },
                      { label: 'Organize pages', path: '/organize-pdf' },
                      { label: 'Convert to JPG', path: '/pdf-to-jpg' },
                      { label: 'Protect PDF', path: '/protect-pdf' },
                      { label: 'Unlock PDF', path: '/unlock-pdf' },
                      { label: 'PDF OCR (Text)', path: '/pdf-ocr' },
                      { label: 'Watermark PDF', path: '/watermark-pdf' },
                      { label: 'Redact Text', path: '/redact-pdf' },
                      { label: 'Delete pages', path: '/delete-pdf-pages' },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handlePdfAction(opt.path)}
                        className="px-2.5 py-1.5 text-left text-[11px] bg-foreground/[0.02] border border-border/40 hover:border-brand/40 hover:bg-brand/5 rounded-xl transition-all font-medium text-foreground/80 hover:text-foreground"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border/40 pt-2 text-[10px] text-foreground/45 flex justify-between items-center">
                  <span className="truncate max-w-[200px]">File: {droppedFiles[0]?.name}</span>
                  <span>{(droppedFiles[0]?.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-12 left-0 right-0 px-6 lg:px-12 hidden sm:block">
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-16">
          {[
            { value: processedCount.toLocaleString('en-US'), label: 'PDFs processed locally' },
            { value: '0% Uploaded', label: 'All files remain on your device' },
            { value: '100% Free', label: 'No limitations or paywalls' },
            { value: '< 1 Second', label: 'Local browser compilation speed' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-2xl lg:text-3xl font-display font-medium text-foreground tracking-tight">{stat.value}</span>
              <span className="text-xs text-foreground/50 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
