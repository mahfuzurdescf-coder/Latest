// apps/web/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { SITEMAP_QUERY } from '@/lib/sanity/queries'
import { absoluteUrl } from '@/lib/utils'

interface SitemapData {
  posts:       { slug: string; _updatedAt: string }[]
  programmes:  { slug: string; _updatedAt: string }[]
  categories:  { slug: string }[]
  events:      { slug: string; _updatedAt: string }[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityFetch<SitemapData>({
    query: SITEMAP_QUERY,
    tags: ['post', 'programme', 'category', 'event'],
  })

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'),                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0  },
    { url: absoluteUrl('/about'),                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: absoluteUrl('/mission'),               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: absoluteUrl('/leadership'),            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: absoluteUrl('/current-work'),          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8  },
    { url: absoluteUrl('/programmes'),            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8  },
    { url: absoluteUrl('/strategic-priorities'),  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: absoluteUrl('/evidence-resources'),    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7  },
    { url: absoluteUrl('/reports'),               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7  },
    { url: absoluteUrl('/newsroom'),              lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9  },
    { url: absoluteUrl('/events'),                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7  },
    { url: absoluteUrl('/partner'),               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
    { url: absoluteUrl('/donate'),                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: absoluteUrl('/governance'),            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
    { url: absoluteUrl('/contact'),               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
  ]

  const posts = (data?.posts ?? []).map(p => ({
    url: absoluteUrl(`/newsroom/${p.slug}`),
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const programmes = (data?.programmes ?? []).map(p => ({
    url: absoluteUrl(`/programmes/${p.slug}`),
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const categories = (data?.categories ?? []).map(c => ({
    url: absoluteUrl(`/newsroom/category/${c.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const events = (data?.events ?? []).map(e => ({
    url: absoluteUrl(`/events/${e.slug}`),
    lastModified: new Date(e._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...posts, ...programmes, ...categories, ...events]
}
