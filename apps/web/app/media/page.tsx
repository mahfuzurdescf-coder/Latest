import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Media',
  description:
    'Media information for DESCF, including conservation communication, interviews, public awareness, and responsible wildlife storytelling enquiries.',
  canonicalUrl: 'https://descf.org/media',
})

const mediaJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Media', url: 'https://descf.org/media' },
])

const MEDIA_AREAS = [
  {
    title: 'Interviews and expert comments',
    description:
      'Media teams may contact DESCF for responsible commentary on snake awareness, biodiversity, conservation communication, and human-wildlife coexistence.',
  },
  {
    title: 'Conservation storytelling',
    description:
      'DESCF supports ethical storytelling that informs the public without sensationalising wildlife or encouraging risky interaction.',
  },
  {
    title: 'Public awareness campaigns',
    description:
      'Media collaboration can support awareness around snakes, biodiversity protection, coexistence, and responsible ecological behaviour.',
  },
  {
    title: 'Field communication guidance',
    description:
      'Wildlife-related media work should avoid exposing sensitive locations, disturbing animals, or creating misleading public narratives.',
  },
]

const MEDIA_GUIDELINES = [
  'Avoid sensational language about snakes or wildlife',
  'Do not reveal sensitive wildlife locations',
  'Do not encourage unsafe handling or interaction with wildlife',
  'Credit DESCF properly when using organisational information',
  'Contact DESCF before publishing field-sensitive material',
]

export default function MediaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Media</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Media and conservation communication
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF welcomes responsible media enquiries related to biodiversity,
                snake conservation, ecological awareness, field documentation, and
                human-wildlife coexistence in Bangladesh.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Media collaboration"
              title="Wildlife communication should inform, not sensationalise"
              description="DESCF’s media engagement should help the public understand wildlife more responsibly, especially species that are often misunderstood or feared."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {MEDIA_AREAS.map((area) => (
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
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="section-label mb-3">Media guidance</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Responsible wildlife media requires ethical restraint.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  Conservation media should not create fear, expose sensitive habitats,
                  or turn wildlife into spectacle. DESCF encourages careful, factual,
                  and conservation-oriented communication.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={`mailto:${SITE.contactEmail}`} variant="primary">
                    Media enquiry
                  </Button>
                  <Button href="/newsroom" variant="secondary">
                    Visit newsroom
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Basic guidelines
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {MEDIA_GUIDELINES.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}