import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import type { PageSection } from '@/types/sanity'

const PROKRITI = 'প্রকৃতি কথা'
const SNAKES_BD = 'বাংলাদেশের সাপ'

type GatewayItem = {
  label: string
  title: string
  description: string
  href: string
  cta: string
  cardClass: string
  labelClass: string
  ctaClass: string
}

const cardStyles = [
  {
    cardClass: 'border-forest-200 bg-white text-earth-950',
    labelClass: 'text-forest-700',
    ctaClass: 'text-forest-800 hover:text-forest-950',
  },
  {
    cardClass: 'border-forest-100 bg-forest-50 text-earth-950',
    labelClass: 'text-forest-700',
    ctaClass: 'text-forest-800 hover:text-forest-950',
  },
  {
    cardClass: 'border-forest-900 bg-forest-950 text-white',
    labelClass: 'text-bark-300',
    ctaClass: 'text-bark-200 hover:text-white',
  },
]

const fallbackGateways: GatewayItem[] = [
  {
    label: 'Organisation Portfolio',
    title: 'DESCF as an institution',
    description:
      'ডিইএসসিএফের মিশন, চলমান কাজ, প্রোগ্রাম, গভর্নেন্স, টিম এবং সহযোগিতার পথগুলো দেখুন।',
    href: '/about',
    cta: 'সংগঠন দেখুন',
    ...cardStyles[0],
  },
  {
    label: PROKRITI,
    title: 'Nature stories, field notes, and reflections',
    description:
      'A calm editorial space for nature, wildlife, coexistence, conservation thinking, and field-based storytelling.',
    href: '/prokriti-kotha',
    cta: `Read ${PROKRITI}`,
    ...cardStyles[1],
  },
  {
    label: SNAKES_BD,
    title: 'A field-guide style snake database',
    description:
      "Browse DESCF's public-friendly snake guide with names, identification clues, safety notes, and species profiles.",
    href: '/bangladesh-wildlife/snakes',
    cta: 'সাপের ডাটাবেস দেখুন',
    ...cardStyles[2],
  },
]

function buildGatewayItems(content?: PageSection): GatewayItem[] {
  const cards = content?.cards?.filter(
    (card) => card.title || card.text || card.link?.href,
  )

  if (!cards?.length) return fallbackGateways

  return cards.slice(0, 3).map((card, index) => {
    const fallback = fallbackGateways[index] ?? fallbackGateways[0]
    const style = cardStyles[index] ?? cardStyles[0]

    return {
      label: card.eyebrow || fallback.label,
      title: card.title || fallback.title,
      description: card.text || fallback.description,
      href: card.link?.href || fallback.href,
      cta: card.link?.label || fallback.cta,
      ...style,
    }
  })
}

interface HomeGatewaySectionProps {
  content?: PageSection
}

export function HomeGatewaySection({ content }: HomeGatewaySectionProps) {
  const gateways = buildGatewayItems(content)

  return (
    <section className="border-b border-earth-200 bg-earth-50">
      <Container className="py-10 md:py-12 lg:py-14">
        <div className="mb-7 max-w-3xl">
          <p className="section-label mb-3">
            {content?.eyebrow || 'ডিইএসসিএফ দেখুন'}
          </p>
          <h2 className="font-serif text-h2 text-earth-950">
            {content?.title || 'Three connected spaces, one conservation identity.'}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-earth-600">
            {content?.description ||
              "DESCF's website is organised around institutional work, nature storytelling, and Bangladesh's snake field guide - each with its own feel, but under one brand system."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {gateways.map((item) => (
            <Link
              key={`${item.href}-${item.title}`}
              href={item.href}
              className={cn(
                'group flex min-h-[300px] flex-col justify-between rounded-3xl border p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-lg',
                item.cardClass,
              )}
            >
              <div>
                <p className={cn('text-sm font-semibold tracking-normal', item.labelClass)}>
                  {item.label}
                </p>

                <h3 className="mt-5 font-serif text-2xl leading-tight md:text-3xl">
                  {item.title}
                </h3>

                <p
                  className={cn(
                    'mt-4 text-sm leading-7',
                    item.href.includes('snakes') ? 'text-forest-100' : 'text-earth-600',
                  )}
                >
                  {item.description}
                </p>
              </div>

              <span className={cn('mt-7 inline-flex text-sm font-semibold transition-colors', item.ctaClass)}>
                {item.cta} <span aria-hidden="true" className="ml-1">-&gt;</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
