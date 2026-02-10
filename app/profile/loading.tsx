export default function LoadingProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-pulse">
      
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          
          <div className="w-16 h-16 bg-gray-200 rounded-full" />

          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-200 rounded-md" />
            <div className="h-4 w-52 bg-gray-200 rounded-md" />
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl overflow-hidden space-y-1">

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-md" />

              <div className="flex-1">
                <div className="h-4 w-40 bg-gray-200 rounded-md" />
              </div>

              <div className="w-4 h-4 bg-gray-200 rounded-md" />
            </div>
          ))}

        </div>

        <div className="mt-4 h-12 bg-gray-200 rounded-2xl" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex justify-around items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-8 h-8 bg-gray-200 rounded-md" />
        ))}
      </div>

    </div>
  )
}
