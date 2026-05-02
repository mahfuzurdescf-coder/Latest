import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | DESCF',
  description:
    'Contact Deep Ecology and Snake Conservation Foundation for conservation collaboration, media queries, education programmes, and responsible public communication.',
}

const contactChannels = [
  {
    label: 'General contact',
    title: 'Email DESCF',
    text: 'For general questions, institutional communication, collaboration requests, and public information.',
    value: 'info@descf.org',
    href: 'mailto:info@descf.org',
    cta: 'Send email',
  },
  {
    label: 'Phone',
    title: 'Call DESCF',
    text: 'Use phone contact for direct communication when email is not suitable.',
    value: '+8801718414517',
    href: 'tel:+8801718414517',
    cta: 'Call now',
  },
  {
    label: 'Office address',
    title: 'Visit / postal contact',
    text: 'Use the address for official communication, institutional reference, or planned visits.',
    value: 'Islamnagar Bazar, Savar, Dhaka-1343.',
    href: 'https://maps.google.com/?q=Islamnagar%20Bazar%2C%20Savar%2C%20Dhaka-1343',
    cta: 'Open map',
  },
]

const inquiryTypes = [
  {
    label: 'Partnership',
    title: 'Institutional collaboration',
    text: 'Universities, researchers, schools, conservation groups, NGOs, and media teams can contact DESCF for responsible collaboration.',
  },
  {
    label: 'Education',
    title: 'Awareness and public learning',
    text: 'Use this route for workshops, field learning, snake awareness, biodiversity education, and conservation communication.',
  },
  {
    label: 'Media',
    title: 'Press and communication',
    text: 'Media queries should ask for verified information, approved photos, correct captions, and safety-first public language.',
  },
  {
    label: 'Wildlife note',
    title: 'Responsible reporting',
    text: 'Share broad location, date, photo, and context where appropriate. Avoid publishing exact sensitive wildlife locations publicly.',
  },
]

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[#0b2410] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-32">
          <div>
            <p className="section-label mb-5 text-gold-300">
              Contact DESCF
            </p>
            <h1 className="max-w-3xl text-h1">
              Start the conversation with clear purpose.
            </h1>
            <p className="mt-8 max-w-2xl text-body-lg text-forest-100/80">
              Contact Deep Ecology and Snake Conservation Foundation for
              conservation collaboration, public education, media queries,
              institutional partnership, and responsible biodiversity
              communication in Bangladesh.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:info@descf.org"
                className="rounded-xl bg-[#c99522] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#ad801b]"
              >
                Email DESCF
              </a>
              <Link
                href="/partner"
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2410]"
              >
                Partner with DESCF
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 shadow-2xl">
            <p className="section-label text-gold-300">
              Communication standard
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
              Serious conservation work needs specific, verifiable messages.
            </h2>
            <p className="mt-5 leading-7 text-white/82">
              Do not send vague requests. Mention who you are, what you need,
              why it matters, the expected date, and whether the request is for
              education, research, media, partnership, or public support.
            </p>

            <div className="mt-8 rounded-2xl border border-gold-300/35 bg-gold-300/10 p-5">
              <p className="text-sm font-bold text-[#f3d28a]">Safety note</p>
              <p className="mt-2 text-sm leading-6 text-white/82">
                DESCF content is for education and conservation awareness. It is
                not a snake handling, catching, or rescue manual.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* LIVE_CONTACT_FORM_SECTION */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
            <div>
              <p className="section-label mb-4">Direct message</p>
              <h2 className="font-serif text-h2 text-earth-950">
                Send DESCF a structured message.
              </h2>
              <p className="mt-5 max-w-xl text-body leading-8 text-earth-700">
                Use this form for partnership, education, media, research, event, or general communication.
                Submissions are stored in DESCF Studio for review.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>


      <section className="border-b border-[#eadfce] bg-earth-50">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <p className="section-label">
            Contact channels
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="text-h2 text-earth-950">
              Use the right contact route.
            </h2>
            <p className="max-w-2xl text-body text-earth-700">
              A strong contact page should not be decorative. It should make
              communication easier, reduce confusion, and help DESCF respond to
              serious requests with proper context.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {contactChannels.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-h-[310px] flex-col rounded-[1.65rem] border border-[#ead8bd] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="section-label">
                  {item.label}
                </p>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-5 leading-7 text-earth-700">{item.text}</p>
                <p className="mt-5 font-bold text-forest-800">{item.value}</p>
                <span className="mt-auto pt-8 text-sm font-bold text-forest-800">
                  {item.cta} <span className="transition group-hover:translate-x-1">â†’</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="section-label">
              Inquiry types
            </p>
            <h2 className="mt-4 text-h2 text-earth-950">
              Make every message useful from the first email.
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-earth-700">
              The public site should guide people toward clear communication:
              who is asking, what they need, what evidence or context they have,
              and what kind of response they expect.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {inquiryTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.4rem] border border-[#ead8bd] bg-earth-50 p-6"
              >
                <p className="section-label">
                  {item.label}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth-950">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-earth-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfce] bg-earth-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#ead8bd] bg-white p-8 shadow-sm md:p-10">
            <p className="section-label">
              Before contacting
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-earth-950">
              Include the details DESCF needs to respond properly.
            </h2>
            <div className="mt-8 grid gap-4 text-earth-700">
              <p className="rounded-2xl bg-earth-50 p-4">
                <strong className="text-earth-950">1.</strong> Your name,
                organisation, and role.
              </p>
              <p className="rounded-2xl bg-earth-50 p-4">
                <strong className="text-earth-950">2.</strong> The purpose of
                the request: partnership, education, media, research, event, or
                general communication.
              </p>
              <p className="rounded-2xl bg-earth-50 p-4">
                <strong className="text-earth-950">3.</strong> Date, location,
                audience, timeline, and expected support.
              </p>
              <p className="rounded-2xl bg-earth-50 p-4">
                <strong className="text-earth-950">4.</strong> Relevant links,
                photos, files, or context where appropriate.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e0c48f] bg-[#fff9e9] p-8 shadow-sm md:p-10">
            <p className="section-label">
              Public safety
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-earth-950">
              For wildlife situations, do not create risk for a photo.
            </h3>
            <p className="mt-5 leading-7 text-earth-700">
              Keep distance, avoid crowding, do not attempt to catch or handle
              wildlife, and seek help from trained responders or relevant
              authorities when needed.
            </p>
            <a
              href="mailto:info@descf.org"
              className="mt-8 inline-flex rounded-xl bg-[#315b2c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244520]"
            >
              Email DESCF
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-14 md:py-16 lg:py-20">
          <div className="rounded-[2rem] bg-[#0b2410] p-8 text-white shadow-2xl md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-12">
            <div>
              <p className="section-label text-gold-300">
                Next step
              </p>
              <h2 className="mt-4 max-w-3xl text-h2">
                Build trust through clear communication.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/84">
                A visitor should know exactly how to reach DESCF and what kind
                of information to include. That is the job of this page.
              </p>
            </div>

            <Link
              href="/partner"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0b2410] transition hover:bg-[#f3ead9] md:mt-0"
            >
              Partner with DESCF
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

