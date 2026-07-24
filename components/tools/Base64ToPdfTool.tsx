'use client';

import React, { useState } from 'react';
import { FileCode, Loader2, Download, Eye, RefreshCw, Trash2, Clipboard, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';

export function Base64ToPdfTool() {
  const [base64Input, setBase64Input] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDecode = async () => {
    if (!base64Input.trim()) {
      setError('Please enter a Base64 string.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      // 1. Clean the input string (strip header if present and remove whitespace/newlines)
      const cleanedInput = base64Input
        .replace(/^data:application\/pdf;base64,/i, '')
        .replace(/\s/g, '');

      // 2. Validate base64 structure using regex
      const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
      if (!base64Regex.test(cleanedInput)) {
        throw new Error('Invalid Base64 format. The input contains non-base64 characters or incorrect padding.');
      }

      // 3. Decode base64 to binary array
      const binaryString = atob(cleanedInput);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 4. Validate that the decoded bytes actually represent a PDF file (%PDF-)
      const header = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4]);
      if (header !== '%PDF-') {
        throw new Error('The decoded binary data does not appear to be a valid PDF document (missing %PDF- header).');
      }

      // 5. Create Object URL
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to decode Base64 string to PDF.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'decoded-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setBase64Input(text);
      setError(null);
    } catch (err) {
      setError('Unable to read clipboard data. Please paste manually.');
    }
  };

  const handleLoadExample = async () => {
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);
    try {
      // Dynamically generate a simple demo PDF using pdf-lib
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.276, 841.890]);
      
      page.drawText('iCreatePDF - Base64 Decoder Tool', {
        x: 50,
        y: 780,
        size: 20,
      });

      page.drawText('This PDF was generated on the fly, converted to a Base64 string,', {
        x: 50,
        y: 740,
        size: 12,
      });

      page.drawText('and then decoded entirely in your browser sandbox!', {
        x: 50,
        y: 720,
        size: 12,
      });

      page.drawText('Privacy stats: 100% Offline, Client-side.', {
        x: 50,
        y: 680,
        size: 10,
      });

      const pdfBytes = await pdfDoc.save();
      
      // Convert to Base64 data URI format
      const binary = Array.from(pdfBytes).map(b => String.fromCharCode(b)).join('');
      const base64Str = `data:application/pdf;base64,${btoa(binary)}`;
      
      setBase64Input(base64Str);
    } catch (err) {
      setError('Failed to generate sample PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setBase64Input('');
    setError(null);
    setDownloadUrl(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center bg-card/60 px-4 py-3 border-b border-foreground/10">
              <span className="text-xs font-mono text-brand flex items-center gap-1.5 font-bold">
                <FileCode className="w-4 h-4" />
                Base64 String Input
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handlePaste}
                  className="h-7 text-[10px] px-2.5 rounded-md hover:bg-foreground/5 text-foreground/60 hover:text-foreground"
                >
                  <Clipboard className="w-3 h-3 mr-1" />
                  Paste
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClear}
                  className="h-7 text-[10px] px-2.5 rounded-md hover:bg-red-500/10 text-foreground/60 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={base64Input}
                onChange={(e) => {
                  setBase64Input(e.target.value);
                  setError(null);
                }}
                placeholder="Paste your base64 encoded PDF string here (e.g. data:application/pdf;base64,JVBERi0xLjQK...)"
                className="w-full h-80 bg-transparent p-6 font-mono text-xs text-foreground/90 focus:outline-none resize-none placeholder:text-foreground/30"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-5 bg-card border border-foreground/10 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-foreground/5 pb-4">
            <RefreshCw className="w-4 h-4 text-brand" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">Decoder Hub</h3>
          </div>

          <p className="text-xs text-foreground/50 leading-relaxed">
            Pasted Base64 text is parsed completely offline inside your browser. No files cross the network, guaranteeing maximum data security for sensitive developer environments.
          </p>

          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              onClick={handleLoadExample}
              disabled={isProcessing}
              className="w-full border-foreground/10 hover:bg-foreground/5 text-foreground text-xs py-5 rounded-xl font-medium"
            >
              Load Example Base64
            </Button>

            {isProcessing ? (
              <Button disabled className="w-full bg-brand/50 text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Decoding Base64...
              </Button>
            ) : downloadUrl ? (
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download PDF File
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleDecode}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
                Decode to PDF Preview
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Sandbox PDF Preview Frame */}
      {downloadUrl && (
        <div className="mt-12 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Decoded PDF Sandbox Preview
          </h3>
          <div className="w-full h-[600px] border border-foreground/10 rounded-2xl overflow-hidden bg-foreground/5">
            <iframe
              src={downloadUrl}
              className="w-full h-full border-0"
              title="PDF Decoded Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
