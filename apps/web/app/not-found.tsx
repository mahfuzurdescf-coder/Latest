import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-padding container-site flex flex-col items-center text-center py-32">
      <p className="text-8xl font-serif text-earth-200 mb-6">404</p>
      <h1 className="text-h2 font-serif text-earth-900 mb-4">Page not found</h1>
      <p className="text-body text-earth-500 max-w-prose-sm mb-8 leading-relaxed">
        The page you are looking for may have been moved, renamed, or removed.
        If you followed a link from another site, it may be outdated.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/"         className="btn-primary">Back to home</Link>
        <Link href="/newsroom" className="btn-secondary">Browse newsroom</Link>
        <Link href="/contact"  className="btn-ghost">Contact DESCF</Link>
      </div>
    </section>
  )
}
