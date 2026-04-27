// ─── /reports ─────────────────────────────────────────────────────────────────
// apps/web/app/reports/page.tsx

import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { RESOURCES_PAGE_QUERY } from '@/lib/sanity/queries'
import { ResourceCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { ResourceCard as ResourceCardType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Reports & Publications',
  description: 'Reports, concept notes, policy briefs, and governance documents published by DESCF.',
}

export default async function ReportsPage() {
  const resources = await sanityFetch<ResourceCardType[]>({
    query: RESOURCES_PAGE_QUERY,
    tags: ['resource'],
  })

  const reports = (resources ?? []).filter(r =>
    ['report', 'concept-note', 'brief', 'presentation'].includes(r.type)
  )
  const governance = (resources ?? []).filter(r => r.type === 'governance')

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Publications</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Reports &amp; Publications</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Concept notes, reports, and policy briefs produced by or related to DESCF's programmes.
          </p>
        </div>
      </section>

      <section className="section-padding container-site space-y-14">
        {reports.length > 0 && (
          <div>
            <SectionHeader label="Publications" title="Reports and concept notes" />
            <div className="grid md:grid-cols-2 gap-4 max-w-prose-lg">
              {reports.map(r => <ResourceCard key={r._id} resource={r} />)}
            </div>
          </div>
        )}

        {governance.length > 0 && (
          <div>
            <SectionHeader label="Governance" title="Governance documents" />
            <div className="grid md:grid-cols-2 gap-4 max-w-prose-lg">
              {governance.map(r => <ResourceCard key={r._id} resource={r} />)}
            </div>
          </div>
        )}

        {reports.length === 0 && governance.length === 0 && (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No publications yet</p>
            <p className="text-body-sm">DESCF publications will appear here when added.</p>
          </div>
        )}
      </section>
    </>
  )
}
