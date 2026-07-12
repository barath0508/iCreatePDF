# iCreatePDF — 100% Client-Side PDF Utilities

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?logo=tailwind-css)](https://tailwindcss.com)

**iCreatePDF** is a fast, free, and privacy-focused document processing suite. By utilizing modern web APIs, WebAssembly, and client-side JavaScript, all file processing happens entirely inside your local browser memory buffer. 

*Your files, documents, and private sheets never cross the network boundary and are never uploaded to any remote server.*

---

## 🚀 Key Features

iCreatePDF is loaded with **37+ local PDF utilities** grouped by category:

### 1. File Conversion
- **HEIC to PDF:** Convert high-efficiency photos into standard PDF sheets.
- **Word to PDF / TXT to PDF:** Translate `.docx` or raw text files into formatted PDFs locally.
- **HTML to PDF / Markdown to PDF:** Write code or markup templates and compile them directly into PDFs.
- **PDF to JPG / PNG:** Extract PDF pages into high-fidelity image files.

### 2. Page & Document Management
- **Merge & Split PDF:** Combine files or extract specific page ranges visually.
- **Organize & Delete Pages:** Reorder, rotate, or strip pages using browser canvas previews.
- **Compress & Repair PDF:** Decrease file stream sizes and rebuild broken document cross-references.
- **Booklet Imposition:** Rearrange and scale pages double-sided for brochure printing.

### 3. Annotation & Security
- **Fillable PDF Builder (NEW):** Overlay text inputs, checkboxes, dropdown selectors, and radio buttons onto flat templates to generate interactive PDF forms.
- **Edit & Sign PDF:** Type annotations, draw vector paths, or stamp signatures directly on PDF canvases.
- **Redact PDF:** Permanently burn black concealment boxes over sensitive text layers.
- **Protect & Unlock PDF:** Apply strong local user/owner password encryption or strip locks.
- **PDF Metadata Editor:** View and clean hidden properties (Author, Creator app, etc.).

---

## 🛠️ Tech Stack & Libraries

To achieve zero-server rendering and processing, the project integrates:
- **Core Framework:** Next.js (App Router, Turbopack) & React 19.
- **Styling:** CSS & Tailwind CSS.
- **PDF Stamping & Generation:** [pdf-lib](https://github.com/Hopding/pdf-lib) (form widgets, page layout, password protections).
- **PDF Rendering & Text Parsing:** [pdfjs-dist](https://github.com/mozilla/pdf.js) (browser preview rendering).
- **OCR Character Recognition:** [Tesseract.js](https://github.com/naptha/tesseract.js) (local neural network engine).

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18+ recommended)
- `npm` or `pnpm`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/barath0508/iCreatePDF.git
   cd iCreatePDF
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build Production Bundle
To compile and optimize static routes for production:
```bash
npm run build
npm start
```

---

## 📄 License

This project is open-source and licensed under the **[MIT License](LICENSE)**.
