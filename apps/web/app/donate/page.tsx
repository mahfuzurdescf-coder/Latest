import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import { SITE } from '@/lib/site'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'donate'

const fallbackMetadata = {
  title: 'Support DESCF',
  description:
    'Support DESCF’s conservation, public awareness, research communication, and human-wildlife coexistence work in Bangladesh.',
}

const fallbackHero = {
  eyebrow: 'Support',
  title: 'Support conservation work with DESCF',
  description:
    'DESCF welcomes support from individuals, institutions, researchers, media organisations, and conservation partners who want to strengthen biodiversity protection, awareness, and coexistence work in Bangladesh.',
}

const fallbackSupportSection = {
  eyebrow: 'Why support matters',
  title: 'Conservation needs long-term trust, communication, and field learning',
  description:
    'Support can help DESCF continue responsible awareness, documentation, and conservation communication without overclaiming impact or making unverifiable promises.',
}

const fallbackSupportAreas = [
  {
    title: 'Public awareness',
    description:
      'Support educational communication that helps reduce fear, misinformation, and harmful responses toward snakes and wildlife.',
  },
  {
    title: 'Field documentation',
    description:
      'Support conservation documentation, ecological learning, and responsible communication from field-based work.',
  },
  {
    title: 'Conservation storytelling',
    description:
      'Support accessible nature communication that connects science, culture, and community awareness.',
  },
  {
    title: 'Institutional capacity',
    description:
      'Support tools, materials, and organisational capacity needed for sustained conservation action.',
  },
]

const fallbackSupportProcess = {
  title: 'কীভাবে সহায়তা করবেন',
  description:
    'A live online donation gateway is not configured on this website yet. Please contact DESCF directly for the current and appropriate support process.',
}

const fallbackContactNote = {
  eyebrow: 'Contact first',
  description:
    'Email DESCF to discuss donation, sponsorship, institutional support, or in-kind collaboration.',
}

const fallbackSupportCtas = {
  primary: { label: 'Email DESCF', href: `mailto:${SITE.contactEmail}` },
  secondary: { label: 'আমাদের সঙ্গে যুক্ত হোন', href: '/partner' },
}

const fallbackWarningNote =
  'DESCF should confirm official payment details directly. Do not rely on unofficial payment instructions shared outside verified DESCF channels.'

const fallbackFinalCta = {
  eyebrow: 'দায়িত্বশীল সহায়তা',
  title: 'Support should strengthen conservation capacity, not create empty publicity.',
  cta: { label: 'ডিইএসসিএফের সঙ্গে যোগাযোগ করুন', href: '/contact' },
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

async function getDonatePageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDonatePageContent()
  const seo = getSeo(page)

  return buildMetadata({
    title: seo?.title || page?.heroTitle || fallbackMetadata.title,
    description: seo?.description || page?.heroDescription || fallbackMetadata.description,
    canonicalUrl: 'https://www.descf.org/donate',
  })
}

export default async function DonatePage() {
  const page = await getDonatePageContent()
  const sections = page?.sections ?? []

  const supportSection = getSection(sections, 'support-areas')
  const supportProcessSection = getSection(sections, 'support-process')
  const contactNoteSection = getSection(sections, 'contact-note')
  const finalCtaSection = getSection(sections, 'final-cta')

  const heroEyebrow = page?.heroEyebrow || fallbackHero.eyebrow
  const heroTitle = page?.heroTitle || fallbackHero.title
  const heroDescription = page?.heroDescription || fallbackHero.description

  const supportEyebrow = supportSection?.eyebrow || fallbackSupportSection.eyebrow
  const supportTitle = supportSection?.title || fallbackSupportSection.title
  const supportDescription =
    supportSection?.description || fallbackSupportSection.description

  const supportAreas =
    supportSection?.cards && supportSection.cards.length > 0
      ? supportSection.cards.map((card) => ({
          title: card.title,
          description: card.text || '',
        }))
      : fallbackSupportAreas

  const supportProcessTitle =
    supportProcessSection?.title || fallbackSupportProcess.title
  const supportProcessDescription =
    supportProcessSection?.description || fallbackSupportProcess.description

  const contactNoteEyebrow = contactNoteSection?.eyebrow || fallbackContactNote.eyebrow
  const contactNoteDescription =
    contactNoteSection?.description || fallbackContactNote.description

  const primaryCta = getLink(
    supportProcessSection?.primaryCta,
    fallbackSupportCtas.primary
  )
  const secondaryCta = getLink(
    supportProcessSection?.secondaryCta,
    fallbackSupportCtas.secondary
  )

  const warningNote =
    supportProcessSection?.cards?.[0]?.text ||
    supportProcessSection?.cards?.[0]?.title ||
    fallbackWarningNote

  const finalCtaEyebrow = finalCtaSection?.eyebrow || fallbackFinalCta.eyebrow
  const finalCtaTitle = finalCtaSection?.title || fallbackFinalCta.title
  const finalCta = getLink(finalCtaSection?.primaryCta, fallbackFinalCta.cta)

  const donateJsonLd = buildBreadcrumbJSONLD([
    { name: 'Home', url: 'https://www.descf.org' },
    { name: heroTitle, url: 'https://www.descf.org/donate' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateJsonLd) }}
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
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <SectionHeader
                  eyebrow={supportEyebrow}
                  title={supportTitle}
                  description={supportDescription}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  {supportAreas.map((area) => (
                    <Card key={area.title}>
                      <CardContent>
                        <h2 className="font-serif text-2xl text-earth-950">
                          {area.title}
                        </h2>
                        {area.description ? (
                          <p className="mt-3 text-body-sm text-earth-700">
                            {area.description}
                          </p>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="self-start">
                <CardContent className="p-8">
                  <h2 className="font-serif text-h3 text-earth-950">
                    {supportProcessTitle}
                  </h2>

                  <p className="mt-4 text-body text-earth-700">
                    {supportProcessDescription}
                  </p>

                  <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5">
                    <p className="text-label uppercase tracking-widest text-bark-700">
                      {contactNoteEyebrow}
                    </p>
                    <p className="mt-2 text-body-sm text-earth-700">
                      {contactNoteDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={primaryCta.href} variant="primary">
                      {primaryCta.label}
                    </Button>
                    <Button href={secondaryCta.href} variant="secondary">
                      {secondaryCta.label}
                    </Button>
                  </div>

                  <p className="mt-6 text-caption text-earth-500">{warningNote}</p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        <section className="bg-forest-900 text-white">
          <Container className="py-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label mb-3 text-forest-300">
                  {finalCtaEyebrow}
                </p>
                <h2 className="font-serif text-h3 text-white">{finalCtaTitle}</h2>
              </div>

              <Link
                href={finalCta.href}
                className="inline-flex justify-center rounded-lg border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-50 transition-colors hover:bg-forest-800"
              >
                {finalCta.label}
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
