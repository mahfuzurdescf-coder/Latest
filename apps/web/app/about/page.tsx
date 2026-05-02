import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About DESCF',
  description:
    'Learn about Deep Ecology and Snake Conservation Foundation, its conservation communication, public awareness, field learning, and human-wildlife coexistence work in Bangladesh.',
  canonicalUrl: 'https://descf.org/about',
})

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'About DESCF', url: 'https://descf.org/about' },
])

const workAreas = [
  {
    eyebrow: 'Awareness',
    title: 'Public understanding before panic',
    text: 'DESCF works to make biodiversity, snakes, and human-wildlife coexistence easier to understand through calm, accurate, and responsible communication.',
  },
  {
    eyebrow: 'Field learning',
    title: 'Knowledge connected to place',
    text: 'Field observation, ecological context, and community experience should shape how conservation messages are explained to the public.',
  },
  {
    eyebrow: 'Documentation',
    title: 'A credible public record',
    text: 'Events, resources, reports, and media materials should gradually become a public archive of verified DESCF work.',
  },
]

const standards = [
  'Use careful, verifiable language.',
  'Avoid fear-based wildlife messaging.',
  'Connect science with public education.',
  'Show work through programmes, events, resources, and people.',
]

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-earth-200 bg-[#fbf7ed] bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]">
        <div className="container-site py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="section-label mb-5">
                About DESCF
              </p>
              <h1 className="max-w-4xl text-h1 text-earth-950">
                A conservation organisation built around learning, trust, and coexistence.
              </h1>
              <p className="mt-7 max-w-2xl text-body-lg text-earth-700">
                Deep Ecology and Snake Conservation Foundation works at the intersection of biodiversity conservation, snake awareness, ecological education, responsible communication, and public engagement in Bangladesh.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/current-work" className="btn-primary px-5 py-3 text-sm">
                  Explore current work
                </Link>
                <Link href="/contact" className="btn-secondary px-5 py-3 text-sm">
                  Contact DESCF
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-forest-950 p-8 text-white shadow-card-lg">
              <p className="section-label text-gold-300">
                Institution principle
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                DESCF should look like a serious conservation platform, not a random activity page.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                Every public page should help visitors understand what DESCF does, why it matters, and how the work supports safer biodiversity awareness.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">01</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Awareness
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">02</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Learning
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">03</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Trust
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">
              What DESCF does
            </p>
            <h2 className="text-h2 text-earth-950">
              Conservation work becomes stronger when public communication is responsible.
            </h2>
            <p className="mt-5 text-body text-earth-700">
              The site should explain DESCF through concrete work areas instead of vague institutional claims.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6 shadow-card"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-forest-800">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
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
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label mb-4">
                Public standard
              </p>
              <h2 className="text-h2 text-earth-950">
                The brand should feel calm, credible, and careful.
              </h2>
              <p className="mt-5 max-w-xl text-body text-earth-700">
                DESCF’s public identity should not depend on loud claims. It should depend on trust, evidence, field learning, and consistent conservation language.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
              <div className="grid gap-3 sm:grid-cols-2">
                {standards.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
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
                  Understand the mission, then follow the work.
                </h2>
                <p className="mt-4 max-w-2xl text-body-sm text-forest-100/75">
                  Visitors should be able to move from institutional identity to mission, programmes, resources, events, and contact routes without confusion.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/mission" className="btn-light px-5 py-3 text-sm">
                  Mission & vision
                </Link>
                <Link href="/team" className="btn-outline-light px-5 py-3 text-sm">
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


