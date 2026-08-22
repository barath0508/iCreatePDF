const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function packageExtension() {
  const zip = new JSZip();
  const extensionDir = path.join(__dirname, '../extension');
  const outputZipPath = path.join(__dirname, '../icreatepdf-chrome-extension.zip');

  function addFolderToZip(folderPath, zipFolder) {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(file);
        addFolderToZip(fullPath, subFolder);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(file, fileData);
      }
    }
  }

  console.log('Packaging extension files into ZIP...');
  addFolderToZip(extensionDir, zip);

  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(outputZipPath, content);

  console.log(`\nExtension packaged successfully!`);
  console.log(`Saved ZIP archive to: ${outputZipPath}`);
  console.log(`File size: ${(content.length / 1024).toFixed(2)} KB`);
}

packageExtension().catch(err => {
  console.error('Error packaging extension:', err);
  process.exit(1);
});
