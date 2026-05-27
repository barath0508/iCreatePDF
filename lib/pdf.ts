import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export interface PdfOptions {
  pageSize: 'a4' | 'letter' | 'fit' | 'custom';
  customWidth?: number;  // in mm
  customHeight?: number; // in mm
  orientation: 'portrait' | 'landscape';
  margin: 'none' | 'small' | 'large';
  quality: number; // 0.1 to 1.0 (compression)
}

// Convert HEIC file to JPEG Blob using dynamic heic2any import
export async function convertHeicToBlob(file: File): Promise<Blob> {
  try {
    const heic2any = (await import('heic2any')).default;
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });
    return Array.isArray(result) ? result[0] : result;
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('Could not convert HEIC image. The file might be corrupted.');
  }
}

// Helper to convert any image file/blob to JPEG bytes via Canvas
export async function compressAndConvertToJpeg(
  fileOrBlob: Blob | File,
  quality: number
): Promise<{ width: number; height: number; jpegBytes: Uint8Array }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get 2D context'));
        return;
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas conversion to Blob failed'));
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
              resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
                jpegBytes: new Uint8Array(reader.result),
              });
            } else {
              reject(new Error('Failed to read JPEG blob as ArrayBuffer'));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(blob);
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image into element'));
    };

    img.src = objectUrl;
  });
}

// Standard page dimensions in points (72 points = 1 inch)
const PAGE_SIZES = {
  a4: { width: 595.27, height: 841.89 },
  letter: { width: 612.0, height: 792.0 },
};

const MARGINS = {
  none: 0,
  small: 20,
  large: 40,
};

export async function generatePdf(
  images: Array<{ file: File; id: string }>,
  options: PdfOptions,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const total = images.length;

  for (let i = 0; i < total; i++) {
    const item = images[i];
    let fileToProcess: Blob | File = item.file;

    const ext = item.file.name.split('.').pop()?.toLowerCase();
    if (ext === 'heic' || ext === 'heif') {
      if (onProgress) onProgress(((i + 0.2) / total) * 100);
      fileToProcess = await convertHeicToBlob(item.file);
    }

    if (onProgress) onProgress(((i + 0.5) / total) * 100);

    const { width: imgW, height: imgH, jpegBytes } = await compressAndConvertToJpeg(
      fileToProcess,
      options.quality
    );

    const embeddedImg = await pdfDoc.embedJpg(jpegBytes);

    let pageWidth = 0;
    let pageHeight = 0;
    const margin = MARGINS[options.margin];

    if (options.pageSize === 'fit') {
      pageWidth = imgW + margin * 2;
      pageHeight = imgH + margin * 2;
    } else if (options.pageSize === 'custom') {
      // 1 mm = 2.83465 PDF points
      const wPts = (options.customWidth || 210) * 2.83465;
      const hPts = (options.customHeight || 297) * 2.83465;
      if (options.orientation === 'landscape') {
        pageWidth = hPts;
        pageHeight = wPts;
      } else {
        pageWidth = wPts;
        pageHeight = hPts;
      }
    } else {
      const dimensions = PAGE_SIZES[options.pageSize];
      if (options.orientation === 'landscape') {
        pageWidth = dimensions.height;
        pageHeight = dimensions.width;
      } else {
        pageWidth = dimensions.width;
        pageHeight = dimensions.height;
      }
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;

    const scale = Math.min(maxW / imgW, maxH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const drawX = margin + (maxW - drawW) / 2;
    const drawY = margin + (maxH - drawH) / 2;

    page.drawImage(embeddedImg, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });

    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// -------------------------------------------------------------
// NEW MULTI-TOOL PDF UTILITIES
// -------------------------------------------------------------

// 1. Merge PDF files
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

// 2. Split PDF range extraction
export interface SplitRange {
  start: number;
  end: number;
}

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

    const docBytes = await splitDoc.save();
    outputs.push(docBytes);

    if (onProgress) onProgress(((i + 1) / ranges.length) * 100);
  }

  return outputs;
}

// 3. Reorder, Delete, and Rotate PDF Pages
export interface PageEditInstruction {
  originalIndex: number; // 0-indexed page index in original document
  rotation: number;      // degrees to add/rotate (e.g. 0, 90, 180, 270)
  delete: boolean;
}

export async function organizePdf(
  pdfBuffer: ArrayBuffer,
  instructions: PageEditInstruction[],
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(pdfBuffer);
  const resultDoc = await PDFDocument.create();

  const activeInstructions = instructions.filter(ins => !ins.delete);
  const total = activeInstructions.length;

  for (let i = 0; i < total; i++) {
    const ins = activeInstructions[i];
    
    // Copy the page
    const [copiedPage] = await resultDoc.copyPages(srcDoc, [ins.originalIndex]);
    
    // Apply rotation
    if (ins.rotation !== 0) {
      const currentRotation = copiedPage.getRotation().angle;
      copiedPage.setRotation(degrees((currentRotation + ins.rotation) % 360));
    }

    resultDoc.addPage(copiedPage);
    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  return await resultDoc.save();
}

// 4. Add Watermark to PDF
export interface WatermarkOptions {
  text: string;
  size: number;
  opacity: number; // 0.0 to 1.0
  colorHex: string; // e.g. "#FF0000"
}

export async function addWatermarkToPdf(
  pdfBuffer: ArrayBuffer,
  options: WatermarkOptions,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const total = pages.length;

  // Hex color conversion
  const hex = options.colorHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    
    // Measure text width to center it
    const textWidth = font.widthOfTextAtSize(options.text, options.size);
    const textHeight = options.size;

    // Center of page rotation watermark
    page.drawText(options.text, {
      x: (width - textWidth) / 2,
      y: (height - textHeight) / 2,
      size: options.size,
      font,
      color: rgb(r, g, b),
      opacity: options.opacity,
      rotate: degrees(45),
    });

    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  return await pdfDoc.save();
}

// 5. Add Page Numbers to PDF
export interface PageNumberingOptions {
  format: 'page' | 'page-of'; // "Page X" or "Page X of Y"
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export async function addPageNumbersToPdf(
  pdfBuffer: ArrayBuffer,
  options: PageNumberingOptions,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const total = pages.length;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();

    const pageNum = i + 1;
    const label = options.format === 'page' 
      ? `Page ${pageNum}`
      : `Page ${pageNum} of ${total}`;
    
    const size = 10;
    const textWidth = font.widthOfTextAtSize(label, size);
    
    let x = 20;
    let y = 20;

    if (options.position === 'top-left') {
      x = 30;
      y = height - 30;
    } else if (options.position === 'top-right') {
      x = width - textWidth - 30;
      y = height - 30;
    } else if (options.position === 'bottom-left') {
      x = 30;
      y = 30;
    } else if (options.position === 'bottom-right') {
      x = width - textWidth - 30;
      y = 30;
    }

    page.drawText(label, {
      x,
      y,
      size,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  return await pdfDoc.save();
}
