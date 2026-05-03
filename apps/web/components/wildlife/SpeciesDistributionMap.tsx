import type {
  SpeciesDistrict,
  SpeciesOccurrencePoint,
  SpeciesZone,
} from '@/types/sanity'

export type SpeciesDistributionMapLabels = {
  emptyMapAriaLabel?: string
  mapAriaLabel?: string
  eyebrow?: string
  title?: string
  emptyTitle?: string
  emptyDescription?: string
  readyLabel?: string
  districtSingular?: string
  districtPlural?: string
  publicMapNote?: string
  knownZonesLabel?: string
  knownDistrictsLabel?: string
  verifiedOccurrenceLabel?: string
  occurrenceRecordLabel?: string
  publicOccurrenceSingular?: string
  publicOccurrencePlural?: string
  publicOccurrenceSuffix?: string
  precisionNote?: string
}

interface SpeciesDistributionMapProps {
  districts: SpeciesDistrict[]
  zones: SpeciesZone[]
  occurrencePoints: SpeciesOccurrencePoint[]
  distributionText?: string
  labels?: SpeciesDistributionMapLabels
}

const BD_BOUNDS = {
  minLat: 20.5,
  maxLat: 26.8,
  minLng: 88.0,
  maxLng: 92.8,
}

const fallbackLabels: Required<SpeciesDistributionMapLabels> = {
  emptyMapAriaLabel: 'বিস্তৃতি তথ্য প্রস্তুতাধীন মানচিত্র',
  mapAriaLabel: 'প্রজাতির আনুমানিক বিস্তৃতি মানচিত্র',
  eyebrow: 'বিস্তৃতি মানচিত্র',
  title: 'Studio-পরিচালিত বিস্তৃতি সারাংশ',
  emptyTitle: 'বিস্তৃতি তথ্য প্রস্তুত করা হচ্ছে',
  emptyDescription:
    'Sanity Studio-তে যোগ করার পর জেলা, অঞ্চল এবং পাবলিক occurrence point এখানে দেখা যাবে। সংবেদনশীল সুনির্দিষ্ট অবস্থান গোপন বা সাধারণীকৃত রাখা উচিত।',
  readyLabel: 'Studio-পরিচালিত মানচিত্র ফিল্ড প্রস্তুত',
  districtSingular: 'district',
  districtPlural: 'districts',
  publicMapNote:
    'এটি জনসাধারণের জন্য আনুমানিক মানচিত্র। সংবেদনশীল সুনির্দিষ্ট অবস্থান গোপন বা সাধারণীকৃত রাখা উচিত।',
  knownZonesLabel: 'Known zones',
  knownDistrictsLabel: 'Known districts',
  verifiedOccurrenceLabel: 'Verified occurrence',
  occurrenceRecordLabel: 'Occurrence record',
  publicOccurrenceSingular: 'public occurrence point',
  publicOccurrencePlural: 'public occurrence points',
  publicOccurrenceSuffix: 'available.',
  precisionNote:
    'Precision is controlled from Studio using the public precision field.',
}

function projectPoint(lat: number, lng: number) {
  const x = ((lng - BD_BOUNDS.minLng) / (BD_BOUNDS.maxLng - BD_BOUNDS.minLng)) * 100
  const y = 100 - ((lat - BD_BOUNDS.minLat) / (BD_BOUNDS.maxLat - BD_BOUNDS.minLat)) * 100

  return {
    x: Math.max(4, Math.min(96, x)),
    y: Math.max(4, Math.min(96, y)),
  }
}

export function SpeciesDistributionMap({
  districts,
  zones,
  occurrencePoints,
  distributionText,
  labels,
}: SpeciesDistributionMapProps) {
  const mapLabels = { ...fallbackLabels, ...(labels ?? {}) }

  const publicOccurrences = occurrencePoints.filter(
    (point) =>
      point.lat &&
      point.lng &&
      point.publicPrecision !== 'hidden',
  )

  const districtPoints = districts
    .filter((district) => district.lat && district.lng)
    .map((district) => ({
      key: district._id,
      label: district.title,
      lat: district.lat as number,
      lng: district.lng as number,
      type: 'district',
    }))

  const occurrenceMapPoints = publicOccurrences.map((point, index) => ({
    key: point._key || 'occurrence-' + index,
    label: point.verified
      ? mapLabels.verifiedOccurrenceLabel
      : mapLabels.occurrenceRecordLabel,
    lat: point.lat as number,
    lng: point.lng as number,
    type: 'occurrence',
  }))

  const mapPoints = [...districtPoints, ...occurrenceMapPoints]
  const hasDistributionData =
    mapPoints.length > 0 || zones.length > 0 || Boolean(distributionText)

  if (!hasDistributionData) {
    return (
      <section className="rounded-[2rem] border border-earth-200 bg-white p-6 shadow-card">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.5rem] border border-earth-200 bg-forest-950 p-5">
            <svg viewBox="0 0 100 100" role="img" aria-label={mapLabels.emptyMapAriaLabel} className="h-[280px] w-full">
              <rect width="100" height="100" rx="8" fill="#172015" />
              <path
                d="M42 8 C55 14 65 26 70 40 C76 58 69 77 55 91 C44 82 34 69 30 53 C25 34 29 18 42 8 Z"
                fill="#24381F"
                stroke="#5F8C4A"
                strokeWidth="0.9"
                opacity="0.9"
              />
            </svg>
          </div>

          <div>
            <p className="section-label mb-3">{mapLabels.eyebrow}</p>
            <h2 className="font-serif text-3xl leading-tight text-earth-950">
              {mapLabels.emptyTitle}
            </h2>
            <p className="mt-4 text-body leading-8 text-earth-700">
              {mapLabels.emptyDescription}
            </p>
            <div className="mt-5 rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800 inline-flex">
              {mapLabels.readyLabel}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-[2rem] border border-earth-200 bg-white p-6 shadow-card">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label mb-2">{mapLabels.eyebrow}</p>
          <h2 className="font-serif text-3xl text-earth-950">
            {mapLabels.title}
          </h2>
        </div>

        <div className="rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
          {districts.length} {districts.length === 1 ? mapLabels.districtSingular : mapLabels.districtPlural}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="overflow-hidden rounded-[1.5rem] border border-earth-200 bg-forest-950 p-4">
          <svg viewBox="0 0 100 100" role="img" aria-label={mapLabels.mapAriaLabel} className="h-[360px] w-full">
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#5F8C4A" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#172015" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="100" height="100" rx="8" fill="#172015" />
            <ellipse cx="50" cy="50" rx="38" ry="48" fill="url(#mapGlow)" />
            <path
              d="M42 8 C55 14 65 26 70 40 C76 58 69 77 55 91 C44 82 34 69 30 53 C25 34 29 18 42 8 Z"
              fill="#24381F"
              stroke="#5F8C4A"
              strokeWidth="0.8"
              opacity="0.95"
            />

            {mapPoints.map((point) => {
              const projected = projectPoint(point.lat, point.lng)
              const isOccurrence = point.type === 'occurrence'

              return (
                <g key={point.key}>
                  <circle
                    cx={projected.x}
                    cy={projected.y}
                    r={isOccurrence ? 2.2 : 2.8}
                    fill={isOccurrence ? '#C8A95A' : '#F8F5EA'}
                    stroke="#172015"
                    strokeWidth="0.8"
                  >
                    <title>{point.label}</title>
                  </circle>
                </g>
              )
            })}
          </svg>

          <p className="mt-3 text-xs leading-5 text-forest-100/75">
            {mapLabels.publicMapNote}
          </p>
        </div>

        <div>
          {distributionText && (
            <p className="text-body-sm leading-7 text-earth-700">
              {distributionText}
            </p>
          )}

          {zones.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-earth-950">
                {mapLabels.knownZonesLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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

          {districts.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-earth-950">
                {mapLabels.knownDistrictsLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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

          {publicOccurrences.length > 0 && (
            <div className="mt-5 rounded-2xl border border-earth-200 bg-earth-50 p-4 text-sm leading-6 text-earth-700">
              {publicOccurrences.length}{' '}
              {publicOccurrences.length === 1
                ? mapLabels.publicOccurrenceSingular
                : mapLabels.publicOccurrencePlural}{' '}
              {mapLabels.publicOccurrenceSuffix}
              <br />
              {mapLabels.precisionNote}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
