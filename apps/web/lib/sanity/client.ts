import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = '2024-05-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // For draft previews — keep token server-side only
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'https://studio.descf.org',
  },
})

/**
 * Typed fetch helper — wraps client.fetch with revalidation tags.
 * Use this in all Server Components instead of calling client.fetch directly.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      // ISR revalidation — override per-query with specific tags
      tags: tags.length > 0 ? tags : ['sanity'],
    },
  })
}
