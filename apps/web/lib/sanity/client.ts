import { createClient } from 'next-sanity'
import { env, isPreviewDeployment, isProduction } from '@/lib/env'

export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = '2024-05-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isProduction && !isPreviewDeployment,
  token: env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: isPreviewDeployment,
    studioUrl: env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags: tags.length > 0 ? tags : ['sanity'],
      revalidate,
    },
  })
}
