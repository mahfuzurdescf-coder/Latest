import type { Metadata } from 'next'

import { EventCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
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

const eventsJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Events', url: 'https://descf.org/events' },
])

type EventsPageData = {
  upcoming?: EventCardType[]
  past?: EventCardType[]
}

export default async function EventsPage() {
  const data = await sanityFetch<EventsPageData>({
    query: EVENTS_PAGE_QUERY,
    tags: ['event'],
  })

  const upcoming = data.upcoming ?? []
  const past = data.past ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Events</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Events, workshops, and awareness activities
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF events can include awareness sessions, institutional discussions,
                education activities, conservation communication programmes, and field-related learning.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Upcoming"
                title="Upcoming events"
                description="Published upcoming events from Sanity CMS appear here."
                className="mb-0"
              />

              <Button href="/contact" variant="secondary">
                Enquire about events
              </Button>
            </div>

            <div className="mt-10">
              {upcoming.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {upcoming.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming events published"
                  description="Upcoming DESCF events will appear here after they are added in Sanity CMS."
                  actionLabel="Contact DESCF"
                  actionHref="/contact"
                />
              )}
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Past events"
              title="Completed activities and event records"
              description="Past events help build institutional memory and public trust when documented clearly."
            />

            {past.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {past.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl text-earth-950">
                    No past event records published yet
                  </h2>
                  <p className="mt-3 text-body text-earth-700">
                    Completed event records will appear here after they are added through Sanity CMS.
                  </p>
                </CardContent>
              </Card>
            )}
          </Container>
        </section>
      </main>
    </>
  )
}