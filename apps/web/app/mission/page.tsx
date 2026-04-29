import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Mission and Vision',
  description:
    'DESCF’s mission and vision focus on biodiversity conservation, snake awareness, ecological education, research communication, and human-wildlife coexistence in Bangladesh.',
  canonicalUrl: 'https://descf.org/mission',
})

const missionJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Mission and Vision', url: 'https://descf.org/mission' },
])

const VALUES = [
  {
    title: 'Respect for life systems',
    description:
      'DESCF’s conservation outlook values ecosystems, species, habitats, and the relationships that sustain life.',
  },
  {
    title: 'Knowledge before fear',
    description:
      'Snake conservation requires replacing panic and misinformation with practical awareness and ecological understanding.',
  },
  {
    title: 'Community-facing conservation',
    description:
      'Awareness must be understandable, locally relevant, and useful for people living near wildlife.',
  },
  {
    title: 'Responsible communication',
    description:
      'Conservation storytelling should inform the public without sensationalising wildlife or exposing sensitive locations.',
  },
]

export default function MissionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Mission and vision</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Building a society that understands, respects, and coexists with wildlife.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF’s institutional purpose is to strengthen conservation awareness,
                biodiversity learning, snake conservation, and human-wildlife coexistence
                through responsible communication and field-informed work.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <p className="section-label mb-3">Mission</p>
                  <h2 className="font-serif text-h2 text-earth-950">
                    To advance conservation awareness and coexistence through education, documentation, and public communication.
                  </h2>
                  <p className="mt-5 text-body text-earth-700">
                    DESCF works to support biodiversity conservation by improving how people
                    understand wildlife, especially snakes and other misunderstood species.
                    Its mission combines awareness, ecological learning, field documentation,
                    and institutional collaboration.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <p className="section-label mb-3">Vision</p>
                  <h2 className="font-serif text-h2 text-earth-950">
                    A Bangladesh where people and wildlife can coexist through knowledge, responsibility, and ecological respect.
                  </h2>
                  <p className="mt-5 text-body text-earth-700">
                    DESCF envisions a society where wildlife is not treated only through fear
                    or conflict, but through awareness, conservation ethics, public education,
                    and informed community responses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Values"
              title="The values behind DESCF’s conservation work"
              description="These values should guide DESCF’s communication, programmes, partnerships, and public-facing materials."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {VALUES.map((value) => (
                <Card key={value.title}>
                  <CardContent>
                    <h3 className="font-serif text-2xl text-earth-950">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <p className="section-label mb-3">Strategic direction</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  DESCF should grow as a credible conservation communication institution.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  The next stage of DESCF should avoid scattered activities and instead build
                  a disciplined institutional portfolio: clear programmes, documented resources,
                  responsible media outputs, partnership records, and CMS-driven content that can
                  be maintained without developer dependency.
                </p>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Work with DESCF
                  </h3>
                  <p className="mt-3 text-body-sm text-earth-700">
                    Institutions, educators, researchers, media professionals, and conservation
                    partners can contact DESCF for collaboration.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/partner" variant="primary">
                      Partner with us
                    </Button>
                    <Button href={`mailto:${SITE.contactEmail}`} variant="secondary">
                      Email DESCF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}