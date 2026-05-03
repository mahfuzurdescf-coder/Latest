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
    'প্রকৃতি, বন্যপ্রাণী, সহাবস্থান, মাঠ-অভিজ্ঞতা ও সংরক্ষণ ভাবনা নিয়ে DESCF-এর editorial space.',
  alternates: {
    canonical: 'https://www.descf.org/prokriti-kotha',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'nature-essay': 'Nature essay',
  'field-note': 'Field note',
  'conservation-story': 'Conservation story',
  'rescue-experience': 'Rescue experience',
  'myth-busting': 'Myth-busting',
  'community-writing': 'Community writing',
  'opinion-feature': 'Opinion feature',
}

function getCategoryLabel(category?: string) {
  if (!category) return 'Editorial'
  return CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ')
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: ProkritiKothaArticleCard
  featured?: boolean
}) {
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)
        ?.width(featured ? 1200 : 800)
        .height(featured ? 760 : 520)
        .url()
    : null

  const href = `/prokriti-kotha/${article.slug.current}`
  const categoryLabel = getCategoryLabel(article.category)

  return (
    <article
      className={[
        'group overflow-hidden rounded-[1.75rem] border border-earth-200 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-forest-300 hover:shadow-card-lg',
        featured ? 'grid lg:grid-cols-[1.08fr_0.92fr]' : 'flex flex-col',
      ].join(' ')}
    >
      <Link
        href={href}
        className={[
          'relative block overflow-hidden bg-gradient-to-br from-forest-50 via-white to-earth-100',
          featured ? 'min-h-[320px] lg:min-h-full' : 'aspect-[4/3]',
        ].join(' ')}
        tabIndex={-1}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes={featured ? '(max-width: 1024px) 100vw, 48vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
            <span className="font-serif text-3xl leading-tight text-forest-900">
              প্রকৃতি কথা
            </span>
          </div>
        )}
      </Link>

      <div className={featured ? 'flex flex-col p-7 sm:p-9' : 'flex flex-1 flex-col p-6'}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest-800">
            {categoryLabel}
          </span>

          {article.featured ? (
            <span className="rounded-full border border-bark-200 bg-bark-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-bark-700">
              Featured
            </span>
          ) : null}

          {article.readingTime ? (
            <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-xs font-semibold text-earth-600">
              {article.readingTime} মিনিট পড়া
            </span>
          ) : null}
        </div>

        <Link href={href}>
          <h2
            className={[
              'font-serif leading-tight text-earth-950 transition group-hover:text-forest-800',
              featured ? 'text-4xl sm:text-5xl' : 'text-3xl',
            ].join(' ')}
          >
            {article.title}
          </h2>
        </Link>

        {article.excerpt ? (
          <p className="mt-4 text-body leading-8 text-earth-700">
            {article.excerpt}
          </p>
        ) : (
          <p className="mt-4 text-body leading-8 text-earth-700">
            প্রকৃতি, সহাবস্থান, মাঠের অভিজ্ঞতা এবং সংরক্ষণ ভাবনা নিয়ে DESCF-এর editorial writing.
          </p>
        )}

        <div className="mt-auto pt-7">
          <Link
            href={href}
            className="inline-flex font-semibold text-forest-800 transition hover:text-forest-950"
          >
            পড়ুন <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

function EmptyEditorialState() {
  return (
    <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-card sm:p-10">
      <p className="section-label mb-4">Editorial desk</p>

      <h2 className="max-w-2xl font-serif text-4xl leading-tight text-earth-950">
        প্রকৃতি কথা প্রকাশের জন্য প্রস্তুত হচ্ছে।
      </h2>

      <p className="mt-5 max-w-3xl text-body leading-8 text-earth-700">
        Field note, conservation story, rescue experience, myth-busting লেখা এবং nature essay এখানে প্রকাশিত হবে।
        এই section-এর tone হবে calm, responsible, evidence-aware এবং মানুষের ভাষায় লেখা।
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Field notes', 'মাঠের পর্যবেক্ষণ, species encounter এবং habitat context.'],
          ['Myth-busting', 'ভুল ধারণা কমানো, panic কমানো এবং safer response শেখানো.'],
          ['Conservation stories', 'মানুষ, প্রকৃতি, সহাবস্থান এবং DESCF-এর public learning.'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
            <h3 className="font-serif text-2xl text-earth-950">{title}</h3>
            <p className="mt-3 text-body-sm leading-7 text-earth-700">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ProkritiKothaPage() {
  const articles = await sanityFetch<ProkritiKothaArticleCard[]>({
    query: prokritiKothaArticlesQuery,
    tags: ['prokritiKothaArticle'],
  })

  const publishedArticles = (articles ?? []).filter((article) => article.slug?.current)
  const featuredArticle =
    publishedArticles.find((article) => article.featured) ?? publishedArticles[0] ?? null
  const remainingArticles = featuredArticle
    ? publishedArticles.filter((article) => article._id !== featuredArticle._id)
    : []

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-earth-200 bg-gradient-to-br from-[#f7f3ec] via-white to-[#e4ecdf]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(49,81,43,0.16),transparent_34%)]" />

        <div className="container-site relative section-padding">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.72fr)] lg:items-center">
            <div>
              <p className="section-label mb-5">Nature editorial</p>

              <h1 className="font-serif text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.04em] text-earth-950">
                প্রকৃতি কথা
              </h1>

              <p className="mt-8 max-w-3xl text-body-lg leading-9 text-earth-800">
                প্রকৃতি, বন্যপ্রাণী, সহাবস্থান ও মাঠের অভিজ্ঞতা নিয়ে DESCF-এর calm editorial space.
                এখানে থাকবে field note, conservation story, myth-busting লেখা এবং মানুষের ভাষায় প্রকৃতি বোঝার চেষ্টা।
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#articles" className="btn-primary">
                  লেখা পড়ুন
                </Link>
                <Link href="/bangladesh-wildlife/snakes" className="btn-secondary">
                  বাংলাদেশের সাপ দেখুন
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-card-lg backdrop-blur">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-forest-50 via-white to-earth-100 px-8 text-center">
                <span className="font-serif text-4xl leading-tight text-forest-900">
                  প্রকৃতি কথা
                </span>
              </div>

              <div className="p-5">
                <p className="section-label mb-3">Featured writing</p>
                <h2 className="font-serif text-3xl leading-tight text-earth-950">
                  {featuredArticle?.title ?? 'প্রকৃতি কথা: শুরু'}
                </h2>
                <p className="mt-3 text-body-sm leading-7 text-earth-700">
                  {featuredArticle?.excerpt ??
                    'প্রকৃতি, বন্যপ্রাণী ও সহাবস্থান নিয়ে DESCF-এর নতুন editorial section.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7">
              <p className="section-label mb-3">Editorial purpose</p>
              <h2 className="font-serif text-3xl leading-tight text-earth-950">
                মানুষের ভাষায় প্রকৃতির গল্প
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-earth-700">
                DESCF-এর data, rescue update এবং field learning-কে সহজ ভাষায় public understanding-এ আনা।
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7">
              <p className="section-label mb-3">Tone</p>
              <h2 className="font-serif text-3xl leading-tight text-earth-950">
                Calm, careful, credible
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-earth-700">
                ভয় বাড়ানো নয়; ভুল ধারণা কমানো, safety-first শেখানো এবং evidence-aware storytelling.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7">
              <p className="section-label mb-3">Connection</p>
              <h2 className="font-serif text-3xl leading-tight text-earth-950">
                Field guide-এর পাশে editorial layer
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-earth-700">
                Species profile-এর সাথে real-life context, observation, myth-busting এবং conservation reflection যুক্ত করা।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="bg-[#fbf8f1]">
        <div className="container-site section-padding">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label mb-4">Editorial archive</p>
              <h2 className="font-serif text-4xl leading-tight text-earth-950 sm:text-5xl">
                প্রকৃতি কথা পড়ুন
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-8 text-earth-700">
                Field note, conservation story, rescue experience, myth-busting এবং nature essay এক জায়গায়।
              </p>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-white px-5 py-4 text-body-sm leading-7 text-earth-700">
              <strong className="text-earth-950">Tip:</strong> Featured লেখা আগে দেখান; নতুন লেখা নিচে archive হিসেবে রাখুন।
            </div>
          </div>

          {featuredArticle ? (
            <>
              <ArticleCard article={featuredArticle} featured />

              {remainingArticles.length > 0 ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remainingArticles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <EmptyEditorialState />
          )}
        </div>
      </section>

      <section className="border-t border-earth-200 bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-earth-200 bg-gradient-to-br from-forest-50 via-white to-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">Snake field guide</p>
              <h2 className="font-serif text-4xl leading-tight text-earth-950">
                সাপ নিয়ে লেখা field guide-এর সাথে যুক্ত থাকবে।
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                প্রজাতির তথ্য, local name, identification clue, safety note এবং related writing একই ecosystem-এ থাকবে।
              </p>
              <Link href="/bangladesh-wildlife/snakes" className="btn-primary mt-7">
                Snake field guide
              </Link>
            </div>

            <div className="rounded-[2rem] border border-earth-200 bg-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">DESCF mission</p>
              <h2 className="font-serif text-4xl leading-tight text-earth-950">
                গল্প নয়, responsible conservation communication.
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                এই section DESCF-এর broader work—biodiversity conservation, snake conservation,
                public awareness, research এবং coexistence education—আরও human-readable করবে।
              </p>
              <Link href="/current-work" className="btn-secondary mt-7">
                ডিইএসসিএফের কাজ দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
