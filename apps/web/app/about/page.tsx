// ─── /about ───────────────────────────────────────────────────────────────────
// apps/web/app/about/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About DESCF',
  description: 'Deep Ecology and Snake Conservation Foundation — our story, structure, and approach to conservation in Bangladesh.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">About</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-6 max-w-prose">
            Deep Ecology and Snake Conservation Foundation
          </h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            DESCF is a Bangladesh-based conservation organisation working at the intersection
            of herpetofauna protection, public awareness, and human-wildlife coexistence.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-prose-lg">
          <div className="prose-like space-y-6">
            <h2 className="text-h2 font-serif text-earth-900">Who we are</h2>
            <p className="text-body text-earth-700 leading-relaxed">
              DESCF was established to address a gap in conservation practice in Bangladesh: the
              near-absence of organised, field-honest work on snakes, reptiles, and amphibians.
              These species face dual threats — habitat loss and fear-driven killing — yet receive
              comparatively little focused conservation attention.
            </p>
            <p className="text-body text-earth-700 leading-relaxed">
              We work across a range of areas: rescue response and awareness communication,
              building documentation capacity, exploring monitoring methodologies, and developing
              conservation linkages with communities in snake-human conflict zones.
            </p>
            <p className="text-body text-earth-700 leading-relaxed">
              A defining commitment of DESCF is editorial honesty. We do not present ambition
              as achievement, and we mark our programmes clearly as current work, in preparation,
              in development, or exploratory — so our audiences can understand exactly where we stand.
            </p>

            <h2 className="text-h2 font-serif text-earth-900 mt-10">Our approach</h2>
            <p className="text-body text-earth-700 leading-relaxed">
              We believe conservation outcomes depend on what communities know and how they respond.
              That is why public awareness and conservation communication sit alongside field
              documentation as equal priorities — not supporting activities, but core work.
            </p>
            <p className="text-body text-earth-700 leading-relaxed">
              We are also building toward a more evidence-rich future. Passive acoustic monitoring,
              anuran bioacoustics, and climate-responsive conservation are areas we are actively
              developing methodological capacity in — not because we have all the answers, but
              because we believe Bangladesh's conservation future depends on stronger local data.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/mission"    className="btn-primary">Mission & vision</Link>
            <Link href="/leadership" className="btn-secondary">Meet our leadership</Link>
          </div>
        </div>
      </section>
    </>
  )
}
