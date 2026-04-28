import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PortableText } from '@/components/portable-text/PortableText'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { Event } from '@/types/sanity'

interface Props {
  params: {
    slug: string
  }
}

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getEventUrl(slug: string): string {
  return `https://descf.org/events/${slug}`
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: EVENT_SLUGS_QUERY,
    tags: ['event'],
  })

  return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await sanityFetch<Event | null>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['event'],
  })

  if (!event) {
    return buildMetadata({
      title: 'Event not found',
      description: 'The requested DESCF event could not be found.',
      canonicalUrl: getEventUrl(params.slug),
    })
  }

  return buildMetadata({
    title: event.title,
    description:
      event.location || event.time
        ? `DESCF event: ${event.title}. ${event.location ?? ''} ${event.time ?? ''}`.trim()
        : `DESCF event: ${event.title}.`,
    canonicalUrl: getEventUrl(params.slug),
  })
}

export default async function EventDetailPage({ params }: Props) {
  const event = await sanityFetch<Event | null>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['event'],
  })

  if (!event) notFound()

  const eventUrl = getEventUrl(params.slug)
  const breadcrumbJsonLd = buildBreadcrumbJSONLD([
    { name: 'Home', url: 'https://descf.org' },
    { name: 'Events', url: 'https://descf.org/events' },
    { name: event.title, url: eventUrl },
  ])

  const dateLabel = formatEventDate(event.date)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-earth-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-forest-800">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/events" className="hover:text-forest-800">
                    Events
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-earth-700" aria-current="page">
                  {event.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="section-label mb-4">
                {event.status === 'upcoming' ? 'Upcoming event' : 'Completed event'}
              </p>
              <h1 className="font-serif text-h1 text-earth-950">
                {event.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-earth-600">
                <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 font-medium text-forest-800">
                  {dateLabel}
                </span>
                {event.time && (
                  <span className="rounded-full border border-earth-200 bg-white px-3 py-1">
                    {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="rounded-full border border-earth-200 bg-white px-3 py-1">
                    {event.location}
                  </span>
                )}
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div className="max-w-3xl">
                {event.description && event.description.length > 0 ? (
                  <div className="prose prose-earth max-w-none">
                    <PortableText value={event.description} />
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8">
                      <h2 className="font-serif text-2xl text-earth-950">
                        Event details are being prepared
                      </h2>
                      <p className="mt-3 text-body text-earth-700">
                        Detailed information for this event has not been added yet.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Event information
                    </h2>

                    <dl className="mt-5 space-y-4 text-body-sm">
                      <div>
                        <dt className="font-semibold text-earth-950">Date</dt>
                        <dd className="mt-1 text-earth-700">{dateLabel}</dd>
                      </div>

                      {event.time && (
                        <div>
                          <dt className="font-semibold text-earth-950">Time</dt>
                          <dd className="mt-1 text-earth-700">{event.time}</dd>
                        </div>
                      )}

                      {event.location && (
                        <div>
                          <dt className="font-semibold text-earth-950">Location</dt>
                          <dd className="mt-1 text-earth-700">{event.location}</dd>
                        </div>
                      )}

                      <div>
                        <dt className="font-semibold text-earth-950">Status</dt>
                        <dd className="mt-1 text-earth-700">
                          {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </dd>
                      </div>
                    </dl>

                    {event.registrationLink && event.status === 'upcoming' && (
                      <div className="mt-6">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          Registration link
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {event.speakers && event.speakers.length > 0 && (
                  <Card>
                    <CardContent>
                      <h2 className="font-serif text-2xl text-earth-950">
                        Speakers
                      </h2>
                      <ul className="mt-5 space-y-3">
                        {event.speakers.map((speaker) => (
                          <li key={speaker} className="flex gap-3 text-body-sm text-earth-700">
                            <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                            <span>{speaker}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Button href="/events" variant="secondary">
                  Back to events
                </Button>
              </aside>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}