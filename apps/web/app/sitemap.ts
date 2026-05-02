// apps/web/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import {
  PROKRITI_KOTHA_SITEMAP_QUERY,
  SITEMAP_QUERY,
  SNAKE_SPECIES_SITEMAP_QUERY,
} from '@/lib/sanity/queries'
import { absoluteUrl } from '@/lib/utils'

interface SitemapData {
  posts: { slug: string; _updatedAt: string }[]
  programmes: { slug: string; _updatedAt: string }[]
  categories: { slug: string }[]
  events: { slug: string; _updatedAt: string }[]
}

interface SitemapEntry {
  slug: string
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [data, prokritiArticles, snakeSpecies] = await Promise.all([
    sanityFetch<SitemapData>({
      query: SITEMAP_QUERY,
      tags: ['post', 'programme', 'category', 'event'],
    }),
    sanityFetch<SitemapEntry[]>({
      query: PROKRITI_KOTHA_SITEMAP_QUERY,
      tags: ['prokritiKothaArticle'],
    }),
    sanityFetch<SitemapEntry[]>({
      query: SNAKE_SPECIES_SITEMAP_QUERY,
      tags: ['speciesProfile', 'wildlifeGroup'],
    }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/mission'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/team'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/current-work'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/programmes'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/strategic-priorities'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/evidence-resources'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/reports'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/newsroom'), lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/prokriti-kotha'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: absoluteUrl('/bangladesh-wildlife'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: absoluteUrl('/bangladesh-wildlife/snakes'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: absoluteUrl('/events'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/partner'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/donate'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/governance'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const posts = (data?.posts ?? []).map((post) => ({
    url: absoluteUrl(`/newsroom/${post.slug}`),
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const programmes = (data?.programmes ?? []).map((programme) => ({
    url: absoluteUrl(`/programmes/${programme.slug}`),
    lastModified: new Date(programme._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const categories = (data?.categories ?? []).map((category) => ({
    url: absoluteUrl(`/newsroom/category/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const events = (data?.events ?? []).map((event) => ({
    url: absoluteUrl(`/events/${event.slug}`),
    lastModified: new Date(event._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const prokritiKothaPages = (prokritiArticles ?? []).map((article) => ({
    url: absoluteUrl(`/prokriti-kotha/${article.slug}`),
    lastModified: new Date(article._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const snakeSpeciesPages = (snakeSpecies ?? []).map((species) => ({
    url: absoluteUrl(`/bangladesh-wildlife/snakes/${species.slug}`),
    lastModified: new Date(species._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...posts,
    ...programmes,
    ...categories,
    ...events,
    ...prokritiKothaPages,
    ...snakeSpeciesPages,
  ]
}
