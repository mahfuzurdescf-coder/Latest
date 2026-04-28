import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-earth-200 bg-earth-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,96,52,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(173,125,37,0.14),transparent_32%)]" />

      <Container className="relative section-padding">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Bangladesh-based conservation organisation</p>

            <h1 className="font-serif text-h1 text-earth-950 text-balance">
              Protecting biodiversity through research, awareness, and coexistence.
            </h1>

            <p className="mt-6 max-w-2xl text-body-lg text-earth-700">
              Deep Ecology and Snake Conservation Foundation works to strengthen wildlife conservation,
              snake awareness, ecological education, and human-wildlife coexistence in Bangladesh.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/current-work" variant="primary" size="lg">
                Explore our work
              </Button>
              <Button href="/partner" variant="secondary" size="lg">
                Partner with DESCF
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-card">
            <div className="rounded-2xl bg-forest-900 p-6 text-white">
              <p className="text-label uppercase tracking-widest text-forest-200">
                Institutional focus
              </p>

              <div className="mt-6 grid gap-4">
                {[
                  'Snake conservation and public awareness',
                  'Biodiversity research and field documentation',
                  'Human-wildlife coexistence education',
                  'Nature storytelling and conservation communication',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-6 text-forest-50">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}