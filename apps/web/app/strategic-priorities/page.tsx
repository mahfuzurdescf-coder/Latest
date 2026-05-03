import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Strategic Priorities',
  description:
    'DESCF’s strategic priorities focus on snake conservation awareness, biodiversity documentation, conservation communication, human-wildlife coexistence, and institutional growth.',
  canonicalUrl: 'https://www.descf.org/strategic-priorities',
})

const prioritiesJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://www.descf.org' },
  { name: 'Strategic Priorities', url: 'https://www.descf.org/strategic-priorities' },
])

const PRIORITIES = [
  {
    title: 'Snake conservation awareness',
    description:
      'Develop clear public communication that reduces fear, misinformation, and harmful responses toward snakes while promoting coexistence-oriented knowledge.',
  },
  {
    title: 'Biodiversity documentation',
    description:
      'Strengthen responsible field documentation, ecological learning, and species-focused communication without exposing sensitive wildlife locations.',
  },
  {
    title: 'Conservation education',
    description:
      'Create accessible learning materials, articles, visual resources, and awareness content for students, communities, and general audiences.',
  },
  {
    title: 'Human-wildlife coexistence',
    description:
      'Promote practical understanding of how people and wildlife can share landscapes through informed, responsible, and locally relevant action.',
  },
  {
    title: 'Institutional credibility',
    description:
      'Build a stronger public-facing portfolio through structured programmes, governance information, resources, partnership pages, and transparent communication.',
  },
  {
    title: 'Nature storytelling',
    description:
      'Prepare the foundation for Nature Tales as a separate editorial platform for Bangladesh nature, wildlife stories, field notes, and conservation writing.',
  },
]

const ROADMAP = [
  'Strengthen DESCF’s institutional website as a credible conservation portfolio',
  'Improve CMS-driven programme, resource, and article publishing',
  'Develop editorial standards for nature storytelling and wildlife communication',
  'Build partnership-ready pages for institutions, media, educators, and conservation organisations',
  'Prepare Nature Tales as a separate subdomain and editorial portal',
]

export default function StrategicPrioritiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prioritiesJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Strategic priorities</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Focused priorities for credible conservation communication.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF’s strategic direction should stay disciplined: strengthen conservation
                awareness, document biodiversity responsibly, support coexistence, and build
                institutional trust before expanding into larger editorial and programme work.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Priority areas"
              title="A focused conservation portfolio"
              description="These priorities help DESCF avoid scattered activities and present itself as a serious Bangladesh-based conservation organisation."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PRIORITIES.map((priority) => (
                <Card key={priority.title}>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {priority.title}
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {priority.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="section-label mb-3">Roadmap</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  The website should support institutional growth, not just display information.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  DESCF’s digital system should make the organisation easier to understand,
                  easier to trust, and easier to partner with. That means clear priorities,
                  structured publishing, accessible pages, and a CMS that supports real work.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/current-work" variant="primary">
                    Current work
                  </Button>
                  <Button href="/partner" variant="secondary">
                    Partner with DESCF
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Implementation direction
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {ROADMAP.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}