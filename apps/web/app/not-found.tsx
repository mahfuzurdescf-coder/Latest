import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-earth-50 text-earth-900 p-6">
      <h1 className="text-6xl font-serif mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page not found</h2>
      <p className="text-body text-earth-700 mb-6">
        The page you are looking for may have been moved, renamed, or removed.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/newsroom" className="btn-secondary">Browse newsroom</Link>
        <Link href="/contact" className="btn-cta">Contact DESCF</Link>
      </div>
    </main>
  )
}