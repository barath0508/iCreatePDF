const fs = require('fs');
const path = require('path');

const htmlFiles = [
  { file: 'es.html', lang: 'es' },
  { file: 'hi.html', lang: 'hi' },
  { file: 'ta.html', lang: 'ta' }
];

const basePath = path.join(__dirname, '.next', 'server', 'app');

htmlFiles.forEach(({ file, lang }) => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace the lang attribute in the html tag
      // Matches `<html lang="en"` or `<html lang='en'` or `<html lang=en`
      const modifiedContent = content.replace(/(<html[^>]*lang=["'])(en)(["'])/i, `$1${lang}$3`);
      
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`Successfully patched ${file} lang attribute to "${lang}".`);
    } catch (err) {
      console.error(`Error patching ${file}:`, err);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
