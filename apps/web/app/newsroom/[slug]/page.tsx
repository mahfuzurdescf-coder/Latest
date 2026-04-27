import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@/components/portable-text/PortableText'
import { ArticleCard, AuthorCard } from '@/components/cards'
import { Breadcrumbs, CategoryBadge, DonationCTA } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/image'
import { formatDate, formatDateShort } from '@/lib/utils'
import type { Post } from '@/types/sanity'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    tags: ['post'],
  })
  return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<Post>({
    query: POST_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })
  if (!post) return { title: 'Article not found' }

  const ogImageUrl = post.ogImage
    ? urlForImage(post.ogImage)?.width(1200).height(630).url()
    : post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : undefined

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      type: 'article',
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : [],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const post = await sanityFetch<Post>({
    query: POST_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })

  if (!post) notFound()

  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1400).height(700).url()
    : null

  const relatedPosts = post.relatedPosts ?? []

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: post.author
      ? { '@type': 'Person', name: post.author.name }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'DESCF',
      url: 'https://descf.org',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover image */}
      {coverUrl && (
        <div className="relative h-[40vh] md:h-[55vh] max-h-[600px] bg-earth-900">
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
          {post.coverImage?.caption && (
            <p className="absolute bottom-3 right-4 text-caption text-white/60 italic">
              {post.coverImage.caption}
            </p>
          )}
        </div>
      )}

      <div className="container-site section-padding">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 xl:gap-16">

          {/* ── Main article column ─────────────────────────────── */}
          <article className="min-w-0">

            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Newsroom', href: '/newsroom' },
                ...(post.category ? [{ label: post.category.title, href: `/newsroom/category/${post.category.slug.current}` }] : []),
                { label: post.title },
              ]}
              className="mb-6"
            />

            {/* Category + content type */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.category && (
                <CategoryBadge
                  title={post.category.title}
                  slug={post.category.slug.current}
                  colorLabel={post.category.colorLabel}
                />
              )}
              <span className="text-label text-earth-400 uppercase tracking-widest">
                {post.contentType.replace('-', ' ')}
              </span>
              {post.language === 'bn' && (
                <span className="text-label text-earth-400 bg-earth-100 px-2 py-0.5 rounded-md">বাংলা</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-h1 font-serif text-earth-900 mb-4 leading-[1.15]">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-body-lg text-earth-600 mb-7 leading-relaxed border-l-4 border-earth-200 pl-5">
                {post.excerpt}
              </p>
            )}

            {/* Author + meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-earth-200 mb-8">
              <div className="flex items-center gap-4">
                {post.author && <AuthorCard author={post.author} />}
                {post.coAuthors?.map(ca => (
                  <AuthorCard key={ca._id} author={ca} />
                ))}
              </div>
              <div className="flex items-center gap-4 text-caption text-earth-500">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <span>Updated {formatDateShort(post.updatedAt)}</span>
                )}
                {post.readingTime && (
                  <span>{post.readingTime} min read</span>
                )}
              </div>
            </div>

            {/* Body */}
            {post.body && (
              <PortableText value={post.body} />
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-earth-200">
                <span className="text-caption text-earth-400 mr-1 self-center">Tags:</span>
                {post.tags.map(tag => (
                  <Link
                    key={tag._id}
                    href={`/newsroom/tag/${tag.slug.current}`}
                    className="text-label px-3 py-1 rounded-full border border-earth-200 text-earth-600 hover:bg-earth-50 hover:border-earth-300 transition-colors"
                  >
                    {tag.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Author bio card */}
            {post.author && (
              <div className="mt-10 p-6 bg-earth-50 rounded-xl border border-earth-200 flex gap-5">
                <div className="flex-1">
                  <p className="text-label text-earth-400 mb-2 uppercase tracking-widest">Written by</p>
                  <Link
                    href={`/newsroom/author/${post.author.slug.current}`}
                    className="text-h5 font-medium text-earth-900 hover:text-forest-800 transition-colors"
                  >
                    {post.author.name}
                  </Link>
                  <p className="text-body-sm text-earth-600 mt-1">{post.author.orgRole ?? post.author.role}</p>
                </div>
              </div>
            )}

            {/* Donation CTA */}
            <DonationCTA className="mt-12" />

            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <h2 className="text-h3 font-serif text-earth-900 mb-6">Related articles</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {(relatedPosts).map((p) => (
                    <ArticleCard key={p._id} post={p} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="hidden lg:block space-y-6">

            {/* Article info */}
            <div className="bg-earth-50 rounded-xl border border-earth-200 p-5 text-sm space-y-3">
              <p className="section-label text-earth-400 mb-4">Article info</p>
              <div className="flex justify-between">
                <span className="text-earth-500">Published</span>
                <span className="text-earth-800 font-medium">{formatDate(post.publishedAt, 'd MMM yyyy')}</span>
              </div>
              {post.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-earth-500">Updated</span>
                  <span className="text-earth-800 font-medium">{formatDate(post.updatedAt, 'd MMM yyyy')}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex justify-between">
                  <span className="text-earth-500">Read time</span>
                  <span className="text-earth-800 font-medium">{post.readingTime} min</span>
                </div>
              )}
              {post.category && (
                <div className="flex justify-between">
                  <span className="text-earth-500">Category</span>
                  <CategoryBadge title={post.category.title} slug={post.category.slug.current} />
                </div>
              )}
            </div>

            {/* Tags sidebar */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-white rounded-xl border border-earth-200 p-5">
                <p className="section-label text-earth-400 mb-4">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag._id}
                      href={`/newsroom/tag/${tag.slug.current}`}
                      className="text-label px-2.5 py-1 rounded-full border border-earth-200 text-earth-600 hover:bg-earth-50 transition-colors"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky donate */}
            <div className="bg-forest-900 rounded-xl p-5 text-forest-50">
              <p className="section-label text-forest-500 mb-3">Support conservation</p>
              <p className="text-body-sm text-forest-300 mb-4 leading-relaxed">
                Help DESCF continue field work, rescue response, and conservation communication.
              </p>
              <Link href="/donate" className="btn-cta w-full justify-center">
                Support DESCF
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
