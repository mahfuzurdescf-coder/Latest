import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import {
  GOVERNANCE_DOCUMENTS_QUERY,
  PAGE_CONTENT_BY_KEY_QUERY,
  POLICIES_QUERY,
} from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'governance'

const fallbackSeo = {
  title: 'Governance',
  description:
    'DESCF governance page outlining accountability, transparency, responsible communication, safeguarding, document standards, policy standards, and institutional trust.',
  canonicalUrl: 'https://www.descf.org/governance',
}

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://www.descf.org' },
  { name: 'Governance', url: 'https://www.descf.org/governance' },
])

const fallbackHero = {
  eyebrow: 'Governance',
  title: 'Accountability systems for serious conservation work.',
  description:
    'DESCF’s governance page explains how the organisation approaches accountability, transparency, responsible communication, safeguarding, policy standards, and public trust.',
  primaryCta: { label: 'রিসোর্স দেখুন', href: '/resources' },
  secondaryCta: { label: 'গভর্নেন্স যোগাযোগ', href: '/contact' },
}

type GovernanceDocument = {
  _id?: string
  title?: string
  summary?: string
  fileUrl?: string
  url?: string
  externalUrl?: string
  documentType?: string
  type?: string
  category?: string
}

type PolicyDocument = {
  _id?: string
  title?: string
  summary?: string
}

const governanceAreas = [
  {
    eyebrow: 'Accountability',
    title: 'Clear responsibility',
    text: 'DESCF should make institutional responsibilities, public records, and contact routes easier for visitors, partners, and communities to understand.',
  },
  {
    eyebrow: 'Transparency',
    title: 'Readable public records',
    text: 'গভর্নেন্স ডকুমেন্ট, policies, reports, and public notes should be presented with context, date, source, and document type wherever available.',
  },
  {
    eyebrow: 'Communication',
    title: 'No inflated claims',
    text: 'Public language should avoid exaggerated impact statements, unclear partnership wording, and unsupported conservation claims.',
  },
  {
    eyebrow: 'Safeguarding',
    title: 'Safety-first communication',
    text: 'Snake and wildlife communication should reduce panic and risky behaviour. Public guidance should remain calm, careful, and safety-oriented.',
  },
  {
    eyebrow: 'Documents',
    title: 'Reviewed before publication',
    text: 'Documents should be checked before publication so the website becomes a credible record, not a dumping place for random files.',
  },
  {
    eyebrow: 'Policy standard',
    title: 'Updateable institutional practice',
    text: 'Policies should be structured so DESCF can maintain them through Sanity CMS without redesigning the website each time.',
  },
]

const policyPrinciples = [
  'Publish only reviewed governance documents.',
  'Keep policy language readable for general visitors.',
  'Separate verified records from future plans.',
  'Label document type, source, and purpose clearly.',
  'Avoid unsupported impact or partnership claims.',
  'Keep policies updateable through Sanity CMS.',
]

const trustStandards = [
  {
    title: 'Evidence before claim',
    text: 'Institutional statements should be based on verified records, documented work, or clearly framed future plans.',
  },
  {
    title: 'Responsible public guidance',
    text: 'Wildlife communication should prioritise public safety, ecological accuracy, and careful wording.',
  },
  {
    title: 'Consistent document control',
    text: 'Governance materials should remain organised by title, type, summary, and publication status.',
  },
]

async function getGovernancePageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

async function getGovernanceDocuments() {
  return sanityFetch<GovernanceDocument[]>({
    query: GOVERNANCE_DOCUMENTS_QUERY,
    tags: ['governanceDocument'],
  }).catch(() => [])
}

async function getPolicies() {
  return sanityFetch<PolicyDocument[]>({
    query: POLICIES_QUERY,
    tags: ['policy'],
  }).catch(() => [])
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGovernancePageContent()

  return buildMetadata({
    title: page?.seo?.seoTitle || fallbackSeo.title,
    description:
      page?.seo?.seoDescription ||
      page?.heroDescription ||
      fallbackSeo.description,
    canonicalUrl: page?.seo?.canonicalUrl || fallbackSeo.canonicalUrl,
  })
}

function getDocumentHref(item: GovernanceDocument) {
  return item.fileUrl || item.url || item.externalUrl || '#'
}

function getDocumentMeta(item: GovernanceDocument) {
  return item.documentType || item.type || item.category || 'Governance document'
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

function FallbackGovernanceSections({
  documents,
  policies,
}: {
  documents: GovernanceDocument[]
  policies: PolicyDocument[]
}) {
  return (
    <>
      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">গভর্নেন্স কাঠামো</p>
            <h2 className="text-h2 text-earth-950">
              Governance should make the organisation easier to evaluate.
            </h2>
            <p className="mt-5 text-body text-earth-700">
              Visitors should be able to understand what DESCF is accountable
              for, how public documents are handled, and how institutional
              communication stays careful.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {governanceAreas.map((item) => (
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
              <p className="section-label mb-4">Institutional trust</p>
              <h2 className="text-h2 text-earth-950">
                Credibility depends on what DESCF can responsibly show.
              </h2>
              <p className="mt-5 max-w-xl text-body text-earth-700">
                A serious conservation website should separate verified work,
                published records, policy commitments, and future plans. That
                discipline protects the organisation from overclaiming.
              </p>
            </div>

            <div className="grid gap-5">
              {trustStandards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <h3 className="font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-earth-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label mb-4">গভর্নেন্স ডকুমেন্ট</p>
              <h2 className="text-h2 text-earth-950">
                Published documents should appear with context.
              </h2>
              <p className="mt-5 max-w-xl text-body text-earth-700">
                Documents should not appear as vague PDFs. Each record should
                have a clear title, type, summary, and public purpose wherever
                possible.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7 shadow-card">
              {documents.length ? (
                <div className="space-y-5">
                  {documents.map((item, index) => (
                    <article
                      key={item._id || item.title || index}
                      className="border-t border-earth-200 pt-5 first:border-t-0 first:pt-0"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                        {getDocumentMeta(item)}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl leading-tight text-earth-950">
                        {item.title || 'Governance document'}
                      </h3>
                      {item.summary && (
                        <p className="mt-3 text-body-sm text-earth-700">
                          {item.summary}
                        </p>
                      )}
                      {getDocumentHref(item) !== '#' && (
                        <Link
                          href={getDocumentHref(item)}
                          className="mt-4 inline-flex text-sm font-semibold text-forest-800 hover:text-forest-950"
                          target={
                            getDocumentHref(item).startsWith('http')
                              ? '_blank'
                              : undefined
                          }
                          rel={
                            getDocumentHref(item).startsWith('http')
                              ? 'noreferrer'
                              : undefined
                          }
                        >
                          Open document →
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-earth-300 bg-white p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                    এখনো কোনো রেকর্ড নেই
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
                    এখনো কোনো গভর্নেন্স ডকুমেন্ট প্রকাশিত হয়নি।
                  </h3>
                  <p className="mt-4 text-body-sm text-earth-700">
                    Policies, governance notes, accountability documents, and
                    reviewed institutional records will appear here after
                    publication in Sanity Studio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="section-label mb-4">Policy standard</p>
              <h2 className="text-h2 text-earth-950">
                Policies should be useful, readable, and maintainable.
              </h2>
              <p className="mt-5 max-w-xl text-body text-earth-700">
                Governance should not depend on hidden internal knowledge. The
                website and CMS should help DESCF maintain better public records
                over time.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {policyPrinciples.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-earth-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-earth-800 shadow-card"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {policies.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {policies.map((item, index) => (
                <article
                  key={item._id || item.title || index}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                    Policy
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                    {item.title || 'Policy document'}
                  </h3>
                  {item.summary && (
                    <p className="mt-4 text-body-sm text-earth-700">
                      {item.summary}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 section-label text-gold-300">
                  গভর্নেন্স যোগাযোগ
                </p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Accountability improves when communication is clear.
                </h2>
                <p className="mt-4 max-w-2xl text-body-sm text-forest-100/75">
                  For governance, policy, safeguarding, document, or
                  institutional enquiries, contact DESCF with a clear purpose and
                  relevant context.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-light px-5 py-3 text-sm">
                  ডিইএসসিএফের সঙ্গে যোগাযোগ করুন
                </Link>
                <Link
                  href="/resources"
                  className="btn-outline-light px-5 py-3 text-sm"
                >
                  রিসোর্স দেখুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function GovernancePage() {
  const [page, documents, policies] = await Promise.all([
    getGovernancePageContent(),
    getGovernanceDocuments(),
    getPolicies(),
  ])

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
                গভর্নেন্স নীতি
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                Trust is built through records, restraint, and clear standards.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                This is not a people page. It is the public home for DESCF’s
                accountability, document standards, policy approach, and
                safety-first communication principles.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">{documents.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Records
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">{policies.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Policies
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">CMS</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Ready
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
        <FallbackGovernanceSections documents={documents} policies={policies} />
      )}
    </main>
  )
}
