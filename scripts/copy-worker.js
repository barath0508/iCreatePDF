const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destDir = path.join(__dirname, '..', 'public', 'workers');
const dest = path.join(destDir, 'pdf.worker.min.mjs');

if (fs.existsSync(src)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log('Successfully copied pdf.worker.min.mjs to public/workers/');
} else {
  console.warn('pdf.worker.min.mjs not found in node_modules/pdfjs-dist/build/');
}
