import type { Metadata } from 'next'
import Link from 'next/link'

import { ProgrammeCard } from '@/components/cards'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY, PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import type {
  NavLink,
  PageContent,
  PageSection,
  ProgrammeCard as ProgrammeCardType,
  ProgrammeStatus,
} from '@/types/sanity'

const PAGE_KEY = 'programmes'

const fallbackMetadata = {
  title: 'Programmes',
  description:
    'ডিইএসসিএফ প্রোগ্রাম connect snake conservation awareness, biodiversity documentation, conservation communication, education, and human-wildlife coexistence in Bangladesh.',
}

const fallbackHero = {
  eyebrow: 'ডিইএসসিএফ প্রোগ্রাম',
  title: 'Conservation work with institutional purpose.',
  description:
    'ডিইএসসিএফ প্রোগ্রাম connect awareness, biodiversity learning, field documentation, public education, and human-wildlife coexistence through a clear conservation portfolio.',
  primaryCta: { label: 'প্রোগ্রাম দেখুন', href: '#programme-portfolio' },
  secondaryCta: { label: 'ডিইএসসিএফের সঙ্গে যুক্ত হোন', href: '/partner' },
}

const fallbackHeroPanel = {
  eyebrow: 'Portfolio principle',
  title: 'Not scattered activities — structured conservation programmes.',
  description:
    'A strong programme page should show purpose, activities, audience, evidence, outputs, related resources, and responsible public communication in one place.',
}

const fallbackPortfolio = {
  eyebrow: 'প্রোগ্রাম পোর্টফোলিও',
  title: 'Published ডিইএসসিএফ প্রোগ্রাম',
  description:
    'Programme records should help visitors understand DESCF’s work as a serious conservation system: what the programme does, why it matters, and how people can learn, participate, or collaborate responsibly.',
}

const fallbackEmptyState = {
  eyebrow: 'CMS-ready section',
  title: 'DESCF programme records will appear here from Sanity Studio.',
  description:
    'This page is already structured for programme profiles. Add programme title, status, summary, hero image, activities, resources, and related articles in Sanity to publish a complete public programme portfolio.',
  cta: { label: 'প্রোগ্রাম সহযোগিতা নিয়ে আলোচনা করুন', href: '/partner' },
}

const fallbackPrinciplesSection = {
  eyebrow: 'প্রোগ্রাম মানদণ্ড',
  title: 'What a DESCF programme page should communicate',
}

const fallbackProgrammePrinciples = [
  {
    label: 'Focus',
    title: 'Clear conservation purpose',
    description:
      'Each programme should explain what problem it addresses, who it serves, and how it supports responsible conservation communication.',
  },
  {
    label: 'Evidence',
    title: 'Field-informed learning',
    description:
      'Programme pages should connect activities with field observation, documentation, public education, and careful ecological interpretation.',
  },
  {
    label: 'Safety',
    title: 'Education before reaction',
    description:
      'Snake and wildlife communication should reduce panic, discourage risky handling, and support safer public response.',
  },
  {
    label: 'Growth',
    title: 'CMS-ready programme archive',
    description:
      'As DESCF grows, Sanity can hold programme profiles, activities, related articles, resources, and measurable outputs.',
  },
]

const fallbackFinalCta = {
  eyebrow: 'Partnership',
  title: 'Build programmes that are useful, credible, and safe for public learning.',
  description:
    'DESCF welcomes serious collaboration with institutions, researchers, educators, conservation practitioners, and media partners.',
  cta: { label: 'ডিইএসসিএফের সঙ্গে যুক্ত হোন', href: '/partner' },
}

async function getProgrammesPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

function getStatusCount(programmes: ProgrammeCardType[], status: ProgrammeStatus) {
  return programmes.filter((programme) => programme.status === status).length
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function getLink(link: NavLink | undefined, fallback: NavLink) {
  return link?.href ? link : fallback
}

function getSeo(page: PageContent | null) {
  return (page as (PageContent & { seo?: { title?: string; description?: string } }) | null)?.seo
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProgrammesPageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/programmes',
  })
}

export default async function ProgrammesPage() {
  const [page, programmes] = await Promise.all([
    getProgrammesPageContent(),
    sanityFetch<ProgrammeCardType[]>({
      query: PROGRAMMES_PAGE_QUERY,
      tags: ['programme'],
    }),
  ])

  const sections = page?.sections ?? []
  const heroPanelSection = getSection(sections, 'hero-panel')
  const statsSection = getSection(sections, 'stats')
  const portfolioSection = getSection(sections, 'portfolio')
  const emptySection = getSection(sections, 'empty-state')
  const principlesSection = getSection(sections, 'principles')
  const finalCtaSection = getSection(sections, 'final-cta')

  const currentCount = getStatusCount(programmes, 'current')
  const developingCount =
    getStatusCount(programmes, 'in-development') +
    getStatusCount(programmes, 'in-preparation') +
    getStatusCount(programmes, 'exploratory')

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = getLink(page?.primaryCta, fallbackHero.primaryCta)
  const secondaryCta = getLink(page?.secondaryCta, fallbackHero.secondaryCta)

  const heroPanelEyebrow = heroPanelSection?.eyebrow || fallbackHeroPanel.eyebrow
  const heroPanelTitle = heroPanelSection?.title || fallbackHeroPanel.title
  const heroPanelDescription = heroPanelSection?.description || fallbackHeroPanel.description

  const statCards = [
    {
      count: programmes.length,
      fallbackLabel: 'Published',
      fallbackText: 'Programme profiles available on the public website.',
      className: 'rounded-2xl border border-earth-200 bg-white p-6 shadow-sm',
    },
    {
      count: currentCount,
      fallbackLabel: 'Current',
      fallbackText: 'Active programme records marked as current.',
      className: 'rounded-2xl border border-forest-200 bg-forest-50 p-6 shadow-sm',
    },
    {
      count: developingCount,
      fallbackLabel: 'Pipeline',
      fallbackText: 'Developing, preparatory, or exploratory programme records.',
      className: 'rounded-2xl border border-bark-200 bg-bark-50 p-6 shadow-sm',
    },
  ]

  const portfolioEyebrow = portfolioSection?.eyebrow || fallbackPortfolio.eyebrow
  const portfolioTitle = portfolioSection?.title || fallbackPortfolio.title
  const portfolioDescription = portfolioSection?.description || fallbackPortfolio.description

  const emptyCard = emptySection?.cards?.[0]
  const emptyEyebrow = emptyCard?.eyebrow || emptySection?.eyebrow || fallbackEmptyState.eyebrow
  const emptyTitle = emptyCard?.title || emptySection?.title || fallbackEmptyState.title
  const emptyDescription =
    emptyCard?.text || emptySection?.description || fallbackEmptyState.description
  const emptyCta = getLink(emptyCard?.link || emptySection?.primaryCta, fallbackEmptyState.cta)

  const principlesEyebrow = principlesSection?.eyebrow || fallbackPrinciplesSection.eyebrow
  const principlesTitle = principlesSection?.title || fallbackPrinciplesSection.title
  const principleCards =
    principlesSection?.cards && principlesSection.cards.length > 0
      ? principlesSection.cards.map((card) => ({
          label: card.eyebrow || 'Programme',
          title: card.title,
          description: card.text || '',
        }))
      : fallbackProgrammePrinciples

  const finalCtaEyebrow = finalCtaSection?.eyebrow || fallbackFinalCta.eyebrow
  const finalCtaTitle = finalCtaSection?.title || fallbackFinalCta.title
  const finalCtaDescription = finalCtaSection?.description || fallbackFinalCta.description
  const finalCta = getLink(finalCtaSection?.primaryCta, fallbackFinalCta.cta)

  return (
    <main>
      <section className="border-b border-earth-200 bg-forest-950 text-white">
        <div className="container-site grid gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:py-28">
          <div>
            <p className="section-label mb-5 text-bark-300">{heroEyebrow}</p>

            <h1 className="max-w-4xl font-serif text-h1 text-white">{heroTitle}</h1>

            <p className="mt-6 max-w-2xl text-body-lg text-forest-50">
              {heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-bark-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark-600"
              >
                {primaryCta.label}
              </a>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/15 bg-white/8 p-7 shadow-card-lg backdrop-blur">
            <p className="section-label mb-4 text-bark-300">{heroPanelEyebrow}</p>
            <h2 className="font-serif text-3xl leading-tight text-white">
              {heroPanelTitle}
            </h2>
            <p className="mt-4 text-body-sm text-forest-50">
              {heroPanelDescription}
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site grid gap-5 py-8 sm:grid-cols-3">
          {statCards.map((stat, index) => {
            const card = statsSection?.cards?.[index]
            const label = card?.eyebrow || card?.title || stat.fallbackLabel
            const text = card?.text || stat.fallbackText

            return (
              <div key={stat.fallbackLabel} className={stat.className}>
                <p className="section-label mb-3">{label}</p>
                <p className="font-serif text-5xl text-earth-950">{stat.count}</p>
                <p className="mt-2 text-body-sm text-earth-700">{text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section id="programme-portfolio" className="border-b border-earth-200 bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{portfolioEyebrow}</p>
            <h2 className="font-serif text-h2 text-earth-950">{portfolioTitle}</h2>
            <p className="mt-4 text-body text-earth-700">{portfolioDescription}</p>
          </div>

          {programmes.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programmes.map((programme) => (
                <ProgrammeCard key={programme._id} programme={programme} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-earth-200 bg-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">{emptyEyebrow}</p>
              <h3 className="font-serif text-3xl text-earth-950">{emptyTitle}</h3>
              <p className="mt-4 max-w-2xl text-body text-earth-700">
                {emptyDescription}
              </p>
              <Link
                href={emptyCta.href}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800"
              >
                {emptyCta.label}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{principlesEyebrow}</p>
            <h2 className="font-serif text-h2 text-earth-950">{principlesTitle}</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principleCards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-earth-200 bg-white p-6 shadow-sm"
              >
                <p className="section-label mb-3">{item.label}</p>
                <h3 className="font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-4 text-body-sm text-earth-700">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="rounded-3xl bg-forest-950 p-8 text-white shadow-card-lg md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="section-label mb-4 text-bark-300">{finalCtaEyebrow}</p>
                <h2 className="max-w-3xl font-serif text-h2 text-white">
                  {finalCtaTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-body text-forest-50">
                  {finalCtaDescription}
                </p>
              </div>

              <Link
                href={finalCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-forest-950 transition hover:bg-earth-100"
              >
                {finalCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

