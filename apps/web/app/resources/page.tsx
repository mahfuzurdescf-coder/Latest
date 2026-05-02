import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources | DESCF',
  description:
    'DESCF resources, reports, evidence, media materials, and public conservation knowledge for responsible biodiversity communication in Bangladesh.',
}

const resourceCards = [
  {
    eyebrow: 'Reports & Publications',
    title: 'Formal records, reports, and publications',
    description:
      'A place for verified reports, institutional publications, field summaries, research notes, and public documents when DESCF is ready to publish them.',
    href: '/reports-publications',
    cta: 'View reports',
  },
  {
    eyebrow: 'Evidence & Resources',
    title: 'Evidence-based conservation materials',
    description:
      'Learning resources, safety notes, field evidence, explainers, and reference materials that support responsible public understanding.',
    href: '/evidence-resources',
    cta: 'Explore evidence',
  },
  {
    eyebrow: 'Media',
    title: 'Media-ready conservation communication',
    description:
      'A future space for press notes, approved photos, public communication assets, and media guidance without overclaiming impact.',
    href: '/media',
    cta: 'Visit media',
  },
]

const principles = [
  {
    label: 'Credibility',
    title: 'Publish only what can be verified',
    text: 'Resources should strengthen trust. Avoid inflated numbers, vague claims, and unsupported impact language.',
  },
  {
    label: 'Safety',
    title: 'Education before reaction',
    text: 'Snake and wildlife resources should reduce fear, discourage risky handling, and guide people toward safer public response.',
  },
  {
    label: 'Access',
    title: 'Readable for general visitors',
    text: 'Scientific information should be translated into clear public language without weakening accuracy.',
  },
  {
    label: 'Archive',
    title: 'Organised for long-term growth',
    text: 'Reports, media, evidence, articles, and field-guide resources should grow through Sanity without redesigning the website each time.',
  },
]

export default function ResourcesPage() {
  return (
    <main>
      <section className="bg-[#0b2410] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:items-center lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#d3a126]">
              DESCF Resources
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Public knowledge that is useful, careful, and accountable.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/88">
              DESCF resources should work as a credible public knowledge system:
              reports, evidence, media material, safety-first explainers, and
              conservation learning documents arranged in one clear place.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/evidence-resources"
                className="rounded-xl bg-[#c99522] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#ad801b]"
              >
                Explore resources
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2410]"
              >
                Contact DESCF
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d3a126]">
              Resource principle
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
              Not a dumping ground — a disciplined conservation archive.
            </h2>
            <p className="mt-5 leading-7 text-white/82">
              Every resource should have a purpose: help people understand
              biodiversity, support safer response, document conservation work,
              or make DESCF easier to trust.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                <p className="font-serif text-3xl">3</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Core hubs
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                <p className="font-serif text-3xl">CMS</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Ready
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                <p className="font-serif text-3xl">Safe</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Language
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-[#fbf8f1]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#315b2c]">
            Resource sections
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="font-serif text-4xl leading-tight text-[#24160f] sm:text-5xl">
              Organise public material before publishing more of it.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[#7b4f36]">
              The mistake would be to upload scattered PDFs, photos, and links.
              DESCF needs a structured resource system where each item has a
              clear type, purpose, date, source, and public value.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {resourceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex min-h-[360px] flex-col rounded-[1.65rem] border border-[#ead8bd] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">
                  {card.eyebrow}
                </p>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-[#24160f]">
                  {card.title}
                </h3>
                <p className="mt-5 flex-1 leading-7 text-[#7b4f36]">
                  {card.description}
                </p>
                <span className="mt-8 text-sm font-bold text-[#315b2c]">
                  {card.cta} <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#315b2c]">
              Publishing standard
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#24160f] sm:text-5xl">
              Every resource should make DESCF more trustworthy.
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-[#7b4f36]">
              The public site should not look like random content storage. It
              should behave like a serious conservation institution: careful,
              readable, verifiable, and safety-first.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.4rem] border border-[#ead8bd] bg-[#fbf8f1] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#315b2c]">
                  {item.label}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-[#24160f]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-[#7b4f36]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] bg-[#0b2410] p-8 text-white shadow-2xl md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d3a126]">
                Next step
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                Build resources slowly, but structure them correctly from day one.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/84">
                Keep this page as the central hub. Later, Sanity can manage
                individual reports, resource files, media kits, and downloadable
                materials without changing the public design.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0b2410] transition hover:bg-[#f3ead9] md:mt-0"
            >
              Share a resource
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}