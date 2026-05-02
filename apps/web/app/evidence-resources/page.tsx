import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Evidence & Resources | DESCF',
  description:
    'DESCF evidence-based conservation resources, safety notes, explainers, and field learning materials.',
}

const resourceTypes = [
  {
    label: 'Safety',
    title: 'Snake and wildlife safety notes',
    text: 'Public guidance should reduce fear, discourage risky handling, and support safer response.',
  },
  {
    label: 'Evidence',
    title: 'Field-informed learning',
    text: 'Resources should connect observation, documentation, ecological context, and responsible communication.',
  },
  {
    label: 'Explainers',
    title: 'Simple public education',
    text: 'Complex biodiversity issues should be explained in language that general readers can understand.',
  },
]

export default function EvidenceResourcesPage() {
  return (
    <main>
      <section className="bg-[#0b2410] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-32">
          <div>
            <p className="section-label mb-5 text-gold-300">
              Evidence & Resources
            </p>
            <h1 className="max-w-3xl text-h1">
              Evidence-based learning for safer biodiversity awareness.
            </h1>
            <p className="mt-8 max-w-2xl text-body-lg text-forest-100/80">
              This section should hold DESCF's public explainers, learning
              resources, safety notes, field evidence, and conservation
              education materials in a structured, responsible format.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/resources" className="rounded-xl bg-[#c99522] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ad801b]">
                Back to resources
              </Link>
              <Link href="/bangladesh-wildlife/snakes" className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2410]">
                Snake field guide
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8">
            <p className="section-label text-gold-300">
              Resource principle
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight">
              Education first. Panic never.
            </h2>
            <p className="mt-5 leading-7 text-white/82">
              DESCF resources should help people understand nature before
              fearing it. The tone must stay calm, accurate, practical, and
              safety-first.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">
            Resource types
          </p>
          <h2 className="mt-4 max-w-3xl text-h2 text-earth-950">
            Build a resource library people can actually use.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {resourceTypes.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[#ead8bd] bg-white p-7 shadow-sm">
                <p className="section-label">{item.label}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">{item.title}</h3>
                <p className="mt-4 leading-7 text-earth-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] border border-dashed border-[#d7c19f] bg-earth-50 p-10">
            <p className="section-label">
              Resource library
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-earth-950">
              Evidence resources are being prepared.
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-earth-700">
              Later, Sanity can manage resource title, category, summary,
              downloadable file, related species, related programme, and public
              safety note. Do not rush content before the structure is stable.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

