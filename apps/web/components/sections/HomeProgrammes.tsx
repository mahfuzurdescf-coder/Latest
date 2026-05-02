import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { ProgrammeCard as ProgrammeCardType } from '@/types/sanity'

interface HomeProgrammesProps {
  programmes: ProgrammeCardType[]
}

export function HomeProgrammes({ programmes }: HomeProgrammesProps) {
  const validProgrammes = programmes.filter((programme) => programme.slug?.current)

  if (!validProgrammes.length) return null

  const featured = validProgrammes[0]
  const supporting = validProgrammes.slice(1, 3)

  return (
    <Section className="bg-white !py-12 md:!py-14 lg:!py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Current Work"
              title="Institutional conservation work with practical purpose"
              description="DESCF’s work should be presented with focus, restraint, and credibility—showing clear conservation priorities rather than a scattered list of activities."
              className="mb-0 max-w-xl"
            />

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/current-work" variant="primary">
                Explore current work
              </Button>
              <Button href="/programmes" variant="secondary">
                View programmes
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-earth-200/80 bg-earth-50 p-6 shadow-card md:p-8">
            <p className="section-label mb-4">Featured programme</p>

            <h3 className="font-serif text-3xl leading-tight text-earth-950 md:text-4xl">
              {featured.title}
            </h3>

            {featured.shortDescription && (
              <p className="mt-5 max-w-2xl text-body leading-8 text-earth-600">
                {featured.shortDescription}
              </p>
            )}

            <div className="mt-7">
              <Button href={`/programmes/${featured.slug.current}`} variant="secondary">
                Learn more about this work
              </Button>
            </div>

            {supporting.length > 0 && (
              <div className="mt-8 grid gap-4 border-t border-earth-200 pt-6 md:grid-cols-2">
                {supporting.map((programme) => (
                  <a
                    key={programme._id}
                    href={`/programmes/${programme.slug.current}`}
                    className="rounded-2xl border border-earth-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-card"
                  >
                    <p className="text-label font-semibold uppercase tracking-[0.18em] text-forest-700">
                      Programme
                    </p>

                    <h4 className="mt-3 font-serif text-xl leading-tight text-earth-950">
                      {programme.title}
                    </h4>

                    {programme.shortDescription && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-earth-600">
                        {programme.shortDescription}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}