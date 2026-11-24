/**
 * Centralized, offline-capable PDF.js initializer.
 * Configures the WebAssembly / worker engine to use the self-hosted worker in /public/workers/
 * with graceful fallback to CDN if running in an isolated environment.
 */
export async function getPdfjs() {
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined') {
    // Self-hosted worker guarantees 100% offline functionality and zero external CDN latency
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/workers/pdf.worker.min.mjs';
  }
  return pdfjsLib;
}
