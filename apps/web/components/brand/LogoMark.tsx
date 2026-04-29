import Image from "next/image"

type LogoMarkProps = {
  className?: string
  size?: number
  priority?: boolean
  showText?: boolean
}

export function LogoMark({
  className = "",
  size = 40,
  priority = false,
  showText = false,
}: LogoMarkProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="relative inline-flex shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <Image
          src="/brand/descf-logo.png"
          alt=""
          fill
          sizes={`${size}px`}
          priority={priority}
          className="object-contain p-0.5"
        />
      </span>

      {showText ? (
        <span className="min-w-0 leading-tight">
          <span className="block text-sm font-semibold tracking-wide text-slate-950">
            DESCF
          </span>
          <span className="hidden text-xs font-medium text-slate-600 sm:block">
            Deep Ecology & Snake Conservation Foundation
          </span>
        </span>
      ) : null}
    </span>
  )
}
