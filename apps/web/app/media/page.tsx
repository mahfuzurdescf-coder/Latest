import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Media | DESCF',
  description:
    'DESCF media information, approved communication assets, press guidance, and public conservation messaging.',
}

const mediaStandards = [
  {
    label: 'Approved',
    title: 'Use verified material',
    text: 'Photos, captions, names, dates, and claims should be checked before public or media use.',
  },
  {
    label: 'Careful',
    title: 'Avoid sensational wildlife messaging',
    text: 'Media content should not increase panic, promote risky handling, or exaggerate danger.',
  },
  {
    label: 'Useful',
    title: 'Support public understanding',
    text: 'Media communication should make conservation, coexistence, and safety easier to understand.',
  },
]

export default function MediaPage() {
  return (
    <main>
      <section className="bg-[#0b2410] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#d3a126]">
              DESCF Media
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Media communication without fear-based storytelling.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/88">
              This section should support journalists, media partners,
              institutions, and public communicators with approved information,
              responsible language, and conservation-focused context.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/resources" className="rounded-xl bg-[#c99522] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ad801b]">
                Back to resources
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2410]">
                Media contact
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d3a126]">
              Media principle
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight">
              Communicate wildlife with accuracy, restraint, and responsibility.
            </h2>
            <p className="mt-5 leading-7 text-white/82">
              DESCF media material should protect credibility. Avoid dramatic
              language, unsupported impact claims, and unsafe wildlife behaviour.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-[#fbf8f1]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#315b2c]">
            Media standard
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#24160f] sm:text-5xl">
            Public communication should reduce confusion, not create noise.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mediaStandards.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[#ead8bd] bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">{item.label}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-[#24160f]">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#7b4f36]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[1fr_0.8fr] lg:px-8">
          <div className="rounded-[2rem] border border-dashed border-[#d7c19f] bg-[#fbf8f1] p-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">
              Media kit
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#24160f]">
              Approved media materials are being prepared.
            </h2>
            <p className="mt-5 leading-7 text-[#7b4f36]">
              Future media assets can include approved photos, organisational
              profile, press notes, speaker information, public safety messages,
              and media-use guidelines.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#ead8bd] bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">
              Contact
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-[#24160f]">
              Need official DESCF information?
            </h3>
            <p className="mt-4 leading-7 text-[#7b4f36]">
              Use the contact page for institutional collaboration, media
              enquiries, and responsible conservation communication.
            </p>
            <Link href="/contact" className="mt-8 inline-flex rounded-xl border border-[#315b2c] px-5 py-3 text-sm font-bold text-[#315b2c] transition hover:bg-[#315b2c] hover:text-white">
              Contact DESCF
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
