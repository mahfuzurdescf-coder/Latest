import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { PAGE_CONTENT_BY_KEY_QUERY, PARTNERS_QUERY } from '@/lib/sanity/queries'
import { SITE } from '@/lib/site'
import type { NavLink, PageContent, PageSection, PartnerCard } from '@/types/sanity'

const PAGE_KEY = 'partner-with-us'

const fallbackSeo = {
  title: 'ডিইএসসিএফের সঙ্গে যুক্ত হোন',
  description:
    'ডিইএসসিএফের সঙ্গে যুক্ত হোন on conservation awareness, research communication, education, media, and human-wildlife coexistence initiatives in Bangladesh.',
  canonicalUrl: 'https://descf.org/partner',
}

const fallbackHero = {
  eyebrow: 'Partnership',
  title: 'ডিইএসসিএফের সঙ্গে যুক্ত হোন',
  description:
    'DESCF welcomes serious collaboration with institutions, researchers, educators, media professionals, conservation organisations, and community partners committed to biodiversity protection and human-wildlife coexistence.',
  primaryCta: { label: 'Email DESCF', href: `mailto:${SITE.contactEmail}` },
  secondaryCta: { label: 'Contact page', href: '/contact' },
}

const partnerJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'ডিইএসসিএফের সঙ্গে যুক্ত হোন', url: 'https://descf.org/partner' },
])

const PARTNERSHIP_AREAS = [
  {
    title: 'গবেষণা ও ডকুমেন্টেশন',
    description:
      'Collaborate on biodiversity documentation, field learning, ecological communication, and responsible knowledge sharing.',
  },
  {
    title: 'শিক্ষা ও সচেতনতা',
    description:
      'Develop awareness activities, learning materials, workshops, and public communication on snakes and wildlife.',
  },
  {
    title: 'মিডিয়া ও গল্পভিত্তিক যোগাযোগ',
    description:
      'Collaborate on ethical conservation storytelling, field notes, photo stories, interviews, and nature communication.',
  },
  {
    title: 'প্রাতিষ্ঠানিক সহায়তা',
    description:
      'Support DESCF through technical advice, resources, training, sponsorship, or long-term organisational collaboration.',
  },
]

const PARTNER_TYPES = [
  'Universities and research groups',
  'Schools and education networks',
  'Conservation organisations',
  'Media and documentary teams',
  'Donor and development partners',
  'Community-based organisations',
]

async function getPartnerPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

async function getPartners() {
  return sanityFetch<PartnerCard[]>({
    query: PARTNERS_QUERY,
    tags: ['partner'],
  }).catch(() => [])
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPartnerPageContent()

  return buildMetadata({
    title: page?.seo?.seoTitle || fallbackSeo.title,
    description:
      page?.seo?.seoDescription ||
      page?.heroDescription ||
      fallbackSeo.description,
    canonicalUrl: page?.seo?.canonicalUrl || fallbackSeo.canonicalUrl,
  })
}

function getPartnerTypeLabel(type?: string): string {
  if (!type) return 'Partner'

  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function isExternalLink(link?: NavLink) {
  if (!link?.href) return false
  return link.isExternal || /^https?:\/\//.test(link.href) || link.href.startsWith('mailto:')
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
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

function PartnerLogo({ partner }: { partner: PartnerCard }) {
  const logoUrl = partner.logo
    ? urlForImage(partner.logo)?.width(240).height(160).url()
    : null

  if (!logoUrl) {
    return (
      <div className="flex h-20 items-center justify-center rounded-2xl border border-earth-200 bg-earth-50 px-4 text-center">
        <span className="text-sm font-semibold text-earth-600">
          {partner.name}
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-20 items-center justify-center rounded-2xl border border-earth-200 bg-white p-4">
      <Image
        src={logoUrl}
        alt={partner.logo?.alt ?? partner.name}
        width={180}
        height={100}
        className="max-h-14 w-auto object-contain"
      />
    </div>
  )
}

function FallbackPartnerSections() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionHeader
              eyebrow="সহযোগিতার ক্ষেত্র"
              title="Partnership should create practical conservation value"
              description="DESCF is best suited for collaborations that connect field learning, conservation communication, public awareness, and responsible storytelling."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {PARTNERSHIP_AREAS.map((area) => (
                <Card key={area.title}>
                  <CardContent>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {area.title}
                    </h2>
                    <p className="mt-3 text-body-sm text-earth-700">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent>
                <h2 className="font-serif text-2xl text-earth-950">
                  Suitable partners
                </h2>

                <ul className="mt-5 space-y-3">
                  {PARTNER_TYPES.map((type) => (
                    <li key={type} className="flex gap-3 text-body-sm text-earth-700">
                      <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="font-serif text-2xl text-earth-950">
                  Start a conversation
                </h2>

                <p className="mt-3 text-body-sm text-earth-700">
                  A useful partnership message should mention your organisation,
                  proposed idea, expected timeline, location, and how the collaboration
                  supports conservation.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`mailto:${SITE.contactEmail}`} variant="primary">
                    Email DESCF
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </Section>
  )
}

function PartnerRecordsSection({
  partners,
}: {
  partners: PartnerCard[]
}) {
  const featuredPartners = partners.filter((partner) => partner.featured)
  const otherPartners = partners.filter((partner) => !partner.featured)
  const visiblePartners = featuredPartners.length > 0 ? featuredPartners : partners

  return (
    <section className="bg-earth-100/70">
      <Container className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Partners"
          title="Institutional partners and collaborators"
          description="Partner records are managed through Sanity CMS. Featured partners appear first."
        />

        {partners.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePartners.map((partner) => (
              <Card key={partner._id}>
                <CardContent>
                  <PartnerLogo partner={partner} />

                  <div className="mt-5">
                    <p className="section-label mb-2">
                      {getPartnerTypeLabel(partner.partnerType)}
                    </p>
                    <h2 className="font-serif text-2xl text-earth-950">
                      {partner.name}
                    </h2>

                    {partner.summary && (
                      <p className="mt-3 text-body-sm text-earth-700">
                        {partner.summary}
                      </p>
                    )}

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex text-sm font-semibold text-forest-700 hover:text-forest-900"
                      >
                        Visit website →
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Partner records are being prepared"
            description="Published DESCF partner records will appear here after they are added in Sanity Studio."
            actionLabel="ডিইএসসিএফের সঙ্গে যোগাযোগ করুন"
            actionHref="/contact"
          />
        )}

        {otherPartners.length > 0 && featuredPartners.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherPartners.map((partner) => (
              <Card key={partner._id}>
                <CardContent>
                  <h3 className="font-serif text-xl text-earth-950">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-caption uppercase tracking-widest text-forest-700">
                    {getPartnerTypeLabel(partner.partnerType)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

function FallbackPartnershipPrinciple() {
  return (
    <section className="bg-earth-100/70">
      <Container className="py-14">
        <div className="max-w-3xl">
          <p className="section-label mb-3">Partnership principle</p>
          <h2 className="font-serif text-h3 text-earth-950">
            DESCF should not be used as a symbolic partner for projects without conservation substance.
          </h2>
          <p className="mt-4 text-body text-earth-700">
            The strongest collaborations are practical, transparent, ethically communicated,
            and aligned with biodiversity conservation, ecological learning, and public awareness.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default async function PartnerPage() {
  const [page, partners] = await Promise.all([getPartnerPageContent(), getPartners()])

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">{heroEyebrow}</p>
              <h1 className="font-serif text-h1 text-earth-950">
                {heroTitle}
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
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
          </Container>
        </section>

        {hasStudioSections ? (
          <StudioSections sections={page?.sections ?? []} />
        ) : (
          <FallbackPartnerSections />
        )}

        <PartnerRecordsSection partners={partners} />

        {!hasStudioSections && <FallbackPartnershipPrinciple />}
      </main>
    </>
  )
}
