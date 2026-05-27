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
    
    canvas.width = width;
    canvas.height = height;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Get Data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

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
          <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-zinc-950/40 min-h-[350px] flex items-center justify-center">
            {isCameraActive ? (
              <div className="relative w-full aspect-video md:aspect-[4/3] bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                
                {/* Overlay controls inside camera */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-6">
                  {devices.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFacingMode}
                      className="rounded-full border-white/20 bg-black/60 backdrop-blur text-white hover:bg-black/80"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}

                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full border-4 border-white bg-red-600 active:bg-red-800 transition-colors shadow-2xl flex items-center justify-center focus:outline-none"
                    aria-label="Capture Photo"
                  >
                    <div className="w-8 h-8 rounded-full bg-white opacity-40 hover:opacity-100 transition-opacity" />
                  </button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={stopCamera}
                    className="rounded-full border-white/20 bg-black/60 backdrop-blur text-white hover:bg-black/80"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-purple-400">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display text-white">Scan documents with camera</h3>
                <p className="text-xs text-white/40 max-w-sm">
                  Turn your device camera into a portable document scanner. Capture multiple pages and compile them into a PDF locally.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button
                    onClick={startCamera}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-5 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Scan Session
                  </Button>

                  {devices.length > 1 && (
                    <select
                      value={selectedDeviceId}
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                      className="h-10 px-3 bg-zinc-900 border border-white/10 text-white text-xs rounded-xl focus:outline-none"
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
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
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
                    className="relative bg-zinc-950 border border-white/5 rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-between group"
                  >
                    <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={photo.dataUrl}
                        alt={`Page ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 text-[10px] text-white/70 rounded-full font-mono border border-white/10">
                        Page {index + 1}
                      </span>
                    </div>

                    <div className="flex border-t border-white/5 bg-zinc-900/50 p-2 justify-end">
                      <button
                        type="button"
                        onClick={() => deletePhoto(photo.id)}
                        className="p-1 hover:bg-red-950/20 text-white/40 hover:text-red-400 rounded transition-colors"
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
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Camera className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white">Scan to PDF</h3>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Snap pages sequentially using your camera. When finished scanning, compile the images into a clean, combined PDF document instantly.
          </p>

          <div className="pt-4 border-t border-white/5">
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    Generating PDF...
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
                  <Download className="w-5 h-5" />
                  Download Scanned PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCapturedPhotos([]);
                    setDownloadUrl(null);
                  }}
                  className="w-full text-white/50 hover:text-white text-xs h-8"
                >
                  Start New Session
                </Button>
              </div>
            ) : (
              <Button
                disabled={capturedPhotos.length === 0}
                onClick={triggerGeneratePdf}
                className={`w-full font-medium py-6 rounded-xl flex items-center justify-center gap-2 ${
                  capturedPhotos.length > 0 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
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
