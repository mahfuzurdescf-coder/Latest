import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Team',
  description:
    'Meet the founder, committee members, advisors, ambassadors, and campus teams connected with Deep Ecology and Snake Conservation Foundation.',
  canonicalUrl: 'https://descf.org/team',
})

type ProfileCard = {
  eyebrow: string
  title: string
  role: string
  text: string
}

const currentCommittee: ProfileCard[] = [
  {
    eyebrow: 'Committee',
    title: 'Executive / Core Member',
    role: 'Programme coordination',
    text: 'Supports DESCF programmes, field learning, awareness work, documentation, and organisational coordination.',
  },
  {
    eyebrow: 'Committee',
    title: 'Executive / Core Member',
    role: 'Public communication',
    text: 'Helps translate conservation knowledge into responsible public messages, events, and learning materials.',
  },
  {
    eyebrow: 'Committee',
    title: 'Executive / Core Member',
    role: 'Field and documentation support',
    text: 'Supports biodiversity documentation, activity records, evidence collection, and field-informed learning.',
  },
]

const advisors: ProfileCard[] = [
  {
    eyebrow: 'Advisor',
    title: 'Advisory Council Member',
    role: 'Scientific and ecological guidance',
    text: 'Provides guidance on biodiversity knowledge, conservation ethics, field learning, and responsible public interpretation.',
  },
  {
    eyebrow: 'Advisor',
    title: 'Advisory Council Member',
    role: 'Education and institutional guidance',
    text: 'Supports DESCF through education strategy, institutional collaboration, review, and long-term capacity building.',
  },
  {
    eyebrow: 'Advisor',
    title: 'Advisory Council Member',
    role: 'Communication and governance advice',
    text: 'Helps strengthen credibility, public messaging, documentation standards, and organisational decision-making.',
  },
]

const ambassadors: ProfileCard[] = [
  {
    eyebrow: 'Ambassador',
    title: 'Deep Ecology Ambassador',
    role: 'Public awareness',
    text: 'Uses public reach to support verified conservation messages, safer wildlife response, and biodiversity awareness.',
  },
  {
    eyebrow: 'Ambassador',
    title: 'Deep Ecology Ambassador',
    role: 'Youth engagement',
    text: 'Helps connect students and young audiences with nature learning, conservation values, and responsible action.',
  },
  {
    eyebrow: 'Ambassador',
    title: 'Deep Ecology Ambassador',
    role: 'Media and campaign support',
    text: 'Amplifies DESCF campaigns, events, safety notes, and public education messages without sensationalising wildlife.',
  },
]

const campusCommittees = [
  {
    title: 'University campus committee',
    text: 'Campus-based members can organise awareness sessions, student engagement, learning activities, and event support.',
  },
  {
    title: 'Field learning volunteers',
    text: 'Students and volunteers can support observation, documentation, public education, and responsible biodiversity learning.',
  },
  {
    title: 'Youth conservation network',
    text: 'Campus committees should develop future conservation communicators, educators, and responsible public leaders.',
  },
]

function PersonCard({ item }: { item: ProfileCard }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-earth-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-lg">
      <div className="flex aspect-[4/3] items-center justify-center bg-forest-950 text-center text-white">
        <div className="px-6">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold-300">
            {item.eyebrow}
          </p>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Verified photo
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-forest-800">
          {item.role}
        </p>
        <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-earth-700">{item.text}</p>
      </div>
    </article>
  )
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-earth-700">{text}</p>
    </div>
  )
}

export default function TeamPage() {
  return (
    <main>
      <section className="border-b border-earth-200 bg-[#fbf7ed] bg-[radial-gradient(circle_at_top_right,rgba(173,125,37,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(95,135,79,0.16),transparent_32%)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                DESCF Team
              </p>

              <h1 className="max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] text-earth-950 md:text-7xl">
                People behind conservation learning, public awareness, and responsible action.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-earth-700">
                DESCF’s team page should present the founder, working committee,
                advisors, ambassadors, and campus committees with verified profiles,
                clear roles, and responsible public representation.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary px-5 py-3 text-sm">
                  Contact DESCF
                </Link>
                <Link href="/partner" className="btn-secondary px-5 py-3 text-sm">
                  Partner with us
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-forest-950 p-8 text-white shadow-card-lg">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold-300">
                People principle
              </p>

              <h2 className="mt-5 font-serif text-3xl leading-tight">
                A team page should build trust, not become a random gallery.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/82">
                Every person shown here should have a verified name, approved photo,
                clear role, and a short explanation of how they support DESCF’s
                conservation mission.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Founder
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
                Founder profile should receive a dedicated, dignified space.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-earth-700">
                The founder section should briefly explain the founding vision,
                conservation commitment, public responsibility, and role in shaping
                DESCF’s institutional direction.
              </p>
            </div>

            <article className="rounded-[2rem] border border-earth-200 bg-earth-50 p-6 shadow-card md:p-8">
              <div className="grid gap-6 md:grid-cols-[190px_1fr] md:items-center">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-forest-950 text-center text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-300">
                      Founder
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Verified photo
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-forest-800">
                    Founder spotlight
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
                    Founder name and short note will be added after verification.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-earth-700">
                    This space is reserved for the founder’s official profile, short
                    biography, founding motivation, and public message. Add only
                    verified information and an approved photo.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <SectionIntro
            eyebrow="Current Committee"
            title="The working committee should be visible as a serious operational team."
            text="Committee members are not less important than ambassadors. They are the people who help carry DESCF’s daily coordination, events, documentation, communication, and public-facing work."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {currentCommittee.map((item) => (
              <PersonCard key={`${item.eyebrow}-${item.role}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <SectionIntro
            eyebrow="Advisory Council"
            title="Advisors should be presented with the same visual respect as public ambassadors."
            text="The advisory council should show individual advisors with approved photos and short role descriptions. This makes the section credible, not decorative."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {advisors.map((item) => (
              <PersonCard key={`${item.eyebrow}-${item.role}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <SectionIntro
            eyebrow="Deep Ecology Ambassadors"
            title="Ambassadors should be highlighted as responsible public messengers."
            text="Public figures can help DESCF reach wider audiences, but their role should stay tied to verified conservation communication, education, and safe public awareness."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {ambassadors.map((item) => (
              <PersonCard key={`${item.eyebrow}-${item.role}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-forest-800">
                Campus Committees
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-earth-950 md:text-5xl">
                Campus teams can turn conservation awareness into youth-led public learning.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-earth-700">
                Campus committees should be shown as a structured network. Later,
                each campus can have a committee photo, coordinator name, member list,
                activity record, and contact route.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {campusCommittees.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-earth-200 bg-earth-50 p-6 shadow-card"
                >
                  <h3 className="font-serif text-2xl leading-tight text-earth-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-earth-700">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-card-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-gold-300">
                  Public representation
                </p>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em]">
                  Team visibility should strengthen DESCF’s credibility.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
                  Add real profiles only after names, photos, roles, and public
                  descriptions are verified by DESCF.
                </p>
              </div>

              <Link href="/contact" className="btn-primary px-5 py-3 text-sm">
                Contact DESCF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
