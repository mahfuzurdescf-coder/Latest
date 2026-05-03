'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export type ShareButtonLabels = {
  title?: string
  description?: string
  nativeShare?: string
  copied?: string
  copyLink?: string
  facebook?: string
  whatsapp?: string
  x?: string
}

interface ShareButtonsProps {
  title: string
  description?: string
  label?: string
  labels?: ShareButtonLabels
}

const fallbackLabels: Required<ShareButtonLabels> = {
  title: 'এই কনটেন্ট শেয়ার করুন',
  description: 'আপনার কমিউনিটির সঙ্গে ডিইএসসিএফ কনটেন্ট শেয়ার করুন।',
  nativeShare: 'Share',
  copied: 'Copied',
  copyLink: 'Copy link',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  x: 'X',
}

export function ShareButtons({
  title,
  description,
  label,
  labels,
}: ShareButtonsProps) {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  const mergedLabels = {
    ...fallbackLabels,
    ...(labels ?? {}),
    title: label || labels?.title || fallbackLabels.title,
  }

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
      <h2 className="font-serif text-xl text-earth-900">{mergedLabels.title}</h2>
      <p className="mt-2 text-sm leading-6 text-earth-600">
        {mergedLabels.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-900"
          >
            {mergedLabels.nativeShare}
          </button>
        )}

        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-full border border-forest-300 bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-900 transition hover:bg-forest-100"
        >
          {copied ? mergedLabels.copied : mergedLabels.copyLink}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          {mergedLabels.facebook}
        </a>

        <a
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          {mergedLabels.whatsapp}
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 transition hover:border-forest-300 hover:text-forest-900"
        >
          {mergedLabels.x}
        </a>
      </div>
    </div>
  )
}
