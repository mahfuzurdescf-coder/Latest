import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-[#12382a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,241,232,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(72,128,86,0.22),transparent_34%)]" />

      <Container className="relative py-16 md:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 backdrop-blur-sm md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="section-label mb-3 text-forest-200">
                Work with DESCF
              </p>

              <h2 className="font-serif text-h2 text-white">
                Support conservation work that connects science, community awareness, and coexistence.
              </h2>

              <p className="mt-4 text-body text-forest-100">
                DESCF welcomes collaboration with institutions, researchers, educators, media organisations,
                and conservation partners.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/partner" variant="cta">
                Partner with us
              </Button>
              <Button href="/contact" variant="secondary" className="border-forest-200 text-forest-50 hover:bg-white/10">
                Contact DESCF
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
