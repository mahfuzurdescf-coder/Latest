export default function NewsroomLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="bg-forest-900 section-padding-sm">
        <div className="container-site">
          <div className="h-4 w-28 bg-forest-800 rounded mb-3" />
          <div className="h-10 w-48 bg-forest-800 rounded mb-3" />
          <div className="h-5 w-72 bg-forest-800 rounded" />
        </div>
      </div>

      {/* Category filter skeleton */}
      <div className="bg-white border-b border-earth-200 py-3">
        <div className="container-site flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 w-20 bg-earth-200 rounded-full" />
          ))}
        </div>
      </div>

      <div className="container-site section-padding space-y-12">
        {/* Featured skeleton */}
        <div className="rounded-xl overflow-hidden border border-earth-200 md:grid md:grid-cols-2">
          <div className="aspect-video bg-earth-200" />
          <div className="p-6 space-y-3">
            <div className="h-4 w-24 bg-earth-200 rounded" />
            <div className="h-7 w-full bg-earth-200 rounded" />
            <div className="h-7 w-3/4 bg-earth-200 rounded" />
            <div className="h-5 w-full bg-earth-200 rounded mt-2" />
            <div className="h-5 w-2/3 bg-earth-200 rounded" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
}
