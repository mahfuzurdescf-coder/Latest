export default function Loading() {
  return (
    <div className="container-site section-padding animate-pulse">
      {/* Hero skeleton */}
      <div className="h-8 w-32 bg-earth-200 rounded-md mb-4" />
      <div className="h-12 w-2/3 bg-earth-200 rounded-md mb-3" />
      <div className="h-6 w-1/2 bg-earth-200 rounded-md mb-8" />

      {/* Card grid skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-earth-200">
            <div className="aspect-[3/2] bg-earth-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 bg-earth-200 rounded" />
              <div className="h-5 w-full bg-earth-200 rounded" />
              <div className="h-5 w-3/4 bg-earth-200 rounded" />
              <div className="h-4 w-1/3 bg-earth-200 rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
