import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import { ProgrammeCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Strategic Priorities',
  description: "DESCF's strategic priorities — areas of long-term focus and emerging programme development.",
}

export default async function StrategicPrioritiesPage() {
  const programmes = await sanityFetch<ProgrammeCardType[]>({
    query: PROGRAMMES_PAGE_QUERY,
    tags: ['programme'],
  })

  const development = (programmes ?? []).filter(p => p.status === 'in-development')
  const exploratory  = (programmes ?? []).filter(p => p.status === 'exploratory')

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">Long-term focus</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-5">Strategic Priorities</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Beyond current active work, DESCF is building capacity in several areas that we believe
            will define conservation practice in Bangladesh. These are areas we are investing in
            now — even before results are visible.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site space-y-16">

          <div className="max-w-prose-lg">
            <p className="text-body text-earth-700 leading-relaxed mb-5">
              Our strategic priorities reflect where DESCF sees conservation need and institutional
              opportunity aligning. These priorities guide where we invest limited resources,
              what partnerships we seek, and what capacity we build — even before programmes become active.
            </p>
            <p className="text-body text-earth-700 leading-relaxed">
              We distinguish between "in development" (active capacity-building underway) and
              "exploratory" (early scoping and learning). Both are honest labels — neither
              overstates what we have achieved.
            </p>
          </div>

          {development.length > 0 && (
            <div>
              <SectionHeader
                label="Capacity building"
                title="In development"
                subtitle="Areas where we are actively building institutional, methodological, or partnership capacity."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {development.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}

          {exploratory.length > 0 && (
            <div>
              <SectionHeader
                label="Early scoping"
                title="Exploratory areas"
                subtitle="Themes we are learning about and scoping — not yet active programmes, but real areas of strategic interest."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {exploratory.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}

          {development.length === 0 && exploratory.length === 0 && (
            <div className="py-16 text-center text-earth-500">
              <p className="text-h4 font-serif mb-2">Content coming soon</p>
              <p className="text-body-sm">Add programmes via the CMS studio.</p>
            </div>
          )}

          <div className="bg-earth-50 rounded-2xl border border-earth-200 p-8">
            <h2 className="text-h3 font-serif text-earth-900 mb-3">Partner on our priorities</h2>
            <p className="text-body text-earth-700 mb-5 leading-relaxed max-w-prose">
              If your organisation works in passive acoustic monitoring, bioacoustics, climate-responsive
              conservation, or conservation-linked enterprise — we would like to hear from you.
            </p>
            <Link href="/partner" className="btn-primary">Partner with DESCF</Link>
          </div>
        </div>
      </section>
    </>
  )
}
