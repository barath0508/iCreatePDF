import { ALL_TOOLS, PDFTool } from './tools-data';

export interface ToolTechSpec {
  inputFormats: string;
  outputFormat: string;
  engine: string;
  memoryLimit: string;
  architectureBlurb: string;
}

const SPEC_OVERRIDES: Record<string, Partial<ToolTechSpec>> = {
  'merge-pdf': {
    inputFormats: 'PDF (.pdf, ISO 32000-1 / ISO 32000-2)',
    outputFormat: 'Single Merged PDF (.pdf)',
    engine: 'pdf-lib 1.17 + WebAssembly Buffer Pipeline',
    memoryLimit: 'Up to 500MB total batch (bounded by browser RAM)',
    architectureBlurb:
      'The Merge PDF engine operates by ingesting binary ArrayBuffers of each submitted PDF directly into browser heap memory using pdf-lib. It deserializes cross-reference tables (xref), merges PDF catalog and page trees sequentially without re-compressing unaltered streams, updates object identifiers, and serializes the merged output within local RAM. Zero document bytes are transmitted across external networks, guaranteeing total privacy.',
  },
  'split-pdf': {
    inputFormats: 'PDF (.pdf, any page count)',
    outputFormat: 'Individual PDF Pages or Selected Range (.pdf)',
    engine: 'pdf-lib 1.17 + Native ArrayBuffer Slicing',
    memoryLimit: 'Up to 400MB (processes page ranges in parallel)',
    architectureBlurb:
      'The Split PDF pipeline reads the parent document structure into client memory, clones selected page dictionary references into newly instantiated PDF documents, and copies dependent fonts, resources, and graphics states. Unselected pages are discarded immediately from browser RAM, outputting clean, lightweight individual PDFs in milliseconds without cloud latency.',
  },
  'compress-pdf': {
    inputFormats: 'PDF (.pdf with images, vector art, or forms)',
    outputFormat: 'Compressed High-Efficiency PDF (.pdf)',
    engine: 'HTML5 Canvas 2D + Flate Stream Optimizer',
    memoryLimit: 'Up to 350MB (dynamic canvas downsampling buffer)',
    architectureBlurb:
      'The PDF Compression engine inspects embedded raster assets, fonts, and uncompressed stream objects. Heavy bitmap images are rendered onto offscreen canvas contexts and re-encoded using configurable quality quantization, while structural cross-reference streams and duplicate font descriptors are deduplicated. The re-encoded PDF binary is assembled locally in browser memory, reducing payload sizes by up to 85% while keeping private files secure.',
  },
  'jpg-to-pdf': {
    inputFormats: 'JPG, JPEG, PNG, WEBP, HEIC, BMP',
    outputFormat: 'ISO-Compliant Multi-Page PDF (.pdf)',
    engine: 'HTML5 Canvas 2D + heic2any + pdf-lib',
    memoryLimit: 'Up to 300MB total image payload',
    architectureBlurb:
      'The JPG to PDF conversion module ingests standard image formats (JPEG, PNG, WebP, HEIC, BMP) into browser memory, computing intrinsic aspect ratios and optimal page geometries (A4, Letter, Auto-Fit). Each image is wrapped as an independent PDF image XObject dictionary with appropriate color-space flags (DeviceRGB). Pages are synthesized through client-side WebAssembly routines, producing standard ISO 32000-compliant documents instantly without remote uploads.',
  },
  'png-to-pdf': {
    inputFormats: 'PNG (.png with alpha transparency channel)',
    outputFormat: 'Vector PDF with embedded PNG XObjects (.pdf)',
    engine: 'pdf-lib 1.17 + HTML5 Canvas Alpha Blending',
    memoryLimit: 'Up to 250MB',
    architectureBlurb:
      'The PNG to PDF engine preserves transparent alpha channels by packaging 32-bit RGBA pixel arrays into native PDF Soft Mask (SMask) dictionaries alongside standard DeviceRGB image streams. This ensures transparent logos, signatures, and illustrations render with pristine vector borders without server-side raster degradation.',
  },
  'edit-pdf': {
    inputFormats: 'Standard PDF (.pdf, all versions)',
    outputFormat: 'Annotated & Flattened PDF (.pdf)',
    engine: 'PDF.js 6.2 + HTML5 Vector Canvas + fontkit',
    memoryLimit: 'Up to 300MB (renders dynamically per viewport)',
    architectureBlurb:
      'The PDF Annotation & Editing engine creates an interactive HTML5 canvas overlay calibrated to the native viewport dimensions of the document via PDF.js. Vector lines, freehand ink coordinates, text annotations, and shape geometries are held in an ephemeral client state. Upon export, coordinates and typography are mapped directly into PDF vector content streams using fontkit and pdf-lib, baking annotations permanently into the document without cloud serialization.',
  },
  'extract-pdf-images': {
    inputFormats: 'PDF documents containing embedded images',
    outputFormat: 'Individual Images (.png / .jpg) & ZIP Archive',
    engine: 'Mozilla PDF.js Stream Parser + JSZip Client Engine',
    memoryLimit: 'Up to 400MB (streams memory sequentially)',
    architectureBlurb:
      'The Image Extraction engine employs Mozilla\'s PDF.js parsing layer to traverse the internal PDF dictionary hierarchy. It inspects all XObject resources within each page\'s resource dictionary, isolating raw DCTDecode (JPEG) and FlateDecode (PNG/lossless bitmap) data streams directly from memory buffers. These embedded images are decompressed into native image blobs and packaged into a ZIP archive via client-side JSZip, executing completely offline in device RAM.',
  },
  'pdf-ocr': {
    inputFormats: 'Scanned PDF, Image-Only PDF, Multi-Page Scans',
    outputFormat: 'Searchable PDF (.pdf with selectable text layer)',
    engine: 'Tesseract.js 7.0 (WebAssembly SIMD Engine)',
    memoryLimit: 'Up to 150MB / 50 pages per batch for optimal worker thread performance',
    architectureBlurb:
      'The Optical Character Recognition (OCR) engine runs Tesseract compiled to WebAssembly (WASM) with SIMD acceleration directly in a dedicated browser Web Worker thread. High-resolution canvas snapshots of each PDF page are analyzed through neural network LSTM models to detect text glyphs and bounding boxes. The extracted text layer is superimposed onto the original document coordinates, producing a fully searchable and copyable PDF entirely within client memory.',
  },
  'sign-pdf': {
    inputFormats: 'PDF (.pdf, contracts, agreements, invoices)',
    outputFormat: 'Signed PDF Document (.pdf)',
    engine: 'HTML5 Signature Canvas + pdf-lib Vector Embedder',
    memoryLimit: 'Up to 250MB',
    architectureBlurb:
      'The Sign PDF tool captures biometric mouse, trackpad, and touch input curves as smooth Bézier splines onto a high-DPI canvas. The resulting vector stamp is serialized into a transparent PNG buffer and mapped onto target page coordinates as an immutable PDF Form XObject dictionary. No signature images or documents ever touch an external server or third-party database.',
  },
  'redact-pdf': {
    inputFormats: 'PDF (.pdf, legal discovery, medical, tax records)',
    outputFormat: 'Irreversibly Redacted PDF (.pdf)',
    engine: 'pdf-lib 1.17 + Canvas Pixel Destruction Layer',
    memoryLimit: 'Up to 300MB',
    architectureBlurb:
      'Unlike basic PDF readers that merely draw black boxes over vector text (leaving hidden character strings copyable beneath), iCreatePDF\'s redaction engine completely obliterates the underlying text operators and character metrics within the specified bounding box coordinates, burning the redaction permanently into the document byte stream.',
  },
  'auto-redact-pdf': {
    inputFormats: 'PDF (.pdf containing sensitive PII)',
    outputFormat: 'Sanitized & Redacted PDF (.pdf)',
    engine: 'PDF.js Text Extractor + Regex PII Engine + pdf-lib',
    memoryLimit: 'Up to 250MB',
    architectureBlurb:
      'Auto-Redact scans the text layer in browser memory for SSNs, credit card numbers, email addresses, and phone numbers using client-side regular expression pattern matching. Bounding box coordinates are resolved in local viewport coordinates, and text operators are destroyed client-side, guaranteeing zero exposure of confidential PII.',
  },
  'word-to-pdf': {
    inputFormats: 'Microsoft Word (.docx, .doc)',
    outputFormat: 'Printable PDF Document (.pdf)',
    engine: 'docx-preview + HTML2PDF Client Compiler',
    memoryLimit: 'Up to 150MB',
    architectureBlurb:
      'The Word to PDF converter unpacks DOCX XML packaging structures (document.xml, styles.xml, numbering.xml) in memory via client-side DOM parsing, recreates paragraph typography and table flows, and compiles vector PDF pages without sending documents to third-party conversion APIs.',
  },
  'excel-to-pdf': {
    inputFormats: 'Microsoft Excel (.xlsx, .xls), CSV (.csv)',
    outputFormat: 'Structured PDF Table Document (.pdf)',
    engine: 'SheetJS / xlsx 0.20 + pdf-lib Autotable Generator',
    memoryLimit: 'Up to 200MB',
    architectureBlurb:
      'Spreadsheet workbooks are parsed into memory-efficient JavaScript objects using SheetJS. Cell matrices, formulas, column widths, and styles are mapped into paginated A4/Letter PDF table grids with repeat header rows, running 100% locally on your device.',
  },
  'pdf-to-word': {
    inputFormats: 'PDF (.pdf with embedded text layer)',
    outputFormat: 'Editable Microsoft Word Document (.docx)',
    engine: 'PDF.js 6.2 Text Extractor + docx XML Assembler',
    memoryLimit: 'Up to 200MB',
    architectureBlurb:
      'Extracts structured text paragraphs, font weights, line heights, and table geometries using PDF.js glyph position analyzers. The text hierarchy is assembled into an OpenXML (.docx) ZIP container in device memory without cloud parsing.',
  },
  'bates-numbering': {
    inputFormats: 'Legal discovery PDFs (.pdf)',
    outputFormat: 'Bates-Numbered Legal PDF (.pdf)',
    engine: 'pdf-lib 1.17 + @pdf-lib/fontkit Monospace Stamping',
    memoryLimit: 'Up to 500MB (handles thousands of discovery pages)',
    architectureBlurb:
      'Bates Numbering stamps sequential legal identifiers with customizable prefixes, zero-padding, and margin offsets onto each page dictionary. Monospace fonts are embedded directly into the document stream in browser RAM, ensuring courtroom-compliant pagination with zero upload risk.',
  },
  'pdf-attachment-manager': {
    inputFormats: 'PDF (.pdf) & attachments (XML, ZUGFeRD, ZIP, etc.)',
    outputFormat: 'PDF with Embedded Files (.pdf) / Extracted Attachments',
    engine: 'pdf-lib 1.17 EmbeddedFiles Dictionary Manager',
    memoryLimit: 'Up to 250MB',
    architectureBlurb:
      'Inspects and modifies the PDF document Catalog EmbeddedFiles name tree. It allows extracting ZUGFeRD e-invoices, XML manifests, and embedded source files, or attaching new binary streams into PDF container objects strictly in local memory.',
  },
  'ris-to-pdf': {
    inputFormats: 'RIS bibliography files (.ris, .txt)',
    outputFormat: 'Formatted Academic Bibliography PDF (.pdf)',
    engine: 'RIS Tag Parser + pdf-lib Typesetting Engine',
    memoryLimit: 'Up to 50MB (thousands of citations)',
    architectureBlurb:
      'Parses standardized Research Information Systems (RIS) tags (TY, AU, TI, PY, JO, DO) into structured citation entries (APA, MLA, Chicago, IEEE) and typesets them onto paginated PDF pages with proper hanging indents entirely in client JavaScript.',
  },
};

export function getToolTechSpec(slug: string, toolName: string, category: string): ToolTechSpec {
  const cleanSlug = slug.replace(/^(\/|tools\/)/, '').replace(/\/$/, '');
  const override = SPEC_OVERRIDES[cleanSlug];

  const defaultInput = category.toLowerCase().includes('convert to')
    ? 'Source Documents / Images'
    : 'PDF Document (.pdf, ISO 32000 standard)';

  const defaultOutput = category.toLowerCase().includes('convert from')
    ? 'Extracted Output File'
    : 'ISO 32000 Compliant PDF (.pdf)';

  const defaultEngine = 'pdf-lib 1.17 + Mozilla PDF.js (WebAssembly Sandbox)';
  const defaultMemory = 'Up to 300MB (allocated dynamically within browser heap)';
  const defaultBlurb = `The ${toolName} engine executes 100% client-side inside your browser sandbox. Using high-performance WebAssembly routines and local JavaScript array buffers, document structures and content streams are processed directly in your device's RAM. No files or document metadata are ever uploaded to remote servers.`;

  return {
    inputFormats: override?.inputFormats || defaultInput,
    outputFormat: override?.outputFormat || defaultOutput,
    engine: override?.engine || defaultEngine,
    memoryLimit: override?.memoryLimit || defaultMemory,
    architectureBlurb: override?.architectureBlurb || defaultBlurb,
  };
}

export interface RelatedLink {
  name: string;
  href: string;
  isTutorial?: boolean;
}

const TOOL_TUTORIAL_MAP: Record<string, { title: string; href: string }> = {
  'merge-pdf': { title: 'Merge PDF Tutorial', href: '/blogs/how-to-merge-pdf-files-free' },
  'split-pdf': { title: 'Split PDF Guide', href: '/blogs/how-to-split-pdf-files' },
  'compress-pdf': { title: 'Compress to 200KB Guide', href: '/blogs/how-to-compress-pdf-to-200kb-online' },
  'jpg-to-pdf': { title: 'JPG to PDF Complete Guide', href: '/blogs/jpg-to-pdf-complete-guide' },
  'pdf-to-jpg': { title: 'Save PDF as JPG Guide', href: '/blogs/how-to-save-pdf-as-jpg' },
  'word-to-pdf': { title: 'Word to PDF Guide', href: '/blogs/how-to-convert-word-docx-to-pdf-free' },
  'sign-pdf': { title: 'Sign PDF Online Guide', href: '/blogs/how-to-sign-pdf-online-free' },
  'redact-pdf': { title: 'PDF Redaction Guide', href: '/blogs/how-to-redact-pdf-online-free' },
  'auto-redact-pdf': { title: 'Auto-Redact PII Guide', href: '/blogs/how-to-redact-pdf-online-free' },
  'edit-pdf': { title: 'Edit PDF Online Guide', href: '/blogs/how-to-edit-pdf-online-free' },
  'pdf-ocr': { title: 'OCR Scanned PDF Guide', href: '/blogs/how-to-convert-scanned-pdf-to-text-ocr' },
  'rotate-pdf': { title: 'Rotate PDF Guide', href: '/blogs/how-to-rotate-pdf-pages' },
  'bates-numbering': { title: 'Bates Numbering Guide', href: '/blogs/bates-numbering-pdf-guide' },
  'extract-pdf-images': { title: 'Extract Images Guide', href: '/blogs/how-to-extract-images-from-pdf' },
  'scan-to-pdf': { title: 'Scan to PDF Guide', href: '/blogs/how-to-scan-documents-to-pdf' },
  'pdf-accessibility-checker': { title: 'WCAG Checker Guide', href: '/blogs/pdf-accessibility-checker-guide' },
  'organize-pdf': { title: 'Organize Pages Guide', href: '/blogs/how-to-organize-pdf-pages' },
  'delete-pdf-pages': { title: 'Delete Pages Guide', href: '/blogs/how-to-delete-pages-from-pdf' },
  'extract-pages': { title: 'Extract Pages Guide', href: '/blogs/how-to-extract-pages-from-pdf' },
  'repair-pdf': { title: 'Repair Corrupted PDF', href: '/blogs/how-to-repair-corrupted-pdf' },
  'protect-pdf': { title: 'Password Protect Guide', href: '/blogs/how-to-password-protect-and-unlock-pdf' },
  'unlock-pdf': { title: 'Unlock PDF Guide', href: '/blogs/how-to-password-protect-and-unlock-pdf' },
  'pdf-visual-diff': { title: 'Visual Diff Guide', href: '/blogs/how-to-compare-pdf-visual-diff' },
  'pdf-attachment-manager': { title: 'Attachment Manager Guide', href: '/blogs/how-to-manage-and-embed-pdf-attachments' },
};

export function getDynamicRelatedLinks(currentSlug: string): RelatedLink[] {
  const cleanSlug = currentSlug.replace(/^(\/|tools\/)/, '').replace(/\/$/, '');
  const currentTool = ALL_TOOLS.find((t) => t.id === cleanSlug || t.href === `/${cleanSlug}`);

  const category = currentTool?.category || 'Utilities';

  // Find siblings in the same category
  const sameCategory = ALL_TOOLS.filter(
    (t) => t.category === category && t.id !== cleanSlug && t.href !== `/${cleanSlug}`
  );

  // If needed, take from other categories
  const otherCategory = ALL_TOOLS.filter(
    (t) => t.category !== category && t.id !== cleanSlug && t.href !== `/${cleanSlug}`
  );

  const pickedTools = [...sameCategory, ...otherCategory].slice(0, 3);

  const links: RelatedLink[] = pickedTools.map((t) => ({
    name: t.name,
    href: t.href,
    isTutorial: false,
  }));

  // Add specific tutorial link
  const tutorial = TOOL_TUTORIAL_MAP[cleanSlug] || {
    title: 'Offline Security Verification',
    href: '/blogs/proof-zero-server-uploads-how-to-verify-offline-pdf-converter',
  };

  links.push({
    name: tutorial.title,
    href: tutorial.href,
    isTutorial: true,
  });

  return links;
}
