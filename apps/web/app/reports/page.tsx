import type { Metadata } from 'next'

import { ResourceCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { RESOURCES_PAGE_QUERY } from '@/lib/sanity/queries'
import type { ResourceCard as ResourceCardType } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Reports and Publications',
  description:
    'DESCF reports, briefs, publications, and conservation resources related to biodiversity, awareness, and human-wildlife coexistence.',
  canonicalUrl: 'https://descf.org/reports',
})

const reportsJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Reports and Publications', url: 'https://descf.org/reports' },
])

export default async function ReportsPage() {
  const resources = await sanityFetch<ResourceCardType[]>({
    query: RESOURCES_PAGE_QUERY,
    tags: ['resource'],
  })

  const reports = resources.filter((resource) => resource.type === 'report')
  const briefs = resources.filter(
    (resource) => resource.type === 'brief' || resource.type === 'concept-note',
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportsJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Reports</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Reports, briefs, and publications
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                This section is prepared for DESCF reports, briefs, concept notes,
                and conservation publications. Published resources are managed through
                Sanity CMS.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Published reports"
              title="Evidence and institutional documentation"
              description="Reports should support transparency, learning, programme communication, and responsible public knowledge."
            />

            {reports.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {reports.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No reports published yet"
                description="DESCF reports will appear here after they are added and published in Sanity CMS."
                actionLabel="View all resources"
                actionHref="/evidence-resources"
              />
            )}
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="section-label mb-3">Briefs and concept notes</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Short-form documents help explain DESCF’s work clearly.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  Briefs and concept notes can be used for programme explanation,
                  partnership discussion, awareness activities, and institutional communication.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/evidence-resources" variant="primary">
                    All resources
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Request information
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Available short documents
                  </h3>

                  {briefs.length > 0 ? (
                    <div className="mt-5 space-y-4">
                      {briefs.slice(0, 4).map((resource) => (
                        <ResourceCard key={resource._id} resource={resource} />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-body-sm text-earth-700">
                      No briefs or concept notes have been published yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}