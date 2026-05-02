import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-earth-50">
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-950 px-6 py-10 text-white shadow-card-lg md:px-10 md:py-12 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,245,234,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(173,125,37,0.18),transparent_34%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-forest-300">
                Partnership and collaboration
              </p>

              <h2 className="mt-4 font-serif text-h2 leading-tight text-white">
                Work with DESCF to strengthen conservation communication, learning, and coexistence.
              </h2>

              <p className="mt-5 max-w-2xl text-body leading-8 text-forest-100">
                DESCF welcomes serious collaboration with institutions, researchers, educators,
                conservation practitioners, and media partners who want to support biodiversity
                conservation in Bangladesh with clarity and responsibility.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/partner" variant="cta">
                Partner with DESCF
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-forest-200 text-forest-50 hover:bg-white/10"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}