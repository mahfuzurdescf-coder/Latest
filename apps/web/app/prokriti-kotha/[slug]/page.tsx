import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { PortableText } from '@/components/portable-text/PortableText'
import { ShareButtons, type ShareButtonLabels } from '@/components/share/ShareButtons'
import { buildArticleJSONLD, buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  PAGE_CONTENT_BY_KEY_QUERY,
  prokritiKothaArticleBySlugQuery,
  prokritiKothaArticleSlugsQuery,
} from '@/lib/sanity/queries'
import type {
  PageContent,
  PageSection,
  ProkritiKothaArticle,
  ProkritiKothaArticleCard,
  SpeciesProfileCard,
} from '@/types/sanity'

const PAGE_KEY = 'prokriti-kotha'

interface Props {
  params: {
    slug: string
  }
}

const fallbackMeta = {
  notFoundTitle: 'Prokriti Kotha article not found',
  notFoundDescription: 'The requested DESCF Prokriti Kotha article could not be found.',
  description:
    'Read this DESCF Prokriti Kotha article on nature, wildlife, conservation, and community knowledge.',
}

const fallbackBreadcrumb = {
  home: 'Home',
  prokritiKotha: 'Prokriti Kotha',
}

const fallbackCategoryLabels: Record<string, string> = {
  'nature-essay': 'Nature Essay',
  'field-note': 'Field Note',
  'conservation-story': 'Conservation Story',
  'rescue-experience': 'Rescue Experience',
  'myth-busting': 'Myth Busting',
  'community-writing': 'Community Writing',
  'opinion-feature': 'Opinion / Feature',
}

const fallbackArticleLabels = {
  defaultCategory: 'Article',
  banglaLanguage: 'Bangla',
  englishLanguage: 'English',
  authorPrefix: 'By',
  defaultAuthor: 'DESCF Editorial',
  readingTimeSuffix: 'মিনিট পড়া',
  readingTimeFallback: 'Not specified',
  coverFallbackEyebrow: 'Prokriti Kotha',
  coverFallbackTitle: 'Editorial article',
}

const fallbackInfoCards = {
  sectionLabel: 'Section',
  sectionValue: 'Prokriti Kotha',
  articleTypeLabel: 'Article type',
  readingTimeLabel: 'পড়ার সময়',
}

const fallbackEmptyBody = {
  eyebrow: 'Article body',
  title: 'সম্পূর্ণ লেখার কনটেন্ট প্রস্তুত করা হচ্ছে',
  description:
    'This article has been published, but the full body কনটেন্ট এখনো Sanity Studio-তে যোগ করা হয়নি।',
}

const fallbackShareLabels: ShareButtonLabels = {
  title: 'এই লেখা শেয়ার করুন',
  description: 'আপনার কমিউনিটির সঙ্গে ডিইএসসিএফ কনটেন্ট শেয়ার করুন।',
  nativeShare: 'Share',
  copied: 'Copied',
  copyLink: 'Copy link',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  x: 'X',
}

const fallbackArticleDetails = {
  title: 'Article details',
  category: 'Category',
  published: 'Published',
  author: 'Author',
}

const fallbackSafety = {
  title: 'সম্পাদকীয় নিরাপত্তা নোট',
  description:
    'ডিইএসসিএফ কনটেন্ট শিক্ষা ও সংরক্ষণ সচেতনতার জন্য। It should not be treated as snake handling, catching, or rescue instruction.',
}

const fallbackRelatedSpecies = {
  eyebrow: 'Field-guide connection',
  title: 'Species connected to this story',
}

const fallbackRelatedArticles = {
  eyebrow: 'Continue reading',
  title: 'More from Prokriti Kotha',
}

function getCanonicalUrl(slug: string): string {
  return `https://www.descf.org/prokriti-kotha/${slug}`
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function getCardText(section: PageSection | undefined, index: number, fallback: string) {
  const card = section?.cards?.[index]
  return card?.title || card?.eyebrow || card?.text || fallback
}

function getSeo(page: PageContent | null) {
  return (page as (PageContent & { seo?: { title?: string; description?: string } }) | null)?.seo
}

async function getProkritiKothaPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

function getCategoryLabels(section: PageSection | undefined) {
  return {
    'nature-essay': getCardText(section, 0, fallbackCategoryLabels['nature-essay']),
    'field-note': getCardText(section, 1, fallbackCategoryLabels['field-note']),
    'conservation-story': getCardText(section, 2, fallbackCategoryLabels['conservation-story']),
    'rescue-experience': getCardText(section, 3, fallbackCategoryLabels['rescue-experience']),
    'myth-busting': getCardText(section, 4, fallbackCategoryLabels['myth-busting']),
    'community-writing': getCardText(section, 5, fallbackCategoryLabels['community-writing']),
    'opinion-feature': getCardText(section, 6, fallbackCategoryLabels['opinion-feature']),
  }
}

function formatCategory(
  category: string | undefined,
  labels: Record<string, string>,
  fallback: string,
): string {
  if (!category) return fallback
  return labels[category] || category.replace(/-/g, ' ')
}

function formatDate(date?: string): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getArticleDescription(
  article: ProkritiKothaArticle,
  fallbackDescription: string,
): string {
  return article.seoDescription || article.excerpt || fallbackDescription
}

function RelatedArticleCard({
  article,
  categoryLabels,
  defaultCategory,
}: {
  article: ProkritiKothaArticleCard
  categoryLabels: Record<string, string>
  defaultCategory: string
}) {
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
            {formatCategory(article.category, categoryLabels, defaultCategory)}
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
  const [article, page] = await Promise.all([
    sanityFetch<ProkritiKothaArticle | null>({
      query: prokritiKothaArticleBySlugQuery,
      params: { slug: params.slug },
      tags: ['prokritiKothaArticle'],
    }),
    getProkritiKothaPageContent(),
  ])

  const sections = page?.sections ?? []
  const notFoundSection = getSection(sections, 'detail-not-found')
  const descriptionSection = getSection(sections, 'detail-meta')
  const seo = getSeo(page)

  if (!article) {
    return buildMetadata({
      title: notFoundSection?.title || fallbackMeta.notFoundTitle,
      description: notFoundSection?.description || fallbackMeta.notFoundDescription,
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
    description: getArticleDescription(
      article,
      descriptionSection?.description || seo?.description || fallbackMeta.description,
    ),
    ogImage: ogImageUrl,
    canonicalUrl: getCanonicalUrl(params.slug),
  })
}

export default async function ProkritiKothaArticlePage({ params }: Props) {
  const [article, page] = await Promise.all([
    sanityFetch<ProkritiKothaArticle | null>({
      query: prokritiKothaArticleBySlugQuery,
      params: { slug: params.slug },
      tags: ['prokritiKothaArticle'],
    }),
    getProkritiKothaPageContent(),
  ])

  if (!article) notFound()

  const sections = page?.sections ?? []
  const breadcrumbSection = getSection(sections, 'detail-breadcrumb')
  const categoryLabelsSection = getSection(sections, 'category-labels')
  const articleLabelsSection = getSection(sections, 'detail-article-labels')
  const infoCardsSection = getSection(sections, 'detail-info-cards')
  const emptyBodySection = getSection(sections, 'detail-empty-body')
  const shareSection = getSection(sections, 'detail-share')
  const articleDetailsSection = getSection(sections, 'detail-sidebar')
  const safetySection = getSection(sections, 'detail-safety-note')
  const relatedSpeciesSection = getSection(sections, 'detail-related-species')
  const relatedArticlesSection = getSection(sections, 'detail-related-articles')
  const descriptionSection = getSection(sections, 'detail-meta')

  const categoryLabels = getCategoryLabels(categoryLabelsSection)

  const articleLabels = {
    defaultCategory: getCardText(articleLabelsSection, 0, fallbackArticleLabels.defaultCategory),
    banglaLanguage: getCardText(articleLabelsSection, 1, fallbackArticleLabels.banglaLanguage),
    englishLanguage: getCardText(articleLabelsSection, 2, fallbackArticleLabels.englishLanguage),
    authorPrefix: getCardText(articleLabelsSection, 3, fallbackArticleLabels.authorPrefix),
    defaultAuthor: getCardText(articleLabelsSection, 4, fallbackArticleLabels.defaultAuthor),
    readingTimeSuffix: getCardText(articleLabelsSection, 5, fallbackArticleLabels.readingTimeSuffix),
    readingTimeFallback: getCardText(articleLabelsSection, 6, fallbackArticleLabels.readingTimeFallback),
    coverFallbackEyebrow: getCardText(articleLabelsSection, 7, fallbackArticleLabels.coverFallbackEyebrow),
    coverFallbackTitle: getCardText(articleLabelsSection, 8, fallbackArticleLabels.coverFallbackTitle),
  }

  const breadcrumbLabels = {
    home: getCardText(breadcrumbSection, 0, fallbackBreadcrumb.home),
    prokritiKotha: getCardText(breadcrumbSection, 1, fallbackBreadcrumb.prokritiKotha),
  }

  const infoCards = {
    sectionLabel: getCardText(infoCardsSection, 0, fallbackInfoCards.sectionLabel),
    sectionValue: getCardText(infoCardsSection, 1, fallbackInfoCards.sectionValue),
    articleTypeLabel: getCardText(infoCardsSection, 2, fallbackInfoCards.articleTypeLabel),
    readingTimeLabel: getCardText(infoCardsSection, 3, fallbackInfoCards.readingTimeLabel),
  }

  const emptyBody = {
    eyebrow: emptyBodySection?.eyebrow || fallbackEmptyBody.eyebrow,
    title: emptyBodySection?.title || fallbackEmptyBody.title,
    description: emptyBodySection?.description || fallbackEmptyBody.description,
  }

  const shareLabels: ShareButtonLabels = {
    title: shareSection?.title || fallbackShareLabels.title,
    description: shareSection?.description || fallbackShareLabels.description,
    nativeShare: getCardText(shareSection, 0, fallbackShareLabels.nativeShare || 'Share'),
    copyLink: getCardText(shareSection, 1, fallbackShareLabels.copyLink || 'Copy link'),
    copied: getCardText(shareSection, 2, fallbackShareLabels.copied || 'Copied'),
    facebook: getCardText(shareSection, 3, fallbackShareLabels.facebook || 'Facebook'),
    whatsapp: getCardText(shareSection, 4, fallbackShareLabels.whatsapp || 'WhatsApp'),
    x: getCardText(shareSection, 5, fallbackShareLabels.x || 'X'),
  }

  const articleDetails = {
    title: articleDetailsSection?.title || fallbackArticleDetails.title,
    category: getCardText(articleDetailsSection, 0, fallbackArticleDetails.category),
    published: getCardText(articleDetailsSection, 1, fallbackArticleDetails.published),
    author: getCardText(articleDetailsSection, 2, fallbackArticleDetails.author),
  }

  const safety = {
    title: safetySection?.title || fallbackSafety.title,
    description: safetySection?.description || fallbackSafety.description,
  }

  const relatedSpecies = {
    eyebrow: relatedSpeciesSection?.eyebrow || fallbackRelatedSpecies.eyebrow,
    title: relatedSpeciesSection?.title || fallbackRelatedSpecies.title,
  }

  const relatedArticles = {
    eyebrow: relatedArticlesSection?.eyebrow || fallbackRelatedArticles.eyebrow,
    title: relatedArticlesSection?.title || fallbackRelatedArticles.title,
  }

  const coverImageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(1600).height(900).url()
    : null

  const ogImageUrl = article.ogImage
    ? urlForImage(article.ogImage)?.width(1200).height(630).url()
    : coverImageUrl || undefined

  const canonicalUrl = getCanonicalUrl(params.slug)
  const categoryLabel = formatCategory(
    article.category,
    categoryLabels,
    articleLabels.defaultCategory,
  )
  const publishedDateLabel = formatDate(article.publishedAt ?? article._createdAt)
  const modifiedDate = article._updatedAt ?? article.publishedAt ?? article._createdAt
  const authorName = article.author?.name ?? articleLabels.defaultAuthor
  const readingTimeLabel =
    typeof article.readingTime === 'number' && article.readingTime > 0
      ? `${article.readingTime} ${articleLabels.readingTimeSuffix}`
      : articleLabels.readingTimeFallback

  const articleDescription = getArticleDescription(
    article,
    descriptionSection?.description || fallbackMeta.description,
  )

  const articleJsonLd = buildArticleJSONLD({
    title: article.title,
    description: articleDescription,
    url: canonicalUrl,
    image: ogImageUrl,
    authorName,
    datePublished: article.publishedAt ?? article._createdAt,
    dateModified: modifiedDate,
  })

  const breadcrumbJsonLd = buildBreadcrumbJSONLD([
    {
      name: breadcrumbLabels.home,
      url: 'https://www.descf.org',
    },
    {
      name: breadcrumbLabels.prokritiKotha,
      url: 'https://www.descf.org/prokriti-kotha',
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
                      {breadcrumbLabels.home}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/prokriti-kotha"
                      className="transition hover:text-white"
                    >
                      {breadcrumbLabels.prokritiKotha}
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
                        {article.language === 'bn'
                          ? articleLabels.banglaLanguage
                          : articleLabels.englishLanguage}
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
                      {articleLabels.authorPrefix} {authorName}
                    </span>

                    {typeof article.readingTime === 'number' &&
                      article.readingTime > 0 && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{readingTimeLabel}</span>
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
                          {articleLabels.coverFallbackEyebrow}
                        </p>
                        <p className="font-serif text-3xl text-white">
                          {articleLabels.coverFallbackTitle}
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
                  <p className="section-label mb-2">{infoCards.sectionLabel}</p>
                  <p className="font-serif text-2xl text-earth-950">
                    {infoCards.sectionValue}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-white p-5">
                  <p className="section-label mb-2">{infoCards.articleTypeLabel}</p>
                  <p className="font-serif text-2xl text-earth-950">
                    {categoryLabel}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-white p-5">
                  <p className="section-label mb-2">{infoCards.readingTimeLabel}</p>
                  <p className="font-serif text-2xl text-earth-950">
                    {readingTimeLabel}
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
                      <p className="section-label mb-4">{emptyBody.eyebrow}</p>
                      <h2 className="font-serif text-3xl text-earth-950">
                        {emptyBody.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-body leading-8 text-earth-700">
                        {emptyBody.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                <ShareButtons
                  title={article.title}
                  description={articleDescription}
                  labels={shareLabels}
                />

                <div className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
                  <h2 className="font-serif text-xl text-earth-950">
                    {articleDetails.title}
                  </h2>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-semibold text-earth-950">
                        {articleDetails.category}
                      </dt>
                      <dd className="mt-1 text-earth-650">{categoryLabel}</dd>
                    </div>

                    {publishedDateLabel && (
                      <div>
                        <dt className="font-semibold text-earth-950">
                          {articleDetails.published}
                        </dt>
                        <dd className="mt-1 text-earth-650">
                          {publishedDateLabel}
                        </dd>
                      </div>
                    )}

                    <div>
                      <dt className="font-semibold text-earth-950">
                        {articleDetails.author}
                      </dt>
                      <dd className="mt-1 text-earth-650">
                        {authorName}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="font-serif text-xl text-earth-950">
                    {safety.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-earth-700">
                    {safety.description}
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
                <p className="section-label mb-3">{relatedSpecies.eyebrow}</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  {relatedSpecies.title}
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
                <p className="section-label mb-3">{relatedArticles.eyebrow}</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  {relatedArticles.title}
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {article.relatedArticles
                  .filter((relatedArticle) => relatedArticle.slug?.current)
                  .map((relatedArticle) => (
                    <RelatedArticleCard
                      key={relatedArticle._id}
                      article={relatedArticle}
                      categoryLabels={categoryLabels}
                      defaultCategory={articleLabels.defaultCategory}
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
