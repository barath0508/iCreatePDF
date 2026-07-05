# iCreatePDF — Redesign + SEO: Status & Remaining Work

This tracks the "complete UI redesign + per-tool SEO" effort. Full plan lives at
`C:\Users\Barath\.claude\plans\sprightly-munching-rabbit.md` (approved plan, same content
summarized/expanded below with current progress).

Direction chosen: **clean/minimal SaaS (Linear/Vercel/Stripe style)**, dark-mode-first,
single neutral palette + one indigo/violet brand accent (`#7e5de0`), applied to the
whole site (landing + all 36 tool pages), plus closing per-tool-page SEO gaps.

---

## ✅ Done

### Phase 0 — Design tokens
- `app/globals.css` rewritten: neutral zinc/near-black scale (no purple tint in bg/border),
  single `--brand` token (`oklch(0.58 0.19 291)` ≈ `#7e5de0`), radius bumped to `0.75rem`,
  dead `Playfair Display`/`Montserrat` `@import` removed (was never even used).
- `app/layout.tsx`: wired real fonts via `next/font` — `geist/font/sans` + `geist/font/mono`
  (the `geist` package was already a dependency but never actually loaded; site fonts were
  silently falling back to system fonts before this). Replaced the 3-blob purple/pink/blue
  ambient glow with one restrained `bg-brand/10` glow. `theme-color` meta updated to `#7e5de0`.
- Verified: `npx next build` compiles clean after this phase.

### Phase 1 — Shared landing primitives (new files, all under `components/landing/shared/`)
- `section-eyebrow.tsx` — the `<span className="inline-flex ... font-mono">` label+rule pattern
- `section-heading.tsx` — the giant `font-display` H2 pattern
- `reveal.tsx` — `Reveal` component + `useInViewReveal` hook (replaces copy-pasted `IntersectionObserver` boilerplate)
- `use-auto-rotate.ts` — replaces copy-pasted `setInterval` index-rotation logic
- `cta-button-group.tsx` — the repeated primary/outline rounded button pair
- `stat-card.tsx` — the bordered stat/feature card shell

### Phase 2 — Landing sections
- Deleted (confirmed unused/dead, per your earlier answer): `metrics-section.tsx`,
  `pricing-section.tsx`, `testimonials-section.tsx`, `integrations-section.tsx`,
  `developers-section.tsx`, `ascii-scene.tsx`.
- Redesigned on new tokens + shared primitives: `navigation.tsx`, `hero-section.tsx`,
  `features-section.tsx`, `how-it-works-section.tsx`, `infrastructure-section.tsx`,
  `security-section.tsx`, `cta-section.tsx`, `footer-section.tsx`, `faq-section.tsx`,
  and the homepage tools grid in `app/page.tsx`.
- Verified: `npx next build` compiles clean after this phase (61/61 routes generated).
- Sanity-checked homepage over `curl` against the running dev server (200 OK, expected copy present).
- **Note:** no browser automation tool (no `chromium-cli`, no `playwright` installed) was
  available in this environment, so this was **not** visually screenshot-checked — only
  build success + curl content sanity. Recommend an actual visual pass in a browser before
  shipping.

### Not yet touched but relevant
- `components/landing/converter-section.tsx` — the real drag/drop/reorder tool used by
  `/jpg-to-pdf`, `/png-to-pdf`, `/heic-to-pdf` (it lives in `components/landing/` but is
  functionally a Tool component, not a marketing section). Needs the same color-token pass
  as the rest of `components/tools/*`. Not restyled yet.

---

## 🔲 Remaining — Phase 3: Tool pages (the big one)

### 3a. Build shared tool primitives
Create in `components/tools/shared/`:
- `ToolPageShell.tsx` — server component wrapping `Navigation` + hero header (title/badge/description
  as props) + `children` + `FooterSection`, replacing the ~20-line duplicated wrapper found
  identically in all 36 `app/*/page.tsx` files. Should also inject the per-tool JSON-LD
  (see Phase 4) via a `<script type="application/ld+json">`.
- `useFileDropzone.ts` (optional, nice-to-have, not required for the visual redesign) — shared
  drag/drop + file-input + progress/error/download state. **Lower priority than the color-token
  pass below** — extracting this touches actual logic in 32 files and is higher-risk; the
  color-token pass alone already achieves the visual redesign goal safely.

### 3b. Mechanical color-token pass across all 32 `components/tools/*Tool.tsx` files (+ `converter-section.tsx`)
This is the **safe, high-leverage** way to restyle all 32 tool components without touching any
PDF logic — every file uses the *exact same* hardcoded Tailwind color classes for chrome
(verified via grep: `purple-600` appears in all 32 files, etc). A ready-to-run script already
exists (was drafted but not yet executed — you interrupted before the run):

**Script location:** `C:\Users\Barath\AppData\Local\Temp\claude\e--iCreatePDF\0354222e-3a1e-4b91-afd8-511756810599\scratchpad\retoken.js`
(copy it into the repo, e.g. `scripts/retoken.js`, since the temp scratchpad will be cleaned up)

Run with:
```bash
node scripts/retoken.js components/tools
node scripts/retoken.js components/landing   # to catch converter-section.tsx too
```

Mapping it applies (regex-based, scoped to Tailwind utility-class contexts only — never touches
prose text like "black and white" in GrayscaleTool's copy):

| From | To |
|---|---|
| `bg-purple-600` | `bg-brand` |
| `hover:bg-purple-700` | `hover:bg-brand/90` |
| `text-purple-400`, `text-purple-500` | `text-brand` |
| `border-purple-500` | `border-brand` |
| `bg-purple-500/N` | `bg-brand/N` |
| `accent-purple-500` | `accent-brand` |
| `bg-zinc-950` | `bg-card` |
| `bg-zinc-900/30` | `bg-card/40` |
| `bg-zinc-900/50` | `bg-card/60` |
| `(bg|text|border|divide|placeholder|ring)-white(/N)?` | `$1-foreground$2` |
| `(bg|text|border)-black(/N)?` | `$1-background$2` |
| `#a78bfa` (canvas ink color, SignTool) | `#7e5de0` |
| `font-display text-foreground` | `font-display font-semibold text-foreground` (heading weight polish) |

Deliberately **left untouched** (semantic, not brand colors): `red-500`/`red-200` (error boxes),
`emerald-500`/`emerald-600`/`emerald-700`/`emerald-200` (success/download states).

**After running the script:** `npx next build` to confirm nothing broke, then spot-check 3-4
tool pages in a browser (drag/drop still works, progress bar renders, download button works).

### 3c. Rewrite all 36 `app/*/page.tsx` files
Each currently looks like (example, `app/merge-pdf/page.tsx`):
```tsx
export const metadata: Metadata = { title: '...', description: '...', alternates: { canonical: '/merge-pdf' }, ... };
export default function MergePdfPage() {
  return (
    <main className="relative min-h-screen ... bg-black text-white ...">
      <Navigation />
      <div className="pt-24 ...">
        <div className="... text-center ...">{/* badge, h1, description */}</div>
        <MergeTool />
      </div>
      <FooterSection />
    </main>
  );
}
```
Replace the `<main>...</main>` body with `<ToolPageShell badge="..." title="..." description="...">`
wrapping the existing `<MergeTool />`, once `ToolPageShell` exists (3a). Keep each page's own
`metadata` export, but fix its `alternates` via the Phase 4 helper (see below) instead of hand-rolling
`{ canonical: '/x' }`.

This is 36 small, uniform, low-risk edits — safe to batch (e.g. delegate to a subagent per batch of
8-10 files) **once `ToolPageShell`'s exact prop signature is finalized** by doing 2-3 by hand first
(`merge-pdf`, `compress-pdf`, `sign-pdf` — already fully read/understood, good exemplars).

---

## 🔲 Remaining — Phase 4: SEO fixes

- **`lib/seo.ts`** (new file): 
  - `toolSchema({ name, description, path })` → returns `SoftwareApplication` + `BreadcrumbList` JSON-LD.
    Currently **zero** of the 36 tool pages have any structured data (confirmed via
    `grep -rl "application/ld+json" app` → only `app/layout.tsx` matches).
  - `articleSchema({ title, description, path, datePublished })` → `BlogPosting` JSON-LD for the 12 blog posts (also currently zero).
  - `buildAlternates(canonicalPath)` → always spreads `{ 'en': '/', 'es': '/es', 'hi': '/hi', 'ta': '/ta' }`
    into every page's `alternates.languages`. **Bug found:** every non-homepage page currently
    defines its own `alternates: { canonical: '/x' }`, which Next.js metadata merging *replaces*
    rather than deep-merges — so the parent layout's `alternates.languages` (hreflang) is silently
    dropped on 51 of 56 pages. This helper fixes it in one place.
- Wire `toolSchema()` into `ToolPageShell` (automatic for all 36 tool pages) and `articleSchema()`
  into the blog post layout/template (12 posts).
- Use `buildAlternates()` in place of every hand-rolled `alternates: { canonical }` across all pages.
- `app/terms/page.tsx` — add a `metadata` export (trivial, it's already a server component, just missing it).
- `app/contact/page.tsx` — currently a `'use client'` component so it *cannot* export `metadata` at all.
  Fix: extract the interactive bits into a child client component (e.g. `ContactForm.tsx`) so
  `app/contact/page.tsx` itself can be a server component with a proper `metadata` export.
- **Deliberately out of scope** (flagged, not fixed): sitemap `lastModified` is always "now" (cosmetic,
  low priority); `/es`, `/hi`, `/ta` are homepage-only translations with no localized tool pages — once
  hreflang is fixed, non-English users technically get pointed at English tool content. This is a
  separate, larger localization project, not part of this redesign pass.

---

## Verification checklist (once above is done)

- [ ] `npx next build` (or `pnpm build`) — must compile clean; note `next.config.ts` has
      `typescript.ignoreBuildErrors: true`, so also skim for type errors manually rather than
      trusting a green build alone.
- [ ] `npx next dev`, manually check in an actual browser (no automation tool was available in
      this session — genuinely open it yourself): homepage, `/merge-pdf` (file-upload tool),
      `/markdown-to-pdf` (text-input tool), `/scan-to-pdf` (camera tool). Confirm drag/drop,
      progress, and download still work after the color-token pass and `ToolPageShell` migration.
- [ ] View source on 2-3 tool pages + 1 blog post, confirm the new JSON-LD renders and validates
      (paste into Google's Rich Results Test).
- [ ] View source on `/merge-pdf` (or any non-homepage page), confirm `<link rel="alternate" hreflang="...">`
      tags for es/hi/ta now appear (they don't today).

---

## Current git status (uncommitted)

```
 M app/globals.css
 M app/layout.tsx
 M app/page.tsx
 M components/landing/cta-section.tsx
 M components/landing/faq-section.tsx
 M components/landing/features-section.tsx
 M components/landing/footer-section.tsx
 M components/landing/hero-section.tsx
 M components/landing/how-it-works-section.tsx
 M components/landing/infrastructure-section.tsx
 M components/landing/navigation.tsx
 M components/landing/security-section.tsx
 D components/landing/ascii-scene.tsx
 D components/landing/developers-section.tsx
 D components/landing/integrations-section.tsx
 D components/landing/metrics-section.tsx
 D components/landing/pricing-section.tsx
 D components/landing/testimonials-section.tsx
?? components/landing/shared/
```

Nothing has been committed. Nothing in `components/tools/`, `components/landing/converter-section.tsx`,
or any `app/*/page.tsx` (tool pages) has been touched yet.
