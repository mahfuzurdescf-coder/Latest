import type { Metadata } from 'next'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { buildBreadcrumbJSONLD } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { TEAM_MEMBERS_QUERY } from '@/lib/sanity/queries'
import type { TeamMember } from '@/types/sanity'

export const metadata: Metadata = buildMetadata({
  title: 'Leadership',
  description:
    'Meet DESCF leadership and team members supporting conservation awareness, biodiversity learning, snake conservation, and institutional communication.',
  canonicalUrl: 'https://descf.org/leadership',
})

const leadershipJsonLd = buildBreadcrumbJSONLD([
  { name: 'Home', url: 'https://descf.org' },
  { name: 'Leadership', url: 'https://descf.org/leadership' },
])

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const imageUrl = member.photo
    ? urlForImage(member.photo)?.width(320).height(320).url()
    : null

  return (
    <Card>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-forest-800 text-white">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={member.photo?.alt ?? member.name}
                width={64}
                height={64}
                className="h-16 w-16 object-cover"
              />
            ) : (
              <span className="font-semibold text-forest-100">
                {getInitials(member.name)}
              </span>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl text-earth-950">
              {member.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-forest-700">
              {member.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LEADERSHIP_PRINCIPLES = [
  'Responsible conservation communication',
  'Field-informed learning and documentation',
  'Public awareness with ethical restraint',
  'Partnerships based on practical conservation value',
]

export default async function LeadershipPage() {
  const teamMembers = await sanityFetch<TeamMember[]>({
    query: TEAM_MEMBERS_QUERY,
    tags: ['teamMember'],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipJsonLd) }}
      />

      <main id="main-content">
        <section className="border-b border-earth-200 bg-earth-50">
          <Container className="section-padding-sm">
            <div className="max-w-3xl">
              <p className="section-label mb-4">Leadership</p>
              <h1 className="font-serif text-h1 text-earth-950">
                Leadership for responsible conservation communication.
              </h1>
              <p className="mt-5 text-body-lg text-earth-700">
                DESCF’s leadership and team structure should support credible conservation
                awareness, field-informed learning, responsible storytelling, and institutional
                accountability.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="Team"
              title="People behind DESCF’s conservation work"
              description="Published team members from Sanity CMS appear here. The page is designed to remain professional even while the team profile library is being expanded."
            />

            {teamMembers.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <TeamMemberCard key={member._id} member={member} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl text-earth-950">
                    Team profiles are being prepared
                  </h2>
                  <p className="mt-3 text-body text-earth-700">
                    Leadership and team information will appear here after profiles are added
                    and published through Sanity CMS.
                  </p>
                </CardContent>
              </Card>
            )}
          </Container>
        </Section>

        <section className="bg-earth-100/70">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="section-label mb-3">Leadership approach</p>
                <h2 className="font-serif text-h2 text-earth-950">
                  DESCF should be led with clarity, restraint, and conservation purpose.
                </h2>
                <p className="mt-5 text-body text-earth-700">
                  Conservation leadership is not only about visibility. It is about building
                  trust, communicating responsibly, avoiding exaggerated claims, and keeping
                  the organisation focused on practical ecological value.
                </p>
              </div>

              <Card>
                <CardContent>
                  <h3 className="font-serif text-2xl text-earth-950">
                    Leadership principles
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {LEADERSHIP_PRINCIPLES.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm text-earth-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-forest-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}