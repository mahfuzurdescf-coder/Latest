export default function ProgrammesLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-forest-900 section-padding">
        <div className="container-site">
          <div className="h-4 w-24 bg-forest-800 rounded mb-4" />
          <div className="h-12 w-52 bg-forest-800 rounded mb-4" />
          <div className="h-5 w-96 bg-forest-800 rounded" />
        </div>
      </div>
      <div className="container-site section-padding">
        <div className="h-5 w-32 bg-earth-200 rounded mb-2" />
        <div className="h-9 w-48 bg-earth-200 rounded mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-earth-200">
              <div className="aspect-video bg-earth-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-16 bg-earth-200 rounded" />
                <div className="h-5 w-full bg-earth-200 rounded" />
                <div className="h-4 w-2/3 bg-earth-200 rounded" />
                <div className="h-4 w-full bg-earth-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
