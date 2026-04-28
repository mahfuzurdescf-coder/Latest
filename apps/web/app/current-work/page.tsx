import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Current Work',
  description:
    'Explore DESCF’s current work in snake conservation, biodiversity awareness, field documentation, conservation storytelling, and human-wildlife coexistence in Bangladesh.',
  canonicalUrl: 'https://descf.org/current-work',
})

const currentWorkJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Current Work', url: 'https://descf.org/current-work' },
])

const WORK_AREAS = [
  {
    title: 'Snake conservation awareness',
    description:
      'DESCF works to improve public understanding of snakes, reduce harmful fear-based responses, and communicate coexistence-oriented knowledge.',
  },
  {
    title: 'Biodiversity documentation',
    description:
      'Field observation, species documentation, and ecological learning help build a stronger public understanding of Bangladesh’s natural diversity.',
  },
  {
    title: 'Conservation communication',
    description:
      'DESCF develops public-facing communication that connects conservation knowledge with accessible storytelling and education.',
  },
  {
    title: 'Human-wildlife coexistence',
    description:
      'The organisation promotes practical awareness and responsible attitudes toward wildlife in human-dominated landscapes.',
  },
  {
    title: 'Nature learning materials',
    description:
      'Educational resources, articles, field notes, and visual materials can support schools, communities, and general audiences.',
  },
  {
    title: 'Institutional collaboration',
    description:
      'DESCF seeks meaningful partnerships with researchers, educators, conservation organisations, and media professionals.',
  },
]

const CURRENT_PRIORITIES = [
  'Strengthening snake awareness and conservation communication',
  'Improving institutional presentation and public trust',
  'Publishing structured conservation stories and resources',
  'Developing partnership-ready programme pages',
  'Preparing for a separate Nature Tales editorial platform',
]

export default function CurrentWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(currentWorkJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Current work</p>
              <h1 className="font-serif text-h1 text-earth-950">
                DESCF’s current work connects awareness, documentation, and coexistence.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF’s present work focuses on snake conservation awareness, biodiversity
                learning, nature communication, and human-wildlife coexistence in Bangladesh.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Work areas"
              title="A focused institutional portfolio for conservation communication"
              description="The website should present DESCF’s work as a serious conservation portfolio—not a scattered list of activities."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {WORK_AREAS.map((area) => (
                <Card key={area.title}>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {area.title}
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="section-label mb-3">Current priorities</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  The next stage is about credibility, structure, and maintainable growth.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  DESCF should prioritise a clear institutional portfolio, CMS-driven content,
                  consistent public communication, and partnership-ready pages. This creates
                  a stronger foundation before expanding into Nature Tales as a separate
                  editorial platform.
                </p>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Priority checklist
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {CURRENT_PRIORITIES.map((priority) => (
                      <li key={priority} className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="rounded-3xl bg-forest-900 p-8 text-white md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="section-label mb-3 text-forest-300">
                    Collaboration
                  </p>
                  <h2 className="font-serif text-h3 text-white">
                    Current work becomes stronger when it is connected with serious partners.
                  </h2>
                  <p className="mt-4 text-body text-forest-100">
                    Researchers, educators, media teams, institutions, and conservation organisations
                    can contact DESCF for responsible collaboration.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href="/partner" variant="cta">
                    Partner with DESCF
                  </Button>
                  <Button
                    href={`mailto:${SITE.contactEmail}`}
                    variant="secondary"
                    className="border-forest-300 text-forest-50 hover:bg-forest-800"
                  >
                    Email DESCF
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}