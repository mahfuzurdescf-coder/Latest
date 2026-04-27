import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { TEAM_MEMBERS_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@/components/portable-text/PortableText'
import { urlForImage } from '@/lib/sanity/image'
import type { TeamMember } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Leadership & Governance',
  description: 'Meet the leadership team of the Deep Ecology and Snake Conservation Foundation.',
}

export default async function LeadershipPage() {
  const members = await sanityFetch<TeamMember[]>({
    query: TEAM_MEMBERS_QUERY,
    tags: ['teamMember'],
  })

  const team = members ?? PLACEHOLDER_TEAM

  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-4">Organisation</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-4">
            Leadership &amp; Governance
          </h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            DESCF is led by a founding team committed to field-honest conservation practice in Bangladesh.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => {
              const imageUrl = member.photo
                ? urlForImage(member.photo)?.width(400).height(400).url()
                : null

              return (
                <div key={member._id} className="bg-earth-50 rounded-xl border border-earth-200 overflow-hidden">
                  <div className="aspect-square bg-forest-800 relative">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={member.photo?.alt ?? member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-serif font-medium text-forest-200">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-h5 font-medium text-earth-900 mb-0.5">{member.name}</h3>
                    <p className="text-body-sm text-forest-700 font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <div className="text-body-sm text-earth-600 leading-relaxed line-clamp-4">
                        <PortableText value={member.bio} />
                      </div>
                    )}
                    {member.social && (
                      <div className="flex gap-3 mt-4">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="text-caption text-earth-400 hover:text-forest-700 transition-colors">
                            LinkedIn
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                            className="text-caption text-earth-400 hover:text-forest-700 transition-colors">
                            Twitter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 p-6 bg-earth-50 rounded-xl border border-earth-200">
            <p className="section-label text-earth-500 mb-2">Governance</p>
            <p className="text-body text-earth-700 mb-4">
              DESCF is governed by its Board of Directors. Governance documents, financial statements,
              and organisational policies are published on our Governance page.
            </p>
            <Link href="/governance" className="btn-secondary">View governance documents</Link>
          </div>
        </div>
      </section>
    </>
  )
}

const PLACEHOLDER_TEAM: TeamMember[] = [
  { _id: '1', _type: 'teamMember', name: 'Md. Mahfuzur Rahman',  slug: { current: 'mahfuzur-rahman' },  role: 'Chairperson',          order: 1 },
  { _id: '2', _type: 'teamMember', name: 'Syeda Anannya Faria',  slug: { current: 'anannya-faria' },    role: 'Executive Director',   order: 2 },
  { _id: '3', _type: 'teamMember', name: 'Alkama Azad',          slug: { current: 'alkama-azad' },      role: 'Director',             order: 3 },
  { _id: '4', _type: 'teamMember', name: 'Tamanna Israt Mim',    slug: { current: 'tamanna-mim' },      role: 'Director',             order: 4 },
]
