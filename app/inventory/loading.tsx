import Sidebar from "@/components/sidebar";

/**
 * Loading skeleton for the inventory page
 */
export default function InventoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search Bar Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex gap-2 items-center">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-lg border-gray-250 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-55">
                <tr>
                  {["Name", "SKU", "Price", "Quantity", "Low Stock", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-white hover:bg-gray-100"
                        : "bg-blue-50 hover:bg-gray-100"
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

