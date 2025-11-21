"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Data structure for product chart data points.
 * 
 * @typedef {Object} ChartData
 * @property {string} week - The week label in MM/DD format
 * @property {number} products - The number of products for that week
 */
interface ChartData {
  week: string;
  products: number;
}

/**
 * Product chart component that displays product creation trends over time.
 * 
 * Renders an area chart showing the number of products created per week
 * over the last 12 weeks. Uses Recharts library for visualization with
 * a purple color scheme matching the application theme.
 * 
 * @param {Object} props - Component props
 * @param {ChartData[]} props.data - Array of chart data points containing
 *   week labels and product counts
 * 
 * @returns {JSX.Element} A responsive area chart component
 * 
 * @example
 * ```tsx
 * const chartData = [
 *   { week: "01/01", products: 5 },
 *   { week: "01/08", products: 8 },
 * ];
 * <ProductChart data={chartData} />
 * ```
 */
export default function ProductChart({ data }: { data: ChartData[] }) {
  console.log(data);
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 2 }}
            activeDot={{ fill: "#8b5cf6", r: 4 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: "500" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}