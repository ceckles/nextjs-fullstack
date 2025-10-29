import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prismat";
import { getCurrentUser } from "@/lib/auth";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const { id: userId } = await getCurrentUser();

  // Get all dashboard data in parallel
  const [totalProducts, lowStock, allProducts, recent] = await Promise.all([
    // Count total products
    prisma.product.count({ where: { userId } }),

    // Count low stock products
    prisma.product.count({
      where: {
        userId,
        quantity: { lte: prisma.product.fields.lowStockThreshold },
      },
    }),

    // Get all products for total value calculation
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true },
    }),

    // Get recent products
    prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  // Calculate total value of ALL products
  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  // console.log("total Products: ", totalProducts);
  // console.log("Low Stock: ", lowStock);
  // console.log("all Products: ", allProducts);
  // console.log("Recent Products: ", recent);
  // console.log("Total Value: ", totalValue);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/*HEADER*/}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome Back here is a overview of your inventory!
              </p>
            </div>
          </div>
        </div>
        {/*Key Metrics*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/*Stock Levels*/}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Stock Levels
              </h2>
            </div>
            <div className="space-y-3">
              {recent.map((product) => {
                const stockLevel = product.quantity === 0 
                ? 0
                : product.quantity <= (product.lowStockThreshold || 5)
                ? 1
                : 2;

                const bgColors = ["bg-red-600","bg-yellow-600","bg-green-600"]
                const textColors = ["text-red-600","text-yellow-600","text-green-600"]

                return (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${textColors[stockLevel]}`}>{product.quantity} units</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
