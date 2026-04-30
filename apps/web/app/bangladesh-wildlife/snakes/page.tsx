import type { Metadata } from 'next'
import Link from 'next/link'

import { SnakeSpeciesBrowser } from '@/components/wildlife/SnakeSpeciesBrowser'
import { sanityFetch } from '@/lib/sanity/client'
import { snakeSpeciesQuery } from '@/lib/sanity/queries'
import type { SpeciesProfileCard } from '@/types/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'বাংলাদেশের সাপ | DESCF',
  description:
    'বাংলাদেশের সাপের বাংলা নাম, ইংরেজি নাম, বৈজ্ঞানিক নাম, বিষের অবস্থা, IUCN status ও field guide profiles.',
  alternates: {
    canonical: 'https://descf.org/bangladesh-wildlife/snakes',
  },
}

export default async function BangladeshSnakesPage() {
  const species = await sanityFetch<SpeciesProfileCard[]>({
    query: snakeSpeciesQuery,
    tags: ['speciesProfile', 'wildlifeGroup'],
  })

  const validSpecies = (species ?? []).filter((item) => item.slug?.current)

  return (
    <main id="main-content">
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site section-padding">
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
              <li className="text-earth-700" aria-current="page">
                Snakes
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <p className="section-label mb-4">Digital field guide</p>
            <h1 className="font-serif text-h1 leading-tight text-earth-900">
              বাংলাদেশের সাপ
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-earth-700">
              বাংলাদেশের সাপ সম্পর্কে science-based checklist ও species profile.
              এখানে সাপের পরিচয়, বিষের অবস্থা, conservation status, habitat,
              distribution এবং broad safety note দেওয়া হবে।
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <div className="rounded-3xl border border-earth-200 bg-white p-8 shadow-sm">
              <p className="section-label mb-4">How to use</p>
              <h2 className="font-serif text-h2 text-earth-900">
                Checklist first, details next
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                নিচের checklist থেকে species খুঁজে নেওয়া যাবে। প্রতিটি species
                card থেকে detail page-এ গেলে identification, habitat, behaviour,
                distribution, myths/facts এবং references পাওয়া যাবে।
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
              <p className="section-label mb-4">Safety boundary</p>
              <h2 className="font-serif text-h2 text-earth-900">
                Do not handle snakes
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                এই section শিক্ষা ও conservation awareness-এর জন্য। এটি সাপ ধরা,
                rescue করা বা handling শেখানোর manual নয়। সাপ দেখলে নিরাপদ
                দূরত্ব বজায় রাখুন এবং trained rescuer বা সংশ্লিষ্ট কর্তৃপক্ষের
                সহায়তা নিন।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-earth-200 bg-earth-50">
        <div className="container-site section-padding-sm">
          <div className="mb-8">
            <p className="section-label mb-3">Species checklist</p>
            <h2 className="font-serif text-h2 text-earth-900">
              Published snake profiles
            </h2>
          </div>

          {validSpecies.length > 0 ? (
            <SnakeSpeciesBrowser species={validSpecies} />
          ) : (
            <div className="rounded-2xl border border-earth-200 bg-white p-8">
              <h2 className="font-serif text-2xl text-earth-900">
                No snake profiles published yet
              </h2>
              <p className="mt-3 max-w-2xl text-body text-earth-600">
                Snake species will appear here after profiles are created,
                reviewed, connected to the “snakes” wildlife group, and published
                from Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

