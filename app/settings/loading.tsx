import Sidebar from "@/components/sidebar";

/**
 * Loading skeleton for the settings page
 */
export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/settings" />
      <main className="ml-64 p-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl">
          <div className="bg-white rounded-lg border border-grey-200 p-6">
            {/* Settings Content Skeleton */}
            <div className="space-y-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

