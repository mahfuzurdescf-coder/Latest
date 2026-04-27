import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { RESOURCES_PAGE_QUERY, TEAM_MEMBERS_QUERY } from '@/lib/sanity/queries'
import { ResourceCard } from '@/components/cards'
import type { ResourceCard as ResourceCardType, TeamMember } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'DESCF governance structure, board, financial statements, and organisational policies.',
}

export default async function GovernancePage() {
  const [resources, team] = await Promise.all([
    sanityFetch<ResourceCardType[]>({ query: RESOURCES_PAGE_QUERY, tags: ['resource'] }),
    sanityFetch<TeamMember[]>({ query: TEAM_MEMBERS_QUERY, tags: ['teamMember'] }),
  ])

  const govDocs = (resources ?? []).filter(r => r.type === 'governance')

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Transparency</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Governance</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            DESCF is committed to transparent governance. Our structure, board, and financial
            records are published here for donors, partners, and the public.
          </p>
        </div>
      </section>

      <section className="section-padding container-site max-w-prose-lg space-y-12">
        {/* Board */}
        <div>
          <h2 className="text-h2 font-serif text-earth-900 mb-6">Board of Directors</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(team ?? []).map(member => (
              <div key={member._id} className="flex items-center gap-4 p-4 bg-earth-50 rounded-xl border border-earth-200">
                <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-forest-200">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-body-sm font-medium text-earth-900">{member.name}</p>
                  <p className="text-caption text-earth-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Governance docs */}
        <div>
          <h2 className="text-h2 font-serif text-earth-900 mb-6">Governance documents</h2>
          {govDocs.length > 0 ? (
            <div className="space-y-3">
              {govDocs.map(r => <ResourceCard key={r._id} resource={r} />)}
            </div>
          ) : (
            <div className="p-6 bg-earth-50 rounded-xl border border-earth-200">
              <p className="text-body text-earth-600 leading-relaxed">
                Governance documents — including our constitution, annual reports, and financial
                statements — will be published here. We are committed to making these available
                as they are prepared and verified.
              </p>
              <p className="text-body-sm text-earth-500 mt-3 italic">
                Documents are added by the DESCF team via the CMS.
              </p>
            </div>
          )}
        </div>

        {/* Commitment note */}
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-7">
          <h3 className="text-h4 font-serif text-forest-900 mb-3">Our governance commitment</h3>
          <p className="text-body text-forest-800 leading-relaxed">
            DESCF operates on a principle of institutional integrity. We maintain accurate records,
            hold ourselves accountable to our mission, and publish governance information openly.
            If you have questions about our governance, write to{' '}
            <a href="mailto:info@descf.org" className="text-forest-700 underline">info@descf.org</a>.
          </p>
        </div>
      </section>
    </>
  )
}
