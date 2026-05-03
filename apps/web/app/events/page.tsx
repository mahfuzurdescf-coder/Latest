import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import {
  EVENTS_PAGE_QUERY,
  PAGE_CONTENT_BY_KEY_QUERY,
} from '@/lib/sanity/queries'
import type {
  EventCard as EventCardType,
  NavLink,
  PageContent,
  PageSection,
} from '@/types/sanity'

const PAGE_KEY = 'events'

const fallbackMetadata = {
  title: 'Events',
  description:
    'DESCF events, awareness activities, workshops, public programmes, and conservation communication activities.',
}

const fallbackHero = {
  eyebrow: 'DESCF events',
  title: 'Public events with conservation purpose.',
  description:
    'DESCF events should not look like random activity posts. They should work as a credible public archive of awareness sessions, field learning, institutional discussion, community education, and responsible conservation communication.',
  primaryCta: { label: 'Browse events', href: '#event-archive' },
  secondaryCta: { label: 'Explore programmes', href: '/programmes' },
}

const fallbackHeroPanel = {
  eyebrow: 'Archive principle',
  title: 'Events should prove what DESCF actually does.',
  description:
    'Each event record should eventually show date, place, programme connection, photos, learning outcome, partners where verified, and safety-first public messaging.',
}

const fallbackStats = [
  {
    label: 'records',
    description: 'Total published event records.',
  },
  {
    label: 'upcoming',
    description: 'Upcoming events currently published.',
  },
  {
    label: 'completed',
    description: 'Completed events in the public archive.',
  },
]

const fallbackStandards = [
  {
    label: 'Purpose',
    title: 'Clear public value',
    description:
      'Every event should explain why it matters, who it serves, and how it supports conservation awareness.',
  },
  {
    label: 'Learning',
    title: 'Field-informed record',
    description:
      'Events should connect people with field learning, ecological context, observation, and responsible communication.',
  },
  {
    label: 'Safety',
    title: 'Education before reaction',
    description:
      'Wildlife events should reduce panic, avoid risky handling, and support safer public response.',
  },
  {
    label: 'Archive',
    title: 'A serious activity record',
    description:
      'Completed events should become a credible archive of learning, collaboration, and institutional growth.',
  },
]

const fallbackArchive = {
  eyebrow: 'Event archive',
  title: 'Published DESCF events',
  description:
    'Upcoming and completed event records are pulled from Sanity. As DESCF grows, this page can become the public record of workshops, awareness sessions, seminars, field events, and partnership activities.',
}

const fallbackTip = {
  title: 'Tip:',
  description:
    'Keep event records factual. Do not overclaim impact. Add outcomes only when DESCF can verify them.',
}

const fallbackEventSections = {
  upcomingTitle: 'Upcoming events',
  upcomingCountLabel: 'upcoming',
  completedTitle: 'Completed events',
  completedCountLabel: 'completed',
  emptyEyebrow: 'No event records yet',
  emptyCta: { label: 'Contact DESCF', href: '/contact' },
  upcomingEmptyTitle: 'No upcoming events published',
  upcomingEmptyDescription:
    'Upcoming DESCF events will appear here after they are added and published in Sanity Studio.',
  completedEmptyTitle: 'No completed event archive yet',
  completedEmptyDescription:
    'Completed DESCF events should be published here with date, place, purpose, and verified learning outcomes.',
}

const fallbackFinalCta = {
  eyebrow: 'Partnership and participation',
  title: 'Build conservation events that are useful, credible, and safe.',
  description:
    'Researchers, educators, institutions, media teams, and conservation practitioners can contact DESCF for responsible collaboration.',
  cta: { label: 'Contact DESCF', href: '/contact' },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://www.descf.org' },
  { name: 'Events', url: 'https://www.descf.org/events' },
]

type EventsPageData = {
  upcoming?: EventCardType[]
  past?: EventCardType[]
}

function formatDate(date?: string): string {
  if (!date) return 'Date not specified'

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function getEventMonth(date?: string): string {
  if (!date) return 'TBA'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
  })
    .format(new Date(date))
    .toUpperCase()
}

function getEventDay(date?: string): string {
  if (!date) return '--'

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
  }).format(new Date(date))
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

async function getEventsPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

function EventRow({
  event,
  upcomingLabel,
  completedLabel,
}: {
  event: EventCardType
  upcomingLabel: string
  completedLabel: string
}) {
  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group grid gap-5 rounded-[1.5rem] border border-earth-200 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-forest-300 hover:shadow-card-lg sm:grid-cols-[5rem_1fr_auto]"
    >
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-forest-200 bg-forest-50 text-center">
        <span className="font-serif text-3xl leading-none text-forest-900">
          {getEventDay(event.date)}
        </span>
        <span className="mt-1 text-label uppercase tracking-[0.18em] text-forest-700">
          {getEventMonth(event.date)}
        </span>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-label text-forest-800">
            {event.status === 'upcoming' ? upcomingLabel : completedLabel}
          </span>

          <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-label text-earth-600">
            {formatDate(event.date)}
          </span>

          {event.time ? (
            <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-label text-earth-600">
              {event.time}
            </span>
          ) : null}
        </div>

        <h2 className="font-serif text-3xl leading-tight text-earth-950 transition group-hover:text-forest-800">
          {event.title}
        </h2>

        {event.location ? (
          <p className="mt-3 max-w-2xl text-body-sm leading-6 text-earth-600">
            {event.location}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

function EmptyEventCard({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string
  title: string
  description: string
  cta: NavLink
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-earth-300 bg-white/70 p-8">
      <p className="section-label mb-3">{eyebrow}</p>
      <h2 className="font-serif text-3xl text-earth-950">{title}</h2>
      <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
        {description}
      </p>
      <Link href={cta.href} className="btn-secondary mt-6">
        {cta.label}
      </Link>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEventsPageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/events',
  })
}

export default async function EventsPage() {
  const [page, data] = await Promise.all([
    getEventsPageContent(),
    sanityFetch<EventsPageData>({
      query: EVENTS_PAGE_QUERY,
      tags: ['event'],
    }),
  ])

  const sections = page?.sections ?? []
  const heroPanelSection = getSection(sections, 'hero-panel')
  const statsSection = getSection(sections, 'stats')
  const standardsSection = getSection(sections, 'standards')
  const archiveSection = getSection(sections, 'archive')
  const tipSection = getSection(sections, 'archive-tip')
  const upcomingSection = getSection(sections, 'upcoming-events')
  const completedSection = getSection(sections, 'completed-events')
  const emptySection = getSection(sections, 'empty-state')
  const finalCtaSection = getSection(sections, 'final-cta')

  const upcoming = data.upcoming ?? []
  const past = data.past ?? []
  const totalEvents = upcoming.length + past.length

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = getLink(page?.primaryCta, fallbackHero.primaryCta)
  const secondaryCta = getLink(page?.secondaryCta, fallbackHero.secondaryCta)

  const heroPanelEyebrow = heroPanelSection?.eyebrow || fallbackHeroPanel.eyebrow
  const heroPanelTitle = heroPanelSection?.title || fallbackHeroPanel.title
  const heroPanelDescription =
    heroPanelSection?.description || fallbackHeroPanel.description

  const statValues = [totalEvents, upcoming.length, past.length]
  const statCards = fallbackStats.map((fallback, index) => {
    const card = statsSection?.cards?.[index]

    return {
      value: statValues[index],
      label: card?.title || card?.eyebrow || fallback.label,
      description: card?.text || fallback.description,
    }
  })

  const standardCards =
    standardsSection?.cards && standardsSection.cards.length > 0
      ? standardsSection.cards.map((card) => ({
          label: card.eyebrow || 'Standard',
          title: card.title,
          description: card.text || '',
        }))
      : fallbackStandards

  const archiveEyebrow = archiveSection?.eyebrow || fallbackArchive.eyebrow
  const archiveTitle = archiveSection?.title || fallbackArchive.title
  const archiveDescription = archiveSection?.description || fallbackArchive.description

  const tipTitle = tipSection?.title || fallbackTip.title
  const tipDescription = tipSection?.description || fallbackTip.description

  const upcomingTitle = upcomingSection?.title || fallbackEventSections.upcomingTitle
  const upcomingCountLabel =
    upcomingSection?.eyebrow || fallbackEventSections.upcomingCountLabel
  const completedTitle = completedSection?.title || fallbackEventSections.completedTitle
  const completedCountLabel =
    completedSection?.eyebrow || fallbackEventSections.completedCountLabel

  const emptyCta = getLink(emptySection?.primaryCta, fallbackEventSections.emptyCta)
  const emptyEyebrow = emptySection?.eyebrow || fallbackEventSections.emptyEyebrow
  const upcomingEmptyTitle =
    upcomingSection?.cards?.[0]?.title || fallbackEventSections.upcomingEmptyTitle
  const upcomingEmptyDescription =
    upcomingSection?.cards?.[0]?.text ||
    upcomingSection?.description ||
    fallbackEventSections.upcomingEmptyDescription
  const completedEmptyTitle =
    completedSection?.cards?.[0]?.title || fallbackEventSections.completedEmptyTitle
  const completedEmptyDescription =
    completedSection?.cards?.[0]?.text ||
    completedSection?.description ||
    fallbackEventSections.completedEmptyDescription

  const finalCtaEyebrow = finalCtaSection?.eyebrow || fallbackFinalCta.eyebrow
  const finalCtaTitle = finalCtaSection?.title || fallbackFinalCta.title
  const finalCtaDescription = finalCtaSection?.description || fallbackFinalCta.description
  const finalCta = getLink(finalCtaSection?.primaryCta, fallbackFinalCta.cta)

  const breadcrumbJsonLd = buildBreadcrumbJSONLD(breadcrumbs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main>
        <section className="border-b border-forest-800 bg-forest-950 text-white">
          <div className="container-site section-padding">
            <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-center">
              <div>
                <nav className="mb-8 text-body-sm text-forest-100">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <span className="mx-2 text-forest-300">/</span>
                  <span className="text-gold-300">Events</span>
                </nav>

                <p className="section-label mb-5 text-gold-300">{heroEyebrow}</p>

                <h1 className="font-serif text-h1 leading-none text-white">
                  {heroTitle}
                </h1>

                <p className="mt-6 max-w-3xl text-body-lg leading-8 text-forest-50">
                  {heroDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={primaryCta.href} className="btn-primary">
                    {primaryCta.label}
                  </a>
                  <Link
                    href={secondaryCta.href}
                    className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white hover:text-forest-950"
                  >
                    {secondaryCta.label}
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/8 p-8 shadow-card-lg backdrop-blur">
                <p className="section-label mb-4 text-gold-300">
                  {heroPanelEyebrow}
                </p>
                <h2 className="font-serif text-4xl leading-tight text-white">
                  {heroPanelTitle}
                </h2>
                <p className="mt-5 text-body leading-7 text-forest-50">
                  {heroPanelDescription}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {statCards.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/8 p-4"
                    >
                      <p className="font-serif text-3xl text-white">{stat.value}</p>
                      <p className="mt-1 text-label text-forest-100">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-earth-200 bg-earth-50">
          <div className="container-site section-padding-sm">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {standardCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <p className="section-label mb-4">{item.label}</p>
                  <h2 className="font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h2>
                  {item.description ? (
                    <p className="mt-4 text-body-sm leading-6 text-earth-600">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="event-archive" className="bg-[#f7f3ec]">
          <div className="container-site section-padding">
            <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <p className="section-label mb-4">{archiveEyebrow}</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  {archiveTitle}
                </h2>
                <p className="mt-5 max-w-3xl text-body leading-7 text-earth-600">
                  {archiveDescription}
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-earth-200 bg-white p-5 text-body-sm leading-6 text-earth-600 shadow-card">
                <strong className="text-earth-900">{tipTitle}</strong>{' '}
                {tipDescription}
              </div>
            </div>

            <div className="grid gap-10">
              <section>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl text-earth-950">
                    {upcomingTitle}
                  </h3>
                  <span className="rounded-full bg-forest-50 px-4 py-2 text-label text-forest-800">
                    {upcoming.length} {upcomingCountLabel}
                  </span>
                </div>

                <div className="space-y-4">
                  {upcoming.length > 0 ? (
                    upcoming.map((event) => (
                      <EventRow
                        key={event._id}
                        event={event}
                        upcomingLabel={upcomingCountLabel}
                        completedLabel={completedCountLabel}
                      />
                    ))
                  ) : (
                    <EmptyEventCard
                      eyebrow={emptyEyebrow}
                      title={upcomingEmptyTitle}
                      description={upcomingEmptyDescription}
                      cta={emptyCta}
                    />
                  )}
                </div>
              </section>

              <section>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl text-earth-950">
                    {completedTitle}
                  </h3>
                  <span className="rounded-full bg-earth-100 px-4 py-2 text-label text-earth-700">
                    {past.length} {completedCountLabel}
                  </span>
                </div>

                <div className="space-y-4">
                  {past.length > 0 ? (
                    past.map((event) => (
                      <EventRow
                        key={event._id}
                        event={event}
                        upcomingLabel={upcomingCountLabel}
                        completedLabel={completedCountLabel}
                      />
                    ))
                  ) : (
                    <EmptyEventCard
                      eyebrow={emptyEyebrow}
                      title={completedEmptyTitle}
                      description={completedEmptyDescription}
                      cta={emptyCta}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-site section-padding">
            <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="section-label mb-4 text-gold-300">
                    {finalCtaEyebrow}
                  </p>
                  <h2 className="font-serif text-4xl leading-tight text-white md:text-5xl">
                    {finalCtaTitle}
                  </h2>
                  <p className="mt-5 max-w-3xl text-body leading-7 text-forest-50">
                    {finalCtaDescription}
                  </p>
                </div>

                <Link
                  href={finalCta.href}
                  className="btn-secondary bg-white text-forest-950 hover:bg-gold-200"
                >
                  {finalCta.label}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
