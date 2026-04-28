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
        'rounded-2xl border border-earth-200 bg-white p-8 text-center shadow-card',
        className,
      )}
    >
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
        <span aria-hidden="true" className="text-xl">—</span>
      </div>

      <h2 className="font-serif text-2xl text-earth-950">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-xl text-body text-earth-600">
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