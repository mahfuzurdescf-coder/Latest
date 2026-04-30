import { ResourceCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { ResourceCard as ResourceCardType } from '@/types/sanity'

interface HomeResourcesProps {
  resources: ResourceCardType[]
}

export function HomeResources({ resources }: HomeResourcesProps) {
  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Evidence & resources"
            title="Useful materials for conservation learning"
            description="Reports, briefs, presentations, and field materials can support awareness, education, and conservation practice."
            className="mb-0"
          />

          <Button href="/evidence-resources" variant="secondary">
            View resources
          </Button>
        </div>

        {resources.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {resources.slice(0, 4).map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="Resources are being prepared"
              description="Published reports and learning materials will appear here once they are added in the CMS."
              actionLabel="Visit resources"
              actionHref="/evidence-resources"
            />
          </div>
        )}
      </Container>
    </Section>
  )
}
