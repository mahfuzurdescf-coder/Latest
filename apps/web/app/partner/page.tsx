// apps/web/app/partner/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partner With DESCF',
  description: 'Partner with the Deep Ecology and Snake Conservation Foundation — supporting herpetofauna conservation and wildlife coexistence in Bangladesh.',
}

export default function PartnerPage() {
  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site max-w-prose-lg">
          <p className="section-label text-forest-500 mb-4">Collaboration</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-5">Partner With DESCF</h1>
          <p className="text-body-lg text-forest-300 leading-relaxed">
            We welcome mission-aligned funders, research institutions, conservation professionals,
            and community partners who want to strengthen wildlife protection in Bangladesh.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-prose-lg space-y-10">
          <div>
            <h2 className="text-h2 font-serif text-earth-900 mb-5">What partnership looks like</h2>
            <p className="text-body text-earth-700 leading-relaxed mb-5">
              DESCF is an honest, field-grounded organisation. We do not seek partnerships for
              brand visibility alone. We look for organisations that share our commitment to
              evidence-based conservation and community coexistence.
            </p>
            <p className="text-body text-earth-700 leading-relaxed">
              We are currently building capacity in passive acoustic monitoring, anuran bioacoustics,
              and climate-responsive conservation — areas where research partnership and methodological
              support would be especially valuable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Funding partners', body: 'We welcome programme-specific grants and unrestricted funding from mission-aligned donors and foundations.' },
              { title: 'Research partners', body: 'Joint monitoring, data sharing, and field methodology development with academic or conservation research institutions.' },
              { title: 'Institutional partners', body: 'Formal MoUs with universities, government bodies, and conservation organisations active in Bangladesh.' },
              { title: 'Community partners', body: 'Local organisations, schools, and community groups that can extend conservation awareness and response capacity.' },
            ].map(item => (
              <div key={item.title} className="bg-earth-50 rounded-xl border border-earth-200 p-6">
                <h3 className="text-h5 font-medium text-earth-900 mb-2">{item.title}</h3>
                <p className="text-body-sm text-earth-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-forest-900 text-forest-50 rounded-2xl p-8">
            <h2 className="text-h3 font-serif text-forest-50 mb-3">Reach out</h2>
            <p className="text-body-sm text-forest-300 mb-5 leading-relaxed">
              If you are interested in partnering with DESCF, please write to us. We respond to all
              serious enquiries and are transparent about our current capacity and priorities.
            </p>
            <Link href="/contact" className="btn-primary bg-forest-700 hover:bg-forest-600">
              Contact DESCF
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
