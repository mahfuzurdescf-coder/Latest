import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border border-earth-200/80 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm',
        className,
      )}
    >
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 text-forest-700">
        <span aria-hidden="true" className="text-lg font-semibold">
          —
        </span>
      </div>

      <h2 className="font-serif text-2xl leading-tight text-earth-950">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-xl text-body leading-7 text-earth-600">
          {description}
        </p>
      )}

      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button href={actionHref} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
