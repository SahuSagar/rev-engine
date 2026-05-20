export default function Loading() {
  return (
    <main className="space-y-16 md:space-y-20 lg:space-y-24">
      {/* Hero skeleton */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl bg-white/5 animate-pulse" />
      </div>

      {/* Specs skeleton */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="space-y-16">
          {/* Performance specs */}
          <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8">
            <div className="h-8 w-32 bg-white/10 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-white/10 rounded mb-2 animate-pulse" />
                  <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Engine details */}
          <div className="space-y-12">
            {/* Engine specs */}
            <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8">
              <div className="h-8 w-24 bg-white/10 rounded animate-pulse mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-20 bg-white/10 rounded mb-2 animate-pulse" />
                    <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Why it sounds */}
            <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8">
              <div className="h-8 w-40 bg-white/10 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
