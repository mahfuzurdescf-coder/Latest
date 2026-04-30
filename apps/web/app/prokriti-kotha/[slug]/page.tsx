import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { PortableText } from '@/components/portable-text/PortableText'
import { buildArticleJSONLD, buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  prokritiKothaArticleBySlugQuery,
  prokritiKothaArticleSlugsQuery,
} from '@/lib/sanity/queries'
import type {
  ProkritiKothaArticle,
  ProkritiKothaArticleCard,
  SpeciesProfileCard,
} from '@/types/sanity'

interface Props {
  params: {
    slug: string
  }
}

function formatCategory(category?: string): string {
  if (!category) return 'Article'

  const labels: Record<string, string> = {
    'nature-essay': 'Nature Essay',
    'field-note': 'Field Note',
    'conservation-story': 'Conservation Story',
    'rescue-experience': 'Rescue Experience',
    'myth-busting': 'Myth Busting',
    'community-writing': 'Community Writing',
    'opinion-feature': 'Opinion / Feature',
  }

  return labels[category] || category
}

function formatDate(date?: string): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getArticleDescription(article: ProkritiKothaArticle): string {
  return (
    article.seoDescription ||
    article.excerpt ||
    'Read this DESCF Prokriti Kotha article on nature, wildlife, conservation, and community knowledge.'
  )
}

function getCanonicalUrl(slug: string): string {
  return `https://descf.org/prokriti-kotha/${slug}`
}

function RelatedArticleCard({ article }: { article: ProkritiKothaArticleCard }) {
  const href = `/prokriti-kotha/${article.slug.current}`
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(700).height(450).url()
    : null

  return (
    <article className="overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={href} className="block">
        {imageUrl && (
          <div className="relative aspect-[4/3] bg-earth-100">
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-5">
          <p className="text-sm font-medium text-forest-800">
            {formatCategory(article.category)}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-tight text-earth-900">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-earth-600">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

function RelatedSpeciesCard({ species }: { species: SpeciesProfileCard }) {
  const href = `/bangladesh-wildlife/snakes/${species.slug.current}`
  const imageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(700).height(450).url()
    : null

  return (
    <article className="overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={href} className="block">
        {imageUrl && (
          <div className="relative aspect-[4/3] bg-earth-100">
            <Image
              src={imageUrl}
              alt={species.primaryImage?.alt || species.englishName}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-5">
          <p className="text-sm font-medium text-forest-800">
            {species.banglaName}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-tight text-earth-900">
            {species.englishName}
          </h3>
          <p className="mt-1 text-sm italic text-earth-500">
            {species.scientificName}
          </p>
          {species.shortDescription && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-earth-600">
              {species.shortDescription}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: prokritiKothaArticleSlugsQuery,
    tags: ['prokritiKothaArticle'],
  })

  return (slugs ?? [])
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await sanityFetch<ProkritiKothaArticle | null>({
    query: prokritiKothaArticleBySlugQuery,
    params: { slug: params.slug },
    tags: ['prokritiKothaArticle'],
  })

  if (!article) {
    return buildMetadata({
      title: 'Prokriti Kotha article not found',
      description: 'The requested DESCF Prokriti Kotha article could not be found.',
      canonicalUrl: getCanonicalUrl(params.slug),
    })
  }

  const ogImageUrl = article.ogImage
    ? urlForImage(article.ogImage)?.width(1200).height(630).url()
    : article.coverImage
      ? urlForImage(article.coverImage)?.width(1200).height(630).url()
      : undefined

  return buildMetadata({
    title: article.seoTitle || article.title,
    description: getArticleDescription(article),
    ogImage: ogImageUrl,
    canonicalUrl: getCanonicalUrl(params.slug),
  })
}

export default async function ProkritiKothaArticlePage({ params }: Props) {
  const article = await sanityFetch<ProkritiKothaArticle | null>({
    query: prokritiKothaArticleBySlugQuery,
    params: { slug: params.slug },
    tags: ['prokritiKothaArticle'],
  })

  if (!article) notFound()

  const coverImageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(1600).height(900).url()
    : null

  const ogImageUrl = article.ogImage
    ? urlForImage(article.ogImage)?.width(1200).height(630).url()
    : coverImageUrl || undefined

  const canonicalUrl = getCanonicalUrl(params.slug)
  const categoryLabel = formatCategory(article.category)
  const publishedDateLabel = formatDate(article.publishedAt ?? article._createdAt)
  const modifiedDate = article._updatedAt ?? article.publishedAt ?? article._createdAt
  const authorName = article.author?.name ?? 'DESCF'

  const articleJsonLd = buildArticleJSONLD({
    title: article.title,
    description: getArticleDescription(article),
    url: canonicalUrl,
    image: ogImageUrl,
    authorName,
    datePublished: article.publishedAt ?? article._createdAt,
    dateModified: modifiedDate,
  })

  const breadcrumbJsonLd = buildBreadcrumbJSONLD([
    {
      name: 'Home',
      url: 'https://descf.org',
    },
    {
      name: 'Prokriti Kotha',
      url: 'https://descf.org/prokriti-kotha',
    },
    {
      name: article.title,
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
                    <Link href="/prokriti-kotha" className="hover:text-forest-800">
                      Prokriti Kotha
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-earth-700" aria-current="page">
                    {article.title}
                  </li>
                </ol>
              </nav>

              <div className="max-w-4xl">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-earth-600">
                  <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 font-medium text-forest-800">
                    {categoryLabel}
                  </span>

                  {article.language && (
                    <span className="rounded-full border border-earth-200 bg-white px-3 py-1 font-medium text-earth-700">
                      {article.language === 'bn' ? 'Bangla' : 'English'}
                    </span>
                  )}

                  {publishedDateLabel && <span>{publishedDateLabel}</span>}

                  {typeof article.readingTime === 'number' && article.readingTime > 0 && (
                    <span>{article.readingTime} min read</span>
                  )}
                </div>

                <h1 className="font-serif text-h1 leading-tight text-earth-900">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-earth-700">
                    {article.excerpt}
                  </p>
                )}

                {article.author?.name && (
                  <p className="mt-7 text-sm font-medium text-forest-800">
                    By {article.author.name}
                  </p>
                )}
              </div>
            </div>
          </header>

          {coverImageUrl && (
            <div className="container-site pt-10">
              <figure className="overflow-hidden rounded-2xl border border-earth-200 bg-white">
                <Image
                  src={coverImageUrl}
                  alt={article.coverImage?.alt || article.title}
                  width={1600}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                />
                {(article.coverImage?.caption || article.coverImage?.credit) && (
                  <figcaption className="border-t border-earth-100 px-5 py-3 text-sm text-earth-500">
                    {article.coverImage.caption}
                    {article.coverImage.caption && article.coverImage.credit ? ' — ' : ''}
                    {article.coverImage.credit}
                  </figcaption>
                )}
              </figure>
            </div>
          )}

          <div className="container-site section-padding-sm">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="max-w-3xl">
                {article.body && article.body.length > 0 ? (
                  <div className="prose prose-earth max-w-none">
                    <PortableText value={article.body} />
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
                <div className="rounded-xl border border-earth-200 bg-white p-5">
                  <h2 className="font-serif text-xl text-earth-900">
                    Article details
                  </h2>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-earth-900">Section</dt>
                      <dd className="mt-1 text-earth-600">Prokriti Kotha</dd>
                    </div>

                    <div>
                      <dt className="font-medium text-earth-900">Category</dt>
                      <dd className="mt-1 text-earth-600">{categoryLabel}</dd>
                    </div>

                    {publishedDateLabel && (
                      <div>
                        <dt className="font-medium text-earth-900">Published</dt>
                        <dd className="mt-1 text-earth-600">
                          {publishedDateLabel}
                        </dd>
                      </div>
                    )}

                    {article.author?.name && (
                      <div>
                        <dt className="font-medium text-earth-900">Author</dt>
                        <dd className="mt-1 text-earth-600">
                          {article.author.name}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="font-serif text-xl text-earth-900">
                    Safety note
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-earth-700">
                    DESCF content is for education and conservation awareness. It should not be treated as snake handling, catching, or rescue instruction.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {article.relatedSpecies && article.relatedSpecies.length > 0 && (
          <section className="border-t border-earth-200 bg-earth-50">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Related species</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  Species connected to this article
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {article.relatedSpecies
                  .filter((species) => species.slug?.current)
                  .map((species) => (
                    <RelatedSpeciesCard key={species._id} species={species} />
                  ))}
              </div>
            </div>
          </section>
        )}

        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Related reading</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  More from Prokriti Kotha
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {article.relatedArticles
                  .filter((relatedArticle) => relatedArticle.slug?.current)
                  .map((relatedArticle) => (
                    <RelatedArticleCard
                      key={relatedArticle._id}
                      article={relatedArticle}
                    />
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

