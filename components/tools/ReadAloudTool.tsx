'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, Loader2, Play, Pause, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WordToken {
  text: string;
  start: number;
  end: number;
}

function tokenize(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  const re = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    tokens.push({ text: match[0], start: match.index, end: match.index + match[0].length });
  }
  return tokens;
}

export function ReadAloudTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [pages, setPages] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>('');
  const [rate, setRate] = useState(1);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pageIndexRef = useRef(0);
  const autoAdvanceRef = useRef(true);

  useEffect(() => { pageIndexRef.current = pageIndex; }, [pageIndex]);
  useEffect(() => { autoAdvanceRef.current = autoAdvance; }, [autoAdvance]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setVoiceURI(prev => prev || v.find(x => x.lang.startsWith('en'))?.voiceURI || v[0].voiceURI);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    setError(null);
    const f = uploadedFiles[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Only PDF documents are supported.'); return; }

    setFile(f);
    setPages([]);
    setPageIndex(0);
    setIsExtracting(true);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

      const extracted: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ').replace(/\s+/g, ' ').trim();
        extracted.push(text || '(No readable text on this page.)');
      }
      setPages(extracted);
    } catch (err: any) {
      setError(err?.message || 'Failed to read text from PDF.');
    } finally {
      setIsExtracting(false);
    }
  };

  const speakPage = useCallback((index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const text = pages[index];
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    setCharIndex(0);

    utterance.onboundary = (e) => { if (e.name === 'word' || e.charIndex !== undefined) setCharIndex(e.charIndex); };
    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => {
      const next = pageIndexRef.current + 1;
      if (autoAdvanceRef.current && next < pages.length) {
        setPageIndex(next);
        speakPage(next);
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [pages, voices, voiceURI, rate]);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }
    speakPage(pageIndex);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCharIndex(0);
  };

  const goToPage = (index: number) => {
    if (index < 0 || index >= pages.length) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setPageIndex(index);
    setCharIndex(0);
  };

  const currentText = pages[pageIndex] || '';
  const tokens = tokenize(currentText);

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
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10"><Volume2 className="w-6 h-6 text-brand" /></div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF file</h3>
              <p className="text-xs text-foreground/40">Have any PDF read aloud using your browser's built-in voices — nothing leaves your device.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl"><Volume2 className="w-5 h-5 text-brand" /></div>
                  <div>
                    <h4 className="text-base font-display text-foreground">{file.name}</h4>
                    {pages.length > 0 && <p className="text-xs text-foreground/40">Page {pageIndex + 1} of {pages.length}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { handleStop(); setFile(null); setPages([]); }} className="text-xs text-foreground/40 hover:text-foreground">Change</Button>
              </div>

              {isExtracting ? (
                <div className="flex items-center gap-2 text-sm text-foreground/50 py-8 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />Reading text from PDF...
                </div>
              ) : (
                <>
                  <div className="bg-background/40 border border-foreground/10 rounded-xl p-5 h-64 overflow-y-auto text-sm leading-relaxed text-foreground/80">
                    {tokens.map((tok, i) => {
                      const active = isSpeaking && charIndex >= tok.start && charIndex < tok.end;
                      return (
                        <span key={i} className={active ? 'bg-brand/30 text-foreground rounded px-0.5' : ''}>{tok.text}{' '}</span>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Button variant="ghost" size="sm" disabled={pageIndex === 0} onClick={() => goToPage(pageIndex - 1)} className="text-xs">
                      <ChevronLeft className="w-4 h-4" />Prev Page
                    </Button>
                    <div className="flex items-center gap-2">
                      {!isSpeaking || isPaused ? (
                        <Button size="sm" onClick={handlePlay} disabled={!currentText} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-5">
                          <Play className="w-4 h-4 mr-1.5" />{isPaused ? 'Resume' : 'Play'}
                        </Button>
                      ) : (
                        <Button size="sm" onClick={handlePause} className="bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-xl px-5">
                          <Pause className="w-4 h-4 mr-1.5" />Pause
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={handleStop} disabled={!isSpeaking && !isPaused} className="text-xs">
                        <Square className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" disabled={pageIndex >= pages.length - 1} onClick={() => goToPage(pageIndex + 1)} className="text-xs">
                      Next Page<ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}
        </div>

        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Volume2 className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Read Aloud</h3>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">Uses your browser's built-in text-to-speech engine to read any PDF out loud — great for proofreading, multitasking, or accessibility. Runs 100% locally; no audio is ever uploaded.</p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Voice</label>
              <select
                value={voiceURI}
                onChange={(e) => setVoiceURI(e.target.value)}
                disabled={!voices.length}
                className="w-full bg-background/40 border border-foreground/10 rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-brand"
              >
                {voices.length === 0 && <option>Loading voices...</option>}
                {voices.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-foreground/40 uppercase">Speed &middot; {rate.toFixed(1)}x</label>
              <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-brand" />
            </div>
            <label className="flex items-center gap-2 text-xs text-foreground/60">
              <input type="checkbox" checked={autoAdvance} onChange={(e) => setAutoAdvance(e.target.checked)} className="accent-brand" />
              Auto-continue to next page
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
