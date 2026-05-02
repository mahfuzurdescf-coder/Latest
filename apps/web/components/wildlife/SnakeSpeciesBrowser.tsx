'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanity/image'
import type { ConservationStatus, SpeciesProfileCard, VenomStatus } from '@/types/sanity'

const VENOM_FILTERS: { label: string; value: VenomStatus | 'all' }[] = [
  { label: 'All venom status', value: 'all' },
  { label: 'Non-venomous', value: 'non-venomous' },
  { label: 'Mildly venomous', value: 'mildly-venomous' },
  { label: 'Venomous', value: 'venomous' },
  { label: 'Highly venomous', value: 'highly-venomous' },
  { label: 'Unknown', value: 'unknown' },
]

const IUCN_FILTERS: { label: string; value: ConservationStatus | 'all' }[] = [
  { label: 'All IUCN status', value: 'all' },
  { label: 'NE', value: 'NE' },
  { label: 'DD', value: 'DD' },
  { label: 'LC', value: 'LC' },
  { label: 'NT', value: 'NT' },
  { label: 'VU', value: 'VU' },
  { label: 'EN', value: 'EN' },
  { label: 'CR', value: 'CR' },
]

function formatVenomStatus(status?: string): string {
  const labels: Record<string, string> = {
    'non-venomous': 'Non-venomous',
    'mildly-venomous': 'Mildly venomous',
    venomous: 'Venomous',
    'highly-venomous': 'Highly venomous',
    unknown: 'Unknown',
  }

  return status ? labels[status] || status : 'Unknown'
}

function formatIucnStatus(status?: string): string {
  if (!status) return 'Not listed'
  return status
}

function SpeciesCard({ species }: { species: SpeciesProfileCard }) {
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
              {formatVenomStatus(species.venomStatus)}
            </span>

            <span className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-xs font-semibold text-earth-700">
              IUCN: {formatIucnStatus(species.iucnGlobalStatus)}
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
                Family: {species.family}
              </span>
            )}

            {species.bangladeshStatus && (
              <span className="rounded-full bg-earth-100 px-3 py-1">
                BD: {species.bangladeshStatus}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export function SnakeSpeciesBrowser({ species }: { species: SpeciesProfileCard[] }) {
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
              Search the snake field guide
            </label>
            <input
              id="snake-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Try Bangla, English, local name, scientific name, or family..."
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition placeholder:text-earth-400 focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            />
          </div>

          <div>
            <label htmlFor="venom-filter" className="mb-2 block text-sm font-medium text-earth-900">
              Venom status
            </label>
            <select
              id="venom-filter"
              value={venomStatus}
              onChange={(event) => setVenomStatus(event.target.value as VenomStatus | 'all')}
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            >
              {VENOM_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="iucn-filter" className="mb-2 block text-sm font-medium text-earth-900">
              IUCN status
            </label>
            <select
              id="iucn-filter"
              value={iucnStatus}
              onChange={(event) => setIucnStatus(event.target.value as ConservationStatus | 'all')}
              className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 text-sm text-earth-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            >
              {IUCN_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-earth-500">
          Showing {filteredSpecies.length} of {species.length}
        </p>
      </div>

      {filteredSpecies.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpecies.map((item) => (
            <SpeciesCard key={item._id} species={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-earth-200 bg-earth-50 p-8">
          <h2 className="font-serif text-2xl text-earth-900">
            No species matched your filters
          </h2>
          <p className="mt-3 text-body text-earth-600">
            Try changing the search term, venom status, or IUCN status filter.
          </p>
        </div>
      )}
    </div>
  )
}

