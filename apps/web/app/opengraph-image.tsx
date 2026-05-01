import { ImageResponse } from 'next/og'

export const alt = 'DESCF - Deep Ecology and Snake Conservation Foundation'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f7f3ec 0%, #dfe9dc 55%, #345b3a 100%)',
          padding: 72,
          color: '#2f241c',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#345b3a',
          }}
        >
          DESCF
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 70,
              lineHeight: 1,
              maxWidth: 940,
              color: '#2f241c',
            }}
          >
            Deep Ecology and Snake Conservation Foundation
          </div>

          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 900,
              color: '#4d4034',
            }}
          >
            Biodiversity conservation, snake conservation, public awareness,
            research, and coexistence in Bangladesh.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#f7f3ec',
          }}
        >
          <span>descf.org</span>
          <span>Research · Awareness · Coexistence</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
