import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'resources'

const fallbackSeo = {
  title: 'Resources | DESCF',
  description:
    'DESCF resources, reports, evidence, media materials, and public conservation knowledge for responsible biodiversity communication in Bangladesh.',
  canonicalUrl: 'https://descf.org/resources',
}

const fallbackHero = {
  eyebrow: 'DESCF Resources',
  title: 'Public knowledge that is useful, careful, and accountable.',
  description:
    'DESCF resources should work as a credible public knowledge system: reports, evidence, media material, safety-first explainers, and conservation learning documents arranged in one clear place.',
  primaryCta: { label: 'রিসোর্স দেখুন', href: '/evidence-resources' },
  secondaryCta: { label: 'ডিইএসসিএফের সঙ্গে যোগাযোগ করুন', href: '/contact' },
}

const resourceCards = [
  {
    eyebrow: 'Reports & Publications',
    title: 'Formal records, reports, and publications',
    description:
      'A place for verified reports, institutional publications, field summaries, research notes, and public documents when DESCF is ready to publish them.',
    href: '/reports-publications',
    cta: 'রিপোর্ট দেখুন',
  },
  {
    eyebrow: 'Evidence & Resources',
    title: 'Evidence-based conservation materials',
    description:
      'Learning resources, safety notes, field evidence, explainers, and reference materials that support responsible public understanding.',
    href: '/evidence-resources',
    cta: 'তথ্যপ্রমাণ দেখুন',
  },
  {
    eyebrow: 'Media',
    title: 'Media-ready conservation communication',
    description:
      'A future space for press notes, approved photos, public communication assets, and media guidance without overclaiming impact.',
    href: '/media',
    cta: 'Visit media',
  },
]

const principles = [
  {
    label: 'Credibility',
    title: 'Publish only what can be verified',
    text: 'Resources should strengthen trust. Avoid inflated numbers, vague claims, and unsupported impact language.',
  },
  {
    label: 'Safety',
    title: 'Education before reaction',
    text: 'Snake and wildlife resources should reduce fear, discourage risky handling, and guide people toward safer public response.',
  },
  {
    label: 'Access',
    title: 'Readable for general visitors',
    text: 'Scientific information should be translated into clear public language without weakening accuracy.',
  },
  {
    label: 'Archive',
    title: 'Organised for long-term growth',
    text: 'Reports, media, evidence, articles, and field-guide resources should grow through Sanity without redesigning the website each time.',
  },
]

async function getResourcesPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getResourcesPageContent()

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

function FallbackResourcesSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">Resource sections</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="text-h2 text-earth-950">
              Organise public material before publishing more of it.
            </h2>
            <p className="max-w-2xl text-body text-earth-700">
              The mistake would be to upload scattered PDFs, photos, and links.
              DESCF needs a structured resource system where each item has a
              clear type, purpose, date, source, and public value.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {resourceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex min-h-[360px] flex-col rounded-[1.65rem] border border-earth-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-card-lg"
              >
                <p className="section-label">{card.eyebrow}</p>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-earth-950">
                  {card.title}
                </h3>
                <p className="mt-5 flex-1 text-body-sm text-earth-700">
                  {card.description}
                </p>
                <span className="mt-8 text-sm font-bold text-forest-800">
                  {card.cta}{' '}
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-label">Publishing standard</p>
              <h2 className="mt-4 text-h2 text-earth-950">
                Every resource should make DESCF more trustworthy.
              </h2>
              <p className="mt-6 max-w-xl text-body text-earth-700">
                The public site should not look like random content storage. It
                should behave like a serious conservation institution: careful,
                readable, verifiable, and safety-first.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.4rem] border border-earth-200 bg-earth-50 p-6 shadow-card"
                >
                  <p className="section-label">{item.label}</p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-body-sm text-earth-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-12">
            <div>
              <p className="section-label text-gold-300">Next step</p>
              <h2 className="mt-4 max-w-3xl text-h2">
                Build resources slowly, but structure them correctly from day
                one.
              </h2>
              <p className="mt-5 max-w-2xl text-body-sm text-forest-100/75">
                Keep this page as the central hub. Later, Sanity can manage
                individual reports, resource files, media kits, and downloadable
                materials without changing the public design.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex btn-light px-6 py-3 text-sm md:mt-0"
            >
              রিসোর্স শেয়ার করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function ResourcesPage() {
  const page = await getResourcesPageContent()

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
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
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
                Not a dumping ground — a disciplined conservation archive.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                Every resource should have a purpose: help people understand
                biodiversity, support safer response, document conservation work,
                or make DESCF easier to trust.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                  <p className="font-serif text-3xl">3</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Core hubs
                  </p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                  <p className="font-serif text-3xl">CMS</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Ready
                  </p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                  <p className="font-serif text-3xl">Safe</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Language
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackResourcesSections />
      )}
    </main>
  )
}
