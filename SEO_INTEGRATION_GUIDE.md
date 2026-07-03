# Reusable SEO Integration Guide & Boilerplate

This guide provides copy-pasteable configurations, script snippets, and step-by-step checklists to implement the SEO patterns from the Polaroid Booth project into any new website or web application.

---

## 1. On-Page Meta Boilerplate

Place this in the `<head>` of your main HTML file. Make sure to replace placeholder URLs and branding values.

```html
<!-- SEO Basics -->
<title>Your Primary Keyword Phrase — Brand Name or Catchy Hook</title>
<meta name="description" content="A clear, compelling 150-160 character description of what your app does. Ends with a call to action.">
<meta name="keywords" content="keyword1, keyword2, longtail keyword phrase, branding">
<meta name="author" content="Your Brand Name">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://yourdomain.com/">

<!-- Multi-Region Alternate Targeting (Hreflang) -->
<!-- Prevents duplicate content issues when targeting multiple English-speaking geos -->
<link rel="alternate" hreflang="en-US" href="https://yourdomain.com/">
<link rel="alternate" hreflang="en-GB" href="https://yourdomain.com/">
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com/">

<!-- Open Graph (Facebook / Slack / Discord Previews) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Your Primary Keyword Phrase — Brand Name">
<meta property="og:description" content="A clear, compelling preview description.">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
<meta property="og:site_name" content="Your Brand Name">

<!-- Twitter Card Metadata -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Primary Keyword Phrase — Brand Name">
<meta name="twitter:description" content="Brief preview summary.">
<meta name="twitter:image" content="https://yourdomain.com/og-image.jpg">
```

---

## 2. Crawl Controls (Edge Configurations)

Add these files to your project's root folder to control search engines.

### File: `robots.txt`

```text
User-agent: *
Allow: /

# Sitemap Link
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow non-indexable application folders/routes
Disallow: /checkout
Disallow: /admin
Disallow: /test.html
Disallow: /*-draft.html

# Crawl delay to protect server resources
Crawl-delay: 1
```

### File: `_headers` (For Netlify / Cloudflare Pages)

Use this to tag duplicate pages, staging areas, or utility URLs with `noindex` headers.

```text
# Block indexing of duplicate or draft pages
/draft-page.html
  X-Robots-Tag: noindex
/duplicate-blog.html
  X-Robots-Tag: noindex
/admin/
  X-Robots-Tag: noindex

# Global Content Security Policy (Optional)
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
```

### File: `_redirects` (For 301 Redirects)

Consolidate duplicate pages or old paths to preserve inbound link authority:

```text
/old-page-name.html  /new-canonical-page.html  301
/another-old-url     /canonical-destination    301
```

---

## 3. Schema.org Structured Data (JSON-LD)

Place these schemas inside your `<head>` section. They inform Google about your web application features and FAQ listings to generate rich snippets in search results.

### A. Web Application Schema

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Your Web App Name",
    "url": "https://yourdomain.com/",
    "image": "https://yourdomain.com/og-image.jpg",
    "description": "Short description of your web utility.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
    "featureList": [
        "Feature 1 description",
        "Feature 2 description",
        "Feature 3 description"
    ]
}
</script>
```

### B. FAQ Schema (Boosts SERP click-through rate)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Insert Question 1?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Insert detailed answer here. Keep it concise."
            }
        },
        {
            "@type": "Question",
            "name": "Insert Question 2?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Insert detailed answer here."
            }
        }
    ]
}
</script>
```

---

## 4. Intrusive Interstitial Guard (JavaScript)

Use this script to prevent full-screen popups (such as newsletter updates, cookies warnings, or "What's New" modals) from showing on a user's (or search bot's) first visit.

```javascript
(function () {
    const CURRENT_VERSION = '2026-07-01'; // Bump this value to show modal to returning users
    const SEEN_KEY = 'app_modal_seen';
    const VISIT_KEY = 'app_visited';
    let seen, visited;
    
    try {
        seen = localStorage.getItem(SEEN_KEY);
        visited = localStorage.getItem(VISIT_KEY);
    } catch (_) { 
        return; // Fail gracefully if localStorage is disabled (e.g., Private Mode)
    }
    
    // CRITICAL SEO STEP: First visit bypass
    // If they have never visited, just log the visit and exit.
    // This prevents showing interstitials to new traffic from Google Search or Googlebot.
    if (!visited) {
        try { localStorage.setItem(VISIT_KEY, '1'); } catch (_) {}
        return;
    }
    
    if (seen === CURRENT_VERSION) return; // Already seen this version
    
    // Show the modal to returning users
    window.addEventListener('load', function () {
        setTimeout(function () {
            const modal = document.getElementById('yourModalId');
            if (modal) {
                modal.classList.add('open');
            }
        }, 1000); // Small delay to let the page render first
    });
    
    // Close Handler
    window.closeModal = function() {
        const modal = document.getElementById('yourModalId');
        if (modal) {
            modal.classList.remove('open');
            try { localStorage.setItem(SEEN_KEY, CURRENT_VERSION); } catch (_) {}
        }
    };
})();
```

---

## 5. Performance Optimization Patterns

### LCP Image Preloading
Identify your hero image (the main visual elements at the top of the viewport) and preload it in the head.

```html
<link rel="preload" href="images/hero-visual.webp" as="image" type="image/webp" fetchpriority="high">
```

### Resource Hints
Preconnect to critical API or Asset URLs to save round-trip time.

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Lazy-Load Third-Party Scripts
Do not block the initial page paint with analytics, ads, or support chat widgets. Load them inside a window load listener:

```javascript
window.addEventListener('load', function() {
    const script = document.createElement('script');
    script.src = 'https://some-third-party.com/analytics.js';
    script.async = true;
    document.body.appendChild(script);
});
```
