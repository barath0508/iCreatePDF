import { ImageResponse } from 'next/og';

export const alt = 'iCreatePDF — free, private browser-based PDF tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #100d1d 0%, #211a3a 55%, #7e5de0 150%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '72px',
          width: '100%',
        }}
      >
        <div style={{ color: '#c6b7ff', display: 'flex', fontSize: 32, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' }}>
          iCreatePDF
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, letterSpacing: -3, marginTop: 28, textAlign: 'center', whiteSpace: 'pre-wrap' }}>
          {'Free PDF tools.\nPrivate by design.'}
        </div>
        <div style={{ color: '#ddd6fe', display: 'flex', fontSize: 31, marginTop: 34, textAlign: 'center' }}>
          Merge, convert, compress, edit, sign, and protect — all in your browser.
        </div>
      </div>
    ),
    size,
  );
}
