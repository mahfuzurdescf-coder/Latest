import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { TAG_BY_SLUG_QUERY, TAG_SLUGS_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { PostCard, Tag } from '@/types/sanity'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: TAG_SLUGS_QUERY, tags: ['post'] })
  return (slugs ?? []).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await sanityFetch<{ tag: Tag }>({
    query: TAG_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })
  if (!data?.tag) return { title: 'Tag not found' }
  return {
    title: `#${data.tag.title} — Newsroom`,
    description: `Articles tagged "${data.tag.title}" from DESCF.`,
  }
}

export default async function TagArchivePage({ params }: Props) {
  const data = await sanityFetch<{ tag: Tag; posts: PostCard[] }>({
    query: TAG_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['post'],
  })

  if (!data?.tag) notFound()
  const { tag, posts = [] } = data

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Tag</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">#{tag.title}</h1>
          <p className="text-body-lg text-forest-300">
            {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with this topic.
          </p>
        </div>
      </section>

      <section className="section-padding container-site">
        {posts.length > 0 ? (
          <>
            <SectionHeader label={`${posts.length} articles`} title={`#${tag.title}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => <ArticleCard key={p._id} post={p} />)}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No articles yet</p>
            <p className="text-body-sm">Articles with this tag will appear here.</p>
          </div>
        )}
      </section>
    </>
  )
}
