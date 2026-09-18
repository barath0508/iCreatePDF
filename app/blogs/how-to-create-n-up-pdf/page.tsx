import type { Metadata } from 'next';
import { buildAlternates, articleSchema } from '@/lib/seo';
import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Calendar, Clock, ChevronLeft, ArrowRight, ShieldCheck, Check, Layers, Printer, Grid, Scissors, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Create N-up PDF Pages: Complete Grid Imposition & Multi-Page Layout Guide',
  description: 'Master N-up PDF imposition. Learn how to place 2, 4, 6, or 9 pages onto a single sheet for lecture handouts, paper-saving printing, and proof sheets using local browser processing.',
  keywords: 'n-up pdf, multiple pages per sheet pdf, print multiple pages on one page pdf, 2-up pdf maker, 4-up pdf layout, print grid pages pdf free, n-up page layout generator, pdf imposition client side',
  alternates: buildAlternates('/blogs/how-to-create-n-up-pdf'),
  openGraph: {
    title: 'How to Create N-up PDF Pages: Complete Grid Imposition & Multi-Page Layout Guide',
    description: 'Master N-up PDF imposition. Learn how to place 2, 4, 6, or 9 pages onto a single sheet for lecture handouts, paper-saving printing, and proof sheets using local browser processing.',
    type: 'article',
    publishedTime: '2026-07-25T00:00:00Z',
    authors: ['Barath R'],
  },
};

export default function HowTo_create_n_up_pdfPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does "N-up" mean in PDF printing and prepress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"N-up" is a printing term where "N" represents the number of distinct document pages scaled down and arranged in a grid onto a single physical or virtual sheet of paper (such as 2-up, 4-up, or 9-up). It is widely used to cut paper consumption by 50% to 75%, create lecture slide handouts, and produce contact proof sheets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does creating an N-up layout rasterize vector text and line art?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Our browser-based N-up tool applies affine coordinate transformation matrices directly to existing PDF content streams using PDF-lib. Text remains selectable vector typefaces, embedded fonts are preserved, and vector diagrams remain pin-sharp at any zoom level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best N-up layout for presentation slides versus text documents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For landscape 16:9 or 4:3 presentation slides, 2-up (stacked vertically on portrait paper) or 4-up (2x2 grid on landscape paper) provides optimal balance between paper savings and font legibility. For standard A4/Letter text documents, 2-up landscape (two portrait pages side-by-side) is ideal; 4-up text often shrinks 10pt body text down to 5pt, which is difficult to read without magnification.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my confidential documents uploaded to a remote server for layout imposition?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never. All PDF parsing, coordinate math, scaling, and file re-assembly occur entirely inside your browser memory using WebAssembly and client-side JavaScript. Your documents never touch external infrastructure.',
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between selection:bg-brand/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...articleSchema({
              title: 'How to Create N-up PDF Pages: Complete Grid Imposition & Multi-Page Layout Guide',
              description: 'Master N-up PDF imposition. Learn how to place 2, 4, 6, or 9 pages onto a single sheet for lecture handouts, paper-saving printing, and proof sheets using local browser processing.',
              url: '/blogs/how-to-create-n-up-pdf',
              datePublished: '2026-07-25T00:00:00Z',
            }),
            faqSchema,
          ]),
        }}
      />
      <Navigation />

      <main className="pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Guides & Articles
          </Link>

          {/* Article Header */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 font-bold">
                Printing & Imposition
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" /> July 25, 2026
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> 8 min read
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                By <Link href="/authors/barath-r" className="text-foreground hover:underline font-medium">Barath R</Link> (Lead Systems Engineer)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display text-foreground leading-tight">
              How to Create N-up PDF Pages: Multi-Page Grid Imposition Guide
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl font-sans">
              Printing multi-page PDFs one page per sheet wastes stacks of paper and produces bulky binders. Learn how N-up imposition places 2, 4, 6, or 9 pages onto a single sheet with millimeter-accurate margins, pristine vector retention, and zero cloud uploads.
            </p>
          </div>

          {/* Direct Tool Launch Box */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground font-display">Zero-Upload Client Imposition</h4>
                <p className="text-xs text-muted-foreground">Re-arrange pages into grids locally in browser memory. Uncompromising security for enterprise briefs.</p>
              </div>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs shrink-0">
              <Link href="/n-up-pdf">
                Open N-up Studio <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Deep Content Section */}
          <div className="prose prose-invert max-w-none space-y-8 text-sm text-foreground/80 leading-relaxed font-sans">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <Grid className="w-5 h-5 text-brand" /> What is N-up PDF Imposition?
              </h2>
              <p>
                In professional prepress printing, <strong>imposition</strong> is the arrangement of individual pages on a single printing sheet before folding, binding, or distribution. When applied to modern desktop PDFs, this technique is universally designated as <strong>N-up</strong> (where <em>N</em> denotes the quantity of logical pages printed per physical sheet side).
              </p>
              <p>
                Common configurations include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><strong>2-up (2 Pages per Sheet):</strong> Places two portrait letter/A4 pages side-by-side onto a landscape sheet, or two landscape slides stacked vertically on a portrait page. Reduces paper usage by exactly 50% while maintaining high legibility.</li>
                <li><strong>4-up (4 Pages in a 2×2 Grid):</strong> Slices page consumption by 75%. Ideal for executive presentation slide decks, lecture handouts, code review packets, and storyboards.</li>
                <li><strong>6-up (3×2 or 2×3 Grid):</strong> Popular for technical speaker notes, thumbnail indices, and rapid visual inspection across multi-chapter revisions.</li>
                <li><strong>9-up / 16-up (Thumbnail Proof Sheets):</strong> Essential for design portfolios, architectural contact sheets, and large print runs where visual index references precede production.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand" /> The Mathematics of PDF Coordinate Imposition
              </h2>
              <p>
                Unlike basic consumer printer drivers that convert your entire document into a blurry, downscaled 150 DPI bitmap before printing, professional client-side N-up generation manipulates the underlying PDF postscript vector coordinate space.
              </p>
              <p>
                In standard PDF specifications (ISO 32000-1), page content is governed by a <strong>Current Transformation Matrix (CTM)</strong> defined through the <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">cm</code> operator:
              </p>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 font-mono text-xs text-foreground/90 space-y-2">
                <p className="text-muted-foreground font-sans text-xs">Standard 2D Affine Transformation Matrix:</p>
                <code>[ x&apos;  y&apos;  1 ] = [ x  y  1 ] × | a  b  0 |<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| c  d  0 |<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| e  f  1 |</code>
              </div>
              <p>
                When our tool mounts an input page into an N-up grid cell, it calculates exact uniform scaling coefficients:
              </p>
              <div className="p-4 rounded-xl bg-card border border-border/60 text-xs space-y-2">
                <p className="font-semibold text-foreground">Cell Dimension Calculation:</p>
                <p className="text-muted-foreground">
                  <code className="text-foreground">Scale = min((CellWidth - 2 × Gutter) / PageWidth, (CellHeight - 2 × Gutter) / PageHeight)</code>
                </p>
                <p className="text-muted-foreground">
                  The matrix terms <code className="text-foreground">e</code> and <code className="text-foreground">f</code> translate the scaled page to the exact cell origin <code className="text-foreground">(X_offset, Y_offset)</code>, ensuring each cell maintains uniform gutter margins and equal padding. Because the original vector stream is wrapped in a Form XObject (<code className="text-foreground">/Do</code> operator), fonts, embedded vector bezier curves, and high-resolution photography remain untouched.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <Printer className="w-5 h-5 text-brand" /> Step-by-Step: Creating N-up Pages with iCreatePDF
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-mono text-xs shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-foreground">Import Your Master PDF</h3>
                    <p className="text-muted-foreground text-xs">Open the <Link href="/n-up-pdf" className="text-brand underline font-medium">N-up PDF Studio Tool</Link>. Drop your document into the canvas. Your file is read locally by JavaScript ArrayBuffers without sending a single byte to an external server.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-mono text-xs shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-foreground">Select Grid Density (2, 4, 6, 9)</h3>
                    <p className="text-muted-foreground text-xs">Choose the grid arrangement tailored to your target output. For slides, select 2-up portrait or 4-up landscape. For documentation review, select 2-up landscape side-by-side.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-mono text-xs shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-foreground">Configure Reading Flow & Sheet Margins</h3>
                    <p className="text-muted-foreground text-xs">Select your page imposition flow: Horizontal (Left-to-Right then Top-to-Bottom) or Vertical (Top-to-Bottom then Left-to-Right). Toggle optional thin border divider lines to clearly distinguish adjacent slides during printing.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-mono text-xs shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-foreground">Compile & Download the Imposed PDF</h3>
                    <p className="text-muted-foreground text-xs">Click Process. The tool calculates cell bounds, maps Form XObjects, compiles the output catalog, and streams the finished PDF directly to your device downloads folder instantly.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <Scissors className="w-5 h-5 text-brand" /> Imposition Matrix: Layouts Compared
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border/80">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/60 border-b border-border text-foreground font-semibold font-display">
                      <th className="p-3">Layout Grid</th>
                      <th className="p-3">Paper Orientation</th>
                      <th className="p-3">Ideal Use Case</th>
                      <th className="p-3">Paper Reduction</th>
                      <th className="p-3">Text Legibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground font-sans">
                    <tr className="hover:bg-muted/20">
                      <td className="p-3 font-semibold text-foreground">2-Up Landscape</td>
                      <td className="p-3">Landscape (A4/Letter)</td>
                      <td className="p-3">Standard A4 text documents, book proofs</td>
                      <td className="p-3 text-emerald-400 font-mono">50% Saved</td>
                      <td className="p-3">Excellent (≈71% of original scale)</td>
                    </tr>
                    <tr className="hover:bg-muted/20">
                      <td className="p-3 font-semibold text-foreground">2-Up Portrait</td>
                      <td className="p-3">Portrait (A4/Letter)</td>
                      <td className="p-3">16:9 / 4:3 widescreen presentation slides</td>
                      <td className="p-3 text-emerald-400 font-mono">50% Saved</td>
                      <td className="p-3">Very High (generous slide margin)</td>
                    </tr>
                    <tr className="hover:bg-muted/20">
                      <td className="p-3 font-semibold text-foreground">4-Up Landscape (2×2)</td>
                      <td className="p-3">Landscape (A4/Letter)</td>
                      <td className="p-3">Lecture handouts, meeting slide decks</td>
                      <td className="p-3 text-emerald-400 font-mono">75% Saved</td>
                      <td className="p-3">High for 18pt+ slide headers</td>
                    </tr>
                    <tr className="hover:bg-muted/20">
                      <td className="p-3 font-semibold text-foreground">6-Up Grid (3×2)</td>
                      <td className="p-3">Portrait or Landscape</td>
                      <td className="p-3">Technical briefing notes, summary decks</td>
                      <td className="p-3 text-emerald-400 font-mono">83% Saved</td>
                      <td className="p-3">Moderate (best for headline scanning)</td>
                    </tr>
                    <tr className="hover:bg-muted/20">
                      <td className="p-3 font-semibold text-foreground">9-Up Grid (3×3)</td>
                      <td className="p-3">Portrait or Landscape</td>
                      <td className="p-3">Graphic catalogs, photo portfolios, thumbnails</td>
                      <td className="p-3 text-emerald-400 font-mono">89% Saved</td>
                      <td className="p-3">Index only (not meant for body reading)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand" /> Best Practices for Flawless Printing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Account for Duplex Gutter Margins
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    If you intend to double-side print (duplex) and bind handouts with staples or spiral coils, preserve at least a 15mm outer margin gutter. This prevents binding hardware from puncturing edge text.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Vector Preservation vs Rasterization
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Always use PDF-to-PDF imposition rather than screenshotting slides into a word processor. Native vector transformation retains embedded Type 1 and TrueType font hinting for crisp print edges.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Choose the Right Sheet Orientation
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Matching your imposition sheet orientation to the aspect ratio of the combined grid avoids massive white dead-zones. A 2×2 grid of landscape slides forms an overall landscape geometry; place it on a landscape sheet.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Enable Thin Grid Dividers
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    When printing white-background slides onto white paper, adjacent slides can visually bleed together. Enabling 0.5pt light gray border lines establishes clean visual demarcation for note-takers.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">What does &ldquo;N-up&rdquo; mean in PDF printing and prepress?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    &ldquo;N-up&rdquo; is a printing standard where &ldquo;N&rdquo; represents the number of distinct document pages scaled down and positioned in a matrix onto a single physical or virtual sheet of paper (such as 2-up, 4-up, or 9-up). It is widely used to cut paper consumption by 50% to 75%, compile presentation handouts, and generate visual contact sheets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">Does creating an N-up layout rasterize vector text and line art?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    No. Our browser-based N-up tool applies affine coordinate transformation matrices directly to existing PDF content streams using PDF-lib. Text remains selectable vector typefaces, embedded fonts are preserved, and vector diagrams remain pin-sharp at any zoom level.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">What is the best N-up layout for presentation slides versus text documents?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For landscape 16:9 or 4:3 presentation slides, 2-up (stacked vertically on portrait paper) or 4-up (2x2 grid on landscape paper) provides optimal balance between paper savings and font legibility. For standard A4/Letter text documents, 2-up landscape (two portrait pages side-by-side) is ideal; 4-up text often shrinks 10pt body text down to 5pt, which is difficult to read without magnification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">Are my confidential documents uploaded to a remote server for layout imposition?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Never. All PDF parsing, coordinate math, scaling, and file re-assembly occur entirely inside your browser memory using WebAssembly and client-side JavaScript. Your documents never touch external infrastructure.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Author Byline / E-E-A-T Footer */}
          <div className="mt-12 p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-lg font-display shrink-0">
              BR
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground font-display">
                Written by <Link href="/authors/barath-r" className="text-brand hover:underline">Barath R</Link>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Lead Software Engineer at iCreatePDF specializing in client-side WebAssembly, PDF-lib imposition, and browser-first document security. Read our <Link href="/editorial-policy" className="text-foreground underline font-medium">Editorial Policy & Testing Matrix</Link>.
              </p>
            </div>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
