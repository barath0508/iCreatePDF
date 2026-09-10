export interface PDFTool {
  id: string;
  name: string;
  href: string;
  description: string;
  category: 'Organize' | 'Convert to PDF' | 'Convert from PDF' | 'Edit & Sign' | 'Security' | 'Utilities';
  badge?: string;
  iconName?: string;
  keywords: string[];
}

export const ALL_TOOLS: PDFTool[] = [
  // ==================== CONVERT TO PDF ====================
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    href: '/word-to-pdf',
    description: 'Convert Microsoft Word documents (.docx, .doc) into high-quality PDF files.',
    category: 'Convert to PDF',
    badge: 'Popular',
    iconName: 'FileText',
    keywords: [
      'word to pdf', 'convert word to pdf', 'word to pdf converter', 'docx to pdf', 
      'doc to pdf', 'ms word to pdf', 'word document', 'docx', 'doc', 'convert word', 
      'word to pdf conversion', 'word to pdf online', 'save word as pdf', 'office to pdf', 
      'word converter', 'docx to pdf converter', 'microsoft word'
    ]
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    href: '/jpg-to-pdf',
    description: 'Convert JPG, PNG, WEBP, and BMP images into a PDF document.',
    category: 'Convert to PDF',
    badge: 'Popular',
    iconName: 'Image',
    keywords: [
      'jpg to pdf', 'jpeg to pdf', 'png to pdf', 'image to pdf', 'photo to pdf', 
      'picture to pdf', 'photos', 'scanner', 'pic to pdf', 'convert image', 
      'image to pdf converter', 'jpg converter', 'jpeg converter'
    ]
  },
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF',
    href: '/png-to-pdf',
    description: 'Convert PNG images with transparency into high-quality PDF documents.',
    category: 'Convert to PDF',
    iconName: 'FileImage',
    keywords: [
      'png to pdf', 'png to pdf converter', 'convert png', 'transparent image to pdf', 
      'png images to pdf', 'png converter'
    ]
  },
  {
    id: 'heic-to-pdf',
    name: 'HEIC to PDF',
    href: '/heic-to-pdf',
    description: 'Convert iPhone and Apple HEIC/HEIF photos directly to PDF in browser.',
    category: 'Convert to PDF',
    iconName: 'FileImage',
    keywords: [
      'heic to pdf', 'heif to pdf', 'apple photo to pdf', 'iphone photo to pdf', 
      'heic converter', 'heic to pdf converter', 'convert heic'
    ]
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    href: '/excel-to-pdf',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) to formatted PDF tables.',
    category: 'Convert to PDF',
    badge: 'Popular',
    iconName: 'FileSpreadsheet',
    keywords: [
      'excel to pdf', 'excel to pdf converter', 'xlsx to pdf', 'xls to pdf', 
      'spreadsheet to pdf', 'sheets to pdf', 'convert excel', 'workbook to pdf', 
      'excel converter', 'sheet to pdf'
    ]
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    href: '/html-to-pdf',
    description: 'Convert HTML code, webpages, or URLs directly to PDF files.',
    category: 'Convert to PDF',
    iconName: 'Code',
    keywords: [
      'html to pdf', 'url to pdf', 'webpage to pdf', 'website to pdf', 'web to pdf', 
      'html to pdf converter', 'convert webpage', 'html converter'
    ]
  },
  {
    id: 'markdown-to-pdf',
    name: 'Markdown to PDF',
    href: '/markdown-to-pdf',
    description: 'Write styled Markdown and compile to clean A4 PDFs.',
    category: 'Convert to PDF',
    iconName: 'FileCode',
    keywords: [
      'markdown to pdf', 'md to pdf', 'markdown', 'render markdown', 
      'markdown to pdf converter', 'md converter', 'markdown editor'
    ]
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    href: '/scan-to-pdf',
    description: 'Capture document pages using your camera and compile directly to PDF.',
    category: 'Convert to PDF',
    iconName: 'Camera',
    keywords: [
      'scan to pdf', 'camera scanner', 'document scanner', 'capture pdf', 
      'mobile scanner', 'scanner to pdf', 'photo scanner'
    ]
  },
  {
    id: 'txt-to-pdf',
    name: 'TXT to PDF',
    href: '/txt-to-pdf',
    description: 'Convert plain text files (.txt) into formatted PDF documents.',
    category: 'Convert to PDF',
    iconName: 'FileText',
    keywords: [
      'txt to pdf', 'text to pdf', 'plain text to pdf', 'txt to pdf converter', 
      'notepad to pdf', 'convert text to pdf'
    ]
  },
  {
    id: 'csv-to-pdf',
    name: 'CSV to PDF',
    href: '/csv-to-pdf',
    description: 'Convert CSV data sheets directly into formatted PDF tables with headers.',
    category: 'Convert to PDF',
    iconName: 'FileSpreadsheet',
    keywords: [
      'csv to pdf', 'csv to pdf converter', 'csv table to pdf', 
      'comma separated to pdf', 'convert csv', 'csv to table'
    ]
  },
  {
    id: 'epub-to-pdf',
    name: 'EPUB to PDF',
    href: '/epub-to-pdf',
    description: 'Convert EPUB eBook files into clean, printable PDF documents.',
    category: 'Convert to PDF',
    iconName: 'BookOpen',
    keywords: [
      'epub to pdf', 'ebook to pdf', 'epub to pdf converter', 
      'electronic publication to pdf', 'convert epub', 'book to pdf'
    ]
  },
  {
    id: 'svg-to-pdf',
    name: 'SVG to PDF',
    href: '/svg-to-pdf',
    description: 'Convert Scalable Vector Graphics (.svg) into clean vector PDFs.',
    category: 'Convert to PDF',
    iconName: 'Code',
    keywords: [
      'svg to pdf', 'vector to pdf', 'svg to pdf converter', 
      'scalable vector graphics', 'convert svg'
    ]
  },
  {
    id: 'qr-to-pdf',
    name: 'QR to PDF',
    href: '/qr-to-pdf',
    description: 'Generate printable A4 PDF sheets with custom QR codes.',
    category: 'Convert to PDF',
    iconName: 'QrCode',
    keywords: [
      'qr to pdf', 'qr code to pdf', 'generate qr pdf', 'qr maker', 
      'qr code generator', 'print qr code'
    ]
  },
  {
    id: 'barcode-to-pdf',
    name: 'Barcode to PDF',
    href: '/barcode-to-pdf',
    description: 'Generate printable PDFs with Code 128, EAN, UPC, and DataMatrix barcodes.',
    category: 'Convert to PDF',
    iconName: 'FileDigit',
    keywords: [
      'barcode to pdf', 'barcode generator', 'barcode to pdf converter', 
      'upc to pdf', 'code 128 to pdf', 'ean barcode', 'print barcodes'
    ]
  },
  {
    id: 'base64-to-pdf',
    name: 'Base64 to PDF',
    href: '/base64-to-pdf',
    description: 'Decode Base64 encoded strings back into downloadable PDF documents.',
    category: 'Convert to PDF',
    iconName: 'FileCode',
    keywords: [
      'base64 to pdf', 'base64 decoder', 'base64 to pdf converter', 
      'decode base64 pdf', 'base64 string to pdf', 'data uri to pdf'
    ]
  },
  {
    id: 'ris-to-pdf',
    name: 'RIS to PDF',
    href: '/ris-to-pdf',
    description: 'Convert RIS citation files into formatted reference & bibliography PDFs.',
    category: 'Convert to PDF',
    badge: 'New',
    iconName: 'BookMarked',
    keywords: [
      'ris to pdf', 'citation to pdf', 'reference to pdf', 
      'bibliography to pdf', 'academic citation', 'endnote to pdf'
    ]
  },
  {
    id: 'bulk-certificates',
    name: 'Bulk Certificates',
    href: '/bulk-certificates',
    description: 'Generate hundreds of customized PDF certificates dynamically from Excel/CSV data.',
    category: 'Convert to PDF',
    badge: 'New',
    iconName: 'Award',
    keywords: [
      'bulk certificates', 'certificate generator', 'csv to certificates', 
      'award maker', 'diploma generator', 'batch certificates'
    ]
  },

  // ==================== CONVERT FROM PDF ====================
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    href: '/pdf-to-word',
    description: 'Convert PDF files into editable Microsoft Word documents (.docx).',
    category: 'Convert from PDF',
    badge: 'Popular',
    iconName: 'FileText',
    keywords: [
      'pdf to word', 'pdf to word converter', 'pdf to doc', 'pdf to docx', 
      'editable word', 'make pdf editable', 'convert to text', 'extract text', 
      'pdf to docx converter', 'word converter'
    ]
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    href: '/pdf-to-jpg',
    description: 'Extract PDF pages as high-quality JPG or PNG images.',
    category: 'Convert from PDF',
    badge: 'Popular',
    iconName: 'Image',
    keywords: [
      'pdf to jpg', 'pdf to jpeg', 'pdf to png', 'pdf to image', 
      'pdf to jpg converter', 'extract images', 'save as photo', 'pdf to picture'
    ]
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    href: '/pdf-to-excel',
    description: 'Extract tables and structured data from PDF into editable Excel sheets (.xlsx).',
    category: 'Convert from PDF',
    iconName: 'FileSpreadsheet',
    keywords: [
      'pdf to excel', 'pdf to xlsx', 'pdf to xls', 'extract table', 
      'pdf to spreadsheet', 'pdf to excel converter', 'pdf table extractor'
    ]
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    href: '/pdf-to-text',
    description: 'Extract structured plain text layouts from PDF files to TXT.',
    category: 'Convert from PDF',
    iconName: 'FileText',
    keywords: [
      'pdf to text', 'extract text', 'pdf to txt', 'copy text', 
      'pdf to text converter', 'text extractor'
    ]
  },
  {
    id: 'extract-pdf-images',
    name: 'Extract Images',
    href: '/extract-pdf-images',
    description: 'Extract all embedded photos and raster graphics from PDF into a ZIP archive.',
    category: 'Convert from PDF',
    iconName: 'Image',
    keywords: [
      'extract images', 'extract photos from pdf', 'rip images from pdf', 
      'export images from pdf', 'get pictures from pdf', 'save images from pdf'
    ]
  },
  {
    id: 'export-pdf-form-data',
    name: 'Export Form Data',
    href: '/export-pdf-form-data',
    description: 'Extract filled AcroForm interactive form fields into CSV spreadsheets.',
    category: 'Convert from PDF',
    iconName: 'FileSpreadsheet',
    keywords: [
      'export form data', 'extract form fields', 'pdf form to csv', 
      'acroform export', 'pdf form data', 'extract form inputs'
    ]
  },
  {
    id: 'pdf-to-audio',
    name: 'PDF to Audio',
    href: '/pdf-to-audio',
    description: 'Convert PDF document text into speech audio for listening.',
    category: 'Convert from PDF',
    iconName: 'Volume2',
    keywords: [
      'pdf to audio', 'pdf to mp3', 'pdf to speech', 'listen to pdf', 
      'audiobook pdf', 'speech synthesis'
    ]
  },

  // ==================== ORGANIZE ====================
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    href: '/merge-pdf',
    description: 'Combine multiple PDF files into one single document in any order.',
    category: 'Organize',
    badge: 'Popular',
    iconName: 'Combine',
    keywords: [
      'merge', 'combine', 'join', 'collate', 'binder', 'stitch', 'unir', 'juntar', 
      'put pdfs together', 'fuse', 'unify', 'multiple pdfs', 'merge pdf', 'pdf merger', 
      'merge pdf files', 'join pdfs'
    ]
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    href: '/split-pdf',
    description: 'Separate one or multiple pages from your PDF or divide into individual files.',
    category: 'Organize',
    badge: 'Popular',
    iconName: 'Scissors',
    keywords: [
      'split', 'separate', 'divide', 'cut', 'break', 'extract pages', 'dividir', 
      'range', 'slice', 'take out pages', 'split pdf', 'pdf splitter'
    ]
  },
  {
    id: 'delete-pdf-pages',
    name: 'Delete Pages',
    href: '/delete-pdf-pages',
    description: 'Delete unwanted pages from your PDF document instantly.',
    category: 'Organize',
    iconName: 'Trash2',
    keywords: [
      'remove pages', 'delete pages', 'delete page', 'cut page', 'erase page', 
      'drop pages', 'delete pdf pages', 'remove pdf pages'
    ]
  },
  {
    id: 'organize-pdf',
    name: 'Organize / Reorder PDF',
    href: '/organize-pdf',
    description: 'Sort, reorder, rotate, or delete specific pages visually.',
    category: 'Organize',
    badge: 'Popular',
    iconName: 'Sliders',
    keywords: [
      'organize', 'reorder', 'sort', 'rearrange', 'move pages', 'shuffle', 
      'organize pdf', 'reorder pdf pages'
    ]
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    href: '/rotate-pdf',
    description: 'Rotate your PDF pages 90, 180, or 270 degrees clockwise or counterclockwise.',
    category: 'Organize',
    iconName: 'RotateCw',
    keywords: [
      'rotate', 'turn', 'orientation', 'upside down', 'landscape to portrait', 
      'spin', 'rotate pdf', 'pdf rotator'
    ]
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    href: '/extract-pages',
    description: 'Pull specific pages or ranges into a standalone PDF.',
    category: 'Organize',
    iconName: 'BookOpen',
    keywords: [
      'extract pages', 'separate pages', 'pull pages', 'export pages', 
      'save specific pages', 'pull pages from pdf'
    ]
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    href: '/crop-pdf',
    description: 'Trim margins and unwanted borders from your PDF pages.',
    category: 'Organize',
    iconName: 'Crop',
    keywords: [
      'crop', 'trim', 'margins', 'cut borders', 'resize margins', 
      'crop pdf', 'pdf cropper'
    ]
  },
  {
    id: 'auto-crop-pdf',
    name: 'Auto-Crop PDF',
    href: '/auto-crop-pdf',
    description: 'Detect and trim blank margins and scanner borders automatically.',
    category: 'Organize',
    badge: 'New',
    iconName: 'Crop',
    keywords: [
      'auto crop pdf', 'smart crop', 'margin optimizer', 'trim whitespace', 
      'scanner border remover', 'automatic crop'
    ]
  },
  {
    id: 'resize-pdf',
    name: 'Resize PDF',
    href: '/resize-pdf',
    description: 'Normalize pages to A4, Letter, A3, Legal, or A5 page sizes.',
    category: 'Organize',
    iconName: 'Maximize2',
    keywords: [
      'resize pdf', 'change page size', 'scale pdf', 'a4 to letter', 
      'letter to a4', 'paper size', 'normalize page dimensions'
    ]
  },
  {
    id: 'adjust-pdf-margins',
    name: 'Adjust Margins',
    href: '/adjust-pdf-margins',
    description: 'Add extra border padding for hole punching, binder binding, or margin notes.',
    category: 'Organize',
    iconName: 'Maximize2',
    keywords: [
      'adjust margins', 'add margins to pdf', 'binder padding', 
      'hole punch margin', 'gutter margin', 'pad margins'
    ]
  },
  {
    id: 'equalize-pdf-page-sizes',
    name: 'Equalize Page Sizes',
    href: '/equalize-pdf-page-sizes',
    description: 'Standardize mixed Letter, Legal, and A4 pages into a uniform size.',
    category: 'Organize',
    iconName: 'Columns',
    keywords: [
      'equalize page sizes', 'uniform page size', 'standardize pdf dimensions', 
      'fix mixed page sizes', 'make pages same size'
    ]
  },
  {
    id: 'n-up-pdf',
    name: 'N-up PDF',
    href: '/n-up-pdf',
    description: 'Place 2, 4, 6, 8, or 9 PDF pages onto a single sheet.',
    category: 'Organize',
    iconName: 'LayoutGrid',
    keywords: [
      'n up pdf', 'multiple pages per sheet', '2 up pdf', '4 up pdf', 
      'handout printer', 'nup', 'print slides'
    ]
  },
  {
    id: 'booklet-pdf',
    name: 'Booklet Maker',
    href: '/booklet-pdf',
    description: 'Convert PDF into a saddle-stitch booklet for double-sided printing.',
    category: 'Organize',
    iconName: 'BookOpen',
    keywords: [
      'booklet pdf', 'booklet maker', 'saddle stitch', 
      'print booklet', 'folding booklet', 'make booklet'
    ]
  },
  {
    id: 'header-footer',
    name: 'Header & Footer',
    href: '/header-footer',
    description: 'Stamp custom text at the top and bottom of every page.',
    category: 'Organize',
    iconName: 'AlignCenter',
    keywords: [
      'header footer', 'add header to pdf', 'add footer to pdf', 
      'running header', 'page header', 'stamp header'
    ]
  },
  {
    id: 'pdf-toc-builder',
    name: 'PDF TOC Builder',
    href: '/pdf-toc-builder',
    description: 'Add, edit, or reorganize clickable outline bookmarks and table of contents.',
    category: 'Organize',
    iconName: 'BookMarked',
    keywords: [
      'pdf toc builder', 'table of contents', 'pdf bookmarks', 
      'outline builder', 'navigation outline', 'create toc'
    ]
  },

  // ==================== EDIT & SIGN ====================
  {
    id: 'edit-pdf',
    name: 'Edit PDF',
    href: '/edit-pdf',
    description: 'Add text, shapes, highlights, freehand drawings, and annotations.',
    category: 'Edit & Sign',
    badge: 'Popular',
    iconName: 'Edit',
    keywords: [
      'edit pdf', 'editor', 'annotate', 'write on pdf', 'draw on pdf', 'fill form', 
      'pdf filler', 'highlight', 'type on pdf', 'pdf editor'
    ]
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    href: '/sign-pdf',
    description: 'Add digital or drawn signatures and initials to your PDF documents.',
    category: 'Edit & Sign',
    badge: 'Popular',
    iconName: 'FileSignature',
    keywords: [
      'sign pdf', 'signature', 'esign', 'sign document', 'initials', 
      'autograph', 'firmar', 'pdf signer', 'digital signature'
    ]
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark PDF',
    href: '/watermark-pdf',
    description: 'Stamp custom text or image watermarks across your PDF pages.',
    category: 'Edit & Sign',
    iconName: 'Type',
    keywords: [
      'watermark', 'stamp', 'confidential watermark', 'logo stamp', 
      'text watermark', 'brand', 'watermark pdf', 'add watermark'
    ]
  },
  {
    id: 'add-page-numbers',
    name: 'Page Numbers',
    href: '/add-page-numbers',
    description: 'Add custom page numbering, headers, and footers to your PDF.',
    category: 'Edit & Sign',
    iconName: 'Hash',
    keywords: [
      'page numbers', 'add page numbers', 'paginate', 'numbering', 
      'footer numbers', 'bates', 'number pdf'
    ]
  },
  {
    id: 'bates-numbering',
    name: 'Bates Numbering',
    href: '/bates-numbering',
    description: 'Sequential legal stamping with custom prefix, suffix, and zero-padding.',
    category: 'Edit & Sign',
    iconName: 'BookMarked',
    keywords: [
      'bates numbering', 'bates stamp', 'legal numbering', 
      'discovery numbering', 'bates code', 'sequential numbering'
    ]
  },
  {
    id: 'fillable-pdf-builder',
    name: 'Fillable Form Builder',
    href: '/fillable-pdf-builder',
    description: 'Design interactive forms with fillable text inputs, checkboxes, and buttons.',
    category: 'Edit & Sign',
    iconName: 'Sliders',
    keywords: [
      'fillable form builder', 'create pdf form', 'interactive form', 
      'acroform builder', 'pdf form maker', 'form designer'
    ]
  },
  {
    id: 'stamp-pdf',
    name: 'Batch Rubber Stamp',
    href: '/stamp-pdf',
    description: 'Stamp APPROVED, CONFIDENTIAL, DRAFT, or custom status stamps on PDF.',
    category: 'Edit & Sign',
    iconName: 'Stamp',
    keywords: [
      'stamp pdf', 'rubber stamp', 'approved stamp', 
      'confidential stamp', 'draft stamp', 'status stamp'
    ]
  },

  // ==================== SECURITY & AUDIT ====================
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    href: '/compress-pdf',
    description: 'Reduce file size while preserving maximum visual quality locally.',
    category: 'Security',
    badge: 'Popular',
    iconName: 'Minimize2',
    keywords: [
      'compress', 'reduce size', 'shrink', 'downsize', 'optimize', 'make smaller', 
      'compressor', 'reduce mb', 'kb size', 'comprimir', 'klein', 'compress pdf', 
      'pdf compressor', 'shrink pdf'
    ]
  },
  {
    id: 'protect-pdf',
    name: 'Protect / Lock PDF',
    href: '/protect-pdf',
    description: 'Encrypt your PDF with a strong password to prevent unauthorized access.',
    category: 'Security',
    badge: 'Popular',
    iconName: 'Shield',
    keywords: [
      'protect', 'lock', 'password', 'encrypt', 'secure', 'add password', 
      'security', 'protect pdf', 'lock pdf', 'password protect pdf'
    ]
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    href: '/unlock-pdf',
    description: 'Remove password and security restrictions from your PDF document.',
    category: 'Security',
    badge: 'Popular',
    iconName: 'Unlock',
    keywords: [
      'unlock', 'remove password', 'decrypt', 'unprotect', 'remove security', 
      'desbloquear', 'unlock pdf', 'remove password from pdf'
    ]
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    href: '/redact-pdf',
    description: 'Draw black boxes over sensitive content — permanently burned client-side.',
    category: 'Security',
    iconName: 'EyeOff',
    keywords: [
      'redact', 'blackout', 'hide text', 'sanitize', 'remove pii', 
      'censor', 'redact pdf', 'pdf redaction'
    ]
  },
  {
    id: 'auto-redact-pdf',
    name: 'Auto-Redact PDF',
    href: '/auto-redact-pdf',
    description: 'Scan & redact sensitive PII (SSNs, emails, credit cards) automatically.',
    category: 'Security',
    badge: 'New',
    iconName: 'ShieldAlert',
    keywords: [
      'auto redact pdf', 'smart redaction', 'pii redaction', 
      'redact ssn', 'redact credit card', 'redact email', 'privacy'
    ]
  },
  {
    id: 'prevent-copy',
    name: 'Prevent Copy',
    href: '/prevent-copy',
    description: 'Rasterize pages to disable text selection, highlighting, and copying.',
    category: 'Security',
    iconName: 'Copy',
    keywords: [
      'prevent copy', 'disable copy', 'protect text from copying', 
      'make pdf non-copyable', 'prevent text selection', 'disable copying'
    ]
  },
  {
    id: 'certify-pdf',
    name: 'Certify PDF',
    href: '/certify-pdf',
    description: 'Stamp SHA-256 fingerprint certificate QR code onto PDF to verify integrity.',
    category: 'Security',
    iconName: 'Stamp',
    keywords: [
      'certify pdf', 'document integrity', 'sha 256 certificate', 
      'tamper proof pdf', 'document fingerprint', 'document certification'
    ]
  },
  {
    id: 'verify-signature',
    name: 'Verify Signature',
    href: '/verify-signature',
    description: 'Inspect digital certificates and verify signed PDF integrity.',
    category: 'Security',
    iconName: 'ShieldCheck',
    keywords: [
      'verify signature', 'check digital signature', 'validate pdf signature', 
      'signature certificate inspector', 'verify signed pdf'
    ]
  },
  {
    id: 'pdf-security-auditor',
    name: 'Security Auditor',
    href: '/pdf-security-auditor',
    description: 'Audit PDF encryption strength (AES-128/256) and permissions.',
    category: 'Security',
    iconName: 'ShieldCheck',
    keywords: [
      'security auditor', 'audit pdf security', 'check encryption', 
      'pdf permissions checker', 'encryption strength'
    ]
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    href: '/flatten-pdf',
    description: 'Merge forms and annotation layers into static read-only text.',
    category: 'Security',
    iconName: 'Layers',
    keywords: [
      'flatten pdf', 'flatten forms', 'lock form fields', 
      'merge layers', 'read only pdf', 'flatten annotations'
    ]
  },

  // ==================== UTILITIES & ADVANCED ====================
  {
    id: 'pdf-ocr',
    name: 'PDF OCR',
    href: '/pdf-ocr',
    description: 'Convert scanned documents and images in PDFs into selectable, searchable text.',
    category: 'Utilities',
    badge: 'Popular',
    iconName: 'FileSearch',
    keywords: [
      'ocr', 'optical character recognition', 'extract text', 'scanned pdf', 
      'searchable pdf', 'read text', 'pdf ocr', 'ocr pdf', 'text recognition'
    ]
  },
  {
    id: 'compare-pdf',
    name: 'Compare PDF',
    href: '/compare-pdf',
    description: 'Audit document differences side-by-side with synchronized scrolling.',
    category: 'Utilities',
    iconName: 'Columns',
    keywords: [
      'compare pdf', 'pdf diff', 'side by side compare', 
      'document comparison', 'find differences', 'diff checker'
    ]
  },
  {
    id: 'pdf-visual-diff',
    name: 'PDF Visual Diff',
    href: '/pdf-visual-diff',
    description: 'Audit document revisions with visual pixel diff curtain sliders.',
    category: 'Utilities',
    badge: 'New',
    iconName: 'SplitSquareVertical',
    keywords: [
      'pdf visual diff', 'pixel comparison', 'curtain slider', 
      'visual revision diff', 'visual compare'
    ]
  },
  {
    id: 'grayscale-pdf',
    name: 'Grayscale PDF',
    href: '/grayscale-pdf',
    description: 'Convert colorful PDF documents to black and white for efficient printing.',
    category: 'Utilities',
    iconName: 'Printer',
    keywords: [
      'grayscale pdf', 'black and white pdf', 'b&w pdf', 
      'monochrome pdf', 'printer friendly pdf', 'convert to black and white'
    ]
  },
  {
    id: 'invert-pdf',
    name: 'Invert PDF',
    href: '/invert-pdf',
    description: 'Pixel-invert every page for eye strain reduction in dark mode.',
    category: 'Utilities',
    iconName: 'Moon',
    keywords: [
      'invert pdf', 'dark mode pdf', 'night mode pdf', 
      'invert colors', 'negative pdf', 'dark reader'
    ]
  },
  {
    id: 'pdf-reading-themes',
    name: 'PDF Reading Themes',
    href: '/pdf-reading-themes',
    description: 'Apply Sepia, Warm Amber, Soft Mint, or Dark filters to PDF pages.',
    category: 'Utilities',
    iconName: 'Moon',
    keywords: [
      'pdf reading themes', 'sepia pdf', 'warm reading filter', 
      'eye strain filter', 'reading mode'
    ]
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    href: '/repair-pdf',
    description: 'Recover corrupted PDF files by rebuilding cross-reference tables.',
    category: 'Utilities',
    iconName: 'Wrench',
    keywords: [
      'repair pdf', 'fix corrupted pdf', 'recover broken pdf', 
      'pdf repair tool', 'fix damaged pdf'
    ]
  },
  {
    id: 'pdf-metadata',
    name: 'PDF Metadata',
    href: '/pdf-metadata',
    description: 'View and edit hidden document properties: title, author, and tags.',
    category: 'Utilities',
    iconName: 'Info',
    keywords: [
      'pdf metadata', 'edit pdf properties', 'change pdf title', 
      'pdf author', 'document info', 'edit metadata'
    ]
  },
  {
    id: 'read-aloud-pdf',
    name: 'Read Aloud PDF',
    href: '/read-aloud-pdf',
    description: 'Listen to PDF text using browser speech synthesis.',
    category: 'Utilities',
    iconName: 'Volume2',
    keywords: [
      'read aloud', 'read aloud pdf', 'text to speech pdf', 
      'listen to pdf', 'voice reader', 'tts pdf'
    ]
  },
  {
    id: 'pdf-accessibility-checker',
    name: 'Accessibility Checker',
    href: '/pdf-accessibility-checker',
    description: 'Audit PDF for screen-reader WCAG compliance and document tagging.',
    category: 'Utilities',
    badge: 'New',
    iconName: 'Accessibility',
    keywords: [
      'accessibility checker', 'wcag pdf', 'pdf/ua', 
      'screen reader audit', 'accessible pdf', 'compliance check'
    ]
  },
  {
    id: 'pdf-attachment-manager',
    name: 'PDF Attachment Manager',
    href: '/pdf-attachment-manager',
    description: 'Extract ZUGFeRD e-invoices or embed files inside PDF containers.',
    category: 'Utilities',
    badge: 'New',
    iconName: 'Paperclip',
    keywords: [
      'pdf attachment manager', 'extract attachments', 'embed file in pdf', 
      'zugferd', 'invoice attachments', 'attach files'
    ]
  },
  {
    id: 'pdf-3d-flipbook',
    name: '3D PDF Flipbook',
    href: '/pdf-3d-flipbook',
    description: 'Turn PDF e-books and brochures into 3D double-page flipbooks.',
    category: 'Utilities',
    badge: 'New',
    iconName: 'BookOpen',
    keywords: [
      '3d pdf flipbook', 'flipbook maker', 'page turn effect', 
      'interactive brochure', '3d reader'
    ]
  },
  {
    id: 'pdf-presentation-mode',
    name: 'PDF Presentation Mode',
    href: '/pdf-presentation-mode',
    description: 'Present slides with digital laser pointer, pen annotations & timer.',
    category: 'Utilities',
    badge: 'New',
    iconName: 'Monitor',
    keywords: [
      'pdf presentation mode', 'present pdf', 'slide show pdf', 
      'laser pointer', 'meeting presenter', 'full screen slides'
    ]
  }
];

// Stemming and synonym normalizer for high-intent search terms
const INTENT_STEMS: Record<string, string> = {
  converter: 'convert',
  convertor: 'convert',
  converting: 'convert',
  conversion: 'convert',
  converts: 'convert',
  merger: 'merge',
  merging: 'merge',
  merges: 'merge',
  combiner: 'combine',
  combining: 'combine',
  splitter: 'split',
  splitting: 'split',
  splits: 'split',
  divider: 'divide',
  compressor: 'compress',
  compressing: 'compress',
  compression: 'compress',
  compresses: 'compress',
  shrink: 'compress',
  shrinker: 'compress',
  rotator: 'rotate',
  rotating: 'rotate',
  rotation: 'rotate',
  rotates: 'rotate',
  editor: 'edit',
  editing: 'edit',
  edits: 'edit',
  signer: 'sign',
  signing: 'sign',
  signature: 'sign',
  signatures: 'sign',
  numberer: 'number',
  numbering: 'number',
  numbers: 'number',
  organizer: 'organize',
  organizing: 'organize',
  remover: 'delete',
  removing: 'delete',
  deleter: 'delete',
  deleting: 'delete',
  extractor: 'extract',
  extracting: 'extract',
  maker: 'make',
  builder: 'build',
  creator: 'create',
  generator: 'generate',
  auditor: 'audit',
  checker: 'check',
  cropper: 'crop',
  cropping: 'crop',
  redactor: 'redact',
  redacting: 'redact',
  redaction: 'redact',
  printer: 'print',
  reader: 'read',
  reading: 'read',
  viewer: 'view',
  scanner: 'scan',
  scanning: 'scan',
  optimizer: 'optimize',
  unlocker: 'unlock',
  locker: 'lock',
  protector: 'protect'
};

// Common conversational filler words in user search queries
const FILLER_WORDS = new Set([
  'a', 'an', 'the', 'to', 'for', 'in', 'on', 'with', 'from', 'into', 
  'pdf', 'pdfs', 'tool', 'tools', 'online', 'free', 'file', 'files', 
  'document', 'documents', 'how', 'can', 'i'
]);

export function searchTools(query: string): PDFTool[] {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    return ALL_TOOLS;
  }

  const rawTerms = cleanQuery.split(/\s+/).filter(Boolean);
  
  // Non-filler terms provide core intent (e.g. ['word', 'converter'])
  const significantTerms = rawTerms.filter(t => !FILLER_WORDS.has(t));
  const activeTerms = significantTerms.length > 0 ? significantTerms : rawTerms;

  // Compute normalized stems
  const stemmedTerms = activeTerms.map(term => INTENT_STEMS[term] || term);

  const scoredTools: { tool: PDFTool; score: number }[] = [];

  for (const tool of ALL_TOOLS) {
    const nameLower = tool.name.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const catLower = tool.category.toLowerCase();
    const keywordsJoined = tool.keywords.join(' ').toLowerCase();
    const allText = `${nameLower} ${descLower} ${catLower} ${keywordsJoined}`;

    let score = 0;

    // 1. Exact match with clean query
    if (nameLower === cleanQuery) {
      score += 1000;
    } else if (nameLower.startsWith(cleanQuery)) {
      score += 500;
    } else if (nameLower.includes(cleanQuery)) {
      score += 300;
    }

    // 2. Keyword exact match
    if (tool.keywords.some(k => k.toLowerCase() === cleanQuery)) {
      score += 400;
    } else if (tool.keywords.some(k => k.toLowerCase().includes(cleanQuery))) {
      score += 200;
    }

    // 3. Match each active / stemmed search term
    let matchedTermsCount = 0;

    for (let i = 0; i < activeTerms.length; i++) {
      const term = activeTerms[i];
      const stem = stemmedTerms[i];

      const nameHas = nameLower.includes(term) || nameLower.includes(stem);
      const kwHas = keywordsJoined.includes(term) || keywordsJoined.includes(stem);
      const descHas = descLower.includes(term) || descLower.includes(stem);

      if (nameHas) {
        score += 120;
        matchedTermsCount++;
      } else if (kwHas) {
        score += 80;
        matchedTermsCount++;
      } else if (descHas) {
        score += 30;
        matchedTermsCount++;
      }
    }

    // Require all significant search terms (or their stems) to match
    if (matchedTermsCount >= activeTerms.length) {
      // Small bonus for popular badge
      if (tool.badge === 'Popular') score += 10;
      scoredTools.push({ tool, score });
    }
  }

  // Sort by score descending, then by name
  return scoredTools
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .map(entry => entry.tool);
}
