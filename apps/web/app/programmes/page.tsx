import type { Metadata } from 'next'
import Link from 'next/link'

import { ProgrammeCard } from '@/components/cards'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import type { ProgrammeCard as ProgrammeCardType, ProgrammeStatus } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Programmes',
  description:
    'DESCF programmes connect snake conservation awareness, biodiversity documentation, conservation communication, education, and human-wildlife coexistence in Bangladesh.',
  canonicalUrl: 'https://descf.org/programmes',
})


const programmePrinciples = [
  {
    label: 'Focus',
    title: 'Clear conservation purpose',
    description:
      'Each programme should explain what problem it addresses, who it serves, and how it supports responsible conservation communication.',
  },
  {
    label: 'Evidence',
    title: 'Field-informed learning',
    description:
      'Programme pages should connect activities with field observation, documentation, public education, and careful ecological interpretation.',
  },
  {
    label: 'Safety',
    title: 'Education before reaction',
    description:
      'Snake and wildlife communication should reduce panic, discourage risky handling, and support safer public response.',
  },
  {
    label: 'Growth',
    title: 'CMS-ready programme archive',
    description:
      'As DESCF grows, Sanity can hold programme profiles, activities, related articles, resources, and measurable outputs.',
  },
]

function getStatusCount(programmes: ProgrammeCardType[], status: ProgrammeStatus) {
  return programmes.filter((programme) => programme.status === status).length
}

export default async function ProgrammesPage() {
  const programmes = await sanityFetch<ProgrammeCardType[]>({
    query: PROGRAMMES_PAGE_QUERY,
    tags: ['programme'],
  })

  const currentCount = getStatusCount(programmes, 'current')
  const developingCount =
    getStatusCount(programmes, 'in-development') +
    getStatusCount(programmes, 'in-preparation') +
    getStatusCount(programmes, 'exploratory')

  return (
    <main>
      <section className="border-b border-earth-200 bg-forest-950 text-white">
        <div className="container-site grid gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:py-28">
          <div>
            <p className="section-label mb-5 text-bark-300">DESCF programmes</p>

            <h1 className="max-w-4xl font-serif text-h1 text-white">
              Conservation work with institutional purpose.
            </h1>

            <p className="mt-6 max-w-2xl text-body-lg text-forest-50">
              DESCF programmes connect awareness, biodiversity learning, field documentation,
              public education, and human-wildlife coexistence through a clear conservation
              portfolio.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#programme-portfolio"
                className="inline-flex items-center justify-center rounded-xl bg-bark-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark-600"
              >
                Explore programmes
              </a>
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Partner with DESCF
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/15 bg-white/8 p-7 shadow-card-lg backdrop-blur">
            <p className="section-label mb-4 text-bark-300">Portfolio principle</p>
            <h2 className="font-serif text-3xl leading-tight text-white">
              Not scattered activities — structured conservation programmes.
            </h2>
            <p className="mt-4 text-body-sm text-forest-50">
              A strong programme page should show purpose, activities, audience, evidence,
              outputs, related resources, and responsible public communication in one place.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site grid gap-5 py-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-earth-200 bg-white p-6 shadow-sm">
            <p className="section-label mb-3">Published</p>
            <p className="font-serif text-5xl text-earth-950">{programmes.length}</p>
            <p className="mt-2 text-body-sm text-earth-700">
              Programme profiles available on the public website.
            </p>
          </div>

          <div className="rounded-2xl border border-forest-200 bg-forest-50 p-6 shadow-sm">
            <p className="section-label mb-3">Current</p>
            <p className="font-serif text-5xl text-earth-950">{currentCount}</p>
            <p className="mt-2 text-body-sm text-earth-700">
              Active programme records marked as current.
            </p>
          </div>

          <div className="rounded-2xl border border-bark-200 bg-bark-50 p-6 shadow-sm">
            <p className="section-label mb-3">Pipeline</p>
            <p className="font-serif text-5xl text-earth-950">{developingCount}</p>
            <p className="mt-2 text-body-sm text-earth-700">
              Developing, preparatory, or exploratory programme records.
            </p>
          </div>
        </div>
      </section>

      <section id="programme-portfolio" className="border-b border-earth-200 bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Programme portfolio</p>
            <h2 className="font-serif text-h2 text-earth-950">
              Published DESCF programmes
            </h2>
            <p className="mt-4 text-body text-earth-700">
              Programme records should help visitors understand DESCF’s work as a serious
              conservation system: what the programme does, why it matters, and how people can
              learn, participate, or collaborate responsibly.
            </p>
          </div>

          {programmes.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programmes.map((programme) => (
                <ProgrammeCard key={programme._id} programme={programme} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-earth-200 bg-earth-50 p-8 shadow-card">
              <p className="section-label mb-3">CMS-ready section</p>
              <h3 className="font-serif text-3xl text-earth-950">
                DESCF programme records will appear here from Sanity Studio.
              </h3>
              <p className="mt-4 max-w-2xl text-body text-earth-700">
                This page is already structured for programme profiles. Add programme title,
                status, summary, hero image, activities, resources, and related articles in
                Sanity to publish a complete public programme portfolio.
              </p>
              <Link
                href="/partner"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800"
              >
                Discuss programme collaboration
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Programme standard</p>
            <h2 className="font-serif text-h2 text-earth-950">
              What a DESCF programme page should communicate
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programmePrinciples.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-earth-200 bg-white p-6 shadow-sm"
              >
                <p className="section-label mb-3">{item.label}</p>
                <h3 className="font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-sm text-earth-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-16 md:py-20">
          <div className="rounded-3xl bg-forest-950 p-8 text-white shadow-card-lg md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="section-label mb-4 text-bark-300">Partnership</p>
                <h2 className="max-w-3xl font-serif text-h2 text-white">
                  Build programmes that are useful, credible, and safe for public learning.
                </h2>
                <p className="mt-4 max-w-2xl text-body text-forest-50">
                  DESCF welcomes serious collaboration with institutions, researchers,
                  educators, conservation practitioners, and media partners.
                </p>
              </div>

              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-forest-950 transition hover:bg-earth-100"
              >
                Partner with DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

