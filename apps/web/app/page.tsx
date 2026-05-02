import type { Metadata } from 'next'

import { HomeCTA } from '@/components/sections/HomeCTA'
import { HomeGatewaySection } from '@/components/sections/HomeGatewaySection'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeTrustStrip } from '@/components/sections/HomeTrustStrip'
import { HomeNewsroom } from '@/components/sections/HomeNewsroom'
import { HomeProgrammes } from '@/components/sections/HomeProgrammes'
import { HomeResources } from '@/components/sections/HomeResources'
import { buildOrganizationJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { HOME_PAGE_QUERY, HOMEPAGE_CURATION_QUERY } from '@/lib/sanity/queries'
import type {
  HomepageCuration,
  PostCard,
  ProgrammeCard,
  ResourceCard,
  SiteSettings,
} from '@/types/sanity'

type HomePageData = {
  settings?: SiteSettings | null
  featuredPosts?: PostCard[]
  latestPosts?: PostCard[]
  currentProgrammes?: ProgrammeCard[]
  allProgrammes?: ProgrammeCard[]
  editorPicks?: PostCard[]
  latestResources?: ResourceCard[]
}

export const metadata: Metadata = buildMetadata({
  title: 'Deep Ecology and Snake Conservation Foundation',
  description:
    'DESCF is a Bangladesh-based conservation organisation working on biodiversity, snake conservation, awareness, research, and human-wildlife coexistence.',
  canonicalUrl: 'https://descf.org',
})

export default async function HomePage() {
  const [data, curation] = await Promise.all([
    sanityFetch<HomePageData>({
      query: HOME_PAGE_QUERY,
      tags: ['siteSettings', 'post', 'programme', 'resource'],
    }),
    sanityFetch<HomepageCuration | null>({
      query: HOMEPAGE_CURATION_QUERY,
      tags: ['homepageCuration', 'post', 'programme', 'resource'],
    }),
  ])

  const programmes =
    curation?.featuredProgrammes && curation.featuredProgrammes.length > 0
      ? curation.featuredProgrammes
      : data.currentProgrammes && data.currentProgrammes.length > 0
        ? data.currentProgrammes
        : data.allProgrammes ?? []

  const fallbackPosts = [
    ...(data.featuredPosts ?? []),
    ...(data.editorPicks ?? []),
    ...(data.latestPosts ?? []),
  ]

  const posts =
    curation?.featuredPosts && curation.featuredPosts.length > 0
      ? curation.featuredPosts
      : fallbackPosts

  const uniquePosts = Array.from(
    new Map(posts.map((post) => [post._id, post])).values(),
  )

  const resources =
    curation?.featuredResources && curation.featuredResources.length > 0
      ? curation.featuredResources
      : data.latestResources ?? []

  const organizationJsonLd = buildOrganizationJSONLD()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <main id="main-content">
        <HomeHero curation={curation} />
        <HomeGatewaySection />
        <HomeTrustStrip />
        <HomeProgrammes programmes={programmes} />
        <HomeNewsroom posts={uniquePosts} />
        <HomeResources resources={resources} />
        <HomeCTA />
      </main>
    </>
  )
}







