import type { Metadata } from 'next'

import { ProgrammeCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Programmes',
  description:
    'DESCF programmes in snake conservation awareness, biodiversity documentation, conservation communication, and human-wildlife coexistence.',
  canonicalUrl: 'https://descf.org/programmes',
})

const programmesJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Programmes', url: 'https://descf.org/programmes' },
])

export default async function ProgrammesPage() {
  const programmes = await sanityFetch<ProgrammeCardType[]>({
    query: PROGRAMMES_PAGE_QUERY,
    tags: ['programme'],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programmesJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Programmes</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Conservation programmes with clear institutional purpose
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF programmes connect awareness, biodiversity learning, responsible field
                documentation, and human-wildlife coexistence communication.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Programme portfolio"
                title="Published DESCF programmes"
                description="Programme information is managed through Sanity CMS and should stay clear, restrained, and evidence-oriented."
                className="mb-0"
              />

              <Button href="/partner" variant="secondary">
                Partner with DESCF
              </Button>
            </div>

            <div className="mt-10">
              {programmes.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {programmes.map((programme) => (
                    <ProgrammeCard key={programme._id} programme={programme} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Programme information is being prepared"
                  description="Published programme pages will appear here after they are added in Sanity CMS."
                  actionLabel="Contact DESCF"
                  actionHref="/contact"
                />
              )}
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}