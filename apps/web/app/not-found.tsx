import Link from 'next/link'

import { getUiLabel } from '@/lib/ui-labels'
import { sanityFetch } from '@/lib/sanity/client'
import { UI_LABELS_QUERY } from '@/lib/sanity/queries'
import type { UiLabels } from '@/types/sanity'

export default async function NotFoundPage() {
  const labels = await sanityFetch<UiLabels | null>({
    query: UI_LABELS_QUERY,
    tags: ['uiLabels'],
  })

  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-earth-50 text-earth-900 p-6">
      <h1 className="text-6xl font-serif mb-4">404</h1>
      <h2 className="text-2xl mb-4">পাতাটি পাওয়া যায়নি</h2>
      <p className="text-body text-earth-700 mb-6">
        আপনি যে পাতাটি খুঁজছেন সেটি সরানো, নাম পরিবর্তন করা, অথবা মুছে ফেলা হয়ে থাকতে পারে।
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">{getUiLabel(labels, 'backToHome')}</Link>
        <Link href="/prokriti-kotha" className="btn-secondary">প্রকৃতি কথা পড়ুন</Link>
        <Link href="/contact" className="btn-cta">{getUiLabel(labels, 'contactUs')}</Link>
      </div>
    </main>
  )
}
