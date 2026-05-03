import { ResourceCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { PageSection, ResourceCard as ResourceCardType } from '@/types/sanity'

interface HomeResourcesProps {
  resources: ResourceCardType[]
  content?: PageSection
}

export function HomeResources({ resources, content }: HomeResourcesProps) {
  if (!resources.length) return null

  const primaryCta = content?.primaryCta

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={content?.eyebrow || 'Evidence & resources'}
            title={content?.title || 'Selected resources for conservation learning'}
            description={
              content?.description ||
              'Published reports, briefs, presentations, and field materials from DESCF will appear here when available.'
            }
            className="mb-0 max-w-3xl"
          />

          <Button href={primaryCta?.href || '/evidence-resources'} variant="secondary">
            {primaryCta?.label || 'রিসোর্স দেখুন'}
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {resources.slice(0, 4).map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
