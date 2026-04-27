import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { PROGRAMMES_PAGE_QUERY } from '@/lib/sanity/queries'
import { ProgrammeCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Current Work',
  description: "What DESCF is actively working on — field programmes, awareness outreach, and conservation documentation currently underway.",
}

export default async function CurrentWorkPage() {
  const programmes = await sanityFetch<ProgrammeCardType[]>({
    query: PROGRAMMES_PAGE_QUERY,
    tags: ['programme'],
  })

  const current = (programmes ?? []).filter(p => p.status === 'current')
  const preparation = (programmes ?? []).filter(p => p.status === 'in-preparation')

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">Active work</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-5">Current Work</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            This page shows what DESCF is actively doing right now — not what we plan to do,
            not what we aspire to. We use status labels honestly.
          </p>
        </div>
      </section>

      {/* Honesty note */}
      <div className="bg-forest-50 border-b border-forest-200">
        <div className="container-site py-5">
          <p className="text-body-sm text-forest-800 italic">
            "We do not present ambition as achievement. The programmes below are active —
            meaning work is underway. Programmes in preparation or development are listed
            separately on our{' '}
            <Link href="/programmes" className="underline hover:text-forest-900">Programmes page</Link>."
          </p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-site space-y-16">
          {current.length > 0 ? (
            <div>
              <SectionHeader
                label="Active programmes"
                title="What we are working on now"
                subtitle="These programmes are currently active — with ongoing field work, outreach, or documentation."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {current.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-earth-500">
              <p className="text-h4 font-serif mb-2">Programmes loading</p>
              <p className="text-body-sm">Add current programmes via the CMS studio.</p>
            </div>
          )}

          {preparation.length > 0 && (
            <div>
              <SectionHeader
                label="Coming soon"
                title="Programmes in preparation"
                subtitle="Active planning and preparation underway — not yet launched."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {preparation.map(p => <ProgrammeCard key={p._id} programme={p} />)}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link href="/strategic-priorities" className="btn-secondary">
              See strategic priorities →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
