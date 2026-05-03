import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'mission'

const fallbackSeo = {
  title: 'মিশন ও ভিশন',
  description:
    'Read the mission, vision, and working principles of Deep Ecology and Snake Conservation Foundation.',
  canonicalUrl: 'https://www.descf.org/mission',
}

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://www.descf.org' },
  { name: 'মিশন ও ভিশন', url: 'https://www.descf.org/mission' },
])

const fallbackHero = {
  eyebrow: 'মিশন ও ভিশন',
  title: 'Public conservation learning for safer coexistence.',
  description:
    'DESCF’s mission is to strengthen biodiversity awareness, snake conservation communication, field-informed learning, and responsible human-wildlife coexistence in Bangladesh.',
  primaryCta: { label: 'চলমান কাজ দেখুন', href: '/current-work' },
  secondaryCta: { label: 'প্রোগ্রাম দেখুন', href: '/programmes' },
}

const missionPoints = [
  {
    title: 'Public biodiversity understanding',
    text: 'Support people to understand wildlife, snakes, ecosystems, and coexistence through accessible conservation communication.',
  },
  {
    title: 'Safer human-wildlife response',
    text: 'Reduce panic, misinformation, risky handling, and harmful reactions by sharing calm, safety-first public guidance.',
  },
  {
    title: 'Field-informed learning',
    text: 'Connect awareness work with observation, ecological context, field documentation, and responsible knowledge sharing.',
  },
]

const principles = [
  {
    title: 'Careful communication',
    text: 'Conservation messages should be accurate, calm, and useful for general visitors.',
  },
  {
    title: 'Evidence before claim',
    text: 'Public claims should be verified before they are placed on the website or shared as institutional impact.',
  },
  {
    title: 'Education before reaction',
    text: 'Wildlife communication should help people respond safely instead of creating fear or confusion.',
  },
]

async function getMissionPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMissionPageContent()

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

function FallbackMissionSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="section-label mb-4">মিশন</p>
            <h2 className="text-h2 text-earth-950">
              Make conservation understandable, practical, and safe.
            </h2>
            <p className="mt-5 max-w-2xl text-body text-earth-700">
              DESCF should explain biodiversity in a way that students,
              communities, educators, media teams, and institutions can actually
              use.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {missionPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-7 shadow-card"
              >
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-earth-950">
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
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="section-label mb-4">Vision</p>
              <h2 className="text-h2 text-earth-950">
                Build a public culture of responsible coexistence.
              </h2>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
              <p className="text-body text-earth-700">
                DESCF’s long-term vision is to contribute to a society where
                biodiversity is valued, snakes and wildlife are understood with
                ecological context, and public response is guided by education,
                safety, and respect for nature.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Conservation education',
                  'Safer public response',
                  'Field documentation',
                  'Responsible storytelling',
                ].map((item) => (
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

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Working principles</p>
            <h2 className="text-h2 text-earth-950">
              The mission should control the tone of every public page.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-7 shadow-card"
              >
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-earth-950">
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

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 section-label text-gold-300">Next step</p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Turn mission into visible public work.
                </h2>
                <p className="mt-4 max-w-2xl text-body-sm text-forest-100/75">
                  The mission only matters if visitors can see programmes,
                  events, resources, governance standards, and people behind the
                  work.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/resources" className="btn-light px-5 py-3 text-sm">
                  রিসোর্স দেখুন
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline-light px-5 py-3 text-sm"
                >
                  ডিইএসসিএফের সঙ্গে যোগাযোগ করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function MissionPage() {
  const page = await getMissionPageContent()

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
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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
              <p className="section-label text-gold-300">Working direction</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                Mission is not decoration. It must guide visible work.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                The mission should be reflected across programmes, events,
                resources, governance standards, media language, and team
                representation.
              </p>
              <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">
                  Long-term vision
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight">
                  A Bangladesh where wildlife is understood through knowledge,
                  not fear.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackMissionSections />
      )}
    </main>
  )
}
