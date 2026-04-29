import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { HomepageCuration } from '@/types/sanity'

interface HomeHeroProps {
  curation?: HomepageCuration | null
}

const FALLBACK_ITEMS = [
  'Snake conservation and public awareness',
  'Biodiversity research and field documentation',
  'Human-wildlife coexistence education',
  'Nature storytelling and conservation communication',
]

export function HomeHero({ curation }: HomeHeroProps) {
  const eyebrow =
    curation?.heroEyebrow || 'Bangladesh-based conservation organisation'

  const title =
    curation?.heroTitle ||
    'Protecting biodiversity through research, awareness, and coexistence.'

  const description =
    curation?.heroDescription ||
    'Deep Ecology and Snake Conservation Foundation works to strengthen wildlife conservation, snake awareness, ecological education, and human-wildlife coexistence in Bangladesh.'

  const primaryCta = curation?.primaryCta ?? {
    label: 'Explore our work',
    href: '/current-work',
  }

  const secondaryCta = curation?.secondaryCta ?? {
    label: 'Partner with DESCF',
    href: '/partner',
  }

  const heroImageUrl = curation?.heroImage
    ? urlForImage(curation.heroImage)?.width(900).height(700).url()
    : null

  return (
    <section className="relative overflow-hidden border-b border-earth-200 bg-earth-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,96,52,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(173,125,37,0.14),transparent_32%)]" />

      <Container className="relative section-padding">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{eyebrow}</p>

            <h1 className="font-serif text-h1 text-earth-950 text-balance">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-body-lg text-earth-700">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-card">
            {heroImageUrl ? (
              <figure className="overflow-hidden rounded-2xl bg-earth-100">
                <Image
                  src={heroImageUrl}
                  alt={curation?.heroImage?.alt ?? 'DESCF conservation work'}
                  width={900}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                />
                {(curation?.heroImage?.caption || curation?.heroImage?.credit) && (
                  <figcaption className="border-t border-earth-100 bg-white px-4 py-3 text-sm text-earth-500">
                    {curation.heroImage.caption}
                    {curation.heroImage.credit && (
                      <span>
                        {curation.heroImage.caption ? ' — ' : ''}
                        {curation.heroImage.credit}
                      </span>
                    )}
                  </figcaption>
                )}
              </figure>
            ) : (
              <div className="rounded-2xl bg-forest-900 p-6 text-white">
                <p className="text-label uppercase tracking-widest text-forest-200">
                  Institutional focus
                </p>

                <div className="mt-6 grid gap-4">
                  {FALLBACK_ITEMS.map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm leading-6 text-forest-50">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
