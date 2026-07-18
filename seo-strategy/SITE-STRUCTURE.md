# Site Structure — Target Architecture

## Current State (as of 2026-07-18)

```
/
├── /[tool]                 (51 flat tool routes, e.g. /merge-pdf, /pdf-ocr)
├── /blog
│   └── /blog/[slug]         (22 posts, mostly 1:1 with a tool)
├── /compare                 (single page: vs. server-based editors, generic)
├── /contact, /privacy, /terms
├── /es, /hi, /ta            (homepage only)
└── sitemap.ts / robots.ts
```

Flat tool URLs (`/merge-pdf` not `/tools/merge-pdf`) are correct for this niche — keep them. Don't introduce a `/tools/` prefix; it would break existing backlinks/indexation for no ranking benefit.

## Target Additions

```
/
├── /[tool]                          (existing 51 — unchanged URLs)
├── /blog
│   └── /blog/[slug]                 (existing 22 + new posts per CONTENT-CALENDAR.md)
├── /compare
│   ├── /compare                     (existing — keep, expand table)
│   ├── /ilovepdf-alternative         (NEW — comparison landing page)
│   ├── /smallpdf-alternative         (NEW — comparison landing page)
│   └── /pdf24-alternative            (NEW, lower priority — closest competitor, smaller gap)
├── /no-upload-pdf-tools              (NEW — privacy-cluster hub page, links to all 51 tools)
├── /es/[tool], /hi/[tool], /ta/[tool] (NEW — localized top-10 tool pages, phased rollout)
├── /contact, /privacy, /terms        (existing)
└── /es, /hi, /ta                     (existing homepages)
```

## Internal Linking Strategy

1. **Tool ↔ Blog pairing (already working — extend it):** every tool page should link to its matching how-to post, and every post should embed/link the live tool above the fold. Verify all 51 tools have a paired post; currently ~22/51 do — prioritize gap-filling for the top-traffic tools first (merge, compress, split, convert-to-word, sign).
2. **Comparison hub:** `/compare` becomes a hub linking to `/ilovepdf-alternative`, `/smallpdf-alternative`, `/pdf24-alternative`; each alternative page links back to the 3-5 most relevant tool pages for that competitor's weak spot (e.g., `/smallpdf-alternative` → `/compress-pdf`, `/merge-pdf` since those are Smallpdf's rate-limited tasks).
3. **Privacy hub (`/no-upload-pdf-tools`):** a single page linking to all 51 tools with one-line privacy notes — gives Google/AI crawlers one crawlable page that enumerates the full catalog under the privacy angle, and gives every tool page a topically relevant inbound link.
4. **Footer/nav:** confirm all 51 tools are reachable within 2 clicks from homepage (check current nav component — if tools are only discoverable via sitemap, add a `/all-tools` or expand footer links).
5. **Localized tool pages:** link es/hi/ta tool pages to their English counterpart via `hreflang` (pattern already exists in `lib/seo.ts` `buildAlternates()` — extend it to non-homepage paths once localized routes exist).

## Sitemap Quality Gates

- Every URL in `sitemap.ts` must return 200 and have unique `<title>`/meta description — audit before adding new locale routes to avoid duplicate/thin-content flags.
- Do not add `/es/[tool]` etc. to the sitemap until the page has genuinely translated (not machine-translated boilerplate) content — partial rollouts should list only completed pages.
- Keep `lastmod` accurate on `sitemap.ts` entries where feasible (currently static — verify if Next.js file-based route already handles this or if it needs manual dates).

## Schema Plan by Page Type

| Page Type | Schema |
|---|---|
| Tool pages | `SoftwareApplication` (already likely present — verify), `BreadcrumbList` (in place via `breadcrumbSchema()`), `FAQPage` for tool-specific Q&A |
| Blog posts | `Article`/`HowTo` where the post is a step-by-step guide |
| Comparison/alternative pages | `FAQPage`, comparison table marked up for extractability (even without a dedicated schema type, structure as an actual `<table>` — AI parsers and featured snippets favor it over div grids) |
| Homepage | `Organization`, `WebSite` |
