import type { Metadata } from 'next'

interface BuildMetadataInput {
  title: string
  description?: string
  ogImage?: string | null
  canonicalUrl?: string
}

const SITE_URL = 'https://www.descf.org'

const DEFAULT_DESCRIPTION =
  'A Bangladesh-based wildlife conservation organization working on biodiversity, snake conservation, public awareness, research, and human-wildlife coexistence.'

const DEFAULT_OG_IMAGE = 'https://www.descf.org/og-descf-default.png'

function buildTitle(title: string): string {
  const cleanTitle = title.trim()

  if (
    cleanTitle.includes('DESCF') ||
    cleanTitle.includes('Deep Ecology and Snake Conservation Foundation')
  ) {
    return cleanTitle
  }

  return `${cleanTitle} | DESCF`
}

function normalizeUrl(url?: string | null): string {
  if (!url) return DEFAULT_OG_IMAGE

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (url.startsWith('/')) {
    return `${SITE_URL}${url}`
  }

  return DEFAULT_OG_IMAGE
}

export function buildMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
}: BuildMetadataInput): Metadata {
  const pageTitle = buildTitle(title)
  const metaDescription = description || DEFAULT_DESCRIPTION
  const pageUrl = canonicalUrl || SITE_URL
  const imageUrl = normalizeUrl(ogImage)

  return {
    title: {
      absolute: pageTitle,
    },
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      siteName: 'DESCF',
      title: pageTitle,
      description: metaDescription,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  }
}
