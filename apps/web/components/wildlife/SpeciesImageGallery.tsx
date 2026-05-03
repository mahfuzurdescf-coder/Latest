'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface SpeciesGalleryImage {
  url: string
  alt: string
  caption?: string
  credit?: string
}

export type SpeciesGalleryLabels = {
  thumbnailAriaLabelPrefix?: string
}

interface SpeciesImageGalleryProps {
  images: SpeciesGalleryImage[]
  fallbackTitle: string
  labels?: SpeciesGalleryLabels
}

export function SpeciesImageGallery({
  images,
  fallbackTitle,
  labels,
}: SpeciesImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]
  const thumbnailAriaLabelPrefix = labels?.thumbnailAriaLabelPrefix || 'Show image'

  if (!activeImage) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.055] px-8 text-center shadow-card">
        <span className="font-serif text-3xl text-white">{fallbackTitle}</span>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-card backdrop-blur-sm">
      <figure className="overflow-hidden rounded-[1.5rem] bg-forest-900">
        <div className="relative aspect-[4/3]">
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            priority={activeIndex === 0}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
        </div>

        {(activeImage.caption || activeImage.credit) && (
          <figcaption className="border-t border-white/10 bg-forest-950/80 px-4 py-3 text-sm leading-6 text-forest-100">
            {activeImage.caption}
            {activeImage.caption && activeImage.credit ? ' - ' : ''}
            {activeImage.credit}
          </figcaption>
        )}
      </figure>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.slice(0, 8).map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={
                'relative aspect-[4/3] overflow-hidden rounded-xl border transition ' +
                (activeIndex === index
                  ? 'border-bark-300 ring-2 ring-bark-300/40'
                  : 'border-white/10 opacity-75 hover:opacity-100')
              }
              aria-label={`${thumbnailAriaLabelPrefix} ${index + 1}`}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
