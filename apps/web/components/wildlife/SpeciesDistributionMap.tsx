import type {
  SpeciesDistrict,
  SpeciesOccurrencePoint,
  SpeciesZone,
} from '@/types/sanity'

interface SpeciesDistributionMapProps {
  districts: SpeciesDistrict[]
  zones: SpeciesZone[]
  occurrencePoints: SpeciesOccurrencePoint[]
  distributionText?: string
}

const BD_BOUNDS = {
  minLat: 20.5,
  maxLat: 26.8,
  minLng: 88.0,
  maxLng: 92.8,
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
}: SpeciesDistributionMapProps) {
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
    label: point.verified ? 'Verified occurrence' : 'Occurrence record',
    lat: point.lat as number,
    lng: point.lng as number,
    type: 'occurrence',
  }))

  const mapPoints = [...districtPoints, ...occurrenceMapPoints]

  return (
    <section className="rounded-[2rem] border border-earth-200 bg-white p-6 shadow-card">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label mb-2">Distribution map</p>
          <h2 className="font-serif text-3xl text-earth-950">
            Studio-managed range overview
          </h2>
        </div>

        <div className="rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
          {districts.length} district{districts.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="overflow-hidden rounded-[1.5rem] border border-earth-200 bg-forest-950 p-4">
          <svg viewBox="0 0 100 100" role="img" aria-label="Approximate species distribution map" className="h-[360px] w-full">
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
            This is a public-facing approximate map. Exact sensitive locations should remain hidden or generalized.
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
              <p className="text-sm font-semibold text-earth-950">Known zones</p>
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
              <p className="text-sm font-semibold text-earth-950">Known districts</p>
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
              {publicOccurrences.length} public occurrence point{publicOccurrences.length === 1 ? '' : 's'} available.
              Precision is controlled from Studio using the public precision field.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
