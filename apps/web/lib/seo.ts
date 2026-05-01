import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/utils'

interface BuildMetadataInput {
  title: string
  description?: string
  ogImage?: string | null
  canonicalUrl?: string
}

const DEFAULT_DESCRIPTION =
  'A Bangladesh-based wildlife conservation organization working on biodiversity, snake conservation, public awareness, research, and human-wildlife coexistence.'

const DEFAULT_OG_IMAGE = absoluteUrl('/og-default.png')

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

export function buildMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
}: BuildMetadataInput): Metadata {
  const pageTitle = buildTitle(title)
  const metaDescription = description || DEFAULT_DESCRIPTION
  const pageUrl = canonicalUrl || absoluteUrl('/')
  const imageUrl = ogImage || DEFAULT_OG_IMAGE

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
