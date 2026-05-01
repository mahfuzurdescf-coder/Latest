import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/utils'

interface BuildMetadataInput {
  title: string
  description?: string
  ogImage?: string | null
  canonicalUrl?: string
}

const DEFAULT_DESCRIPTION =
  'Deep Ecology and Snake Conservation Foundation works on biodiversity conservation, snake conservation, public awareness, research, and coexistence in Bangladesh.'

const DEFAULT_OG_IMAGE = absoluteUrl('/og-default.png')

export function buildMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
}: BuildMetadataInput): Metadata {
  const metaDescription = description || DEFAULT_DESCRIPTION
  const pageUrl = canonicalUrl || absoluteUrl('/')
  const imageUrl = ogImage || DEFAULT_OG_IMAGE

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      siteName: 'DESCF',
      title,
      description: metaDescription,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: [imageUrl],
    },
  }
}

