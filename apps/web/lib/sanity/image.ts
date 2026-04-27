import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from './client'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Returns a responsive image URL with sane defaults.
 * Always call .url() at the end.
 *
 * Example:
 *   urlForImage(post.coverImage).width(1200).url()
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return null
  return builder.image(source).auto('format').fit('max')
}
