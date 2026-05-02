import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const PROKRITI = '\u09aa\u09cd\u09b0\u0995\u09c3\u09a4\u09bf \u0995\u09a5\u09be'
const SNAKES_BD = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09be\u09aa'

const gateways = [
  {
    label: 'Organisation Portfolio',
    title: 'DESCF as an institution',
    description:
      "Explore DESCF's mission, current work, programmes, governance, leadership, and collaboration pathways.",
    href: '/about',
    cta: 'Explore organisation',
    cardClass: 'border-forest-200 bg-white text-earth-950',
    labelClass: 'text-forest-700',
    ctaClass: 'text-forest-800 hover:text-forest-950',
  },
  {
    label: PROKRITI,
    title: 'Nature stories, field notes, and reflections',
    description:
      'A calm editorial space for nature, wildlife, coexistence, conservation thinking, and field-based storytelling.',
    href: '/prokriti-kotha',
    cta: 'Read ' + PROKRITI,
    cardClass: 'border-forest-100 bg-forest-50 text-earth-950',
    labelClass: 'text-forest-700',
    ctaClass: 'text-forest-800 hover:text-forest-950',
  },
  {
    label: SNAKES_BD,
    title: 'A field-guide style snake database',
    description:
      "Browse DESCF's public-friendly snake guide with names, identification clues, safety notes, and species profiles.",
    href: '/bangladesh-wildlife/snakes',
    cta: 'Explore snake database',
    cardClass: 'border-forest-900 bg-forest-950 text-white',
    labelClass: 'text-bark-300',
    ctaClass: 'text-bark-200 hover:text-white',
  },
]

export function HomeGatewaySection() {
  return (
    <section className="border-b border-earth-200 bg-earth-50">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="mb-9 max-w-3xl">
          <p className="section-label mb-3">Explore DESCF</p>
          <h2 className="font-serif text-h2 text-earth-950">
            Three connected spaces, one conservation identity.
          </h2>
          <p className="mt-4 max-w-2xl text-body text-earth-600">
            DESCF&apos;s website is organised around institutional work, nature storytelling,
            and Bangladesh&apos;s snake field guide - each with its own feel, but under one brand system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {gateways.map((item) => (
            <Link
              key={item.href}
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
