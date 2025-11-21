import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/products";

/**
 * Inventory page - displays all products in the inventory.
 */
export default async function InventoryPage() {
  const user = await getCurrentUser();
  const products = await prisma.product.findMany({ where: { userId: user.id } })


  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
              <p className="text-sm text-gray-500">Manage your inventory and track your products.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
            {/* Product List */}
            <div className="bg-white rounded-lg border-gray-250 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-55">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock Threshold</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            products.map((product, key)=>(
                                <tr key={key} className={key % 2 === 0 ? "bg-white hover:bg-gray-100" : "bg-blue-50 hover:bg-gray-100"}>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">${product.price.toString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.quantity}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.lowStockThreshold}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <form action={async (formData: FormData)=> { "use server";await deleteProduct(formData)}}>
                                            <input type="hidden" name="productId" value={product.id} />
                                            <button type="submit" className="text-red-500 hover:text-red-600">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
}
