export interface ToolStep {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolContent {
  name: string;
  url: string;
  overview: string;
  steps: ToolStep[];
  useCases: string[];
  faqs: ToolFaq[];
}

export const toolContent: Record<string, ToolContent> = {
  'add-page-numbers': {
    name: 'Add Page Numbers to PDF',
    url: '/add-page-numbers',
    overview:
      'Numbering a PDF by hand or re-exporting from a source document just to add "Page X of Y" wastes time. iCreatePDF stamps sequential page numbers onto an existing PDF directly in your browser, so contracts, theses, reports, and manuals get consistent pagination without a trip through a desktop editor or a third-party upload.',
    steps: [
      { title: 'Upload your PDF', description: 'Drag in the document you want numbered. It loads locally — nothing leaves your device.' },
      { title: 'Pick a position', description: 'Choose top, bottom, left, or right alignment for the stamp on every page.' },
      { title: 'Set the label format', description: 'Use a plain counter or a "Page X of Y" style label, and choose the starting number.' },
      { title: 'Download the numbered PDF', description: 'Export the finished file instantly — no watermark, no page limit.' },
    ],
    useCases: [
      'Paginate a thesis, dissertation, or academic manuscript before submission',
      'Add page numbers to a legal contract or NDA before signing',
      'Number printed handouts, manuals, or training booklets',
      'Restore missing pagination on a scanned or merged PDF',
    ],
    faqs: [
      { question: 'Can I start numbering from a page other than 1?', answer: 'Yes. Set any starting number, which is useful when a numbered PDF continues from a previous volume or appendix.' },
      { question: 'Will page numbers overwrite existing content?', answer: 'No, the stamp is placed in the margin position you choose so it does not overlap your existing text or images.' },
      { question: 'Does this tool support "Page X of Y" formatting?', answer: 'Yes, you can choose a simple counter or the "Page X of Y" label format used in most legal and academic documents.' },
      { question: 'Is my document uploaded to a server?', answer: 'No. Numbering happens entirely client-side using WebAssembly, so your file never leaves your browser.' },
    ],
  },

  'bates-numbering': {
    name: 'Bates Numbering',
    url: '/bates-numbering',
    overview:
      'Bates numbering is the standard method litigation teams, paralegals, and compliance departments use to uniquely identify every page of a document. If you are looking for an EasyBates online alternative that is free and secure, iCreatePDF is the perfect choice. It applies sequential Bates stamps—with custom prefixes, padding, and suffixes—locally in your browser sandbox, so discovery files never touch a third-party server.',
    steps: [
      { title: 'Upload the document set', description: 'Add the PDF that needs sequential legal numbering.' },
      { title: 'Configure prefix and suffix', description: 'Enter identifiers like "SMITH-" or "-CONFIDENTIAL" to match your case naming convention.' },
      { title: 'Set the starting number and padding', description: 'Choose the first Bates number and how many digits to zero-pad (e.g. 000001).' },
      { title: 'Stamp and export', description: 'Apply the Bates numbers to every page and download the production-ready PDF.' },
    ],
    useCases: [
      'Stamp discovery documents for litigation and depositions',
      'Track sequential page IDs across a multi-volume case file',
      'Number medical records for insurance or malpractice review',
      'Apply compliance page stamps for regulatory submissions',
    ],
    faqs: [
      { question: 'What is Bates numbering used for?', answer: 'It gives every page of a legal or discovery document a unique, sequential identifier so it can be referenced precisely in court or during review.' },
      { question: 'Can I customize the prefix and suffix?', answer: 'Yes, you can set any prefix (e.g. case name) and suffix (e.g. confidentiality marking) alongside the padded number.' },
      { question: 'Is Bates numbering done locally?', answer: 'Yes, stamping runs entirely in your browser sandbox, which matters for privileged or confidential legal files.' },
      { question: 'How many digits can the padded number use?', answer: 'You can choose the padding length, so numbers display consistently as 000001, 0000001, or any width your case requires.' },
      { question: 'Is this tool a good EasyBates alternative?', answer: 'Yes! iCreatePDF is an excellent free EasyBates online alternative. There is no software to download or purchase, and the entire bates numbering process is completed 100% locally on your device, ensuring total privacy for legal documents.' },
    ],
  },

  'compare-pdf': {
    name: 'Compare PDF',
    url: '/compare-pdf',
    overview:
      'Spotting what changed between two contract drafts or report revisions by eye is slow and error-prone. iCreatePDF renders two PDF versions side-by-side with synchronized scrolling, so you can visually audit differences between redlines, revisions, or signed versions without installing diff software.',
    steps: [
      { title: 'Upload both versions', description: 'Add the original PDF and the revised PDF you want to compare.' },
      { title: 'Scroll through side-by-side', description: 'Both documents scroll together, keeping matching pages aligned.' },
      { title: 'Spot the differences', description: 'Visually identify added, removed, or altered content between the two versions.' },
      { title: 'No files leave your browser', description: 'Both PDFs stay local — nothing is uploaded for the comparison.' },
    ],
    useCases: [
      'Audit redlines between two contract drafts before signing',
      'Check what changed between two invoice or report revisions',
      'Verify a signed PDF matches the previously agreed version',
      'Compare scanned document versions for tampering or edits',
    ],
    faqs: [
      { question: 'Does the tool highlight exact text differences?', answer: 'It gives you synchronized side-by-side scrolling so matching pages line up, making visual differences easy to spot as you review.' },
      { question: 'Can I compare PDFs with a different number of pages?', answer: 'Yes, both documents load independently and scroll in sync as far as their page counts allow.' },
      { question: 'Are both PDFs uploaded to a server for comparison?', answer: 'No, both files are rendered and compared entirely in your browser — nothing is sent anywhere.' },
      { question: 'Is this useful for legal document review?', answer: 'Yes, it is commonly used to check contract redlines, revised agreements, and signed-vs-draft discrepancies.' },
    ],
  },

  'compress-pdf': {
    name: 'Compress PDF',
    url: '/compress-pdf',
    overview:
      'Large PDFs bounce off email attachment limits and slow down every share. iCreatePDF shrinks PDF file size by optimizing internal image streams and object structures, running the entire compression pipeline locally in your browser so oversized scans and reports become email-friendly without a quality-destroying re-export.',
    steps: [
      { title: 'Upload the oversized PDF', description: 'Add the file you need to shrink for email or storage.' },
      { title: 'Choose a compression level', description: 'Pick a balance between smaller file size and image quality.' },
      { title: 'Preview the size reduction', description: 'See the estimated new file size before downloading.' },
      { title: 'Download the compressed file', description: 'Get a smaller PDF, ready to email or upload, in seconds.' },
    ],
    useCases: [
      'Shrink a scanned document below an email attachment limit',
      'Reduce a portfolio or report PDF for faster website uploads',
      'Compress image-heavy PDFs before archiving',
      'Prepare smaller files for portals with strict file size caps',
    ],
    faqs: [
      { question: 'Will compression reduce text quality?', answer: 'Text and vector content stay sharp; compression mainly optimizes embedded images and internal PDF structures.' },
      { question: 'How much smaller will my file get?', answer: 'It depends on content — image-heavy scans typically shrink the most, while text-only PDFs see smaller gains.' },
      { question: 'Is compression done without uploading my file?', answer: 'Yes, the entire optimization runs client-side in your browser using WebAssembly.' },
      { question: 'Can I choose different compression strengths?', answer: 'Yes, you can select a compression level to balance file size against visual quality for your use case.' },
    ],
  },

  'crop-pdf': {
    name: 'Crop PDF',
    url: '/crop-pdf',
    overview:
      'Scanned pages often come with uneven borders, dark scanner edges, or excess whitespace that look unprofessional. iCreatePDF is a fast, offline alternative to online converters like i2pdf crop. It lets you crop page layouts, perform pdf cut pages operations, and trim margins from any side of every page in a PDF, cleaning up document scans and layouts entirely inside your browser.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document with scanner borders or unwanted margins.' },
      { title: 'Adjust the crop margins', description: 'Trim from the top, bottom, left, or right using a live preview.' },
      { title: 'Apply to all pages', description: 'Crop every page consistently, or fine-tune specific pages.' },
      { title: 'Export the cropped PDF', description: 'Download the trimmed document, ready to print or share.' },
    ],
    useCases: [
      'Remove black scanner borders from a scanned book or document',
      'Trim excess whitespace before printing a booklet',
      'Standardize margins across pages combined from different sources',
      'Crop out staple holes or edge artifacts from photocopies',
    ],
    faqs: [
      { question: 'Can I crop each side by a different amount?', answer: 'Yes, you can set independent trim values for the top, bottom, left, and right margins.' },
      { question: 'Does cropping affect the underlying text?', answer: 'No, cropping only changes the visible page boundary — the content itself is not altered or re-rendered.' },
      { question: 'Can I preview the crop before applying it?', answer: 'Yes, a live preview shows exactly what will be trimmed before you export the file.' },
      { question: 'Is the file processed locally?', answer: 'Yes, cropping runs entirely in your browser with no server upload.' },
      { question: 'How is this different from tools like i2pdf crop?', answer: 'Unlike i2pdf crop, which runs on remote servers where you must upload your files, iCreatePDF crops and trims your PDF documents 100% locally in your web browser. Your confidential document pages never leave your machine, making it a completely private and secure alternative.' },
      { question: 'Can I use this tool to cut pages from my PDF?', answer: 'Yes! If you need to cut pages to remove unwanted borders or margins, our Crop PDF tool is perfect. If you want to cut pages out of a document in terms of separating them into multiple files, you should use our [Split PDF](file:///split-pdf) tool.' },
    ],
  },

  'delete-pdf-pages': {
    name: 'Delete PDF Pages',
    url: '/delete-pdf-pages',
    overview:
      'Wondering how to cut a page from pdf easily or how to separate a page from a pdf? iCreatePDF lets you cut pdf pages, separate a page from pdf, and remove pages from a pdf document online for free. Whether you need to delete blank scans, duplicate cover sheets, or cut pages out of pdf files, our tool removes pages from a document in your browser sandbox without any uploads.',
    steps: [
      { title: 'Upload the PDF', description: 'Add the document containing pages you want to remove.' },
      { title: 'Enter the pages to delete', description: 'Specify single pages or ranges, e.g. 2, 5-8, 12.' },
      { title: 'Preview the remaining pages', description: 'Confirm which pages will stay before finalizing.' },
      { title: 'Download the cleaned PDF', description: 'Save the new file with the unwanted pages removed.' },
    ],
    useCases: [
      'Remove blank or duplicate scanned pages from a document',
      'Strip an outdated cover page or appendix before resending',
      'Trim a large report down to only the relevant sections',
      'Delete confidential pages before sharing an external copy',
    ],
    faqs: [
      { question: 'Can I delete a range of pages at once?', answer: 'Yes, enter ranges like 5-8 alongside individual page numbers such as 2 and 12 in a single pass.' },
      { question: 'Does deleting pages renumber the rest of the document?', answer: 'The remaining pages keep their content and order; any printed page-number stamps are unaffected unless you re-run the numbering tool.' },
      { question: 'Is there a limit to how many pages I can remove?', answer: 'No, there is no page-count restriction or file-size cap on this tool.' },
      { question: 'Are my files uploaded anywhere?', answer: 'No, page deletion happens entirely client-side in your browser.' },
      { question: 'Can I cut pdf pages from a document for free?', answer: 'Yes! Our tool is completely free with no usage limits. You can cut pages out of pdf files, remove unwanted ranges (like 2, 5-8), and download your updated PDF instantly.' },
      { question: 'How to separate a page from a PDF?', answer: 'To separate a page from a PDF, you can use our Delete PDF Pages tool (to remove unwanted pages and save the remaining ones) or use our [Split PDF](file:///split-pdf) / [Extract Pages](file:///extract-pages) tools to pull out specific pages into a new standalone PDF.' },
      { question: 'How to cut a page from a PDF or delete pages?', answer: 'Simply drag and drop your document into our Delete PDF Pages tool. Type in the page numbers or page ranges you want to cut (such as 2, 5-8), preview the result, and download the trimmed PDF. All processing happens 100% privately in your browser.' },
    ],
  },

  'edit-pdf': {
    name: 'Edit PDF',
    url: '/edit-pdf',
    overview:
      'Quick corrections to a PDF — adding a note, filling in a missing field, or annotating a clause — usually mean opening a heavier desktop editor. iCreatePDF lets you place text overlay annotations directly onto PDF pages in the browser, with custom colors and positioning, and writes them permanently into the document.',
    steps: [
      { title: 'Upload the PDF to edit', description: 'Add the document you want to annotate.' },
      { title: 'Click to place text', description: 'Add text boxes anywhere on the page and type your content.' },
      { title: 'Style the annotation', description: 'Adjust font size and color to match the document.' },
      { title: 'Save the edited PDF', description: 'Export the file with the overlays permanently written in.' },
    ],
    useCases: [
      'Fill in a missing field or note on a scanned form',
      'Add a clarifying comment to a shared contract',
      'Label diagrams or figures in a technical document',
      'Insert a quick correction without reopening the source file',
    ],
    faqs: [
      { question: 'Can I edit the original text inside the PDF?', answer: 'This tool adds new text overlays on top of the page rather than modifying existing embedded text, which covers most annotation and correction needs.' },
      { question: 'Can I change the color and size of added text?', answer: 'Yes, each text overlay supports custom font size and color.' },
      { question: 'Are the annotations permanent in the exported file?', answer: 'Yes, once exported the text overlays are written directly into the PDF page content.' },
      { question: 'Is editing done without uploading the file?', answer: 'Yes, all annotation happens locally in your browser.' },
    ],
  },

  'extract-pages': {
    name: 'Extract Pages from PDF',
    url: '/extract-pages',
    overview:
      'Sometimes you only need to separate a page from pdf or pull a handful of pages out of a much larger PDF — a single invoice from a batch export, or a chapter from a full manual. iCreatePDF pulls specific pages or ranges out of a document and saves them as a new standalone PDF, processed entirely in your browser.',
    steps: [
      { title: 'Upload the source PDF', description: 'Add the larger document you want to pull pages from.' },
      { title: 'Enter the pages you need', description: 'Use single numbers or ranges, e.g. 1,3,5-8.' },
      { title: 'Preview the selection', description: 'Confirm the exact pages that will be extracted.' },
      { title: 'Download the new PDF', description: 'Save just the selected pages as a standalone file.' },
    ],
    useCases: [
      'Pull a single invoice or receipt out of a bulk export',
      'Extract a chapter or appendix from a long manual',
      'Isolate a signed page from a longer contract',
      'Split out a specific applicant’s pages from a combined form batch',
    ],
    faqs: [
      { question: 'Can I extract non-consecutive pages?', answer: 'Yes, you can combine individual page numbers and ranges in one request, such as 1,3,5-8.' },
      { question: 'Does the original file get modified?', answer: 'No, the source PDF is untouched — extraction creates a brand new file with just the selected pages.' },
      { question: 'Is there a limit on how many pages I can extract?', answer: 'No, you can extract as many pages or ranges as your document contains.' },
      { question: 'Is the extraction done locally?', answer: 'Yes, everything runs client-side in your browser without any file upload.' },
      { question: 'How to separate a page from a PDF and keep it?', answer: 'To separate and save a specific page from a PDF, upload your file to our Extract Pages tool. Enter the page number you want to separate (e.g. 3) or a range (e.g. 5-8) and download the new standalone document. If you want to delete pages instead, use our [Delete PDF Pages](file:///delete-pdf-pages) tool.' },
    ],
  },

  'flatten-pdf': {
    name: 'Flatten PDF',
    url: '/flatten-pdf',
    overview:
      'Interactive form fields, comment layers, and annotations can be accidentally altered after a document is finalized. iCreatePDF merges form fields and annotation layers into static, non-editable page content directly in the browser, locking a PDF’s appearance for distribution or archiving.',
    steps: [
      { title: 'Upload the fillable PDF', description: 'Add the form or annotated document you want to lock down.' },
      { title: 'Flatten the layers', description: 'Merge form fields and annotations into the static page content.' },
      { title: 'Verify the result', description: 'Fields and comments now render as fixed content, not editable widgets.' },
      { title: 'Download the flattened PDF', description: 'Export the finalized, non-editable document.' },
    ],
    useCases: [
      'Lock a completed form so field values can no longer be changed',
      'Finalize a reviewed document before archiving or filing',
      'Prevent recipients from editing signature or initial fields',
      'Prepare a static print-ready version of an interactive form',
    ],
    faqs: [
      { question: 'What does flattening a PDF actually do?', answer: 'It converts interactive form fields and annotation layers into fixed page content, so they can no longer be edited or toggled.' },
      { question: 'Will the form still look the same after flattening?', answer: 'Yes, the visual appearance is preserved — only the interactivity is removed.' },
      { question: 'Can flattening be undone?', answer: 'No, flattening is permanent on the exported file, so keep your original fillable version if you may need to edit it again.' },
      { question: 'Does this process upload my document anywhere?', answer: 'No, flattening runs entirely in your browser memory space.' },
    ],
  },

  'grayscale-pdf': {
    name: 'Grayscale PDF',
    url: '/grayscale-pdf',
    overview:
      'Printing a color PDF on an office printer burns through color ink even when the content doesn’t need it. iCreatePDF converts every page of a PDF to black and white locally, giving you an ink-efficient version ready for printing without altering the original color file.',
    steps: [
      { title: 'Upload the color PDF', description: 'Add the document you want to convert to grayscale.' },
      { title: 'Convert to black and white', description: 'Every page is processed to remove color while preserving detail.' },
      { title: 'Preview the result', description: 'Check the grayscale output before downloading.' },
      { title: 'Download the print-ready file', description: 'Save the ink-saving black-and-white PDF.' },
    ],
    useCases: [
      'Prepare a color report for cheaper black-and-white office printing',
      'Convert colorful slides into a grayscale handout',
      'Reduce ink usage for bulk printed documents',
      'Create an accessible high-contrast version of a colorful PDF',
    ],
    faqs: [
      { question: 'Does grayscale conversion reduce file size too?', answer: 'It can, since flattening color channels sometimes lowers image data, though the primary purpose is print-ink savings, not compression.' },
      { question: 'Is the original color file kept?', answer: 'Yes, conversion produces a new grayscale file — your original color PDF is untouched.' },
      { question: 'Can I convert just some pages to grayscale?', answer: 'The tool processes the full document; keep a separate copy if you need mixed color and grayscale pages.' },
      { question: 'Is this processed on a server?', answer: 'No, the conversion runs entirely client-side in your browser.' },
    ],
  },

  'header-footer': {
    name: 'Add Header and Footer to PDF',
    url: '/header-footer',
    overview:
      'Company reports, legal filings, and manuals often need consistent headers and footers — a firm name, a document title, or a date stamp — repeated across every page. iCreatePDF stamps custom header and footer text onto a PDF, including automatic page-number tokens, entirely in your browser.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document that needs a header or footer.' },
      { title: 'Enter your header/footer text', description: 'Type custom text, and use {page} and {total} tokens for automatic numbering.' },
      { title: 'Position the stamps', description: 'Set alignment for the top header and bottom footer.' },
      { title: 'Download the stamped PDF', description: 'Export the document with headers and footers on every page.' },
    ],
    useCases: [
      'Add a company name and date to every page of a report',
      'Stamp a document title and confidentiality notice across a filing',
      'Include automatic "Page X of Y" footers on a manual',
      'Add a client or case reference to every page of a deliverable',
    ],
    faqs: [
      { question: 'Can headers include automatic page numbers?', answer: 'Yes, use the {page} and {total} tokens in your text and they will be replaced with the live page number and total page count.' },
      { question: 'Can I add both a header and a footer at once?', answer: 'Yes, you can configure independent text and alignment for the top header and bottom footer in the same pass.' },
      { question: 'Will the header overlap existing page content?', answer: 'No, the stamp is placed in the page margin so it sits above or below your existing content.' },
      { question: 'Is this done without uploading the file?', answer: 'Yes, header and footer stamping runs entirely in your browser.' },
    ],
  },

  'heic-to-pdf': {
    name: 'HEIC to PDF',
    url: '/heic-to-pdf',
    overview:
      "Photos saved in HEIC format on iOS devices often can't be opened on older devices or Windows. iCreatePDF is the ultimate heic to pdf iphone converter, turning HEIC and HEIF photos directly into a PDF inside your browser. Convert iPhone photos to PDF without installing an app or uploading your private files.",
    steps: [
      { title: 'Upload your HEIC photos', description: 'Drag in one or more .heic files exported from your camera roll.' },
      { title: 'Reorder if needed', description: 'Arrange multiple photos into the order you want them to appear.' },
      { title: 'Adjust page settings', description: 'Choose page size and orientation for the output PDF.' },
      { title: 'Download the PDF', description: 'Save a single PDF containing all converted photos.' },
    ],
    useCases: [
      'Convert mobile camera roll photos to PDF for computer viewing',
      'Combine multiple HEIC screenshots into a single shareable document',
      'Prepare mobile photo evidence or receipts as a PDF for email',
      'Archive HEIC photos in a widely compatible file format',
    ],
    faqs: [
      { question: 'Why won’t my high-efficiency photo open on my computer?', answer: 'Many modern phones save photos in the HEIC format by default, which many computers and older software don’t support — converting to PDF makes them viewable everywhere.' },
      { question: 'Can I convert multiple HEIC photos into one PDF?', answer: 'Yes, upload several HEIC files and they will be combined into a single multi-page PDF in the order you set.' },
      { question: 'Does converting HEIC to PDF reduce photo quality?', answer: 'No, the original image data is preserved at full resolution during conversion.' },
      { question: 'Are my personal photos uploaded to a server?', answer: 'No, HEIC decoding and PDF generation both happen locally in your browser.' },
      { question: 'How do I convert heic to pdf from my iPhone?', answer: 'Simply open iCreatePDF on your iPhone, select this HEIC to PDF tool, and upload your photos from your camera roll. The photos are converted to PDF locally on your device without leaving your browser.' },
      { question: 'How to convert heic to pdf on iphone for free?', answer: 'To convert HEIC to PDF on iPhone, open Safari or Chrome on your iPhone, navigate to iCreatePDF HEIC to PDF tool, tap inside the upload box, and select your photos directly from the Photo Library or Files app. Click convert and download the formatted PDF instantly. The files never leave your device!' },
    ],
  },

  'html-to-pdf': {
    name: 'HTML to PDF',
    url: '/html-to-pdf',
    overview:
      'Turning a styled HTML page or email template into a shareable, print-ready document usually requires a headless browser or a paid API. iCreatePDF compiles custom HTML and CSS directly into a formatted A4 PDF inside your own browser, so developers and marketers can generate documents without sending markup to a third-party service.',
    steps: [
      { title: 'Paste or write your HTML/CSS', description: 'Enter the markup and styles you want rendered.' },
      { title: 'Preview the layout', description: 'See how the content will look on an A4 page before exporting.' },
      { title: 'Adjust page settings', description: 'Set margins and orientation to match your template.' },
      { title: 'Download the compiled PDF', description: 'Export the rendered HTML as a clean PDF document.' },
    ],
    useCases: [
      'Generate a printable invoice from an HTML email template',
      'Compile a styled report or resume built with custom CSS',
      'Export a marketing landing page snippet as a shareable PDF',
      'Prototype PDF templates for an app without a server-side renderer',
    ],
    faqs: [
      { question: 'Does the tool support custom CSS styling?', answer: 'Yes, you can include CSS alongside your HTML to control fonts, colors, spacing, and layout in the rendered PDF.' },
      { question: 'Is my HTML sent to an external rendering server?', answer: 'No, rendering happens entirely inside your browser — your markup never leaves your device.' },
      { question: 'Can I control page size and margins?', answer: 'Yes, page dimensions and margins can be adjusted before exporting.' },
      { question: 'Does it support images and web fonts?', answer: 'Standard embedded images and CSS-declared fonts render as part of the compiled page.' },
      { question: 'How does this compare to PDFCrowd html to pdf converter?', answer: 'Unlike PDFCrowd html to pdf, which runs on a remote cloud server and enforces paid limits, iCreatePDF renders your HTML to PDF 100% locally in your web browser. This means it is completely free with no usage limits, operates offline, and ensures your markup and data never leave your local device.' },
    ],
  },

  'invert-pdf': {
    name: 'Invert PDF Colors',
    url: '/invert-pdf',
    overview:
      'Wondering how to invert pdf colors on your document? iCreatePDF is a fast, free pdf color inverter, pdf dark mode converter, and pdf reverse color tool. Reading a bright white PDF in a dark room strains the eyes and drains battery. We invert the red, green, and blue values of every page to produce a dark-mode version of your document, processed 100% locally in your browser so nothing is uploaded.',
    steps: [
      { title: 'Upload the PDF', description: 'Add the document you want to convert for night reading.' },
      { title: 'Invert the colors', description: 'Every page is processed to flip light backgrounds to dark and vice versa.' },
      { title: 'Preview the dark version', description: 'Check the inverted pages before exporting.' },
      { title: 'Download the dark-mode PDF', description: 'Save the eye-friendly version for night reading.' },
    ],
    useCases: [
      'Create a dark-mode version of an ebook or PDF for night reading',
      'Reduce eye strain when reviewing long documents at night',
      'Save white ink when printing text-heavy pages in reverse',
      'Improve readability on OLED e-readers and tablets in low light',
    ],
    faqs: [
      { question: 'Does inverting colors affect the text readability?', answer: 'No, text remains fully legible — only the color values are flipped, turning white backgrounds dark and dark text light.' },
      { question: 'Can I invert colored images inside the PDF too?', answer: 'Yes, the inversion applies to the full rendered page, including embedded images and diagrams.' },
      { question: 'Is this the same as a PDF reader’s built-in dark mode?', answer: 'It achieves a similar visual effect, but the inversion is baked into the file itself so it looks dark in any viewer, not just ones with a dark mode toggle.' },
      { question: 'Is the file processed without uploading?', answer: 'Yes, color inversion runs entirely client-side in your browser.' },
      { question: 'Why should I invert pdf colors online?', answer: 'Inverting PDF colors online creates a permanent dark mode version of your document. This is ideal for night reading, reducing eye strain in low-light environments, and saving screen battery or printing ink.' },
      { question: 'How do I use this PDF color inverter?', answer: 'To use our PDF color inverter, upload your PDF document to the tool above. Click the invert button, and our local engine will flip every pixel\'s color, turning white backgrounds black and dark text white. Download the dark-mode PDF, processed completely locally for maximum privacy.' },
    ],
  },

  'jpg-to-pdf': {
    name: 'JPG to PDF',
    url: '/jpg-to-pdf',
    overview:
      'Turning a batch of JPG or JPEG photos into a single shareable document is one of the most common PDF tasks. iCreatePDF converts JPG images to a high-quality PDF entirely in your browser — drag in multiple photos, reorder them, adjust sizing, and download instantly without any account or upload.',
    steps: [
      { title: 'Upload your JPG images', description: 'Drag and drop one or many JPG/JPEG photos.' },
      { title: 'Reorder the pages', description: 'Arrange images into the sequence you want in the final PDF.' },
      { title: 'Adjust page size', description: 'Choose page dimensions and image fit for the output.' },
      { title: 'Download the PDF', description: 'Export a single combined PDF from all your images.' },
    ],
    useCases: [
      'Combine scanned receipts or invoices into a single PDF for expense reports',
      'Turn photographed pages of a notebook or worksheet into a PDF',
      'Compile a photo portfolio or gallery into one shareable file',
      'Prepare identity or travel document photos as a single PDF upload',
    ],
    faqs: [
      { question: 'Can I convert multiple JPG files into one PDF at once?', answer: 'Yes, upload as many images as you need and they will be combined into a single multi-page PDF in the order you set.' },
      { question: 'Does this reduce the image quality?', answer: 'No, images are embedded at their original resolution unless you choose to adjust sizing.' },
      { question: 'Is there a file size or page limit?', answer: 'No, there are no artificial limits on file size or number of pages.' },
      { question: 'Are my photos uploaded to any server?', answer: 'No, conversion happens entirely in your browser using local processing.' },
    ],
  },

  'markdown-to-pdf': {
    name: 'Markdown to PDF',
    url: '/markdown-to-pdf',
    overview:
      'Need to convert markdown to pdf free and securely? iCreatePDF is a fast online markdown to pdf tool that compiles your styled Markdown (headings, lists, code blocks, and emphasis) into a clean, formatted A4 PDF directly in your browser. This means you can convert md to pdf online free with absolute privacy — no files ever leave your device.',
    steps: [
      { title: 'Write or paste your Markdown', description: 'Enter Markdown text with headings, lists, and formatting.' },
      { title: 'Preview the rendered layout', description: 'See exactly how the styled document will look before export.' },
      { title: 'Adjust page settings', description: 'Set page size and margins for the compiled PDF.' },
      { title: 'Download the PDF', description: 'Export your Markdown as a clean, formatted document.' },
    ],
    useCases: [
      'Turn README or documentation files into a shareable PDF online',
      'Compile meeting notes or a markdown online pdf resume',
      'Export formatted reports from developer notes instantly',
      'Convert technical specs, changelogs, or general markdow to pdf layouts',
    ],
    faqs: [
      { question: 'What markdown syntax does this online markdown to pdf tool support?', answer: 'Standard elements render correctly, including headings, bold/italic text, lists, links, and code blocks.' },
      { question: 'Can I style the output PDF?', answer: 'Yes, page size and margins can be configured, and standard Markdown formatting maps to clean PDF typography.' },
      { question: 'Is this md to pdf online free tool secure?', answer: 'Yes, absolutely. The entire compile-to-PDF process happens locally in your browser, meaning your files never touch any external server.' },
      { question: 'Can I convert long documents with many sections?', answer: 'Yes, there is no length limit — the tool paginates automatically across as many A4 pages as needed.' },
    ],
  },

  'merge-pdf': {
    name: 'Merge PDF',
    url: '/merge-pdf',
    overview:
      'Combining bank statements, scanned receipts, or multiple report sections into one file is one of the most requested PDF operations — and one of the most sensitive, since financial and personal documents shouldn’t need to touch a stranger’s server. iCreatePDF merges multiple PDF files into a single document entirely client-side via WebAssembly.',
    steps: [
      { title: 'Upload multiple PDFs', description: 'Add all the files you want combined into one document.' },
      { title: 'Reorder the files', description: 'Drag files into the exact sequence you want in the final PDF.' },
      { title: 'Merge the documents', description: 'Combine every file into a single, continuous PDF.' },
      { title: 'Download the merged file', description: 'Save the combined document instantly.' },
    ],
    useCases: [
      'Combine monthly bank or credit card statements into one file',
      'Merge scanned receipts for an expense report submission',
      'Join multiple chapters or sections of a report into a final document',
      'Consolidate signed contract pages from different sources',
    ],
    faqs: [
      { question: 'How many PDFs can I merge at once?', answer: 'There is no fixed limit — you can combine as many files as you need in a single pass.' },
      { question: 'Can I reorder files before merging?', answer: 'Yes, drag and drop files into the exact sequence you want them to appear in the final document.' },
      { question: 'Is merging done without uploading sensitive files?', answer: 'Yes, all merging happens locally in your browser sandbox via WebAssembly — your files are never sent to a server.' },
      { question: 'Will merging affect the quality of the original pages?', answer: 'No, each page is combined as-is with no re-compression or quality loss.' },
    ],
  },

  'organize-pdf': {
    name: 'Organize PDF',
    url: '/organize-pdf',
    overview:
      'Scanned documents rarely come out in the right order, and reports assembled from multiple sources often need a page or two rotated or dropped. iCreatePDF gives you a visual page-thumbnail view of a PDF where you can drag to reorder, rotate, or flag pages for removal — all client-side, with an instant preview.',
    steps: [
      { title: 'Upload your PDF', description: 'Load the document you want to reorganize.' },
      { title: 'Drag thumbnails to reorder', description: 'Rearrange pages visually using a thumbnail grid.' },
      { title: 'Rotate or flag pages', description: 'Rotate individual pages or mark pages for removal.' },
      { title: 'Save the organized PDF', description: 'Export the document with your new page order applied.' },
    ],
    useCases: [
      'Fix the page order of a document scanned out of sequence',
      'Rotate a handful of sideways-scanned pages within a larger file',
      'Remove and reorder pages before combining sections from different scans',
      'Prepare a clean, correctly ordered PDF for printing or filing',
    ],
    faqs: [
      { question: 'Can I see thumbnails of every page before reordering?', answer: 'Yes, every page renders as a visual thumbnail so you can drag and confirm the new order at a glance.' },
      { question: 'Can I rotate just one page instead of the whole document?', answer: 'Yes, individual pages can be rotated independently of the rest of the file.' },
      { question: 'Does organizing pages also let me delete them?', answer: 'Yes, you can flag specific pages for removal in the same visual workflow.' },
      { question: 'Is the reordering processed locally?', answer: 'Yes, all thumbnail rendering and page manipulation happens client-side in your browser.' },
    ],
  },

  'pdf-metadata': {
    name: 'PDF Metadata Editor',
    url: '/pdf-metadata',
    overview:
      'Every PDF carries hidden metadata — title, author, subject, and keyword fields — that can leak a previous editor’s name or an outdated document title. iCreatePDF reads and updates these document properties directly in your browser, letting you clean up or correct metadata without uploading the file.',
    steps: [
      { title: 'Upload your PDF', description: 'Load the file whose properties you want to inspect or change.' },
      { title: 'View current metadata', description: 'See the existing title, author, subject, and keyword fields.' },
      { title: 'Edit the fields', description: 'Update or clear any property you want to change.' },
      { title: 'Save the updated PDF', description: 'Export the file with the new metadata applied.' },
    ],
    useCases: [
      'Remove a previous author’s name before distributing a document',
      'Update the title and subject fields for better file organization',
      'Clean hidden metadata before sharing a document externally',
      'Standardize keyword and creator fields across a document set',
    ],
    faqs: [
      { question: 'What metadata fields can I edit?', answer: 'You can view and update the title, author, subject, keywords, and creator fields embedded in the PDF.' },
      { question: 'Why would I want to remove metadata?', answer: 'Hidden fields can reveal information like the original author or software used, which some users prefer to clear before sharing a document.' },
      { question: 'Does editing metadata change the visible page content?', answer: 'No, metadata is a separate hidden layer — editing it does not alter the pages themselves.' },
      { question: 'Is metadata editing done on a server?', answer: 'No, metadata is read and rewritten entirely inside your browser.' },
    ],
  },

  'pdf-to-jpg': {
    name: 'PDF to JPG',
    url: '/pdf-to-jpg',
    overview:
      'Sometimes you need a PDF page as an image — to drop into a slide deck, post on social media, or preview in a system that doesn’t render PDFs. iCreatePDF converts every page of a PDF into a high-fidelity JPEG image locally in the browser and packages the results into a downloadable ZIP.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document you want converted to images.' },
      { title: 'Pages render as JPGs', description: 'Every page is converted to a high-quality JPEG image.' },
      { title: 'Preview each image', description: 'Check the converted pages before downloading.' },
      { title: 'Download the ZIP', description: 'Get every page as a JPG, packaged into a single ZIP file.' },
    ],
    useCases: [
      'Extract a single page as an image for a presentation slide',
      'Convert a PDF brochure into shareable social media images',
      'Turn a scanned document into images for an OCR pipeline',
      'Create image previews of a multi-page PDF for a website',
    ],
    faqs: [
      { question: 'Are all pages converted, or just one?', answer: 'Every page in the PDF is converted to its own JPG image, then bundled together for download.' },
      { question: 'What resolution are the output images?', answer: 'Pages render at high fidelity so text and details stay sharp in the resulting JPGs.' },
      { question: 'How do I download multiple converted pages at once?', answer: 'All converted JPGs are packaged into a single ZIP file for one-click download.' },
      { question: 'Is the PDF uploaded to a server for conversion?', answer: 'No, rendering happens entirely client-side in your browser.' },
    ],
  },

  'pdf-to-text': {
    name: 'PDF to Text',
    url: '/pdf-to-text',
    overview:
      'Copy-pasting from a PDF often mangles line breaks and spacing. If you want to convert pdf image to text, extract text from pdf, or convert pdf to machine readable format, iCreatePDF extracts the structured text layout of a PDF page-by-page directly in your browser. This gives you clean plain text you can paste into a note, search index, or another document without formatting artifacts. For scanned PDFs or images, please use our [PDF OCR (Scan to Text)](file:///pdf-ocr) tool.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document you want to extract text from.' },
      { title: 'Text extracts per page', description: 'The tool reads the structural text content of every page.' },
      { title: 'Review the extracted text', description: 'Check the output for accuracy before copying or saving.' },
      { title: 'Copy or download as TXT', description: 'Use the extracted text directly or export it as a plain text file.' },
    ],
    useCases: [
      'Pull quotes or passages out of a report for a citation',
      'Extract text from a PDF to feed into a search or indexing tool',
      'Get plain text from a contract for quick keyword searching',
      'Convert a PDF into editable plain text for reuse in another document',
    ],
    faqs: [
      { question: 'Does this work on scanned image-based PDFs?', answer: 'It extracts text that is embedded as selectable text in the PDF; purely scanned image pages without a text layer will not have extractable text. For scanned files, use our local [PDF OCR](file:///pdf-ocr) tool.' },
      { question: 'Is formatting like bold or italics preserved?', answer: 'No, the output is plain text — structural line and paragraph breaks are preserved but styling is not.' },
      { question: 'Can I extract text from just one page?', answer: 'Text is extracted page-by-page, so you can review and use the content from any individual page.' },
      { question: 'Is the extraction processed locally?', answer: 'Yes, everything runs client-side in your browser with no file upload.' },
      { question: 'How do I convert a scanned PDF or PDF image to text?', answer: 'For purely scanned image-based PDFs, a standard text extractor won\'t work. Instead, you need to use our [PDF OCR (Scan to Text)](file:///pdf-ocr) tool, which uses an in-browser neural network to read and recognize text from scanned document images and convert them into machine readable format.' },
    ],
  },

  'png-to-pdf': {
    name: 'PNG to PDF',
    url: '/png-to-pdf',
    overview:
      'PNG screenshots and graphics with transparency are common but awkward to share as a single document. iCreatePDF converts PNG images into a high-quality PDF entirely in the browser, letting you drag in multiple PNGs, reorder them, adjust sizing, and download a combined file instantly.',
    steps: [
      { title: 'Upload your PNG images', description: 'Drag and drop one or many PNG files.' },
      { title: 'Reorder the pages', description: 'Arrange images into the order you want in the final PDF.' },
      { title: 'Adjust page size', description: 'Choose the dimensions and image fit for the output document.' },
      { title: 'Download the PDF', description: 'Export a single combined PDF from all your PNG images.' },
    ],
    useCases: [
      'Combine multiple screenshots into a single shareable PDF',
      'Convert design mockups or diagrams exported as PNG into a PDF',
      'Compile transparent-background graphics into a print-ready document',
      'Turn a series of infographic slides into one PDF file',
    ],
    faqs: [
      { question: 'Does transparency in PNGs cause issues in the PDF?', answer: 'Transparent areas render against a white page background by default, matching standard PDF page conventions.' },
      { question: 'Can I combine many PNG files into one PDF?', answer: 'Yes, upload as many images as needed and they will be combined into a single multi-page PDF in your chosen order.' },
      { question: 'Does conversion reduce image quality?', answer: 'No, images are embedded without lossy re-compression unless you choose to adjust sizing.' },
      { question: 'Are my images uploaded to a server?', answer: 'No, conversion happens entirely in your browser.' },
    ],
  },

  'protect-pdf': {
    name: 'Protect PDF (Password Encrypt)',
    url: '/protect-pdf',
    overview:
      'Sharing a bank statement, tax form, or contract by email is safer when the file itself is locked. iCreatePDF encrypts a PDF with a password entirely inside your browser, setting secure owner and user passwords without ever transmitting the file or the password to a remote server.',
    steps: [
      { title: 'Upload the PDF to protect', description: 'Add the document you want to encrypt.' },
      { title: 'Set a password', description: 'Choose a user password required to open the file.' },
      { title: 'Configure permissions', description: 'Optionally restrict printing, copying, or editing.' },
      { title: 'Download the encrypted PDF', description: 'Save the password-protected file, ready to share securely.' },
    ],
    useCases: [
      'Password-protect a bank statement before emailing it',
      'Lock a contract or NDA so only the intended recipient can open it',
      'Restrict copying or printing on a sensitive internal document',
      'Encrypt tax forms or financial records before cloud storage',
    ],
    faqs: [
      { question: 'What encryption does the tool use?', answer: 'It applies standard PDF password encryption to lock the document, requiring the correct password to open it.' },
      { question: 'Can I restrict printing or copying separately from opening?', answer: 'Yes, you can configure permission restrictions independently of the password required to open the file.' },
      { question: 'Is my password ever sent to a server?', answer: 'No, the password and the file are both processed entirely in your browser memory.' },
      { question: 'Can I remove the password later?', answer: 'Yes, use the Unlock PDF tool with the correct password to remove the encryption.' },
    ],
  },

  'qr-to-pdf': {
    name: 'QR Code to PDF',
    url: '/qr-to-pdf',
    overview:
      'Need a reliable qr code to pdf converter or looking for a way to embed a qr code to pdf free? iCreatePDF generates a scannable QR code from any URL, text, or contact info and compiles it into a clean, print-ready A4 PDF layout. It works completely in your browser, providing a live preview and downloading your QR code as a PDF instantly without any signup.',
    steps: [
      { title: 'Enter your URL or text', description: 'Type the link, message, or contact info to encode.' },
      { title: 'Customize size and labels', description: 'Adjust the QR code size and add an optional caption.' },
      { title: 'Preview the layout', description: 'See the QR code positioned on the A4 page before exporting.' },
      { title: 'Download the PDF', description: 'Save a print-ready PDF containing your QR code.' },
    ],
    useCases: [
      'Generate a printable QR code flyer linking to a website or menu',
      'Create a QR code PDF for event check-in or ticketing',
      'Produce a scannable contact card for a business card insert',
      'Embed a Wi-Fi or app download QR code into a printed handout',
    ],
    faqs: [
      { question: 'What can the QR code encode?', answer: 'Any URL, plain text, or contact information you enter will be encoded into the generated QR code.' },
      { question: 'Can I add a label or caption under the QR code?', answer: 'Yes, you can add descriptive text alongside the code before generating the PDF.' },
      { question: 'Is the QR code generated locally?', answer: 'Yes, the QR image and PDF are both generated entirely in your browser.' },
      { question: 'What page size is the output PDF?', answer: 'The QR code is compiled onto a clean A4 page, ready for printing.' },
      { question: 'How does this qr to pdf converter work?', answer: 'Our online qr to pdf converter generates a high-quality vector QR code based on your inputs (like links, text, or phone numbers) and compiles it directly into a clean A4 PDF file. Everything is processed locally in your browser, ensuring complete privacy.' },
      { question: 'Is it free to generate a QR code PDF?', answer: 'Yes! iCreatePDF is a 100% free online QR to PDF compiler. There are no watermarks, no registration prompts, and no premium restrictions. You can generate and print as many QR code PDFs as you need.' },
      { question: 'How to convert qr code to pdf format?', answer: 'To convert or generate a QR code into a PDF, type your link or text into our qr code to pdf generator. Customize the size, margin, and label as needed. The tool generates the QR code and places it directly on a downloadable A4 PDF page immediately.' },
    ],
  },

  'barcode-to-pdf': {
    name: 'Barcode to PDF',
    url: '/barcode-to-pdf',
    overview:
      'Retail, logistics, and inventory workflows rely on barcode formats that a plain QR generator can\'t produce — Code 128 shipping labels, EAN-13 and UPC-A retail codes, Code 39 asset tags, and 2D formats like Data Matrix and PDF417. iCreatePDF renders any of these symbologies and compiles them into a clean, print-ready A4 PDF entirely in your browser.',
    steps: [
      { title: 'Choose a barcode type', description: 'Pick Code 128, EAN-13, UPC-A, Code 39, Data Matrix, or PDF417 depending on your use case.' },
      { title: 'Enter the content', description: 'Type the product code, SKU, or text to encode — each symbology shows a hint for its expected format.' },
      { title: 'Customize size and labels', description: 'Adjust the barcode size and add an optional title or description.' },
      { title: 'Download the PDF', description: 'Save a print-ready A4 PDF containing your barcode.' },
    ],
    useCases: [
      'Generate EAN-13 or UPC-A codes for retail product packaging',
      'Print Code 128 shipping and inventory labels',
      'Create Code 39 asset tags for equipment tracking',
      'Produce PDF417 or Data Matrix codes for ID cards and logistics documents',
    ],
    faqs: [
      { question: 'Which barcode format should I use?', answer: 'Use EAN-13 or UPC-A for retail products, Code 128 or Code 39 for shipping and inventory labels, and Data Matrix or PDF417 when you need to encode more data in a compact 2D code.' },
      { question: 'Why does EAN-13 or UPC-A reject my input?', answer: 'These formats require a specific digit count (12–13 digits for EAN-13, 11–12 for UPC-A) including a valid check digit. Double check the code matches the official format.' },
      { question: 'Is the barcode generated locally?', answer: 'Yes, the barcode image and PDF are both generated entirely in your browser — nothing is uploaded to a server.' },
      { question: 'What page size is the output PDF?', answer: 'The barcode is compiled onto a clean A4 page, ready for printing onto labels or documents.' },
    ],
  },

  'redact-pdf': {
    name: 'Redact PDF',
    url: '/redact-pdf',
    overview:
      'Simply drawing a black rectangle in an image editor doesn’t remove the underlying text — it just hides it, leaving sensitive data recoverable by copy-paste. iCreatePDF permanently burns redaction boxes into the page content, so social security numbers, account details, or names are genuinely destroyed, not just covered. Click Auto-Detect and it scans every page for emails, phone numbers, SSNs, IBANs, and credit card numbers, suggesting boxes you can accept or dismiss before anything is burned in — all without the file ever leaving your browser.',
    steps: [
      { title: 'Upload the PDF to redact', description: 'Add the document containing sensitive information.' },
      { title: 'Auto-detect or draw manually', description: 'Click Auto-Detect to scan for emails, phone numbers, SSNs, IBANs, and card numbers, or draw boxes by hand.' },
      { title: 'Review each suggestion', description: 'Click a suggested box to accept it, or the × to dismiss a false positive.' },
      { title: 'Burn in the redactions', description: 'The tool destroys the underlying content, not just the visual layer, and exports the finished PDF.' },
    ],
    useCases: [
      'Automatically find and black out a social security number before sharing a tax document',
      'Redact account numbers or card numbers from a bank statement sent to a third party',
      'Remove names, emails, or case details from a legal filing before public release',
      'Censor confidential figures from an internal report before external sharing',
    ],
    faqs: [
      { question: 'How does automatic detection work?', answer: 'iCreatePDF scans the text of every page in your browser for common PII patterns — emails, phone numbers, SSNs, IBANs, and credit card numbers (validated with a checksum to reduce false positives) — and shows each one as a suggested box you can accept or dismiss before anything is redacted.' },
      { question: 'Is the redacted text recoverable by copy-paste?', answer: 'No, redactions are burned permanently into the page content, so the underlying text and images are destroyed, not just visually covered.' },
      { question: 'Can I redact images as well as text?', answer: 'Yes, you can draw redaction boxes over any content, including embedded images and diagrams.' },
      { question: 'Is this different from a simple black box overlay?', answer: 'Yes — a plain black box overlay can be removed or the text copied from underneath; this tool destroys the underlying content permanently.' },
      { question: 'Is redaction processed without uploading the file?', answer: 'Yes, everything — including automatic PII detection — runs locally in your browser, which matters for sensitive personal or legal documents.' },
    ],
  },

  'repair-pdf': {
    name: 'Repair PDF',
    url: '/repair-pdf',
    overview:
      'A corrupted PDF that won’t open usually has a broken cross-reference table or damaged object stream, not fundamentally lost content. iCreatePDF attempts to rebuild these internal structures locally in your browser, recovering a readable document from files that other viewers refuse to open.',
    steps: [
      { title: 'Upload the corrupted PDF', description: 'Add the file that fails to open or displays errors.' },
      { title: 'Run the repair process', description: 'The tool rebuilds cross-reference tables and object streams.' },
      { title: 'Review the recovered content', description: 'Check how much of the document was successfully restored.' },
      { title: 'Download the repaired PDF', description: 'Save the fixed, readable version of your file.' },
    ],
    useCases: [
      'Recover a PDF that fails to open after an incomplete download',
      'Fix a damaged file received from an unreliable email attachment',
      'Restore a document corrupted by a failed save or transfer',
      'Rebuild an old archived PDF with outdated or broken structure',
    ],
    faqs: [
      { question: 'Can every corrupted PDF be repaired?', answer: 'Most structural corruption — broken cross-reference tables or object streams — can be rebuilt, though severely damaged or truncated files may only partially recover.' },
      { question: 'Will repair recover all the original content?', answer: 'In most cases yes, since the underlying page data is usually intact even when the file structure is broken.' },
      { question: 'Is the corrupted file uploaded to a server for repair?', answer: 'No, the entire recovery process runs locally in your browser.' },
      { question: 'What causes a PDF to become corrupted?', answer: 'Common causes include interrupted downloads, failed saves, transfer errors, or damage from an unreliable storage device.' },
    ],
  },

  'resize-pdf': {
    name: 'Resize PDF',
    url: '/resize-pdf',
    overview:
      'Documents assembled from multiple sources often end up with inconsistent page sizes — some Letter, some A4 — which looks unprofessional when printed or bound together. iCreatePDF normalizes every page in a PDF to a standard size like A4, Letter, A3, Legal, or A5, in portrait or landscape, without losing content.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document with inconsistent or non-standard page sizes.' },
      { title: 'Choose the target size', description: 'Select A4, Letter, A3, Legal, or A5.' },
      { title: 'Pick an orientation', description: 'Choose portrait or landscape for the output pages.' },
      { title: 'Download the resized PDF', description: 'Export a document with uniform page dimensions.' },
    ],
    useCases: [
      'Standardize a document combined from Letter and A4 sources',
      'Convert a US Letter-sized PDF to A4 for international printing',
      'Normalize scanned pages of mixed sizes into one consistent format',
      'Resize a presentation PDF for a specific print or binding format',
    ],
    faqs: [
      { question: 'Will resizing distort or crop my content?', answer: 'Content is scaled to fit the new page size while preserving proportions, so it stays legible without unexpected cropping.' },
      { question: 'What page sizes are supported?', answer: 'You can normalize pages to A4, Letter, A3, Legal, or A5, in either portrait or landscape orientation.' },
      { question: 'Can I resize just some pages in a document?', answer: 'The tool applies the chosen size to the entire document, ensuring consistency across every page.' },
      { question: 'Is resizing done locally?', answer: 'Yes, all page normalization happens entirely in your browser.' },
    ],
  },

  'rotate-pdf': {
    name: 'Rotate PDF',
    url: '/rotate-pdf',
    overview:
      'Pages scanned sideways or upside down are one of the most common PDF annoyances. iCreatePDF rotates specific pages or the entire document in seconds, letting you select rotation angles visually and download the corrected file instantly, all processed client-side.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document with pages that need rotating.' },
      { title: 'Select pages to rotate', description: 'Choose individual pages or apply rotation to the whole file.' },
      { title: 'Set the rotation angle', description: 'Rotate 90°, 180°, or 270° as needed.' },
      { title: 'Download the corrected PDF', description: 'Export the document with pages now facing the right way.' },
    ],
    useCases: [
      'Fix a handful of sideways pages in an otherwise correct scan',
      'Rotate an entire document scanned upside down',
      'Correct landscape pages mixed into a portrait document',
      'Straighten a photographed page before sharing or printing',
    ],
    faqs: [
      { question: 'Can I rotate just one page instead of the whole PDF?', answer: 'Yes, you can select individual pages to rotate independently or apply a bulk rotation to every page.' },
      { question: 'What rotation angles are available?', answer: 'You can rotate pages by 90, 180, or 270 degrees to correct any orientation issue.' },
      { question: 'Does rotating affect the file quality?', answer: 'No, rotation only changes page orientation metadata and layout — the underlying content is unchanged.' },
      { question: 'Is rotation processed without uploading the file?', answer: 'Yes, everything happens locally in your browser.' },
    ],
  },

  'scan-to-pdf': {
    name: 'Scan to PDF',
    url: '/scan-to-pdf',
    overview:
      'A dedicated scanner isn’t always available when you need to digitize a document quickly. iCreatePDF turns your phone or webcam camera into a document scanner, letting you capture, crop, and compile multiple pages into a single high-quality PDF entirely in your browser.',
    steps: [
      { title: 'Open your camera', description: 'Use your mobile or webcam camera directly in the browser.' },
      { title: 'Capture each page', description: 'Photograph document pages one at a time.' },
      { title: 'Crop and adjust', description: 'Trim borders and straighten each captured page.' },
      { title: 'Compile into a PDF', description: 'Combine all captured pages into a single downloadable PDF.' },
    ],
    useCases: [
      'Digitize a paper receipt or invoice on the go without a scanner',
      'Capture signed pages of a contract using your phone camera',
      'Scan a multi-page handout or worksheet into a single PDF',
      'Create a digital copy of an ID or form for an online submission',
    ],
    faqs: [
      { question: 'Do I need a dedicated scanner to use this tool?', answer: 'No, any device with a camera — phone or webcam — can be used to capture document pages directly in the browser.' },
      { question: 'Can I scan multiple pages into one PDF?', answer: 'Yes, capture as many pages as needed and they will be compiled into a single multi-page document.' },
      { question: 'Can I crop or straighten captured photos?', answer: 'Yes, each captured page can be cropped and adjusted before compiling into the final PDF.' },
      { question: 'Are captured photos uploaded anywhere?', answer: 'No, capturing, cropping, and compiling all happen locally in your browser.' },
    ],
  },

  'sign-pdf': {
    name: 'Sign PDF',
    url: '/sign-pdf',
    overview:
      'Printing a contract to sign it is slow, and third-party platforms pose privacy risks. iCreatePDF lets you add digital signature to pdf online for free. Whether you need to digitally sign pdf online, apply an electronic signature pdf free online, or e sign document online, our browser-based tool makes it simple. Draw, type, or upload your signature and stamp it directly onto PDF pages client-side, keeping your document and signature 100% private.',
    steps: [
      { title: 'Upload the document to sign', description: 'Add the contract, lease, or form that needs a signature.' },
      { title: 'Create your signature', description: 'Draw it with your mouse or finger, type it, or upload an image.' },
      { title: 'Place it on the page', description: 'Position and resize your signature exactly where it’s needed.' },
      { title: 'Download the signed PDF', description: 'Export the finished document, ready to send.' },
    ],
    useCases: [
      'Sign a lease agreement or rental contract without printing it',
      'Add a signature to an NDA or vendor contract before sending it back',
      'Countersign a document received by email in under a minute',
      'Sign a form for a job application or onboarding paperwork',
    ],
    faqs: [
      { question: 'Can I draw my signature with a mouse or touchscreen?', answer: 'Yes, you can draw a freehand signature, type a styled text signature, or upload an image of your existing signature.' },
      { question: 'Is a signature added this way legally binding?', answer: 'Electronic signatures are broadly recognized for most everyday contracts; check specific jurisdiction and document requirements for high-stakes legal use.' },
      { question: 'Can I reposition my signature after placing it?', answer: 'Yes, you can move and resize the signature on the page before finalizing the document.' },
      { question: 'Is my signature or document uploaded to a server?', answer: 'No, the entire signing process runs locally in your browser sandbox.' },
      { question: 'How can I add digital signature to pdf online free?', answer: 'Simply upload your PDF, create your signature by drawing, typing, or uploading an image, and place it anywhere on your document. Download the signed file immediately — no server uploads, no registration required.' },
      { question: 'How to make a document signable online for free?', answer: 'You can upload any PDF to our Sign PDF tool to add interactive signature overlays. Once placed, the e-signature is merged directly into the document so it is ready to be shared as a signed copy.' },
      { question: 'How do I create a secure electronic signature for free?', answer: 'Create a free, secure signature by drawing it on screen or uploading an image. Because iCreatePDF does not upload your files or signature to a remote server, your signature data remains entirely private and secure on your own device.' },
    ],
  },

  'split-pdf': {
    name: 'Split PDF',
    url: '/split-pdf',
    overview:
      'A large combined PDF sometimes needs to become several smaller files. If you want to learn how to separate a page from a pdf, how to split pdf pages free, or perform a pdf cut pages task, iCreatePDF extracts page ranges or separates every page of a document into individual files, processed locally with instant download of the split parts.',
    steps: [
      { title: 'Upload the PDF to split', description: 'Add the document you want divided into separate files.' },
      { title: 'Choose a split method', description: 'Split into custom ranges or separate every single page.' },
      { title: 'Preview the resulting files', description: 'Confirm how the document will be divided.' },
      { title: 'Download the split files', description: 'Get each part as its own downloadable PDF.' },
    ],
    useCases: [
      'Split a combined invoice batch back into individual invoices',
      'Break a large report into separate files per chapter',
      'Divide a scanned multi-form document into one file per form',
      'Separate every page of a PDF into standalone single-page files',
    ],
    faqs: [
      { question: 'Can I split a PDF into custom page ranges?', answer: 'Yes, you can define specific ranges to split by, or choose to separate every page into its own file.' },
      { question: 'How many output files will I get?', answer: 'That depends on the split method you choose — custom ranges produce one file per range, while full separation produces one file per page.' },
      { question: 'Is there a limit on the size of PDF I can split?', answer: 'No, there is no artificial file size or page count limit.' },
      { question: 'Is splitting done without uploading the file?', answer: 'Yes, all splitting happens locally inside your browser.' },
      { question: 'How to split pdf pages for free?', answer: 'Simply upload your PDF to our Split PDF tool, choose your split method (custom page ranges or separating every single page), preview the parts, and click split. Your new PDF documents are downloaded instantly for free.' },
      { question: 'How do I separate a page from a PDF using the splitter?', answer: 'Upload your PDF, choose "Extract custom ranges" and enter the specific page number you wish to separate. The tool will isolate that page into a new PDF. For deleting pages, you can also use our [Delete PDF Pages](file:///delete-pdf-pages) tool.' },
      { question: 'Can I use this tool to cut pages from a PDF?', answer: 'Yes! Our Split PDF tool is the easiest way to cut pages out of a PDF. You can cut specific page ranges or extract individual pages into separate files. If you want to permanently discard or delete pages instead of splitting them, try our [Delete PDF Pages](file:///delete-pdf-pages) tool.' },
    ],
  },

  'txt-to-pdf': {
    name: 'Text to PDF',
    url: '/txt-to-pdf',
    overview:
      'Plain .txt files and pasted notes don’t look presentable when shared as-is. iCreatePDF converts plain text files or pasted content into a styled, structured PDF document, letting you customize margins, page size, fonts, and headers or footers entirely in the browser.',
    steps: [
      { title: 'Paste or upload text', description: 'Add a .txt file or paste text directly into the editor.' },
      { title: 'Customize the layout', description: 'Set margins, page size, and font family.' },
      { title: 'Add headers or footers', description: 'Optionally include repeated text across every page.' },
      { title: 'Download the formatted PDF', description: 'Export a clean, structured PDF from your plain text.' },
    ],
    useCases: [
      'Turn a plain-text novel draft or manuscript into a formatted PDF',
      'Convert code output or log files into a shareable document',
      'Format meeting notes or a plain-text memo for distribution',
      'Prepare a plain-text script or transcript as a print-ready PDF',
    ],
    faqs: [
      { question: 'Can I customize fonts and margins?', answer: 'Yes, you can set the font family, page margins, and page size before generating the PDF.' },
      { question: 'Can I add headers or footers to the output?', answer: 'Yes, custom header and footer text can be applied across every page of the generated document.' },
      { question: 'Is there a length limit on the text I can convert?', answer: 'No, the tool paginates automatically across as many pages as your text requires.' },
      { question: 'Is my text uploaded to a server?', answer: 'No, formatting and PDF generation both happen locally in your browser.' },
    ],
  },

  'unlock-pdf': {
    name: 'Unlock PDF (Remove Password)',
    url: '/unlock-pdf',
    overview:
      'A password-protected PDF you have the legitimate right to open can still be a hassle if the restriction blocks printing or copying you actually need. iCreatePDF removes password locks and permission restrictions from a PDF entirely client-side, so neither your file nor your password is ever sent to a remote server.',
    steps: [
      { title: 'Upload the locked PDF', description: 'Add the password-protected document you have permission to unlock.' },
      { title: 'Enter the password', description: 'Provide the current password to decrypt the file.' },
      { title: 'Remove the restrictions', description: 'Strip the encryption and any print or copy permission locks.' },
      { title: 'Download the unlocked PDF', description: 'Save a fully accessible copy of the document.' },
    ],
    useCases: [
      'Remove a forgotten-but-known password from your own archived PDF',
      'Strip print restrictions from a document you’re authorized to print',
      'Unlock a company file whose owner password you have permission to remove',
      'Remove copy restrictions from a PDF you need to quote from',
    ],
    faqs: [
      { question: 'Do I need to know the current password to unlock a PDF?', answer: 'Yes, you need the existing password to decrypt the file — this tool removes protection you’re authorized to remove, not bypass unknown passwords.' },
      { question: 'Can this remove print or copy restrictions too?', answer: 'Yes, in addition to the open password, owner-level restrictions like print and copy locks can be stripped.' },
      { question: 'Is my password sent anywhere during unlocking?', answer: 'No, decryption happens entirely inside your browser memory — the password is never transmitted.' },
      { question: 'Will unlocking change the document content?', answer: 'No, only the encryption and permission layer is removed; the page content stays identical.' },
    ],
  },

  'verify-signature': {
    name: 'Verify PDF Signature',
    url: '/verify-signature',
    overview:
      'A digitally signed PDF is only trustworthy if the signature and the document haven’t been tampered with since signing. iCreatePDF validates cryptographic signatures on a PDF locally, inspecting signer identity details and checking byte-range integrity without uploading the file to a validation service.',
    steps: [
      { title: 'Upload the signed PDF', description: 'Add the document containing a digital signature to check.' },
      { title: 'Inspect the certificate', description: 'View signer identity details embedded in the signature.' },
      { title: 'Check document integrity', description: 'Verify the byte-range hash matches to confirm no tampering occurred.' },
      { title: 'Review the validation result', description: 'See a clear pass/fail result for the signature check.' },
    ],
    useCases: [
      'Confirm a received contract’s digital signature hasn’t been altered',
      'Verify the signer identity on a digitally signed legal document',
      'Check the integrity of a signed invoice before processing payment',
      'Validate a government or certificate-authority-issued signed PDF',
    ],
    faqs: [
      { question: 'What does verifying a signature actually check?', answer: 'It checks the cryptographic certificate details and confirms the document’s byte-range hash matches, which reveals whether the file was altered after signing.' },
      { question: 'Can I see who signed the document?', answer: 'Yes, the signer’s certificate identity details are extracted and displayed as part of the verification.' },
      { question: 'Is the PDF uploaded to a server for validation?', answer: 'No, signature and integrity checks are performed entirely inside your browser.' },
      { question: 'What happens if the document was tampered with?', answer: 'The integrity check will fail, indicating the file has changed since it was signed.' },
    ],
  },

  'watermark-pdf': {
    name: 'Watermark PDF',
    url: '/watermark-pdf',
    overview:
      'Marking drafts as "Confidential" or branding a document with a company name across every page protects against unauthorized reuse. iCreatePDF applies custom text watermarks to all pages of a PDF, with control over position, size, opacity, and color, all rendered locally in your browser.',
    steps: [
      { title: 'Upload your PDF', description: 'Add the document you want to watermark.' },
      { title: 'Enter watermark text', description: 'Type the text — e.g. "Confidential" or a company name.' },
      { title: 'Adjust style and position', description: 'Set size, opacity, color, and placement on the page.' },
      { title: 'Download the watermarked PDF', description: 'Export the document with the watermark applied to every page.' },
    ],
    useCases: [
      'Mark a draft contract as "Confidential" before internal review',
      'Brand a report or proposal with a company watermark',
      'Stamp "Sample" or "Not for Distribution" across a preview document',
      'Add a copyright notice watermark to a shared PDF portfolio',
    ],
    faqs: [
      { question: 'Can I control the watermark opacity?', answer: 'Yes, you can adjust opacity so the watermark is subtle or bold, along with its size and color.' },
      { question: 'Does the watermark apply to every page automatically?', answer: 'Yes, the configured watermark is applied consistently across all pages in one pass.' },
      { question: 'Can I position the watermark diagonally or in a corner?', answer: 'Yes, position and rotation can be adjusted to place the watermark where you want it.' },
      { question: 'Is watermarking done without uploading the file?', answer: 'Yes, everything is processed client-side in your browser.' },
    ],
  },

  'word-to-pdf': {
    name: 'Word to PDF',
    url: '/word-to-pdf',
    overview:
      "Wondering how to convert docx to pdf without formatting shifting on the recipient's device? iCreatePDF is an online docx to pdf converter free and web-based docx to pdf freeware. Learn how to convert docx to pdf, or how to save docx as pdf in seconds. We help you convert a docx file to pdf, supporting standard .docx to pdf operations. The entire tool functions to convert word to pdf local to your machine, meaning files are processed in your browser sandbox, keeping your documents 100% private and secure.",
    steps: [
      { title: 'Upload your Word document', description: 'Add the .docx file you want to convert.' },
      { title: 'Preview the conversion', description: 'Check how the document will render as a PDF.' },
      { title: 'Confirm layout and formatting', description: 'Verify text, headings, and structure look correct.' },
      { title: 'Download the PDF', description: 'Export a finished PDF version of your Word document.' },
    ],
    useCases: [
      'Convert a resume or cover letter to PDF before submitting an application',
      'Send a report as a PDF so formatting stays consistent for every reader',
      'Prepare a Word-based contract as a final, non-editable PDF',
      'Archive Word documents in a more universally compatible format',
    ],
    faqs: [
      { question: 'Will my document formatting stay the same after conversion?', answer: 'Yes, our engine is designed to export your word to pdf without changing format, keeping margins, text alignment, headings, and lists intact.' },
      { question: 'Does this work with .doc files as well as .docx?', answer: 'The tool is built around the modern .docx format; older .doc files may need to be re-saved as .docx first.' },
      { question: 'Is my Word document uploaded to a server?', answer: 'No, conversion happens entirely inside your browser sandbox — this is a secure way to convert word to pdf free offline, and the file never leaves your device.' },
      { question: 'Can I convert documents with images and tables?', answer: 'Yes, embedded images and tables are carried over into the converted PDF layout.' },
      { question: 'How do I save docx as pdf on my device?', answer: 'Simply drag and drop your file into our Word to PDF tool. It converts your Word docx to pdf in real-time, preserving fonts, images, and tables without uploading the file to any server.' },
      { question: 'How to convert docx to pdf or change a docx to pdf for free?', answer: 'Our Word to PDF tool is completely free with no registration. To transform docx to pdf, just drop the .docx file above, review the preview, and download your formatted PDF.' },
      { question: 'How do I convert docx to pdf in Microsoft Word?', answer: 'In Word, you can click File > Save As and select PDF (*.pdf) as the format. However, if you do not have Word installed, you can use our tool to convert docx to pdf without word, right in your web browser.' },
      { question: 'Can I convert ooxml or dox files to PDF?', answer: 'Yes! OOXML format (which is the standard XML structure of .docx files) is fully supported. If you have files named dox, doc, or docx, ensure they are in the modern .docx structure and our tool will easily convert them to PDF.' },
      { question: 'How do I convert word to pdf local to my machine?', answer: 'iCreatePDF works entirely client-side inside your browser. Because of this local architecture, you can convert word to pdf local to your own device without uploading files to any external servers, which even functions offline once loaded.' },
      { question: 'Is this docx to pdf freeware safe to use?', answer: 'Yes! Unlike downloadable freeware that might bundle third-party ads or malware, our in-browser docx to pdf freeware is completely web-based, runs in a secure sandbox on your machine, and never transmits your document data across the internet.' },
    ],
  },

  'prevent-copy': {
    name: 'Prevent PDF Copy',
    url: '/prevent-copy',
    overview:
      'Prevent text copying and text extraction from your PDF documents. By rasterizing each page into a high-resolution flat image and compiling them into a new file, iCreatePDF strips the selectable text layer entirely. The visual layout, fonts, and images are perfectly preserved, but direct highlighting, selection, or copy-pasting is made impossible.',
    steps: [
      { title: 'Upload the PDF document', description: 'Choose the file from which you want to prevent text copying.' },
      { title: 'Select rendering quality', description: 'Choose Standard for smaller file size, or High for maximum text sharpness.' },
      { title: 'Rasterize PDF pages', description: 'Every page is rendered to a canvas image and converted back to a flat PDF.' },
      { title: 'Download the secured PDF', description: 'Save the new non-copyable PDF version locally.' },
    ],
    useCases: [
      'Protect research papers, portfolios, and creative writing from easy copy-pasting',
      'Disable text selection on proprietary price lists or sales sheets before sharing',
      'Secure contract drafts or invoices to prevent unauthorized text modifications',
      'Flatten document text layers to prevent automated scraping or web scraping tools',
    ],
    faqs: [
      { question: 'How does preventing copy work?', answer: 'This tool rasterizes the PDF, which means it renders each page as a single image. The output PDF looks identical, but it contains no selectable text layer, rendering copy-paste actions impossible.' },
      { question: 'Does this encrypt my PDF?', answer: 'No, it does not lock the PDF behind a password. Anyone can open and read the file, but they cannot select or copy the text. If you want password protection, use our Protect PDF tool.' },
      { question: 'Will the output PDF look blurry?', answer: 'We render the pages at a high scale factor (up to 2.2x) to ensure text remains crisp and readable. Selecting "High" quality renders pages at a very high resolution.' },
      { question: 'Can the text still be copied using OCR?', answer: 'Yes, if someone uses optical character recognition (OCR) software on the images, they can extract the text. However, direct text selection and standard copy-pasting are completely disabled.' },
      { question: 'Is my file processed locally?', answer: 'Yes, just like all iCreatePDF tools, the rasterization happens 100% in your browser using local canvas and WebAssembly. Nothing is uploaded to any server.' },
    ],
  },

  'pdf-ocr': {
    name: 'PDF OCR (Scan to Text)',
    url: '/pdf-ocr',
    overview:
      'Extract text from scanned, image-only, or copy-protected PDF files using our free ocr online pdf tool. iCreatePDF functions as a local pdf text scanner and online ocr pdf converter, running character recognition locally inside your browser sandbox using WebAssembly. This lets you convert a pdf image to text, extract scanned text from pages, and run ocr conversion pdf functions to get copyable plain text instantly without any server uploads.',
    steps: [
      { title: 'Upload the scanned PDF', description: 'Drag in the image-only or copy-protected PDF file.' },
      { title: 'Select the document language', description: 'Choose from English, Spanish, Hindi, or Tamil for high OCR accuracy.' },
      { title: 'Run local character recognition', description: 'Our WebAssembly engine reads characters page-by-page entirely in your browser.' },
      { title: 'View, copy, or download text', description: 'Instantly copy the extracted text or download it as a plain text file.' },
    ],
    useCases: [
      'Extract text from scanned book pages, recipes, or historical documents',
      'Reverse-engineer copy-proof or rasterized PDFs to copy their content',
      'Convert scanned receipts, bank statements, or paper forms into editable text formats',
      'Read and digitize text from faxed documents or graphic layouts',
    ],
    faqs: [
      { question: 'How does PDF OCR work?', answer: 'It renders each PDF page as an image, and uses an in-browser neural network engine (Tesseract.js) to recognize letters, words, and numbers. The recognized characters are output as copyable text.' },
      { question: 'Is my scanned document uploaded to a server?', answer: 'No. iCreatePDF processes the OCR entirely client-side. The neural network files and image processing run locally on your device, meaning your documents never touch a third-party server.' },
      { question: 'Does it support multi-language documents?', answer: 'Yes, you can choose the primary language (English, Spanish, Hindi, or Tamil) to ensure the OCR parser matches the correct dictionary and character set.' },
      { question: 'Can it convert the PDF back into a searchable PDF?', answer: 'This tool extracts the text layer into an editable plain text format (.txt). To build a fully search-indexed PDF, you can copy the text and compile it back using our Markdown to PDF or HTML to PDF tools.' },
      { question: 'Are there page or file size limits?', answer: 'No, there are no limits. However, since OCR is CPU-intensive and runs in the browser, processing very large documents (50+ pages) may take several minutes depending on your device.' },
      { question: 'Is there a limit on using this free ocr pdf to text tool?', answer: 'No. iCreatePDF provides a completely free ocr pdf to text solution with no page limits, no daily caps, and no email registration. You can convert pdf ocr to text directly on your device.' },
      { question: 'How do I convert a scanned PDF back to a normal PDF with editable text?', answer: 'To convert a scanned PDF to a normal PDF with selectable text, first run our OCR tool above to extract the text. Then, paste the text into our Markdown to PDF or HTML to PDF tool to compile it into a fresh, clean, search-indexed PDF document.' },
      { question: 'How do I use this tool as a pdf to text scanner?', answer: 'Just drop your file into our browser-based pdf to text scanner. Select your language, and click the OCR button. The tool will scan to pdf text locally, extracting all characters and outputting them as editable text you can copy immediately.' },
      { question: 'Can this convert scanned pdf to text accurately?', answer: 'Yes! Our local OCR engine performs high-precision ocr conversion pdf operations on scanned text, books, invoices, or forms, turning image-based files into selectable, copy-pasteable text.' },
    ],
  },

  'certify-pdf': {
    name: 'Certify PDF',
    url: '/certify-pdf',
    overview: 'Create a tamper-evident record for an important PDF without uploading it to a third party. iCreatePDF calculates a SHA-256 fingerprint and adds a QR-enabled certificate, making it easy to identify whether a later copy is the same file you certified.',
    steps: [
      { title: 'Add the PDF', description: 'Choose the document you want to fingerprint. It stays in your browser.' },
      { title: 'Create the certificate', description: 'Generate a SHA-256 fingerprint and the accompanying QR-enabled proof.' },
      { title: 'Save the certified copy', description: 'Download the marked PDF and retain the fingerprint for future checks.' },
      { title: 'Verify a later copy', description: 'Compare a file against its fingerprint to check whether its contents have changed.' },
    ],
    useCases: ['Document a final contract before sharing it', 'Create an integrity record for a report or certificate', 'Check whether a received PDF matches an approved copy', 'Keep a verifiable record without sending a file to a server'],
    faqs: [
      { question: 'What does a SHA-256 PDF fingerprint do?', answer: 'It creates a unique cryptographic digest for the exact file contents. If the file changes, its fingerprint changes too.' },
      { question: 'Does certification make a legal notarization?', answer: 'No. It provides a tamper-evident integrity record; it does not replace a legal notary or qualified digital signature.' },
      { question: 'Is the PDF uploaded?', answer: 'No. Fingerprinting and certificate creation run locally in your browser.' },
    ],
  },

  'pdf-accessibility-checker': {
    name: 'PDF Accessibility Checker',
    url: '/pdf-accessibility-checker',
    overview: 'Check a PDF for common barriers that affect screen-reader users before publishing it. This browser-based PDF accessibility checker reviews useful signals such as document tags, language settings, text layers, and form-field labels while keeping the file on your device.',
    steps: [
      { title: 'Open the PDF', description: 'Select the document you want to review locally.' },
      { title: 'Run the accessibility audit', description: 'Inspect tags, declared language, searchable text, and form labels.' },
      { title: 'Review flagged issues', description: 'Use the results to identify where the source document needs remediation.' },
      { title: 'Update the source file', description: 'Correct the document in its authoring tool, then rerun the check.' },
    ],
    useCases: ['Preflight a public PDF for accessibility issues', 'Check whether a scanned PDF contains real selectable text', 'Review form labels before distributing an application', 'Support a PDF accessibility remediation workflow'],
    faqs: [
      { question: 'Can this checker make my PDF WCAG compliant?', answer: 'It identifies common signals and issues, but accessibility conformance still requires reviewing the document content and repairing the source where needed.' },
      { question: 'Does it detect scanned-image PDFs?', answer: 'Yes. It checks whether a useful text layer is present, which helps identify documents that may need OCR.' },
      { question: 'Are files uploaded for the audit?', answer: 'No. The audit runs in your browser and the PDF remains on your device.' },
    ],
  },

  'pdf-to-excel': {
    name: 'PDF to Excel Table Extractor',
    url: '/pdf-to-excel',
    overview: 'Extract tables from a PDF into Excel-ready CSV without sending statements, reports, or invoices to a conversion server. The tool uses the positions of selectable text to reconstruct rows and columns in your browser, giving you data that is easier to sort and analyze.',
    steps: [
      { title: 'Choose a text-based PDF', description: 'Open the report, invoice, or statement that contains the table.' },
      { title: 'Detect table layout', description: 'Let the tool analyze text positions to identify rows and columns.' },
      { title: 'Review the extracted data', description: 'Check that headings, rows, and columns are arranged as expected.' },
      { title: 'Export CSV for Excel', description: 'Download the table in a spreadsheet-ready format.' },
    ],
    useCases: ['Move invoice line items into a spreadsheet', 'Analyze a report table in Excel', 'Extract a statement for reconciliation', 'Convert tabular PDF data without an upload'],
    faqs: [
      { question: 'Can I open the exported file in Excel?', answer: 'Yes. The tool exports CSV, which Excel and other spreadsheet apps can open.' },
      { question: 'Will it work with scanned PDF tables?', answer: 'It works best with PDFs that have selectable text. For scanned tables, run OCR first and review the output carefully.' },
      { question: 'Is my financial data uploaded?', answer: 'No. Extraction runs locally in the browser.' },
    ],
  },

  'read-aloud-pdf': {
    name: 'PDF Read Aloud',
    url: '/read-aloud-pdf',
    overview: 'Listen to a PDF with browser-based text-to-speech while keeping sensitive documents local. Choose an available voice, adjust the reading speed, and follow the text as it is read aloud—useful for proofreading, studying, and more accessible document review.',
    steps: [
      { title: 'Open a text-based PDF', description: 'Choose the document you want to hear read aloud.' },
      { title: 'Select a voice and speed', description: 'Pick a browser voice and a comfortable reading pace.' },
      { title: 'Start playback', description: 'Listen as the reader moves through the extracted PDF text.' },
      { title: 'Pause or adjust settings', description: 'Control playback as you review the document.' },
    ],
    useCases: ['Proofread a report by listening to it', 'Study a text-based PDF hands-free', 'Review a document while multitasking', 'Use text-to-speech as part of an accessible reading workflow'],
    faqs: [
      { question: 'Does PDF Read Aloud work with scanned PDFs?', answer: 'It needs extractable text. Run OCR on scanned documents first to create a usable text layer.' },
      { question: 'Can I change the reading speed?', answer: 'Yes. You can adjust speed and select from voices available in your browser or operating system.' },
      { question: 'Is the PDF sent to a text-to-speech server?', answer: 'No. The reader uses browser capabilities and processes the document locally.' },
    ],
  },

  'bulk-certificates': {
    name: 'Bulk Certificate Generator',
    url: '/bulk-certificates',
    overview:
      'Need to generate certificates from csv or excel files in bulk? iCreatePDF lets you generate hundreds of personalized PDF certificates, letters, or tickets instantly inside your browser. Upload your PDF certificate template, import your CSV/Excel spreadsheet, drag-and-drop placeholders (like student names or dates) onto the preview, and download them. 100% private, free, and secure.',
    steps: [
      { title: 'Upload your template & data', description: 'Add your single-page PDF template and Excel/CSV list.' },
      { title: 'Create placeholders', description: 'Select headers from your spreadsheet to place as text labels on the preview.' },
      { title: 'Format & position text', description: 'Drag variables to their correct spots, adjust sizes, fonts, colors, and alignments.' },
      { title: 'Export in bulk', description: 'Download all generated files as a combined PDF or an individual ZIP archive.' },
    ],
    useCases: [
      'Generate course completion certificates in bulk for graduates and students',
      'Create personalized entry tickets, invitations, or passes from a guest spreadsheet',
      'Produce customized award letters, coupons, or employee recognition certificates',
      'Compile student report cards or personalized forms dynamically from table data',
    ],
    faqs: [
      { question: 'What file formats are supported?', answer: 'For the layout, upload a single-page PDF template. For the recipient list, we support Excel spreadsheets (.xlsx, .xls) and CSV (.csv) tables.' },
      { question: 'How do I place text on the certificate template?', answer: 'Once you upload your files, you will see a visual preview of your certificate template. Click on any spreadsheet column name to add it as a text label, then drag it to your desired position.' },
      { question: 'Can I choose different fonts and colors?', answer: 'Yes! You can configure the font family (Helvetica, Times Roman, Courier), adjust the font size, set text alignment, make text bold, and pick custom colors using a hex color picker.' },
      { question: 'Is my spreadsheet or template uploaded to a server?', answer: 'Never. Like all tools on iCreatePDF, the parsing of Excel rows, drawing of text, and PDF compilation happen entirely inside your local browser memory space.' },
      { question: 'How will the downloaded files look?', answer: 'You can choose to export as a single combined PDF (with one certificate page per spreadsheet row) or as a ZIP file containing separate, individually named PDFs for each recipient.' },
      { question: 'How do I generate certificates from csv or excel?', answer: 'Upload a single-page PDF template and your CSV/Excel list. Click on any spreadsheet column name to create a placeholder, drag it to the correct spot on the preview, and configure formatting, then click Export in Bulk to download the generated files.' },
    ],
  },

  'fillable-pdf-builder': {
    name: 'Fillable PDF Form Builder',
    url: '/fillable-pdf-builder',
    overview:
      'Design interactive forms client-side without purchasing expensive software. If you need to create pdf form options or want the best free fillable pdf form creator, iCreatePDF lets you upload any flat PDF page and overlay interactive text fields, checkboxes, dropdown lists, and radio options. The tool generates standards-compliant fillable PDF form widgets locally in your browser memory, keeping your documents 100% private.',
    steps: [
      { title: 'Upload your document', description: 'Add the PDF document you want to make fillable.' },
      { title: 'Insert interactive elements', description: 'Select field types (Text Input, Checkbox, Choice Dropdown, Radio Button).' },
      { title: 'Position and configure', description: 'Drag widgets to placement areas, adjust dimensions, and set dropdown option lists.' },
      { title: 'Export fillable PDF', description: 'Compile the PDF form fields and download the resulting file locally.' },
    ],
    useCases: [
      'Create fillable application forms, tax sheets, or questionnaires from static templates',
      'Design interactive contracts or agreements with checkboxes and text fields',
      'Build survey forms with dropdown options and single-choice radio selectors',
      'Convert scanned paper documents into interactive web-ready PDF forms',
    ],
    faqs: [
      { question: 'Will the generated PDF forms work in standard readers?', answer: 'Yes. iCreatePDF uses standard PDF specification widgets. The fillable fields will work in Adobe Reader, Chrome, Safari, Edge, Preview, and mobile PDF readers.' },
      { question: 'Are my files sent to any server?', answer: 'No. The entire editing visual workspace and the pdf-lib compiler operate client-side in your local browser. Your documents never leave your device.' },
      { question: 'Can I define multiple choices for dropdown menus?', answer: 'Yes! When you select a dropdown widget, you can type a comma-separated list of options in the sidebar properties panel to populate the choices.' },
      { question: 'Can I set default values or pre-checked states?', answer: 'Yes. You can configure default text or set the initial checkbox state (checked/unchecked) in the property panel for each field.' },
      { question: 'How do I create a fillable PDF form for free?', answer: 'To create a fillable PDF form for free, upload your static PDF document to our builder. Select the interactive elements you need (like text fields, checkboxes, or dropdown lists), drag them into position, customize their options, and download your interactive PDF form instantly.' },
    ],
  },

  'ris-to-pdf': {
    name: 'RIS to PDF Citation Converter',
    url: '/ris-to-pdf',
    overview:
      "Wondering how to convert RIS to PDF? iCreatePDF provides an online RIS to PDF converter free. Learn how to transform RIS citation data into beautifully formatted bibliographies. We help you parse and compile RIS files into styled PDFs, supporting standard citation formats like APA, MLA, Harvard, and Chicago. The entire compilation runs in your browser sandbox, keeping your references and documents 100% private.",
    steps: [
      { title: 'Upload your RIS file or paste tags', description: 'Add your .ris bibliographic citation file or paste raw tag lines.' },
      { title: 'Select citation format style', description: 'Choose your desired reference style (APA 7th, MLA 9th, Harvard, or Chicago).' },
      { title: 'Configure PDF page and fonts', description: 'Adjust page size, margins, font family, size, and line spacing settings.' },
      { title: 'Download your compiled PDF', description: 'Export the formatted bibliography as a clean, print-ready PDF.' },
    ],
    useCases: [
      'Convert RIS citations from EndNote, Zotero, Mendeley, or Google Scholar to PDF bibliographies',
      'Format raw bibliography lists for academic paper submissions and thesis papers',
      'Export a clean, styled works cited page for print layouts or student portfolios',
      'Maintain an offline, private repository of formatted document citations',
    ],
    faqs: [
      { question: 'What is a RIS file?', answer: 'A RIS (Research Information Systems) file is a standardized tag format used to enable citation programs (like EndNote, Zotero, Mendeley, and RefWorks) to exchange bibliographic data. It lists records with tags such as AU (Author), TI (Title), PY (Publication Year), and JO (Journal).' },
      { question: 'Which citation styles are supported?', answer: 'iCreatePDF supports formatting RIS reference records into APA 7th Edition, MLA 9th Edition, Harvard reference format, and Chicago Manual of Style citation layouts.' },
      { question: 'Does this tool support multiple references in one file?', answer: 'Yes! If your RIS file contains multiple citation records separated by ER (End of Reference) tags, our tool parses all of them and compiles them into a single, multi-page sorted bibliography list.' },
      { question: 'Is my citation data private?', answer: 'Yes. The RIS parser and pdf-lib document compiler run entirely client-side inside your browser sandbox. No file uploads or data transmissions occur across the network.' },
      { question: 'How do I convert RIS to PDF online for free?', answer: 'To convert RIS to PDF, simply drag and drop your .ris file or paste the raw RIS data into the input box above. Select your preferred citation style (such as APA or MLA) and layout settings, then click "Compile RIS to PDF" to generate and download your formatted PDF instantly.' },
    ],
  },
};


