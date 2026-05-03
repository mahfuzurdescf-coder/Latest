import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  PAGE_CONTENT_BY_KEY_QUERY,
  prokritiKothaArticlesQuery,
} from '@/lib/sanity/queries'
import type {
  NavLink,
  PageContent,
  PageSection,
  ProkritiKothaArticleCard,
} from '@/types/sanity'

const PAGE_KEY = 'prokriti-kotha'

const fallbackMetadata = {
  title: 'প্রকৃতি কথা',
  description:
    'প্রকৃতি, বন্যপ্রাণী, সহাবস্থান, মাঠ-অভিজ্ঞতা ও সংরক্ষণ ভাবনা নিয়ে DESCF-এর editorial space.',
}

const fallbackHero = {
  eyebrow: 'Nature editorial',
  title: 'প্রকৃতি কথা',
  description:
    'প্রকৃতি, বন্যপ্রাণী, সহাবস্থান ও মাঠের অভিজ্ঞতা নিয়ে DESCF-এর calm editorial space. এখানে থাকবে field note, conservation story, myth-busting লেখা এবং মানুষের ভাষায় প্রকৃতি বোঝার চেষ্টা।',
  primaryCta: { label: 'লেখা পড়ুন', href: '#articles' },
  secondaryCta: { label: 'বাংলাদেশের সাপ দেখুন', href: '/bangladesh-wildlife/snakes' },
}

const fallbackHeroPanel = {
  label: 'Featured writing',
  title: 'প্রকৃতি কথা: শুরু',
  description:
    'প্রকৃতি, বন্যপ্রাণী ও সহাবস্থান নিয়ে DESCF-এর নতুন editorial section.',
}

const fallbackPrinciples = [
  {
    eyebrow: 'Editorial purpose',
    title: 'মানুষের ভাষায় প্রকৃতির গল্প',
    text: 'DESCF-এর data, rescue update এবং field learning-কে সহজ ভাষায় public understanding-এ আনা।',
  },
  {
    eyebrow: 'Tone',
    title: 'Calm, careful, credible',
    text: 'ভয় বাড়ানো নয়; ভুল ধারণা কমানো, safety-first শেখানো এবং evidence-aware storytelling.',
  },
  {
    eyebrow: 'Connection',
    title: 'Field guide-এর পাশে editorial layer',
    text: 'Species profile-এর সাথে real-life context, observation, myth-busting এবং conservation reflection যুক্ত করা।',
  },
]

const fallbackArchive = {
  eyebrow: 'Editorial archive',
  title: 'প্রকৃতি কথা পড়ুন',
  description:
    'Field note, conservation story, rescue experience, myth-busting এবং nature essay এক জায়গায়।',
}

const fallbackArchiveTip = {
  title: 'Tip:',
  description: 'Featured লেখা আগে দেখান; নতুন লেখা নিচে archive হিসেবে রাখুন।',
}

const fallbackArticleCardLabels = {
  placeholderTitle: 'প্রকৃতি কথা',
  featured: 'Featured',
  readingTimeSuffix: 'মিনিট পড়া',
  fallbackExcerpt:
    'প্রকৃতি, সহাবস্থান, মাঠের অভিজ্ঞতা এবং সংরক্ষণ ভাবনা নিয়ে DESCF-এর editorial writing.',
  readMore: 'পড়ুন',
  defaultCategory: 'Editorial',
}

const fallbackCategoryLabels: Record<string, string> = {
  'nature-essay': 'Nature essay',
  'field-note': 'Field note',
  'conservation-story': 'Conservation story',
  'rescue-experience': 'Rescue experience',
  'myth-busting': 'Myth-busting',
  'community-writing': 'Community writing',
  'opinion-feature': 'Opinion feature',
}

const fallbackEmptyState = {
  eyebrow: 'Editorial desk',
  title: 'প্রকৃতি কথা প্রকাশের জন্য প্রস্তুত হচ্ছে।',
  description:
    'Field note, conservation story, rescue experience, myth-busting লেখা এবং nature essay এখানে প্রকাশিত হবে। এই section-এর tone হবে calm, responsible, evidence-aware এবং মানুষের ভাষায় লেখা।',
  cards: [
    {
      title: 'Field notes',
      text: 'মাঠের পর্যবেক্ষণ, species encounter এবং habitat context.',
    },
    {
      title: 'Myth-busting',
      text: 'ভুল ধারণা কমানো, panic কমানো এবং safer response শেখানো.',
    },
    {
      title: 'Conservation stories',
      text: 'মানুষ, প্রকৃতি, সহাবস্থান এবং DESCF-এর public learning.',
    },
  ],
}

const fallbackBottomCards = [
  {
    eyebrow: 'Snake field guide',
    title: 'সাপ নিয়ে লেখা field guide-এর সাথে যুক্ত থাকবে।',
    description:
      'প্রজাতির তথ্য, local name, identification clue, safety note এবং related writing একই ecosystem-এ থাকবে।',
    cta: { label: 'Snake field guide', href: '/bangladesh-wildlife/snakes' },
    variant: 'forest',
  },
  {
    eyebrow: 'DESCF mission',
    title: 'গল্প নয়, responsible conservation communication.',
    description:
      'এই section DESCF-এর broader work—biodiversity conservation, snake conservation, public awareness, research এবং coexistence education—আরও human-readable করবে।',
    cta: { label: 'ডিইএসসিএফের কাজ দেখুন', href: '/current-work' },
    variant: 'plain',
  },
] as const

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function getCardText(section: PageSection | undefined, index: number, fallback: string) {
  const card = section?.cards?.[index]
  return card?.title || card?.eyebrow || card?.text || fallback
}

function getLink(link: NavLink | undefined, fallback: NavLink) {
  return {
    label: link?.label || fallback.label,
    href: link?.href || fallback.href,
  }
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

function getCategoryLabel(
  category: string | undefined,
  labels: Record<string, string>,
  defaultCategory: string,
) {
  if (!category) return defaultCategory
  return labels[category] ?? category.replace(/-/g, ' ')
}

function ArticleCard({
  article,
  featured = false,
  labels,
  categoryLabels,
}: {
  article: ProkritiKothaArticleCard
  featured?: boolean
  labels: typeof fallbackArticleCardLabels
  categoryLabels: Record<string, string>
}) {
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)
        ?.width(featured ? 1200 : 800)
        .height(featured ? 760 : 520)
        .url()
    : null

  const href = `/prokriti-kotha/${article.slug.current}`
  const categoryLabel = getCategoryLabel(
    article.category,
    categoryLabels,
    labels.defaultCategory,
  )

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
              {labels.placeholderTitle}
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
              {labels.featured}
            </span>
          ) : null}

          {article.readingTime ? (
            <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-xs font-semibold text-earth-600">
              {article.readingTime} {labels.readingTimeSuffix}
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
            {labels.fallbackExcerpt}
          </p>
        )}

        <div className="mt-auto pt-7">
          <Link
            href={href}
            className="inline-flex font-semibold text-forest-800 transition hover:text-forest-950"
          >
            {labels.readMore} <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

function EmptyEditorialState({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string
  title: string
  description: string
  cards: { title: string; text: string }[]
}) {
  return (
    <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-card sm:p-10">
      <p className="section-label mb-4">{eyebrow}</p>

      <h2 className="max-w-2xl font-serif text-4xl leading-tight text-earth-950">
        {title}
      </h2>

      <p className="mt-5 max-w-3xl text-body leading-8 text-earth-700">
        {description}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
            <h3 className="font-serif text-2xl text-earth-950">{card.title}</h3>
            <p className="mt-3 text-body-sm leading-7 text-earth-700">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProkritiKothaPageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/prokriti-kotha',
  })
}

export default async function ProkritiKothaPage() {
  const [page, articles] = await Promise.all([
    getProkritiKothaPageContent(),
    sanityFetch<ProkritiKothaArticleCard[]>({
      query: prokritiKothaArticlesQuery,
      tags: ['prokritiKothaArticle'],
    }),
  ])

  const sections = page?.sections ?? []
  const heroPanelSection = getSection(sections, 'hero-panel')
  const principlesSection = getSection(sections, 'editorial-principles')
  const archiveSection = getSection(sections, 'article-archive')
  const archiveTipSection = getSection(sections, 'archive-tip')
  const articleCardLabelsSection = getSection(sections, 'article-card-labels')
  const categoryLabelsSection = getSection(sections, 'category-labels')
  const emptyStateSection = getSection(sections, 'empty-state')
  const emptyStateCardsSection = getSection(sections, 'empty-state-cards')
  const bottomCardsSection = getSection(sections, 'bottom-cards')

  const publishedArticles = (articles ?? []).filter((article) => article.slug?.current)
  const featuredArticle =
    publishedArticles.find((article) => article.featured) ?? publishedArticles[0] ?? null
  const remainingArticles = featuredArticle
    ? publishedArticles.filter((article) => article._id !== featuredArticle._id)
    : []

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = getLink(page?.primaryCta, fallbackHero.primaryCta)
  const secondaryCta = getLink(page?.secondaryCta, fallbackHero.secondaryCta)

  const heroPanelLabel = heroPanelSection?.eyebrow || fallbackHeroPanel.label
  const heroPanelTitle =
    featuredArticle?.title || heroPanelSection?.title || fallbackHeroPanel.title
  const heroPanelDescription =
    featuredArticle?.excerpt || heroPanelSection?.description || fallbackHeroPanel.description

  const principleCards =
    principlesSection?.cards && principlesSection.cards.length > 0
      ? principlesSection.cards.map((card) => ({
          eyebrow: card.eyebrow || '',
          title: card.title,
          text: card.text || '',
        }))
      : fallbackPrinciples

  const archiveEyebrow = archiveSection?.eyebrow || fallbackArchive.eyebrow
  const archiveTitle = archiveSection?.title || fallbackArchive.title
  const archiveDescription = archiveSection?.description || fallbackArchive.description

  const archiveTipTitle = archiveTipSection?.title || fallbackArchiveTip.title
  const archiveTipDescription =
    archiveTipSection?.description || fallbackArchiveTip.description

  const articleCardLabels = {
    placeholderTitle: getCardText(
      articleCardLabelsSection,
      0,
      fallbackArticleCardLabels.placeholderTitle,
    ),
    featured: getCardText(articleCardLabelsSection, 1, fallbackArticleCardLabels.featured),
    readingTimeSuffix: getCardText(
      articleCardLabelsSection,
      2,
      fallbackArticleCardLabels.readingTimeSuffix,
    ),
    fallbackExcerpt: getCardText(
      articleCardLabelsSection,
      3,
      fallbackArticleCardLabels.fallbackExcerpt,
    ),
    readMore: getCardText(articleCardLabelsSection, 4, fallbackArticleCardLabels.readMore),
    defaultCategory: getCardText(
      articleCardLabelsSection,
      5,
      fallbackArticleCardLabels.defaultCategory,
    ),
  }

  const categoryLabels = getCategoryLabels(categoryLabelsSection)

  const emptyState = {
    eyebrow: emptyStateSection?.eyebrow || fallbackEmptyState.eyebrow,
    title: emptyStateSection?.title || fallbackEmptyState.title,
    description: emptyStateSection?.description || fallbackEmptyState.description,
    cards:
      emptyStateCardsSection?.cards && emptyStateCardsSection.cards.length > 0
        ? emptyStateCardsSection.cards.map((card) => ({
            title: card.title,
            text: card.text || '',
          }))
        : fallbackEmptyState.cards,
  }

  const bottomCards =
    bottomCardsSection?.cards && bottomCardsSection.cards.length > 0
      ? bottomCardsSection.cards.slice(0, 2).map((card, index) => ({
          eyebrow: card.eyebrow || fallbackBottomCards[index]?.eyebrow || '',
          title: card.title,
          description: card.text || '',
          cta: getLink(
            index === 0 ? bottomCardsSection.primaryCta : bottomCardsSection.secondaryCta,
            fallbackBottomCards[index]?.cta || fallbackBottomCards[1].cta,
          ),
          variant: fallbackBottomCards[index]?.variant || 'plain',
        }))
      : fallbackBottomCards

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-earth-200 bg-gradient-to-br from-[#f7f3ec] via-white to-[#e4ecdf]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(49,81,43,0.16),transparent_34%)]" />

        <div className="container-site relative section-padding">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.72fr)] lg:items-center">
            <div>
              <p className="section-label mb-5">{heroEyebrow}</p>

              <h1 className="font-serif text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.04em] text-earth-950">
                {heroTitle}
              </h1>

              <p className="mt-8 max-w-3xl text-body-lg leading-9 text-earth-800">
                {heroDescription}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={primaryCta.href} className="btn-primary">
                  {primaryCta.label}
                </Link>
                <Link href={secondaryCta.href} className="btn-secondary">
                  {secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-card-lg backdrop-blur">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-forest-50 via-white to-earth-100 px-8 text-center">
                <span className="font-serif text-4xl leading-tight text-forest-900">
                  {heroTitle}
                </span>
              </div>

              <div className="p-5">
                <p className="section-label mb-3">{heroPanelLabel}</p>
                <h2 className="font-serif text-3xl leading-tight text-earth-950">
                  {heroPanelTitle}
                </h2>
                <p className="mt-3 text-body-sm leading-7 text-earth-700">
                  {heroPanelDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            {principleCards.map((card) => (
              <div key={card.title} className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7">
                {card.eyebrow ? (
                  <p className="section-label mb-3">{card.eyebrow}</p>
                ) : null}
                <h2 className="font-serif text-3xl leading-tight text-earth-950">
                  {card.title}
                </h2>
                {card.text ? (
                  <p className="mt-4 text-body-sm leading-7 text-earth-700">
                    {card.text}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="bg-[#fbf8f1]">
        <div className="container-site section-padding">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label mb-4">{archiveEyebrow}</p>
              <h2 className="font-serif text-4xl leading-tight text-earth-950 sm:text-5xl">
                {archiveTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-8 text-earth-700">
                {archiveDescription}
              </p>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-white px-5 py-4 text-body-sm leading-7 text-earth-700">
              <strong className="text-earth-950">{archiveTipTitle}</strong> {archiveTipDescription}
            </div>
          </div>

          {featuredArticle ? (
            <>
              <ArticleCard
                article={featuredArticle}
                featured
                labels={articleCardLabels}
                categoryLabels={categoryLabels}
              />

              {remainingArticles.length > 0 ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remainingArticles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      labels={articleCardLabels}
                      categoryLabels={categoryLabels}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <EmptyEditorialState
              eyebrow={emptyState.eyebrow}
              title={emptyState.title}
              description={emptyState.description}
              cards={emptyState.cards}
            />
          )}
        </div>
      </section>

      <section className="border-t border-earth-200 bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            {bottomCards.map((card) => (
              <div
                key={card.title}
                className={
                  card.variant === 'forest'
                    ? 'rounded-[2rem] border border-earth-200 bg-gradient-to-br from-forest-50 via-white to-earth-50 p-8 shadow-card'
                    : 'rounded-[2rem] border border-earth-200 bg-earth-50 p-8 shadow-card'
                }
              >
                <p className="section-label mb-3">{card.eyebrow}</p>
                <h2 className="font-serif text-4xl leading-tight text-earth-950">
                  {card.title}
                </h2>
                <p className="mt-4 text-body leading-8 text-earth-700">
                  {card.description}
                </p>
                <Link
                  href={card.cta.href}
                  className={card.variant === 'forest' ? 'btn-primary mt-7' : 'btn-secondary mt-7'}
                >
                  {card.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
