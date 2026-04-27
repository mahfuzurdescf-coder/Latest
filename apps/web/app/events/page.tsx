// apps/web/app/events/page.tsx
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { EVENTS_PAGE_QUERY } from '@/lib/sanity/queries'
import { EventCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { EventCard as EventCardType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Events & Seminars',
  description: 'Upcoming and past events, seminars, and talks by DESCF — the Deep Ecology and Snake Conservation Foundation.',
}

interface EventsData {
  upcoming: EventCardType[]
  past: EventCardType[]
}

export default async function EventsPage() {
  const data = await sanityFetch<EventsData>({
    query: EVENTS_PAGE_QUERY,
    tags: ['event'],
  })

  const upcoming = data?.upcoming ?? []
  const past     = data?.past     ?? []

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Calendar</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Events &amp; Seminars</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Conservation talks, field seminars, and public education events from DESCF.
          </p>
        </div>
      </section>

      <section className="section-padding container-site space-y-14">
        {upcoming.length > 0 && (
          <div>
            <SectionHeader label="What's coming" title="Upcoming events" />
            <div className="grid md:grid-cols-2 gap-5 max-w-prose-lg">
              {upcoming.map(e => <EventCard key={e._id} event={e} />)}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <SectionHeader label="Archive" title="Past events" />
            <div className="grid md:grid-cols-2 gap-4 max-w-prose-lg">
              {past.map(e => <EventCard key={e._id} event={e} />)}
            </div>
          </div>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No events listed yet</p>
            <p className="text-body-sm">DESCF events will appear here when published.</p>
          </div>
        )}
      </section>
    </>
  )
}
