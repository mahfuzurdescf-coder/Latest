import type { Metadata } from 'next'
import Link from 'next/link'

import {
  SnakeSpeciesBrowser,
  type SnakeSpeciesBrowserLabels,
} from '@/components/wildlife/SnakeSpeciesBrowser'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import {
  PAGE_CONTENT_BY_KEY_QUERY,
  snakeSpeciesQuery,
} from '@/lib/sanity/queries'
import type {
  NavLink,
  PageContent,
  PageSection,
  SpeciesProfileCard,
} from '@/types/sanity'

const PAGE_KEY = 'bangladesh-snakes'
const BD_SNAKES = 'বাংলাদেশের সাপ'

export const revalidate = 60

const fallbackMetadata = {
  title: BD_SNAKES,
  description:
    "DESCF's public-friendly digital field guide to the snakes of Bangladesh, including local-name search, species profiles, venom status, habitat notes, and safety guidance.",
}

const fallbackHero = {
  homeLabel: 'Home',
  wildlifeLabel: 'Bangladesh Wildlife',
  eyebrow: 'ডিজিটাল ফিল্ড গাইড — বাংলাদেশের বন্যপ্রাণী',
  title: BD_SNAKES,
  description:
    'A calm, searchable, public-friendly field guide for learning about snake diversity, identification clues, venom status, habitat, ecological role, and safe response in Bangladesh.',
  primaryCta: { label: 'প্রজাতি দেখুন', href: '#snake-database' },
  secondaryCta: { label: 'প্রকৃতি কথা পড়ুন', href: '/prokriti-kotha' },
}

const fallbackHeroPanel = {
  eyebrow: 'গাইডে খুঁজুন',
  title: 'স্থানীয়, ইংরেজি বা বৈজ্ঞানিক নাম দিয়ে খুঁজুন।',
  description:
    'Many people do not know a scientific name. The database supports Bangla names, local names, English names, spelling variants, and transliteration where available.',
  tags: ['darash', 'cobra', 'rat snake', 'krait', 'keute', 'python'],
}

const fallbackStats = [
  {
    label: 'প্রকাশিত প্রজাতি',
    note: 'ডিইএসসিএফ ডাটাবেসে বর্তমানে প্রকাশিত সাপের প্রোফাইল।',
  },
  {
    label: 'Non-venomous',
    note: 'জনসচেতনতার জন্য নির্বিষ প্রজাতি আলাদা করে বোঝা গুরুত্বপূর্ণ।',
  },
  {
    label: 'Medically important',
    note: 'নিরাপত্তা যোগাযোগের জন্য এই গ্রুপটি অগ্রাধিকারযোগ্য।',
  },
]

const fallbackStandards = {
  eyebrow: 'Database standard',
  title: 'More than photos: verified field-guide information.',
  description:
    'This section is designed to reduce fear and misinformation by presenting snake information in a simple, responsible, conservation-friendly format.',
  cards: [
    {
      title: 'Names and identity',
      text: 'বাংলা নাম, স্থানীয় নাম, ইংরেজি নাম, বৈজ্ঞানিক নাম এবং slug alias মানুষকে সহজে খুঁজতে সাহায্য করে।',
    },
    {
      title: 'নিরাপত্তা আগে',
      text: 'This database is not a handling or rescue manual. Safe distance and responsible response remain the priority.',
    },
    {
      title: 'Ecology matters',
      text: 'প্রোফাইলে আবাসস্থল, খাদ্যাভ্যাস, পরিবেশগত ভূমিকা এবং সহাবস্থানভিত্তিক শেখার বিষয় থাকতে পারে।',
    },
    {
      title: 'Location privacy',
      text: 'সুনির্দিষ্ট অবস্থান প্রকাশ না করে সংবেদনশীল প্রজাতি ও আবাসস্থল সুরক্ষিত রাখা উচিত।',
    },
  ],
}

const fallbackSafety = {
  eyebrow: 'জননিরাপত্তা নোট',
  title: 'Keep distance. Do not handle snakes.',
  description:
    'This field guide is for education and conservation awareness. Do not attempt to catch, crowd, or harm a snake. If a snake is in a human-use area, seek help from trained responders or the relevant authority.',
}

const fallbackDatabase = {
  eyebrow: 'প্রজাতি ডাটাবেস',
  title: 'সাপের প্রজাতি প্রোফাইল দেখুন।',
  description:
    'নাম, বিষের অবস্থা, IUCN অবস্থা, পরিবার, স্থানীয় নাম এবং keyword দিয়ে প্রকাশিত প্রোফাইল খুঁজুন ও ফিল্টার করুন।',
}

const fallbackTip = {
  title: 'Tip:',
  description: 'Try Bangla, English, local spelling, or scientific names.',
}

const fallbackBottomCards = [
  {
    eyebrow: 'Editorial connection',
    title: 'Stories, field notes, and myth-busting writing.',
    description:
      'Beyond species profiles, DESCF can use Prokriti Kotha to publish field observations, rescue stories, coexistence writing, and public myth-busting content.',
    cta: { label: 'প্রকৃতি কথা পড়ুন', href: '/prokriti-kotha' },
    variant: 'forest',
  },
  {
    eyebrow: 'Contribute carefully',
    title: 'Before sending photos or records.',
    description:
      'Species records should include clear identification-friendly photos, broad location, date, observer credit, and safety context. Avoid publishing exact sensitive locations.',
    cta: { label: 'ডিইএসসিএফের সঙ্গে যোগাযোগ করুন', href: '/contact' },
    variant: 'plain',
  },
] as const

const fallbackBrowserLabels: SnakeSpeciesBrowserLabels = {
  searchLabel: 'সাপের ফিল্ড গাইডে খুঁজুন',
  searchPlaceholder:
    'বাংলা নাম, ইংরেজি নাম, স্থানীয় নাম, বৈজ্ঞানিক নাম বা পরিবার দিয়ে খুঁজুন...',
  venomFilterLabel: 'বিষের অবস্থা',
  iucnFilterLabel: 'IUCN অবস্থা',
  iucnPrefix: 'IUCN',
  iucnMissingLabel: 'তালিকাভুক্ত নয়',
  familyLabel: 'পরিবার',
  bangladeshStatusLabel: 'বাংলাদেশ',
  viewProfileLabel: 'প্রজাতি প্রোফাইল দেখুন',
  resultPrefix: 'দেখানো হচ্ছে',
  resultMiddle: '/',
  resultTotalLabel: 'মোট',
  emptyTitle: 'আপনার ফিল্টারের সঙ্গে কোনো প্রজাতি মেলেনি',
  emptyDescription:
    'সার্চ শব্দ, বিষের অবস্থা বা IUCN ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।',
}

function countByValue(
  species: SpeciesProfileCard[],
  key: keyof SpeciesProfileCard,
  value: string,
): number {
  return species.filter((item) => item[key] === value).length
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
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

function getCardText(section: PageSection | undefined, index: number, fallback: string) {
  const card = section?.cards?.[index]
  return card?.title || card?.eyebrow || card?.text || fallback
}

async function getBangladeshSnakesPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string | number
  note: string
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 text-white shadow-card backdrop-blur-sm">
      <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl leading-none text-white">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-forest-100">{note}</p>
    </div>
  )
}

function StandardCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-earth-200/80 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-card-lg">
      <h3 className="font-serif text-2xl text-earth-950">{title}</h3>
      <p className="mt-3 text-body-sm leading-7 text-earth-700">{text}</p>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBangladeshSnakesPageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/bangladesh-wildlife/snakes',
  })
}

export default async function BangladeshSnakesPage() {
  const [page, species] = await Promise.all([
    getBangladeshSnakesPageContent(),
    sanityFetch<SpeciesProfileCard[]>({
      query: snakeSpeciesQuery,
      tags: ['speciesProfile', 'wildlifeGroup'],
    }),
  ])

  const sections = page?.sections ?? []
  const breadcrumbSection = getSection(sections, 'breadcrumb')
  const heroPanelSection = getSection(sections, 'hero-panel')
  const statsSection = getSection(sections, 'stats')
  const standardsSection = getSection(sections, 'database-standard')
  const safetySection = getSection(sections, 'safety-note')
  const databaseSection = getSection(sections, 'species-database')
  const tipSection = getSection(sections, 'database-tip')
  const bottomCardsSection = getSection(sections, 'bottom-cards')
  const browserLabelsSection = getSection(sections, 'browser-labels')

  const publishedSpecies = (species ?? []).filter(
    (item) => item.slug?.current,
  )

  const totalSpecies = publishedSpecies.length
  const nonVenomousCount = countByValue(
    publishedSpecies,
    'venomStatus',
    'non-venomous',
  )
  const medicallyImportantCount = countByValue(
    publishedSpecies,
    'medicalImportance',
    'medically-important',
  )

  const homeLabel = getCardText(breadcrumbSection, 0, fallbackHero.homeLabel)
  const wildlifeLabel = getCardText(breadcrumbSection, 1, fallbackHero.wildlifeLabel)

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = getLink(page?.primaryCta, fallbackHero.primaryCta)
  const secondaryCta = getLink(page?.secondaryCta, fallbackHero.secondaryCta)

  const heroPanelEyebrow = heroPanelSection?.eyebrow || fallbackHeroPanel.eyebrow
  const heroPanelTitle = heroPanelSection?.title || fallbackHeroPanel.title
  const heroPanelDescription =
    heroPanelSection?.description || fallbackHeroPanel.description
  const heroPanelTags =
    heroPanelSection?.cards && heroPanelSection.cards.length > 0
      ? heroPanelSection.cards
          .map((card) => card.title || card.text)
          .filter((item): item is string => Boolean(item))
      : fallbackHeroPanel.tags

  const statValues = [totalSpecies, nonVenomousCount, medicallyImportantCount]
  const statCards = fallbackStats.map((fallback, index) => {
    const card = statsSection?.cards?.[index]

    return {
      label: card?.title || card?.eyebrow || fallback.label,
      note: card?.text || fallback.note,
      value: statValues[index],
    }
  })

  const standardsEyebrow = standardsSection?.eyebrow || fallbackStandards.eyebrow
  const standardsTitle = standardsSection?.title || fallbackStandards.title
  const standardsDescription =
    standardsSection?.description || fallbackStandards.description
  const standardCards =
    standardsSection?.cards && standardsSection.cards.length > 0
      ? standardsSection.cards.map((card) => ({
          title: card.title,
          text: card.text || '',
        }))
      : fallbackStandards.cards

  const safetyEyebrow = safetySection?.eyebrow || fallbackSafety.eyebrow
  const safetyTitle = safetySection?.title || fallbackSafety.title
  const safetyDescription = safetySection?.description || fallbackSafety.description

  const databaseEyebrow = databaseSection?.eyebrow || fallbackDatabase.eyebrow
  const databaseTitle = databaseSection?.title || fallbackDatabase.title
  const databaseDescription = databaseSection?.description || fallbackDatabase.description

  const tipTitle = tipSection?.title || fallbackTip.title
  const tipDescription = tipSection?.description || fallbackTip.description

  const bottomCards =
    bottomCardsSection?.cards && bottomCardsSection.cards.length > 0
      ? bottomCardsSection.cards.map((card, index) => ({
          eyebrow: card.eyebrow || fallbackBottomCards[index]?.eyebrow || '',
          title: card.title,
          description: card.text || '',
          cta: getLink(index === 0 ? bottomCardsSection?.primaryCta : bottomCardsSection?.secondaryCta, fallbackBottomCards[index]?.cta || fallbackBottomCards[1].cta),
          variant: fallbackBottomCards[index]?.variant || 'plain',
        }))
      : fallbackBottomCards

  const browserLabels: SnakeSpeciesBrowserLabels = {
    ...fallbackBrowserLabels,
    searchLabel: getCardText(browserLabelsSection, 0, fallbackBrowserLabels.searchLabel || ''),
    searchPlaceholder: getCardText(
      browserLabelsSection,
      1,
      fallbackBrowserLabels.searchPlaceholder || '',
    ),
    venomFilterLabel: getCardText(
      browserLabelsSection,
      2,
      fallbackBrowserLabels.venomFilterLabel || '',
    ),
    iucnFilterLabel: getCardText(
      browserLabelsSection,
      3,
      fallbackBrowserLabels.iucnFilterLabel || '',
    ),
    emptyTitle: getCardText(browserLabelsSection, 4, fallbackBrowserLabels.emptyTitle || ''),
    emptyDescription: getCardText(
      browserLabelsSection,
      5,
      fallbackBrowserLabels.emptyDescription || '',
    ),
  }

  return (
    <main id="main-content" className="bg-earth-50">
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]" />

        <div className="container-site relative py-14 md:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-forest-100/75">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/bangladesh-wildlife"
                  className="hover:text-white"
                >
                  {wildlifeLabel}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-bark-200" aria-current="page">
                {heroTitle}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                {heroEyebrow}
              </p>

              <h1 className="mt-5 font-serif text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.96] tracking-tight text-white">
                {heroTitle}
              </h1>

              <p className="mt-7 max-w-3xl text-xl leading-9 text-forest-100">
                {heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={primaryCta.href} className="btn-cta">
                  {primaryCta.label}
                </a>
                <Link
                  href={secondaryCta.href}
                  className="rounded-full border border-forest-200 px-5 py-3 text-sm font-semibold text-forest-50 transition hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-card backdrop-blur-sm">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                {heroPanelEyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
                {heroPanelTitle}
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-forest-100">
                {heroPanelDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {heroPanelTags.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-forest-50"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {statCards.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                note={stat.note}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="section-label mb-3">{standardsEyebrow}</p>
            <h2 className="font-serif text-h2 text-earth-950">
              {standardsTitle}
            </h2>
            <p className="mt-4 text-body leading-8 text-earth-700">
              {standardsDescription}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {standardCards.map((card) => (
              <StandardCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#fbf7ed]">
        <div className="container-site py-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-label mb-3">{safetyEyebrow}</p>
              <h2 className="font-serif text-3xl text-earth-950">
                {safetyTitle}
              </h2>
            </div>
            <p className="text-body leading-8 text-earth-700">
              {safetyDescription}
            </p>
          </div>
        </div>
      </section>

      <section id="snake-database" className="bg-earth-50">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-3">{databaseEyebrow}</p>
              <h2 className="font-serif text-h2 text-earth-950">
                {databaseTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
                {databaseDescription}
              </p>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-white/85 px-5 py-4 text-sm leading-6 text-earth-600 shadow-card">
              <strong className="text-earth-950">{tipTitle}</strong> {tipDescription}
            </div>
          </div>

          <SnakeSpeciesBrowser species={publishedSpecies} labels={browserLabels} />
        </div>
      </section>

      <section className="border-t border-earth-200 bg-white">
        <div className="container-site py-12 md:py-14 lg:py-16">
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
                <h2 className="font-serif text-3xl text-earth-950">
                  {card.title}
                </h2>
                <p className="mt-4 text-body leading-8 text-earth-700">
                  {card.description}
                </p>
                <Link
                  href={card.cta.href}
                  className={
                    card.variant === 'forest'
                      ? 'mt-6 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-900'
                      : 'mt-6 inline-flex rounded-full border border-forest-300 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-white'
                  }
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

