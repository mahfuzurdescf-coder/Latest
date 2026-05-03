import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import type { RegistrationFormPublic } from '@/types/sanity'

type PageProps = {
  params: {
    slug: string
  }
}

type EventRecord = {
  _id: string
  title?: string
  slug?: {
    current?: string
  }
  excerpt?: unknown
  summary?: unknown
  shortDescription?: unknown
  description?: unknown
  body?: unknown
  content?: unknown
  details?: unknown
  date?: string
  eventDate?: string
  startDate?: string
  startAt?: string
  startDateTime?: string
  time?: string
  startTime?: string
  endTime?: string
  endAt?: string
  endDateTime?: string
  location?: unknown
  venue?: unknown
  place?: unknown
  status?: string
  eventStatus?: string
  speakers?: unknown
  registrationLink?: string
  registrationDeadline?: string
  deadline?: string
  registrationCloseDate?: string
  registrationClosesAt?: string
  registrationForm?: RegistrationFormPublic | null
}

const SITE_URL = 'https://www.descf.org'

const eventBySlugQuery = `*[_type == "event" && coalesce(language, "bn") == "bn" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  summary,
  shortDescription,
  description,
  body,
  content,
  details,
  date,
  eventDate,
  startDate,
  startAt,
  startDateTime,
  time,
  startTime,
  endTime,
  endAt,
  endDateTime,
  location,
  venue,
  place,
  status,
  eventStatus,
  speakers,
  registrationLink,
  registrationDeadline,
  deadline,
  registrationCloseDate,
  registrationClosesAt,
  registrationForm->{
    _id,
    title,
    registrationTitle,
    description,
    deadline,
    fields,
    submitButtonLabel,
    successMessage,
    notificationEmail
  }
}`

function eventUrl(slug: string) {
  return `${SITE_URL}/events/${slug}`
}

async function getEvent(slug: string) {
  return sanityFetch({
    query: eventBySlugQuery,
    params: { slug },
  }) as Promise<EventRecord | null>
}

function toPlainText(value: unknown): string {
  if (!value) return ''

  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    return value
      .map((item) => toPlainText(item))
      .filter(Boolean)
      .join('\n\n')
      .trim()
  }

  if (typeof value === 'object') {
    const item = value as Record<string, unknown>

    if (typeof item.text === 'string') return item.text

    if (Array.isArray(item.children)) {
      return item.children
        .map((child) => {
          if (typeof child === 'string') return child
          if (child && typeof child === 'object' && 'text' in child) {
            return String((child as { text?: unknown }).text || '')
          }
          return ''
        })
        .join('')
        .trim()
    }

    if (typeof item.name === 'string') return item.name
    if (typeof item.title === 'string') return item.title
    if (typeof item.address === 'string') return item.address
  }

  return ''
}

function compactText(value: string, maxLength: number) {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`
}

function getTitle(event: EventRecord) {
  return event.title || 'DESCF event'
}

function getFullDescription(event: EventRecord) {
  return (
    toPlainText(event.body) ||
    toPlainText(event.content) ||
    toPlainText(event.details) ||
    toPlainText(event.description) ||
    toPlainText(event.summary) ||
    toPlainText(event.shortDescription) ||
    toPlainText(event.excerpt)
  )
}

function getHeroDescription(event: EventRecord) {
  return compactText(
    toPlainText(event.excerpt) ||
      toPlainText(event.summary) ||
      toPlainText(event.shortDescription) ||
      getFullDescription(event) ||
      'Join DESCF for a conservation-focused event designed to support public awareness, community learning, and stronger human-wildlife coexistence.',
    260
  )
}

function getMetaDescription(event: EventRecord) {
  return compactText(getHeroDescription(event), 155)
}

function getDateSource(event: EventRecord) {
  return (
    event.date ||
    event.eventDate ||
    event.startDate ||
    event.startAt ||
    event.startDateTime ||
    ''
  )
}

function makeDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date
}

function formatLongDate(value?: string) {
  const date = makeDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function formatDay(value?: string) {
  const date = makeDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
  }).format(date)
}

function formatMonth(value?: string) {
  const date = makeDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
  })
    .format(date)
    .toUpperCase()
}

function formatTimeFromDate(value?: string) {
  const date = makeDate(value)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function getTimeRange(event: EventRecord) {
  if (event.time) return event.time
  if (event.startTime && event.endTime) return `${event.startTime} – ${event.endTime}`
  if (event.startTime) return event.startTime

  const start = formatTimeFromDate(event.startAt || event.startDateTime)
  const end = formatTimeFromDate(event.endAt || event.endDateTime)

  if (start && end) return `${start} – ${end}`
  if (start) return start

  return 'Time to be announced'
}

function getLocation(event: EventRecord) {
  return (
    toPlainText(event.location) ||
    toPlainText(event.venue) ||
    toPlainText(event.place) ||
    'Location to be announced'
  )
}

function getStatus(event: EventRecord) {
  const raw = event.eventStatus || event.status || 'Upcoming'
  return raw
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function hasRegistration(event: EventRecord) {
  return Boolean(event.registrationForm || event.registrationLink)
}

function renderParagraphs(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  if (!paragraphs.length) {
    return (
      <p>
        Full event details are being prepared. This page should explain the
        event purpose, audience, activities, learning outcome, safety note, and
        verified partner information.
      </p>
    )
  }

  return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const event = await getEvent(params.slug)

  if (!event) {
    return buildMetadata({
      title: 'Event not found | DESCF',
      description: 'This DESCF event could not be found.',
      canonicalUrl: eventUrl(params.slug),
    })
  }

  return buildMetadata({
    title: `${getTitle(event)} | DESCF`,
    description: getMetaDescription(event),
    canonicalUrl: eventUrl(params.slug),
  })
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEvent(params.slug)

  if (!event) {
    notFound()
  }

  const title = getTitle(event)
  const slug = event.slug?.current || params.slug
  const url = eventUrl(slug)
  const dateSource = getDateSource(event)
  const longDate = formatLongDate(dateSource)
  const day = formatDay(dateSource)
  const month = formatMonth(dateSource)
  const timeRange = getTimeRange(event)
  const location = getLocation(event)
  const status = getStatus(event)
  const heroDescription = getHeroDescription(event)
  const fullDescription = getFullDescription(event)
  const registrationAvailable = hasRegistration(event)
  const registrationTarget = registrationAvailable ? '#registration' : '/contact'
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <main>
      <section className="border-b border-earth-200 bg-[radial-gradient(circle_at_top_right,rgba(49,94,52,0.10),transparent_32%),linear-gradient(135deg,#fbf8ef_0%,#fffdf8_52%,#eef4ea_100%)]">
        <div className="container-site py-12 lg:py-14">
          <nav className="mb-8 text-sm text-earth-700" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-800">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/events" className="hover:text-forest-800">
              Events
            </Link>
            <span className="px-2">/</span>
            <span className="text-earth-950">{title}</span>
          </nav>

          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-forest-800">
                {status} event
              </p>

              <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-earth-950 sm:text-6xl lg:text-[4.8rem]">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-earth-800">
                {heroDescription}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={registrationTarget}
                  className="btn-primary"
                >
                  {registrationAvailable ? 'নিবন্ধন করুন' : 'ডিইএসসিএফের সঙ্গে যোগাযোগ করুন'}
                </a>
                <Link
                  href="/events"
                  className="btn-secondary"
                >
                  সব ইভেন্ট দেখুন
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-earth-200 bg-white/90 p-5 shadow-card backdrop-blur">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-forest-800">
                Event snapshot
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-earth-600">
                    Date
                  </p>
                  <p className="mt-2 font-serif text-[1.35rem] leading-snug text-earth-950">
                    {longDate}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-earth-600">
                    Time
                  </p>
                  <p className="mt-2 font-serif text-[1.35rem] leading-snug text-earth-950">
                    {timeRange}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-200 bg-earth-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-earth-600">
                    Location
                  </p>
                  <p className="mt-2 font-serif text-[1.35rem] leading-snug text-earth-950">
                    {location}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

<section className="border-b border-earth-200 bg-white">
        <div className="container-site py-5">
          <div className="grid gap-3 rounded-[1.75rem] border border-earth-200 bg-earth-50/80 p-3 sm:grid-cols-2 lg:grid-cols-[150px_1fr_1fr_1.2fr_150px]">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-forest-200 bg-forest-50 text-center">
                <span className="block font-serif text-2xl leading-none text-forest-900">
                  {day}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-forest-800">
                  {month}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-earth-600">
                Date
              </p>
              <p className="mt-1 font-bold text-earth-950">{longDate}</p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-earth-600">
                Time
              </p>
              <p className="mt-1 font-bold text-earth-950">{timeRange}</p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-earth-600">
                Location
              </p>
              <p className="mt-1 font-bold text-earth-950">{location}</p>
            </div>

            <a
              href={registrationTarget}
              className="grid place-items-center rounded-2xl bg-forest-700 px-5 py-4 text-center text-sm font-bold text-white transition hover:bg-forest-800"
            >
              {registrationAvailable ? 'যোগ দিন' : 'যোগাযোগ'}
            </a>
          </div>
        </div>
      </section>

<section className="bg-earth-50">
        <div className="mx-auto grid max-w-6xl gap-7 px-6 py-10 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start">
          <div className="space-y-6">
            <article className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card lg:p-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-forest-800">
                About this event
              </p>
              <h2 className="font-serif text-[2.15rem] leading-tight tracking-[-0.02em] text-earth-950">
                Event details
              </h2>

              <div className="mt-6 space-y-5 text-[1.03rem] leading-8 text-earth-850">
                {renderParagraphs(fullDescription)}
              </div>
            </article>

            

          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <section className="rounded-[1.35rem] border border-earth-200 bg-white p-5 shadow-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-earth-700">
                Share
              </p>
              <h2 className="font-serif text-2xl leading-tight text-earth-950">
                Share
              </h2>
              <p className="mt-3 text-sm leading-6 text-earth-700">
                Share this DESCF event with people who may benefit from
                conservation learning.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-earth-200 px-4 py-2 text-sm font-bold text-earth-800 hover:bg-earth-50"
                >
                  Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-earth-200 px-4 py-2 text-sm font-bold text-earth-800 hover:bg-earth-50"
                >
                  WhatsApp
                </a>
                <a
                  href={url}
                  className="rounded-full border border-earth-200 px-4 py-2 text-sm font-bold text-earth-800 hover:bg-earth-50"
                >
                  লিংক খুলুন
                </a>
              </div>
            </section>

<section className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-5 shadow-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-amber-700">
                Safety note
              </p>
              <h2 className="font-serif text-2xl leading-tight text-earth-950">
                Education first, no risky handling.
              </h2>
              <p className="mt-4 text-sm leading-6 text-earth-700">
                DESCF event content should support public education and
                conservation awareness. It should not encourage risky wildlife
                handling, catching, crowding, or disturbance.
              </p>
            </section>

<section className="rounded-[1.35rem] border border-earth-200 bg-white p-5 shadow-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-earth-700">
                Need help?
              </p>
              <h2 className="font-serif text-2xl leading-tight text-earth-950">
                Questions about this event?
              </h2>
              <p className="mt-3 text-sm leading-6 text-earth-700">
                For event-related questions, contact DESCF through the contact
                page.
              </p>
              <Link
                href="/contact"
                className="btn-secondary mt-5"
              >
                ডিইএসসিএফের সঙ্গে যোগাযোগ করুন
              </Link>
            </section>
          </aside>
        </div>
      </section>

<section className="bg-earth-50">
        <div className="container-site py-10">
          <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card lg:flex lg:items-center lg:justify-between lg:p-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-forest-800">
                Stay connected
              </p>
              <h2 className="font-serif text-3xl leading-tight text-earth-950">
                More DESCF events
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-earth-700">
                Follow upcoming awareness, conservation, field learning, and
                community engagement activities from DESCF.
              </p>
            </div>

            <Link
              href="/events"
              className="btn-primary mt-6 lg:mt-0"
            >
              ইভেন্ট দেখুন
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}






