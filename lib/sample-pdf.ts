'use client';

/**
 * Generates an in-memory sample PDF file directly in the browser using pdf-lib.
 * Used for instant 1-click demos by users and AdSense/Quality raters without requiring them
 * to hunt for their own files.
 */
export async function createSamplePdf(): Promise<File> {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Page 1
  const page1 = pdfDoc.addPage([595, 842]); // Standard A4
  page1.drawText('iCreatePDF — Interactive Demo Document', {
    x: 50,
    y: 770,
    size: 20,
    font,
    color: rgb(0.48, 0.32, 0.94), // Brand purple
  });

  page1.drawText('100% Client-Side WebAssembly Processing (Zero Server Uploads)', {
    x: 50,
    y: 740,
    size: 11,
    font: regularFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  page1.drawRectangle({
    x: 50,
    y: 500,
    width: 495,
    height: 210,
    borderColor: rgb(0.85, 0.85, 0.9),
    borderWidth: 1,
    color: rgb(0.97, 0.97, 0.99),
  });

  page1.drawText('Sample Section: Document Verification & Audit', {
    x: 70,
    y: 680,
    size: 14,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  const bodyText = [
    'This sample document was generated dynamically in your browser memory (RAM).',
    'No network calls or server-side APIs were contacted during its creation.',
    'You can use this file to test merging, splitting, compressing, converting, or signing.',
    'All cryptographic operations and page vector calculations execute locally on your device.',
  ];

  bodyText.forEach((line, index) => {
    page1.drawText(line, {
      x: 70,
      y: 645 - index * 24,
      size: 10,
      font: regularFont,
      color: rgb(0.25, 0.25, 0.25),
    });
  });

  page1.drawText('Page 1 of 2 — iCreatePDF Sample Document', {
    x: 50,
    y: 40,
    size: 9,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Page 2
  const page2 = pdfDoc.addPage([595, 842]);
  page2.drawText('Sample Document — Page 2 (Appendix & Notes)', {
    x: 50,
    y: 770,
    size: 18,
    font,
    color: rgb(0.48, 0.32, 0.94),
  });

  page2.drawText('Specifications: ISO 32000-1 Compliant PDF Vector Stream', {
    x: 50,
    y: 740,
    size: 10,
    font: regularFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  page2.drawText('Page 2 of 2 — End of Sample Document', {
    x: 50,
    y: 40,
    size: 9,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes], 'iCreatePDF_Sample_Document.pdf', {
    type: 'application/pdf',
  });
}
