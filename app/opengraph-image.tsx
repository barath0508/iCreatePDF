import { ImageResponse } from 'next/og';

export const alt = 'iCreatePDF \u2014 46+ Free PDF Tools. Private by Design. No Uploads.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0d0a1a 0%, #1a1030 50%, #2d1f5e 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '72px 80px',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Brand badge */}
        <div style={{
          color: '#a78bfa',
          display: 'flex',
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 24,
          background: 'rgba(167, 139, 250, 0.12)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          borderRadius: 40,
          padding: '8px 20px',
        }}>
          iCreatePDF \u2022 46+ Free Tools
        </div>

        {/* Main headline */}
        <div style={{
          display: 'flex',
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: -3,
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: 28,
        }}>
          {'Free PDF Tools.\nPrivate by Design.'}
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#c4b5fd',
          display: 'flex',
          fontSize: 28,
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: 40,
          maxWidth: 900,
        }}>
          Merge \u2022 Compress \u2022 Convert \u2022 Edit \u2022 Sign \u2022 OCR \u2022 Protect
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex',
          gap: 20,
          flexDirection: 'row',
        }}>
          {['No Uploads', 'No Sign-up', 'No Limits', '100% Free'].map((badge) => (
            <div key={badge} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              color: '#e2d9ff',
              fontSize: 20,
              fontWeight: 700,
              padding: '10px 20px',
              display: 'flex',
            }}>
              \u2713 {badge}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          color: 'rgba(255,255,255,0.35)',
          fontSize: 18,
          fontWeight: 500,
          display: 'flex',
        }}>
          icreatepdf.online
        </div>
      </div>
    ),
    size,
  );
}
