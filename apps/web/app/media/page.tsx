import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { NEWSROOM_PAGE_QUERY } from '@/lib/sanity/queries'
import { ArticleCard } from '@/components/cards'
import { SectionHeader } from '@/components/ui'
import type { PostCard } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Media',
  description: 'News coverage, press mentions, and media resources from DESCF — the Deep Ecology and Snake Conservation Foundation.',
}

export default async function MediaPage() {
  const data = await sanityFetch<{ latestPosts: PostCard[] }>({
    query: NEWSROOM_PAGE_QUERY,
    tags: ['post'],
  })

  const news = (data?.latestPosts ?? []).filter(
    p => p.contentType === 'news' || p.contentType === 'event-update'
  )

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Press & media</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Media</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            News updates, press mentions, and media resources from DESCF.
          </p>
        </div>
      </section>

      <section className="section-padding container-site">
        {news.length > 0 ? (
          <>
            <SectionHeader label="Latest" title="News & updates" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map(p => <ArticleCard key={p._id} post={p} />)}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-earth-500">
            <p className="text-h4 font-serif mb-2">No media updates yet</p>
            <p className="text-body-sm">
              Publish news or event-update posts in the CMS to populate this page.
            </p>
          </div>
        )}

        {/* Media contact */}
        <div className="mt-16 p-8 bg-earth-50 rounded-2xl border border-earth-200 max-w-prose">
          <h2 className="text-h3 font-serif text-earth-900 mb-3">Media enquiries</h2>
          <p className="text-body text-earth-700 mb-5 leading-relaxed">
            Journalists and media professionals can reach DESCF for quotes, expert commentary
            on wildlife conservation in Bangladesh, or photography access.
          </p>
          <a href="mailto:media@descf.org" className="btn-primary">
            media@descf.org
          </a>
        </div>
      </section>
    </>
  )
}
