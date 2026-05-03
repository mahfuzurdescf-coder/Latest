import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'evidence-resources'

const fallbackSeo = {
  title: 'তথ্যপ্রমাণ ও রিসোর্স | DESCF',
  description:
    'DESCF evidence-based conservation resources, safety notes, explainers, and field learning materials.',
  canonicalUrl: 'https://descf.org/evidence-resources',
}

const fallbackHero = {
  eyebrow: 'তথ্যপ্রমাণ ও রিসোর্স',
  title: 'Evidence-based learning for safer biodiversity awareness.',
  description:
    'This section should hold DESCF’s public explainers, learning resources, safety notes, field evidence, and conservation education materials in a structured, responsible format.',
  primaryCta: { label: 'রিসোর্সে ফিরুন', href: '/resources' },
  secondaryCta: {
    label: 'Snake field guide',
    href: '/bangladesh-wildlife/snakes',
  },
}

const resourceTypes = [
  {
    label: 'Safety',
    title: 'সাপ ও বন্যপ্রাণী নিরাপত্তা নোট',
    text: 'Public guidance should reduce fear, discourage risky handling, and support safer response.',
  },
  {
    label: 'Evidence',
    title: 'Field-informed learning',
    text: 'Resources should connect observation, documentation, ecological context, and responsible communication.',
  },
  {
    label: 'Explainers',
    title: 'সহজ জনশিক্ষা',
    text: 'Complex biodiversity issues should be explained in language that general readers can understand.',
  },
]

async function getEvidencePageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEvidencePageContent()

  return buildMetadata({
    title: page?.seo?.seoTitle || fallbackSeo.title,
    description:
      page?.seo?.seoDescription ||
      page?.heroDescription ||
      fallbackSeo.description,
    canonicalUrl: page?.seo?.canonicalUrl || fallbackSeo.canonicalUrl,
  })
}

function isExternalLink(link?: NavLink) {
  if (!link?.href) return false
  return link.isExternal || /^https?:\/\//.test(link.href)
}

function ActionLink({
  link,
  className,
}: {
  link?: NavLink
  className: string
}) {
  if (!link?.href || !link.label) return null

  if (isExternalLink(link)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

function hasSectionContent(section: PageSection) {
  return Boolean(
    section.eyebrow ||
      section.title ||
      section.description ||
      section.primaryCta?.href ||
      section.secondaryCta?.href ||
      (section.cards && section.cards.length > 0),
  )
}

function StudioSections({ sections }: { sections: PageSection[] }) {
  const visibleSections = sections.filter(hasSectionContent)

  if (visibleSections.length === 0) return null

  return (
    <>
      {visibleSections.map((section, index) => {
        const theme = section.theme || (index % 2 === 0 ? 'white' : 'earth')
        const isForest = theme === 'forest'

        const sectionClass =
          theme === 'forest'
            ? 'border-b border-white/10 bg-forest-950 text-white'
            : theme === 'earth'
              ? 'border-b border-earth-200 bg-[#f7f3ec]'
              : 'border-b border-earth-200 bg-white'

        const headingClass = isForest
          ? 'text-h2 text-white'
          : 'text-h2 text-earth-950'

        const bodyClass = isForest
          ? 'mt-5 max-w-3xl text-body text-forest-100/75'
          : 'mt-5 max-w-3xl text-body text-earth-700'

        const cardClass = isForest
          ? 'rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-card'
          : theme === 'earth'
            ? 'rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card'
            : 'rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6 shadow-card'

        const cardTextClass = isForest
          ? 'mt-4 text-body-sm text-forest-100/75'
          : 'mt-4 text-body-sm text-earth-700'

        return (
          <section
            key={section._key || section.sectionId || section.title || index}
            id={section.sectionId}
            className={sectionClass}
          >
            <div className="container-site py-14 md:py-16 lg:py-20">
              {(section.eyebrow || section.title || section.description) && (
                <div className="mb-10 max-w-3xl">
                  {section.eyebrow && (
                    <p
                      className={
                        isForest
                          ? 'section-label mb-4 text-gold-300'
                          : 'section-label mb-4'
                      }
                    >
                      {section.eyebrow}
                    </p>
                  )}

                  {section.title && (
                    <h2 className={headingClass}>{section.title}</h2>
                  )}

                  {section.description && (
                    <p className={bodyClass}>{section.description}</p>
                  )}
                </div>
              )}

              {section.cards && section.cards.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card) => (
                    <article key={card._key || card.title} className={cardClass}>
                      {card.eyebrow && (
                        <p
                          className={
                            isForest
                              ? 'section-label text-gold-300'
                              : 'section-label'
                          }
                        >
                          {card.eyebrow}
                        </p>
                      )}

                      <h3
                        className={
                          isForest
                            ? 'mt-4 font-serif text-2xl leading-tight text-white'
                            : 'mt-4 font-serif text-2xl leading-tight text-earth-950'
                        }
                      >
                        {card.title}
                      </h3>

                      {card.text && (
                        <p className={cardTextClass}>{card.text}</p>
                      )}

                      {card.link?.href && (
                        <div className="mt-5">
                          <ActionLink
                            link={card.link}
                            className={
                              isForest
                                ? 'btn-outline-light px-4 py-2 text-sm'
                                : 'btn-secondary px-4 py-2 text-sm'
                            }
                          />
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {(section.primaryCta?.href || section.secondaryCta?.href) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <ActionLink
                    link={section.primaryCta}
                    className={
                      isForest
                        ? 'btn-light px-5 py-3 text-sm'
                        : 'btn-primary px-5 py-3 text-sm'
                    }
                  />

                  <ActionLink
                    link={section.secondaryCta}
                    className={
                      isForest
                        ? 'btn-outline-light px-5 py-3 text-sm'
                        : 'btn-secondary px-5 py-3 text-sm'
                    }
                  />
                </div>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}

function FallbackEvidenceSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">Resource types</p>
          <h2 className="mt-4 max-w-3xl text-h2 text-earth-950">
            Build a resource library people can actually use.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {resourceTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-white p-7 shadow-card"
              >
                <p className="section-label">{item.label}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-sm text-earth-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] border border-dashed border-earth-300 bg-earth-50 p-10">
            <p className="section-label">Resource library</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-earth-950">
              তথ্যপ্রমাণভিত্তিক রিসোর্স প্রস্তুত করা হচ্ছে।
            </h2>
            <p className="mt-5 max-w-3xl text-body text-earth-700">
              Later, Sanity can manage resource title, category, summary,
              downloadable file, related species, related programme, and public
              safety note. Do not rush content before the structure is stable.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function EvidenceResourcesPage() {
  const page = await getEvidencePageContent()

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description
  const primaryCta = page?.primaryCta?.href
    ? page.primaryCta
    : fallbackHero.primaryCta
  const secondaryCta = page?.secondaryCta?.href
    ? page.secondaryCta
    : fallbackHero.secondaryCta

  const hasStudioSections =
    page?.sections && page.sections.some((section) => hasSectionContent(section))

  return (
    <main>
      <section className="border-b border-white/10 bg-forest-950 text-white">
        <div className="container-site py-16 lg:py-20">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="section-label mb-5 text-gold-300">
                {heroEyebrow}
              </p>
              <h1 className="max-w-3xl text-h1">{heroTitle}</h1>
              <p className="mt-8 max-w-2xl text-body-lg text-forest-100/80">
                {heroDescription}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ActionLink
                  link={primaryCta}
                  className="btn-light px-6 py-3 text-sm"
                />
                <ActionLink
                  link={secondaryCta}
                  className="btn-outline-light px-6 py-3 text-sm"
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 shadow-card-lg">
              <p className="section-label text-gold-300">
                Resource principle
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
                আগে শিক্ষা, আতঙ্ক নয়।
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                DESCF resources should help people understand nature before
                fearing it. The tone must stay calm, accurate, practical, and
                safety-first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackEvidenceSections />
      )}
    </main>
  )
}
