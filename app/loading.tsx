import Sidebar from "@/components/sidebar";

/**
 * Loading state shown while fetching user data. Stack Auth uses Suspense
 * internally, so this gets rendered during auth checks.
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
        </div>
      </main>
    </div>
  );
}
