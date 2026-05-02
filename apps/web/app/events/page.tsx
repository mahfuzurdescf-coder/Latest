import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { EVENTS_PAGE_QUERY } from '@/lib/sanity/queries'
import type { EventCard as EventCardType } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Events',
  description:
    'DESCF events, awareness activities, workshops, public programmes, and conservation communication activities.',
  canonicalUrl: 'https://descf.org/events',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Events', url: 'https://descf.org/events' },
]

type EventsPageData = {
  upcoming?: EventCardType[]
  past?: EventCardType[]
}

const EVENT_STANDARDS = [
  {
    label: 'Purpose',
    title: 'Clear public value',
    description:
      'Every event should explain why it matters, who it serves, and how it supports conservation awareness.',
  },
  {
    label: 'Evidence',
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

function formatDate(date?: string): string {
  if (!date) return 'Date not specified'

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getEventMonth(date?: string): string {
  if (!date) return 'TBA'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
  }).format(new Date(date))
}

function getEventDay(date?: string): string {
  if (!date) return '--'

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
  }).format(new Date(date))
}

function EventRow({ event }: { event: EventCardType }) {
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
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
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
        ) : (
          <p className="mt-3 max-w-2xl text-body-sm leading-6 text-earth-500">
            Location will be confirmed by DESCF.
          </p>
        )}
      </div>

      <div className="flex items-end sm:items-center">
        <span className="text-label text-forest-800 transition group-hover:translate-x-1">
          View event ?
        </span>
      </div>
    </Link>
  )
}

function EmptyEventCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-earth-300 bg-white/70 p-8">
      <p className="section-label mb-3">No records yet</p>
      <h2 className="font-serif text-3xl text-earth-950">{title}</h2>
      <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
        {description}
      </p>
      <Link href="/contact" className="btn-secondary mt-6">
        Contact DESCF
      </Link>
    </div>
  )
}

export default async function EventsPage() {
  const data = await sanityFetch<EventsPageData>({
    query: EVENTS_PAGE_QUERY,
    tags: ['event'],
  })

  const upcoming = data.upcoming ?? []
  const past = data.past ?? []
  const totalEvents = upcoming.length + past.length

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJSONLD(breadcrumbs)),
        }}
      />

      <main>
        <section className="bg-forest-950 text-white">
          <div className="container-site section-padding grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <nav className="mb-8 text-body-sm text-forest-100">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2 text-forest-300">/</span>
                <span className="text-gold-300">Events</span>
              </nav>

              <p className="section-label mb-5 text-gold-300">DESCF events</p>

              <h1 className="font-serif text-h1 leading-none text-white">
                Public events with conservation purpose.
              </h1>

              <p className="mt-6 max-w-3xl text-body-lg leading-8 text-forest-50">
                DESCF events should not look like random activity posts. They should work as a credible public archive of awareness sessions, field learning, institutional discussion, community education, and responsible conservation communication.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#event-archive" className="btn-primary">
                  Browse events
                </a>
                <Link href="/programmes" className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white hover:text-forest-950">
                  View programmes
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/8 p-8 shadow-card-lg backdrop-blur">
              <p className="section-label mb-4 text-gold-300">Archive principle</p>
              <h2 className="font-serif text-4xl leading-tight text-white">
                Events should prove what DESCF actually does.
              </h2>
              <p className="mt-5 text-body leading-7 text-forest-50">
                Each event record should eventually show date, place, programme connection, photos, learning outcome, partners where verified, and safety-first public messaging.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="font-serif text-3xl text-white">{totalEvents}</p>
                  <p className="mt-1 text-label text-forest-100">records</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="font-serif text-3xl text-white">{upcoming.length}</p>
                  <p className="mt-1 text-label text-forest-100">upcoming</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="font-serif text-3xl text-white">{past.length}</p>
                  <p className="mt-1 text-label text-forest-100">completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-earth-200 bg-earth-50">
          <div className="container-site section-padding-sm">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {EVENT_STANDARDS.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <p className="section-label mb-4">{item.label}</p>
                  <h2 className="font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-body-sm leading-6 text-earth-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="event-archive" className="bg-[#f7f3ec]">
          <div className="container-site section-padding">
            <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <p className="section-label mb-4">Event archive</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Published DESCF events
                </h2>
                <p className="mt-5 max-w-3xl text-body leading-7 text-earth-600">
                  Upcoming and completed event records are pulled from Sanity. As DESCF grows, this page can become the public record of workshops, awareness sessions, seminars, field events, and partnership activities.
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-earth-200 bg-white p-5 text-body-sm leading-6 text-earth-600 shadow-card">
                <strong className="text-earth-900">Tip:</strong> Keep event records factual. Do not overclaim impact. Add outcomes only when DESCF can verify them.
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl text-earth-950">
                    Upcoming events
                  </h3>
                  <span className="rounded-full bg-forest-50 px-4 py-2 text-label text-forest-800">
                    {upcoming.length} upcoming
                  </span>
                </div>

                <div className="space-y-4">
                  {upcoming.length > 0 ? (
                    upcoming.map((event) => <EventRow key={event._id} event={event} />)
                  ) : (
                    <EmptyEventCard
                      title="No upcoming events published"
                      description="Upcoming DESCF events will appear here after they are added and published in Sanity Studio."
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl text-earth-950">
                    Completed events
                  </h3>
                  <span className="rounded-full bg-earth-100 px-4 py-2 text-label text-earth-700">
                    {past.length} completed
                  </span>
                </div>

                <div className="space-y-4">
                  {past.length > 0 ? (
                    past.map((event) => <EventRow key={event._id} event={event} />)
                  ) : (
                    <EmptyEventCard
                      title="No completed event archive yet"
                      description="Completed DESCF events should be published here with date, place, purpose, and verified learning outcomes."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-site section-padding-sm">
            <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="section-label mb-4 text-gold-300">
                    Partnership and participation
                  </p>
                  <h2 className="font-serif text-4xl leading-tight text-white md:text-5xl">
                    Build conservation events that are useful, credible, and safe.
                  </h2>
                  <p className="mt-5 max-w-3xl text-body leading-7 text-forest-50">
                    Researchers, educators, institutions, media teams, and conservation practitioners can contact DESCF for responsible collaboration.
                  </p>
                </div>

                <Link href="/contact" className="btn-secondary bg-white text-forest-950 hover:bg-gold-200">
                  Contact DESCF
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
