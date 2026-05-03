import type { Metadata } from 'next'
import Link from 'next/link'

import { ResourceCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import {
  PAGE_CONTENT_BY_KEY_QUERY,
  RESOURCES_PAGE_QUERY,
} from '@/lib/sanity/queries'
import type {
  NavLink,
  PageContent,
  PageSection,
  ResourceCard as ResourceCardType,
} from '@/types/sanity'

const PAGE_KEY = 'reports'

const fallbackSeo = {
  title: 'Reports and Publications',
  description:
    'DESCF reports, briefs, publications, and conservation resources related to biodiversity, awareness, and human-wildlife coexistence.',
  canonicalUrl: 'https://www.descf.org/reports',
}

const fallbackHero = {
  eyebrow: 'Reports',
  title: 'Reports, briefs, and publications',
  description:
    'This section is prepared for DESCF reports, briefs, concept notes, and conservation publications. Published resources are managed through Sanity CMS.',
  primaryCta: { label: 'All resources', href: '/evidence-resources' },
  secondaryCta: { label: 'Reports & publications', href: '/reports-publications' },
}

const fallbackListSection = {
  eyebrow: 'Published reports',
  title: 'Published reports',
  description:
    'Reports should support transparency, learning, programme communication, and responsible public knowledge.',
}

const fallbackEmptyState = {
  title: 'No reports published yet',
  description:
    'DESCF reports will appear here after they are added and published in Sanity CMS.',
  actionLabel: 'View all resources',
  actionHref: '/evidence-resources',
}

const fallbackBriefsSection = {
  eyebrow: 'Briefs and concept notes',
  title: 'Briefs, notes, and supporting publications',
  description:
    'Briefs and concept notes can support public learning, programme communication, and responsible conservation documentation.',
}

const reportsJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://www.descf.org' },
  { name: 'Reports and Publications', url: 'https://www.descf.org/reports' },
])

async function getReportsPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

async function getResources() {
  return sanityFetch<ResourceCardType[]>({
    query: RESOURCES_PAGE_QUERY,
    tags: ['resource'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getReportsPageContent()

  return buildMetadata({
    title: page?.seo?.seoTitle || fallbackSeo.title,
    description:
      page?.seo?.seoDescription ||
      page?.heroDescription ||
      fallbackSeo.description,
    canonicalUrl: page?.seo?.canonicalUrl || fallbackSeo.canonicalUrl,
  })
}

function getSection(sections: PageSection[], sectionId: string) {
  return sections.find((section) => section.sectionId === sectionId)
}

function hasSectionContent(section?: PageSection) {
  if (!section) return false

  return Boolean(
    section.eyebrow ||
      section.title ||
      section.description ||
      section.primaryCta?.href ||
      section.secondaryCta?.href ||
      (section.cards && section.cards.length > 0),
  )
}

function SectionButton({
  link,
  variant = 'secondary',
}: {
  link?: NavLink
  variant?: 'primary' | 'secondary' | 'cta'
}) {
  if (!link?.href || !link.label) return null

  return (
    <Button href={link.href} variant={variant}>
      {link.label}
    </Button>
  )
}

function EmptyReportsState({ section }: { section?: PageSection }) {
  const card = section?.cards?.[0]
  const title = card?.title || section?.title || fallbackEmptyState.title
  const description =
    card?.text || section?.description || fallbackEmptyState.description
  const action = card?.link || section?.primaryCta || {
    label: fallbackEmptyState.actionLabel,
    href: fallbackEmptyState.actionHref,
  }

  return (
    <div className="rounded-[1.75rem] border border-dashed border-earth-300 bg-earth-50 p-8 text-center">
      <p className="section-label mb-3">
        {section?.eyebrow || 'No public reports yet'}
      </p>

      <h3 className="font-serif text-3xl leading-tight text-earth-950">
        {title}
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-body-sm leading-7 text-earth-700">
        {description}
      </p>

      {action.href && action.label && (
        <div className="mt-6">
          <Button href={action.href} variant="primary">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

function StudioIntroSections({ sections }: { sections: PageSection[] }) {
  const visibleSections = sections
    .filter(
      (section) =>
        !['reports-list', 'empty-state', 'briefs-list'].includes(
          section.sectionId || '',
        ),
    )
    .filter(hasSectionContent)

  if (!visibleSections.length) return null

  return (
    <>
      {visibleSections.map((section, index) => {
        const isForest = section.theme === 'forest'
        const sectionClass = isForest
          ? 'bg-[#10200f] text-white'
          : section.theme === 'earth'
            ? 'border-b border-earth-200 bg-earth-50'
            : 'border-b border-earth-200 bg-white'

        const titleClass = isForest ? 'text-white' : 'text-earth-950'
        const textClass = isForest ? 'text-earth-100' : 'text-earth-700'
        const cardClass = isForest
          ? 'border-white/10 bg-white/[0.06]'
          : 'border-earth-200 bg-white'

        return (
          <section key={section._key || section.sectionId || index} className={sectionClass}>
            <Container className="py-14 md:py-16">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  {section.eyebrow && (
                    <p className={`section-label mb-4 ${isForest ? 'text-forest-300' : ''}`}>
                      {section.eyebrow}
                    </p>
                  )}

                  {section.title && (
                    <h2 className={`font-serif text-4xl leading-tight sm:text-5xl ${titleClass}`}>
                      {section.title}
                    </h2>
                  )}

                  {section.description && (
                    <p className={`mt-5 text-body leading-8 ${textClass}`}>
                      {section.description}
                    </p>
                  )}

                  {(section.primaryCta?.href || section.secondaryCta?.href) && (
                    <div className="mt-7 flex flex-wrap gap-3">
                      <SectionButton link={section.primaryCta} variant="primary" />
                      <SectionButton link={section.secondaryCta} variant="secondary" />
                    </div>
                  )}
                </div>

                {section.cards && section.cards.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.cards.map((card) => (
                      <article
                        key={card._key || card.title}
                        className={`rounded-[1.5rem] border p-6 shadow-card ${cardClass}`}
                      >
                        {card.eyebrow && (
                          <p className={`section-label mb-3 ${isForest ? 'text-forest-300' : ''}`}>
                            {card.eyebrow}
                          </p>
                        )}

                        <h3 className={`font-serif text-2xl leading-tight ${titleClass}`}>
                          {card.title}
                        </h3>

                        {card.text && (
                          <p className={`mt-3 text-body-sm leading-7 ${textClass}`}>
                            {card.text}
                          </p>
                        )}

                        {card.link?.href && card.link.label && (
                          <div className="mt-5">
                            <Button href={card.link.href} variant={isForest ? 'cta' : 'secondary'}>
                              {card.link.label}
                            </Button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </Container>
          </section>
        )
      })}
    </>
  )
}

export default async function ReportsPage() {
  const [page, resources] = await Promise.all([
    getReportsPageContent(),
    getResources(),
  ])

  const sections = page?.sections ?? []
  const listSection = getSection(sections, 'reports-list')
  const emptySection = getSection(sections, 'empty-state')
  const briefsSection = getSection(sections, 'briefs-list')

  const reports = resources.filter((resource) => resource.type === 'report')
  const briefs = resources.filter(
    (resource) => resource.type === 'brief' || resource.type === 'concept-note',
  )

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = page?.primaryCta?.href ? page.primaryCta : fallbackHero.primaryCta
  const secondaryCta = page?.secondaryCta?.href ? page.secondaryCta : fallbackHero.secondaryCta

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportsJsonLd) }}
      />

      <main id="main-content">
        <section className="bg-earth-50">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_0.75fr] lg:items-end">
              <div>
                <p className="section-label mb-4">{heroEyebrow}</p>
                <h1 className="max-w-3xl text-h1">{heroTitle}</h1>
                <p className="mt-6 max-w-2xl text-body text-earth-700">
                  {heroDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={primaryCta.href} variant="primary">
                    {primaryCta.label}
                  </Button>
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </Button>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-earth-200 bg-white p-6 shadow-card">
                <p className="section-label mb-3">
                  {listSection?.eyebrow || 'Report principle'}
                </p>
                <p className="text-body-sm leading-7 text-earth-700">
                  {listSection?.description ||
                    'A report should strengthen trust, not just fill space. Publish only verified, useful, and properly described documents.'}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <StudioIntroSections sections={sections} />

        <section className="bg-white">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow={listSection?.eyebrow || fallbackListSection.eyebrow}
              title={listSection?.title || fallbackListSection.title}
              description={
                listSection?.description || fallbackListSection.description
              }
            />

            {reports.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <EmptyReportsState section={emptySection} />
            )}
          </Container>
        </section>

        {(briefs.length > 0 || hasSectionContent(briefsSection)) && (
          <section className="border-t border-earth-200 bg-earth-50">
            <Container className="py-16 md:py-20">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeader
                  eyebrow={briefsSection?.eyebrow || fallbackBriefsSection.eyebrow}
                  title={briefsSection?.title || fallbackBriefsSection.title}
                  description={
                    briefsSection?.description || fallbackBriefsSection.description
                  }
                  className="mb-0 max-w-3xl"
                />

                <Link
                  href={briefsSection?.primaryCta?.href || '/evidence-resources'}
                  className="text-sm font-semibold text-forest-700 hover:text-forest-950"
                >
                  {briefsSection?.primaryCta?.label || 'All resources'}{' '}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>

              {briefs.length > 0 && (
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {briefs.slice(0, 4).map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                  ))}
                </div>
              )}
            </Container>
          </section>
        )}
      </main>
    </>
  )
}
