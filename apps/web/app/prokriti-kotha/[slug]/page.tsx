import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { PortableText } from '@/components/portable-text/PortableText'
import { ShareButtons } from '@/components/share/ShareButtons'
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
          <header className="bg-forest-950 text-white">
            <div className="container-site py-16 sm:py-20 lg:py-24">
              <nav
                aria-label="Breadcrumb"
                className="mb-10 text-sm text-white/65"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/prokriti-kotha"
                      className="transition hover:text-white"
                    >
                      Prokriti Kotha
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white" aria-current="page">
                    {article.title}
                  </li>
                </ol>
              </nav>

              <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_460px]">
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                      {categoryLabel}
                    </span>

                    {article.language && (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                        {article.language === 'bn' ? 'Bangla' : 'English'}
                      </span>
                    )}

                    {publishedDateLabel && (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                        {publishedDateLabel}
                      </span>
                    )}
                  </div>

                  <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {article.title}
                  </h1>

                  {article.excerpt && (
                    <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
                    <span>
                      By {article.author?.name || 'DESCF Editorial'}
                    </span>

                    {typeof article.readingTime === 'number' &&
                      article.readingTime > 0 && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{article.readingTime} min read</span>
                        </>
                      )}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-card-lg">
                  {coverImageUrl ? (
                    <figure className="overflow-hidden rounded-[1.5rem] bg-white/5">
                      <Image
                        src={coverImageUrl}
                        alt={article.coverImage?.alt || article.title}
                        width={1200}
                        height={850}
                        priority
                        className="aspect-[4/3] w-full object-cover"
                      />
                      {(article.coverImage?.caption ||
                        article.coverImage?.credit) && (
                        <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/65">
                          {article.coverImage.caption}
                          {article.coverImage.caption &&
                          article.coverImage.credit
                            ? ' — '
                            : ''}
                          {article.coverImage.credit}
                        </figcaption>
                      )}
                    </figure>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-white/10 p-8 text-center">
                      <div>
                        <p className="section-label mb-3 text-amber-200">
                          Prokriti Kotha
                        </p>
                        <p className="font-serif text-3xl text-white">
                          Editorial article
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <section className="border-b border-earth-200 bg-earth-50">
            <div className="container-site py-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-earth-200 bg-white p-5">
                  <p className="section-label mb-2">Section</p>
                  <p className="font-serif text-2xl text-earth-950">
                    Prokriti Kotha
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-white p-5">
                  <p className="section-label mb-2">Article type</p>
                  <p className="font-serif text-2xl text-earth-950">
                    {categoryLabel}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-white p-5">
                  <p className="section-label mb-2">Reading time</p>
                  <p className="font-serif text-2xl text-earth-950">
                    {typeof article.readingTime === 'number' &&
                    article.readingTime > 0
                      ? (
                          <>{article.readingTime} min read</>
                        )
                      : (
                          'Not specified'
                        )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="container-site section-padding-sm">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                <div className="rounded-[2rem] border border-earth-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                  {article.body && article.body.length > 0 ? (
                    <div className="prose prose-earth max-w-none">
                      <PortableText value={article.body} />
                    </div>
                  ) : (
                    <div>
                      <p className="section-label mb-4">Article body</p>
                      <h2 className="font-serif text-3xl text-earth-950">
                        Full article content is being prepared
                      </h2>
                      <p className="mt-4 max-w-2xl text-body leading-8 text-earth-700">
                        This article has been published, but the full body
                        content has not been added in Sanity Studio yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                <ShareButtons
                  title={article.title}
                  description={getArticleDescription(article)}
                  label="Share this article"
                />

                <div className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
                  <h2 className="font-serif text-xl text-earth-950">
                    Article details
                  </h2>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-semibold text-earth-950">Category</dt>
                      <dd className="mt-1 text-earth-650">{categoryLabel}</dd>
                    </div>

                    {publishedDateLabel && (
                      <div>
                        <dt className="font-semibold text-earth-950">
                          Published
                        </dt>
                        <dd className="mt-1 text-earth-650">
                          {publishedDateLabel}
                        </dd>
                      </div>
                    )}

                    <div>
                      <dt className="font-semibold text-earth-950">Author</dt>
                      <dd className="mt-1 text-earth-650">
                        {article.author?.name || 'DESCF Editorial'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="font-serif text-xl text-earth-950">
                    Editorial safety note
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-earth-700">
                    DESCF content is for education and conservation awareness.
                    It should not be treated as snake handling, catching, or
                    rescue instruction.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {article.relatedSpecies && article.relatedSpecies.length > 0 && (
          <section className="border-t border-earth-200 bg-[#f7f2e8]">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Field-guide connection</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  Species connected to this story
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
          <section className="border-t border-earth-200 bg-earth-50">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Continue reading</p>
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





