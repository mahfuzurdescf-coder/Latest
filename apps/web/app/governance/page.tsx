import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Governance',
  description:
    'DESCF governance page outlining accountability, transparency, responsible communication, safeguarding, and institutional trust principles.',
  canonicalUrl: 'https://descf.org/governance',
})

const governanceJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Governance', url: 'https://descf.org/governance' },
])

const GOVERNANCE_AREAS = [
  {
    title: 'Transparency',
    description:
      'DESCF should clearly communicate its work, limitations, partnerships, and public-facing claims without exaggeration.',
  },
  {
    title: 'Responsible wildlife communication',
    description:
      'Wildlife content should avoid sensationalism and should not expose sensitive locations or encourage harmful interaction.',
  },
  {
    title: 'Programme accountability',
    description:
      'Programmes should be described with clear objectives, activities, status, and evidence where available.',
  },
  {
    title: 'Partnership integrity',
    description:
      'Partnerships should be practical, aligned with conservation goals, and not merely symbolic branding exercises.',
  },
  {
    title: 'Safeguarding and ethics',
    description:
      'Public activities, education, fieldwork, and communication should consider safety, consent, dignity, and responsible conduct.',
  },
  {
    title: 'CMS-based documentation',
    description:
      'The website and CMS should support better records for policies, governance documents, reports, and public resources.',
  },
]

const DOCUMENT_TYPES = [
  'Organisational policies',
  'Governance documents',
  'Annual or periodic reports',
  'Programme briefs',
  'Partnership records',
  'Responsible communication guidelines',
]

export default function GovernancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(governanceJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Governance</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Governance should make DESCF easier to trust.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                A credible conservation organisation needs more than good intentions. It needs
                transparent communication, responsible documentation, ethical practice, and
                clear institutional standards.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Governance principles"
              title="Trust is built through clarity, restraint, and accountability"
              description="DESCF should present governance as a practical system for responsible conservation work, not as decorative institutional language."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {GOVERNANCE_AREAS.map((area) => (
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
                <p className="section-label mb-3">Documentation</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Governance documents should eventually be CMS-managed.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  This page is prepared for a future governance document library. As DESCF’s
                  institutional system grows, policies, reports, programme documents, and
                  accountability materials should be added through Sanity CMS rather than hardcoded pages.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/reports" variant="primary">
                    View reports
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact DESCF
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Future document library
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {DOCUMENT_TYPES.map((item) => (
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

        <Section>
          <Container>
            <div className="rounded-3xl bg-forest-900 p-8 text-white md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="section-label mb-3 text-forest-300">
                    Governance contact
                  </p>
                  <h2 className="font-serif text-h3 text-white">
                    For governance, partnership, or institutional enquiries, contact DESCF directly.
                  </h2>
                  <p className="mt-4 text-body text-forest-100">
                    Keep enquiries specific and include your organisation, purpose, timeline,
                    and the nature of your request.
                  </p>
                </div>

                <Button
                  href={`mailto:${SITE.contactEmail}`}
                  variant="cta"
                >
                  Email DESCF
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}