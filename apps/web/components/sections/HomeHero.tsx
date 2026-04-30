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
    <section className="relative overflow-hidden border-b border-earth-200 bg-[#f7f4ec]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,94,49,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(173,125,37,0.12),transparent_30%)]" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(420px,0.86fr)] lg:items-center xl:gap-16">
          <div className="max-w-[680px]">
            <p className="section-label mb-4">{eyebrow}</p>

            <h1 className="font-serif text-[clamp(3rem,5.15vw,5rem)] leading-[0.97] tracking-[-0.035em] text-earth-950 text-balance">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-[1.08rem] leading-8 text-earth-700 sm:text-[1.12rem]">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-earth-200/80 bg-white/80 p-4 shadow-card backdrop-blur-sm lg:justify-self-end lg:p-5">
            {heroImageUrl ? (
              <figure className="overflow-hidden rounded-[1.45rem] bg-earth-100">
                <Image
                  src={heroImageUrl}
                  alt={curation?.heroImage?.alt ?? 'DESCF conservation work'}
                  width={900}
                  height={700}
                  priority
                  className="aspect-[4/3] h-full w-full object-cover object-center"
                />
                {(curation?.heroImage?.caption || curation?.heroImage?.credit) && (
                  <figcaption className="border-t border-earth-100 bg-[#fffaf2]/95 px-4 py-3 text-sm leading-6 text-earth-600">
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
