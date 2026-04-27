import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { HOME_PAGE_QUERY } from '@/lib/sanity/queries'
import { ArticleCard, ProgrammeCard, ResourceCard } from '@/components/cards'
import { SectionHeader, PartnerCTA, DonationCTA } from '@/components/ui'
import type { PostCard, ProgrammeCard as ProgrammeCardType, ResourceCard as ResourceCardType, SiteSettings } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'DESCF — Deep Ecology and Snake Conservation Foundation',
  description:
    'Deep Ecology and Snake Conservation Foundation — working at the intersection of herpetofauna conservation, public awareness, and human-wildlife coexistence in Bangladesh.',
}

interface HomeData {
  settings: SiteSettings
  featuredPosts: PostCard[]
  latestPosts: PostCard[]
  currentProgrammes: ProgrammeCardType[]
  allProgrammes: ProgrammeCardType[]
  editorPicks: PostCard[]
  latestResources: ResourceCardType[]
}

const IMPACT_STATS = [
  { value: '1,000+', label: 'Snake rescue cases documented' },
  { value: '200+',   label: 'Awareness sessions conducted' },
  { value: '30+',    label: 'Institutions reached' },
  { value: '1,300+', label: 'Students engaged' },
]

export default async function HomePage() {
  const data = await sanityFetch<HomeData>({
    query: HOME_PAGE_QUERY,
    tags: ['post', 'programme', 'resource', 'siteSettings'],
  })

  const featuredPosts    = data?.featuredPosts    ?? []
  const latestPosts      = data?.latestPosts      ?? []
  const currentProgrammes = data?.currentProgrammes ?? []
  const allProgrammes    = data?.allProgrammes    ?? []
  const latestResources  = data?.latestResources  ?? []

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Deep Ecology and Snake Conservation Foundation',
    alternateName: 'DESCF',
    url: 'https://descf.org',
    description: 'Bangladesh-based conservation organisation working at the intersection of herpetofauna protection, public awareness, and human-wildlife coexistence.',
    foundingLocation: { '@type': 'Country', name: 'Bangladesh' },
    areaServed: 'Bangladesh',
    knowsAbout: ['Herpetofauna conservation', 'Snake conservation', 'Wildlife coexistence', 'Passive acoustic monitoring', 'Anuran bioacoustics'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-forest-900 text-forest-50 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-400 via-transparent to-transparent pointer-events-none" />

        <div className="container-site py-24 md:py-32 lg:py-36 relative">
          <div className="max-w-prose-lg">
            <p className="section-label text-forest-500 mb-5">
              Bangladesh · Wildlife conservation · Deep ecology
            </p>
            <h1 className="text-display-md md:text-display-lg font-serif text-forest-50 mb-6 leading-[1.1]">
              Protecting Wildlife<br />
              Through Coexistence<br />
              and Community Action
            </h1>
            <p className="text-body-lg text-forest-300 mb-8 max-w-[560px] leading-relaxed">
              Deep Ecology and Snake Conservation Foundation works at the intersection of
              herpetofauna conservation, public awareness, and human-wildlife coexistence in Bangladesh.
              We do not present ambition as achievement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/current-work" className="btn-primary bg-forest-700 hover:bg-forest-600 text-base px-6 py-3">
                View current work
              </Link>
              <Link href="/programmes" className="btn-secondary border-forest-700 text-forest-300 hover:bg-forest-800 hover:text-forest-50 text-base px-6 py-3">
                Explore programmes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission statement band ───────────────────────────────── */}
      <section className="bg-earth-50 border-b border-earth-200">
        <div className="container-site py-10">
          <p className="text-body-lg text-earth-600 max-w-prose-lg italic font-serif">
            "We work where fear meets wildlife — in communities, fields, and forests — to build a
            Bangladesh where people and snakes can coexist safely."
          </p>
        </div>
      </section>

      {/* ── Impact stats ─────────────────────────────────────────── */}
      <section className="bg-white section-padding-sm border-b border-earth-200">
        <div className="container-site">
          <p className="section-label text-earth-500 mb-8">Current footprint</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-4xl md:text-5xl font-serif font-medium text-forest-800 mb-2">
                  {stat.value}
                </p>
                <p className="text-body-sm text-earth-500 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-caption text-earth-400 italic">
            Figures are indicative and will be updated by DESCF team from CMS. We do not inflate impact claims.
          </p>
        </div>
      </section>

      {/* ── Why this work matters ────────────────────────────────── */}
      <section className="section-padding bg-earth-50">
        <div className="container-site">
          <SectionHeader
            label="Context"
            title="Why this work matters"
            subtitle="Conservation in Bangladesh is shaped by habitat pressure, misinformation about wildlife, and urgent ecological change. DESCF works at this intersection."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🐍',
                title: 'Wildlife under pressure',
                body: 'Rapid habitat loss and fear-driven harm affect snakes, amphibians, and reptiles across Bangladesh. Most incidents stem from misidentification and misinformation.',
              },
              {
                icon: '🤝',
                title: 'Coexistence is possible',
                body: 'Public response determines whether human-snake encounters end in harm or safety. Education and accessible rescue infrastructure change outcomes.',
              },
              {
                icon: '🔬',
                title: 'Better evidence is needed',
                body: 'Long-term conservation in Bangladesh depends on stronger local monitoring, community-based documentation, and structured ecological data.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-earth-200 p-6">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-h5 font-medium text-earth-900 mb-2">{item.title}</h3>
                <p className="text-body-sm text-earth-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes ───────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <SectionHeader
            label="Programme areas"
            title="What DESCF works on"
            subtitle="Our programmes range from active field response to long-term research readiness. Status labels indicate where each programme currently stands."
            action={{ label: 'All programmes', href: '/programmes' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(allProgrammes.length > 0 ? allProgrammes : PLACEHOLDER_PROGRAMMES).slice(0, 6).map((prog) => (
              <ProgrammeCard key={prog._id} programme={prog} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured from newsroom ───────────────────────────────── */}
      {(featuredPosts.length > 0 || latestPosts.length > 0) && (
        <section className="section-padding bg-earth-50">
          <div className="container-site">
            <SectionHeader
              label="From the newsroom"
              title="Conservation writing and field notes"
              action={{ label: 'All articles', href: '/newsroom' }}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredPosts.length > 0 ? featuredPosts : latestPosts).slice(0, 3).map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Resources ────────────────────────────────────────────── */}
      {latestResources.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-site">
            <SectionHeader
              label="Resources"
              title="Reports and concept notes"
              action={{ label: 'All resources', href: '/evidence-resources' }}
            />
            <div className="grid md:grid-cols-2 gap-4 max-w-prose-lg">
              {latestResources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Partner + Donate CTAs ────────────────────────────────── */}
      <section className="section-padding bg-earth-50">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-6">
            <PartnerCTA />
            <DonationCTA />
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Placeholder programmes (shown when CMS has no data yet) ─────────────────

const PLACEHOLDER_PROGRAMMES: ProgrammeCardType[] = [
  { _id: '1', _type: 'programme', title: 'Herpetofauna Conservation', slug: { current: 'herpetofauna-conservation' }, status: 'current', shortDescription: 'Awareness, communication, and response-related work focused on snakes, reptiles, and amphibians in Bangladesh.' },
  { _id: '2', _type: 'programme', title: 'Snake Conservation & Coexistence', slug: { current: 'snake-conservation-coexistence' }, status: 'current', shortDescription: 'Working with communities to change responses to human-snake encounters and reduce fear-driven harm.' },
  { _id: '3', _type: 'programme', title: 'Public Awareness & Conservation Communication', slug: { current: 'public-awareness' }, status: 'current', shortDescription: 'Outreach, education, and communication initiatives that build conservation literacy across communities.' },
  { _id: '4', _type: 'programme', title: 'Passive Acoustic Monitoring', slug: { current: 'passive-acoustic-monitoring' }, status: 'in-preparation', shortDescription: 'Building capacity for sound-based ecological monitoring — a methodological foundation for future biodiversity work.' },
  { _id: '5', _type: 'programme', title: 'Anuran Bioacoustics', slug: { current: 'anuran-bioacoustics' }, status: 'in-preparation', shortDescription: 'Frog call-based monitoring as a pathway toward structured amphibian ecological documentation.' },
  { _id: '6', _type: 'programme', title: 'Climate-Responsive Conservation', slug: { current: 'climate-responsive-conservation' }, status: 'exploratory', shortDescription: 'Exploring how conservation programming must adapt to climate-driven habitat and species distribution shifts.' },
]
