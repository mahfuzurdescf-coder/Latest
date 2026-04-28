import type { Metadata } from 'next'

import { ResourceCard } from '@/components/cards'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { RESOURCES_PAGE_QUERY } from '@/lib/sanity/queries'
import type { ResourceCard as ResourceCardType, ResourceType } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Evidence and Resources',
  description:
    'DESCF evidence, resources, reports, briefs, presentations, media references, field notes, and governance materials.',
  canonicalUrl: 'https://descf.org/evidence-resources',
})

const resourcesJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Evidence and Resources', url: 'https://descf.org/evidence-resources' },
])

const RESOURCE_GROUPS: {
  type: ResourceType
  title: string
  description: string
}[] = [
  {
    type: 'report',
    title: 'Reports',
    description: 'Formal reports and institutional documents.',
  },
  {
    type: 'brief',
    title: 'Briefs',
    description: 'Short documents for communication, planning, and awareness.',
  },
  {
    type: 'concept-note',
    title: 'Concept notes',
    description: 'Early-stage project and programme concept documents.',
  },
  {
    type: 'presentation',
    title: 'Presentations',
    description: 'Slide decks and presentation materials.',
  },
  {
    type: 'field-note',
    title: 'Field notes',
    description: 'Field-based learning and documentation resources.',
  },
  {
    type: 'media-reference',
    title: 'Media references',
    description: 'Media-facing references and communication materials.',
  },
  {
    type: 'governance',
    title: 'Governance',
    description: 'Policies, governance notes, and accountability documents.',
  },
]

function getResourcesByType(resources: ResourceCardType[], type: ResourceType) {
  return resources.filter((resource) => resource.type === type)
}

export default async function EvidenceResourcesPage() {
  const resources = await sanityFetch<ResourceCardType[]>({
    query: RESOURCES_PAGE_QUERY,
    tags: ['resource'],
  })

  const hasResources = resources.length > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Evidence and resources</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Resources for conservation learning and institutional communication
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF resources can include reports, briefs, presentations, field notes,
                governance materials, and media references. These resources are managed
                through Sanity CMS.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Resource library"
              title="A structured resource system"
              description="A strong conservation website should make important documents easy to find, understand, and reuse responsibly."
            />

            {hasResources ? (
              <div className="grid gap-5 md:grid-cols-2">
                {resources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No resources published yet"
                description="Published DESCF resources will appear here after they are added in Sanity CMS."
                actionLabel="Contact DESCF"
                actionHref="/contact"
              />
            )}
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Resource categories"
              title="Resource types prepared for future growth"
              description="These categories allow DESCF to grow the resource library without redesigning the website."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {RESOURCE_GROUPS.map((group) => {
                const groupedResources = getResourcesByType(resources, group.type)

                return (
                  <Card key={group.type}>
                    <CardContent>
                      <h2 className="font-serif text-2xl text-earth-950">
                        {group.title}
                      </h2>
                      <p className="mt-3 text-body-sm text-earth-700">
                        {group.description}
                      </p>
                      <p className="mt-4 text-label uppercase tracking-widest text-forest-700">
                        {groupedResources.length} item{groupedResources.length === 1 ? '' : 's'}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}