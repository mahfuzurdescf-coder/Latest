import { ProgrammeCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

interface HomeProgrammesProps {
  programmes: ProgrammeCardType[]
}

export function HomeProgrammes({ programmes }: HomeProgrammesProps) {
  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Programmes"
            title="Conservation work with institutional purpose"
            description="DESCF programmes bring together field learning, public awareness, research, and practical conservation communication."
            className="mb-0"
          />

          <Button href="/programmes" variant="secondary">
            View all programmes
          </Button>
        </div>

        {programmes.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.slice(0, 6).map((programme) => (
              <ProgrammeCard key={programme._id} programme={programme} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="Programme information is being prepared"
              description="Published programme details will appear here after they are added in the CMS."
              actionLabel="Contact DESCF"
              actionHref="/contact"
            />
          </div>
        )}
      </Container>
    </Section>
  )
}
