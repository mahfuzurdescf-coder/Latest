import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HomeCTA() {
  return (
    <section className="bg-forest-900 text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-3 text-forest-300">
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
            <Button href="/contact" variant="secondary" className="border-forest-300 text-forest-50 hover:bg-forest-800">
              Contact DESCF
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}