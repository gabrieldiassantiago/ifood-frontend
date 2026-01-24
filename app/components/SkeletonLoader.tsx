export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">

      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      
      <div className="p-5 space-y-3">

        <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
        
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-20 animate-pulse" />
          </div>
          <div className="w-11 h-11 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <div className="px-6 pb-6">
      <div className="h-6 bg-gray-200 rounded-lg w-32 mb-4 animate-pulse" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">

            <div className="w-full aspect-square bg-gray-100 rounded-2xl animate-pulse" />

            <div className="h-3 bg-gray-100 rounded w-12 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="px-6 pt-4 pb-6 space-y-4">

      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded-lg w-2/3 animate-pulse" />
      </div>
      

      <div className="h-14 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  )
}

export function BannerSkeleton() {
  return (
    <div className="h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" />
  )
}

export function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-40 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
        <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
      </div>
    </div>
  )
}

export function AddressSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
    </div>
  )
}

export function ProductsSectionSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSkeleton />
      <CategorySkeleton />
      
      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded-lg w-32 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}