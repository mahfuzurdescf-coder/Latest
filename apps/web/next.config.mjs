/** @type {import('next').NextConfig} */

const SANITY_API_VERSION = '2025-01-01'

async function getSanityRedirects() {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    '7guoe2i2'

  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    'production'

  if (!projectId || !dataset) {
    console.warn('Sanity projectId or dataset missing. Skipping CMS redirects.')
    return []
  }

  const query = `
    *[_type == "redirect" && defined(source) && defined(destination)] {
      source,
      destination,
      permanent
    }
  `

  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${encodeURIComponent(query)}`

  try {
    const headers = {}

    if (process.env.SANITY_API_READ_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SANITY_API_READ_TOKEN}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      console.warn(`Failed to fetch Sanity redirects: ${response.status}`)
      return []
    }

    const json = await response.json()
    const redirects = Array.isArray(json.result) ? json.result : []

    return redirects
      .filter((redirect) => {
        return (
          typeof redirect.source === 'string' &&
          redirect.source.startsWith('/') &&
          typeof redirect.destination === 'string' &&
          redirect.destination.length > 0
        )
      })
      .map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent !== false,
      }))
  } catch (error) {
    console.warn('Failed to load Sanity redirects. Skipping CMS redirects.', error)
    return []
  }
}

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  async redirects() {
    return getSanityRedirects()
  },
}

export default nextConfig