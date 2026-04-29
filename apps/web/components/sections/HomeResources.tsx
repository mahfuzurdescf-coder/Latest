import { ResourceCard } from '@/components/cards'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { ResourceCard as ResourceCardType } from '@/types/sanity'

interface HomeResourcesProps {
  resources: ResourceCardType[]
}

export function HomeResources({ resources }: HomeResourcesProps) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Evidence & resources"
          title="Useful materials for conservation learning"
          description="Reports, briefs, presentations, and field materials can support awareness, education, and conservation practice."
        />

        {resources.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {resources.slice(0, 4).map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Resources are not published yet"
            description="Published reports and learning materials will appear here once added in Sanity."
            actionLabel="Visit resources"
            actionHref="/evidence-resources"
          />
        )}
      </Container>
    </Section>
  )
}