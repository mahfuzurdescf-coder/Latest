import type { Metadata } from 'next'
import Link from 'next/link'

import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { GOVERNANCE_DOCUMENTS_QUERY, POLICIES_QUERY } from '@/lib/sanity/queries'

export const metadata: Metadata = buildMetadata({
  title: 'Governance',
  description:
    'DESCF governance page outlining accountability, transparency, responsible communication, safeguarding, document standards, policy standards, and institutional trust.',
  canonicalUrl: 'https://descf.org/governance',
})

const jsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Governance', url: 'https://descf.org/governance' },
])

type GovernanceDocument = {
  _id?: string
  title?: string
  summary?: string
  fileUrl?: string
  url?: string
  externalUrl?: string
  documentType?: string
  type?: string
  category?: string
}

type PolicyDocument = {
  _id?: string
  title?: string
  summary?: string
}
const governanceAreas = [
  {
    eyebrow: 'Accountability',
    title: 'Clear responsibility',
    text: 'DESCF should make institutional responsibilities, public records, and contact routes easier for visitors, partners, and communities to understand.',
  },
  {
    eyebrow: 'Transparency',
    title: 'Readable public records',
    text: 'Governance documents, policies, reports, and public notes should be presented with context, date, source, and document type wherever available.',
  },
  {
    eyebrow: 'Communication',
    title: 'No inflated claims',
    text: 'Public language should avoid exaggerated impact statements, unclear partnership wording, and unsupported conservation claims.',
  },
  {
    eyebrow: 'Safeguarding',
    title: 'Safety-first communication',
    text: 'Snake and wildlife communication should reduce panic and risky behaviour. Public guidance should remain calm, careful, and safety-oriented.',
  },
  {
    eyebrow: 'Documents',
    title: 'Reviewed before publication',
    text: 'Documents should be checked before publication so the website becomes a credible record, not a dumping place for random files.',
  },
  {
    eyebrow: 'Policy standard',
    title: 'Updateable institutional practice',
    text: 'Policies should be structured so DESCF can maintain them through Sanity CMS without redesigning the website each time.',
  },
]

const policyPrinciples = [
  'Publish only reviewed governance documents.',
  'Keep policy language readable for general visitors.',
  'Separate verified records from future plans.',
  'Label document type, source, and purpose clearly.',
  'Avoid unsupported impact or partnership claims.',
  'Keep policies updateable through Sanity CMS.',
]

const trustStandards = [
  {
    title: 'Evidence before claim',
    text: 'Institutional statements should be based on verified records, documented work, or clearly framed future plans.',
  },
  {
    title: 'Responsible public guidance',
    text: 'Wildlife communication should prioritise public safety, ecological accuracy, and careful wording.',
  },
  {
    title: 'Consistent document control',
    text: 'Governance materials should remain organised by title, type, summary, and publication status.',
  },
]

function getDocumentHref(item: GovernanceDocument) {
  return item?.fileUrl || item?.url || item?.externalUrl || '#'
}

function getDocumentMeta(item: GovernanceDocument) {
  return item?.documentType || item?.type || item?.category || 'Governance document'
}

export default async function GovernancePage() {
  const [documents, policies] = await Promise.all([
    sanityFetch<GovernanceDocument[]>({
      query: GOVERNANCE_DOCUMENTS_QUERY,
      tags: ['governanceDocument'],
    }).catch(() => []),
    sanityFetch<PolicyDocument[]>({
      query: POLICIES_QUERY,
      tags: ['policy'],
    }).catch(() => []),
  ])

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-earth-200 bg-[#fbf7ed] bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Governance
              </p>
              <h1 className="max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] text-earth-950 md:text-7xl">
                Accountability systems for serious conservation work.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-earth-700">
                DESCF’s governance page explains how the organisation approaches accountability, transparency, responsible communication, safeguarding, policy standards, and public trust.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/resources" className="btn-primary px-5 py-3 text-sm">
                  View resources
                </Link>
                <Link href="/contact" className="btn-secondary px-5 py-3 text-sm">
                  Governance contact
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-forest-950 p-8 text-white shadow-card-lg">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold-300">
                Governance principle
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                Trust is built through records, restraint, and clear standards.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/82">
                This is not a people page. It is the public home for DESCF’s accountability, document standards, policy approach, and safety-first communication principles.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">{documents.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Records
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">{policies.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Policies
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="font-serif text-3xl">CMS</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Ready
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
              Governance framework
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
              Governance should make the organisation easier to evaluate.
            </h2>
            <p className="mt-5 text-base leading-7 text-earth-700">
              Visitors should be able to understand what DESCF is accountable for, how public documents are handled, and how institutional communication stays careful.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {governanceAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6 shadow-card"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-forest-800">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-earth-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Institutional trust
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
                Credibility depends on what DESCF can responsibly show.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-earth-700">
                A serious conservation website should separate verified work, published records, policy commitments, and future plans. That discipline protects the organisation from overclaiming.
              </p>
            </div>

            <div className="grid gap-5">
              {trustStandards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <h3 className="font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-earth-700">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Governance documents
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
                Published documents should appear with context.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-earth-700">
                Documents should not appear as vague PDFs. Each record should have a clear title, type, summary, and public purpose wherever possible.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-earth-200 bg-earth-50 p-7 shadow-card">
              {documents.length ? (
                <div className="space-y-5">
                  {documents.map((item, index) => (
                    <article
                      key={item?._id || item?.title || index}
                      className="border-t border-earth-200 pt-5 first:border-t-0 first:pt-0"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                        {getDocumentMeta(item)}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl leading-tight text-earth-950">
                        {item?.title || 'Governance document'}
                      </h3>
                      {item?.summary && (
                        <p className="mt-3 text-sm leading-7 text-earth-700">
                          {item.summary}
                        </p>
                      )}
                      {getDocumentHref(item) !== '#' && (
                        <Link
                          href={getDocumentHref(item)}
                          className="mt-4 inline-flex text-sm font-semibold text-forest-800 hover:text-forest-950"
                          target={getDocumentHref(item).startsWith('http') ? '_blank' : undefined}
                          rel={getDocumentHref(item).startsWith('http') ? 'noreferrer' : undefined}
                        >
                          Open document →
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-earth-300 bg-white p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                    No records yet
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
                    No governance documents published yet.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-earth-700">
                    Policies, governance notes, accountability documents, and reviewed institutional records will appear here after publication in Sanity Studio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Policy standard
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
                Policies should be useful, readable, and maintainable.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-earth-700">
                Governance should not depend on hidden internal knowledge. The website and CMS should help DESCF maintain better public records over time.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {policyPrinciples.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-earth-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-earth-800 shadow-card"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {policies.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {policies.map((item, index) => (
                <article
                  key={item?._id || item?.title || index}
                  className="rounded-[1.5rem] border border-earth-200 bg-white p-6 shadow-card"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
                    Policy
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                    {item?.title || 'Policy document'}
                  </h3>
                  {item?.summary && (
                    <p className="mt-4 text-sm leading-7 text-earth-700">{item.summary}</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-gold-300">
                  Governance contact
                </p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Accountability improves when communication is clear.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
                  For governance, policy, safeguarding, document, or institutional enquiries, contact DESCF with a clear purpose and relevant context.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-light px-5 py-3 text-sm">
                  Contact DESCF
                </Link>
                <Link href="/resources" className="btn-outline-light px-5 py-3 text-sm">
                  View resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}



