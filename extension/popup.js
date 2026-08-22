const TOOLS = [
  // Popular
  { name: 'Merge PDF', slug: 'merge-pdf', icon: '📑', desc: 'Combine multiple PDFs', category: 'organize', popular: true },
  { name: 'Compress PDF', slug: 'compress-pdf', icon: '🗜️', desc: 'Reduce file size', category: 'popular', popular: true },
  { name: 'PDF to Word', slug: 'pdf-to-word', icon: '📝', desc: 'Convert to .docx', category: 'convert', popular: true },
  { name: 'JPG to PDF', slug: 'jpg-to-pdf', icon: '🖼️', desc: 'Convert images to PDF', category: 'convert', popular: true },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg', icon: '🌄', desc: 'Extract pages as images', category: 'convert', popular: true },
  { name: 'Edit PDF', slug: 'edit-pdf', icon: '✏️', desc: 'Add text, forms & shapes', category: 'edit', popular: true },
  { name: 'Sign PDF', slug: 'sign-pdf', icon: '✍️', desc: 'Draw & apply signatures', category: 'edit', popular: true },
  { name: 'Split PDF', slug: 'split-pdf', icon: '✂️', desc: 'Extract page ranges', category: 'organize', popular: true },
  { name: 'Protect PDF', slug: 'protect-pdf', icon: '🔒', desc: 'Encrypt with password', category: 'security', popular: true },
  { name: 'Unlock PDF', slug: 'unlock-pdf', icon: '🔓', desc: 'Remove password', category: 'security', popular: true },
  { name: 'PDF OCR', slug: 'pdf-ocr', icon: '🔍', desc: 'Recognize scanned text', category: 'convert', popular: true },
  { name: 'Organize PDF', slug: 'organize-pdf', icon: '🗂️', desc: 'Reorder & rotate pages', category: 'organize', popular: true },

  // Convert Tools
  { name: 'Word to PDF', slug: 'word-to-pdf', icon: '📄', desc: 'Convert .docx to PDF', category: 'convert' },
  { name: 'Excel to PDF', slug: 'excel-to-pdf', icon: '📊', desc: 'Convert sheets to PDF', category: 'convert' },
  { name: 'PDF to Excel', slug: 'pdf-to-excel', icon: '📈', desc: 'Extract tables to .xlsx', category: 'convert' },
  { name: 'PNG to PDF', slug: 'png-to-pdf', icon: '🖼️', desc: 'Convert PNG images', category: 'convert' },
  { name: 'HEIC to PDF', slug: 'heic-to-pdf', icon: '📱', desc: 'Convert iPhone photos', category: 'convert' },
  { name: 'HTML to PDF', slug: 'html-to-pdf', icon: '🌐', desc: 'Web page to PDF', category: 'convert' },
  { name: 'Markdown to PDF', slug: 'markdown-to-pdf', icon: '📑', desc: 'Compile MD notes', category: 'convert' },
  { name: 'TXT to PDF', slug: 'txt-to-pdf', icon: '📋', desc: 'Plain text to PDF', category: 'convert' },
  { name: 'CSV to PDF', slug: 'csv-to-pdf', icon: '📑', desc: 'Format tabular CSV', category: 'convert' },
  { name: 'EPUB to PDF', slug: 'epub-to-pdf', icon: '📚', desc: 'Ebook to PDF', category: 'convert' },
  { name: 'SVG to PDF', slug: 'svg-to-pdf', icon: '🎨', desc: 'Vector SVG to PDF', category: 'convert' },
  { name: 'Scan to PDF', slug: 'scan-to-pdf', icon: '📷', desc: 'Webcam/Camera scan', category: 'convert' },
  { name: 'PDF to Text', slug: 'pdf-to-text', icon: '📄', desc: 'Extract raw text', category: 'convert' },
  { name: 'Base64 to PDF', slug: 'base64-to-pdf', icon: '💾', desc: 'Decode base64 string', category: 'convert' },
  { name: 'QR to PDF', slug: 'qr-to-pdf', icon: '🏁', desc: 'Generate QR printable', category: 'convert' },
  { name: 'Barcode to PDF', slug: 'barcode-to-pdf', icon: '🏷️', desc: 'Printable barcodes', category: 'convert' },

  // Edit & Sign
  { name: 'Watermark PDF', slug: 'watermark-pdf', icon: '💧', desc: 'Add text/image stamp', category: 'edit' },
  { name: 'Page Numbers', slug: 'add-page-numbers', icon: '🔢', desc: 'Insert numbering', category: 'edit' },
  { name: 'Header & Footer', slug: 'header-footer', icon: '🔝', desc: 'Add custom headers', category: 'edit' },
  { name: 'Fillable Form Builder', slug: 'fillable-pdf-builder', icon: '📋', desc: 'Create interactive forms', category: 'edit' },
  { name: 'Crop PDF', slug: 'crop-pdf', icon: '📐', desc: 'Trim page margins', category: 'edit' },
  { name: 'Bates Numbering', slug: 'bates-numbering', icon: '⚖️', desc: 'Legal indexing code', category: 'edit' },
  { name: 'Rubber Stamp', slug: 'stamp-pdf', icon: '🛑', desc: 'APPROVED / DRAFT stamp', category: 'edit' },
  { name: 'PDF TOC Builder', slug: 'pdf-toc-builder', icon: '📑', desc: 'Generate bookmarks', category: 'edit' },

  // Organize
  { name: 'Rotate PDF', slug: 'rotate-pdf', icon: '🔄', desc: 'Rotate page orientation', category: 'organize' },
  { name: 'Delete Pages', slug: 'delete-pdf-pages', icon: '🗑️', desc: 'Remove unwanted pages', category: 'organize' },
  { name: 'Extract Pages', slug: 'extract-pages', icon: '📤', desc: 'Save specific pages', category: 'organize' },
  { name: 'N-Up Grid PDF', slug: 'n-up-pdf', icon: '🖨️', desc: 'Multiple pages per sheet', category: 'organize' },
  { name: 'Booklet Maker', slug: 'booklet-pdf', icon: '📖', desc: 'Saddle-stitch layouts', category: 'organize' },
  { name: 'Adjust Margins', slug: 'adjust-pdf-margins', icon: '📏', desc: 'Expand/shrink margins', category: 'organize' },
  { name: 'Equalize Page Sizes', slug: 'equalize-pdf-page-sizes', icon: '📐', desc: 'Standardize to A4/Letter', category: 'organize' },
  { name: 'Extract Images', slug: 'extract-pdf-images', icon: '🖼️', desc: 'Export embedded photos', category: 'organize' },
  { name: 'Extract Form Data', slug: 'export-pdf-form-data', icon: '📊', desc: 'Export forms to CSV', category: 'organize' },

  // Security & Advanced
  { name: 'Redact PDF', slug: 'redact-pdf', icon: '⬛', desc: 'Black out sensitive data', category: 'security' },
  { name: 'Auto Redact (PII)', slug: 'auto-redact-pdf', icon: '🛡️', desc: 'Auto-detect SSN & Emails', category: 'security' },
  { name: 'Prevent Copy', slug: 'prevent-copy', icon: '🚫', desc: 'Disable copy & printing', category: 'security' },
  { name: 'Certify PDF', slug: 'certify-pdf', icon: '🔏', desc: 'SHA-256 fingerprint hash', category: 'security' },
  { name: 'Verify Signature', slug: 'verify-signature', icon: '✅', desc: 'Audit digital signatures', category: 'security' },
  { name: 'Security Auditor', slug: 'pdf-security-auditor', icon: '🕵️', desc: 'Inspect encryption & ACLs', category: 'security' },
  { name: 'Repair PDF', slug: 'repair-pdf', icon: '🩹', desc: 'Fix corrupted PDF syntax', category: 'security' },
  { name: 'Flatten PDF', slug: 'flatten-pdf', icon: '📄', desc: 'Lock form layers', category: 'security' },
  { name: 'Grayscale PDF', slug: 'grayscale-pdf', icon: '⚫', desc: 'B&W printer optimization', category: 'security' },
  { name: 'Invert Dark Mode', slug: 'invert-pdf', icon: '🌙', desc: 'Night reading mode', category: 'security' },
  { name: 'Compare PDF Diff', slug: 'compare-pdf', icon: '⚖️', desc: 'Visual side-by-side diff', category: 'security' },
  { name: 'Read Aloud (TTS)', slug: 'read-aloud-pdf', icon: '🔊', desc: 'Hands-free voice reader', category: 'security' },
  { name: '3D Flipbook', slug: 'pdf-3d-flipbook', icon: '📖', desc: 'Interactive 3D reader', category: 'security' },
  { name: 'Presentation Mode', slug: 'pdf-presentation-mode', icon: '📽️', desc: 'Fullscreen slideshow tool', category: 'security' },
  { name: 'Accessibility Audit', slug: 'pdf-accessibility-checker', icon: '♿', desc: 'WCAG 2.1 / PDF-UA check', category: 'security' },
];

const BASE_URL = 'https://icreatepdf.online';

let currentCategory = 'all';
let searchQuery = '';

const searchInput = document.getElementById('search-input');
const categoryTabs = document.getElementById('category-tabs');
const toolsGrid = document.getElementById('tools-grid');
const noResults = document.getElementById('no-results');

function openTool(slug) {
  const url = `${BASE_URL}/${slug}?ref=chrome_extension`;
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.create({ url });
  } else {
    window.open(url, '_blank');
  }
}

function renderTools() {
  const query = searchQuery.trim().toLowerCase();
  
  const filtered = TOOLS.filter(tool => {
    const matchesCategory = 
      currentCategory === 'all' ||
      (currentCategory === 'popular' && tool.popular) ||
      tool.category === currentCategory;

    const matchesSearch = 
      !query ||
      tool.name.toLowerCase().includes(query) ||
      tool.desc.toLowerCase().includes(query) ||
      tool.slug.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  toolsGrid.innerHTML = '';

  if (filtered.length === 0) {
    toolsGrid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    toolsGrid.style.display = 'grid';
    noResults.style.display = 'none';

    filtered.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div class="tool-icon">${tool.icon}</div>
        <div class="tool-info">
          <div class="tool-name">${tool.name}</div>
          <div class="tool-desc">${tool.desc}</div>
        </div>
      `;

      card.addEventListener('click', () => openTool(tool.slug));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') openTool(tool.slug);
      });

      toolsGrid.appendChild(card);
    });
  }
}

// Search Input Listener
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderTools();
});

// Category Tab Listeners
categoryTabs.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCategory = tab.dataset.category;
    renderTools();
  });
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Enter' && document.activeElement === searchInput) {
    const firstCard = toolsGrid.querySelector('.tool-card');
    if (firstCard) {
      firstCard.click();
    }
  }
});

// Initial Render
renderTools();
