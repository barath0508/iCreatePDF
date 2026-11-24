'use client';

export interface SmartIntentSuggestion {
  targetToolId: string;
  targetToolName: string;
  targetHref: string;
  reason: string;
  file: File;
}

/**
 * Intelligent file classifier that inspects uploaded or dropped files
 * and determines if a different tool is better suited for the file format.
 */
export function detectFileIntent(file: File, currentToolId: string): SmartIntentSuggestion | null {
  const name = file.name.toLowerCase();
  const ext = name.split('.').pop() || '';

  // 1. Word documents (.docx, .doc)
  if (['docx', 'doc'].includes(ext)) {
    if (currentToolId !== 'word-to-pdf') {
      return {
        targetToolId: 'word-to-pdf',
        targetToolName: 'Word to PDF',
        targetHref: '/word-to-pdf',
        reason: 'We noticed you uploaded a Word document (.docx). Would you like to convert it to PDF?',
        file,
      };
    }
  }

  // 2. Standard Images (.jpg, .jpeg, .png, .webp)
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    const imageFriendlyTools = ['jpg-to-pdf', 'png-to-pdf', 'scan-to-pdf', 'heic-to-pdf'];
    if (!imageFriendlyTools.includes(currentToolId)) {
      const isPng = ext === 'png';
      return {
        targetToolId: isPng ? 'png-to-pdf' : 'jpg-to-pdf',
        targetToolName: isPng ? 'PNG to PDF' : 'JPG to PDF',
        targetHref: isPng ? '/png-to-pdf' : '/jpg-to-pdf',
        reason: `We noticed you uploaded an image (.${ext}). Would you like to convert it into a PDF?`,
        file,
      };
    }
  }

  // 3. Apple HEIC / HEIF photos (.heic, .heif)
  if (['heic', 'heif'].includes(ext)) {
    if (currentToolId !== 'heic-to-pdf') {
      return {
        targetToolId: 'heic-to-pdf',
        targetToolName: 'HEIC to PDF',
        targetHref: '/heic-to-pdf',
        reason: 'We noticed you uploaded an Apple HEIC photo. Would you like to convert it to PDF?',
        file,
      };
    }
  }

  // 4. Spreadsheets (.xlsx, .xls, .csv)
  if (['xlsx', 'xls', 'csv'].includes(ext)) {
    if (!['excel-to-pdf', 'csv-to-pdf'].includes(currentToolId)) {
      const isCsv = ext === 'csv';
      return {
        targetToolId: isCsv ? 'csv-to-pdf' : 'excel-to-pdf',
        targetToolName: isCsv ? 'CSV to PDF' : 'Excel to PDF',
        targetHref: isCsv ? '/csv-to-pdf' : '/excel-to-pdf',
        reason: `We noticed you uploaded a spreadsheet (.${ext}). Would you like to convert it to PDF?`,
        file,
      };
    }
  }

  // 5. EPUB eBooks (.epub)
  if (ext === 'epub' && currentToolId !== 'epub-to-pdf') {
    return {
      targetToolId: 'epub-to-pdf',
      targetToolName: 'EPUB to PDF',
      targetHref: '/epub-to-pdf',
      reason: 'We noticed you uploaded an EPUB eBook. Would you like to convert it to PDF?',
      file,
    };
  }

  // 6. Markdown documents (.md, .markdown)
  if (['md', 'markdown'].includes(ext) && currentToolId !== 'markdown-to-pdf') {
    return {
      targetToolId: 'markdown-to-pdf',
      targetToolName: 'Markdown to PDF',
      targetHref: '/markdown-to-pdf',
      reason: 'We noticed you uploaded a Markdown document. Would you like to convert it to PDF?',
      file,
    };
  }

  // 7. HTML pages (.html, .htm)
  if (['html', 'htm'].includes(ext) && currentToolId !== 'html-to-pdf') {
    return {
      targetToolId: 'html-to-pdf',
      targetToolName: 'HTML to PDF',
      targetHref: '/html-to-pdf',
      reason: 'We noticed you uploaded an HTML document. Would you like to convert it to PDF?',
      file,
    };
  }

  // 8. Plain text files (.txt)
  if (ext === 'txt' && currentToolId !== 'txt-to-pdf') {
    return {
      targetToolId: 'txt-to-pdf',
      targetToolName: 'TXT to PDF',
      targetHref: '/txt-to-pdf',
      reason: 'We noticed you uploaded a plain text file. Would you like to convert it to PDF?',
      file,
    };
  }

  // 9. When a PDF is dropped into an ingestion tool expecting non-PDFs (e.g. Word to PDF, JPG to PDF)
  if (ext === 'pdf') {
    const nonPdfReceivers = [
      'word-to-pdf',
      'jpg-to-pdf',
      'png-to-pdf',
      'excel-to-pdf',
      'heic-to-pdf',
      'epub-to-pdf',
      'html-to-pdf',
      'markdown-to-pdf',
      'txt-to-pdf',
    ];
    if (nonPdfReceivers.includes(currentToolId)) {
      return {
        targetToolId: 'compress-pdf',
        targetToolName: 'Compress PDF',
        targetHref: '/compress-pdf',
        reason: 'This file is already a PDF! Would you like to compress, edit, or convert it to Word/Images instead?',
        file,
      };
    }
  }

  return null;
}
