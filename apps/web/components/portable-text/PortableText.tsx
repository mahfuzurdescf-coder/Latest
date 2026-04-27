import React from 'react'
import Image from 'next/image'
import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  types: {
    image: ({ value }: { value: { asset: { url: string; metadata: { dimensions: { width: number; height: number } } }; alt?: string; caption?: string } }) => {
      const imageUrl = urlForImage(value)?.width(1200).url()
      if (!imageUrl) return null
      const { width, height } = value.asset?.metadata?.dimensions ?? { width: 1200, height: 630 }

      return (
        <figure className="my-8 -mx-4 sm:mx-0">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={value.alt ?? ''}
              width={width}
              height={height}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 780px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-caption text-earth-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    pullQuote: ({ value }: { value: { quote: string; attribution?: string } }) => (
      <blockquote className="pull-quote">
        <p>{value.quote}</p>
        {value.attribution && (
          <footer className="mt-2 text-sm text-earth-500 not-italic font-sans">
            — {value.attribution}
          </footer>
        )}
      </blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href: string; blank?: boolean } }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-forest-700 underline decoration-forest-300 hover:decoration-forest-600 transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-medium text-earth-900">{children}</strong>
    ),
  },

  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-h2 font-serif mt-12 mb-5 text-earth-900">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-h3 font-medium mt-10 mb-4 text-earth-900">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-h4 font-medium mt-8 mb-3 text-earth-900">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="pull-quote">{children}</blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-body text-earth-700 leading-[1.8] mb-5">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-5 space-y-2 list-none pl-0">
        {children}
      </ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-5 space-y-2 list-decimal list-inside text-earth-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="flex gap-3 text-body text-earth-700">
        <span className="text-forest-500 mt-1.5 flex-shrink-0">▸</span>
        <span>{children}</span>
      </li>
    ),
  },
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value?.length) return null

  return (
    <div className={className}>
      <SanityPortableText
        value={value}
        components={components as Parameters<typeof SanityPortableText>[0]['components']}
      />
    </div>
  )
}
