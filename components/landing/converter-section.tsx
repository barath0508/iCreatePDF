'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileImage, Trash2, RotateCw, FileText, 
  Sliders, Loader2, Download, Layers, ShieldCheck, Zap
} from 'lucide-react';
import { generatePdf, PdfOptions } from '@/lib/pdf';
import { Button } from '@/components/ui/button';

interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number;
}

interface ConverterSectionProps {
  initialFormatFilter?: string;
}

export function ConverterSection({ initialFormatFilter }: ConverterSectionProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [options, setOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 'none',
    quality: 0.85,
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  const handleFiles = (files: FileList | File[]) => {
    setError(null);
    setDownloadUrl(null);

    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'bmp'];
    const addedImages: ImageFile[] = [];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      
      if (!validExtensions.includes(ext)) {
        setError(`Unsupported file format: .${ext}. Please upload JPG, PNG, WEBP, HEIC, or BMP.`);
        return;
      }

      if (images.length + addedImages.length >= 20) {
        setError('Maximum 20 images allowed at a time.');
        return;
      }

      addedImages.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        rotation: 0,
      });
    });

    if (addedImages.length > 0) {
      setImages((prev) => [...prev, ...addedImages]);
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
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
    setDownloadUrl(null);
  };

  const rotateImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
    setDownloadUrl(null);
  };

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItemIndex.current !== null &&
      dragOverItemIndex.current !== null &&
      dragItemIndex.current !== dragOverItemIndex.current
    ) {
      const updatedImages = [...images];
      const draggedItem = updatedImages.splice(dragItemIndex.current, 1)[0];
      updatedImages.splice(dragOverItemIndex.current, 0, draggedItem);
      setImages(updatedImages);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  const triggerConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    try {
      const rotatedImages = await Promise.all(
        images.map(async (img) => {
          if (img.rotation === 0) {
            return { file: img.file, id: img.id };
          }
          const rotatedBlob = await applyRotation(img.file, img.rotation);
          const rotatedFile = new File([rotatedBlob], img.file.name, {
            type: 'image/jpeg',
          });
          return { file: rotatedFile, id: img.id };
        })
      );

      const pdfBytes = await generatePdf(rotatedImages, options, (p) => {
        setProgress(Math.round(p));
      });

      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyRotation = (file: File, rotation: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        if (rotation === 90 || rotation === 270) {
          canvas.width = img.naturalHeight;
          canvas.height = img.naturalWidth;
        } else {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas rotation blob generation failed'));
        }, 'image/jpeg', 0.95);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load image for rotation'));
      };
      img.src = objectUrl;
    });
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `icreatepdf-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="convert" className="w-full py-16 bg-black relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {initialFormatFilter && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm flex items-center gap-2">
            <FileImage className="w-4 h-4 text-purple-400" />
            <span>Optimized for converting <strong>{initialFormatFilter.toUpperCase()} to PDF</strong>. All image formats are accepted.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Upload Grid Area */}
          <div className="lg:col-span-8 space-y-6">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer border border-dashed rounded-2xl p-12 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[260px] ${
                isDraggingOver
                  ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                  : 'border-white/10 bg-zinc-900/30 hover:border-white/20 hover:bg-zinc-900/40'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleSelectFiles}
                multiple
                accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.bmp"
                className="hidden"
              />
              
              <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              
              <h3 className="text-xl font-display text-white mb-2">
                Drag &amp; Drop files here or <span className="text-purple-400 hover:underline">browse</span>
              </h3>
              <p className="text-xs text-white/40 max-w-sm">
                Supports JPG, PNG, WEBP, HEIC, BMP. Maximum 20 images. Files processed entirely locally.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}

            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    Uploaded Files ({images.length} / 20)
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">Drag to reorder pages</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragEnter={() => handleDragEnter(idx)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className="relative bg-zinc-950 border border-white/5 rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-between cursor-move hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden">
                        <img
                          src={img.previewUrl}
                          alt=""
                          style={{ transform: `rotate(${img.rotation}deg)` }}
                          className="max-h-full max-w-full object-contain"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-white/70 rounded-full font-mono border border-white/10">
                          {idx + 1}
                        </span>
                      </div>

                      <div className="flex border-t border-white/5 bg-zinc-900/50 p-2 gap-1 justify-between">
                        <button
                          type="button"
                          onClick={() => rotateImage(img.id)}
                          className="p-1.5 hover:bg-white/5 hover:text-purple-400 rounded-lg text-white/40 transition-colors"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="p-1.5 hover:bg-red-950/20 hover:text-red-400 rounded-lg text-white/40 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Options Panel Card */}
          <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Sliders className="w-4 h-4 text-purple-400" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-white">Convert Options</h3>
            </div>

            {/* Page Size Option */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Page Size</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { value: 'a4', label: 'A4' },
                  { value: 'letter', label: 'Letter' },
                  { value: 'fit', label: 'Fit' },
                  { value: 'custom', label: 'Custom' },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    variant={options.pageSize === opt.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOptions((prev) => ({ ...prev, pageSize: opt.value as any }))}
                    className={`h-8 text-xs rounded-lg px-2 ${
                      options.pageSize === opt.value ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              
              {options.pageSize === 'custom' && (
                <div className="flex gap-2 pt-2 animate-fade-in">
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] text-white/40 block font-mono">Width (mm)</span>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={options.customWidth || 210}
                      onChange={(e) => setOptions((prev) => ({ ...prev, customWidth: parseInt(e.target.value) || 210 }))}
                      className="w-full h-8 px-2 bg-zinc-900 border border-white/10 text-white rounded text-xs font-mono"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] text-white/40 block font-mono">Height (mm)</span>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={options.customHeight || 297}
                      onChange={(e) => setOptions((prev) => ({ ...prev, customHeight: parseInt(e.target.value) || 297 }))}
                      className="w-full h-8 px-2 bg-zinc-900 border border-white/10 text-white rounded text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Margins */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Margins</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'none', label: 'None' },
                  { value: 'small', label: 'Small' },
                  { value: 'large', label: 'Large' },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    variant={options.margin === opt.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOptions((prev) => ({ ...prev, margin: opt.value as any }))}
                    className={`h-8 text-xs rounded-lg ${
                      options.margin === opt.value ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Orientation</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'portrait', label: 'Portrait' },
                  { value: 'landscape', label: 'Landscape' },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    variant={options.orientation === opt.value ? 'default' : 'outline'}
                    size="sm"
                    disabled={options.pageSize === 'fit'}
                    onClick={() => setOptions((prev) => ({ ...prev, orientation: opt.value as any }))}
                    className={`h-8 text-xs rounded-lg ${
                      options.orientation === opt.value ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Compression Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Image Quality</label>
                <span className="text-xs font-mono text-purple-400">
                  {Math.round(options.quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.05"
                value={options.quality}
                onChange={(e) => setOptions((prev) => ({ ...prev, quality: parseFloat(e.target.value) }))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/5">
              {isProcessing ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-white/60">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                      Compiling PDF...
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : downloadUrl ? (
                <div className="space-y-2">
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDownloadUrl(null)}
                    className="w-full text-white/50 hover:text-white text-xs h-8"
                  >
                    Reset and Add Files
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={images.length === 0}
                  onClick={triggerConvert}
                  className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                    images.length > 0
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Generate PDF
                </Button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
