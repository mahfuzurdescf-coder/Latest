import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { AUTHOR_BY_SLUG_QUERY, AUTHOR_SLUGS_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { PortableText } from '@/components/portable-text/PortableText'
import { urlForImage } from '@/lib/sanity/image'
import type { Author, PostCard } from '@/types/sanity'
import { buildMetadata } from '@/lib/seo'
import { buildArticleJSONLD } from '@/lib/json-ld'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: AUTHOR_SLUGS_QUERY, tags: ['author'] })
  return (slugs ?? []).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await sanityFetch<{ author: Author }>({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['author'],
  })
  const author = data?.author
  if (!author) return buildMetadata({ title: 'Author not found' })

  return buildMetadata({
    title: `${author.name} — DESCF`,
    description: `Articles and field notes by ${author.name}, ${author.role ?? ''} at DESCF.`,
  })
}

export default async function AuthorProfilePage({ params }: Props) {
  const data = await sanityFetch<{ author: Author; posts: PostCard[] }>({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ['author', 'post'],
  })

  if (!data?.author) notFound()
  const { author, posts = [] } = data

  const photoUrl = author.photo
    ? urlForImage(author.photo)?.width(200).height(200).url()
    : null

  // JSON-LD structured data for Google Rich Results
  const jsonLd = buildArticleJSONLD({
    title: author.name,
    description: author.bio ? author.bio[0]?.children?.map(c => c.text).join(' ') : undefined,
    url: `https://www.descf.org/newsroom/author/${params.slug}`,
    authorName: author.name,
    datePublished: posts[0]?._createdAt,
    dateModified: posts[0]?._updatedAt,
  })

  return (
    <>
      {/* Inject JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Author Header Section */}
      <section className="bg-earth-50 border-b border-earth-200 section-padding-sm">
        <div className="container-site">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-forest-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {photoUrl ? (
                <Image src={photoUrl} alt={author.photo?.alt ?? author.name} width={80} height={80} className="object-cover" />
              ) : (
                <span className="text-2xl font-serif font-medium text-forest-200">
                  {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-h2 font-serif text-earth-900">{author.name}</h1>
              <p className="text-body text-forest-700 font-medium">{author.orgRole ?? author.role}</p>
              {author.expertise && author.expertise.length > 0 && (
                <p className="text-body-sm text-earth-500 mt-1">{author.expertise.join(' · ')}</p>
              )}
              {author.social && (
                <div className="flex gap-4 mt-3">
                  {author.social.linkedin && (
                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-body-sm text-forest-600 hover:text-forest-800 transition-colors">LinkedIn</a>
                  )}
                  {author.social.twitter && (
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-body-sm text-forest-600 hover:text-forest-800 transition-colors">Twitter</a>
                  )}
                </div>
              )}
            </div>
          </div>

          {author.bio && (
            <div className="mt-6 max-w-prose text-body text-earth-700 leading-relaxed">
              <PortableText value={author.bio} />
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="section-padding container-site">
        <p className="section-label text-earth-500 mb-6">
          {posts.length} article{posts.length !== 1 ? 's' : ''} by {author.name}
        </p>
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => <ArticleCard key={p._id} post={p} />)}
          </div>
        ) : (
          <p className="text-body text-earth-500">No published articles yet.</p>
        )}
      </section>
    </>
  )
}