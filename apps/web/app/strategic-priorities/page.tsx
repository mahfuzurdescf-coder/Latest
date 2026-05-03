import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'strategic-priorities'

const fallbackMetadata = {
  title: 'Strategic Priorities',
  description:
    'DESCF’s strategic priorities focus on snake conservation awareness, biodiversity documentation, conservation communication, human-wildlife coexistence, and institutional growth.',
}

const fallbackHero = {
  eyebrow: 'Strategic priorities',
  title: 'Focused priorities for credible conservation communication.',
  description:
    'DESCF’s strategic direction should stay disciplined: strengthen conservation awareness, document biodiversity responsibly, support coexistence, and build institutional trust before expanding into larger editorial and programme work.',
}

const fallbackPrioritySection = {
  eyebrow: 'Priority areas',
  title: 'A focused conservation portfolio',
  description:
    'These priorities help DESCF avoid scattered activities and present itself as a serious Bangladesh-based conservation organisation.',
}

const fallbackPriorities = [
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

const fallbackRoadmap = {
  eyebrow: 'Roadmap',
  title: 'The website should support institutional growth, not just display information.',
  description:
    'DESCF’s digital system should make the organisation easier to understand, easier to trust, and easier to partner with. That means clear priorities, structured publishing, accessible pages, and a CMS that supports real work.',
  primaryCta: { label: 'Current work', href: '/current-work' },
  secondaryCta: { label: 'Partner with DESCF', href: '/partner' },
}

const fallbackRoadmapCard = {
  title: 'Implementation direction',
  items: [
    'Strengthen DESCF’s institutional website as a credible conservation portfolio',
    'Improve CMS-driven programme, resource, and article publishing',
    'Develop editorial standards for nature storytelling and wildlife communication',
    'Build partnership-ready pages for institutions, media, educators, and conservation organisations',
    'Prepare Nature Tales as a separate subdomain and editorial portal',
  ],
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function getLink(link: NavLink | undefined, fallback: NavLink) {
  return {
    label: link?.label || fallback.label,
    href: link?.href || fallback.href,
  }
}

function getSeo(page: PageContent | null) {
  return (page as (PageContent & { seo?: { title?: string; description?: string } }) | null)?.seo
}

async function getStrategicPrioritiesPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStrategicPrioritiesPageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/strategic-priorities',
  })
}

export default async function StrategicPrioritiesPage() {
  const page = await getStrategicPrioritiesPageContent()
  const sections = page?.sections ?? []

  const prioritySection = getSection(sections, 'priority-areas')
  const roadmapSection = getSection(sections, 'roadmap')
  const roadmapCardSection = getSection(sections, 'roadmap-card')

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description

  const priorityEyebrow = prioritySection?.eyebrow || fallbackPrioritySection.eyebrow
  const priorityTitle = prioritySection?.title || fallbackPrioritySection.title
  const priorityDescription =
    prioritySection?.description || fallbackPrioritySection.description

  const priorities =
    prioritySection?.cards && prioritySection.cards.length > 0
      ? prioritySection.cards.map((card) => ({
          title: card.title,
          description: card.text || '',
        }))
      : fallbackPriorities

  const roadmapEyebrow = roadmapSection?.eyebrow || fallbackRoadmap.eyebrow
  const roadmapTitle = roadmapSection?.title || fallbackRoadmap.title
  const roadmapDescription = roadmapSection?.description || fallbackRoadmap.description
  const primaryCta = getLink(roadmapSection?.primaryCta, fallbackRoadmap.primaryCta)
  const secondaryCta = getLink(
    roadmapSection?.secondaryCta,
    fallbackRoadmap.secondaryCta
  )

  const roadmapCardTitle = roadmapCardSection?.title || fallbackRoadmapCard.title
  const roadmapItems =
    roadmapCardSection?.cards && roadmapCardSection.cards.length > 0
      ? roadmapCardSection.cards
          .map((card) => card.title || card.text)
          .filter((item): item is string => Boolean(item))
      : fallbackRoadmapCard.items

  const prioritiesJsonLd = buildBreadcrumbJSONLD([
    { name: 'Home', url: 'https://www.descf.org' },
    { name: heroTitle, url: 'https://www.descf.org/strategic-priorities' },
  ])

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
              <p className="section-label mb-4">{heroEyebrow}</p>
              <h1 className="font-serif text-h1 text-earth-950">{heroTitle}</h1>
              <p className="mt-5 text-body-lg text-earth-700">
                {heroDescription}
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow={priorityEyebrow}
              title={priorityTitle}
              description={priorityDescription}
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {priorities.map((priority) => (
                <Card key={priority.title}>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {priority.title}
                    </h2>
                    {priority.description ? (
                      <p className="mt-3 text-body-sm text-earth-700">
                        {priority.description}
                      </p>
                    ) : null}
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
                <p className="section-label mb-3">{roadmapEyebrow}</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  {roadmapTitle}
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  {roadmapDescription}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={primaryCta.href} variant="primary">
                    {primaryCta.label}
                  </Button>
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    {roadmapCardTitle}
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {roadmapItems.map((item) => (
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
