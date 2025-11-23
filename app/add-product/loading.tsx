import Sidebar from "@/components/sidebar";

/**
 * Loading skeleton for the add product page
 */
export default function AddProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/add-product" />
      <main className="ml-64 p-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-80 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Product Name Field */}
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>

              {/* Grid Fields (Quantity & Price) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>

              {/* SKU Field */}
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>

              {/* Low Stock Threshold Field */}
              <div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="flex gap-5">
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 w-24 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

