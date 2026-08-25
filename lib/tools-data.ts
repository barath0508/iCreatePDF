export interface PDFTool {
  id: string;
  name: string;
  href: string;
  description: string;
  category: 'Organize' | 'Convert to PDF' | 'Convert from PDF' | 'Edit & Sign' | 'Security';
  badge?: string;
  keywords: string[];
}

export const ALL_TOOLS: PDFTool[] = [
  // ==================== ORGANIZE ====================
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    href: '/merge-pdf',
    description: 'Combine multiple PDF files into one single document in any order.',
    category: 'Organize',
    badge: 'Popular',
    keywords: [
      'merge', 'combine', 'join', 'collate', 'binder', 'stitch', 'unir', 'juntar', 
      'put pdfs together', 'fuse', 'unify', 'multiple pdfs'
    ]
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    href: '/split-pdf',
    description: 'Separate one or multiple pages from your PDF or divide into individual files.',
    category: 'Organize',
    badge: 'Popular',
    keywords: [
      'split', 'separate', 'divide', 'cut', 'break', 'extract pages', 'dividir', 
      'range', 'slice', 'take out pages'
    ]
  },
  {
    id: 'remove-pages',
    name: 'Remove Pages',
    href: '/delete-pdf-pages',
    description: 'Delete unwanted pages from your PDF document instantly.',
    category: 'Organize',
    keywords: ['remove pages', 'delete pages', 'delete page', 'cut page', 'erase page', 'drop pages']
  },
  {
    id: 'organize-pdf',
    name: 'Organize / Reorder PDF',
    href: '/organize-pdf',
    description: 'Sort, reorder, rotate, or delete specific pages visually.',
    category: 'Organize',
    keywords: ['organize', 'reorder', 'sort', 'rearrange', 'move pages', 'shuffle']
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    href: '/rotate-pdf',
    description: 'Rotate your PDF pages 90, 180, or 270 degrees clockwise or counterclockwise.',
    category: 'Organize',
    keywords: ['rotate', 'turn', 'orientation', 'upside down', 'landscape to portrait', 'spin']
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    href: '/extract-pages',
    description: 'Pull specific pages or ranges into a standalone PDF.',
    category: 'Organize',
    keywords: ['extract pages', 'separate pages', 'pull pages', 'export pages']
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    href: '/crop-pdf',
    description: 'Trim margins and unwanted borders from your PDF pages.',
    category: 'Organize',
    keywords: ['crop', 'trim', 'margins', 'cut borders', 'resize margins']
  },

  // ==================== COMPRESS / OPTIMIZE ====================
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    href: '/compress-pdf',
    description: 'Reduce file size while preserving maximum visual quality.',
    category: 'Security',
    badge: 'Popular',
    keywords: [
      'compress', 'reduce size', 'shrink', 'downsize', 'optimize', 'make smaller', 
      'compressor', 'reduce mb', 'kb size', 'comprimir', 'klein'
    ]
  },

  // ==================== CONVERT TO PDF ====================
  {
    id: 'jpg-to-pdf',
    name: 'JPG / Image to PDF',
    href: '/jpg-to-pdf',
    description: 'Convert JPG, PNG, WEBP, and BMP images into a PDF document.',
    category: 'Convert to PDF',
    badge: 'Popular',
    keywords: [
      'jpg to pdf', 'jpeg to pdf', 'png to pdf', 'image to pdf', 'photo to pdf', 
      'picture to pdf', 'photos', 'scanner', 'pic to pdf', 'convert image'
    ]
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    href: '/word-to-pdf',
    description: 'Convert Microsoft Word documents (.docx, .doc) to PDF format.',
    category: 'Convert to PDF',
    badge: 'Popular',
    keywords: ['word to pdf', 'doc to pdf', 'docx to pdf', 'convert docx', 'ms word', 'word document']
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    href: '/excel-to-pdf',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF.',
    category: 'Convert to PDF',
    keywords: ['excel to pdf', 'xlsx to pdf', 'xls to pdf', 'spreadsheet to pdf', 'sheets to pdf']
  },
  {
    id: 'html-to-pdf',
    name: 'HTML / Webpage to PDF',
    href: '/html-to-pdf',
    description: 'Convert HTML code, webpages, or URLs directly to PDF files.',
    category: 'Convert to PDF',
    keywords: ['html to pdf', 'url to pdf', 'webpage to pdf', 'website to pdf', 'web to pdf']
  },
  {
    id: 'markdown-to-pdf',
    name: 'Markdown to PDF',
    href: '/markdown-to-pdf',
    description: 'Write styled Markdown and compile to clean A4 PDFs.',
    category: 'Convert to PDF',
    keywords: ['markdown to pdf', 'md to pdf', 'markdown', 'render markdown']
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    href: '/scan-to-pdf',
    description: 'Capture document pages using camera and compile to PDF.',
    category: 'Convert to PDF',
    keywords: ['scan to pdf', 'camera scanner', 'document scanner', 'capture pdf']
  },

  // ==================== CONVERT FROM PDF ====================
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    href: '/pdf-to-word',
    description: 'Convert PDF files into editable Microsoft Word documents (.docx).',
    category: 'Convert from PDF',
    badge: 'Popular',
    keywords: [
      'pdf to word', 'pdf to doc', 'pdf to docx', 'editable word', 'make pdf editable', 
      'convert to text', 'extract text'
    ]
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    href: '/pdf-to-jpg',
    description: 'Extract PDF pages as high-quality JPG or PNG images.',
    category: 'Convert from PDF',
    keywords: ['pdf to jpg', 'pdf to jpeg', 'pdf to png', 'pdf to image', 'extract images', 'save as photo']
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    href: '/pdf-to-excel',
    description: 'Extract tables and data from PDF into editable Excel sheets (.xlsx).',
    category: 'Convert from PDF',
    keywords: ['pdf to excel', 'pdf to xlsx', 'pdf to xls', 'extract table', 'pdf to spreadsheet']
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    href: '/pdf-to-text',
    description: 'Extract structured text layouts from PDF files to TXT.',
    category: 'Convert from PDF',
    keywords: ['pdf to text', 'extract text', 'pdf to txt', 'copy text']
  },

  // ==================== EDIT & SIGN ====================
  {
    id: 'edit-pdf',
    name: 'Edit PDF',
    href: '/edit-pdf',
    description: 'Add text, shapes, highlights, freehand drawings, and annotations.',
    category: 'Edit & Sign',
    badge: 'Popular',
    keywords: [
      'edit pdf', 'editor', 'annotate', 'write on pdf', 'draw on pdf', 'fill form', 
      'pdf filler', 'highlight', 'type on pdf'
    ]
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF / eSign',
    href: '/sign-pdf',
    description: 'Add digital or drawn signatures and initials to your PDF documents.',
    category: 'Edit & Sign',
    badge: 'Popular',
    keywords: ['sign pdf', 'signature', 'esign', 'sign document', 'initials', 'autograph', 'firmar']
  },
  {
    id: 'watermark-pdf',
    name: 'Add Watermark',
    href: '/watermark-pdf',
    description: 'Stamp custom text or image watermarks across your PDF pages.',
    category: 'Edit & Sign',
    keywords: ['watermark', 'stamp', 'confidential watermark', 'logo stamp', 'text watermark', 'brand']
  },
  {
    id: 'page-numbers',
    name: 'Page Numbers',
    href: '/add-page-numbers',
    description: 'Add custom page numbering, headers, and footers to your PDF.',
    category: 'Edit & Sign',
    keywords: ['page numbers', 'add page numbers', 'paginate', 'numbering', 'footer numbers', 'bates']
  },

  // ==================== SECURITY & OCR ====================
  {
    id: 'protect-pdf',
    name: 'Protect / Lock PDF',
    href: '/protect-pdf',
    description: 'Encrypt your PDF with a strong password to prevent unauthorized access.',
    category: 'Security',
    keywords: ['protect', 'lock', 'password', 'encrypt', 'secure', 'add password', 'security']
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    href: '/unlock-pdf',
    description: 'Remove password and security restrictions from your PDF document.',
    category: 'Security',
    keywords: ['unlock', 'remove password', 'decrypt', 'unprotect', 'remove security', 'desbloquear']
  },
  {
    id: 'ocr-pdf',
    name: 'OCR / Extract Text',
    href: '/pdf-ocr',
    description: 'Convert scanned documents and images in PDFs into selectable, searchable text.',
    category: 'Security',
    keywords: ['ocr', 'optical character recognition', 'extract text', 'scanned pdf', 'searchable pdf', 'read text']
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    href: '/redact-pdf',
    description: 'Draw black boxes over sensitive content — permanently burned.',
    category: 'Security',
    keywords: ['redact', 'blackout', 'hide text', 'sanitize', 'remove pii', 'censor']
  }
];

export function searchTools(query: string): PDFTool[] {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    return ALL_TOOLS;
  }

  const queryTerms = cleanQuery.split(/\s+/);
  return ALL_TOOLS.filter((tool) => {
    const searchableText = [
      tool.name.toLowerCase(),
      tool.description.toLowerCase(),
      tool.category.toLowerCase(),
      ...tool.keywords.map((k) => k.toLowerCase())
    ].join(' ');
    
    return queryTerms.every((term) => searchableText.includes(term));
  });
}
