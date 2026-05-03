import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ShareButtons } from '@/components/share/ShareButtons'
import { SpeciesDistributionMap } from '@/components/wildlife/SpeciesDistributionMap'
import { SpeciesImageGallery, type SpeciesGalleryImage } from '@/components/wildlife/SpeciesImageGallery'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  snakeSpeciesQuery,
  speciesProfileBySlugQuery,
} from '@/lib/sanity/queries'
import type {
  ProkritiKothaArticleCard,
  SanityImage,
  SpeciesProfile,
  SpeciesProfileCard,
} from '@/types/sanity'

const BD_SNAKES = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09be\u09aa'

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
    unknown: 'অজানা / যাচাই প্রয়োজন',
  }

  return status ? labels[status] || status : 'Unknown'
}

function formatMedicalImportance(status?: string): string {
  const labels: Record<string, string> = {
    'medically-important': 'Medically important',
    'not-medically-important': 'Not medically important',
    uncertain: 'অনিশ্চিত / যাচাই প্রয়োজন',
  }

  return status ? labels[status] || status : 'Not specified'
}

function getCanonicalUrl(slug: string): string {
  return 'https://descf.org/bangladesh-wildlife/snakes/' + slug
}

function getSpeciesDescription(species: SpeciesProfile): string {
  return (
    species.seoDescription ||
    species.shortDescription ||
    species.englishName + ' (' + species.scientificName + ') species profile from DESCF Bangladesh wildlife field guide.'
  )
}

function imageToGalleryItem(image: SanityImage | undefined, fallbackAlt: string): SpeciesGalleryImage | null {
  const url = image ? urlForImage(image)?.width(1400).height(1000).url() : null
  if (!url) return null

  return {
    url,
    alt: image?.alt || fallbackAlt,
    caption: image?.caption,
    credit: image?.credit,
  }
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
        ? 'border-bark-200 bg-bark-50'
        : 'border-earth-200 bg-white'

  return (
    <div className={'rounded-2xl border p-5 shadow-card ' + toneClass}>
      <dt className="text-label font-semibold uppercase tracking-[0.18em] text-earth-500">
        {label}
      </dt>
      <dd className="mt-2 font-serif text-xl leading-tight text-earth-950">
        {value || 'Not specified'}
      </dd>
    </div>
  )
}

function DetailSection({
  title,
  eyebrow,
  body,
}: {
  title: string
  eyebrow?: string
  body?: string
}) {
  if (!body) return null

  return (
    <section className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
      {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-3xl leading-tight text-earth-950">
        {title}
      </h2>
      <p className="mt-5 whitespace-pre-line text-body leading-8 text-earth-700">
        {body}
      </p>
    </section>
  )
}

function RelatedArticleCard({ article }: { article: ProkritiKothaArticleCard }) {
  const imageUrl = article.coverImage
    ? urlForImage(article.coverImage)?.width(720).height(480).url()
    : null

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-earth-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-card-lg">
      <Link href={'/prokriti-kotha/' + article.slug.current} className="block">
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
              Prokriti Kotha
            </span>
          </div>
        )}

        <div className="p-5">
          <p className="section-label mb-2">সম্পর্কিত লেখা</p>
          <h3 className="font-serif text-xl leading-tight text-earth-950 group-hover:text-forest-900">
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
    <article className="group overflow-hidden rounded-[1.5rem] border border-earth-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-card-lg">
      <Link href={'/bangladesh-wildlife/snakes/' + species.slug.current} className="block">
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
          <p className="text-sm font-semibold text-forest-800">
            {species.banglaName}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-tight text-earth-950 group-hover:text-forest-900">
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
      title: 'সাপের প্রজাতি পাওয়া যায়নি',
      description: 'অনুরোধ করা সাপের প্রজাতি প্রোফাইল পাওয়া যায়নি।',
      canonicalUrl: getCanonicalUrl(params.slug),
    })
  }

  const ogImageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(1200).height(630).url()
    : undefined

  return buildMetadata({
    title: species.seoTitle || species.englishName + ' | ' + BD_SNAKES,
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

  const localNames = species.localNames?.filter(Boolean) ?? []
  const zones = species.zones?.filter((zone) => zone.title) ?? []
  const districts = species.districts?.filter((district) => district.title) ?? []
  const occurrencePoints = species.occurrencePoints ?? []
  const references = species.sourceReferences?.filter((reference) => reference.title) ?? []
  const relatedArticles =
    species.relatedProkritiKothaArticles?.filter((article) => article.slug?.current) ?? []
  const similarSpecies =
    species.similarSpecies?.filter((item) => item.slug?.current) ?? []

  const galleryImages = [
    imageToGalleryItem(species.primaryImage, species.englishName),
    ...(species.images ?? []).map((image) => imageToGalleryItem(image, species.englishName)),
  ].filter((image): image is SpeciesGalleryImage => Boolean(image))

  const uniqueGalleryImages = galleryImages.filter(
    (image, index, array) => array.findIndex((item) => item.url === image.url) === index,
  )

  const hasDetailContent = Boolean(
    species.identification ||
    species.scaleDescription ||
    species.behaviour ||
    species.habitat ||
    species.diet ||
    species.ecologicalRole ||
    species.mythsAndFacts ||
    species.safetyNote,
  )

  return (
    <main id="main-content" className="bg-earth-50">
      <article>
        <header className="relative overflow-hidden bg-forest-950 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]" />

          <div className="container-site relative py-12 md:py-16 lg:py-20">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-forest-100/75">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife" className="hover:text-white">
                    Bangladesh Wildlife
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife/snakes" className="hover:text-white">
                    Snakes
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-bark-200" aria-current="page">
                  {species.englishName}
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                  {BD_SNAKES} / প্রজাতি প্রোফাইল
                </p>

                {species.banglaName && (
                  <p className="mt-6 text-2xl font-semibold text-bark-200">
                    {species.banglaName}
                  </p>
                )}

                <h1 className="mt-3 font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.98] tracking-tight text-white">
                  {species.englishName}
                </h1>

                <p className="mt-4 text-2xl italic text-forest-100">
                  {species.scientificName}
                </p>

                {species.shortDescription && (
                  <p className="mt-7 max-w-3xl text-lg leading-8 text-forest-100">
                    {species.shortDescription}
                  </p>
                )}

                {localNames.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {localNames.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-forest-50"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-full border border-forest-200/30 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-forest-50">
                    {formatVenomStatus(species.venomStatus)}
                  </span>

                  {species.medicalImportance && (
                    <span className="rounded-full border border-bark-300/50 bg-bark-500/15 px-4 py-2 text-sm font-semibold text-bark-100">
                      {formatMedicalImportance(species.medicalImportance)}
                    </span>
                  )}

                  {species.iucnGlobalStatus && (
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-forest-50">
                      বিশ্ব IUCN: {species.iucnGlobalStatus}
                    </span>
                  )}
                </div>
              </div>

              <SpeciesImageGallery
                images={uniqueGalleryImages}
                fallbackTitle={species.banglaName || species.englishName}
              />
            </div>
          </div>
        </header>

        <section className="border-b border-earth-200 bg-white">
          <div className="container-site py-10 md:py-12">
            <dl className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="বিষের অবস্থা" value={formatVenomStatus(species.venomStatus)} tone="forest" />
              <InfoCard label="চিকিৎসাগত গুরুত্ব" value={formatMedicalImportance(species.medicalImportance)} tone="amber" />
              <InfoCard label="পরিবার" value={species.family} />
              <InfoCard label="বর্গ" value={species.order} />
              <InfoCard label="বিশ্ব IUCN" value={species.iucnGlobalStatus} />
              <InfoCard label="বাংলাদেশে অবস্থা" value={species.bangladeshStatus} />
              <InfoCard
                label="Known zones"
                value={zones.length > 0 ? zones.map((zone) => zone.title).join(', ') : undefined}
              />
              <InfoCard
                label="Known districts"
                value={districts.length > 0 ? String(districts.length) : undefined}
              />
            </dl>

            {species.statusSource && (
              <p className="mt-4 text-sm leading-6 text-earth-500">
                অবস্থার উৎস নোট: {species.statusSource}
              </p>
            )}
          </div>
        </section>

        <section className="border-b border-earth-200 bg-[#fbf7ed]">
          <div className="container-site py-10 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="section-label mb-3">জননিরাপত্তা নোট</p>
                <h2 className="font-serif text-3xl text-earth-950">
                  Observe from a safe distance.
                </h2>
              </div>
              <p className="text-body leading-8 text-earth-700">
                This page is for education, conservation awareness, and field identification support.
                It is not a snake handling, catching, or rescue manual. If a snake is found near people,
                keep distance and contact trained responders or relevant authorities.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-earth-50">
          <div className="container-site py-12 md:py-14 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-6">
                {hasDetailContent ? (
                  <>
                    <DetailSection eyebrow="মাঠ পর্যায়ের শনাক্তকরণ" title="শনাক্তকরণ" body={species.identification} />
                    <DetailSection eyebrow="গঠন" title="আঁশ ও দেহের বর্ণনা" body={species.scaleDescription} />
                    <DetailSection eyebrow="প্রাকৃতিক ইতিহাস" title="আচরণ" body={species.behaviour} />
                    <DetailSection eyebrow="আবাসস্থল" title="আবাসস্থল" body={species.habitat} />
                    <DetailSection eyebrow="বাস্তুসংস্থান" title="খাদ্যাভ্যাস" body={species.diet} />
                    <DetailSection eyebrow="সংরক্ষণমূল্য" title="পরিবেশগত ভূমিকা" body={species.ecologicalRole} />
                    <DetailSection eyebrow="জনসচেতনতা" title="মিথ ও তথ্য" body={species.mythsAndFacts} />
                    <DetailSection eyebrow="নিরাপত্তা" title="প্রজাতি-নির্দিষ্ট নিরাপত্তা নোট" body={species.safetyNote} />
                  </>
                ) : (
                  <section className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
                    <p className="section-label mb-3">Profile data</p>
                    <h2 className="font-serif text-3xl leading-tight text-earth-950">
                      Field notes are being prepared
                    </h2>
                    <p className="mt-5 max-w-3xl text-body leading-8 text-earth-700">
                      Sanity Studio-তে যোগ ও পর্যালোচনা করার পর বিস্তারিত শনাক্তকরণ, আবাসস্থল, আচরণ, খাদ্যাভ্যাস, পরিবেশগত ভূমিকা, মিথ এবং নিরাপত্তা নোট এখানে দেখা যাবে।
                    </p>
                  </section>
                )}
              </div>

              <aside className="space-y-6">
                <ShareButtons
                  title={(species.banglaName ? species.banglaName + ' / ' : '') + species.englishName}
                  description={getSpeciesDescription(species)}
                  label="এই প্রজাতি প্রোফাইল শেয়ার করুন"
                />

                {references.length > 0 && (
                  <div className="rounded-[1.75rem] border border-earth-200 bg-white p-6 shadow-card">
                    <p className="section-label mb-3">Sources</p>
                    <h2 className="font-serif text-2xl text-earth-950">References</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-earth-700">
                      {references.map((reference) => (
                        <li key={reference._key || reference.title}>
                          {reference.url ? (
                            <a href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-forest-800 hover:text-forest-950">
                              {reference.title}
                            </a>
                          ) : (
                            <span className="font-semibold text-earth-950">{reference.title}</span>
                          )}
                          {reference.note && <p className="text-earth-500">{reference.note}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-earth-50">
          <div className="container-site pb-12 md:pb-14 lg:pb-16">
            <SpeciesDistributionMap
              districts={districts}
              zones={zones}
              occurrencePoints={occurrencePoints}
              distributionText={species.distributionText}
            />
          </div>
        </section>

        {(similarSpecies.length > 0 || relatedArticles.length > 0) && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site py-12 md:py-14 lg:py-16">
              {similarSpecies.length > 0 && (
                <div>
                  <div className="mb-8 max-w-3xl">
                    <p className="section-label mb-3">Compare carefully</p>
                    <h2 className="font-serif text-h2 text-earth-950">
                      সদৃশ প্রজাতি
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {similarSpecies.slice(0, 3).map((item) => (
                      <SimilarSpeciesCard key={item._id} species={item} />
                    ))}
                  </div>
                </div>
              )}

              {relatedArticles.length > 0 && (
                <div className={similarSpecies.length > 0 ? 'mt-12' : ''}>
                  <div className="mb-8 max-w-3xl">
                    <p className="section-label mb-3">Editorial connection</p>
                    <h2 className="font-serif text-h2 text-earth-950">
                      Related Prokriti Kotha articles
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.slice(0, 3).map((article) => (
                      <RelatedArticleCard key={article._id} article={article} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
