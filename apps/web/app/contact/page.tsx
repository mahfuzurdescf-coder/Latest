export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen p-6 bg-earth-50 text-earth-900">
      <h1 className="text-h2 font-serif mb-4">Contact DESCF</h1>
      <p className="text-body text-earth-700 mb-6">
        You can reach us via email or phone. Fill the form below or use the fallback email link.
      </p>

      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="max-w-lg flex flex-col gap-4">
        <label className="flex flex-col">
          Name
          <input type="text" name="name" required className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          Email
          <input type="email" name="email" required className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          Message
          <textarea name="message" rows={5} required className="border rounded p-2" />
        </label>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>

      <p className="mt-6 text-body-sm">
        Or email directly: <a href="mailto:info@descf.org" className="text-forest-700 hover:underline">info@descf.org</a>
      </p>
    </main>
  )
}