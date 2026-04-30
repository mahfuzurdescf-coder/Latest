import Link from 'next/link'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-700 text-white shadow-sm hover:bg-forest-800 focus-visible:ring-forest-700',
  secondary:
    'border border-forest-700/70 bg-white/70 text-forest-900 hover:bg-forest-50 focus-visible:ring-forest-700',
  ghost:
    'text-earth-700 hover:bg-earth-100 hover:text-earth-950 focus-visible:ring-earth-500',
  cta:
    'bg-earth-50 text-forest-950 shadow-sm hover:bg-white focus-visible:ring-earth-100',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

interface ButtonProps {
  children: React.ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-earth-50 active:translate-y-px',
    variantClass[variant],
    sizeClass[size],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}
