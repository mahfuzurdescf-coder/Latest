import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
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
    'Contact Deep Ecology and Snake Conservation Foundation for conservation awareness, partnership, media, programme, and general enquiries.',
  canonicalUrl: 'https://descf.org/contact',
})

const contactJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Contact', url: 'https://descf.org/contact' },
])

const CONTACT_TOPICS = [
  {
    title: 'General enquiries',
    description:
      'Questions about DESCF, conservation awareness, education activities, and public communication.',
  },
  {
    title: 'Partnerships',
    description:
      'Institutional collaboration, programme partnership, research communication, and education initiatives.',
  },
  {
    title: 'Media and storytelling',
    description:
      'Interviews, responsible wildlife communication, documentation, and conservation storytelling.',
  },
  {
    title: 'Programmes and events',
    description:
      'Questions about seminars, workshops, awareness sessions, registration, and participation.',
  },
]

function getMailtoHref(subject: string) {
  return `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}`
}

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
                Contact DESCF
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                Use the contact form for general enquiries, partnership requests,
                media communication, programme questions, or event-related messages.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <SectionHeader
                  eyebrow="Message DESCF"
                  title="Send a clear enquiry"
                  description="Your message will be stored securely in DESCF Studio so the team can review and respond."
                />

                <Card>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Direct email
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      For urgent or official communication, you can also email DESCF directly.
                    </p>

                    <div className="mt-5">
                      <a
                        href={getMailtoHref('DESCF enquiry')}
                        className="text-sm font-semibold text-forest-700 hover:text-forest-900"
                      >
                        {SITE.contactEmail}
                      </a>
                    </div>

                    <div className="mt-6">
                      <Button href={getMailtoHref('DESCF enquiry')} variant="secondary">
                        Email DESCF
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      What to include
                    </h2>
                    <ul className="mt-5 space-y-3">
                      <li className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>Your name and organisation, if relevant.</span>
                      </li>
                      <li className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>The purpose of your enquiry.</span>
                      </li>
                      <li className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>Expected timeline, event date, or location if applicable.</span>
                      </li>
                      <li className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>How the enquiry relates to conservation, awareness, or collaboration.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Common enquiry areas"
              title="Choose the right context for your message"
              description="Clear messages are easier to review and respond to."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {CONTACT_TOPICS.map((topic) => (
                <Card key={topic.title}>
                  <CardContent>
                    <h2 className="font-serif text-xl text-earth-950">
                      {topic.title}
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
