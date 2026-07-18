# Implementation Roadmap

## Phase 1: Foundation (Weeks 1-4)

- [ ] Connect GSC, GA4, and CrUX (via `seo-google` skill) to establish real traffic/ranking/CWV baselines — replace placeholder KPI values in `SEO-STRATEGY.md`
- [ ] Audit all 51 tool pages for `SoftwareApplication` + `FAQPage` schema presence/correctness (via `seo-schema` skill)
- [ ] Content audit of existing 22 blog posts for E-E-A-T gaps: author bio, last-updated date, screenshot freshness (via `seo-content` skill)
- [ ] Verify nav/footer surfaces all 51 tools within 2 clicks (fix if any tool is sitemap-only)
- [ ] Build `/smallpdf-alternative` and `/ilovepdf-alternative` landing pages
- [ ] Expand `/compare` into a hub with a real comparison table naming all 3 competitors

## Phase 2: Expansion (Weeks 5-12)

- [ ] Publish Priority 2 blog gap-fill posts, batch 1-2 (highest-volume unpaired tools — see `CONTENT-CALENDAR.md`)
- [ ] Launch `/no-upload-pdf-tools` privacy hub page
- [ ] Publish "how to verify a PDF tool isn't uploading your files" evergreen guide
- [ ] Add `/pdf24-alternative`
- [ ] Internal linking pass: confirm every tool page links to its paired post and vice versa; fill remaining gaps as posts publish
- [ ] Backlink baseline via `seo-backlinks` skill (Moz/Bing WMT/Common Crawl) to track Priority 5 progress later

## Phase 3: Scale (Weeks 13-24)

- [ ] Complete Priority 2 blog gap-fill (remaining batches)
- [ ] Begin es/hi/ta localization for top 10 tools (professional translation, phased sitemap inclusion)
- [ ] Device/OS-specific long-tail post batch (Priority 3)
- [ ] GEO pass via `seo-geo` skill: llms.txt, AI crawler accessibility, passage-level citability audit across tool + comparison pages
- [ ] Re-run CWV/technical audit (`seo-technical`) to confirm no regressions from new page volume

## Phase 4: Authority (Months 7-12)

- [ ] Complete es/hi/ta localization rollout for top 10 tools; evaluate expanding further based on Phase 3 performance
- [ ] Original benchmark/data piece (client-side vs. server-based processing) — outreach to tech press/blogs for citations
- [ ] Scope linkable-asset options (browser extension / embeddable widget) — separate engineering proposal, not committed here
- [ ] Full-year KPI review against targets in `SEO-STRATEGY.md`; reset 12-month targets for next cycle

## Dependencies & Notes

- KPI baselines (Phase 1, item 1) block accurate target-setting — do this first, in parallel with schema/content audits.
- Comparison pages (Phase 1) must follow nominative-fair-use guidance in `seo-competitor-pages` — no false or unverifiable claims about competitors, no implied affiliation.
- Localization (Phase 3-4) is gated on translation quality, not calendar time — do not add machine-translated pages to the sitemap to hit a date.
- Re-run this plan's KPI section quarterly as real GSC/GA4 data replaces the initial placeholders.
