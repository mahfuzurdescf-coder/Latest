import type { Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { PARTNERS_QUERY } from '@/lib/sanity/queries'
import { SITE } from '@/lib/site'
import type { PartnerCard } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Partner With DESCF',
  description:
    'Partner with DESCF on conservation awareness, research communication, education, media, and human-wildlife coexistence initiatives in Bangladesh.',
  canonicalUrl: 'https://descf.org/partner',
})

const partnerJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Partner With DESCF', url: 'https://descf.org/partner' },
])

const PARTNERSHIP_AREAS = [
  {
    title: 'Research and documentation',
    description:
      'Collaborate on biodiversity documentation, field learning, ecological communication, and responsible knowledge sharing.',
  },
  {
    title: 'Education and awareness',
    description:
      'Develop awareness activities, learning materials, workshops, and public communication on snakes and wildlife.',
  },
  {
    title: 'Media and storytelling',
    description:
      'Collaborate on ethical conservation storytelling, field notes, photo stories, interviews, and nature communication.',
  },
  {
    title: 'Institutional support',
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

function getPartnerTypeLabel(type?: string): string {
  if (!type) return 'Partner'

  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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

export default async function PartnerPage() {
  const partners = await sanityFetch<PartnerCard[]>({
    query: PARTNERS_QUERY,
    tags: ['partner'],
  })

  const featuredPartners = partners.filter((partner) => partner.featured)
  const otherPartners = partners.filter((partner) => !partner.featured)
  const visiblePartners = featuredPartners.length > 0 ? featuredPartners : partners

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
              <p className="section-label mb-4">Partnership</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Partner with DESCF
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF welcomes serious collaboration with institutions, researchers,
                educators, media professionals, conservation organisations, and community
                partners committed to biodiversity protection and human-wildlife coexistence.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <SectionHeader
                  eyebrow="Collaboration areas"
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

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Partners"
              title="Institutional partners and collaborators"
              description="Partner records are now managed through Sanity CMS. Featured partners appear first."
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
                actionLabel="Contact DESCF"
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

        <section className="bg-earth-100/70">
          <Container className="py-14">
            <div className="max-w-3xl">
              <p className="section-label mb-3">
                Partnership principle
              </p>
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
      </main>
    </>
  )
}
