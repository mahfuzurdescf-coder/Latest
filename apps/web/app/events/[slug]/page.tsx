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
      canonicalUrl: `https://www.descf.org/events/${params.slug}`,
    })
  }

  return buildMetadata({
    title: event.title,
    description: `${event.title} - ${formatDate(event.date)}${event.location ? `, ${event.location}` : ''}.`,
    canonicalUrl: `https://www.descf.org/events/${event.slug.current}`,
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
      url: `https://www.descf.org/events/${event.slug.current}`,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">
                {getStatusLabel(event.status)} event
              </p>
              <h1 className="font-serif text-h1 text-earth-950">
                {event.title}
              </h1>

              <div className="mt-6 grid gap-4 text-body-sm text-earth-700 sm:grid-cols-3">
                <div>
                  <span className="font-semibold text-earth-950">Date</span>
                  <p className="mt-1">{formatDate(event.date)}</p>
                </div>

                <div>
                  <span className="font-semibold text-earth-950">Time</span>
                  <p className="mt-1">{event.time || 'To be announced'}</p>
                </div>

                <div>
                  <span className="font-semibold text-earth-950">Location</span>
                  <p className="mt-1">{event.location || 'To be announced'}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <article>
                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Event details
                    </h2>

                    {event.description && event.description.length > 0 ? (
                      <div className="prose prose-earth mt-5 max-w-none">
                        <PortableText value={event.description} />
                      </div>
                    ) : (
                      <p className="mt-4 text-body text-earth-700">
                        Details for this event will be updated soon.
                      </p>
                    )}

                    {event.speakers && event.speakers.length > 0 && (
                      <div className="mt-8 border-t border-earth-100 pt-6">
                        <h3 className="font-serif text-xl text-earth-950">
                          Speakers / facilitators
                        </h3>
                        <ul className="mt-4 space-y-2">
                          {event.speakers.map((speaker) => (
                            <li
                              key={speaker}
                              className="flex gap-3 text-body-sm text-earth-700"
                            >
                              <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                              <span>{speaker}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {event.registrationLink && (
                      <div className="mt-8 border-t border-earth-100 pt-6">
                        <Button href={event.registrationLink} variant="primary">
                          Open external registration
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </article>

              <aside className="space-y-6">
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
                      <p className="mt-3 text-body-sm text-earth-700">
                        Registration is not currently open through the website.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <ShareButtons
                  title={event.title}
                  description={getEventDescription(event)}
                  label="Share this event"
                />

                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Need help?
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      For event-related questions, contact DESCF through the contact page.
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
      </main>
    </>
  )
}
