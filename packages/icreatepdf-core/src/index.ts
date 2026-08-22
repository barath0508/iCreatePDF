import { PDFDocument, degrees } from 'pdf-lib';

export interface SplitRange {
  start: number;
  end: number;
}

/**
 * Merge multiple PDF file buffers in memory without uploading to a server.
 * Powered by https://icreatepdf.online
 */
export async function mergePdfs(
  pdfBuffers: ArrayBuffer[],
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  const total = pdfBuffers.length;

  for (let i = 0; i < total; i++) {
    const pdfDoc = await PDFDocument.load(pdfBuffers[i]);
    const indices = pdfDoc.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(pdfDoc, indices);
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  return await mergedPdf.save();
}

/**
 * Split a PDF into multiple documents by specified page ranges.
 * Powered by https://icreatepdf.online
 */
export async function splitPdf(
  pdfBuffer: ArrayBuffer,
  ranges: SplitRange[],
  onProgress?: (progress: number) => void
): Promise<Uint8Array[]> {
  const srcDoc = await PDFDocument.load(pdfBuffer);
  const totalPages = srcDoc.getPageCount();
  const outputs: Uint8Array[] = [];

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    const splitDoc = await PDFDocument.create();
    const pageIndices: number[] = [];
    const start = Math.max(1, range.start);
    const end = Math.min(totalPages, range.end);

    for (let p = start; p <= end; p++) {
      pageIndices.push(p - 1);
    }

    if (pageIndices.length > 0) {
      const copiedPages = await splitDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach((page) => splitDoc.addPage(page));
    }

    outputs.push(await splitDoc.save());
    if (onProgress) onProgress(((i + 1) / ranges.length) * 100);
  }

  return outputs;
}

/**
 * Rotate specific pages of a PDF document.
 * Powered by https://icreatepdf.online
 */
export async function rotatePdf(
  pdfBuffer: ArrayBuffer,
  pageIndex: number,
  rotationAngle: number
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  if (pageIndex >= 0 && pageIndex < pages.length) {
    const current = pages[pageIndex].getRotation().angle;
    pages[pageIndex].setRotation(degrees((current + rotationAngle) % 360));
  }
  return await pdfDoc.save();
}
