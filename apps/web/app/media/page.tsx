import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'media'

const fallbackSeo = {
  title: 'Media | DESCF',
  description:
    'DESCF media information, approved communication assets, press guidance, and public conservation messaging.',
  canonicalUrl: 'https://descf.org/media',
}

const fallbackHero = {
  eyebrow: 'DESCF Media',
  title: 'Media communication without fear-based storytelling.',
  description:
    'This section should support journalists, media partners, institutions, and public communicators with approved information, responsible language, and conservation-focused context.',
  primaryCta: { label: 'Back to resources', href: '/resources' },
  secondaryCta: { label: 'Media contact', href: '/contact' },
}

const mediaStandards = [
  {
    label: 'Approved',
    title: 'Use verified material',
    text: 'Photos, captions, names, dates, and claims should be checked before public or media use.',
  },
  {
    label: 'Careful',
    title: 'Avoid sensational wildlife messaging',
    text: 'Media content should not increase panic, promote risky handling, or exaggerate danger.',
  },
  {
    label: 'Useful',
    title: 'Support public understanding',
    text: 'Media communication should make conservation, coexistence, and safety easier to understand.',
  },
]

async function getMediaPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMediaPageContent()

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

function FallbackMediaSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">Media standard</p>
          <h2 className="mt-4 max-w-3xl text-h2 text-earth-950">
            Public communication should reduce confusion, not create noise.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mediaStandards.map((item) => (
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
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
            <div className="rounded-[2rem] border border-dashed border-earth-300 bg-earth-50 p-10">
              <p className="section-label">Media kit</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-earth-950">
                Approved media materials are being prepared.
              </h2>
              <p className="mt-5 text-body text-earth-700">
                Future media assets can include approved photos, organisational
                profile, press notes, speaker information, public safety
                messages, and media-use guidelines.
              </p>
            </div>

            <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-card">
              <p className="section-label">Contact</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
                Need official DESCF information?
              </h3>
              <p className="mt-4 text-body-sm text-earth-700">
                Use the contact page for institutional collaboration, media
                enquiries, and responsible conservation communication.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex btn-secondary px-5 py-3 text-sm"
              >
                Contact DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function MediaPage() {
  const page = await getMediaPageContent()

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
              <p className="section-label text-gold-300">Media principle</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
                Communicate wildlife with accuracy, restraint, and
                responsibility.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                DESCF media material should protect credibility. Avoid dramatic
                language, unsupported impact claims, and unsafe wildlife
                behaviour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackMediaSections />
      )}
    </main>
  )
}
