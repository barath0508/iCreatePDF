const BASE_URL = 'https://icreatepdf.online';

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'icreatepdf-open',
    title: 'Open in iCreatePDF',
    contexts: ['page', 'link', 'image']
  });

  chrome.contextMenus.create({
    id: 'icreatepdf-compress',
    parentId: 'icreatepdf-open',
    title: '🗜️ Compress PDF',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'icreatepdf-merge',
    parentId: 'icreatepdf-open',
    title: '📑 Merge PDFs',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'icreatepdf-convert-jpg',
    parentId: 'icreatepdf-open',
    title: '🖼️ Convert to PDF',
    contexts: ['page', 'image', 'link']
  });
});

// Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let targetUrl = BASE_URL;

  if (info.menuItemId === 'icreatepdf-compress') {
    targetUrl = `${BASE_URL}/compress-pdf`;
  } else if (info.menuItemId === 'icreatepdf-merge') {
    targetUrl = `${BASE_URL}/merge-pdf`;
  } else if (info.menuItemId === 'icreatepdf-convert-jpg') {
    targetUrl = `${BASE_URL}/jpg-to-pdf`;
  }

  chrome.tabs.create({ url: `${targetUrl}?ref=context_menu` });
});

// Omnibox Keyword Search (Type "pdf <tool>" in address bar)
chrome.omnibox.onInputEntered.addListener((text) => {
  const query = text.trim().toLowerCase().replace(/\s+/g, '-');
  const validTools = [
    'merge-pdf', 'compress-pdf', 'pdf-to-word', 'word-to-pdf', 'jpg-to-pdf',
    'pdf-to-jpg', 'edit-pdf', 'sign-pdf', 'split-pdf', 'protect-pdf', 'unlock-pdf',
    'organize-pdf', 'rotate-pdf', 'crop-pdf', 'flatten-pdf', 'watermark-pdf'
  ];

  let destination = `${BASE_URL}/#tools`;
  const matched = validTools.find(t => t.includes(query));
  if (matched) {
    destination = `${BASE_URL}/${matched}`;
  }

  chrome.tabs.create({ url: `${destination}?ref=omnibox` });
});
