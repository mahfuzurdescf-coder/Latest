import Link from 'next/link'

import { ArticleCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { PostCard } from '@/types/sanity'

interface HomeNewsroomProps {
  posts: PostCard[]
}

export function HomeNewsroom({ posts }: HomeNewsroomProps) {
  return (
    <Section className="bg-[#f8f4eb]">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Newsroom"
            title="Updates, field notes, and conservation stories"
            description="Read selected updates and insights from DESCF conservation communication work."
            className="mb-0"
          />

          <Button href="/newsroom" variant="secondary">
            View all stories
          </Button>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="Stories are being prepared"
              description="DESCF articles, updates, and field notes will appear here once they are added in the CMS."
              actionLabel="Browse newsroom"
              actionHref="/newsroom"
            />
          </div>
        )}

        <div className="mt-8 text-sm text-earth-600">
          <Link href="/newsroom" className="font-semibold text-forest-700 hover:text-forest-900">
            Go to newsroom →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
