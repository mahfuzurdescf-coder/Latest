import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { CATEGORY_BY_SLUG_QUERY, CATEGORY_SLUGS_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { PostCard, Category } from '@/types/sanity'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: CATEGORY_SLUGS_QUERY, tags: ['category'] })
  return (slugs ?? []).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await sanityFetch<{ category: Category }>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['category', 'post'],
  })
  const cat = data?.category
  if (!cat) return { title: 'Category not found' }
  return {
    title: `${cat.title} — Newsroom`,
    description: cat.description ?? `Articles in the ${cat.title} category from DESCF.`,
  }
}

export default async function CategoryArchivePage({ params }: Props) {
  const data = await sanityFetch<{ category: Category; posts: PostCard[] }>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['category', 'post'],
  })

  if (!data?.category) notFound()
  const { category, posts = [] } = data

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Category</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">{category.title}</h1>
          {category.description && (
            <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">{category.description}</p>
          )}
        </div>
      </section>

      <section className="section-padding container-site">
        {posts.length > 0 ? (
          <>
            <SectionHeader
              label={`${posts.length} article${posts.length !== 1 ? 's' : ''}`}
              title={category.title}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => <ArticleCard key={p._id} post={p} />)}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No articles yet</p>
            <p className="text-body-sm">Articles in this category will appear here.</p>
          </div>
        )}
      </section>
    </>
  )
}
