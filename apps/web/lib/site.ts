import { env } from '@/lib/env'

export const SITE = {
  name: 'Deep Ecology and Snake Conservation Foundation',
  shortName: 'DESCF',
  description:
    'Deep Ecology and Snake Conservation Foundation is a Bangladesh-based conservation organisation working on biodiversity, snake conservation, public awareness, research, and human-wildlife coexistence.',
  url: env.NEXT_PUBLIC_SITE_URL,
  studioUrl: env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  defaultLocale: 'en',
  alternateLocale: 'bn',
  brandColor: '#406034',
  ogImage: '/og-default.jpg',
  contactEmail: 'info@descf.org',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },
} as const

export type SitePath = `/${string}` | ''

export function getSiteUrl(path: SitePath = ''): string {
  const cleanPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${SITE.url}${cleanPath}`
}

export function getCanonicalUrl(path: SitePath = ''): string {
  return getSiteUrl(path)
}
