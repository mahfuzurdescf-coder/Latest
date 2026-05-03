'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanity/image'
import type { ConservationStatus, SpeciesProfileCard, VenomStatus } from '@/types/sanity'

type FilterOption<TValue extends string> = {
  label: string
  value: TValue
}

export type SnakeSpeciesBrowserLabels = {
  venomFilters?: FilterOption<VenomStatus | 'all'>[]
  iucnFilters?: FilterOption<ConservationStatus | 'all'>[]
  venomStatusLabels?: Partial<Record<VenomStatus | 'unknown', string>>
  searchLabel?: string
  searchPlaceholder?: string
  venomFilterLabel?: string
  iucnFilterLabel?: string
  iucnPrefix?: string
  iucnMissingLabel?: string
  familyLabel?: string
  bangladeshStatusLabel?: string
  viewProfileLabel?: string
  resultPrefix?: string
  resultMiddle?: string
  resultTotalLabel?: string
  emptyTitle?: string
  emptyDescription?: string
}

const fallbackLabels: Required<SnakeSpeciesBrowserLabels> = {
  venomFilters: [
    { label: 'সব বিষের অবস্থা', value: 'all' },
    { label: 'নির্বিষ', value: 'non-venomous' },
    { label: 'মৃদু বিষধর', value: 'mildly-venomous' },
    { label: 'বিষধর', value: 'venomous' },
    { label: 'উচ্চমাত্রায় বিষধর', value: 'highly-venomous' },
    { label: 'অজানা', value: 'unknown' },
  ],
  iucnFilters: [
    { label: 'All IUCN অবস্থা', value: 'all' },
    { label: 'NE', value: 'NE' },
    { label: 'DD', value: 'DD' },
    { label: 'LC', value: 'LC' },
    { label: 'NT', value: 'NT' },
    { label: 'VU', value: 'VU' },
    { label: 'EN', value: 'EN' },
    { label: 'CR', value: 'CR' },
  ],
  venomStatusLabels: {
    'non-venomous': 'নির্বিষ',
    'mildly-venomous': 'মৃদু বিষধর',
    venomous: 'বিষধর',
    'highly-venomous': 'উচ্চমাত্রায় বিষধর',
    unknown: 'অজানা',
  },
  searchLabel: 'সাপের ফিল্ড গাইডে খুঁজুন',
  searchPlaceholder:
    'বাংলা নাম, ইংরেজি নাম, স্থানীয় নাম, বৈজ্ঞানিক নাম বা পরিবার দিয়ে খুঁজুন...',
  venomFilterLabel: 'বিষের অবস্থা',
  iucnFilterLabel: 'IUCN অবস্থা',
  iucnPrefix: 'IUCN',
  iucnMissingLabel: 'তালিকাভুক্ত নয়',
  familyLabel: 'পরিবার',
  bangladeshStatusLabel: 'বাংলাদেশ',
  viewProfileLabel: 'প্রজাতি প্রোফাইল দেখুন',
  resultPrefix: 'দেখানো হচ্ছে',
  resultMiddle: '/',
  resultTotalLabel: 'মোট',
  emptyTitle: 'আপনার ফিল্টারের সঙ্গে কোনো প্রজাতি মেলেনি',
  emptyDescription:
    'সার্চ শব্দ, বিষের অবস্থা বা IUCN ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।',
}

function mergeLabels(labels?: SnakeSpeciesBrowserLabels): Required<SnakeSpeciesBrowserLabels> {
  return {
    ...fallbackLabels,
    ...labels,
    venomFilters:
      labels?.venomFilters && labels.venomFilters.length > 0
        ? labels.venomFilters
        : fallbackLabels.venomFilters,
    iucnFilters:
      labels?.iucnFilters && labels.iucnFilters.length > 0
        ? labels.iucnFilters
        : fallbackLabels.iucnFilters,
    venomStatusLabels: {
      ...fallbackLabels.venomStatusLabels,
      ...(labels?.venomStatusLabels ?? {}),
    },
  }
}

function formatVenomStatus(
  status: string | undefined,
  labels: Required<SnakeSpeciesBrowserLabels>,
): string {
  return status ? labels.venomStatusLabels[status as VenomStatus] || status : labels.venomStatusLabels.unknown || 'অজানা'
}

function formatIucnStatus(
  status: string | undefined,
  labels: Required<SnakeSpeciesBrowserLabels>,
): string {
  if (!status) return labels.iucnMissingLabel
  return status
}

function SpeciesCard({
  species,
  labels,
}: {
  species: SpeciesProfileCard
  labels: Required<SnakeSpeciesBrowserLabels>
}) {
  const imageUrl = species.primaryImage
    ? urlForImage(species.primaryImage)?.width(700).height(480).url()
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
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
              {formatVenomStatus(species.venomStatus, labels)}
            </span>

            <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-xs font-semibold text-earth-700">
              {labels.iucnPrefix}: {formatIucnStatus(species.iucnGlobalStatus, labels)}
            </span>
          </div>

          <p className="text-sm font-medium text-forest-800">
            {species.banglaName}
          </p>

          <h2 className="mt-2 font-serif text-2xl leading-tight text-earth-900 group-hover:text-forest-900">
            {species.englishName}
          </h2>

          <p className="mt-1 text-sm italic text-earth-500">
            {species.scientificName}
          </p>

          {species.shortDescription && (
            <p className="mt-4 line-clamp-3 text-body text-earth-600">
              {species.shortDescription}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-earth-500">
            {species.family && (
              <span className="rounded-full bg-earth-100 px-3 py-1">
                {labels.familyLabel}: {species.family}
              </span>
            )}

            {species.bangladeshStatus && (
              <span className="rounded-full bg-earth-100 px-3 py-1">
                {labels.bangladeshStatusLabel}: {species.bangladeshStatus}
              </span>
            )}
          </div>

          <div className="mt-6 inline-flex text-sm font-semibold text-forest-800 transition group-hover:text-forest-950">
            {labels.viewProfileLabel} <span aria-hidden="true" className="ml-1">-&gt;</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export function SnakeSpeciesBrowser({
  species,
  labels,
}: {
  species: SpeciesProfileCard[]
  labels?: SnakeSpeciesBrowserLabels
}) {
  const browserLabels = useMemo(() => mergeLabels(labels), [labels])
  const [searchTerm, setSearchTerm] = useState('')
  const [venomStatus, setVenomStatus] = useState<VenomStatus | 'all'>('all')
  const [iucnStatus, setIucnStatus] = useState<ConservationStatus | 'all'>('all')

  const filteredSpecies = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    return species.filter((item) => {
      const searchableText = [
        item.banglaName,
        item.englishName,
        item.scientificName,
        item.family,
        item.shortDescription,
        ...(item.localNames ?? []),
        ...(item.slugAliases ?? []),
        ...(item.searchKeywords ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = search.length === 0 || searchableText.includes(search)
      const matchesVenom = venomStatus === 'all' || item.venomStatus === venomStatus
      const matchesIucn = iucnStatus === 'all' || item.iucnGlobalStatus === iucnStatus

      return matchesSearch && matchesVenom && matchesIucn
    })
  }, [species, searchTerm, venomStatus, iucnStatus])

  return (
    <div>
      <div className="rounded-2xl border border-earth-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
          <div>
            <label htmlFor="snake-search" className="mb-2 block text-sm font-medium text-earth-900">
              {browserLabels.searchLabel}
            </label>
            <input
              id="snake-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={browserLabels.searchPlaceholder}
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition placeholder:text-earth-400 focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            />
          </div>

          <div>
            <label htmlFor="venom-filter" className="mb-2 block text-sm font-medium text-earth-900">
              {browserLabels.venomFilterLabel}
            </label>
            <select
              id="venom-filter"
              value={venomStatus}
              onChange={(event) => setVenomStatus(event.target.value as VenomStatus | 'all')}
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            >
              {browserLabels.venomFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="iucn-filter" className="mb-2 block text-sm font-medium text-earth-900">
              {browserLabels.iucnFilterLabel}
            </label>
            <select
              id="iucn-filter"
              value={iucnStatus}
              onChange={(event) => setIucnStatus(event.target.value as ConservationStatus | 'all')}
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            >
              {browserLabels.iucnFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-earth-500">
          {browserLabels.resultPrefix} {filteredSpecies.length} {browserLabels.resultMiddle} {browserLabels.resultTotalLabel} {species.length}
        </p>
      </div>

      {filteredSpecies.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpecies.map((item) => (
            <SpeciesCard key={item._id} species={item} labels={browserLabels} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-earth-200 bg-earth-50 p-8">
          <h2 className="font-serif text-2xl text-earth-900">
            {browserLabels.emptyTitle}
          </h2>
          <p className="mt-3 text-body text-earth-600">
            {browserLabels.emptyDescription}
          </p>
        </div>
      )}
    </div>
  )
}

