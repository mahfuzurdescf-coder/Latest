import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { wildlifeGroupsQuery } from '@/lib/sanity/queries'
import type { WildlifeGroupCard } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'বাংলাদেশের বন্যপ্রাণী | DESCF',
  description:
    'বাংলাদেশের সাপ, ব্যাঙ, পাখি ও অন্যান্য বন্যপ্রাণী সম্পর্কে DESCF-এর science-based digital field guide.',
  alternates: {
    canonical: 'https://descf.org/bangladesh-wildlife',
  },
}

function getGroupHref(group: WildlifeGroupCard): string {
  const slug = group.slug?.current

  if (!slug) return '/bangladesh-wildlife'

  return `/bangladesh-wildlife/${slug}`
}

function WildlifeGroupCardView({ group }: { group: WildlifeGroupCard }) {
  const imageUrl = group.heroImage
    ? urlForImage(group.heroImage)?.width(900).height(600).url()
    : null

  return (
    <article className="group overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <Link href={getGroupHref(group)} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={group.heroImage?.alt || group.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-forest-50 px-6 text-center">
            <span className="font-serif text-3xl text-forest-800">
              {group.title}
            </span>
          </div>
        )}

        <div className="p-6">
          <p className="section-label mb-3">Digital field guide</p>
          <h2 className="font-serif text-2xl leading-tight text-earth-900 group-hover:text-forest-900">
            {group.title}
          </h2>

          {group.description && (
            <p className="mt-3 line-clamp-4 text-body text-earth-600">
              {group.description}
            </p>
          )}

          <p className="mt-5 text-sm font-medium text-forest-800">
            Explore profiles →
          </p>
        </div>
      </Link>
    </article>
  )
}

function StaticSnakesCard() {
  return (
    <article className="rounded-2xl border border-forest-200 bg-forest-50 p-6 shadow-sm">
      <p className="section-label mb-3">First database section</p>
      <h2 className="font-serif text-2xl leading-tight text-earth-900">
        বাংলাদেশের সাপ
      </h2>
      <p className="mt-3 text-body text-earth-700">
        সাপের বাংলা নাম, ইংরেজি নাম, বৈজ্ঞানিক নাম, বিষের অবস্থা, IUCN status,
        habitat, identification, distribution এবং safety note নিয়ে একটি
        structured field guide.
      </p>
      <Link
        href="/bangladesh-wildlife/snakes"
        className="mt-6 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-900"
      >
        Explore snakes
      </Link>
    </article>
  )
}

export default async function BangladeshWildlifePage() {
  const groups = await sanityFetch<WildlifeGroupCard[]>({
    query: wildlifeGroupsQuery,
    tags: ['wildlifeGroup'],
  })

  const validGroups = (groups ?? []).filter((group) => group.slug?.current)

  return (
    <main id="main-content">
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site section-padding">
          <div className="max-w-4xl">
            <p className="section-label mb-4">DESCF Field Guide</p>
            <h1 className="font-serif text-h1 leading-tight text-earth-900">
              বাংলাদেশের বন্যপ্রাণী
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-earth-700">
              বাংলাদেশের সাপ, ব্যাঙ, পাখি ও অন্যান্য বন্যপ্রাণী সম্পর্কে
              বিজ্ঞানভিত্তিক, সহজবোধ্য এবং conservation-focused digital field
              guide.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-earth-200 bg-white p-8 shadow-sm">
              <p className="section-label mb-4">Purpose</p>
              <h2 className="font-serif text-h2 text-earth-900">
                A field guide, not a casual blog
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                এই section species database হিসেবে কাজ করবে। প্রতিটি species
                profile-এ থাকবে পরিচয়, taxonomy, conservation status, habitat,
                distribution, ecological role, myths/facts এবং broad safety
                guidance.
              </p>
              <p className="mt-4 text-body leading-8 text-earth-700">
                গল্প, opinion বা field-note থাকবে আলাদা “প্রকৃতি কথা” section-এ।
                দুই section cross-link করবে, কিন্তু একসাথে মিশে যাবে না।
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
              <p className="section-label mb-4">Safety principle</p>
              <h2 className="font-serif text-h2 text-earth-900">
                Education first, no handling manual
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                এই database মানুষকে সাপ ধরতে শেখানোর জায়গা নয়। এখানে নিরাপদ
                দূরত্ব, trained rescuer, conservation awareness এবং ভুল ধারণা
                দূর করার ওপর জোর থাকবে।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-earth-200 bg-earth-50">
        <div className="container-site section-padding-sm">
          <div className="mb-8">
            <p className="section-label mb-3">Explore groups</p>
            <h2 className="font-serif text-h2 text-earth-900">
              Wildlife sections
            </h2>
          </div>

          {validGroups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {validGroups.map((group) => (
                <WildlifeGroupCardView key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <StaticSnakesCard />

              <div className="rounded-2xl border border-earth-200 bg-white p-6">
                <p className="section-label mb-3">Planned</p>
                <h2 className="font-serif text-2xl text-earth-900">
                  বাংলাদেশের ব্যাঙ
                </h2>
                <p className="mt-3 text-body text-earth-600">
                  Amphibian profiles can be added later using the same schema.
                </p>
              </div>

              <div className="rounded-2xl border border-earth-200 bg-white p-6">
                <p className="section-label mb-3">Planned</p>
                <h2 className="font-serif text-2xl text-earth-900">
                  বাংলাদেশের পাখি
                </h2>
                <p className="mt-3 text-body text-earth-600">
                  Bird profiles can be added later without changing the core architecture.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
