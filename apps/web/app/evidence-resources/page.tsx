import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { RESOURCES_PAGE_QUERY } from '@/lib/sanity/queries'
import { ResourceCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import { getResourceTypeLabel } from '@/lib/utils'
import type { ResourceCard as ResourceCardType, ResourceType } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Evidence & Resources',
  description: 'Conservation resources, field notes, concept notes, and evidence produced by or related to DESCF.',
}

const RESOURCE_TYPE_ORDER: ResourceType[] = [
  'report', 'concept-note', 'brief', 'field-note', 'presentation', 'media-reference', 'governance'
]

export default async function EvidenceResourcesPage() {
  const resources = await sanityFetch<(ResourceCardType & { relatedProgramme?: { title: string; slug: { current: string } } })[]>({
    query: RESOURCES_PAGE_QUERY,
    tags: ['resource'],
  })

  const all = resources ?? []

  // Group by type
  const grouped = RESOURCE_TYPE_ORDER.reduce<Record<string, typeof all>>((acc, type) => {
    const items = all.filter(r => r.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Knowledge base</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Evidence &amp; Resources</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Concept notes, field documentation, reports, and reference material — produced by or
            relevant to DESCF's conservation work.
          </p>
        </div>
      </section>

      <section className="section-padding container-site space-y-14">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <SectionHeader
              label={`${items.length} document${items.length !== 1 ? 's' : ''}`}
              title={getResourceTypeLabel(type as ResourceType) + 's'}
            />
            <div className="grid md:grid-cols-2 gap-4 max-w-prose-lg">
              {items.map(r => <ResourceCard key={r._id} resource={r} />)}
            </div>
          </div>
        ))}

        {all.length === 0 && (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No resources yet</p>
            <p className="text-body-sm">
              DESCF resources will appear here. Add them via the CMS studio.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
