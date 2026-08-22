# iCreatePDF Browser Extension (Chrome, Edge, Brave, Opera)

A lightweight, Manifest V3 browser extension for **iCreatePDF**. Gives users 1-click access to 70+ client-side PDF utilities directly from their browser toolbar with instant search, omnibox shortcuts, and context menu integrations.

---

## 🚀 How to Test & Install Locally (Developer Mode)

### In Google Chrome / Brave / Opera:
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** in the top-right corner.
3. Click the **Load unpacked** button.
4. Select the `extension/` folder inside this repository:
   ```text
   E:\iCreatePDF\extension
   ```
5. Pin the **iCreatePDF** icon to your toolbar!

### In Microsoft Edge:
1. Open Edge and navigate to `edge://extensions/`
2. Turn on **Developer mode** in the left sidebar.
3. Click **Load unpacked** and select the `extension/` folder.

---

## 📦 How to Publish to Web Stores (Build Authority Backlinks)

Publishing this extension creates official **DA 95+ backlinks** on Google Chrome Web Store and Microsoft Edge Add-ons.

### Step 1: Generate the Production ZIP
Run the packaging script in your terminal:
```bash
npm run package-extension
```
This generates `icreatepdf-chrome-extension.zip` (37 KB) in your root directory.

### Step 2: Submit to Google Chrome Web Store
1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Click **New Item** and upload `icreatepdf-chrome-extension.zip`.
3. Fill in store details:
   - **Name**: `iCreatePDF - Private PDF Tools & Converter`
   - **Website URL**: `https://icreatepdf.online` *(This creates the DA 95 backlink!)*
   - **Category**: `Productivity`
4. Submit for review (takes 24–48 hours).

### Step 3: Submit to Microsoft Edge Add-ons
1. Go to the [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge).
2. Click **Create new extension** and upload the same `icreatepdf-chrome-extension.zip`.
3. Provide store listing details and submit.

---

## ⚡ Extension Features
- **Instant Search**: Type `/` to search across 70+ PDF tools in milliseconds.
- **Category Filter Tabs**: Popular, Convert, Edit & Sign, Organize, Security.
- **Omnibox Shortcut**: Type `pdf merge` or `pdf compress` in your browser address bar to jump straight to any tool.
- **Context Menu**: Right-click images or links to open them directly in iCreatePDF.
- **100% Private**: Zero server uploads, zero trackers, and ultra-lightweight footprint.
