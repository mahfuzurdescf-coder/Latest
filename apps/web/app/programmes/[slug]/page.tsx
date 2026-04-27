import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMME_BY_SLUG_QUERY, PROGRAMME_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@/components/portable-text/PortableText'
import { ArticleCard, ResourceCard } from '@/components/cards'
import { StatusBadge, Breadcrumbs, PartnerCTA } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/image'
import type { Programme } from '@/types/sanity'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: PROGRAMME_SLUGS_QUERY, tags: ['programme'] })
  return (slugs ?? []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programme = await sanityFetch<Programme>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['programme'],
  })
  if (!programme) return { title: 'Programme not found' }
  return {
    title: programme.seoTitle ?? programme.title,
    description: programme.seoDescription ?? programme.shortDescription,
  }
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const programme = await sanityFetch<Programme>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['programme'],
  })

  if (!programme) notFound()

  const heroUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(1400).height(560).url()
    : null

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-950 text-forest-50">
        {heroUrl && (
          <div className="absolute inset-0">
            <Image src={heroUrl} alt={programme.heroImage?.alt ?? programme.title} fill className="object-cover opacity-30" sizes="100vw" priority />
          </div>
        )}
        <div className="relative container-site py-20 md:py-28">
          <Breadcrumbs items={[{ label: 'Programmes', href: '/programmes' }, { label: programme.title }]} className="mb-6 text-forest-400" />
          <StatusBadge status={programme.status} className="mb-4" />
          <h1 className="text-display-md font-serif text-forest-50 mb-4 max-w-prose">{programme.title}</h1>
          {programme.shortDescription && (
            <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">{programme.shortDescription}</p>
          )}
        </div>
      </section>

      <div className="container-site section-padding">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {programme.body && <PortableText value={programme.body} />}

            {programme.keyActivities && programme.keyActivities.length > 0 && (
              <div className="mt-10">
                <h2 className="text-h3 font-serif text-earth-900 mb-5">Key activities</h2>
                <ul className="space-y-3">
                  {programme.keyActivities.map((activity, i) => (
                    <li key={i} className="flex gap-3 text-body text-earth-700">
                      <span className="text-forest-500 mt-1 flex-shrink-0">▸</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {programme.relatedPosts && programme.relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-h3 font-serif text-earth-900 mb-6">Related articles</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {programme.relatedPosts.map((post) => (
                    <ArticleCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {programme.impactMetrics && programme.impactMetrics.length > 0 && (
              <div className="bg-earth-50 rounded-xl border border-earth-200 p-6">
                <p className="section-label text-earth-500 mb-5">Programme metrics</p>
                <div className="space-y-4">
                  {programme.impactMetrics.map((metric) => (
                    <div key={metric._key}>
                      <p className="text-3xl font-serif font-medium text-forest-800">{metric.value}</p>
                      <p className="text-body-sm font-medium text-earth-700">{metric.label}</p>
                      {metric.description && <p className="text-caption text-earth-500 mt-0.5">{metric.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {programme.relatedResources && programme.relatedResources.length > 0 && (
              <div>
                <p className="section-label text-earth-500 mb-4">Related resources</p>
                <div className="space-y-3">
                  {programme.relatedResources.map((r) => <ResourceCard key={r._id} resource={r} />)}
                </div>
              </div>
            )}

            <PartnerCTA className="text-sm" />
          </aside>
        </div>
      </div>
    </>
  )
}
