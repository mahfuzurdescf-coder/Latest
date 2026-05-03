import type { Metadata } from 'next'
import Link from 'next/link'

import { ContactForm } from '@/components/forms/ContactForm'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { PAGE_CONTENT_BY_KEY_QUERY } from '@/lib/sanity/queries'
import type { NavLink, PageContent, PageSection } from '@/types/sanity'

const PAGE_KEY = 'contact'

const fallbackSeo = {
  title: 'Contact | DESCF',
  description:
    'Contact Deep Ecology and Snake Conservation Foundation for conservation collaboration, media queries, education programmes, and responsible public communication.',
  canonicalUrl: 'https://descf.org/contact',
}

const fallbackHero = {
  eyebrow: 'Contact DESCF',
  title: 'Start the conversation with clear purpose.',
  description:
    'Contact Deep Ecology and Snake Conservation Foundation for conservation collaboration, public education, media queries, institutional partnership, and responsible biodiversity communication in Bangladesh.',
  primaryCta: { label: 'Email DESCF', href: 'mailto:info@descf.org' },
  secondaryCta: { label: 'Partner with DESCF', href: '/partner' },
}

const contactChannels = [
  {
    label: 'General contact',
    title: 'Email DESCF',
    text: 'For general questions, institutional communication, collaboration requests, and public information.',
    value: 'info@descf.org',
    href: 'mailto:info@descf.org',
    cta: 'Send email',
  },
  {
    label: 'Phone',
    title: 'Call DESCF',
    text: 'Use phone contact for direct communication when email is not suitable.',
    value: '+8801718414517',
    href: 'tel:+8801718414517',
    cta: 'Call now',
  },
  {
    label: 'Office address',
    title: 'Visit / postal contact',
    text: 'Use the address for official communication, institutional reference, or planned visits.',
    value: 'Islamnagar Bazar, Savar, Dhaka-1343.',
    href: 'https://maps.google.com/?q=Islamnagar%20Bazar%2C%20Savar%2C%20Dhaka-1343',
    cta: 'Open map',
  },
]

const inquiryTypes = [
  {
    label: 'Partnership',
    title: 'Institutional collaboration',
    text: 'Universities, researchers, schools, conservation groups, NGOs, and media teams can contact DESCF for responsible collaboration.',
  },
  {
    label: 'Education',
    title: 'Awareness and public learning',
    text: 'Use this route for workshops, field learning, snake awareness, biodiversity education, and conservation communication.',
  },
  {
    label: 'Media',
    title: 'Press and communication',
    text: 'Media queries should ask for verified information, approved photos, correct captions, and safety-first public language.',
  },
  {
    label: 'Wildlife note',
    title: 'Responsible reporting',
    text: 'Share broad location, date, photo, and context where appropriate. Avoid publishing exact sensitive wildlife locations publicly.',
  },
]

async function getContactPageContent() {
  return sanityFetch<PageContent | null>({
    query: PAGE_CONTENT_BY_KEY_QUERY,
    params: { pageKey: PAGE_KEY },
    tags: ['pageContent'],
  }).catch(() => null)
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPageContent()

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

function ContactFormSection() {
  return (
    <section className="border-b border-earth-200 bg-white">
      <div className="container-site py-14 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div>
            <p className="section-label mb-4">Direct message</p>
            <h2 className="text-h2 text-earth-950">
              Send DESCF a structured message.
            </h2>
            <p className="mt-5 max-w-xl text-body text-earth-700">
              Use this form for partnership, education, media, research, event,
              or general communication. Submissions are stored in DESCF Studio
              for review.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function FallbackContactSections() {
  return (
    <>
      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">Contact channels</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="text-h2 text-earth-950">
              Use the right contact route.
            </h2>
            <p className="max-w-2xl text-body text-earth-700">
              A strong contact page should not be decorative. It should make
              communication easier, reduce confusion, and help DESCF respond to
              serious requests with proper context.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {contactChannels.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-h-[310px] flex-col rounded-[1.65rem] border border-earth-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-card-lg"
              >
                <p className="section-label">{item.label}</p>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-5 text-body-sm text-earth-700">{item.text}</p>
                <p className="mt-5 font-bold text-forest-800">{item.value}</p>
                <span className="mt-auto pt-8 text-sm font-bold text-forest-800">
                  {item.cta}{' '}
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-label">Inquiry types</p>
              <h2 className="mt-4 text-h2 text-earth-950">
                Make every message useful from the first email.
              </h2>
              <p className="mt-6 max-w-xl text-body text-earth-700">
                The public site should guide people toward clear communication:
                who is asking, what they need, what evidence or context they
                have, and what kind of response they expect.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {inquiryTypes.map((item) => (
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

      <section className="border-b border-earth-200 bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr]">
            <div className="rounded-[2rem] border border-earth-200 bg-white p-8 shadow-card md:p-10">
              <p className="section-label">Before contacting</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-earth-950">
                Include the details DESCF needs to respond properly.
              </h2>
              <div className="mt-8 grid gap-4 text-earth-700">
                {[
                  'Your name, organisation, and role.',
                  'The purpose of the request: partnership, education, media, research, event, or general communication.',
                  'Date, location, audience, timeline, and expected support.',
                  'Relevant links, photos, files, or context where appropriate.',
                ].map((item, index) => (
                  <p key={item} className="rounded-2xl bg-earth-50 p-4">
                    <strong className="text-earth-950">{index + 1}.</strong>{' '}
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gold-300/35 bg-white p-8 shadow-card md:p-10">
              <p className="section-label">Public safety</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
                For wildlife situations, do not create risk for a photo.
              </h3>
              <p className="mt-5 text-body-sm text-earth-700">
                Keep distance, avoid crowding, do not attempt to catch or handle
                wildlife, and seek help from trained responders or relevant
                authorities when needed.
              </p>
              <a
                href="mailto:info@descf.org"
                className="mt-8 inline-flex btn-primary px-5 py-3 text-sm"
              >
                Email DESCF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-12">
            <div>
              <p className="section-label text-gold-300">Next step</p>
              <h2 className="mt-4 max-w-3xl text-h2">
                Build trust through clear communication.
              </h2>
              <p className="mt-5 max-w-2xl text-body-sm text-forest-100/75">
                A visitor should know exactly how to reach DESCF and what kind
                of information to include. That is the job of this page.
              </p>
            </div>

            <Link
              href="/partner"
              className="mt-8 inline-flex btn-light px-6 py-3 text-sm md:mt-0"
            >
              Partner with DESCF
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function ContactPage() {
  const page = await getContactPageContent()

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
                Communication standard
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
                Serious conservation work needs specific, verifiable messages.
              </h2>
              <p className="mt-5 text-body-sm text-forest-100/75">
                Do not send vague requests. Mention who you are, what you need,
                why it matters, the expected date, and whether the request is
                for education, research, media, partnership, or public support.
              </p>

              <div className="mt-8 rounded-2xl border border-gold-300/35 bg-gold-300/10 p-5">
                <p className="text-sm font-bold text-gold-300">Safety note</p>
                <p className="mt-2 text-body-sm text-forest-100/75">
                  DESCF content is for education and conservation awareness. It
                  is not a snake handling, catching, or rescue manual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />

      {hasStudioSections ? (
        <StudioSections sections={page?.sections ?? []} />
      ) : (
        <FallbackContactSections />
      )}
    </main>
  )
}
