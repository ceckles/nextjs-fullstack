import { BarChart3 } from "lucide-react";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  return <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen">
    <div className="mb-8">
      <div className="flex item-center space-x-2 mb-4">
        <BarChart3 className="w-10 h-10S"/>
      </div>
      <span className="text-lg font-semibold">Inventory App</span>
    </div>
  </div>;
}
