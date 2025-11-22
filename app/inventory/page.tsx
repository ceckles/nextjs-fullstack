import Link from "next/link";
import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Inventory page - displays all products in the inventory.
 */
export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const pageSize = 10;

  //added math.ceil to round up to the nearest whole number
  const page = Math.max(1, Number(params.page ?? 1));

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  //Pagination
  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    //
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Inventory
              </h1>
              <p className="text-sm text-gray-500">
                Manage your inventory and track your products.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form
              className="flex gap-2 items-center"
              action="/inventory"
              method="GET"
            >
              <div className="flex-1 relative">
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search Products"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:border-transparent"
                />
                {q && (
                  <Link
                    href="/inventory"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Clear search</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Link>
                )}
              </div>
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          {/* Product List */}
          <div className="bg-white rounded-lg border-gray-250 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-55">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Low Stock Threshold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((product) => (
                  <tr
                    key={product.id}
                    className={
                      items.indexOf(product) % 2 === 0
                        ? "bg-white hover:bg-gray-100"
                        : "bg-blue-50 hover:bg-gray-100"
                    }
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${product.price.toString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.lowStockThreshold}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />
                        <button
                          type="submit"
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                baseUrl="/inventory"
                searchParams={{ q, page: page.toString() }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
