import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { prokritiKothaArticlesQuery } from '@/lib/sanity/queries'
import type { ProkritiKothaArticleCard } from '@/types/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'প্রকৃতি কথা | DESCF',
  description:
    'প্রকৃতি, বন্যপ্রাণী, সহাবস্থান, মাঠ-অভিজ্ঞতা ও সংরক্ষণ ভাবনা নিয়ে DESCF-এর সাহিত্যধর্মী nature editorial section.',
  alternates: {
    canonical: 'https://descf.org/prokriti-kotha',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'nature-essay': 'Nature Essay',
  'field-note': 'Field Note',
  'conservation-story': 'Conservation Story',
  'rescue-experience': 'Rescue Experience',
  'myth-busting': 'Myth Busting',
  'community-writing': 'Community Writing',
  'opinion-feature': 'Opinion / Feature',
}

const CATEGORY_CHIPS = [
  'Nature Essay',
  'Field Note',
  'Conservation Story',
  'Myth Busting',
  'Community Writing',
  'Opinion / Feature',
]

function formatCategory(category?: string): string {
  if (!category) return 'Article'
  return CATEGORY_LABELS[category] || category
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
    ? urlForImage(article.coverImage)?.width(900).height(620).url()
    : null

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-earth-200/80 bg-white/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-lg">
      <Link href={`/prokriti-kotha/${article.slug.current}`} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-950/20 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-forest-50 via-earth-50 to-amber-50 px-6 text-center">
            <span className="font-serif text-3xl text-forest-800">
              প্রকৃতি কথা
            </span>
          </div>
        )}

        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-earth-500">
            <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 font-medium text-forest-800">
              {formatCategory(article.category)}
            </span>

            {formatDate(article.publishedAt ?? article._createdAt) && (
              <span>{formatDate(article.publishedAt ?? article._createdAt)}</span>
            )}

            {typeof article.readingTime === 'number' && article.readingTime > 0 && (
              <span>{article.readingTime} min read</span>
            )}
          </div>

          <h2 className="font-serif text-2xl leading-tight text-earth-900 group-hover:text-forest-900">
            {article.title}
          </h2>

          {article.excerpt && (
            <p className="mt-3 line-clamp-3 text-body leading-7 text-earth-600">
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

  const featuredArticle = validArticles.find((article) => article.featured) ?? validArticles[0]
  const remainingArticles = featuredArticle
    ? validArticles.filter((article) => article._id !== featuredArticle._id)
    : validArticles

  const featuredImageUrl = featuredArticle?.coverImage
    ? urlForImage(featuredArticle.coverImage)?.width(1400).height(900).url()
    : null

  return (
    <main id="main-content" className="bg-[#f7f3ec]">
      <section className="relative overflow-hidden border-b border-earth-200 bg-gradient-to-br from-[#f8f4ed] via-[#f1eee4] to-[#dfe9dc]">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-forest-200/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/55 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/55 blur-3xl" />

        <div className="container-site relative section-padding">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
            <div className="max-w-4xl">
              <p className="section-label mb-5">Nature Editorial</p>

              <h1 className="font-serif text-[4.2rem] leading-[0.92] tracking-tight text-earth-900 md:text-[6rem] lg:text-[7rem]">
                প্রকৃতি কথা
              </h1>

              <p className="mt-8 max-w-3xl text-xl leading-9 text-earth-700">
                প্রকৃতি, বন্যপ্রাণী, সহাবস্থান ও মাঠের অভিজ্ঞতা নিয়ে DESCF-এর
                সাহিত্যধর্মী editorial space. এখানে থাকবে nature writing,
                field note, conservation story, myth-busting এবং মানুষের সঙ্গে
                বন্যপ্রাণীর সম্পর্ক নিয়ে ভাবনা।
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#latest-writings" className="btn-primary">
                  লেখা পড়ুন
                </Link>
                <Link
                  href="/bangladesh-wildlife/snakes"
                  className="rounded-full border border-forest-300 bg-white/70 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-white"
                >
                  বাংলাদেশের সাপ দেখুন
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/60 p-4 shadow-xl shadow-earth-900/5 backdrop-blur">
              {featuredArticle ? (
                <Link
                  href={`/prokriti-kotha/${featuredArticle.slug.current}`}
                  className="group block overflow-hidden rounded-[1.5rem] bg-white"
                >
                  {featuredImageUrl ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
                      <Image
                        src={featuredImageUrl}
                        alt={featuredArticle.coverImage?.alt || featuredArticle.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 430px, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-950/40 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-forest-50 via-earth-50 to-amber-50 px-8 text-center">
                      <span className="font-serif text-4xl text-forest-800">
                        প্রকৃতি কথা
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <p className="section-label mb-3">Featured writing</p>
                    <h2 className="font-serif text-3xl leading-tight text-earth-900 group-hover:text-forest-900">
                      {featuredArticle.title}
                    </h2>
                    {featuredArticle.excerpt && (
                      <p className="mt-3 line-clamp-3 text-body leading-7 text-earth-600">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ) : (
                <div className="rounded-[1.5rem] bg-white p-8">
                  <p className="section-label mb-3">Coming soon</p>
                  <h2 className="font-serif text-3xl text-earth-900">
                    লেখা প্রকাশের অপেক্ষায়
                  </h2>
                  <p className="mt-3 text-body leading-7 text-earth-600">
                    Prokriti Kotha articles will appear here after they are
                    published from Sanity Studio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#fbf8f2]">
        <div className="container-site py-10">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="section-label mb-3">Editorial note</p>
              <h2 className="font-serif text-3xl text-earth-900">
                মাঠের অভিজ্ঞতা থেকে মানুষের ভাষায় প্রকৃতির গল্প
              </h2>
            </div>
            <p className="text-body leading-8 text-earth-700">
              DESCF-এর কাজ শুধু conservation data বা rescue update নয়। প্রকৃতি
              নিয়ে মানুষের ভয়, ভুল ধারণা, স্মৃতি, সহাবস্থান ও শেখার গল্পও
              গুরুত্বপূর্ণ। “প্রকৃতি কথা” সেই জায়গা—যেখানে বিজ্ঞান, মাঠের
              অভিজ্ঞতা এবং সাহিত্যিক অনুভব একসাথে আসে।
            </p>
          </div>
        </div>
      </section>

      <section id="latest-writings" className="bg-[#f7f3ec]">
        <div className="container-site section-padding-sm">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-3">Latest writings</p>
              <h2 className="font-serif text-h2 text-earth-900">
                সাম্প্রতিক লেখা
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
                nature essay, field note, conservation story, rescue experience
                এবং myth-busting লেখা এক জায়গায়।
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORY_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-earth-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-earth-600"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {validArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(remainingArticles.length > 0 ? remainingArticles : validArticles).map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-earth-200 bg-white/80 p-8 shadow-sm">
              <h2 className="font-serif text-2xl text-earth-900">
                No Prokriti Kotha articles published yet
              </h2>
              <p className="mt-3 max-w-2xl text-body leading-7 text-earth-600">
                Articles will appear here after they are written, reviewed, and
                published from Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-earth-200 bg-gradient-to-r from-forest-900 via-forest-800 to-earth-900 text-white">
        <div className="container-site py-14">
          <div className="max-w-4xl">
            <p className="section-label mb-4 text-forest-100">
              Thoughtful conservation
            </p>
            <blockquote className="font-serif text-3xl leading-snug md:text-4xl">
              প্রকৃতিকে বোঝার শুরু হয় ভয় কমিয়ে, মনোযোগ বাড়িয়ে, আর সহাবস্থানের
              ভাষা শেখার মধ্য দিয়ে।
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f2]">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-sm">
              <p className="section-label mb-3">Field guide</p>
              <h2 className="font-serif text-3xl text-earth-900">
                বাংলাদেশের সাপ
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                species profile, local name, venom status, habitat, distribution
                এবং safety note সহ DESCF-এর digital field guide.
              </p>
              <Link
                href="/bangladesh-wildlife/snakes"
                className="mt-6 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-900"
              >
                Snake field guide
              </Link>
            </div>

            <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-sm">
              <p className="section-label mb-3">DESCF mission</p>
              <h2 className="font-serif text-3xl text-earth-900">
                Research, awareness, coexistence
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                biodiversity conservation, snake conservation, public awareness
                এবং community learning—এই কাজগুলোর গল্প ও ব্যাখ্যা পড়ুন
                DESCF-এর wider content sections-এ।
              </p>
              <Link
                href="/current-work"
                className="mt-6 inline-flex rounded-full border border-forest-300 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-forest-50"
              >
                Explore our work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
