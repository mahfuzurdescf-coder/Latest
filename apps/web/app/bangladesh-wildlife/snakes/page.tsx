import type { Metadata } from 'next'
import Link from 'next/link'

import { SnakeSpeciesBrowser } from '@/components/wildlife/SnakeSpeciesBrowser'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { snakeSpeciesQuery } from '@/lib/sanity/queries'
import type { SpeciesProfileCard } from '@/types/sanity'

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  title: 'বাংলাদেশের সাপ',
  description:
    'বাংলাদেশের সাপ নিয়ে DESCF-এর digital field guide: local name search, species profile, venom status, habitat, safety note, and public-awareness information.',
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
    <div className="rounded-3xl border border-earth-200 bg-white/85 p-6 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-earth-500">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl leading-none text-earth-950">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-earth-600">{note}</p>
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
    <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
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
    <main id="main-content" className="bg-[#f7f3ec]">
      <section className="relative overflow-hidden border-b border-earth-200 bg-gradient-to-br from-[#f7f3ec] via-white to-[#dfe9dc]">
        <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-forest-200/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-white/60 blur-3xl" />

        <div className="container-site relative section-padding">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-earth-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-forest-800">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/bangladesh-wildlife"
                  className="hover:text-forest-800"
                >
                  Bangladesh Wildlife
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-earth-700" aria-current="page">
                বাংলাদেশের সাপ
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-4xl">
              <p className="section-label mb-5">
                Digital field guide · Bangladesh Wildlife
              </p>

              <h1 className="font-serif text-[4rem] leading-[0.95] tracking-tight text-earth-950 md:text-[5.5rem] lg:text-[6.5rem]">
                বাংলাদেশের সাপ
              </h1>

              <p className="mt-8 max-w-3xl text-xl leading-9 text-earth-700">
                স্থানীয় নাম, scientific name, venom status, habitat,
                identification note, ecological role এবং safety guidance নিয়ে
                DESCF-এর public-friendly snake field guide.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#snake-database" className="btn-primary">
                  Species দেখুন
                </a>
                <Link
                  href="/prokriti-kotha"
                  className="rounded-full border border-forest-300 bg-white/75 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-white"
                >
                  প্রকৃতি কথা পড়ুন
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-xl shadow-earth-900/5 backdrop-blur">
              <p className="section-label mb-4">Search guide</p>
              <h2 className="font-serif text-3xl text-earth-950">
                আঞ্চলিক নাম দিয়েও খুঁজুন
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-earth-700">
                মানুষ অনেক সময় scientific name জানে না। তাই search box-এ
                বাংলা নাম, আঞ্চলিক নাম, English name, spelling variant বা
                transliteration দিয়ে species খুঁজতে পারবেন।
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['দাঁড়াশ', 'গোখরা', 'কালাচ', 'darash', 'cobra', 'rat snake'].map(
                  (term) => (
                    <span
                      key={term}
                      className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-sm text-earth-700"
                    >
                      {term}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-10">
          <div className="grid gap-5 md:grid-cols-3">
            <StatCard
              label="Published species"
              value={totalSpecies}
              note="DESCF database-এ বর্তমানে published snake profiles."
            />
            <StatCard
              label="Non-venomous"
              value={nonVenomousCount}
              note="Public awareness-এর জন্য harmless species আলাদা বোঝা জরুরি."
            />
            <StatCard
              label="Medically important"
              value={medicallyImportantCount}
              note="এই category safety communication-এর জন্য priority."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f2]">
        <div className="container-site section-padding-sm">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-3">Database standard</p>
            <h2 className="font-serif text-h2 text-earth-950">
              শুধু ছবি নয়, verified field-guide information
            </h2>
            <p className="mt-4 text-body leading-8 text-earth-700">
              এই section-এর লক্ষ্য হলো ভয় বা ভুল ধারণা না বাড়িয়ে সাপ সম্পর্কে
              সহজ, তথ্যভিত্তিক ও conservation-friendly knowledge তৈরি করা।
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StandardCard
              title="নাম ও পরিচয়"
              text="বাংলা নাম, আঞ্চলিক নাম, English name, scientific name এবং slug alias একসাথে রাখা হবে, যাতে মানুষ সহজে খুঁজে পায়."
            />
            <StandardCard
              title="Safety first"
              text="এই database কোনো handling বা rescue manual নয়। সাপ দেখলে নিরাপদ দূরত্ব বজায় রাখার বার্তাই priority."
            />
            <StandardCard
              title="Ecology matters"
              text="প্রতিটি profile-এ habitat, diet, ecological role এবং coexistence message থাকবে."
            />
            <StandardCard
              title="Location privacy"
              text="Sensitive species বা habitat protect করতে exact location প্রকাশ না করে broad distribution ব্যবহার করা হবে."
            />
          </div>
        </div>
      </section>

      <section className="border-y border-earth-200 bg-amber-50">
        <div className="container-site py-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-label mb-3">Public safety note</p>
              <h2 className="font-serif text-3xl text-earth-950">
                সাপ দেখলে দূরত্ব বজায় রাখুন
              </h2>
            </div>
            <p className="text-body leading-8 text-earth-700">
              এই field guide শিক্ষা ও conservation awareness-এর জন্য। কোনো
              সাপ ধরার চেষ্টা করবেন না, crowd করবেন না, আঘাত করবেন না।
              মানুষের চলাচলের জায়গায় সাপ থাকলে প্রশিক্ষিত উদ্ধারকারী বা
              সংশ্লিষ্ট কর্তৃপক্ষের সহায়তা নিন।
            </p>
          </div>
        </div>
      </section>

      <section id="snake-database" className="bg-[#f7f3ec]">
        <div className="container-site section-padding-sm">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-3">Species database</p>
              <h2 className="font-serif text-h2 text-earth-950">
                সাপের তালিকা ও species profile
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
                Search, filter এবং local names ব্যবহার করে species profile
                খুঁজুন। প্রতিটি profile-এ identification, status, habitat,
                ecological role এবং safety note থাকবে।
              </p>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-white/85 px-5 py-4 text-sm leading-6 text-earth-600 shadow-sm">
              <strong className="text-earth-950">Tip:</strong> বাংলা, English,
              local spelling বা scientific name দিয়ে search করুন।
            </div>
          </div>

          <SnakeSpeciesBrowser species={publishedSpecies} />
        </div>
      </section>

      <section className="border-t border-earth-200 bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-earth-200 bg-gradient-to-br from-forest-50 via-white to-earth-50 p-8 shadow-sm">
              <p className="section-label mb-3">Editorial connection</p>
              <h2 className="font-serif text-3xl text-earth-950">
                সাপ নিয়ে গল্প, field note ও myth-busting লেখা
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                Species profile-এর বাইরে মানুষের অভিজ্ঞতা, ভুল ধারণা,
                rescue story, coexistence এবং মাঠের পর্যবেক্ষণ পড়ুন
                প্রকৃতি কথায়।
              </p>
              <Link
                href="/prokriti-kotha"
                className="mt-6 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-900"
              >
                প্রকৃতি কথা পড়ুন
              </Link>
            </div>

            <div className="rounded-[2rem] border border-earth-200 bg-earth-50 p-8 shadow-sm">
              <p className="section-label mb-3">Contribute carefully</p>
              <h2 className="font-serif text-3xl text-earth-950">
                ছবি ও তথ্য পাঠানোর আগে
              </h2>
              <p className="mt-4 text-body leading-8 text-earth-700">
                Identification-friendly clear photo, broad location, date,
                observer credit এবং safety context ছাড়া species record publish
                করা উচিত নয়। Exact sensitive location প্রকাশ এড়িয়ে চলুন।
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-forest-300 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-white"
              >
                Contact DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
