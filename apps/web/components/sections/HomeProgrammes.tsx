import { ProgrammeCard } from '@/components/cards'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

interface HomeProgrammesProps {
  programmes: ProgrammeCardType[]
}

export function HomeProgrammes({ programmes }: HomeProgrammesProps) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Programmes"
          title="Conservation work with institutional purpose"
          description="DESCF programmes bring together field learning, public awareness, research, and practical conservation communication."
        />

        {programmes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.slice(0, 6).map((programme) => (
              <ProgrammeCard key={programme._id} programme={programme} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Programme information is being prepared"
            description="Published programme details will appear here after they are added in the CMS."
            actionLabel="Contact DESCF"
            actionHref="/contact"
          />
        )}
      </Container>
    </Section>
  )
}