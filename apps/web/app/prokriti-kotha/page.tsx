import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { prokritiKothaArticlesQuery } from '@/lib/sanity/queries'
import type { ProkritiKothaArticleCard } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'প্রকৃতি কথা | DESCF',
  description:
    'প্রকৃতি, বন্যপ্রাণী, সাপ, সংরক্ষণ, মাঠ-অভিজ্ঞতা ও বিজ্ঞানভিত্তিক জনসচেতনতা নিয়ে DESCF-এর editorial section.',
  alternates: {
    canonical: 'https://descf.org/prokriti-kotha',
  },
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

function ArticleCard({ article }: { article: ProkritiKothaArticleCard }) {
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(900).height(600).url()
    : null

  const href = `/prokriti-kotha/${article.slug.current}`
  const dateLabel = formatDate(article.publishedAt ?? article._createdAt)

  return (
    <article className="group overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={href} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-forest-50 px-6 text-center">
            <span className="font-serif text-2xl text-forest-800">
              প্রকৃতি কথা
            </span>
          </div>
        )}

        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-earth-500">
            <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 font-medium text-forest-800">
              {formatCategory(article.category)}
            </span>

            {dateLabel && <span>{dateLabel}</span>}

            {typeof article.readingTime === 'number' && article.readingTime > 0 && (
              <span>{article.readingTime} min read</span>
            )}
          </div>

          <h2 className="font-serif text-2xl leading-tight text-earth-900 group-hover:text-forest-900">
            {article.title}
          </h2>

          {article.excerpt && (
            <p className="mt-3 line-clamp-3 text-body text-earth-600">
              {article.excerpt}
            </p>
          )}

          {article.author?.name && (
            <p className="mt-5 text-sm font-medium text-earth-600">
              By {article.author.name}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

export default async function ProkritiKothaPage() {
  const articles = await sanityFetch<ProkritiKothaArticleCard[]>({
    query: prokritiKothaArticlesQuery,
    tags: ['prokritiKothaArticle'],
  })

  const validArticles = (articles ?? []).filter(
    (article) => article.slug?.current,
  )

  const featuredArticle = validArticles.find((article) => article.featured)
  const remainingArticles = featuredArticle
    ? validArticles.filter((article) => article._id !== featuredArticle._id)
    : validArticles

  const featuredImageUrl = featuredArticle?.coverImage
    ? urlForImage(featuredArticle.coverImage)?.width(1400).height(800).url()
    : null

  return (
    <main id="main-content">
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site section-padding">
          <div className="max-w-4xl">
            <p className="section-label mb-4">DESCF Editorial</p>
            <h1 className="font-serif text-h1 leading-tight text-earth-900">
              প্রকৃতি কথা
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-earth-700">
              প্রকৃতি, বন্যপ্রাণী, সাপ, সংরক্ষণ, মাঠ-অভিজ্ঞতা এবং
              বিজ্ঞানভিত্তিক জনসচেতনতা নিয়ে DESCF-এর সাহিত্যধর্মী ও
              গবেষণাভিত্তিক লেখা।
            </p>
          </div>
        </div>
      </section>

      {featuredArticle && (
        <section className="bg-white">
          <div className="container-site section-padding-sm">
            <div className="mb-8">
              <p className="section-label mb-3">Featured</p>
              <h2 className="font-serif text-h2 text-earth-900">
                নির্বাচিত লেখা
              </h2>
            </div>

            <article className="overflow-hidden rounded-3xl border border-earth-200 bg-earth-50 shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                {featuredImageUrl ? (
                  <div className="relative min-h-[320px] bg-earth-100">
                    <Image
                      src={featuredImageUrl}
                      alt={featuredArticle.coverImage?.alt || featuredArticle.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center bg-forest-50 px-8 text-center">
                    <span className="font-serif text-4xl text-forest-800">
                      প্রকৃতি কথা
                    </span>
                  </div>
                )}

                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-earth-500">
                    <span className="rounded-full border border-forest-200 bg-white px-3 py-1 font-medium text-forest-800">
                      {formatCategory(featuredArticle.category)}
                    </span>

                    {formatDate(featuredArticle.publishedAt) && (
                      <span>{formatDate(featuredArticle.publishedAt)}</span>
                    )}
                  </div>

                  <h2 className="font-serif text-3xl leading-tight text-earth-900 lg:text-4xl">
                    {featuredArticle.title}
                  </h2>

                  {featuredArticle.excerpt && (
                    <p className="mt-5 text-body leading-8 text-earth-700">
                      {featuredArticle.excerpt}
                    </p>
                  )}

                  <div className="mt-7">
                    <Link
                      href={`/prokriti-kotha/${featuredArticle.slug.current}`}
                      className="btn-primary"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="container-site section-padding-sm">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-3">All articles</p>
              <h2 className="font-serif text-h2 text-earth-900">
                সব লেখা
              </h2>
            </div>

            <Link href="/newsroom" className="text-sm font-medium text-forest-800 hover:text-forest-900">
              Visit newsroom
            </Link>
          </div>

          {validArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-earth-200 bg-earth-50 p-8">
              <h2 className="font-serif text-2xl text-earth-900">
                No Prokriti Kotha articles published yet
              </h2>
              <p className="mt-3 max-w-2xl text-body text-earth-600">
                Articles will appear here after they are written, reviewed, and published from Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
