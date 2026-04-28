import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Partner With DESCF',
  description:
    'Partner with DESCF on conservation awareness, research communication, education, media, and human-wildlife coexistence initiatives in Bangladesh.',
  canonicalUrl: 'https://descf.org/partner',
})

const partnerJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Partner With DESCF', url: 'https://descf.org/partner' },
])

const PARTNERSHIP_AREAS = [
  {
    title: 'Research and documentation',
    description:
      'Collaborate on biodiversity documentation, field learning, ecological communication, and responsible knowledge sharing.',
  },
  {
    title: 'Education and awareness',
    description:
      'Develop awareness activities, learning materials, workshops, and public communication on snakes and wildlife.',
  },
  {
    title: 'Media and storytelling',
    description:
      'Collaborate on ethical conservation storytelling, field notes, photo stories, interviews, and nature communication.',
  },
  {
    title: 'Institutional support',
    description:
      'Support DESCF through technical advice, resources, training, sponsorship, or long-term organisational collaboration.',
  },
]

const PARTNER_TYPES = [
  'Universities and research groups',
  'Schools and education networks',
  'Conservation organisations',
  'Media and documentary teams',
  'Donor and development partners',
  'Community-based organisations',
]

export default function PartnerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Partnership</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Partner with DESCF
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF welcomes serious collaboration with institutions, researchers,
                educators, media professionals, conservation organisations, and community
                partners committed to biodiversity protection and human-wildlife coexistence.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <SectionHeader
                  eyebrow="Collaboration areas"
                  title="Partnership should create practical conservation value"
                  description="DESCF is best suited for collaborations that connect field learning, conservation communication, public awareness, and responsible storytelling."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  {PARTNERSHIP_AREAS.map((area) => (
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
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Suitable partners
                    </h2>

                    <ul className="mt-5 space-y-3">
                      {PARTNER_TYPES.map((type) => (
                        <li key={type} className="flex gap-3 text-body-sm text-earth-700">
                          <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Start a conversation
                    </h2>

                    <p className="mt-3 text-body-sm text-earth-700">
                      A useful partnership message should mention your organisation,
                      proposed idea, expected timeline, location, and how the collaboration
                      supports conservation.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={`mailto:${SITE.contactEmail}`} variant="primary">
                        Email DESCF
                      </Button>
                      <Button href="/contact" variant="secondary">
                        Contact page
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-14">
            <div className="max-w-3xl">
              <p className="section-label mb-3">
                Partnership principle
              </p>
              <h2 className="font-serif text-h3 text-earth-950">
                DESCF should not be used as a symbolic partner for projects without conservation substance.
              </h2>
              <p className="mt-4 text-body text-earth-700">
                The strongest collaborations are practical, transparent, ethically communicated,
                and aligned with biodiversity conservation, ecological learning, and public awareness.
              </p>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}