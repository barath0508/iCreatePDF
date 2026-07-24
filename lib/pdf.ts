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

  const sanitizedText = sanitizeTextForPdf(options.text);

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    
    // Measure text width to center it
    const textWidth = font.widthOfTextAtSize(sanitizedText, options.size);
    const textHeight = options.size;

    // Center of page rotation watermark
    page.drawText(sanitizedText, {
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
    const label = sanitizeTextForPdf(options.format === 'page' 
      ? `Page ${pageNum}`
      : `Page ${pageNum} of ${total}`);
    
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

// 6. Parse DOCX Metadata (Word Count, Char Count, Image Count)
export interface DocxMetadata {
  pageCount: number;
  wordCount: number;
  charCount: number;
  imageCount: number;
}

export async function parseDocxMetadata(docxArrayBuffer: ArrayBuffer): Promise<DocxMetadata> {
  try {
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(docxArrayBuffer);
    const docXmlText = await zip.file('word/document.xml')?.async('text');
    
    if (!docXmlText) {
      return { pageCount: 1, wordCount: 0, charCount: 0, imageCount: 0 };
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(docXmlText, 'application/xml');
    
    const textElements = xmlDoc.getElementsByTagName('w:t');
    let totalText = '';
    for (let i = 0; i < textElements.length; i++) {
      totalText += (textElements[i].textContent || '') + ' ';
    }

    const words = totalText.trim().split(/\s+/).filter(Boolean);
    const drawingElements = xmlDoc.getElementsByTagName('w:drawing');
    const pictElements = xmlDoc.getElementsByTagName('w:pict');

    return {
      pageCount: 1,
      wordCount: words.length,
      charCount: totalText.replace(/\s+/g, '').length,
      imageCount: drawingElements.length + pictElements.length,
    };
  } catch (err) {
    console.error('Failed to parse docx metadata:', err);
    return { pageCount: 1, wordCount: 0, charCount: 0, imageCount: 0 };
  }
}

// Helper to parse page range strings e.g. "1-3, 5"
export function parsePageRange(rangeStr: string, totalPages: number): Set<number> {
  const pages = new Set<number>();
  if (!rangeStr || rangeStr.trim().toLowerCase() === 'all') {
    for (let i = 1; i <= totalPages; i++) pages.add(i);
    return pages;
  }

  const parts = rangeStr.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(totalPages, parseInt(endStr, 10) || totalPages);
      for (let p = start; p <= end; p++) pages.add(p);
    } else {
      const pageNum = parseInt(trimmed, 10);
      if (pageNum >= 1 && pageNum <= totalPages) {
        pages.add(pageNum);
      }
    }
  }

  if (pages.size === 0) {
    for (let i = 1; i <= totalPages; i++) pages.add(i);
  }

  return pages;
}

// 7. Convert Word (.docx) to PDF (100% Client-Side XML parsing fallback)
export async function convertDocxToPdf(
  docxArrayBuffer: ArrayBuffer,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(docxArrayBuffer);
  const docXmlText = await zip.file('word/document.xml')?.async('text');
  
  if (!docXmlText) {
    throw new Error('Invalid DOCX format: word/document.xml not found.');
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(docXmlText, 'application/xml');
  const paragraphs = xmlDoc.getElementsByTagName('w:p');

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  let y = height - 50;
  const margin = 50;
  const defaultFontSize = 11;
  const lineHeight = 15;

  const total = paragraphs.length;

  for (let i = 0; i < total; i++) {
    const p = paragraphs[i];
    
    // Check heading style or bolding
    const pStyle = p.getElementsByTagName('w:pStyle')[0]?.getAttribute('w:val');
    let fontSize = defaultFontSize;
    let currentFont = font;
    let isHeading = false;

    if (pStyle && (pStyle.startsWith('Heading') || pStyle.startsWith('Title'))) {
      fontSize = pStyle.includes('1') || pStyle === 'Title' ? 18 : 14;
      currentFont = fontBold;
      isHeading = true;
    }

    // Extract text runs inside this paragraph
    const textRuns = p.getElementsByTagName('w:t');
    let paragraphText = '';
    for (let j = 0; j < textRuns.length; j++) {
      paragraphText += textRuns[j].textContent || '';
    }

    paragraphText = sanitizeTextForPdf(paragraphText);

    if (paragraphText.trim() === '') {
      y -= lineHeight;
      continue;
    }

    // Split text into wrapped lines
    const words = paragraphText.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = currentFont.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > width - margin * 2) {
        // Draw current line
        page.drawText(currentLine, {
          x: margin,
          y,
          size: fontSize,
          font: currentFont,
          color: isHeading ? rgb(0.1, 0.2, 0.4) : rgb(0.15, 0.15, 0.15),
        });

        y -= fontSize * 1.3;
        if (y < margin) {
          page = pdfDoc.addPage();
          y = height - 50;
        }

        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    // Draw remaining text of paragraph
    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y,
        size: fontSize,
        font: currentFont,
        color: isHeading ? rgb(0.1, 0.2, 0.4) : rgb(0.15, 0.15, 0.15),
      });
      y -= (fontSize * 1.3) + (isHeading ? 6 : 4);
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - 50;
      }
    }

    if (onProgress) onProgress(((i + 1) / total) * 100);
  }

  return await pdfDoc.save();
}

// 7. Sanitize text for standard PDF fonts (WinAnsiEncoding compatibility)
export function sanitizeTextForPdf(text: string): string {
  if (!text) return '';
  
  // 1. Remove zero-width characters and formatting marks
  const sanitized = text.replace(/[\u200b-\u200d\uFEFF\u200e\u200f]/g, '');
  
  // 2. Filter out characters that cannot be encoded in WinAnsi
  const allowedCodePoints = new Set([9, 10, 13]); // tab, LF, CR
  
  const isAllowed = (codePoint: number): boolean => {
    if (codePoint >= 32 && codePoint <= 126) return true;
    if (codePoint >= 160 && codePoint <= 255) return true;
    if (allowedCodePoints.has(codePoint)) return true;
    
    // Windows-1252 special characters outside Latin-1
    const specialCodePoints = [
      0x0152, 0x0153, // Œ, œ
      0x0160, 0x0161, // Š, š
      0x0178,         // Ÿ
      0x017D, 0x017E, // Ž, ž
      0x0192,         // ƒ
      0x02C6,         // ˆ
      0x02DC,         // ˜
      0x2013, 0x2014, // –, —
      0x2018, 0x2019, // ‘, ’
      0x201A,         // ‚
      0x201C, 0x201D, // “, ”
      0x201E,         // „
      0x2020, 0x2021, // †, ‡
      0x2022,         // •
      0x2026,         // …
      0x2030,         // ‰
      0x2039, 0x203A, // ‹, ›
      0x20AC,         // €
      0x2122          // ™
    ];
    return specialCodePoints.includes(codePoint);
  };

  let result = '';
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    const code = char.charCodeAt(0);
    if (isAllowed(code)) {
      result += char;
    } else {
      // Map other common unsupported characters to their closest WinAnsi equivalents
      if (code === 0x2010 || code === 0x2011 || code === 0x2012 || code === 0x2015) {
        result += '-';
      } else {
        result += '?';
      }
    }
  }
  return result;
}

