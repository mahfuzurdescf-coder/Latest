import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact DESCF',
  description: 'Get in touch with the Deep Ecology and Snake Conservation Foundation.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-forest-900 text-forest-50 section-padding-sm">
        <div className="container-site">
          <p className="section-label text-forest-500 mb-3">Get in touch</p>
          <h1 className="text-display-md font-serif text-forest-50 mb-3">Contact DESCF</h1>
          <p className="text-body-lg text-forest-300 max-w-prose leading-relaxed">
            For partnerships, media queries, research collaboration, or general enquiries.
          </p>
        </div>
      </section>

      <section className="section-padding container-site">
        <div className="grid md:grid-cols-2 gap-12 max-w-prose-lg">
          <div>
            <h2 className="text-h3 font-serif text-earth-900 mb-6">Reach us</h2>
            <div className="space-y-5">
              <div>
                <p className="text-label text-earth-400 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:info@descf.org" className="text-body text-forest-700 hover:text-forest-900 transition-colors">
                  info@descf.org
                </a>
              </div>
              <div>
                <p className="text-label text-earth-400 uppercase tracking-widest mb-1">For partnerships</p>
                <a href="mailto:partnerships@descf.org" className="text-body text-forest-700 hover:text-forest-900 transition-colors">
                  partnerships@descf.org
                </a>
              </div>
              <div>
                <p className="text-label text-earth-400 uppercase tracking-widest mb-1">For media</p>
                <a href="mailto:media@descf.org" className="text-body text-forest-700 hover:text-forest-900 transition-colors">
                  media@descf.org
                </a>
              </div>
              <div>
                <p className="text-label text-earth-400 uppercase tracking-widest mb-1">Based in</p>
                <p className="text-body text-earth-700">Bangladesh</p>
              </div>
            </div>

            <div className="mt-10 p-5 bg-earth-50 rounded-xl border border-earth-200">
              <p className="text-body-sm text-earth-600 leading-relaxed">
                <strong className="text-earth-900 font-medium">Snake rescue emergency?</strong><br />
                If you have encountered a snake and need guidance on safe response,
                please contact us via email or through our social media channels.
                We will respond as quickly as possible.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-h3 font-serif text-earth-900 mb-6">Send a message</h2>
            {/* Contact form — update contact email in SiteSettings CMS */}
            <div className="space-y-4">
              <div>
                <label className="block text-body-sm font-medium text-earth-700 mb-1.5">Your name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-900 text-body-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-earth-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-900 text-body-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-earth-700 mb-1.5">Subject</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-900 text-body-sm focus:outline-none focus:ring-2 focus:ring-forest-600">
                  <option value="">Select a topic</option>
                  <option value="partnership">Partnership enquiry</option>
                  <option value="media">Media / press</option>
                  <option value="research">Research collaboration</option>
                  <option value="volunteer">Volunteer interest</option>
                  <option value="general">General enquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-body-sm font-medium text-earth-700 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message"
                  className="w-full px-4 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-900 text-body-sm focus:outline-none focus:ring-2 focus:ring-forest-600 resize-none"
                />
              </div>
              <p className="text-caption text-earth-400 italic">
                Note: This form is a placeholder. Connect a form backend (e.g. Formspree, Resend) before going live.
              </p>
              <button
                type="button"
                className="btn-primary w-full justify-center"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
