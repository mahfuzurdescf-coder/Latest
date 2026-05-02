import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Mission & Vision',
  description:
    'Read the mission, vision, and working principles of Deep Ecology and Snake Conservation Foundation.',
  canonicalUrl: 'https://descf.org/mission',
})

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Mission & Vision', url: 'https://descf.org/mission' },
])

const missionPoints = [
  {
    title: 'Public biodiversity understanding',
    text: 'Support people to understand wildlife, snakes, ecosystems, and coexistence through accessible conservation communication.',
  },
  {
    title: 'Safer human-wildlife response',
    text: 'Reduce panic, misinformation, risky handling, and harmful reactions by sharing calm, safety-first public guidance.',
  },
  {
    title: 'Field-informed learning',
    text: 'Connect awareness work with observation, ecological context, field documentation, and responsible knowledge sharing.',
  },
]

const principles = [
  {
    title: 'Careful communication',
    text: 'Conservation messages should be accurate, calm, and useful for general visitors.',
  },
  {
    title: 'Evidence before claim',
    text: 'Public claims should be verified before they are placed on the website or shared as institutional impact.',
  },
  {
    title: 'Education before reaction',
    text: 'Wildlife communication should help people respond safely instead of creating fear or confusion.',
  },
]

export default function MissionPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-earth-200 bg-[#fbf7ed] bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]">
        <div className="container-site py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="section-label mb-5">
                Mission & Vision
              </p>
              <h1 className="max-w-4xl text-h1 text-earth-950">
                Public conservation learning for safer coexistence.
              </h1>
              <p className="mt-7 max-w-2xl text-body-lg text-earth-700">
                DESCF’s mission is to strengthen biodiversity awareness, snake conservation communication, field-informed learning, and responsible human-wildlife coexistence in Bangladesh.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/current-work" className="btn-primary px-5 py-3 text-sm">
                  View current work
                </Link>
                <Link href="/programmes" className="btn-secondary px-5 py-3 text-sm">
                  Explore programmes
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-forest-950 p-8 text-white shadow-card-lg">
              <p className="section-label text-gold-300">
                Working direction
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                Mission is not decoration. It must guide visible work.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                The mission should be reflected across programmes, events, resources, governance standards, media language, and team representation.
              </p>
              <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">
                  Long-term vision
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight">
                  A Bangladesh where wildlife is understood through knowledge, not fear.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">
              Mission
            </p>
            <h2 className="text-h2 text-earth-950">
              Make conservation understandable, practical, and safe.
            </h2>
            <p className="mt-5 max-w-2xl text-body text-earth-700">
              DESCF should explain biodiversity in a way that students, communities, educators, media teams, and institutions can actually use.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {missionPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-7 shadow-card"
              >
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-sm text-earth-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="section-label mb-4">
                Vision
              </p>
              <h2 className="text-h2 text-earth-950">
                Build a public culture of responsible coexistence.
              </h2>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
              <p className="text-base leading-8 text-earth-700">
                DESCF’s long-term vision is to contribute to a society where biodiversity is valued, snakes and wildlife are understood with ecological context, and public response is guided by education, safety, and respect for nature.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800">
                  Conservation education
                </div>
                <div className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800">
                  Safer public response
                </div>
                <div className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800">
                  Field documentation
                </div>
                <div className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800">
                  Responsible storytelling
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">
              Working principles
            </p>
            <h2 className="text-h2 text-earth-950">
              The mission should control the tone of every public page.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-7 shadow-card"
              >
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-sm text-earth-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 section-label text-gold-300">
                  Next step
                </p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Turn mission into visible public work.
                </h2>
                <p className="mt-4 max-w-2xl text-body-sm text-forest-100/75">
                  The mission only matters if visitors can see programmes, events, resources, governance standards, and people behind the work.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/resources" className="btn-light px-5 py-3 text-sm">
                  View resources
                </Link>
                <Link href="/contact" className="btn-outline-light px-5 py-3 text-sm">
                  Contact DESCF
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


