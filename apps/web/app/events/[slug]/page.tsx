import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@/components/portable-text/PortableText'
import { Breadcrumbs } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Event } from '@/types/sanity'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: EVENT_SLUGS_QUERY,
    tags: ['event'],
  })
  return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await sanityFetch<Event>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['event'],
  })
  if (!event) return { title: 'Event not found' }
  return {
    title: event.title,
    description: `DESCF event: ${event.title}${event.location ? ` — ${event.location}` : ''}`,
  }
}

export default async function EventDetailPage({ params }: Props) {
  const event = await sanityFetch<Event>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['event'],
  })

  if (!event) notFound()

  const eventDate  = new Date(event.date)
  const day        = eventDate.toLocaleDateString('en-GB', { day: '2-digit' })
  const month      = eventDate.toLocaleDateString('en-GB', { month: 'long' })
  const year       = eventDate.toLocaleDateString('en-GB', { year: 'numeric' })
  const isUpcoming = event.status === 'upcoming'

  // JSON-LD for the event
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    eventStatus: isUpcoming
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventPreviouslyPostponed',
    location: event.location
      ? { '@type': 'Place', name: event.location }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'DESCF',
      url: 'https://descf.org',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: 'Events', href: '/events' },
              { label: event.title },
            ]}
            className="mb-6 text-forest-400"
          />

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Date block */}
            <div className="flex-shrink-0 text-center bg-forest-800 border border-forest-700 rounded-2xl px-8 py-6 min-w-[120px]">
              <p className="text-5xl font-serif font-medium text-forest-50 leading-none">{day}</p>
              <p className="text-label text-forest-400 uppercase tracking-widest mt-1">{month}</p>
              <p className="text-body-sm text-forest-500 mt-0.5">{year}</p>
            </div>

            {/* Title + meta */}
            <div className="flex-1">
              <span className={cn(
                'inline-flex items-center gap-1.5 text-label px-2.5 py-1 rounded-md mb-4',
                isUpcoming
                  ? 'bg-forest-700 text-forest-200 border border-forest-600'
                  : 'bg-earth-700 text-earth-300 border border-earth-600'
              )}>
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  isUpcoming ? 'bg-forest-400' : 'bg-earth-500'
                )} />
                {isUpcoming ? 'Upcoming' : 'Completed'}
              </span>

              <h1 className="text-display-md font-serif text-forest-50 mb-4 leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-5 text-body-sm text-forest-300">
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-forest-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M8 1.5C5.52 1.5 3.5 3.52 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.48-2.02-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor"/>
                    </svg>
                    {event.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-forest-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M2 7h12M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {formatDate(event.date, 'EEEE, d MMMM yyyy')}
                </span>
                {event.time && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-forest-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {event.time}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site section-padding">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">

          {/* Main content */}
          <div>
            {event.description && (
              <PortableText value={event.description} />
            )}

            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-10">
                <h2 className="text-h3 font-serif text-earth-900 mb-5">Speakers</h2>
                <ul className="space-y-3">
                  {event.speakers.map((speaker, i) => (
                    <li key={i} className="flex items-center gap-3 text-body text-earth-700">
                      <span className="w-8 h-8 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-sm font-medium text-forest-800 flex-shrink-0">
                        {i + 1}
                      </span>
                      {speaker}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Registration CTA */}
            {isUpcoming && event.registrationLink && (
              <div className="bg-forest-900 rounded-xl p-5 text-forest-50">
                <p className="section-label text-forest-500 mb-3">Register</p>
                <p className="text-body-sm text-forest-300 mb-4 leading-relaxed">
                  Secure your place at this event.
                </p>
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-forest-700 hover:bg-forest-600 w-full justify-center"
                >
                  Register now
                </a>
              </div>
            )}

            {/* Event details card */}
            <div className="bg-earth-50 rounded-xl border border-earth-200 p-5 space-y-4 text-sm">
              <p className="section-label text-earth-400 mb-2">Event details</p>
              <div>
                <p className="text-earth-500 mb-0.5">Date</p>
                <p className="text-earth-900 font-medium">{formatDate(event.date, 'EEEE, d MMMM yyyy')}</p>
              </div>
              {event.time && (
                <div>
                  <p className="text-earth-500 mb-0.5">Time</p>
                  <p className="text-earth-900 font-medium">{event.time}</p>
                </div>
              )}
              {event.location && (
                <div>
                  <p className="text-earth-500 mb-0.5">Location</p>
                  <p className="text-earth-900 font-medium">{event.location}</p>
                </div>
              )}
              <div>
                <p className="text-earth-500 mb-0.5">Organiser</p>
                <p className="text-earth-900 font-medium">DESCF</p>
              </div>
            </div>

            <Link href="/events" className="btn-ghost w-full justify-center text-sm">
              ← All events
            </Link>
          </aside>
        </div>
      </div>
    </>
  )
}
