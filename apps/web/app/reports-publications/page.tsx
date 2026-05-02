import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reports & Publications | DESCF',
  description:
    'DESCF reports, publications, field summaries, and formal conservation documents.',
}

const standards = [
  {
    label: 'Verified',
    title: 'No inflated claims',
    text: 'Reports should publish only what DESCF can explain, verify, and maintain responsibly.',
  },
  {
    label: 'Readable',
    title: 'Public-friendly language',
    text: 'Technical work should be understandable for students, journalists, partners, and general readers.',
  },
  {
    label: 'Useful',
    title: 'Clear conservation value',
    text: 'Each publication should explain why it matters for biodiversity, public awareness, or safer coexistence.',
  },
]

export default function ReportsPublicationsPage() {
  return (
    <main>
      <section className="bg-[#0b2410] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#d3a126]">
              DESCF Publications
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Reports that document conservation work with credibility.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/88">
              This section should become DESCF's formal archive for reports,
              publications, field summaries, research communication, and public
              documents when they are ready for responsible release.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/resources" className="rounded-xl bg-[#c99522] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ad801b]">
                Back to resources
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2410]">
                Submit document
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d3a126]">
              Publication principle
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight">
              A report should strengthen trust, not just fill space.
            </h2>
            <p className="mt-5 leading-7 text-white/82">
              Every published document should have a clear title, date,
              authorship, purpose, source, and public value. Do not publish
              vague PDFs without context.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-[#fbf8f1]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {standards.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[#ead8bd] bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">{item.label}</p>
                <h2 className="mt-4 font-serif text-2xl leading-tight text-[#24160f]">{item.title}</h2>
                <p className="mt-4 leading-7 text-[#7b4f36]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#315b2c]">
                Document archive
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#24160f] sm:text-5xl">
                Published documents will appear here.
              </h2>
              <p className="mt-6 leading-7 text-[#7b4f36]">
                Add reports and publications from Sanity after the document is
                reviewed, named clearly, and ready for public use.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-dashed border-[#d7c19f] bg-[#fbf8f1] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">
                No records yet
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-[#24160f]">
                Publication library is being prepared.
              </h3>
              <p className="mt-4 leading-7 text-[#7b4f36]">
                Future items can include annual reports, event summaries,
                research notes, public safety explainers, and conservation
                communication documents.
              </p>
              <Link href="/contact" className="mt-8 inline-flex rounded-xl border border-[#315b2c] px-5 py-3 text-sm font-bold text-[#315b2c] transition hover:bg-[#315b2c] hover:text-white">
                Contact DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
