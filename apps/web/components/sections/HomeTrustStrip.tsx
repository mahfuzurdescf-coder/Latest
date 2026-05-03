import { Container } from '@/components/ui/Container'
import type { PageSection } from '@/types/sanity'

type PillarItem = {
  label: string
  title: string
  description: string
}

const fallbackPillars: PillarItem[] = [
  {
    label: 'Coexistence',
    title: 'Reducing fear, improving response',
    description:
      'DESCF works to replace panic and misinformation with practical awareness, safer behaviour, and respect for wildlife.',
  },
  {
    label: 'Knowledge',
    title: 'Field-based conservation learning',
    description:
      'Observation, documentation, ecological education, and species learning help make conservation more grounded and useful.',
  },
  {
    label: 'Communication',
    title: 'Making nature understandable',
    description:
      'DESCF connects science, public education, media awareness, and storytelling so people can understand biodiversity better.',
  },
]

function buildPillars(content?: PageSection): PillarItem[] {
  const cards = content?.cards?.filter(
    (card) => card.title || card.text || card.eyebrow,
  )

  if (!cards?.length) return fallbackPillars

  return cards.slice(0, 3).map((card, index) => {
    const fallback = fallbackPillars[index] ?? fallbackPillars[0]

    return {
      label: card.eyebrow || fallback.label,
      title: card.title || fallback.title,
      description: card.text || fallback.description,
    }
  })
}

interface HomeTrustStripProps {
  content?: PageSection
}

export function HomeTrustStrip({ content }: HomeTrustStripProps) {
  const pillars = buildPillars(content)

  return (
    <section
      aria-label={content?.eyebrow || 'Why DESCF exists'}
      className="border-b border-earth-200 bg-white"
    >
      <Container className="py-12 md:py-14 lg:py-16">
        <div className="mb-7 max-w-3xl">
          <p className="section-label mb-3">
            {content?.eyebrow || 'Why DESCF exists'}
          </p>
          <h2 className="font-serif text-h2 text-earth-950">
            {content?.title ||
              'Conservation becomes stronger when people understand nature before fearing it.'}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-earth-600">
            {content?.description ||
              'DESCF’s work is built around a simple institutional purpose: make biodiversity knowledge more accessible, reduce harmful responses to wildlife, and support coexistence through education and field-based conservation communication.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={`${pillar.label}-${pillar.title}`}
              className="rounded-3xl border border-earth-200/80 bg-earth-50 p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-forest-200 hover:bg-white hover:shadow-card-lg"
            >
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-forest-700">
                {pillar.label}
              </p>

              <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                {pillar.title}
              </h3>

              <p className="mt-4 text-body-sm leading-7 text-earth-600">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
