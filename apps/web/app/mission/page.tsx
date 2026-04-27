import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission, Vision & Values',
  description: "DESCF's mission, vision, and organisational values — our guiding commitments for conservation in Bangladesh.",
}

const VALUES = [
  {
    title: 'Honesty before ambition',
    body: 'We do not present ambition as achievement. We are transparent about what we have done, what we are working toward, and where we are still in early stages.',
  },
  {
    title: 'Field-first orientation',
    body: 'Conservation work happens on the ground, in communities, and in ecosystems. Our decisions are shaped by field realities, not by what looks good in reports.',
  },
  {
    title: 'Coexistence as a conservation goal',
    body: 'We believe humans and wildlife — including species that generate fear — can share space safely. Building coexistence is not a secondary objective: it is our primary lens.',
  },
  {
    title: 'Accessible science',
    body: 'Conservation knowledge should be accessible to communities, students, and the public — not locked behind institutional language. We work to communicate ecology clearly and without condescension.',
  },
  {
    title: 'Long-term thinking',
    body: 'Conservation outcomes take time. We do not overstate short-term impact, and we invest in methodological capacity, institutional learning, and evidence quality even when it yields no immediate result.',
  },
  {
    title: 'Institutional integrity',
    body: 'We maintain governance standards, keep our records accurate, and hold ourselves accountable to the communities and wildlife we serve — before any external audience.',
  },
]

export default function MissionPage() {
  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">Foundation</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-4 max-w-[600px]">
            Mission, Vision &amp; Values
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-prose-lg">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <p className="section-label text-forest-700 mb-4">Mission</p>
              <p className="text-h3 font-serif text-earth-900 leading-snug">
                To protect herpetofauna and build a culture of coexistence between people and
                wildlife in Bangladesh — through field work, awareness, documentation, and honest
                conservation practice.
              </p>
            </div>
            <div>
              <p className="section-label text-forest-700 mb-4">Vision</p>
              <p className="text-h3 font-serif text-earth-900 leading-snug">
                A Bangladesh where snakes, amphibians, and reptiles are understood and protected —
                and where communities have the knowledge and confidence to coexist with wildlife safely.
              </p>
            </div>
          </div>

          <div>
            <p className="section-label text-forest-700 mb-8">Our values</p>
            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-earth-50 rounded-xl border border-earth-200 p-6">
                  <h3 className="text-h5 font-medium text-earth-900 mb-2">{v.title}</h3>
                  <p className="text-body-sm text-earth-600 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
