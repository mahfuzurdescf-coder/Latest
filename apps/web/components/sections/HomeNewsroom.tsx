import Link from 'next/link'

import { ArticleCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { PageSection, PostCard } from '@/types/sanity'

const PROKRITI = 'প্রকৃতি কথা'

interface HomeNewsroomProps {
  posts: PostCard[]
  content?: PageSection
}

export function HomeNewsroom({ posts, content }: HomeNewsroomProps) {
  if (!posts.length) return null

  const primaryCta = content?.primaryCta
  const secondaryCta = content?.secondaryCta

  return (
    <Section className="bg-forest-50">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={content?.eyebrow || PROKRITI}
            title={
              content?.title ||
              'A calmer editorial space for nature, wildlife, and coexistence'
            }
            description={
              content?.description ||
              "Read selected stories, field notes, reflections, and conservation writing from DESCF's nature-focused editorial space."
            }
            className="mb-0 max-w-3xl"
          />

          <Button href={primaryCta?.href || '/prokriti-kotha'} variant="secondary">
            {primaryCta?.label || `Read ${PROKRITI}`}
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="border-forest-100 bg-white/90 shadow-card hover:border-forest-300"
            />
          ))}
        </div>

        <div className="mt-8 text-sm text-earth-600">
          <Link
            href={secondaryCta?.href || primaryCta?.href || '/prokriti-kotha'}
            className="font-semibold text-forest-700 hover:text-forest-950"
          >
            {secondaryCta?.label || `Go to ${PROKRITI}`} <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
