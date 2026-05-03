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
  title: 'সহায়তা DESCF',
  description:
    'সহায়তা DESCF’s conservation, public awareness, research communication, and human-wildlife coexistence work in Bangladesh.',
  canonicalUrl: 'https://descf.org/donate',
})

const donateJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'সহায়তা DESCF', url: 'https://descf.org/donate' },
])

const SUPPORT_AREAS = [
  {
    title: 'Public awareness',
    description:
      'সহায়তা educational communication that helps reduce fear, misinformation, and harmful responses toward snakes and wildlife.',
  },
  {
    title: 'Field documentation',
    description:
      'সহায়তা conservation documentation, ecological learning, and responsible communication from field-based work.',
  },
  {
    title: 'Conservation storytelling',
    description:
      'সহায়তা accessible nature communication that connects science, culture, and community awareness.',
  },
  {
    title: 'Institutional capacity',
    description:
      'সহায়তা tools, materials, and organisational capacity needed for sustained conservation action.',
  },
]

export default function DonatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">সহায়তা</p>
              <h1 className="font-serif text-h1 text-earth-950">
                সহায়তা conservation work with DESCF
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF welcomes support from individuals, institutions, researchers,
                media organisations, and conservation partners who want to strengthen
                biodiversity protection, awareness, and coexistence work in Bangladesh.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <SectionHeader
                  eyebrow="সহায়তা কেন গুরুত্বপূর্ণ"
                  title="Conservation needs long-term trust, communication, and field learning"
                  description="সহায়তা can help DESCF continue responsible awareness, documentation, and conservation communication without overclaiming impact or making unverifiable promises."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  {SUPPORT_AREAS.map((area) => (
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

              <Card className="self-start">
                <CardContent className="p-8">
                  <h2 className="font-serif text-h3 text-earth-950">
                    কীভাবে সহায়তা করবেন
                  </h2>

                  <p className="mt-4 text-body text-earth-700">
                    A live online donation gateway is not configured on this website yet.
                    Please contact DESCF directly for the current and appropriate support
                    process.
                  </p>

                  <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5">
                    <p className="text-label uppercase tracking-widest text-bark-700">
                      Contact first
                    </p>
                    <p className="mt-2 text-body-sm text-earth-700">
                      Email DESCF to discuss donation, sponsorship, institutional support,
                      or in-kind collaboration.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`mailto:${SITE.contactEmail}`} variant="primary">
                      Email DESCF
                    </Button>
                    <Button href="/partner" variant="secondary">
                      আমাদের সঙ্গে যুক্ত হোন
                    </Button>
                  </div>

                  <p className="mt-6 text-caption text-earth-500">
                    DESCF should confirm official payment details directly. Do not rely on
                    unofficial payment instructions shared outside verified DESCF channels.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        <section className="bg-forest-900 text-white">
          <Container className="py-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label mb-3 text-forest-300">
                  দায়িত্বশীল সহায়তা
                </p>
                <h2 className="font-serif text-h3 text-white">
                  সহায়তা should strengthen conservation capacity, not create empty publicity.
                </h2>
              </div>

              <Link
                href="/contact"
                className="inline-flex justify-center rounded-lg border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-50 transition-colors hover:bg-forest-800"
              >
                ডিইএসসিএফের সঙ্গে যোগাযোগ করুন
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}