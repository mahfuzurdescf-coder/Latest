import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ArticleCard, ResourceCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PortableText } from '@/components/portable-text/PortableText'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { PROGRAMME_BY_SLUG_QUERY, PROGRAMME_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { Programme } from '@/types/sanity'

interface Props {
  params: {
    slug: string
  }
}

function getStatusLabel(status: string): string {
  return status
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getProgrammeUrl(slug: string): string {
  return `https://descf.org/programmes/${slug}`
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: PROGRAMME_SLUGS_QUERY,
    tags: ['programme'],
  })

  return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programme = await sanityFetch<Programme | null>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['programme'],
  })

  if (!programme) {
    return buildMetadata({
      title: 'Programme not found',
      description: 'The requested DESCF programme could not be found.',
      canonicalUrl: getProgrammeUrl(params.slug),
    })
  }

  const ogImageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(1200).height(630).url()
    : undefined

  return buildMetadata({
    title: programme.seoTitle || programme.title,
    description:
      programme.seoDescription ||
      programme.shortDescription ||
      `DESCF programme: ${programme.title}.`,
    ogImage: ogImageUrl,
    canonicalUrl: getProgrammeUrl(params.slug),
  })
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const programme = await sanityFetch<Programme | null>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['programme', 'post', 'resource'],
  })

  if (!programme) notFound()

  const heroImageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(1600).height(900).url()
    : null

  const programmeUrl = getProgrammeUrl(params.slug)
  const breadcrumbJsonLd = buildBreadcrumbJSONLD([
    { name: 'Home', url: 'https://descf.org' },
    { name: 'Programmes', url: 'https://descf.org/programmes' },
    { name: programme.title, url: programmeUrl },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-earth-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-forest-800">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/programmes" className="hover:text-forest-800">
                    Programmes
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-earth-700" aria-current="page">
                  {programme.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <div className="mb-5">
                <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-sm font-medium text-forest-800">
                  {getStatusLabel(programme.status)}
                </span>
              </div>

              <h1 className="font-serif text-h1 text-earth-950">
                {programme.title}
              </h1>

              {programme.shortDescription && (
                <p className="mt-5 max-w-3xl text-body-lg text-earth-700">
                  {programme.shortDescription}
                </p>
              )}
            </div>
          </Container>
        </section>

        {heroImageUrl && (
          <div className="container-site pt-10">
            <figure className="overflow-hidden rounded-3xl border border-earth-200 bg-white">
              <Image
                src={heroImageUrl}
                alt={programme.heroImage?.alt ?? programme.title}
                width={1600}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
              {(programme.heroImage?.caption || programme.heroImage?.alt) && (
                <figcaption className="border-t border-earth-100 px-5 py-3 text-sm text-earth-500">
                  {programme.heroImage.caption || programme.heroImage.alt}
                </figcaption>
              )}
            </figure>
          </div>
        )}

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div className="max-w-3xl">
                {programme.body && programme.body.length > 0 ? (
                  <div className="prose prose-earth max-w-none">
                    <PortableText value={programme.body} />
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8">
                      <h2 className="font-serif text-2xl text-earth-950">
                        Programme details are being prepared
                      </h2>
                      <p className="mt-3 text-body text-earth-700">
                        Full programme information will appear here after it is added in Sanity CMS.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <aside className="space-y-6">
                {programme.impactMetrics && programme.impactMetrics.length > 0 && (
                  <Card>
                    <CardContent>
                      <h2 className="font-serif text-2xl text-earth-950">
                        Programme indicators
                      </h2>
                      <div className="mt-5 space-y-5">
                        {programme.impactMetrics.map((metric) => (
                          <div key={metric._key}>
                            <p className="font-serif text-3xl text-forest-800">
                              {metric.value}
                            </p>
                            <p className="mt-1 font-medium text-earth-900">
                              {metric.label}
                            </p>
                            {metric.description && (
                              <p className="mt-1 text-body-sm text-earth-600">
                                {metric.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {programme.keyActivities && programme.keyActivities.length > 0 && (
                  <Card>
                    <CardContent>
                      <h2 className="font-serif text-2xl text-earth-950">
                        Key activities
                      </h2>
                      <ul className="mt-5 space-y-3">
                        {programme.keyActivities.map((activity) => (
                          <li key={activity} className="flex gap-3 text-body-sm text-earth-700">
                            <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      Work with DESCF
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      Contact DESCF to discuss programme collaboration, awareness work,
                      research communication, or institutional partnership.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href="/partner" variant="primary">
                        Partner
                      </Button>
                      <Button href="/contact" variant="secondary">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>

        {programme.relatedPosts && programme.relatedPosts.length > 0 && (
          <section className="bg-earth-100/70">
            <Container className="py-16 md:py-20">
              <div className="mb-8">
                <p className="section-label mb-3">Related reading</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Articles related to this programme
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programme.relatedPosts.map((post) => (
                  <ArticleCard key={post._id} post={post} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {programme.relatedResources && programme.relatedResources.length > 0 && (
          <Section>
            <Container>
              <div className="mb-8">
                <p className="section-label mb-3">Resources</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Programme resources
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {programme.relatedResources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
    </>
  )
}