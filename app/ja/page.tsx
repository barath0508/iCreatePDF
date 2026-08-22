import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/landing/navigation';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InfrastructureSection } from '@/components/landing/infrastructure-section';
import { SecuritySection } from '@/components/landing/security-section';
import { CtaSection } from '@/components/landing/cta-section';
import { FooterSection } from '@/components/landing/footer-section';
import { SectionEyebrow } from '@/components/landing/shared/section-eyebrow';
import { SectionHeading } from '@/components/landing/shared/section-heading';
import { Reveal } from '@/components/landing/shared/reveal';
import { 
  Combine, Scissors, Sliders, Type, Hash, FileImage, Image,
  Minimize2, RotateCw, Unlock, Camera, FileText
} from 'lucide-react';
import { buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'iCreatePDF - PDF結合・圧縮・変換ツール（完全無料・サーバー送信なし）',
  description: 'ブラウザ上で安全にPDFの結合、圧縮、ページ分割、Word変換ができる無料ツール。ファイルがサーバーにアップロードされないため機密文書も安心。',
  keywords: 'pdf 結合, pdf 圧縮, pdf ページ 削除, pdf ロック解除, jpg pdf 変換, pdf 分割, icreatepdf 日本語',
  alternates: buildAlternates('/ja'),
};

const toolsJa = [
  {
    icon: Combine,
    title: 'PDF 結合',
    desc: '複数のPDFファイルを任意の順番で1つのドキュメントに結合します。',
    href: '/merge-pdf',
  },
  {
    icon: Minimize2,
    title: 'PDF 圧縮',
    desc: '画質を保ちながらファイルサイズを大幅に縮小します。',
    href: '/compress-pdf',
  },
  {
    icon: Scissors,
    title: 'PDF 分割',
    desc: '特定のページ範囲を抽出したり、各ページを個別のPDFに分割します。',
    href: '/split-pdf',
  },
  {
    icon: FileText,
    title: 'PDFをWordに変換',
    desc: 'PDFファイルを編集可能なWord文書（.docx）に素早く変換します。',
    href: '/pdf-to-word',
  },
  {
    icon: Image,
    title: 'JPGをPDFに変換',
    desc: 'JPG、PNG、HEIC画像を整理されたPDFドキュメントに変換します。',
    href: '/jpg-to-pdf',
  },
  {
    icon: FileImage,
    title: 'PDFをJPGに変換',
    desc: 'PDFの全ページを高解像度なJPEG画像として一括抽出します。',
    href: '/pdf-to-jpg',
  },
  {
    icon: Sliders,
    title: 'PDF ページ整理',
    desc: 'ページの並び替え、回転、不要なページの削除を視覚的に行えます。',
    href: '/organize-pdf',
  },
  {
    icon: RotateCw,
    title: 'PDF 回転',
    desc: '向きが異なるPDFページを90度単位で正しい向きに回転します。',
    href: '/rotate-pdf',
  },
  {
    icon: Unlock,
    title: 'PDF ロック解除',
    desc: 'パスワードや編集制限がかかったPDFファイルの保護を解除します。',
    href: '/unlock-pdf',
  },
  {
    icon: Camera,
    title: 'スキャンしてPDF化',
    desc: 'スマホやPCのカメラを使って紙の書類を直接PDFに変換します。',
    href: '/scan-to-pdf',
  },
  {
    icon: Type,
    title: '透かし（ウォーターマーク）',
    desc: 'すべてのページに任意の文字やロゴの透かしを追加します。',
    href: '/watermark-pdf',
  },
  {
    icon: Hash,
    title: 'ページ番号の追加',
    desc: 'ヘッダーやフッターにお好みの形式でページ番号を自動挿入します。',
    href: '/add-page-numbers',
  },
];

export default function JapaneseHomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-brand/30">
      <Navigation />
      
      {/* Localized Hero Context */}
      <div className="relative pt-32 pb-4 text-center space-y-4 bg-background">
        <SectionEyebrow className="justify-center">日本語対応サービス</SectionEyebrow>
        <Reveal>
          <SectionHeading as="h1" className="text-center">
            PDFツール <br />
            <span className="text-muted-foreground">100% 安全・サーバー送信ゼロ</span>
          </SectionHeading>
        </Reveal>
        <p className="text-foreground/40 text-sm max-w-xl mx-auto px-4">
          すべての処理はお使いのブラウザ内部で完結します。大切な書類が外部サーバーに送信されることは一切ありません。
        </p>
      </div>

      {/* Tools Dashboard Grid */}
      <section id="convert" className="py-12 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsJa.map((tool, idx) => (
              <Reveal key={tool.title} delay={Math.min(idx * 30, 300)}>
                <Link 
                  href={tool.href}
                  className="group relative p-8 bg-card/50 border border-border hover:border-brand/40 hover:bg-card transition-all duration-300 rounded-2xl flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-xl bg-foreground/[0.03] border border-border group-hover:bg-brand group-hover:border-brand transition-all text-brand group-hover:text-brand-foreground">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-foreground group-hover:text-brand transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-brand uppercase tracking-widest pt-4 transition-colors">
                    ツールを開く &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
