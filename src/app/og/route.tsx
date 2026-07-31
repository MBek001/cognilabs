import { ImageResponse } from 'next/og'

// Generated 1200x630 social share image, served at /og. Referenced as the default og:image.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b0b0d 0%, #0a1a3a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '4px',
              background: '#0066FF',
              marginRight: '18px',
            }}
          />
          <div style={{ fontSize: '30px', color: '#93c5fd', letterSpacing: '8px', fontWeight: 600 }}>
            COGNILABS
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '108px', fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>
          IT Services &
        </div>
        <div style={{ display: 'flex', fontSize: '108px', fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>
          Software Dev
        </div>

        <div style={{ display: 'flex', fontSize: '42px', color: '#cbd5e1', marginTop: '30px' }}>
          Web · Mobile · AI · Telegram Bots · CRM/ERP
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '56px',
          }}
        >
          <div style={{ display: 'flex', fontSize: '36px', color: '#60a5fa', fontWeight: 600 }}>
            Tashkent, Uzbekistan
          </div>
          <div style={{ display: 'flex', fontSize: '32px', color: '#94a3b8' }}>
            www.cognilabs.org
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
