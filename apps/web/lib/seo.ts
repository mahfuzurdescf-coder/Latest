import { SITE } from './site'

export type SEOProps = {
  title?: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
}

export function buildMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
  twitterCard = 'summary_large_image',
}: SEOProps) {
  const metaTitle = title ? `${title} | ${SITE.name}` : SITE.name
  const metaDescription = description || SITE.description
  const metaOgImage = ogImage || SITE.ogImage
  const metaCanonical = canonicalUrl || SITE.url

  return {
    title: metaTitle,
    description: metaDescription,
    canonical: metaCanonical,
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      url: metaCanonical,
      images: [
        {
          url: metaOgImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      site: SITE.shortName,
      title: metaTitle,
      description: metaDescription,
      images: [metaOgImage],
    },
  }
}