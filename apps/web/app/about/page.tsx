import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'about'

const fallbackSeo = {
  title: 'About DESCF',
  description:
    'Learn about Deep Ecology and Snake Conservation Foundation, its conservation communication, public awareness, field learning, and human-wildlife coexistence work in Bangladesh.',
  canonicalUrl: 'https://descf.org/about',
}

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'About DESCF', url: 'https://descf.org/about' },
])

const fallbackHero = {
  eyebrow: 'About DESCF',
  title:
    'A conservation organisation built around learning, trust, and coexistence.',
  description:
    'Deep Ecology and Snake Conservation Foundation works at the intersection of biodiversity conservation, snake awareness, ecological education, responsible communication, and public engagement in Bangladesh.',
  primaryCta: { label: 'চলমান কাজ দেখুন', href: '/current-work' },
  secondaryCta: { label: 'ডিইএসসিএফের সঙ্গে যোগাযোগ করুন', href: '/contact' },
}

const workAreas = [
  {
    eyebrow: 'Awareness',
    title: 'Public understanding before panic',
    text: 'DESCF works to make biodiversity, snakes, and human-wildlife coexistence easier to understand through calm, accurate, and responsible communication.',
  },
  {
    eyebrow: 'Field learning',
    title: 'Knowledge connected to place',
    text: 'Field observation, ecological context, and community experience should shape how conservation messages are explained to the public.',
  },
  {
    eyebrow: 'Documentation',
    title: 'A credible public record',
    text: 'Events, resources, reports, and media materials should gradually become a public archive of verified DESCF work.',
  },
]

const standards = [
  'Use careful, verifiable language.',
  'Avoid fear-based wildlife messaging.',
  'Connect science with public education.',
  'Show work through programmes, events, resources, and people.',
]

async function getAboutPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPageContent()

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

function FallbackAboutSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">What DESCF does</p>
            <h2 className="text-h2 text-earth-950">
              Conservation work becomes stronger when public communication is
              responsible.
            </h2>
            <p className="mt-5 text-body text-earth-700">
              The site should explain DESCF through concrete work areas instead
              of vague institutional claims.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6 shadow-card"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-forest-800">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-sm text-earth-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label mb-4">জনসম্মুখে প্রকাশের মানদণ্ড</p>
              <h2 className="text-h2 text-earth-950">
                The brand should feel calm, credible, and careful.
              </h2>
              <p className="mt-5 max-w-xl text-body text-earth-700">
                DESCF’s public identity should not depend on loud claims. It
                should depend on trust, evidence, field learning, and consistent
                conservation language.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
              <div className="grid gap-3 sm:grid-cols-2">
                {standards.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-earth-100 bg-earth-50 px-4 py-4 text-sm font-semibold leading-6 text-earth-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 section-label text-gold-300">Next step</p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Understand the mission, then follow the work.
                </h2>
                <p className="mt-4 max-w-2xl text-body-sm text-forest-100/75">
                  Visitors should be able to move from institutional identity to
                  mission, programmes, resources, events, and contact routes
                  without confusion.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/mission" className="btn-light px-5 py-3 text-sm">
                  মিশন ও ভিশন
                </Link>
                <Link
                  href="/team"
                  className="btn-outline-light px-5 py-3 text-sm"
                >
                  টিম দেখুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function AboutPage() {
  const page = await getAboutPageContent()

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-earth-200 bg-[#fbf7ed] bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]">
        <div className="container-site py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="section-label mb-5">{heroEyebrow}</p>
              <h1 className="max-w-4xl text-h1 text-earth-950">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-body-lg text-earth-700">
                {heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink
                  link={primaryCta}
                  className="btn-primary px-5 py-3 text-sm"
                />
                <ActionLink
                  link={secondaryCta}
                  className="btn-secondary px-5 py-3 text-sm"
                />
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-forest-950 p-8 text-white shadow-card-lg">
              <p className="section-label text-gold-300">
                Institution principle
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                DESCF should look like a serious conservation platform, not a
                random activity page.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                Every public page should help visitors understand what DESCF
                does, why it matters, and how the work supports safer
                biodiversity awareness.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">01</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Awareness
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">02</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Learning
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">03</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Trust
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackAboutSections />
      )}
    </main>
  )
}
