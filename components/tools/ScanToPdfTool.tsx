'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Trash2, Download, Loader2, Play, Square, Image, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePdf, PdfOptions } from '@/lib/pdf';

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  file: File;
}

export function ScanToPdfTool() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [autoCrop, setAutoCrop] = useState(true);
  const [forcePortrait, setForcePortrait] = useState(true);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [pdfOptions] = useState<PdfOptions>({
    pageSize: 'fit',
    orientation: 'portrait',
    margin: 'none',
    quality: 0.8,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // List available video devices
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
        const videoDevices = deviceInfos.filter(d => d.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      }).catch(err => {
        console.error('Error enumerating devices:', err);
      });
    }
  }, []);

  const startCamera = async () => {
    setError(null);
    setDownloadUrl(null);
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: selectedDeviceId 
          ? { deviceId: { exact: selectedDeviceId } } 
          : { facingMode: facingMode }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Could not access camera. Please ensure permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedDeviceId, facingMode]);

  const performAutoCrop = (srcCanvas: HTMLCanvasElement): HTMLCanvasElement => {
    const ctx = srcCanvas.getContext('2d');
    if (!ctx) return srcCanvas;

    const w = srcCanvas.width;
    const h = srcCanvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Corner samples to find background color
    const getPixel = (x: number, y: number) => {
      const idx = (y * w + x) * 4;
      return { r: data[idx], g: data[idx+1], b: data[idx+2] };
    };

    const corners = [
      getPixel(0, 0),
      getPixel(w - 1, 0),
      getPixel(0, h - 1),
      getPixel(w - 1, h - 1)
    ];

    const avgBg = {
      r: corners.reduce((sum, p) => sum + p.r, 0) / 4,
      g: corners.reduce((sum, p) => sum + p.g, 0) / 4,
      b: corners.reduce((sum, p) => sum + p.b, 0) / 4
    };

    let minX = w, maxX = 0, minY = h, maxY = 0;
    const threshold = 35; // sensitivity threshold
    const step = 6; // pixel skip step for performance

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];

        const diff = Math.sqrt(
          Math.pow(r - avgBg.r, 2) +
          Math.pow(g - avgBg.g, 2) +
          Math.pow(b - avgBg.b, 2)
        );

        if (diff > threshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Safety padding
    const padding = 15;
    minX = Math.max(0, minX - padding);
    maxX = Math.min(w - 1, maxX + padding);
    minY = Math.max(0, minY - padding);
    maxY = Math.min(h - 1, maxY + padding);

    // Bounding validation (must be at least 15% width and height)
    if (maxX <= minX || maxY <= minY || (maxX - minX < w * 0.15) || (maxY - minY < h * 0.15)) {
      return srcCanvas; // return original if crop area is too small or invalid
    }

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = maxX - minX;
    croppedCanvas.height = maxY - minY;
    const croppedCtx = croppedCanvas.getContext('2d');
    if (croppedCtx) {
      croppedCtx.drawImage(srcCanvas, minX, minY, croppedCanvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);
      return croppedCanvas;
    }
    return srcCanvas;
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use higher resolution from video track
    const track = stream?.getVideoTracks()[0];
    const settings = track?.getSettings();
    
    const width = settings?.width || video.videoWidth;
    const height = settings?.height || video.videoHeight;
    
    const shouldRotate = forcePortrait && width > height;

    if (shouldRotate) {
      canvas.width = height;
      canvas.height = width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2); // 90 degrees
      ctx.drawImage(video, -width / 2, -height / 2, width, height);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    } else {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(video, 0, 0, width, height);
    }

    // Perform Auto Crop if requested
    let targetCanvas = canvas;
    if (autoCrop) {
      targetCanvas = performAutoCrop(canvas);
    }

    // Get Data URL
    const dataUrl = targetCanvas.toDataURL('image/jpeg', 0.9);

    // Convert data URL to File object
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `scan-${Date.now()}.jpg`, { type: 'image/jpeg' });
        const newPhoto: CapturedPhoto = {
          id: Math.random().toString(36).substring(7),
          dataUrl,
          file,
        };
        setCapturedPhotos(prev => [...prev, newPhoto]);
      });
  };

  const deletePhoto = (id: string) => {
    setCapturedPhotos(prev => prev.filter(p => p.id !== id));
    setDownloadUrl(null);
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const triggerGeneratePdf = async () => {
    if (capturedPhotos.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    stopCamera();

    try {
      const items = capturedPhotos.map(p => ({
        file: p.file,
        id: p.id,
      }));

      const pdfBytes = await generatePdf(items, pdfOptions, (p) => setProgress(Math.round(p)));
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to generate PDF from scans.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `scanned-doc-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <canvas ref={canvasRef} className="hidden" />

          {/* Camera Viewer / Status */}
          <div className="relative border border-foreground/10 rounded-2xl overflow-hidden bg-card/40 min-h-[350px] flex items-center justify-center">
            {isCameraActive ? (
              <div className="relative w-full aspect-video md:aspect-[4/3] bg-background">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />
                
                {/* Overlay controls inside camera */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-6">
                  {devices.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFacingMode}
                      className="rounded-full border-foreground/20 bg-background/60 backdrop-blur text-foreground hover:bg-background/80"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}

                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full border-4 border-foreground bg-red-600 active:bg-red-800 transition-colors shadow-2xl flex items-center justify-center focus:outline-none"
                    aria-label="Capture Photo"
                  >
                    <div className="w-8 h-8 rounded-full bg-foreground opacity-40 hover:opacity-100 transition-opacity" />
                  </button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={stopCamera}
                    className="rounded-full border-foreground/20 bg-background/60 backdrop-blur text-foreground hover:bg-background/80"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-full bg-foreground/5 border border-foreground/10 text-brand">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display text-foreground">Scan documents with camera</h3>
                <p className="text-xs text-foreground/40 max-w-sm">
                  Turn your device camera into a portable document scanner. Capture multiple pages and compile them into a PDF locally.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button
                    onClick={startCamera}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-6 py-5 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Scan Session
                  </Button>

                  {devices.length > 1 && (
                    <select
                      value={selectedDeviceId}
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                      className="h-10 px-3 bg-card/80 border border-foreground/10 text-foreground text-xs rounded-xl focus:outline-none"
                    >
                      {devices.map((device, i) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          Camera {i + 1} ({device.label ? device.label.slice(0, 15) : 'Video Input'})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Captured Photos Grid */}
          {capturedPhotos.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
                  Scanned Pages Queue ({capturedPhotos.length})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCapturedPhotos([]);
                    setDownloadUrl(null);
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {capturedPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative bg-card border border-foreground/5 rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-between group"
                  >
                    <div className="relative flex-1 bg-background/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={photo.dataUrl}
                        alt={`Page ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-background/85 text-[10px] text-foreground/70 rounded-full font-mono border border-foreground/10">
                        Page {index + 1}
                      </span>
                    </div>

                    <div className="flex border-t border-foreground/5 bg-card/60 p-2 justify-end">
                      <button
                        type="button"
                        onClick={() => deletePhoto(photo.id)}
                        className="p-1 hover:bg-red-950/20 text-foreground/40 hover:text-red-400 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <Camera className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">Scan to PDF</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Snap pages sequentially using your camera. When finished scanning, compile the images into a clean, combined PDF document instantly.
          </p>

          <div className="space-y-3 pt-4 border-t border-foreground/5 text-xs">
            <h4 className="font-mono uppercase tracking-wider text-brand text-[10px]">Scanning Options</h4>
            
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-foreground/5 border border-foreground/5">
              <label htmlFor="auto-crop-check" className="text-foreground/70 font-mono cursor-pointer select-none">
                Auto-Crop Scans
              </label>
              <input
                type="checkbox"
                id="auto-crop-check"
                checked={autoCrop}
                onChange={(e) => setAutoCrop(e.target.checked)}
                className="w-4 h-4 accent-brand cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-foreground/5 border border-foreground/5">
              <label htmlFor="force-portrait-check" className="text-foreground/70 font-mono cursor-pointer select-none">
                Force Portrait Mode
              </label>
              <input
                type="checkbox"
                id="force-portrait-check"
                checked={forcePortrait}
                onChange={(e) => setForcePortrait(e.target.checked)}
                className="w-4 h-4 accent-brand cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-foreground/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                    Generating PDF...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : downloadUrl ? (
              <div className="space-y-2">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Scanned PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCapturedPhotos([]);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-foreground/50 hover:text-foreground text-xs h-8"
                >
                  Start New Session
                </Button>
              </div>
            ) : (
              <Button
                disabled={capturedPhotos.length === 0}
                onClick={triggerGeneratePdf}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  capturedPhotos.length > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : 'bg-foreground/5 text-muted-foreground/60 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Compile Scanned PDF
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
