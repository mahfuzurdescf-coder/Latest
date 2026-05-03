import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Current Work',
  description:
    'Explore DESCF current work in snake conservation awareness, biodiversity documentation, public education, conservation communication, and human-wildlife coexistence in Bangladesh.',
  canonicalUrl: 'https://descf.org/current-work',
})

const currentWorkJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Current Work', url: 'https://descf.org/current-work' },
])

const workStreams = [
  {
    eyebrow: 'Awareness',
    title: 'Snake conservation communication',
    description:
      'Public-facing education that reduces panic, discourages risky handling, and explains snakes through calm, evidence-aware communication.',
  },
  {
    eyebrow: 'Documentation',
    title: 'Biodiversity and field learning',
    description:
      'Field observations, species profiles, photographs, notes, and ecological context organised into a structured public knowledge system.',
  },
  {
    eyebrow: 'Editorial',
    title: 'Nature stories and public understanding',
    description:
      'Articles, field notes, myth-busting writing, and conservation reflections that make biodiversity easier for general readers to understand.',
  },
  {
    eyebrow: 'Programmes',
    title: 'Institutional conservation portfolio',
    description:
      'Programme pages that explain objectives, activities, audiences, outputs, partners, and public value without inflated impact claims.',
  },
]

const operatingPrinciples = [
  {
    title: 'Field-guide mindset',
    text: 'Information should be organised like a reliable reference system, not scattered posts.',
  },
  {
    title: 'Safety-first language',
    text: 'Every public page should avoid encouraging catching, handling, disturbing, or crowding wildlife.',
  },
  {
    title: 'Credibility before expansion',
    text: 'DESCF should publish only what it can explain, verify, maintain, and update responsibly.',
  },
  {
    title: 'CMS-ready growth',
    text: 'Programmes, articles, resources, events, and species profiles should grow through Sanity without redesigning the site every time.',
  },
]

const roadmap = [
  'Finish public-facing institutional pages',
  'Strengthen programme and current work presentation',
  'Complete Bangladesh wildlife and snake field-guide pages',
  'Prepare resources, reports, events, media, and partner pages',
  'Clean and organise Sanity Studio after the public site foundation is stable',
]

export default function CurrentWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(currentWorkJsonLd) }}
      />

      <main id="main-content">
        <section className="bg-[#10200f] text-white">
          <Container className="py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.85fr] lg:items-center">
              <div>
                <p className="section-label mb-5 text-forest-300">চলমান কাজ</p>
                <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Conservation work with clear public purpose.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-earth-100">
                  DESCF current work connects snake conservation awareness, biodiversity
                  documentation, field learning, nature writing, and human-wildlife
                  coexistence through a disciplined public knowledge system.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/programmes" variant="cta">
                    প্রোগ্রাম দেখুন
                  </Button>
                  <Button
                    href="/bangladesh-wildlife/snakes"
                    variant="secondary"
                    className="border-white/25 text-white hover:bg-white/10"
                  >
                    সাপ গাইড দেখুন
                  </Button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl">
                <p className="section-label mb-5 text-gold-300">Portfolio principle</p>
                <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                  Not scattered activities — structured conservation communication.
                </h2>
                <p className="mt-5 text-base leading-7 text-earth-100">
                  This page should help visitors understand what DESCF is doing now,
                  why the work matters, and how the website connects field knowledge,
                  public awareness, programmes, and partnership.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="font-serif text-4xl text-white">4</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-earth-200">
                      Work streams
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="font-serif text-4xl text-white">1</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-earth-200">
                      জনসম্মুখের ব্যবস্থা
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="font-serif text-4xl text-white">CMS</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-earth-200">
                      Ready growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Work streams</p>
              <h2 className="font-serif text-4xl leading-tight text-earth-950 sm:text-5xl">
                What DESCF is actively building now
              </h2>
              <p className="mt-5 text-body text-earth-700">
                The point is not to show everything DESCF has ever done. The point is to
                show a focused institutional portfolio that can grow cleanly through public
                pages and Sanity-managed content.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {workStreams.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card transition duration-200 hover:-translate-y-1 hover:border-forest-300 hover:shadow-card-lg"
                >
                  <p className="section-label mb-4">{item.eyebrow}</p>
                  <h3 className="font-serif text-3xl leading-tight text-earth-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-body-sm text-earth-700">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="section-label mb-4">Operating model</p>
                <h2 className="font-serif text-4xl leading-tight text-earth-950 sm:text-5xl">
                  The website should make DESCF easier to trust.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  Serious conservation communication needs structure. Visitors should be
                  able to understand the work, follow the evidence, find programmes, read
                  related writing, and contact DESCF without confusion.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {operatingPrinciples.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6"
                  >
                    <h3 className="font-serif text-2xl leading-tight text-earth-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-earth-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-earth-200 bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
              <div>
                <p className="section-label mb-4">Current priority</p>
                <h2 className="font-serif text-4xl leading-tight text-earth-950 sm:text-5xl">
                  Finish the public site foundation before overworking Studio.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  Sanity Studio needs brand identity and careful content organisation, but
                  fixing Studio too early will slow the public website. The practical move is
                  to finish the public pages first, then clean Studio around the page system
                  that is already visible.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-earth-200 bg-white p-7 shadow-card">
                <p className="section-label mb-4">Execution order</p>
                <ol className="space-y-4">
                  {roadmap.map((item, index) => (
                    <li key={item} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-body-sm text-earth-700">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-earth-50">
          <Container className="py-16 md:py-20">
            <div className="rounded-[2rem] bg-[#10200f] p-8 text-white shadow-2xl md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="section-label mb-3 text-forest-300">
                    Partnership and next step
                  </p>
                  <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                    চলমান কাজ becomes stronger when it is clear, useful, and accountable.
                  </h2>
                  <p className="mt-5 text-body text-earth-100">
                    Researchers, educators, institutions, media teams, and conservation
                    practitioners can contact DESCF for responsible collaboration.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href="/partner" variant="cta">
                    ডিইএসসিএফের সঙ্গে যুক্ত হোন
                  </Button>
                  <Button
                    href={`mailto:${SITE.contactEmail}`}
                    variant="secondary"
                    className="border-white/25 text-white hover:bg-white/10"
                  >
                    Email DESCF
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}