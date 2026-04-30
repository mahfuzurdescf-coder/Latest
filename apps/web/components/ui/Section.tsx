import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm'
}

export function Section({
  children,
  className,
  size = 'default',
}: SectionProps) {
  return (
    <section
      className={cn(size === 'sm' ? 'section-padding-sm' : 'section-padding', className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 max-w-3xl', className)}>
      {eyebrow && (
        <p className="section-label mb-3 text-forest-700">
          {eyebrow}
        </p>
      )}

      <h2 className="font-serif text-h2 leading-tight tracking-[-0.02em] text-earth-950 text-balance">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-body leading-7 text-earth-600">
          {description}
        </p>
      )}
    </div>
  )
}
