// apps/web/app/programmes/page.tsx
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import { ProgrammeCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Programmes',
  description: 'All programme areas of DESCF — current work, programmes in preparation, in development, and exploratory areas.',
}

export default async function ProgrammesPage() {
  const programmes = await sanityFetch<ProgrammeCardType[]>({
    query: PROGRAMMES_PAGE_QUERY,
    tags: ['programme'],
  })

  const all = programmes ?? []
  const current      = all.filter(p => p.status === 'current')
  const preparation  = all.filter(p => p.status === 'in-preparation')
  const development  = all.filter(p => p.status === 'in-development')
  const exploratory  = all.filter(p => p.status === 'exploratory')

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">What we do</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-4">Programmes</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Our programmes span active field work, methodological development, and exploratory
            research. We use status labels so you understand exactly where each programme stands.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site space-y-16">
          {current.length > 0 && (
            <div>
              <SectionHeader label="Active programmes" title="Current work" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {current.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}
          {preparation.length > 0 && (
            <div>
              <SectionHeader label="Coming soon" title="In preparation" subtitle="Programmes we are actively preparing — design, planning, or early-stage fieldwork underway." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {preparation.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}
          {development.length > 0 && (
            <div>
              <SectionHeader label="Building capacity" title="In development" subtitle="Programmes where we are building institutional, methodological, or partnership capacity." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {development.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}
          {exploratory.length > 0 && (
            <div>
              <SectionHeader label="Future thinking" title="Exploratory" subtitle="Areas DESCF is learning about and scoping — not yet active programmes." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {exploratory.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
