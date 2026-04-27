import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { NEWSROOM_PAGE_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { PostCard, Category } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Conservation writing, field notes, research communication, and updates from DESCF — the Deep Ecology and Snake Conservation Foundation.',
}

interface NewsroomData {
  featuredPosts: PostCard[]
  editorPicks: PostCard[]
  latestPosts: PostCard[]
  categories: Category[]
}

export default async function NewsroomPage() {
  const data = await sanityFetch<NewsroomData>({
    query: NEWSROOM_PAGE_QUERY,
    tags: ['post', 'category'],
  })

  const featured   = data?.featuredPosts ?? []
  const picks      = data?.editorPicks   ?? []
  const latest     = data?.latestPosts   ?? []
  const categories = data?.categories    ?? []

  // Merge: featured first, then rest, deduplicate
  const featuredId  = featured[0]?._id
  const restLatest  = latest.filter(p => p._id !== featuredId)

  return (
    <>
      {/* Header */}
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Conservation writing</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Newsroom</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            Field notes, conservation explainers, research updates, and DESCF news.
          </p>
        </div>
      </section>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="bg-white border-b border-earth-200 sticky top-16 z-40">
          <div className="container-site py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Link
              href="/newsroom"
              className="flex-shrink-0 text-label px-3 py-1.5 rounded-full bg-forest-900 text-forest-50"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/newsroom/category/${cat.slug.current}`}
                className="flex-shrink-0 text-label px-3 py-1.5 rounded-full border border-earth-200 text-earth-600 hover:bg-earth-50 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container-site section-padding space-y-16">

        {/* Featured article — large */}
        {featured[0] && (
          <section>
            <p className="section-label text-forest-700 mb-6">Featured</p>
            <ArticleCard post={featured[0]} featured className="md:grid md:grid-cols-2 md:[&>a:first-child]:rounded-none md:[&>a:first-child]:rounded-l-xl" />
          </section>
        )}

        {/* Editor's picks */}
        {picks.length > 0 && (
          <section>
            <SectionHeader label="Curated" title="Editor's picks" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {picks.map(p => <ArticleCard key={p._id} post={p} />)}
            </div>
          </section>
        )}

        {/* Latest articles */}
        {restLatest.length > 0 && (
          <section>
            <SectionHeader label="Recent" title="Latest articles" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restLatest.slice(0, 9).map(p => <ArticleCard key={p._id} post={p} />)}
            </div>
          </section>
        )}

        {/* Empty state */}
        {featured.length === 0 && latest.length === 0 && (
          <div className="text-center py-20 text-earth-500">
            <p className="text-h4 font-serif mb-3">No articles published yet</p>
            <p className="text-body-sm">DESCF's newsroom is being set up. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
