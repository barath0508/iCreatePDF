const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../extension/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const publicDir = path.join(__dirname, '../public');

// Source icon files
const src16 = path.join(publicDir, 'favicon-16x16.png');
const src32 = path.join(publicDir, 'favicon-32x32.png');
const src128 = path.join(publicDir, 'apple-icon.png');
const srcFallback = path.join(publicDir, 'icon.png');

// Copy or create icon files
if (fs.existsSync(src16)) {
  fs.copyFileSync(src16, path.join(iconsDir, 'icon16.png'));
} else {
  fs.copyFileSync(srcFallback, path.join(iconsDir, 'icon16.png'));
}

if (fs.existsSync(src32)) {
  fs.copyFileSync(src32, path.join(iconsDir, 'icon32.png'));
  fs.copyFileSync(src32, path.join(iconsDir, 'icon48.png'));
} else {
  fs.copyFileSync(srcFallback, path.join(iconsDir, 'icon32.png'));
  fs.copyFileSync(srcFallback, path.join(iconsDir, 'icon48.png'));
}

if (fs.existsSync(src128)) {
  fs.copyFileSync(src128, path.join(iconsDir, 'icon128.png'));
} else {
  fs.copyFileSync(srcFallback, path.join(iconsDir, 'icon128.png'));
}

console.log('Successfully generated extension icons in extension/icons/');
