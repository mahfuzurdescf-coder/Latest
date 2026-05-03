import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ShareButtons, type ShareButtonLabels } from '@/components/share/ShareButtons'
import {
  SpeciesDistributionMap,
  type SpeciesDistributionMapLabels,
} from '@/components/wildlife/SpeciesDistributionMap'
import {
  SpeciesImageGallery,
  type SpeciesGalleryImage,
  type SpeciesGalleryLabels,
} from '@/components/wildlife/SpeciesImageGallery'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import {
  PAGE_CONTENT_BY_KEY_QUERY,
  snakeSpeciesQuery,
  speciesProfileBySlugQuery,
} from '@/lib/sanity/queries'
import type {
  PageContent,
  PageSection,
  ProkritiKothaArticleCard,
  SanityImage,
  SpeciesProfile,
  SpeciesProfileCard,
} from '@/types/sanity'

const PAGE_KEY = 'bangladesh-snakes'
const BD_SNAKES = 'বাংলাদেশের সাপ'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

const fallbackNotFound = {
  title: 'সাপের প্রজাতি পাওয়া যায়নি',
  description: 'অনুরোধ করা সাপের প্রজাতি প্রোফাইল পাওয়া যায়নি।',
}

const fallbackMetaDescription =
  'species profile from DESCF Bangladesh wildlife field guide.'

const fallbackBreadcrumb = {
  home: 'Home',
  wildlife: 'Bangladesh Wildlife',
  snakes: 'Snakes',
}

const fallbackHero = {
  eyebrowSuffix: 'প্রজাতি প্রোফাইল',
  iucnPrefix: 'বিশ্ব IUCN',
}

const fallbackStatusLabels = {
  venom: {
    'non-venomous': 'Non-venomous',
    'mildly-venomous': 'Mildly venomous',
    venomous: 'Venomous',
    'highly-venomous': 'Highly venomous',
    unknown: 'অজানা / যাচাই প্রয়োজন',
  },
  medical: {
    'medically-important': 'Medically important',
    'not-medically-important': 'Not medically important',
    uncertain: 'অনিশ্চিত / যাচাই প্রয়োজন',
  },
  unknown: 'Unknown',
  notSpecified: 'Not specified',
}

const fallbackInfoLabels = [
  'বিষের অবস্থা',
  'চিকিৎসাগত গুরুত্ব',
  'পরিবার',
  'বর্গ',
  'বিশ্ব IUCN',
  'বাংলাদেশে অবস্থা',
  'Known zones',
  'Known districts',
]

const fallbackStatusSourcePrefix = 'অবস্থার উৎস নোট'

const fallbackSafety = {
  eyebrow: 'জননিরাপত্তা নোট',
  title: 'Observe from a safe distance.',
  description:
    'This page is for education, conservation awareness, and field identification support. It is not a snake handling, catching, or rescue manual. If a snake is found near people, keep distance and contact trained responders or relevant authorities.',
}

const fallbackDetailSections = [
  { eyebrow: 'মাঠ পর্যায়ের শনাক্তকরণ', title: 'শনাক্তকরণ' },
  { eyebrow: 'গঠন', title: 'আঁশ ও দেহের বর্ণনা' },
  { eyebrow: 'প্রাকৃতিক ইতিহাস', title: 'আচরণ' },
  { eyebrow: 'আবাসস্থল', title: 'আবাসস্থল' },
  { eyebrow: 'বাস্তুসংস্থান', title: 'খাদ্যাভ্যাস' },
  { eyebrow: 'সংরক্ষণমূল্য', title: 'পরিবেশগত ভূমিকা' },
  { eyebrow: 'জনসচেতনতা', title: 'মিথ ও তথ্য' },
  { eyebrow: 'নিরাপত্তা', title: 'প্রজাতি-নির্দিষ্ট নিরাপত্তা নোট' },
]

const fallbackEmptyProfile = {
  eyebrow: 'Profile data',
  title: 'Field notes are being prepared',
  description:
    'Sanity Studio-তে যোগ ও পর্যালোচনা করার পর বিস্তারিত শনাক্তকরণ, আবাসস্থল, আচরণ, খাদ্যাভ্যাস, পরিবেশগত ভূমিকা, মিথ এবং নিরাপত্তা নোট এখানে দেখা যাবে।',
}

const fallbackShareLabels: ShareButtonLabels = {
  title: 'এই প্রজাতি প্রোফাইল শেয়ার করুন',
  description: 'আপনার কমিউনিটির সঙ্গে ডিইএসসিএফ কনটেন্ট শেয়ার করুন।',
  nativeShare: 'Share',
  copied: 'Copied',
  copyLink: 'Copy link',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  x: 'X',
}

const fallbackSources = {
  eyebrow: 'Sources',
  title: 'References',
}

const fallbackCompare = {
  eyebrow: 'Compare carefully',
  title: 'সদৃশ প্রজাতি',
}

const fallbackRelated = {
  eyebrow: 'Editorial connection',
  title: 'Related Prokriti Kotha articles',
  cardEyebrow: 'সম্পর্কিত লেখা',
  placeholderTitle: 'Prokriti Kotha',
}

const fallbackMapLabels: SpeciesDistributionMapLabels = {
  eyebrow: 'বিস্তৃতি মানচিত্র',
  title: 'Studio-পরিচালিত বিস্তৃতি সারাংশ',
  emptyTitle: 'বিস্তৃতি তথ্য প্রস্তুত করা হচ্ছে',
  emptyDescription:
    'Sanity Studio-তে যোগ করার পর জেলা, অঞ্চল এবং পাবলিক occurrence point এখানে দেখা যাবে। সংবেদনশীল সুনির্দিষ্ট অবস্থান গোপন বা সাধারণীকৃত রাখা উচিত।',
  readyLabel: 'Studio-পরিচালিত মানচিত্র ফিল্ড প্রস্তুত',
  knownZonesLabel: 'Known zones',
  knownDistrictsLabel: 'Known districts',
}

const fallbackGalleryLabels: SpeciesGalleryLabels = {
  thumbnailAriaLabelPrefix: 'Show image',
}

function getCanonicalUrl(slug: string): string {
  return 'https://www.descf.org/bangladesh-wildlife/snakes/' + slug
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function getCardText(section: PageSection | undefined, index: number, fallback: string) {
  const card = section?.cards?.[index]
  return card?.title || card?.eyebrow || card?.text || fallback
}

function getSectionText(section: PageSection | undefined, fallback: string) {
  return section?.description || section?.title || section?.eyebrow || fallback
}

function getSpeciesDescription(species: SpeciesProfile): string {
  return (
    species.seoDescription ||
    species.shortDescription ||
    species.englishName + ' (' + species.scientificName + ') ' + fallbackMetaDescription
  )
}

async function getBangladeshSnakesPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
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

function makeStatusLabels(section: PageSection | undefined) {
  return {
    venom: {
      'non-venomous': getCardText(section, 0, fallbackStatusLabels.venom['non-venomous']),
      'mildly-venomous': getCardText(section, 1, fallbackStatusLabels.venom['mildly-venomous']),
      venomous: getCardText(section, 2, fallbackStatusLabels.venom.venomous),
      'highly-venomous': getCardText(section, 3, fallbackStatusLabels.venom['highly-venomous']),
      unknown: getCardText(section, 4, fallbackStatusLabels.venom.unknown),
    },
    medical: {
      'medically-important': getCardText(section, 5, fallbackStatusLabels.medical['medically-important']),
      'not-medically-important': getCardText(section, 6, fallbackStatusLabels.medical['not-medically-important']),
      uncertain: getCardText(section, 7, fallbackStatusLabels.medical.uncertain),
    },
    unknown: getCardText(section, 8, fallbackStatusLabels.unknown),
    notSpecified: getCardText(section, 9, fallbackStatusLabels.notSpecified),
  }
}

function formatVenomStatus(
  status: string | undefined,
  labels: ReturnType<typeof makeStatusLabels>,
): string {
  return status ? labels.venom[status as keyof typeof labels.venom] || status : labels.unknown
}

function formatMedicalImportance(
  status: string | undefined,
  labels: ReturnType<typeof makeStatusLabels>,
): string {
  return status ? labels.medical[status as keyof typeof labels.medical] || status : labels.notSpecified
}

function InfoCard({
  label,
  value,
  fallbackValue,
  tone = 'default',
}: {
  label: string
  value?: string
  fallbackValue: string
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
        {value || fallbackValue}
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

function RelatedArticleCard({
  article,
  labels,
}: {
  article: ProkritiKothaArticleCard
  labels: typeof fallbackRelated
}) {
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
              {labels.placeholderTitle}
            </span>
          </div>
        )}

        <div className="p-5">
          <p className="section-label mb-2">{labels.cardEyebrow}</p>
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
  const [species, page] = await Promise.all([
    sanityFetch<SpeciesProfile | null>({
      query: speciesProfileBySlugQuery,
      params: { slug: params.slug },
      tags: ['speciesProfile', 'wildlifeGroup'],
    }),
    getBangladeshSnakesPageContent(),
  ])

  const sections = page?.sections ?? []
  const notFoundSection = getSection(sections, 'detail-not-found')

  if (!species || species.group?.slug?.current !== 'snakes') {
    return buildMetadata({
      title: notFoundSection?.title || fallbackNotFound.title,
      description: notFoundSection?.description || fallbackNotFound.description,
      canonicalUrl: getCanonicalUrl(params.slug),
    })
  }

  const ogImageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(1200).height(630).url()
    : undefined

  return buildMetadata({
    title: species.seoTitle || species.englishName + ' | ' + (page?.heroTitle || BD_SNAKES),
    description: getSpeciesDescription(species),
    ogImage: ogImageUrl,
    canonicalUrl: getCanonicalUrl(params.slug),
  })
}

export default async function SnakeSpeciesDetailPage({ params }: Props) {
  const [species, page] = await Promise.all([
    sanityFetch<SpeciesProfile | null>({
      query: speciesProfileBySlugQuery,
      params: { slug: params.slug },
      tags: ['speciesProfile', 'wildlifeGroup'],
    }),
    getBangladeshSnakesPageContent(),
  ])

  if (!species || species.group?.slug?.current !== 'snakes') notFound()

  const sections = page?.sections ?? []
  const breadcrumbSection = getSection(sections, 'detail-breadcrumb')
  const heroSection = getSection(sections, 'detail-hero')
  const statusLabelsSection = getSection(sections, 'detail-status-labels')
  const infoLabelsSection = getSection(sections, 'detail-info-labels')
  const safetySection = getSection(sections, 'detail-safety-note')
  const detailSectionsSection = getSection(sections, 'detail-content-sections')
  const emptyProfileSection = getSection(sections, 'detail-empty-profile')
  const shareSection = getSection(sections, 'detail-share')
  const sourcesSection = getSection(sections, 'detail-sources')
  const mapSection = getSection(sections, 'detail-map')
  const compareSection = getSection(sections, 'detail-similar-species')
  const relatedSection = getSection(sections, 'detail-related-articles')
  const gallerySection = getSection(sections, 'detail-gallery')

  const statusLabels = makeStatusLabels(statusLabelsSection)

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

  const homeLabel = getCardText(breadcrumbSection, 0, fallbackBreadcrumb.home)
  const wildlifeLabel = getCardText(breadcrumbSection, 1, fallbackBreadcrumb.wildlife)
  const snakesLabel = getCardText(breadcrumbSection, 2, fallbackBreadcrumb.snakes)

  const heroTitle = page?.heroTitle || BD_SNAKES
  const heroEyebrowSuffix =
    heroSection?.eyebrow || fallbackHero.eyebrowSuffix
  const iucnPrefix = getCardText(heroSection, 0, fallbackHero.iucnPrefix)

  const infoLabels = fallbackInfoLabels.map((label, index) =>
    getCardText(infoLabelsSection, index, label),
  )
  const statusSourcePrefix =
    infoLabelsSection?.description || fallbackStatusSourcePrefix

  const detailSectionLabels = fallbackDetailSections.map((fallback, index) => {
    const card = detailSectionsSection?.cards?.[index]
    return {
      eyebrow: card?.eyebrow || fallback.eyebrow,
      title: card?.title || fallback.title,
    }
  })

  const safety = {
    eyebrow: safetySection?.eyebrow || fallbackSafety.eyebrow,
    title: safetySection?.title || fallbackSafety.title,
    description: safetySection?.description || fallbackSafety.description,
  }

  const emptyProfile = {
    eyebrow: emptyProfileSection?.eyebrow || fallbackEmptyProfile.eyebrow,
    title: emptyProfileSection?.title || fallbackEmptyProfile.title,
    description: emptyProfileSection?.description || fallbackEmptyProfile.description,
  }

  const shareLabels: ShareButtonLabels = {
    title: shareSection?.title || fallbackShareLabels.title,
    description: shareSection?.description || fallbackShareLabels.description,
    nativeShare: getCardText(shareSection, 0, fallbackShareLabels.nativeShare || 'Share'),
    copyLink: getCardText(shareSection, 1, fallbackShareLabels.copyLink || 'Copy link'),
    copied: getCardText(shareSection, 2, fallbackShareLabels.copied || 'Copied'),
    facebook: getCardText(shareSection, 3, fallbackShareLabels.facebook || 'Facebook'),
    whatsapp: getCardText(shareSection, 4, fallbackShareLabels.whatsapp || 'WhatsApp'),
    x: getCardText(shareSection, 5, fallbackShareLabels.x || 'X'),
  }

  const sources = {
    eyebrow: sourcesSection?.eyebrow || fallbackSources.eyebrow,
    title: sourcesSection?.title || fallbackSources.title,
  }

  const mapLabels: SpeciesDistributionMapLabels = {
    ...fallbackMapLabels,
    eyebrow: mapSection?.eyebrow || fallbackMapLabels.eyebrow,
    title: mapSection?.title || fallbackMapLabels.title,
    emptyTitle: getCardText(mapSection, 0, fallbackMapLabels.emptyTitle || ''),
    emptyDescription: getCardText(
      mapSection,
      1,
      fallbackMapLabels.emptyDescription || '',
    ),
    readyLabel: getCardText(mapSection, 2, fallbackMapLabels.readyLabel || ''),
    knownZonesLabel: getCardText(mapSection, 3, fallbackMapLabels.knownZonesLabel || ''),
    knownDistrictsLabel: getCardText(
      mapSection,
      4,
      fallbackMapLabels.knownDistrictsLabel || '',
    ),
    publicMapNote: mapSection?.description,
  }

  const galleryLabels: SpeciesGalleryLabels = {
    thumbnailAriaLabelPrefix:
      gallerySection?.title || fallbackGalleryLabels.thumbnailAriaLabelPrefix,
  }

  const compare = {
    eyebrow: compareSection?.eyebrow || fallbackCompare.eyebrow,
    title: compareSection?.title || fallbackCompare.title,
  }

  const related = {
    eyebrow: relatedSection?.eyebrow || fallbackRelated.eyebrow,
    title: relatedSection?.title || fallbackRelated.title,
    cardEyebrow: getCardText(relatedSection, 0, fallbackRelated.cardEyebrow),
    placeholderTitle: getCardText(
      relatedSection,
      1,
      fallbackRelated.placeholderTitle,
    ),
  }

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
                    {homeLabel}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife" className="hover:text-white">
                    {wildlifeLabel}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/bangladesh-wildlife/snakes" className="hover:text-white">
                    {snakesLabel}
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
                  {heroTitle} / {heroEyebrowSuffix}
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
                    {formatVenomStatus(species.venomStatus, statusLabels)}
                  </span>

                  {species.medicalImportance && (
                    <span className="rounded-full border border-bark-300/50 bg-bark-500/15 px-4 py-2 text-sm font-semibold text-bark-100">
                      {formatMedicalImportance(species.medicalImportance, statusLabels)}
                    </span>
                  )}

                  {species.iucnGlobalStatus && (
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-forest-50">
                      {iucnPrefix}: {species.iucnGlobalStatus}
                    </span>
                  )}
                </div>
              </div>

              <SpeciesImageGallery
                images={uniqueGalleryImages}
                fallbackTitle={species.banglaName || species.englishName}
                labels={galleryLabels}
              />
            </div>
          </div>
        </header>

        <section className="border-b border-earth-200 bg-white">
          <div className="container-site py-10 md:py-12">
            <dl className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                label={infoLabels[0]}
                value={formatVenomStatus(species.venomStatus, statusLabels)}
                fallbackValue={statusLabels.notSpecified}
                tone="forest"
              />
              <InfoCard
                label={infoLabels[1]}
                value={formatMedicalImportance(species.medicalImportance, statusLabels)}
                fallbackValue={statusLabels.notSpecified}
                tone="amber"
              />
              <InfoCard label={infoLabels[2]} value={species.family} fallbackValue={statusLabels.notSpecified} />
              <InfoCard label={infoLabels[3]} value={species.order} fallbackValue={statusLabels.notSpecified} />
              <InfoCard label={infoLabels[4]} value={species.iucnGlobalStatus} fallbackValue={statusLabels.notSpecified} />
              <InfoCard label={infoLabels[5]} value={species.bangladeshStatus} fallbackValue={statusLabels.notSpecified} />
              <InfoCard
                label={infoLabels[6]}
                value={zones.length > 0 ? zones.map((zone) => zone.title).join(', ') : undefined}
                fallbackValue={statusLabels.notSpecified}
              />
              <InfoCard
                label={infoLabels[7]}
                value={districts.length > 0 ? String(districts.length) : undefined}
                fallbackValue={statusLabels.notSpecified}
              />
            </dl>

            {species.statusSource && (
              <p className="mt-4 text-sm leading-6 text-earth-500">
                {statusSourcePrefix}: {species.statusSource}
              </p>
            )}
          </div>
        </section>

        <section className="border-b border-earth-200 bg-[#fbf7ed]">
          <div className="container-site py-10 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="section-label mb-3">{safety.eyebrow}</p>
                <h2 className="font-serif text-3xl text-earth-950">
                  {safety.title}
                </h2>
              </div>
              <p className="text-body leading-8 text-earth-700">
                {safety.description}
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
                    <DetailSection eyebrow={detailSectionLabels[0].eyebrow} title={detailSectionLabels[0].title} body={species.identification} />
                    <DetailSection eyebrow={detailSectionLabels[1].eyebrow} title={detailSectionLabels[1].title} body={species.scaleDescription} />
                    <DetailSection eyebrow={detailSectionLabels[2].eyebrow} title={detailSectionLabels[2].title} body={species.behaviour} />
                    <DetailSection eyebrow={detailSectionLabels[3].eyebrow} title={detailSectionLabels[3].title} body={species.habitat} />
                    <DetailSection eyebrow={detailSectionLabels[4].eyebrow} title={detailSectionLabels[4].title} body={species.diet} />
                    <DetailSection eyebrow={detailSectionLabels[5].eyebrow} title={detailSectionLabels[5].title} body={species.ecologicalRole} />
                    <DetailSection eyebrow={detailSectionLabels[6].eyebrow} title={detailSectionLabels[6].title} body={species.mythsAndFacts} />
                    <DetailSection eyebrow={detailSectionLabels[7].eyebrow} title={detailSectionLabels[7].title} body={species.safetyNote} />
                  </>
                ) : (
                  <section className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
                    <p className="section-label mb-3">{emptyProfile.eyebrow}</p>
                    <h2 className="font-serif text-3xl leading-tight text-earth-950">
                      {emptyProfile.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-body leading-8 text-earth-700">
                      {emptyProfile.description}
                    </p>
                  </section>
                )}
              </div>

              <aside className="space-y-6">
                <ShareButtons
                  title={(species.banglaName ? species.banglaName + ' / ' : '') + species.englishName}
                  description={getSpeciesDescription(species)}
                  labels={shareLabels}
                />

                {references.length > 0 && (
                  <div className="rounded-[1.75rem] border border-earth-200 bg-white p-6 shadow-card">
                    <p className="section-label mb-3">{sources.eyebrow}</p>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {sources.title}
                    </h2>
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
              labels={mapLabels}
            />
          </div>
        </section>

        {(similarSpecies.length > 0 || relatedArticles.length > 0) && (
          <section className="border-t border-earth-200 bg-white">
            <div className="container-site py-12 md:py-14 lg:py-16">
              {similarSpecies.length > 0 && (
                <div>
                  <div className="mb-8 max-w-3xl">
                    <p className="section-label mb-3">{compare.eyebrow}</p>
                    <h2 className="font-serif text-h2 text-earth-950">
                      {compare.title}
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
                    <p className="section-label mb-3">{related.eyebrow}</p>
                    <h2 className="font-serif text-h2 text-earth-950">
                      {related.title}
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.slice(0, 3).map((article) => (
                      <RelatedArticleCard
                        key={article._id}
                        article={article}
                        labels={related}
                      />
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
