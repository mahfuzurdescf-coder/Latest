import { createClient } from 'next-sanity'

const apiVersion = '2025-01-01'

export function getSanityWriteClient() {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    '7guoe2i2'

  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    'production'

  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN environment variable.')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}
