import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

import { EventRegistrationForm } from '@/components/forms/EventRegistrationForm'
import { ShareButtons } from '@/components/share/ShareButtons'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import {
  EVENT_DETAIL_WITH_REGISTRATION_QUERY,
  EVENT_SLUGS_QUERY,
} from '@/lib/sanity/queries'
import type { EventDetail } from '@/types/sanity'

type PageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 60

function formatDate(date?: string): string {
  if (!date) return 'Date to be announced'

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function getStatusLabel(status?: string): string {
  if (status === 'completed') return 'Completed'
  return 'Upcoming'
}

function getEventDescription(event: EventDetail): string {
  return `${event.title} - ${formatDate(event.date)}${event.location ? `, ${event.location}` : ''}.`
}

function getEventCanonicalUrl(slug: string): string {
  return `https://www.descf.org/events/${slug}`
}

function EventInfoCard({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white/85 p-5 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-earth-500">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl leading-tight text-earth-950">
        {value || 'To be announced'}
      </p>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: EVENT_SLUGS_QUERY,
    tags: ['event'],
  })

  return slugs
    .filter((item) => item.slug)
    .map((item) => ({
      slug: item.slug,
    }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const event = await sanityFetch<EventDetail | null>({
    query: EVENT_DETAIL_WITH_REGISTRATION_QUERY,
    params: {
      slug: params.slug,
    },
    tags: ['event', 'registrationForm'],
  })

  if (!event) {
    return buildMetadata({
      title: 'Event not found',
      description: 'The requested DESCF event could not be found.',
      canonicalUrl: getEventCanonicalUrl(params.slug),
    })
  }

  return buildMetadata({
    title: event.title,
    description: getEventDescription(event),
    canonicalUrl: getEventCanonicalUrl(event.slug.current),
  })
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await sanityFetch<EventDetail | null>({
    query: EVENT_DETAIL_WITH_REGISTRATION_QUERY,
    params: {
      slug: params.slug,
    },
    tags: ['event', 'registrationForm'],
  })

  if (!event) {
    notFound()
  }

  const eventJsonLd = buildBreadcrumbJSONLD([
    { name: 'Home', url: 'https://www.descf.org' },
    { name: 'Events', url: 'https://www.descf.org/events' },
    {
      name: event.title,
      url: getEventCanonicalUrl(event.slug.current),
    },
  ])

  const statusLabel = getStatusLabel(event.status)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <main id="main-content" className="bg-earth-50">
        <section className="relative overflow-hidden border-b border-earth-200 bg-gradient-to-br from-[#f7f3ec] via-white to-[#dfe9dc]">
          <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-forest-200/25 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/55 blur-3xl" />

          <Container className="relative section-padding-sm">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-earth-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-forest-800">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/events" className="hover:text-forest-800">
                    Events
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-earth-700" aria-current="page">
                  {event.title}
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <div className="max-w-4xl">
                <p className="section-label mb-5">{statusLabel} event</p>

                <h1 className="font-serif text-h1 leading-tight text-earth-950">
                  {event.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-earth-700">
                  Join DESCF for a conservation-focused event designed to support
                  public awareness, community learning, and stronger
                  human-wildlife coexistence.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {event.registrationLink && (
                    <Button href={event.registrationLink} variant="primary">
                      Register now
                    </Button>
                  )}

                  <Button href="/events" variant="secondary">
                    View all events
                  </Button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-xl shadow-earth-900/5 backdrop-blur">
                <p className="section-label mb-4">Event snapshot</p>
                <div className="space-y-4">
                  <EventInfoCard label="Date" value={formatDate(event.date)} />
                  <EventInfoCard label="Time" value={event.time} />
                  <EventInfoCard label="Location" value={event.location} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
              <article className="space-y-6">
                <Card>
                  <CardContent>
                    <p className="section-label mb-3">About this event</p>
                    <h2 className="font-serif text-3xl text-earth-950">
                      Event details
                    </h2>

                    {event.description && event.description.length > 0 ? (
                      <div className="prose prose-earth mt-6 max-w-none">
                        <PortableText value={event.description} />
                      </div>
                    ) : (
                      <p className="mt-4 text-body leading-8 text-earth-700">
                        Details for this event will be updated soon.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {event.speakers && event.speakers.length > 0 && (
                  <Card>
                    <CardContent>
                      <p className="section-label mb-3">People</p>
                      <h2 className="font-serif text-3xl text-earth-950">
                        Speakers / facilitators
                      </h2>

                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {event.speakers.map((speaker) => (
                          <li
                            key={speaker}
                            className="rounded-2xl border border-earth-200 bg-earth-50 px-4 py-3 text-body-sm text-earth-700"
                          >
                            {speaker}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </article>

              <aside className="space-y-6">
                <ShareButtons
                  title={event.title}
                  description={getEventDescription(event)}
                  label="Share this event"
                />

                {event.registrationForm ? (
                  <EventRegistrationForm
                    form={event.registrationForm}
                    eventTitle={event.title}
                  />
                ) : (
                  <Card>
                    <CardContent>
                      <p className="section-label mb-3">Registration</p>
                      <h2 className="font-serif text-2xl text-earth-950">
                        Registration information
                      </h2>
                      <p className="mt-3 text-body-sm leading-7 text-earth-700">
                        Registration is not currently open through the website.
                      </p>

                      {event.registrationLink && (
                        <div className="mt-5">
                          <Button href={event.registrationLink} variant="primary">
                            Open external registration
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent>
                    <p className="section-label mb-3">Need help?</p>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Questions about this event?
                    </h2>
                    <p className="mt-3 text-body-sm leading-7 text-earth-700">
                      For event-related questions, contact DESCF through the
                      contact page.
                    </p>
                    <div className="mt-5">
                      <Button href="/contact" variant="secondary">
                        Contact DESCF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>

        <section className="border-t border-earth-200 bg-white">
          <Container className="py-12">
            <div className="rounded-[2rem] border border-earth-200 bg-gradient-to-br from-forest-50 via-white to-earth-50 p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="section-label mb-3">Stay connected</p>
                  <h2 className="font-serif text-3xl text-earth-950">
                    Explore more DESCF events and activities
                  </h2>
                  <p className="mt-3 max-w-2xl text-body leading-7 text-earth-700">
                    Follow upcoming awareness, conservation, field learning, and
                    community engagement activities from DESCF.
                  </p>
                </div>

                <Button href="/events" variant="primary">
                  View events
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
