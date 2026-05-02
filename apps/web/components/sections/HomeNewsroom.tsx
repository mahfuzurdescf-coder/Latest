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
  if (!posts.length) return null

  return (
    <Section className="bg-forest-50">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="à¦ªà§à¦°à¦•à§ƒà¦¤à¦¿ à¦•à¦¥à¦¾"
            title="A calmer editorial space for nature, wildlife, and coexistence"
            description="Read selected stories, field notes, reflections, and conservation writing from DESCFâ€™s nature-focused editorial space."
            className="mb-0 max-w-3xl"
          />

          <Button href="/prokriti-kotha" variant="secondary">
            Read à¦ªà§à¦°à¦•à§ƒà¦¤à¦¿ à¦•à¦¥à¦¾
          </Button>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="border-forest-100 bg-white/90 shadow-card hover:border-forest-300"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="à¦ªà§à¦°à¦•à§ƒà¦¤à¦¿ à¦•à¦¥à¦¾ is being prepared"
              description="Nature stories, field notes, and conservation reflections will appear here once they are added in the CMS."
              actionLabel="Visit à¦ªà§à¦°à¦•à§ƒà¦¤à¦¿ à¦•à¦¥à¦¾"
              actionHref="/prokriti-kotha"
            />
          </div>
        )}

        <div className="mt-8 text-sm text-earth-600">
          <Link href="/prokriti-kotha" className="font-semibold text-forest-700 hover:text-forest-950">
            Go to à¦ªà§à¦°à¦•à§ƒà¦¤à¦¿ à¦•à¦¥à¦¾ â†’
          </Link>
        </div>
      </Container>
    </Section>
  )
}