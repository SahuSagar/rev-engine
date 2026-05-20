export function CarCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white/5">
      <div className="h-64 rounded-t-2xl bg-white/10" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  )
}
