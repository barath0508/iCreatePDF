# icreatepdf-core

> 100% Client-side, zero-dependency PDF utility functions powered by [iCreatePDF](https://icreatepdf.online).

Merge, split, rotate, and manipulate PDF documents directly inside web browsers and Node.js environments without sending files to remote servers.

---

## 🌐 Live Web Studio
Try the full suite of 70+ free PDF tools online: **[https://icreatepdf.online](https://icreatepdf.online)**

- **[Merge PDF Online](https://icreatepdf.online/tools/merge-pdf)**
- **[Compress PDF Online](https://icreatepdf.online/tools/compress-pdf)**
- **[Split PDF Online](https://icreatepdf.online/tools/split-pdf)**
- **[PDF to Word Converter](https://icreatepdf.online/tools/pdf-to-word)**

---

## 📦 Installation

```bash
npm install icreatepdf-core pdf-lib
```

---

## ⚡ Quick Usage

### 1. Merge Multiple PDFs in Browser Memory
```typescript
import { mergePdfs } from 'icreatepdf-core';

// Pass ArrayBuffers from file inputs
const mergedBytes = await mergePdfs([pdfBuffer1, pdfBuffer2], (progress) => {
  console.log(`Merge progress: ${progress}%`);
});

// Download or render
const blob = new Blob([mergedBytes], { type: 'application/pdf' });
```

### 2. Split PDF by Custom Page Ranges
```typescript
import { splitPdf } from 'icreatepdf-core';

const splitDocs = await splitPdf(pdfBuffer, [
  { start: 1, end: 5 },
  { start: 6, end: 10 }
]);
```

---

## 🔒 Security & Privacy
This package executes operations strictly in local memory (`Uint8Array` / WebAssembly). No network requests or file uploads are ever performed.

---

## 📄 License
MIT © [iCreatePDF](https://icreatepdf.online)
