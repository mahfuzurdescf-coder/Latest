import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ArticleCard } from '@/components/cards'
import { PortableText } from '@/components/portable-text/PortableText'
import { ShareButtons } from '@/components/share/ShareButtons'
import { buildArticleJSONLD, buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/types/sanity'

interface Props {
  params: {
    slug: string
  }
}

function formatContentType(contentType?: string): string {
  if (!contentType) return 'Article'

  return contentType
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDate(date?: string): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getPostDescription(post: Post): string {
  return (
    post.seoDescription ||
    post.excerpt ||
    'Read this DESCF article, field note, or conservation update.'
  )
}

function getPostCanonicalUrl(slug: string): string {
  return `https://descf.org/newsroom/${slug}`
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    tags: ['post'],
  })

  return (slugs ?? []).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })

  if (!post) {
    return buildMetadata({
      title: 'Article not found',
      description: 'The requested DESCF newsroom article could not be found.',
      canonicalUrl: getPostCanonicalUrl(params.slug),
    })
  }

  const ogImageUrl = post.ogImage
    ? urlForImage(post.ogImage)?.width(1200).height(630).url()
    : post.coverImage
      ? urlForImage(post.coverImage)?.width(1200).height(630).url()
      : undefined

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: getPostDescription(post),
    ogImage: ogImageUrl,
    canonicalUrl: getPostCanonicalUrl(params.slug),
  })
}

export default async function NewsroomArticlePage({ params }: Props) {
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })

  if (!post) notFound()

  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(900).url()
    : null

  const ogImageUrl = post.ogImage
    ? urlForImage(post.ogImage)?.width(1200).height(630).url()
    : coverImageUrl || undefined

  const canonicalUrl = getPostCanonicalUrl(params.slug)
  const contentTypeLabel = formatContentType(post.contentType)
  const publishedDateLabel = formatDate(post.publishedAt ?? post._createdAt)
  const modifiedDate = post.updatedAt ?? post._updatedAt ?? post.publishedAt ?? post._createdAt
  const authorName = post.author?.name ?? 'DESCF'

  const articleJsonLd = buildArticleJSONLD({
    title: post.title,
    description: getPostDescription(post),
    url: canonicalUrl,
    image: ogImageUrl,
    authorName,
    datePublished: post.publishedAt ?? post._createdAt,
    dateModified: modifiedDate,
  })

  const breadcrumbJsonLd = buildBreadcrumbJSONLD([
    {
      name: 'Home',
      url: 'https://descf.org',
    },
    {
      name: 'Newsroom',
      url: 'https://descf.org/newsroom',
    },
    {
      name: post.title,
      url: canonicalUrl,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content">
        <article>
          <header className="border-b border-earth-200 bg-earth-50">
            <div className="container-site section-padding-sm">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 text-sm text-earth-500"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-forest-800">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/newsroom" className="hover:text-forest-800">
                      Newsroom
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-earth-700" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              <div className="max-w-4xl">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-earth-600">
                  <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 font-medium text-forest-800">
                    {contentTypeLabel}
                  </span>

                  {post.category?.title && (
                    <Link
                      href={`/newsroom/category/${post.category.slug.current}`}
                      className="rounded-full border border-earth-200 bg-white px-3 py-1 font-medium text-earth-700 hover:border-forest-300 hover:text-forest-800"
                    >
                      {post.category.title}
                    </Link>
                  )}

                  {publishedDateLabel && <span>{publishedDateLabel}</span>}

                  {typeof post.readingTime === 'number' && post.readingTime > 0 && (
                    <span>{post.readingTime} min read</span>
                  )}
                </div>

                <h1 className="font-serif text-h1 leading-tight text-earth-900">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-earth-700">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-earth-600">
                  {post.author && (
                    <Link
                      href={`/newsroom/author/${post.author.slug.current}`}
                      className="font-medium text-forest-800 hover:text-forest-900"
                    >
                      By {post.author.name}
                    </Link>
                  )}

                  {post.coAuthors && post.coAuthors.length > 0 && (
                    <span>
                      With{' '}
                      {post.coAuthors
                        .map((coAuthor) => coAuthor.name)
                        .join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {coverImageUrl && (
            <div className="container-site pt-10">
              <figure className="overflow-hidden rounded-2xl border border-earth-200 bg-white">
                <Image
                  src={coverImageUrl}
                  alt={post.coverImage?.alt || post.title}
                  width={1600}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                />
                {(post.coverImage?.caption || post.coverImage?.alt) && (
                  <figcaption className="border-t border-earth-100 px-5 py-3 text-sm text-earth-500">
                    {post.coverImage.caption || post.coverImage.alt}
                  </figcaption>
                )}
              </figure>
            </div>
          )}

          <div className="container-site section-padding-sm">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="max-w-3xl">
                {post.body && post.body.length > 0 ? (
                  <div className="prose prose-earth max-w-none">
                    <PortableText value={post.body} />
                  </div>
                ) : (
                  <div className="rounded-xl border border-earth-200 bg-white p-8">
                    <h2 className="font-serif text-2xl text-earth-900">
                      Article content is not available yet
                    </h2>
                    <p className="mt-2 text-body text-earth-600">
                      This article has been published, but the full body content has not been added in the CMS yet.
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <ShareButtons
                  title={post.title}
                  description={getPostDescription(post)}
                  label="Share this article"
                />
                <div className="rounded-xl border border-earth-200 bg-white p-5">
                  <h2 className="font-serif text-xl text-earth-900">
                    Article details
                  </h2>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-earth-900">Type</dt>
                      <dd className="mt-1 text-earth-600">{contentTypeLabel}</dd>
                    </div>

                    {publishedDateLabel && (
                      <div>
                        <dt className="font-medium text-earth-900">Published</dt>
                        <dd className="mt-1 text-earth-600">
                          {publishedDateLabel}
                        </dd>
                      </div>
                    )}

                    {post.author?.name && (
                      <div>
                        <dt className="font-medium text-earth-900">Author</dt>
                        <dd className="mt-1 text-earth-600">
                          {post.author.name}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="rounded-xl border border-earth-200 bg-white p-5">
                    <h2 className="font-serif text-xl text-earth-900">Tags</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag._id}
                          href={`/newsroom/tag/${tag.slug.current}`}
                          className="rounded-full border border-earth-200 px-3 py-1 text-sm text-earth-600 hover:border-forest-300 hover:text-forest-800"
                        >
                          {tag.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="border-t border-earth-200 bg-earth-50">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Related reading</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  More from DESCF
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts.map((relatedPost) => (
                  <ArticleCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
