import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact DESCF',
  description:
    'Contact Deep Ecology and Snake Conservation Foundation for collaboration, conservation communication, awareness, research, media, and institutional enquiries.',
  canonicalUrl: 'https://descf.org/contact',
})

const contactJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Contact', url: 'https://descf.org/contact' },
])

const CONTACT_TOPICS = [
  'Conservation collaboration',
  'Snake awareness and education',
  'Research and field documentation',
  'Media and institutional communication',
  'Partnership or support enquiries',
  'General organisational enquiries',
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Contact</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Get in touch with DESCF
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                For collaboration, conservation communication, awareness programmes,
                research enquiries, media requests, or institutional partnership discussions,
                contact DESCF directly by email.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-h3 text-earth-950">
                    Primary contact
                  </h2>

                  <p className="mt-4 text-body text-earth-700">
                    The website does not currently use a live contact form. This avoids
                    pretending to send messages when no form backend is configured.
                    Please use the email link below.
                  </p>

                  <div className="mt-8 rounded-2xl border border-forest-100 bg-forest-50 p-6">
                    <p className="text-label uppercase tracking-widest text-forest-700">
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE.contactEmail}`}
                      className="mt-2 block break-words font-serif text-2xl text-forest-900 hover:text-forest-700"
                    >
                      {SITE.contactEmail}
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`mailto:${SITE.contactEmail}`} variant="primary">
                      Email DESCF
                    </Button>
                    <Button href="/partner" variant="secondary">
                      Partnership enquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Enquiry topics
                    </h2>

                    <ul className="mt-5 space-y-3">
                      {CONTACT_TOPICS.map((topic) => (
                        <li key={topic} className="flex gap-3 text-body-sm text-earth-700">
                          <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Before contacting
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      Keep your message specific. Mention your organisation, purpose,
                      location, timeline, and the type of collaboration or information
                      you are seeking.
                    </p>

                    <div className="mt-5">
                      <Link
                        href="/current-work"
                        className="font-semibold text-forest-700 hover:text-forest-900"
                      >
                        Review DESCF current work →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}