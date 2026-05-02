import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ArticleCard, ResourceCard } from '@/components/cards'
import { PortableText } from '@/components/portable-text/PortableText'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  PROGRAMME_BY_SLUG_QUERY,
  PROGRAMME_SLUGS_QUERY,
} from '@/lib/sanity/queries'
import type {
  Programme,
  ProgrammeStatus,
  PostCard,
  ResourceCard as ResourceCardType,
} from '@/types/sanity'

interface Props {
  params: {
    slug: string
  }
}

const statusLabels: Record<ProgrammeStatus, string> = {
  current: 'Current',
  'in-preparation': 'In preparation',
  'in-development': 'In development',
  exploratory: 'Exploratory',
}

const statusDescriptions: Record<ProgrammeStatus, string> = {
  current: 'Active programme area',
  'in-preparation': 'Programme structure is ready for expansion',
  'in-development': 'Developing programme area',
  exploratory: 'Exploratory programme direction',
}

function programmeUrl(slug: string) {
  return `https://descf.org/programmes/${slug}`
}

function getProgrammeDescription(programme: Programme) {
  return (
    programme.seoDescription ||
    programme.shortDescription ||
    `DESCF programme profile: ${programme.title}.`
  )
}

function getStatusLabel(status?: ProgrammeStatus) {
  if (!status) return 'Programme'
  return statusLabels[status] ?? status
}

function getStatusDescription(status?: ProgrammeStatus) {
  if (!status) return 'Programme record'
  return statusDescriptions[status] ?? 'Programme record'
}

function hasPortableText(body?: Programme['body']) {
  return Array.isArray(body) && body.length > 0
}

export async function generateStaticParams() {
  const items = await sanityFetch<unknown[]>({
    query: PROGRAMME_SLUGS_QUERY,
    tags: ['programme'],
  })

  return items
    .map((item) => {
      if (typeof item === 'string') return { slug: item }
      if (
        item &&
        typeof item === 'object' &&
        'slug' in item &&
        typeof (item as { slug?: unknown }).slug === 'string'
      ) {
        return { slug: (item as { slug: string }).slug }
      }
      return null
    })
    .filter(Boolean) as Array<{ slug: string }>
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
      canonicalUrl: programmeUrl(params.slug),
    })
  }

  const ogImageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(1200).height(630).url()
    : undefined

  return buildMetadata({
    title: programme.seoTitle || programme.title,
    description: getProgrammeDescription(programme),
    canonicalUrl: programmeUrl(params.slug),
    ogImage: ogImageUrl,
  })
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const programme = await sanityFetch<Programme | null>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['programme'],
  })

  if (!programme) notFound()

  const imageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(1100).height(720).url()
    : null

  const relatedPosts = (programme.relatedPosts ?? []) as PostCard[]
  const relatedResources = (programme.relatedResources ?? []) as ResourceCardType[]
  const hasBody = hasPortableText(programme.body)
  const hasActivities =
    Array.isArray(programme.keyActivities) && programme.keyActivities.length > 0
  const hasMetrics =
    Array.isArray(programme.impactMetrics) && programme.impactMetrics.length > 0

  return (
    <main>
      <section className="border-b border-earth-200 bg-forest-950 text-white">
        <div className="container-site grid gap-12 py-20 md:grid-cols-[1fr_0.9fr] md:items-center lg:py-28">
          <div>
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-forest-100">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/programmes" className="hover:text-white">
                Programmes
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-bark-300">{programme.title}</span>
            </nav>

            <p className="section-label mb-4 text-bark-300">
              DESCF programme profile
            </p>

            <h1 className="max-w-4xl font-serif text-h1 text-white">
              {programme.title}
            </h1>

            {programme.shortDescription ? (
              <p className="mt-6 max-w-2xl text-body-lg text-forest-50">
                {programme.shortDescription}
              </p>
            ) : (
              <p className="mt-6 max-w-2xl text-body-lg text-forest-50">
                A DESCF programme profile for conservation awareness, public education,
                field-informed learning, and responsible communication.
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex rounded-full border border-bark-300/70 bg-bark-500/15 px-4 py-2 text-sm font-semibold text-bark-200">
                {getStatusLabel(programme.status)}
              </span>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Conservation communication
              </span>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                CMS-managed
              </span>
            </div>
          </div>

          <aside className="overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-3 shadow-card-lg backdrop-blur">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={programme.heroImage?.alt ?? programme.title}
                width={1100}
                height={720}
                priority
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-white/10 p-8 text-center">
                <div>
                  <p className="section-label mb-3 text-bark-300">Programme</p>
                  <p className="font-serif text-3xl text-white">{programme.title}</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-forest-200 bg-forest-50 p-6 shadow-sm">
            <p className="section-label mb-3">Status</p>
            <h2 className="font-serif text-2xl text-earth-950">
              {getStatusLabel(programme.status)}
            </h2>
            <p className="mt-2 text-body-sm text-earth-700">
              {getStatusDescription(programme.status)}
            </p>
          </article>

          <article className="rounded-2xl border border-earth-200 bg-earth-50 p-6 shadow-sm">
            <p className="section-label mb-3">Focus</p>
            <h2 className="font-serif text-2xl text-earth-950">
              Public conservation learning
            </h2>
            <p className="mt-2 text-body-sm text-earth-700">
              Designed for awareness, education, and responsible communication.
            </p>
          </article>

          <article className="rounded-2xl border border-earth-200 bg-earth-50 p-6 shadow-sm">
            <p className="section-label mb-3">Content</p>
            <h2 className="font-serif text-2xl text-earth-950">
              Sanity-managed
            </h2>
            <p className="mt-2 text-body-sm text-earth-700">
              Activities, resources, and related articles can grow from the CMS.
            </p>
          </article>

          <article className="rounded-2xl border border-bark-200 bg-bark-50 p-6 shadow-sm">
            <p className="section-label mb-3">Partnership</p>
            <h2 className="font-serif text-2xl text-earth-950">
              Collaboration-ready
            </h2>
            <p className="mt-2 text-body-sm text-earth-700">
              Built to support credible institutional collaboration.
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site grid gap-8 py-16 md:grid-cols-[minmax(0,1fr)_360px] md:py-20">
          <article className="rounded-3xl border border-earth-200 bg-white p-7 shadow-card md:p-10">
            <p className="section-label mb-4">Programme brief</p>

            {hasBody ? (
              <div className="prose prose-earth max-w-none">
                <PortableText value={programme.body ?? []} />
              </div>
            ) : (
              <>
                <h2 className="font-serif text-h2 text-earth-950">
                  A structured profile for this programme.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  This programme page is designed to carry objectives, activities, field
                  learning, outputs, related reading, and resources as the programme grows.
                  Add the full programme body in Sanity Studio to turn this into a complete
                  public programme profile.
                </p>
              </>
            )}
          </article>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
              <p className="section-label mb-3">Programme use</p>
              <h2 className="font-serif text-2xl text-earth-950">
                Designed for public clarity
              </h2>
              <p className="mt-3 text-body-sm text-earth-700">
                This page should help visitors understand what DESCF does, why it matters,
                and how the programme supports safer conservation awareness.
              </p>
            </div>

            <div className="rounded-3xl border border-bark-200 bg-bark-50 p-6 shadow-sm">
              <p className="section-label mb-3">Safety note</p>
              <p className="text-body-sm text-earth-800">
                DESCF programme content should support education and awareness. It should not
                encourage risky wildlife handling, catching, or disturbance.
              </p>
            </div>

            <Link
              href="/partner"
              className="inline-flex w-full items-center justify-center rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800"
            >
              Discuss collaboration
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="section-label mb-4">Key activities</p>
              <h2 className="font-serif text-h2 text-earth-950">
                What this programme can include
              </h2>

              {hasActivities ? (
                <div className="mt-8 grid gap-4">
                  {programme.keyActivities?.map((activity, index) => (
                    <article
                      key={`${activity}-${index}`}
                      className="rounded-2xl border border-earth-200 bg-earth-50 p-5"
                    >
                      <p className="text-label font-semibold uppercase tracking-[0.18em] text-forest-700">
                        Activity {index + 1}
                      </p>
                      <p className="mt-2 text-body text-earth-800">{activity}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid gap-4">
                  {[
                    'Awareness and education activities',
                    'Field-informed documentation and learning',
                    'Responsible conservation communication',
                    'Partnership and community-facing engagement',
                  ].map((activity, index) => (
                    <article
                      key={activity}
                      className="rounded-2xl border border-earth-200 bg-earth-50 p-5"
                    >
                      <p className="text-label font-semibold uppercase tracking-[0.18em] text-forest-700">
                        Programme area {index + 1}
                      </p>
                      <p className="mt-2 text-body text-earth-800">{activity}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="section-label mb-4">Evidence and outputs</p>
              <h2 className="font-serif text-h2 text-earth-950">
                Programme data should stay measurable.
              </h2>

              {hasMetrics ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {programme.impactMetrics?.map((metric) => (
                    <article
                      key={metric._key}
                      className="rounded-2xl border border-earth-200 bg-white p-5 shadow-sm"
                    >
                      <p className="font-serif text-4xl text-earth-950">{metric.value}</p>
                      <h3 className="mt-2 text-sm font-semibold text-forest-800">
                        {metric.label}
                      </h3>
                      {metric.description ? (
                        <p className="mt-2 text-body-sm text-earth-700">
                          {metric.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-3xl border border-earth-200 bg-earth-50 p-7">
                  <h3 className="font-serif text-2xl text-earth-950">
                    Add metrics when they are verified.
                  </h3>
                  <p className="mt-3 text-body-sm text-earth-700">
                    Programme outputs should be added only when DESCF can verify them. This
                    protects credibility and avoids inflated impact claims.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 || relatedResources.length > 0 ? (
        <section className="border-b border-earth-200 bg-earth-50">
          <div className="container-site grid gap-12 py-16 md:py-20">
            {relatedPosts.length > 0 ? (
              <div>
                <p className="section-label mb-4">Related reading</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Stories and updates connected to this programme
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <ArticleCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ) : null}

            {relatedResources.length > 0 ? (
              <div>
                <p className="section-label mb-4">Resources</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  Documents and materials
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {relatedResources.map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="rounded-3xl bg-forest-950 p-8 text-white shadow-card-lg md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="section-label mb-4 text-bark-300">Next step</p>
                <h2 className="max-w-3xl font-serif text-h2 text-white">
                  Work with DESCF on credible conservation communication.
                </h2>
                <p className="mt-4 max-w-2xl text-body text-forest-50">
                  Contact DESCF to discuss programme collaboration, awareness work, public
                  education, research communication, or responsible media engagement.
                </p>
              </div>

              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-forest-950 transition hover:bg-earth-100"
              >
                Partner with DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}