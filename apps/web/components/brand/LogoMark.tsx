import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  href?: string
  className?: string
  showText?: boolean
}

export function LogoMark({
  href = '/',
  className,
  showText = true,
}: LogoMarkProps) {
  const logo = (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-700 text-white shadow-card"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          className="h-7 w-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.5 5.5C15.5 10.2 10 18.4 10 27.2C10 36.1 16.4 42 24 42C31.6 42 38 36.1 38 27.2C38 18.4 32.5 10.2 25.5 5.5Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M24 39C23.5 29.8 25.7 20.6 31 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M17 26C20.6 26.2 24 25.2 27.2 23"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-wide text-earth-950">
            DESCF
          </p>
          <p className="hidden text-xs font-medium text-earth-500 sm:block">
            Deep Ecology & Snake Conservation Foundation
          </p>
        </div>
      )}
    </div>
  )

  return (
    <Link href={href} aria-label="DESCF home" className="inline-flex">
      {logo}
    </Link>
  )
}