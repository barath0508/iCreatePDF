'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Layers, Volume2, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PdfToAudioTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
        if (available.length > 0 && !selectedVoice) {
          setSelectedVoice(available[0].name);
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleFiles = async (uploadedFiles: FileList | File[]) => {
    const uploadedFile = uploadedFiles[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are supported.');
      return;
    }

    try {
      const buffer = await uploadedFile.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;

      let extracted = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        extracted += ` ${pageText}`;
      }

      setFile(uploadedFile);
      setText(extracted.trim());
      toast.success(`Extracted text from ${uploadedFile.name}! Ready for Speech Synthesis.`);
    } catch {
      toast.error('Failed to extract text from PDF.');
    }
  };

  const handlePlayPause = () => {
    if (!synthRef.current || !text) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
    } else {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 3000)); // Read first 3000 chars
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
      utterance.rate = rate;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current.speak(utterance);
      setIsPlaying(true);
      toast.info('Started speech narration');
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex-1 flex flex-col items-center justify-center min-h-[220px] ${
                isDraggingOver ? 'border-brand bg-brand/5' : 'border-foreground/10 bg-card/40 hover:border-foreground/20'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} accept=".pdf" className="hidden" />
              <div className="p-4 rounded-full bg-foreground/5 mb-4 border border-foreground/10">
                <Volume2 className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">Select or drag a PDF for Text-to-Speech Narration</h3>
              <p className="text-xs text-foreground/40">Listen to PDF text using browser speech synthesis voices hands-free.</p>
            </div>
          ) : (
            <div className="p-6 bg-card border border-foreground/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-display text-foreground">{file.name}</h4>
                  <p className="text-xs text-foreground/40">{text.split(/\s+/).length} words extracted</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { handleStop(); setFile(null); setText(''); }} className="text-xs text-foreground/40 hover:text-foreground">Change File</Button>
              </div>

              <div className="max-h-60 overflow-y-auto p-4 rounded-xl bg-background border border-border/60 text-xs font-mono leading-relaxed text-muted-foreground">
                {text || 'No text content detected in PDF.'}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 h-full bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Layers className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Speech Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-foreground/60 block mb-1.5">Select Voice:</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-2.5 bg-background border border-border rounded-xl text-xs font-sans text-foreground focus:outline-none"
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-foreground/60 mb-1.5">
                <span>Speed Rate:</span>
                <span className="font-bold text-foreground">{rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.25"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-foreground"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5 space-y-2">
            <Button disabled={!text} onClick={handlePlayPause} className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${text ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'}`}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Speech' : 'Play Narration'}
            </Button>
            {isPlaying && (
              <Button variant="ghost" onClick={handleStop} className="w-full text-red-400 hover:text-red-300 text-xs h-8 flex items-center justify-center gap-1">
                <Square className="w-3 h-3 fill-current" /> Stop Speech
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
