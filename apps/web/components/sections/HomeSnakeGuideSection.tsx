import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const SNAKES_BD = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09be\u09aa'

const guidePoints = [
  {
    label: 'Identification',
    title: 'Names, clues, and species profiles',
    description:
      'Browse Bangla names, English names, scientific names, quick identification notes, and profile pages.',
  },
  {
    label: 'Safety',
    title: 'Awareness without panic',
    description:
      'The guide is designed for public education, safer response, and coexistence - not snake handling or risky behaviour.',
  },
  {
    label: 'Field guide',
    title: 'A growing database for Bangladesh',
    description:
      "DESCF's snake section can grow into a structured, searchable field-guide style resource for students and nature learners.",
  },
]

export function HomeSnakeGuideSection() {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]" />

      <Container className="relative py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-normal text-bark-300">
              {SNAKES_BD}
            </p>

            <h2 className="mt-4 font-serif text-h2 leading-tight text-white">
              A calm, scientific field guide to the snakes of Bangladesh.
            </h2>

            <p className="mt-5 max-w-2xl text-body leading-8 text-forest-100">
              DESCF&apos;s snake database should feel different from the institutional pages:
              darker, focused, field-guide inspired, and built around learning, safety,
              and respect for wildlife.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/bangladesh-wildlife/snakes" variant="cta">
                Explore snake database
              </Button>
              <Button
                href="/prokriti-kotha"
                variant="secondary"
                className="border-forest-200 text-forest-50 hover:bg-white/10"
              >
                Read related stories
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {guidePoints.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-bark-300/70 hover:bg-white/[0.08]"
              >
                <p className="text-label font-semibold uppercase tracking-[0.18em] text-bark-300">
                  {item.label}
                </p>

                <h3 className="mt-3 font-serif text-2xl leading-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-body-sm leading-7 text-forest-100">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
