import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { wildlifeGroupsQuery } from '@/lib/sanity/queries'
import type { WildlifeGroupCard } from '@/types/sanity'

const BD_WILDLIFE = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09ac\u09a8\u09cd\u09af\u09aa\u09cd\u09b0\u09be\u09a3\u09c0'
const BD_SNAKES = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09be\u09aa'
const BD_FROGS = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09ac\u09cd\u09af\u09be\u0982'
const BD_BIRDS = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09aa\u09be\u0996\u09bf'

export const revalidate = 60

export const metadata: Metadata = {
  title: BD_WILDLIFE + ' | DESCF',
  description:
    "DESCF's science-based digital field guide for snakes, frogs, birds, and other wildlife of Bangladesh.",
  alternates: {
    canonical: 'https://descf.org/bangladesh-wildlife',
  },
}

function getGroupHref(group: WildlifeGroupCard): string {
  const slug = group.slug?.current
  if (!slug) return '/bangladesh-wildlife'
  return '/bangladesh-wildlife/' + slug
}

function WildlifeGroupCardView({ group }: { group: WildlifeGroupCard }) {
  const imageUrl = group.heroImage
    ? urlForImage(group.heroImage)?.width(900).height(600).url()
    : null

  const isSnakes = group.slug?.current === 'snakes'

  return (
    <article
      className={
        'group overflow-hidden rounded-[1.75rem] border shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-lg ' +
        (isSnakes
          ? 'border-forest-900 bg-forest-950 text-white'
          : 'border-earth-200 bg-white text-earth-950 hover:border-forest-300')
      }
    >
      <Link href={getGroupHref(group)} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
            <Image
              src={imageUrl}
              alt={group.heroImage?.alt || group.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {isSnakes && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent px-5 pb-4 pt-12">
                <span className="rounded-full border border-white/15 bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  Active database
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              'flex aspect-[4/3] items-center justify-center px-6 text-center ' +
              (isSnakes
                ? 'bg-gradient-to-br from-forest-950 to-forest-800'
                : 'bg-forest-50')
            }
          >
            <span className={'font-serif text-3xl ' + (isSnakes ? 'text-white' : 'text-forest-800')}>
              {group.title}
            </span>
          </div>
        )}

        <div className="p-6">
          <p className={isSnakes ? 'text-label font-semibold uppercase tracking-[0.18em] text-bark-300' : 'section-label mb-3'}>
            Digital field guide
          </p>

          <h2
            className={
              'mt-3 font-serif text-2xl leading-tight transition-colors ' +
              (isSnakes ? 'text-white' : 'text-earth-950 group-hover:text-forest-900')
            }
          >
            {group.title}
          </h2>

          {group.description && (
            <p className={'mt-4 line-clamp-4 text-body-sm leading-7 ' + (isSnakes ? 'text-forest-100' : 'text-earth-600')}>
              {group.description}
            </p>
          )}

          <p className={'mt-6 text-sm font-semibold ' + (isSnakes ? 'text-bark-200' : 'text-forest-800')}>
            Explore profiles <span aria-hidden="true">-&gt;</span>
          </p>
        </div>
      </Link>
    </article>
  )
}

function StaticSnakesCard() {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-forest-900 bg-forest-950 p-6 text-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-lg">
      <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
        Active database
      </p>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
        {BD_SNAKES}
      </h2>
      <p className="mt-4 text-body-sm leading-7 text-forest-100">
        A searchable public field guide with Bangla names, English names, scientific names,
        venom status, habitat notes, distribution, images, and safety guidance.
      </p>
      <Link
        href="/bangladesh-wildlife/snakes"
        className="mt-7 inline-flex rounded-full bg-bark-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark-600"
      >
        Explore snakes
      </Link>
    </article>
  )
}

function PlannedGroupCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <article className="rounded-[1.75rem] border border-earth-200 bg-white p-6 shadow-card">
      <p className="section-label mb-3">Planned</p>
      <h2 className="font-serif text-2xl leading-tight text-earth-950">
        {title}
      </h2>
      <p className="mt-3 text-body-sm leading-7 text-earth-600">
        {description}
      </p>
    </article>
  )
}

export default async function BangladeshWildlifePage() {
  const groups = await sanityFetch<WildlifeGroupCard[]>({
    query: wildlifeGroupsQuery,
    tags: ['wildlifeGroup'],
  })

  const validGroups = (groups ?? []).filter((group) => group.slug?.current)
  const hasSnakesGroup = validGroups.some((group) => group.slug?.current === 'snakes')

  return (
    <main id="main-content" className="bg-earth-50">
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]" />

        <div className="container-site relative py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                DESCF Field Guide
              </p>

              <h1 className="mt-5 font-serif text-[clamp(3.2rem,7vw,6rem)] leading-[0.98] tracking-tight text-white">
                {BD_WILDLIFE}
              </h1>

              <p className="mt-7 max-w-3xl text-xl leading-9 text-forest-100">
                A science-based public field-guide system for learning about Bangladesh's
                wildlife through structured profiles, safety-first communication, and
                conservation-focused knowledge.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/bangladesh-wildlife/snakes" className="btn-cta">
                  Explore snake database
                </Link>
                <Link
                  href="/prokriti-kotha"
                  className="rounded-full border border-forest-200 px-5 py-3 text-sm font-semibold text-forest-50 transition hover:bg-white/10"
                >
                  Read Prokriti Kotha
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-card backdrop-blur-sm">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                Database principle
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
                Field-guide data, not scattered posts.
              </h2>
              <p className="mt-4 text-body-sm leading-7 text-forest-100">
                Species profiles should carry identity, taxonomy, status, habitat,
                distribution, ecological role, images, safety notes, and related reading
                in one structured place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-8 shadow-card">
              <p className="section-label mb-4">Purpose</p>
              <h2 className="font-serif text-h2 text-earth-950">
                A public knowledge base for responsible wildlife learning.
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                This section is designed as a species database. Each profile can hold
                identification, taxonomy, conservation status, habitat, distribution,
                ecological role, myths and facts, image gallery, and public safety guidance.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-bark-200 bg-bark-50 p-8 shadow-card">
              <p className="section-label mb-4">Safety principle</p>
              <h2 className="font-serif text-h2 text-earth-950">
                Education first, no handling manual.
              </h2>
              <p className="mt-5 text-body leading-8 text-earth-700">
                The database should never encourage risky handling. It should support safe
                distance, trained response, conservation awareness, and reduction of fear-based harm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-earth-50">
        <div className="container-site py-12 md:py-14 lg:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="section-label mb-3">Explore groups</p>
            <h2 className="font-serif text-h2 text-earth-950">
              Wildlife sections
            </h2>
            <p className="mt-4 text-body leading-8 text-earth-600">
              Start with the active snake database. Future wildlife groups can use the same
              profile system without changing the core architecture.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasSnakesGroup ? (
              validGroups.map((group) => (
                <WildlifeGroupCardView key={group._id} group={group} />
              ))
            ) : (
              <StaticSnakesCard />
            )}

            <PlannedGroupCard
              title={BD_FROGS}
              description="Amphibian profiles can be added later using the same species profile schema."
            />

            <PlannedGroupCard
              title={BD_BIRDS}
              description="Bird profiles can be added later without changing the public field-guide architecture."
            />
          </div>
        </div>
      </section>
    </main>
  )
}
