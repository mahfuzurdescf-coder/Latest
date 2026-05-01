'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface ShareButtonsProps {
  title: string
  description?: string
  label?: string
}

export function ShareButtons({
  title,
  description,
  label = 'Share this content',
}: ShareButtonsProps) {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    const url = 'https://www.descf.org' + pathname
    setCurrentUrl(url)
    setCanNativeShare(typeof navigator !== 'undefined' && Boolean(navigator.share))
  }, [pathname])

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(description || title)

  async function handleNativeShare() {
    if (!navigator.share || !currentUrl) return

    try {
      await navigator.share({
        title,
        text: description || title,
        url: currentUrl,
      })
    } catch {
      // User cancelled sharing or browser blocked it.
    }
  }

  async function handleCopyLink() {
    if (!currentUrl) return

    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-5 shadow-sm">
      <h2 className="font-serif text-xl text-earth-900">{label}</h2>
      <p className="mt-2 text-sm leading-6 text-earth-600">
        Share this DESCF content with your community.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-900"
          >
            Share
          </button>
        )}

        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-full border border-forest-300 bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-900 transition hover:bg-forest-100"
        >
          {copied ? 'Copied' : 'Copy link'}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          Facebook
        </a>

        <a
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          WhatsApp
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          X
        </a>
      </div>
    </div>
  )
}
