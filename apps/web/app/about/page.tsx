import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About DESCF',
  description:
    'Learn about Deep Ecology and Snake Conservation Foundation, a Bangladesh-based conservation organisation focused on biodiversity, snake conservation, awareness, research, and coexistence.',
  canonicalUrl: 'https://descf.org/about',
})

const aboutJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'About DESCF', url: 'https://descf.org/about' },
])

const PRINCIPLES = [
  {
    title: 'Ecological responsibility',
    description:
      'DESCF approaches conservation through respect for biodiversity, ecosystems, and the shared life systems that connect people and wildlife.',
  },
  {
    title: 'Public awareness',
    description:
      'A major part of conservation is communication. DESCF works to reduce fear, misinformation, and harmful responses toward snakes and other wildlife.',
  },
  {
    title: 'Field-informed learning',
    description:
      'DESCF values practical learning from nature, field observation, documentation, and responsible ecological storytelling.',
  },
  {
    title: 'Human-wildlife coexistence',
    description:
      'Conservation must work with communities, not against them. DESCF promotes coexistence through education, empathy, and practical awareness.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">About DESCF</p>
              <h1 className="font-serif text-h1 text-earth-950">
                A conservation organisation working for biodiversity, awareness, and coexistence.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                Deep Ecology and Snake Conservation Foundation is a Bangladesh-based conservation
                organisation focused on biodiversity protection, snake conservation, ecological
                awareness, research communication, and human-wildlife coexistence.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="section-label mb-3">Institutional identity</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  DESCF exists because conservation is not only about wildlife—it is also about public understanding.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  In Bangladesh, many conservation challenges are connected to fear, misinformation,
                  habitat pressure, limited ecological education, and weak communication between
                  field knowledge and public awareness. DESCF works in this gap by combining
                  conservation learning, snake awareness, nature communication, and practical
                  coexistence-oriented outreach.
                </p>
                <p className="mt-4 text-body text-earth-700">
                  The organisation’s work should be understood as institutional conservation
                  communication: building awareness, documenting biodiversity, supporting learning,
                  and helping people relate to wildlife with responsibility rather than fear.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/mission" variant="primary">
                    Mission and vision
                  </Button>
                  <Button href="/current-work" variant="secondary">
                    Current work
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-h3 text-earth-950">
                    Core areas of focus
                  </h2>

                  <div className="mt-6 space-y-5">
                    {[
                      'Biodiversity conservation and ecological learning',
                      'Snake conservation and public awareness',
                      'Human-wildlife coexistence communication',
                      'Nature storytelling and field documentation',
                      'Institutional collaboration and conservation education',
                    ].map((item) => (
                      <div key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <p className="text-body-sm text-earth-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Working principles"
              title="The organisation is built around responsible conservation communication."
              description="DESCF should not be presented as a generic NGO. Its strength is the connection between ecological responsibility, field learning, public awareness, and coexistence."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <Card key={principle.title}>
                  <CardContent>
                    <h3 className="font-serif text-2xl text-earth-950">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-forest-900 text-white">
          <Container className="py-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label mb-3 text-forest-300">
                  Learn more
                </p>
                <h2 className="font-serif text-h3 text-white">
                  Explore DESCF’s mission, current work, and partnership opportunities.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/current-work" className="btn-cta">
                  Current work
                </Link>
                <Link
                  href="/partner"
                  className="inline-flex justify-center rounded-lg border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-50 transition-colors hover:bg-forest-800"
                >
                  Partner with DESCF
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}