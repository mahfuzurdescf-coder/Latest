import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { NEWSROOM_PAGE_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { buildMetadata } from '@/lib/seo'
import { buildArticleJSONLD } from '@/lib/json-ld'
import type { PostCard } from '@/types/sanity'

type NewsroomPageData = {
  featuredPosts?: PostCard[]
  editorPicks?: PostCard[]
  latestPosts?: PostCard[]
}

export const metadata: Metadata = buildMetadata({
  title: 'Newsroom',
  description: 'Articles, field notes, updates, and conservation stories from DESCF.',
})

export default async function NewsroomPage() {
  const data = await sanityFetch<NewsroomPageData>({
    query: NEWSROOM_PAGE_QUERY,
    tags: ['post', 'category'],
  })

  const featuredPosts = data?.featuredPosts ?? []
  const editorPicks = data?.editorPicks ?? []
  const latestPosts = data?.latestPosts ?? []

  const allPosts = [
    ...featuredPosts,
    ...editorPicks,
    ...latestPosts,
  ]

  const uniquePosts = Array.from(
    new Map(allPosts.map((post) => [post._id, post])).values(),
  )

  const firstPost = uniquePosts[0]

  const jsonLd = buildArticleJSONLD({
    title: 'Newsroom',
    description: 'Articles, field notes, updates, and conservation stories from DESCF.',
    url: 'https://www.descf.org/newsroom',
    authorName: 'DESCF',
    datePublished: firstPost?.publishedAt,
    dateModified: firstPost?.updatedAt ?? firstPost?.publishedAt,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="section-padding container-site">
        <div className="mb-10 max-w-3xl">
          <p className="section-label mb-3">Newsroom</p>
          <h1 className="text-h1 font-serif text-earth-900">
            Updates, field notes, and conservation stories
          </h1>
          <p className="mt-4 text-body text-earth-600">
            Read DESCF updates, conservation insights, field observations, and public awareness stories.
          </p>
        </div>

        {uniquePosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uniquePosts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-earth-200 bg-white p-8">
            <h2 className="font-serif text-2xl text-earth-900">
              No published articles yet
            </h2>
            <p className="mt-2 text-body text-earth-600">
              Published newsroom content will appear here after it is added in Sanity.
            </p>
          </div>
        )}
      </main>
    </>
  )
}