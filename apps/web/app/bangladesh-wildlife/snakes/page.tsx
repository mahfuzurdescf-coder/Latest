import type { Metadata } from 'next'
import Link from 'next/link'

import { SnakeSpeciesBrowser } from '@/components/wildlife/SnakeSpeciesBrowser'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { snakeSpeciesQuery } from '@/lib/sanity/queries'
import type { SpeciesProfileCard } from '@/types/sanity'

const BD_SNAKES = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09be\u09aa'
const VIEW_SPECIES = 'প্রজাতি দেখুন'
const READ_PROKRITI = '\u09aa\u09cd\u09b0\u0995\u09c3\u09a4\u09bf \u0995\u09a5\u09be \u09aa\u09dc\u09c1\u09a8'

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  title: BD_SNAKES,
  description:
    "DESCF's public-friendly digital field guide to the snakes of Bangladesh, including local-name search, species profiles, venom status, habitat notes, and safety guidance.",
  canonicalUrl: 'https://www.descf.org/bangladesh-wildlife/snakes',
})

function countByValue(
  species: SpeciesProfileCard[],
  key: keyof SpeciesProfileCard,
  value: string,
): number {
  return species.filter((item) => item[key] === value).length
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string | number
  note: string
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 text-white shadow-card backdrop-blur-sm">
      <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl leading-none text-white">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-forest-100">{note}</p>
    </div>
  )
}

function StandardCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-earth-200/80 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-card-lg">
      <h3 className="font-serif text-2xl text-earth-950">{title}</h3>
      <p className="mt-3 text-body-sm leading-7 text-earth-700">{text}</p>
    </div>
  )
}

export default async function BangladeshSnakesPage() {
  const species = await sanityFetch<SpeciesProfileCard[]>({
    query: snakeSpeciesQuery,
    tags: ['speciesProfile', 'wildlifeGroup'],
  })

  const publishedSpecies = (species ?? []).filter(
    (item) => item.slug?.current,
  )

  const totalSpecies = publishedSpecies.length
  const nonVenomousCount = countByValue(
    publishedSpecies,
    'venomStatus',
    'non-venomous',
  )
  const medicallyImportantCount = countByValue(
    publishedSpecies,
    'medicalImportance',
    'medically-important',
  )

  return (
    <main id="main-content" className="bg-earth-50">
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]" />

        <div className="container-site relative py-14 md:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-forest-100/75">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/bangladesh-wildlife"
                  className="hover:text-white"
                >
                  Bangladesh Wildlife
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-bark-200" aria-current="page">
                {BD_SNAKES}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                Digital field guide — Bangladesh Wildlife
              </p>

              <h1 className="mt-5 font-serif text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.96] tracking-tight text-white">
                {BD_SNAKES}
              </h1>

              <p className="mt-7 max-w-3xl text-xl leading-9 text-forest-100">
                A calm, searchable, public-friendly field guide for learning about
                snake diversity, identification clues, venom status, habitat, ecological
                role, and safe response in Bangladesh.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#snake-database" className="btn-cta">
                  {VIEW_SPECIES}
                </a>
                <Link
                  href="/prokriti-kotha"
                  className="rounded-full border border-forest-200 px-5 py-3 text-sm font-semibold text-forest-50 transition hover:bg-white/10"
                >
                  {READ_PROKRITI}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-card backdrop-blur-sm">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                গাইডে খুঁজুন
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
                Search by local, English, or scientific name.
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-forest-100">
                Many people do not know a scientific name. The database supports
                Bangla names, local names, English names, spelling variants, and
                transliteration where available.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['darash', 'cobra', 'rat snake', 'krait', 'keute', 'python'].map(
                  (term) => (
                    <span
                      key={term}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-forest-50"
                    >
                      {term}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StatCard
              label="Published species"
              value={totalSpecies}
              note="Published snake profiles currently available in the DESCF database."
            />
            <StatCard
              label="Non-venomous"
              value={nonVenomousCount}
              note="Separating harmless species is important for public awareness."
            />
            <StatCard
              label="Medically important"
              value={medicallyImportantCount}
              note="This group is a priority for safety communication."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="section-label mb-3">Database standard</p>
            <h2 className="font-serif text-h2 text-earth-950">
              More than photos: verified field-guide information.
            </h2>
            <p className="mt-4 text-body leading-8 text-earth-700">
              This section is designed to reduce fear and misinformation by presenting
              snake information in a simple, responsible, conservation-friendly format.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <StandardCard
              title="Names and identity"
              text="Bangla name, local name, English name, scientific name, and slug aliases help people search more easily."
            />
            <StandardCard
              title="Safety first"
              text="This database is not a handling or rescue manual. Safe distance and responsible response remain the priority."
            />
            <StandardCard
              title="Ecology matters"
              text="Profiles can include habitat, diet, ecological role, and coexistence-focused learning."
            />
            <StandardCard
              title="Location privacy"
              text="Sensitive species and habitats should be protected by avoiding exact location disclosure."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#fbf7ed]">
        <div className="container-site py-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-label mb-3">জননিরাপত্তা নোট</p>
              <h2 className="font-serif text-3xl text-earth-950">
                Keep distance. Do not handle snakes.
              </h2>
            </div>
            <p className="text-body leading-8 text-earth-700">
              This field guide is for education and conservation awareness. Do not
              attempt to catch, crowd, or harm a snake. If a snake is in a human-use
              area, seek help from trained responders or the relevant authority.
            </p>
          </div>
        </div>
      </section>

      <section id="snake-database" className="bg-earth-50">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-3">Species database</p>
              <h2 className="font-serif text-h2 text-earth-950">
                Browse snake species profiles.
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
                Search and filter published profiles by name, venom status, IUCN status,
                family, local names, and available keywords.
              </p>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-white/85 px-5 py-4 text-sm leading-6 text-earth-600 shadow-card">
              <strong className="text-earth-950">Tip:</strong> Try Bangla, English,
              local spelling, or scientific names.
            </div>
          </div>

          <SnakeSpeciesBrowser species={publishedSpecies} />
        </div>
      </section>

      <section className="border-t border-earth-200 bg-white">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-earth-200 bg-gradient-to-br from-forest-50 via-white to-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">Editorial connection</p>
              <h2 className="font-serif text-3xl text-earth-950">
                Stories, field notes, and myth-busting writing.
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                Beyond species profiles, DESCF can use Prokriti Kotha to publish
                field observations, rescue stories, coexistence writing, and public
                myth-busting content.
              </p>
              <Link
                href="/prokriti-kotha"
                className="mt-6 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-900"
              >
                {READ_PROKRITI}
              </Link>
            </div>

            <div className="rounded-[2rem] border border-earth-200 bg-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">Contribute carefully</p>
              <h2 className="font-serif text-3xl text-earth-950">
                Before sending photos or records.
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                Species records should include clear identification-friendly photos,
                broad location, date, observer credit, and safety context. Avoid
                publishing exact sensitive locations.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-forest-300 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-white"
              >
                ডিইএসসিএফের সঙ্গে যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

