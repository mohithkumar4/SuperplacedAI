import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#141413',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 72px 44px',
          position: 'relative',
          color: '#faf9f5',
        }}
      >
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                fontSize: 72,
                lineHeight: 1,
                fontWeight: 500,
                color: '#faf9f5',
              }}
            >
              SuperPlaced AI
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.3,
                color: '#87867f',
                fontWeight: 400,
              }}
            >
              Career Acceleration Platform
            </div>
          </div>

          <div
            style={{
              fontSize: 160,
              lineHeight: 1,
              fontWeight: 500,
              color: '#c96442',
            }}
          >
            S
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 14 }}>
          <div style={{ width: '100%', height: 2, background: '#c96442' }} />
          <div style={{ fontSize: 26, color: '#c96442', letterSpacing: 0.5 }}>superplaced.in</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
