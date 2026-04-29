import { SITE } from './site'

export type JSONLDOptions = {
  title: string
  description?: string
  url?: string
  image?: string
  authorName?: string
  datePublished?: string
  dateModified?: string
}

export function buildArticleJSONLD({
  title,
  description,
  url,
  image,
  authorName,
  datePublished,
  dateModified,
}: JSONLDOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || SITE.description,
    url: url || SITE.url,
    image: image || SITE.ogImage,
    author: {
      '@type': 'Person',
      name: authorName || SITE.shortName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE.ogImage,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
  }
}

export function buildOrganizationJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: SITE.ogImage,
    },
  }
}

export function buildBreadcrumbJSONLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
