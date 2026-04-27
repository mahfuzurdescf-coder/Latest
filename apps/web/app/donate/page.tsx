import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support DESCF',
  description: 'Support the Deep Ecology and Snake Conservation Foundation — helping wildlife conservation and coexistence in Bangladesh.',
}

export default function DonatePage() {
  return (
    <>
      <section className="bg-bark-800 text-bark-50 section-padding">
        <div className="container-site max-w-prose-lg">
          <p className="section-label text-bark-400 mb-4">Support conservation</p>
          <h1 className="text-display-md font-serif text-bark-50 mb-5">Support DESCF</h1>
          <p className="text-body-lg text-bark-200 leading-relaxed">
            DESCF is a field-based, mission-driven conservation organisation working in Bangladesh.
            Your support helps sustain our work — from rescue response to research capacity building.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-prose-lg space-y-10">
          <div>
            <h2 className="text-h2 font-serif text-earth-900 mb-5">Where your support goes</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: '🐍', title: 'Rescue response',       body: 'Maintaining our snake rescue and wildlife response capacity in communities across Bangladesh.' },
                { icon: '📢', title: 'Public awareness',      body: 'Awareness sessions, conservation communication materials, and community education initiatives.' },
                { icon: '📊', title: 'Documentation',         body: 'Field documentation, photography, and ecological record-keeping that builds a conservation evidence base.' },
                { icon: '🔬', title: 'Research readiness',    body: 'Building methodological capacity for monitoring programmes — acoustic monitoring, bioacoustics, and biodiversity documentation.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 bg-earth-50 rounded-xl border border-earth-200">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-h5 font-medium text-earth-900 mb-1">{item.title}</h3>
                    <p className="text-body-sm text-earth-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bark-50 border border-bark-200 rounded-2xl p-8">
            <h2 className="text-h3 font-serif text-earth-900 mb-3">Make a donation</h2>
            <p className="text-body text-earth-700 mb-5 leading-relaxed">
              Our donation mechanism is being set up. In the meantime, please write to us directly
              to discuss how you can support DESCF's work.
            </p>
            <p className="text-caption text-earth-500 mb-5 italic">
              Note: Update this page with your donation processor (bKash, PayPal, bank transfer etc.)
              once configured. This is a placeholder section.
            </p>
            <Link href="/contact" className="btn-cta">Contact us to donate</Link>
          </div>

          <div className="text-center text-body-sm text-earth-500 italic">
            DESCF is committed to transparent use of all funds received. Audited financial
            statements will be published on our Governance page.
          </div>
        </div>
      </section>
    </>
  )
}
