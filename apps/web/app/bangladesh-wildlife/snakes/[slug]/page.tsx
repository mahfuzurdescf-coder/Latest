import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  snakeSpeciesQuery,
  speciesProfileBySlugQuery,
} from '@/lib/sanity/queries'
import type {
  ProkritiKothaArticleCard,
  SpeciesProfile,
  SpeciesProfileCard,
} from '@/types/sanity'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

function formatVenomStatus(status?: string): string {
  const labels: Record<string, string> = {
    'non-venomous': 'Non-venomous',
    'mildly-venomous': 'Mildly venomous',
    venomous: 'Venomous',
    'highly-venomous': 'Highly venomous',
    unknown: 'Unknown / needs verification',
  }

  return status ? labels[status] || status : 'Unknown'
}

function formatMedicalImportance(status?: string): string {
  const labels: Record<string, string> = {
    'medically-important': 'Medically important',
    'not-medically-important': 'Not medically important',
    uncertain: 'Uncertain / needs verification',
  }

  return status ? labels[status] || status : 'Not specified'
}

function getCanonicalUrl(slug: string): string {
  return `https://descf.org/bangladesh-wildlife/snakes/${slug}`
}

function getSpeciesDescription(species: SpeciesProfile): string {
  return (
    species.seoDescription ||
    species.shortDescription ||
    `${species.englishName} (${species.scientificName}) species profile from DESCF Bangladesh wildlife field guide.`
  )
}

function InfoCard({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value?: string
  tone?: 'default' | 'forest' | 'amber'
}) {
  const toneClass =
    tone === 'forest'
      ? 'border-forest-200 bg-forest-50'
      : tone === 'amber'
        ? 'border-amber-200 bg-amber-50'
        : 'border-earth-200 bg-white'

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-earth-500">
        {label}
      </dt>
      <dd className="mt-2 font-serif text-xl leading-tight text-earth-900">
        {value || 'Not specified'}
      </dd>
    </div>
  )
}

function ContentSection({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow?: string
  children?: string
}) {
  if (!children) return null

  return (
    <section className="rounded-3xl border border-earth-200 bg-white p-7 shadow-sm">
      {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-3xl leading-tight text-earth-900">
        {title}
      </h2>
      <p className="mt-5 whitespace-pre-line text-body leading-8 text-earth-700">
        {children}
      </p>
    </section>
  )
}

function RelatedArticleCard({ article }: { article: ProkritiKothaArticleCard }) {
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(720).height(480).url()
    : null

  return (
    <article className="group overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={`/prokriti-kotha/${article.slug.current}`} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-forest-50 px-6 text-center">
            <span className="font-serif text-2xl text-forest-800">
              প্রকৃতি কথা
            </span>
          </div>
        )}

        <div className="p-5">
          <p className="section-label mb-2">Related reading</p>
          <h3 className="font-serif text-xl leading-tight text-earth-900 group-hover:text-forest-900">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-earth-600">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

function SimilarSpeciesCard({ species }: { species: SpeciesProfileCard }) {
  const imageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(720).height(480).url()
    : null

  return (
    <article className="group overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={`/bangladesh-wildlife/snakes/${species.slug.current}`} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={species.primaryImage?.alt || species.englishName}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-forest-50 px-6 text-center">
            <span className="font-serif text-2xl text-forest-800">
              {species.banglaName || species.englishName}
            </span>
          </div>
        )}

        <div className="p-5">
          <p className="text-sm font-medium text-forest-800">
            {species.banglaName}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-tight text-earth-900 group-hover:text-forest-900">
            {species.englishName}
          </h3>
          <p className="mt-1 text-sm italic text-earth-500">
            {species.scientificName}
          </p>
        </div>
      </Link>
    </article>
  )
}

export async function generateStaticParams() {
  const species = await sanityFetch<SpeciesProfileCard[]>({
    query: snakeSpeciesQuery,
    tags: ['speciesProfile', 'wildlifeGroup'],
  })

  return (species ?? [])
    .map((item) => item.slug?.current)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const species = await sanityFetch<SpeciesProfile | null>({
    query: speciesProfileBySlugQuery,
    params: { slug: params.slug },
    tags: ['speciesProfile', 'wildlifeGroup'],
  })

  if (!species || species.group?.slug?.current !== 'snakes') {
    return buildMetadata({
      title: 'Snake species not found',
      description: 'The requested snake species profile could not be found.',
      canonicalUrl: getCanonicalUrl(params.slug),
    })
  }

  const ogImageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(1200).height(630).url()
    : undefined

  return buildMetadata({
    title: species.seoTitle || `${species.englishName} | বাংলাদেশের সাপ`,
    description: getSpeciesDescription(species),
    ogImage: ogImageUrl,
    canonicalUrl: getCanonicalUrl(params.slug),
  })
}

export default async function SnakeSpeciesDetailPage({ params }: Props) {
  const species = await sanityFetch<SpeciesProfile | null>({
    query: speciesProfileBySlugQuery,
    params: { slug: params.slug },
    tags: ['speciesProfile', 'wildlifeGroup'],
  })

  if (!species || species.group?.slug?.current !== 'snakes') notFound()

  const primaryImageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(1600).height(1100).url()
    : null

  const galleryImages = (species.images ?? [])
    .map((image) => ({
      image,
      url: urlForImage(image)?.width(900).height(650).url(),
    }))
    .filter((item) => item.url)

  const localNames = species.localNames?.filter(Boolean) ?? []
  const zones = species.zones?.filter((zone) => zone.title) ?? []
  const districts = species.districts?.filter((district) => district.title) ?? []
  const references = species.sourceReferences?.filter((reference) => reference.title) ?? []
  const relatedArticles =
    species.relatedProkritiKothaArticles?.filter((article) => article.slug?.current) ?? []
  const similarSpecies =
    species.similarSpecies?.filter((item) => item.slug?.current) ?? []

  return (
    <main id="main-content">
      <article>
        <header className="border-b border-earth-200 bg-gradient-to-br from-earth-50 via-white to-forest-50">
          <div className="container-site section-padding-sm">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-earth-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-forest-800">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife" className="hover:text-forest-800">
                    Bangladesh Wildlife
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife/snakes" className="hover:text-forest-800">
                    Snakes
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-earth-700" aria-current="page">
                  {species.englishName}
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
              <div>
                <p className="section-label mb-5">বাংলাদেশের সাপ · Species profile</p>

                <p className="text-2xl font-medium text-forest-800">
                  {species.banglaName}
                </p>

                <h1 className="mt-3 font-serif text-h1 leading-tight text-earth-900">
                  {species.englishName}
                </h1>

                <p className="mt-4 text-2xl italic text-earth-600">
                  {species.scientificName}
                </p>

                {localNames.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {localNames.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-earth-200 bg-white px-3 py-1 text-sm text-earth-700"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}

                {species.shortDescription && (
                  <p className="mt-7 max-w-3xl text-lg leading-8 text-earth-700">
                    {species.shortDescription}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-full border border-forest-200 bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
                    {formatVenomStatus(species.venomStatus)}
                  </span>

                  {species.medicalImportance && (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-earth-800">
                      {formatMedicalImportance(species.medicalImportance)}
                    </span>
                  )}

                  {species.iucnGlobalStatus && (
                    <span className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700">
                      Global IUCN: {species.iucnGlobalStatus}
                    </span>
                  )}

                  {species.bangladeshStatus && (
                    <span className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700">
                      Bangladesh: {species.bangladeshStatus}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {primaryImageUrl ? (
                  <figure className="overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-lg">
                    <div className="relative aspect-[4/3] bg-earth-100">
                      <Image
                        src={primaryImageUrl}
                        alt={species.primaryImage?.alt || species.englishName}
                        fill
                        priority
                        sizes="(min-width: 1024px) 420px, 100vw"
                        className="object-cover"
                      />
                    </div>

                    {(species.primaryImage?.caption || species.primaryImage?.credit) && (
                      <figcaption className="border-t border-earth-100 px-5 py-3 text-sm text-earth-500">
                        {species.primaryImage.caption}
                        {species.primaryImage.caption && species.primaryImage.credit ? ' — ' : ''}
                        {species.primaryImage.credit}
                      </figcaption>
                    )}
                  </figure>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-earth-200 bg-forest-50 px-8 text-center shadow-sm">
                    <span className="font-serif text-3xl text-forest-800">
                      {species.banglaName || species.englishName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="bg-white">
          <div className="container-site section-padding-sm">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                label="Venom status"
                value={formatVenomStatus(species.venomStatus)}
                tone="forest"
              />
              <InfoCard
                label="Medical importance"
                value={formatMedicalImportance(species.medicalImportance)}
                tone="amber"
              />
              <InfoCard label="Family" value={species.family} />
              <InfoCard label="Order" value={species.order} />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="Global IUCN" value={species.iucnGlobalStatus} />
              <InfoCard label="Bangladesh status" value={species.bangladeshStatus} />
              <InfoCard
                label="Known zones"
                value={zones.length > 0 ? zones.map((zone) => zone.title).join(', ') : undefined}
              />
              <InfoCard
                label="Known districts"
                value={
                  districts.length > 0
                    ? `${districts.length} district${districts.length > 1 ? 's' : ''}`
                    : undefined
                }
              />
            </div>

            {species.statusSource && (
              <p className="mt-4 text-sm leading-6 text-earth-500">
                Status source note: {species.statusSource}
              </p>
            )}
          </div>
        </section>

        <section className="border-y border-earth-200 bg-amber-50">
          <div className="container-site py-8">
            <div className="max-w-4xl">
              <p className="section-label mb-3">Public safety note</p>
              <h2 className="font-serif text-3xl text-earth-900">
                Observe from a safe distance
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                This page is for education, conservation awareness, and field
                identification support. It is not a snake handling, catching, or
                rescue manual. If a snake is found near people, keep distance and
                contact trained rescuers or relevant authorities.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-earth-50">
          <div className="container-site section-padding-sm">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <ContentSection
                  eyebrow="Field identification"
                  title="Identification"
                  children={species.identification}
                />
                <ContentSection
                  eyebrow="Morphology"
                  title="Scale and body description"
                  children={species.scaleDescription}
                />
                <ContentSection
                  eyebrow="Natural history"
                  title="Behaviour"
                  children={species.behaviour}
                />
                <ContentSection
                  eyebrow="Habitat"
                  title="Habitat"
                  children={species.habitat}
                />
                <ContentSection
                  eyebrow="Ecology"
                  title="Diet"
                  children={species.diet}
                />
                <ContentSection
                  eyebrow="Range"
                  title="Distribution"
                  children={species.distributionText}
                />
                <ContentSection
                  eyebrow="Conservation value"
                  title="Ecological role"
                  children={species.ecologicalRole}
                />
                <ContentSection
                  eyebrow="Public awareness"
                  title="Myths and facts"
                  children={species.mythsAndFacts}
                />
                <ContentSection
                  eyebrow="Safety"
                  title="Species-specific safety note"
                  children={species.safetyNote}
                />
              </div>

              <aside className="space-y-6">
                {districts.length > 0 && (
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                    <p className="section-label mb-3">Distribution</p>
                    <h2 className="font-serif text-2xl text-earth-900">
                      Known districts
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {districts.map((district) => (
                        <span
                          key={district._id}
                          className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-sm text-earth-700"
                        >
                          {district.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {zones.length > 0 && (
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                    <p className="section-label mb-3">Landscape</p>
                    <h2 className="font-serif text-2xl text-earth-900">
                      Wildlife zones
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {zones.map((zone) => (
                        <span
                          key={zone._id}
                          className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-sm text-forest-800"
                        >
                          {zone.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {species.reviewedBy && (
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                    <p className="section-label mb-3">Review</p>
                    <h2 className="font-serif text-2xl text-earth-900">
                      Reviewed record
                    </h2>
                    <p className="mt-3 text-body text-earth-700">
                      Reviewed by {species.reviewedBy}
                    </p>
                  </div>
                )}

                <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                  <p className="section-label mb-3">Data caution</p>
                  <h2 className="font-serif text-2xl text-earth-900">
                    Location privacy
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-earth-600">
                    Exact occurrence locations may be withheld or generalized to
                    protect sensitive species, habitats, and local communities.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Gallery</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  Images for visual reference
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map(({ image, url }) => (
                  <figure
                    key={image.asset?._id || image.alt || url}
                    className="overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-earth-100">
                      <Image
                        src={url as string}
                        alt={image.alt || species.englishName}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    {(image.caption || image.credit) && (
                      <figcaption className="border-t border-earth-100 px-4 py-3 text-sm text-earth-500">
                        {image.caption}
                        {image.caption && image.credit ? ' — ' : ''}
                        {image.credit}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <section className="border-t border-earth-200 bg-earth-50">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Related reading</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  Prokriti Kotha articles about this species
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <RelatedArticleCard key={article._id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {similarSpecies.length > 0 && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Similar species</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  Compare carefully
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similarSpecies.map((item) => (
                  <SimilarSpeciesCard key={item._id} species={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {references.length > 0 && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site section-padding-sm">
              <div className="mb-8">
                <p className="section-label mb-3">Sources</p>
                <h2 className="font-serif text-h2 text-earth-900">
                  References
                </h2>
              </div>

              <div className="space-y-4">
                {references.map((reference) => (
                  <div
                    key={reference._key || reference.title}
                    className="rounded-2xl border border-earth-200 bg-earth-50 p-5"
                  >
                    <h3 className="font-medium text-earth-900">
                      {reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-forest-800 hover:text-forest-900"
                        >
                          {reference.title}
                        </a>
                      ) : (
                        reference.title
                      )}
                    </h3>

                    {reference.note && (
                      <p className="mt-2 text-sm leading-6 text-earth-600">
                        {reference.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
